import React, { useState, useEffect, useRef } from 'react';
import Input from "@material-ui/core/Input";
import './Patient.css';

const AddNote = (props) => {
    const [note, setNote] = useState();

    const addNoteHandler = () => {
        const newNote = {
            note: note,
        }
        props.addNote(newNote);
    };

    return (
        <div>
            <div className="login-item">
              <p>Note</p>
              <div className="input-container">
                <Input
                  placeholder="Write..."
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
              </div>
            </div>
            <button type="button" variant= "contained" onClick={addNoteHandler}> Add Note</button>
        </div>
    )
};

export default AddNote;