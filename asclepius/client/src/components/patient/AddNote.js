import React, { useState, useEffect, useRef } from 'react';
import Input from "@material-ui/core/Input";
import './Patient.css';
import { Button } from "@material-ui/core";

const AddNote = (props) => {
    const [note, setNote] = useState();

    const addNoteHandler = () => {
        const newNote = {
            note: note,
        }
        props.addNote(newNote);
    };

    return (
        <div className="diagnosis">
            <div>
              <h3>Note</h3>
              <div >
                <Input
                  placeholder="Write..."
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  style = {{width: '70%'}}
                />
              </div>
            </div>
            <Button variant= "contained" onClick={addNoteHandler}> Add Note</Button>
        </div>
    )
};

export default AddNote;