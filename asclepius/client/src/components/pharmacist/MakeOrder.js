import React from 'react';
import './Pharmacist.css';
import Input from "@material-ui/core/Input";
import Select from 'react-select';
import { useState } from 'react';


const MakeOrder = ({handleMakeOrder, inventory}) => {
    const [medicationID, setMedicationID] = useState(0);
    const [amount, setAmount] = useState(0);
    console.log("current medID");
    console.log(medicationID);

    return (
        <div>
            <h3>Make an Order</h3>
            <div className='make-order-form-container'>
                {/* <form onSubmit={}> */}
                    <Select
                        options={inventory.map(invItem => ({label: invItem.name, value: invItem.medicationID}))}
                        onChange={(e) => setMedicationID(e.value)}
                    />
                    <div className="input-container">
                        <Input
                            title='Order Amount'
                            placeholder="Enter amount"
                            value={amount}
                            type="number"
                            onChange={(e) => setAmount(e.target.value)}
                        />
                    </div>
                    <button type="button" className='order-btn' onClick={() => handleMakeOrder(medicationID, amount)}>
                        Make Order
                    </button>
                {/* </form> */}
                
            </div>
        </div>
    );
};

export default MakeOrder;

