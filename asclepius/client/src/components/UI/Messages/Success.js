import React from "react";
import { Button } from "@material-ui/core";

const Success = (props) => {

    const okayClicked = (e) => {
        e.preventDefault();
        props.handleSuccess();
    }

    return (
        <div>
            <form onSubmit={okayClicked}>
                <h3 style={{color: 'green'}}>SUCCESS: </h3>
                <p>{props.children}</p>
                <Button variant="contained" type="submit">Okay</Button>
            </form>
        </div>
    );
};

export default Success;