// Model Component

const express = require('express'); 
const mysql = require('mysql'); 
const app = express();
const port = process.env.PORT || 3001;

app.listen(port, () => console.log(`Listening on port ${port}`)); 

const db = mysql.createConnection({
    host: 'seng401group20.c8o5onccwnvz.us-east-1.rds.amazonaws.com',
    user: 'njoy',
    password: 'Joy12345~!',
    database: 'Asclepius'
});

db.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

// create a GET route
app.get('/express_backend', (req, res) => { 
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' }); 
});

app.get("/api/get", (req, res) => {
    const sqlSelect = "SELECT * FROM staff";
    db.query(sqlSelect, (err, result) => {
        if (err) throw err;
        //console.log(result);
        res.send(result);
    });
});

let resultFrontEnd;

app.get("/api/get/passwords", (req, res) => {
    const sqlSelect = "SELECT staff.password FROM staff WHERE staff.username = 'acai'";
    db.query(sqlSelect, (err, result) => {
        if(err) throw err;
        resultFrontEnd = result;
        res.send(result);
    });
    console.log(resultFrontEnd);
});

