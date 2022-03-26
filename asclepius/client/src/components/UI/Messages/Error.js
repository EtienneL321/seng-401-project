import React from "react";
import { Button } from "@material-ui/core";

const Error = (props) => {

    const okayClicked = (e) => {
        e.preventDefault();
        props.handleError();
    }

    return (
        <div>
            <form onSubmit={okayClicked}>
                <h3 style={{color: 'red'}}>ERROR: </h3>
                <p>{props.children}</p>
                <Button variant="contained" type="submit">Okay</Button>
            </form>
        </div>
    );
};

export default Error;