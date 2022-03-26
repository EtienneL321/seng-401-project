import React from 'react';
import './Pharmacist.css';
import Input from "@material-ui/core/Input";

const MakeOrder = () => {

    return (
        <div>
            <h3>Make an Order</h3>
            <div className='make-order-form-container'>
                <form>
                    <div className="input-container">
                        <Input
                        title='Medication name'
                        placeholder="Enter name"
                        // value={enteredUsername}
                        // onChange={(e) => setEnteredUsername(e.target.value)}
                        // inputRef={userRef}
                        />
                    </div>

                    <div className="input-container">
                        <Input
                        title='Order Amount'
                        placeholder="Enter amouunt"
                        // value={enteredUsername}
                        // onChange={(e) => setEnteredUsername(e.target.value)}
                        // inputRef={userRef}
                        />
                    </div>
                </form>
                <button type="button" className='order-btn'>
                    Make Order
                </button>
            </div>
        </div>
    );
};

export default MakeOrder;

