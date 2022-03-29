import React, { useState, useEffect, useRef } from 'react';
import Input from "@material-ui/core/Input";
import { Button } from "@material-ui/core";
import './Patient.css';

const AddDiagnosis = (props) => {
    const [name, setName] = useState();
    const [comments, setComments] = useState();

    const addDiagnosisHandler = () => {
        const newDiagnosis = {
            name: name,
            comments: comments,
        }
        props.addDiagnosis(newDiagnosis);
    };

    return (
        <div className="diagnosis">
            <div>
              <h3>Diagnosis Name</h3>
              <div className="diagnosis-input">
                <Input
                  placeholder="Name..."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style = {{width: '40%'}}
                />
              </div>
            </div>
            <div>
              <h3>Diagnosis Comments</h3>
              <div className="diagnosis-input">
                <Input
                  placeholder="Comments..."
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  style = {{width: '70%'}}
                />
              </div>
            </div>
            <Button variant= "contained" onClick={addDiagnosisHandler}> Add Diagnosis</Button>
        </div>
    )
};

export default AddDiagnosis;