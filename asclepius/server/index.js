// Model Component

const express = require('express'); 
const mysql = require('mysql'); 
const app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
const port = process.env.PORT || 3001;

app.listen(port, () => console.log(`Listening on port ${port}`));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
app.use(cors()); 

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

// STAFF
// GET ALL STAFF INFO
app.get("/api/get/staff", (req, res) => {
    const sqlSelect = "SELECT * FROM staff";
    db.query(sqlSelect, (err, result) => {
        if (err) throw err;
        //console.log(result);
        res.send(result);
    });
});

// GET STAFF INFO BASED ON USERNAME
app.get("/api/get/staff/info", (req, res) => {
    givenUsername = req.query.username;
    const sqlSelect = `select staff.staffID, staff.username, staff.password, staff.Name, staff.Phone, staff.Address, staff.ContactNumber, staff.staffType, staff.clearanceLevel from staff where staff.username=?`;
    db.query(sqlSelect, [givenUsername], (err, result) => {
        if (err) throw err;
        // console.log(result);
        res.send(result);
    });
});

// GET STAFF INFO BASED ON STAFF ID
app.get("/api/get/staff/info/id", (req, res) => {
    givenID = req.query.staffID;
    const sqlSelect = `select staff.staffID, staff.username, staff.Name, staff.Phone, staff.Address, staff.ContactNumber, staff.staffType, staff.clearanceLevel from staff where staff.staffID=?`;
    db.query(sqlSelect, [givenID], (err, result) => {
        if (err) throw err;
        // console.log(result);
        res.send(result);
    });
});

// GET ALL STAFF WHO ARE DOCTORS
app.get("/api/get/staff/doctors", (req, res) => {
    const sqlSelect = `select * from staff where staff.staffType='D'`;
    db.query(sqlSelect, (err, result) => {
        if (err) throw err;
        // console.log(result);
        res.send(result);
    });
});

// GET ALL STAFF WHO ARE NURSES
app.get("/api/get/staff/nurses", (req, res) => {
    const sqlSelect = `select * from staff where staff.staffType='N'`;
    db.query(sqlSelect, (err, result) => {
        if (err) throw err;
        // console.log(result);
        res.send(result);
    });
});

// GET STAFF ASSIGNMENTS BASED ON STAFF ID
app.get("/api/get/staff/assignments/id", (req, res) => {
    givenID = req.query.staffID;
    const sqlSelect = `select careGiver.Name as careGiverName, careGiver.staffID as careGiverID, patients.Name as patientName, patients.patientID, assigner.Name as assignerName, assigner.staffID as assignerID from staff as careGiver, staff as assigner, patients, assignments where careGiver.staffID=? and assignments.patientID=patients.patientID and assignments.careGiverID=careGiver.staffID and assignments.adminID=assigner.staffID`;
    db.query(sqlSelect, [givenID], (err, result) => {
        if (err) throw err;
        // console.log(result);
        res.send(result);
    });
});

// GET PASSWORD BASED ON STAFF USERNAME
app.get("/api/get/staff/password", (req, res) => {
    givenUsername = req.query.username;
    givenPassword = req.query.password;
    const sqlSelect = "SELECT * FROM staff WHERE staff.username=? and staff.password=?";
    db.query(sqlSelect , [givenUsername, givenPassword], (err, result) => {
        if(err) throw err;
        // console.log(result);
        res.send(result);
    });
});

// POST STAFF ASSIGNMENTS
app.post("/api/post/staff/assignment", (req, res) => {

    givenPatientID = req.body.patientID;
    givenCareGiverID = req.body.careGiverID;
    givenAdminID = req.body.assignerID;

    const sqlInsertAssignment = 
        "INSERT INTO assignments (patientID, careGiverID, adminID) VALUES (?,?,?);"
    db.query(sqlInsertAssignment, [givenPatientID, givenCareGiverID, givenAdminID], (err, result) => {
        if (err){
            return res.status(400).send({ error: 'Duplicate entry, this assignment has already been made.' });
        }
        res.send(result);
    });  
});

// PATIENTS
// GAIN INFO ABOUT ALL PATIENTS
app.get("/api/get/patients", (req, res) => {
    const sqlSelect = "select patients.patientID, patients.name as patientName, patients.address, patients.phone from patients";
    db.query(sqlSelect, (err, result) => {
        if (err) throw err;
        //console.log(result);
        res.send(result);
    });
});

// GAIN INFO ABOUT THE PATIENT BASED ON ID
app.get("/api/get/patients/info", (req, res) => {
    givenID = req.query.patientID;
    console.log("THIS IS DATA FROM FRONT END", givenID);
    const sqlSelect = "select patients.patientID, patients.name, patients.address, patients.phone from patients where patients.patientID=?";
    db.query(sqlSelect, [givenID], (err, result) => {
        if (err) throw err;
        // console.log(result);
        res.send(result);
    });
});

// POST NEW PATIENT
app.post("/api/post/patients/newpatient", (req, res) => {

    givenName = req.body.name;
    givenAddress = req.body.address;
    givenPhone = req.body.phone;

    const sqlInsert = 
        "INSERT INTO patients (name, address, phone) VALUES (?,?,?);"
    db.query(sqlInsert, [givenName, givenAddress, givenPhone], (err, result) => {
        if (err){
            return res.status(400).send({ error: 'SOME ERROR' });
        }
        res.send(result);
    });  
});

// DELETE A PATIENT
app.delete("/api/delete/patients/remove", (req, res) => {

    const givenID = req.query.patientID;
    console.log("This is server side:", givenID);

    const sqlDelete = 
        "DELETE FROM patients WHERE patients.patientID=?"
    db.query(sqlDelete, [givenID], (err, result) => {
        if (err){
            return res.status(400).send({ error: 'SOME ERROR' });
        }
        res.send(result);
    });  
});

// MEDICATIONS
// GAIN INFO ABOUT ALL MEDICATIONS
app.get("/api/get/medications", (req, res) => {
    const sqlSelect = "select medications.medicationID, medications.name, medications.use, medications.warnings from medications";
    db.query(sqlSelect, (err, result) => {
        if (err) throw err;
        //console.log(result);
        res.send(result);
    });
});

// GAIN INFO ABOUT THE MEDICATION BASED ON ID
app.get("/api/get/medications/info/id", (req, res) => {
    givenID = req.query.medicationID;
    const sqlSelect = "select medications.medicationID, medications.name, medications.use, medications.warnings from medications where medications.medicationID=?";
    db.query(sqlSelect, [givenID], (err, result) => {
        if (err) throw err;
        // console.log(result);
        res.send(result);
    });
});

// GAIN INFO ABOUT THE MEDICATION BASED ON NAME
app.get("/api/get/medications/info/name", (req, res) => {
    givenName = req.query.name;
    const sqlSelect = "select medications.medicationID, medications.name, medications.use, medications.warnings from medications where medications.name=?";
    db.query(sqlSelect, [givenName], (err, result) => {
        if (err) throw err;
        //console.log(result);
        res.send(result);
    });
});

// SUPPLIERS
// GAIN INFO ABOUT ALL SUPPLIERS
app.get("/api/get/suppliers", (req, res) => {
    const sqlSelect = "select suppliers.sName, suppliers.location, suppliers.phone from suppliers";
    db.query(sqlSelect, (err, result) => {
        if (err) throw err;
        //console.log(result);
        res.send(result);
    });
});

// GAIN INFO ABOUT THE SUPPLIER BASED ON NAME
app.get("/api/get/suppliers/info", (req, res) => {
    givenName = req.query.name;
    const sqlSelect = "select suppliers.sName, suppliers.location, suppliers.phone from suppliers where suppliers.sName=?";
    db.query(sqlSelect, [givenName], (err, result) => {
        if (err) throw err;
        //console.log(result);
        res.send(result);
    });
});

// PRESCRIPTIONS
// GAIN ALL INFO ABOUT ALL PRESCRIPTIONS
app.get("/api/get/prescriptions", (req, res) => {
    const sqlSelect = "select prescriptions.prescriptionID, prescriptions.medicationID, prescriptions.amount, prescriptions.instructions, prescriptions.patientID, prescriptions.requesteeID, prescriptions.timeWritten, prescriptions.pharmisistID, prescriptions.timeFulfilled, prescriptions.receiverID, prescriptions.timeReceived from prescriptions";
    db.query(sqlSelect, (err, result) => {
        if (err) throw err;
        //console.log(result);
        res.send(result);
    });
});

// GAIN INFO ABOUT THE PRESCRIPTION BASED ON ID
app.get("/api/get/prescriptions/info", (req, res) => {
    givenID = req.query.prescriptionID;
    const sqlSelect = "select prescriptions.prescriptionID, prescriptions.medicationID, prescriptions.amount, prescriptions.instructions, prescriptions.patientID, prescriptions.requesteeID, prescriptions.timeWritten, prescriptions.pharmisistID, prescriptions.timeFulfilled, prescriptions.receiverID, prescriptions.timeReceived from prescriptions where prescriptions.prescriptionID=?";
    db.query(sqlSelect, [givenID], (err, result) => {
        if (err) throw err;
        //console.log(result);
        res.send(result);
    });
});




