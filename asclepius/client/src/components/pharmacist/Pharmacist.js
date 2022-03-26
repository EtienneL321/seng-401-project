import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from '../UI/NavBar';
import useAuth from '../../hooks/useAuth';
import '../home/HomePage.css';
import '../CommonUser.css';
import OrderList from './OrderList';
import InventoryList from './InventoryList';
import FulfillOrder from './FulfillOrder';
import MakeOrder from './MakeOrder';
// import { is } from 'express/lib/request';

const Pharmacist = (props) => {
    // console.log(props.patients);
    
    const { auth } = useAuth();
    const [staffInfo, setStaffInfo] = useState({});
    const [orders, setOrders] = useState([]);
    const [changeFlag, setChangeFlag] = useState(false);
    const [inventory, setInventory] = useState([]);
    // console.log(auth);

    const [selectedOrder, setSelectedOrder] = useState(null);
    const [mainComponentState, setMainComponentState] = useState("ordersView");

    function showOrders(){
        setMainComponentState("ordersView");
    }
    function showInventory(){
        setMainComponentState("inventoryView");
    }

    function showFulfillOrder(order){
        setSelectedOrder(order);
        setMainComponentState("fulfillOrder");
    }

    function showMakeOrder(){
        setMainComponentState("makeOrderView");
    }

    const handleMakeOrder = async (medication_ID, amount) => {
        if(amount <= 0 ){
            alert("Please enter an amount greater than 0.");
        }
        else if(medication_ID == 0){
            alert("Please choose a medication to order.");
        }
        else{
            const medicationInvolved = inventory.find(({medicationID}) => medicationID === medication_ID);
            console.log("The medication ID");
            console.log(medication_ID);
            const newMedAmount = medicationInvolved.amount + parseInt(amount);
            // increment the medication in the inventory
            let inventoryParams = {
                amount: newMedAmount,
                medicationID: medication_ID,
            };
            await axios.put("http://localhost:3001/api/put/inventory/info", inventoryParams);

            //alert that the change has been made
            alert("Order has been made!");
            setChangeFlag(prev => !prev);
            // return to orders page
            showInventory();
        }
    };

    const handleFulfillOrder = async (order) => {
        let date = new Date();
        // let currTime = "";
        let currTime = date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate()+ " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

        let prescriptionParams = {
            pharmasistID : staffInfo.staffID,
            time: currTime,
            prescriptionID: order.prescriptionID,
        };

        const medicationInvolved = inventory.find(({medicationID}) => medicationID === order.medicationID);
        const newMedAmount = medicationInvolved.amount - order.amount;
        if(newMedAmount < 0) {
            //error
            alert("Medicine is out of stock, please order more.");
        }
        else{
            // update the prescription
            await axios.put("http://localhost:3001/api/put/prescriptions/info", prescriptionParams);

            // decrement the medication in the inventory
            let inventoryParams = {
                amount: newMedAmount,
                medicationID: order.medicationID,
            };
            await axios.put("http://localhost:3001/api/put/inventory/info", inventoryParams);

            //alert that the change has been made
            alert("Order has been fulfilled!");
            setChangeFlag(prev => !prev);
            // return to orders page
            showOrders();
        }
    };

    function MainComponentRender(props){
        const compState = props.compState;
        if(compState === "ordersView"){
            return <OrderList showFulfillOrder={showFulfillOrder} setOrders={setOrders} ordersInfo={orders}/>;
        }
        else if (compState === "inventoryView"){
            return <InventoryList inventoryInfo={inventory}/>;
        }
        else if(compState === "fulfillOrder"){
            // const orderToFulfill = orders.find(({prescriptionID}) => prescriptionID === selectedOrder.prescriptionID);
            return <FulfillOrder order={selectedOrder} inventoryInfo={inventory} handleFulfillOrder={handleFulfillOrder}/>
        }
        else if(compState === "makeOrderView"){
            return <MakeOrder handleMakeOrder={handleMakeOrder} inventory={inventory}/>
        }
    }

    useEffect(() => {
        const fetchStaffAndPatients = async () => {
            let staff = {
                staffID : auth.id,
            }
            try {
                const staffData = await axios.get('http://localhost:3001/api/get/staff/info/id', {params: staff});
                console.log("Response for the staff data", staffData.data[0]);
                setStaffInfo(staffData.data[0]);

                const orderData = await axios.get('http://localhost:3001/api/get/prescriptions/orders');
                console.log("Response for the order data", orderData.data);
                setOrders(orderData.data);
                // setMainComponentState("ordersView");

                const inventoryData = await axios.get('http://localhost:3001/api/get/inventory');
                console.log("Response for inventory", inventoryData.data);
                setInventory(inventoryData.data);
                // setInventory
            }
            catch (error){
                console.error(error);
            }
        };
        fetchStaffAndPatients();
    }, [auth, setMainComponentState, setInventory, setOrders, changeFlag]);

    return (
        <div className='MainApp'>
            <NavBar />
            <div className='main-content-container'>
                <div className='user-sidebar'>
                    <h3>Hello, Pharmacist {staffInfo.Name}</h3>
                    <div className='navigation-btns-user'>
                        <button type="button" className='nav-btns' onClick={showOrders}>
                            View Orders
                        </button>
                        <button type="button" className='nav-btns' onClick={showInventory}>
                            View Inventory
                        </button>
                        <button type="button" className='nav-btns' onClick={showMakeOrder}>
                            Make Order
                        </button>
                        
                    </div>
                </div>
                
                <div className='main-page-content'>
                    <MainComponentRender compState={mainComponentState} />
                </div>
            </div>
        </div>
        
    )
}

export default Pharmacist;