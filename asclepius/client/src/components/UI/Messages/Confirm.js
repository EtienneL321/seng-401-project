import { Button } from "@material-ui/core";
import React from "react";  

const Confirm = (props) => {

    const confirmSubmissionHandler = (e) => {
        e.preventDefault();
        props.confirmHandler();
    }

    return (
        <form onSubmit={confirmSubmissionHandler}>
            {props.children}
            <Button type="submit" variant="contained">Confirm</Button>
            <Button onClick={props.cancelHandler} variant="contained">Cancel</Button>
        </form>
    );
};

export default Confirm;