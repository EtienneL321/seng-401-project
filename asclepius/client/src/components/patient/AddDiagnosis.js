import React, { useState, useEffect, useRef } from 'react';
import Input from "@material-ui/core/Input";
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
        <div>
            <div className="login-item">
              <p>Diagnosis Name</p>
              <div className="input-container">
                <Input
                  placeholder="Name..."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
            <div className="login-item">
              <p>Diagnosis Comments</p>
              <div className="input-container">
                <Input
                  placeholder="Comments..."
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                />
              </div>
            </div>
            <button type="button" variant= "contained" onClick={addDiagnosisHandler}> Add Diagnosis</button>
        </div>
    )
};

export default AddDiagnosis;