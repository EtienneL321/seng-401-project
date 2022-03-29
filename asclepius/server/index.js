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

// POST NEW STAFF
app.post("/api/post/staff/newstaff", (req, res) => {

    givenUsername = req.body.username;
    givenPassword = req.body.password;
    givenName = req.body.Name;
    givenPhone = req.body.Phone;
    givenAddress = req.body.Address;
    givenContactNumber = req.body.ContactNumber;
    givenStaffType = req.body.staffType;
    givenClearanceLevel = req.body.clearanceLevel;

    const sqlInsert = 
        "INSERT INTO staff (username, password, Name, Phone, Address, ContactNumber, staffType, clearanceLevel) VALUES (?,?,?,?,?,?,?,?);"
    db.query(sqlInsert, [givenUsername, givenPassword, givenName, givenPhone, givenAddress, givenContactNumber, givenStaffType, givenClearanceLevel], (err, result) => {
        if (err){
            return res.status(400).send({ error: 'SOME ERROR OCCURED' });
        }
        res.send(result);
    });  
});

// DELETE A STAFF
app.delete("/api/delete/staff/remove", (req, res) => {

    var error1;

    const givenID = req.query.staffID;
    console.log("This is server side:", givenID);

    const sqlDeleteAssignments = 
        "DELETE FROM assignments WHERE assignments.careGiverID=?";
    db.query(sqlDeleteAssignments, [givenID], (err, result) => {
        if (err){
            console.log(err);
            return res.status(400).send({ error: "SOME ERROR OCCURED" });
        }
    });

    const sqlDelete = 
        "DELETE FROM staff WHERE staff.staffID=?"
    db.query(sqlDelete, [givenID], (err, result) => {
        if (err){
            console.log(err);
            return res.status(400).send({ error: "SOME ERROR OCCURED" });
        }
        res.send(result);
    });  
});

// GET ALL ASSIGNMENTS
app.get("/api/get/assignments", (req, res) => {
    const sqlSelect = "SELECT * FROM assignments";
    db.query(sqlSelect, (err, result) => {
        if (err) throw err;
        //console.log(result);
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

// DELETE AN ASSIGNMENT
app.delete("/api/delete/assignments/remove", (req, res) => {

    const givenPatientID = req.query.patientID;
    const givenCareGiverID = req.query.careGiverID;

    const sqlDeleteAssignments = 
        "DELETE FROM assignments WHERE assignments.patientID=? AND assignments.careGiverID=?";
    db.query(sqlDeleteAssignments, [givenPatientID, givenCareGiverID], (err, result) => {
        if (err){
            console.log(err);
            return res.status(400).send({ error: "SOME ERROR OCCURED" });
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
            return res.status(400).send({ error: 'SOME ERROR OCCURED' });
        }
        res.send(result);
    });  
});

// DELETE A PATIENT
app.delete("/api/delete/patients/remove", (req, res) => {

    const givenID = req.query.patientID;
    console.log("This is server side:", givenID);

    const sqlDeleteAssignments = 
        "DELETE FROM assignments WHERE assignments.patientID=?";
    db.query(sqlDeleteAssignments, [givenID], (err1, result) => {
        if (err1){
            console.log(err1);
            return res.status(400).send({ error: "SOME ERROR OCCURED" });
        }
    });

    const sqlDelete = 
        "DELETE FROM patients WHERE patients.patientID=?";
    db.query(sqlDelete, [givenID], (err2, result) => {
        if (err2){
            console.log(err2);
            return res.status(400).send({ error: "SOME ERROR OCCURED" });
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

// ADD A NEW MEDICATION
app.post("/api/post/medications/new", (req, res) => {

    givenName = req.body.name;
    givenClearance = req.body.clearanceNum;
    givenUse = req.body.use;
    givenWarnings = req.body.warnings;
    givenStock = req.body.stock;

    const sqlInsert1 = 
        "INSERT INTO `Asclepius`.`medications` (`name`, `clearanceNum`, `use`, `warnings`) VALUES (?, ?, ?, ?);";
    db.query(sqlInsert1, [givenName, givenClearance, givenUse, givenWarnings], (err, result) => {
        if (err){
            return res.status(400).send({ error: 'SOME ERROR OCCURED' });
        }
        res.send(result);
    });  
});

// DELETE A MEDICATION
app.delete("/api/delete/medication/remove", (req, res) => {
    const givenID = req.query.medicationID;

    const sqlDeleteInventory = 
        "DELETE FROM pharm_inventory WHERE pharm_inventory.medicationID=?";
    db.query(sqlDeleteInventory, [givenID], (err, result) => {
        if (err){
            console.log(err);
            return res.status(400).send({ error: "SOME ERROR OCCURED" });
        }
    });

    const sqlDelete = 
        "DELETE FROM medications WHERE medications.medicationID=?"
    db.query(sqlDelete, [givenID], (err, result) => {
        if (err){
            console.log(err);
            return res.status(400).send({ error: "SOME ERROR OCCURED" });
        }
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
        res.send(result);
    });
});

// GAIN INFO ABOUT THE PRESCRIPTION BASED ON ID
app.get("/api/get/prescriptions/info", (req, res) => {
    givenID = req.query.prescriptionID;
    const sqlSelect = "select prescriptions.prescriptionID, prescriptions.medicationID, prescriptions.amount, prescriptions.instructions, prescriptions.patientID, prescriptions.requesteeID, prescriptions.timeWritten, prescriptions.pharmisistID, prescriptions.timeFulfilled, prescriptions.receiverID, prescriptions.timeReceived from prescriptions where prescriptions.prescriptionID=?";
    db.query(sqlSelect, [givenID], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

// PRESCRIPTIONS THAT ARE NOT FULFILLED (ORDERS)
app.get("/api/get/prescriptions/orders", (req, res) => {
    const sqlSelect = "select prescriptions.prescriptionID, medications.name as medication, prescriptions.medicationID, prescriptions.amount, patients.Name as patientName, patients.patientID, staff.Name as requesteeName, staff.staffID from prescriptions, medications, staff, patients where isnull(prescriptions.pharmisistID) and prescriptions.medicationID=medications.medicationID and prescriptions.patientID=patients.patientID and prescriptions.requesteeID=staff.staffID"
    db.query(sqlSelect, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

// FULFILL PATIENT ORDER ON PRESCRIPTION
app.put("/api/put/prescriptions/info", (req, res) => {
    givenPharmID = req.body.pharmasistID;
    givenTime = req.body.time;
    givenPrescID = req.body.prescriptionID;
    const sqlSelect = "UPDATE `Asclepius`.`prescriptions` SET `pharmisistID` = ?, `timeFulfilled` = ? WHERE (`prescriptionID` = ?);"
    db.query(sqlSelect, [givenPharmID, givenTime, givenPrescID], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

// PICK UP A PATIENT PRESCRIPTION
app.put("/api/put/prescriptions/info/docnurse", (req, res) => {
    givenReceiverID = req.body.receiverID;
    givenTime = req.body.time;
    givenPrescID = req.body.prescriptionID;
    const sqlSelect = "UPDATE `Asclepius`.`prescriptions` SET `receiverID` = ?, `timeReceived` = ? WHERE (`prescriptionID` = ?);"
    db.query(sqlSelect, [givenReceiverID, givenTime, givenPrescID], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

// ADD NEW PRESCRIPTION

app.post("/api/post/prescriptions/new", (req, res) => {
    givenPatientID = req.body.patientID;
    givenMedicationID = req.body.medicationID;
    givenAmount = req.body.amount;
    givenInstruction = req.body.instructions;
    givenRequestee = req.body.requesteeID;
    givenTime = req.body.time;

    const sqlInsert1 = 
        "INSERT INTO `Asclepius`.`prescriptions` (`medicationID`, `amount`, `instructions`, `patientID`, `requesteeID`, `timeWritten`) VALUES (?, ?, ?, ?, ?, ?);";
    db.query(sqlInsert1, [givenMedicationID, givenAmount, givenInstruction, givenPatientID, givenRequestee, givenTime], (err, result) => {
        if (err){
            return res.status(400).send({ error: 'SOME ERROR OCCURED' });
        }
        res.send(result);
    });  
});

// GET ALL PRESCRIPTIONS REQUESTED BY GIVEN ID
app.get("/api/get/prescriptions/reqid", (req, res) => {
    givenID = req.query.staffID;

    const sqlSelect = "select prescriptions.prescriptionID, medications.name as medication, prescriptions.medicationID, prescriptions.amount, prescriptions.instructions, patients.Name as patientName, patients.patientID, staff.Name as requesteeName, prescriptions.pharmisistID, staff.staffID from prescriptions, medications, staff, patients where isnull(prescriptions.receiverID) and prescriptions.medicationID=medications.medicationID and prescriptions.patientID=patients.patientID and prescriptions.requesteeID=staff.staffID and prescriptions.requesteeID=?";
    db.query(sqlSelect, [givenID], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

// INVENTORY
// GET ALL INVENTORY ITEMS
app.get("/api/get/inventory", (req, res) => {
    const sqlSelect = "select pharm_inventory.medicationID, medications.name, pharm_inventory.amount from pharm_inventory, medications where pharm_inventory.medicationID=medications.medicationID";
    db.query(sqlSelect, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

// ADJUSTING INVENTORY AMOUNT
app.put("/api/put/inventory/info", (req, res) => {
    givenAmount = req.body.amount;
    givenMedID = req.body.medicationID;
    const sqlSelect = "UPDATE `Asclepius`.`pharm_inventory` SET `amount` = ? WHERE (`medicationID` = ?)";
    db.query(sqlSelect, [givenAmount, givenMedID], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

// GET SPECIFIC INVENTORY ITEM ID
app.get("/api/get/inventory/info/id", (req, res) => {
    givenName = req.query.name;
    givenClearance = req.query.clearanceNum;
    givenUse = req.query.use;
    givenWarnings = req.query.warnings;

    const sqlSelect = "select medications.medicationID from `Asclepius`.`medications` where medications.name=? AND medications.clearanceNum=? AND medications.use=? AND medications.warnings=?;";
    db.query(sqlSelect, [givenName, givenClearance, givenUse, givenWarnings], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

// ADD NEW INVENTORY ITEM
app.post("/api/post/inventory/new", (req, res) => {
    givenID = req.body.medicationID;
    givenStock = req.body.stock;

    const sqlInsert1 = 
        "INSERT INTO `Asclepius`.`pharm_inventory` (`medicationID`, `amount`) VALUES (?, ?);";
    db.query(sqlInsert1, [givenID, givenStock], (err, result) => {
        if (err){
            return res.status(400).send({ error: 'SOME ERROR OCCURED' });
        }
        res.send(result);
    });  
});

// PATIENT FILE
// GET PATIENT DIAGNOSIS
app.get("/api/get/diagnoses", (req, res) => {
    requestedPatientID = req.query.patientID;
    const sqlSelect = "SELECT * FROM diagnoses WHERE patientID=?";
    db.query(sqlSelect, [requestedPatientID], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

// POST NEW DIAGNOSIS
app.post("/api/post/diagnoses/newdiagnoses", (req, res) => {
    givenName = req.body.name;
    givenDate = req.body.date;
    givenComments = req.body.comments;
    givenPatientID = req.body.patientID;
    givenStaffID = req.body.staffID;

    const sqlInsert = 
        "INSERT INTO diagnoses (name, date, comments, patientID, doctorID) VALUES (?,?,?,?,?);"
    db.query(sqlInsert, [givenName, givenDate, givenComments, givenPatientID, givenStaffID], (err, result) => {
        if (err){
            return res.status(400).send({ error: 'SOME ERROR OCCURED' });
        }
        res.send(result);
    });  
});

// GAIN INFO ABOUT THE PRESCRIPTION BASED ON PATIENT ID
app.get("/api/get/prescriptions/patient", (req, res) => {
    givenID = req.query.patientID;
    const sqlSelect = "SELECT * FROM prescriptions where patientID=?";
    db.query(sqlSelect, [givenID], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

// GET PATIENT NOTES
app.get("/api/get/medical_notes", (req, res) => {
    requestedPatientID = req.query.patientID;
    const sqlSelect = "SELECT * FROM medical_notes WHERE patientID=?";
    db.query(sqlSelect, [requestedPatientID], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

// POST NEW NOTE
app.post("/api/post/medical_notes/newnotes", (req, res) => {
    givenDate = req.body.dateTime;
    givenNote = req.body.note;
    givenPatientID = req.body.patientID;
    givenStaffID = req.body.careGiverID;

    const sqlInsert = 
        "INSERT INTO medical_notes (dateTime, contents, patientID, careGiverID) VALUES (?,?,?,?);"
    db.query(sqlInsert, [givenDate, givenNote, givenPatientID, givenStaffID], (err, result) => {
        if (err){
            return res.status(400).send({ error: 'SOME ERROR OCCURED' });
        }
        res.send(result);
    });  
});