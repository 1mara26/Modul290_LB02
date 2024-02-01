
/* Beschreibung:
* Express-Server, um CRUD-Operationen vom Browser entgegen zunehmen an der DB durchzuführen
* *******************************************************************************************
* Hinweise
* npm install node
* npm init -y
* npm install mysql
* npm install body-parser
* npm install express
** ***************************************************************************************** */
// Referenz: www.npmjs.com/package/mysql

// Die installierten MySql-Module werden in unser Script geladen
const mysql = require("mysql");
const express = require('express');
var app = express();
const path = require('path');
const bodyParser = require('body-parser');

const port = 3000;

app.use(bodyParser.json());

// Konfiguration für die Verbindung zur MySQL-Datenbank
const config = {
    host: 'localhost',
    database: 'facilitymanagement',
    user: "appAdmin",
    password: 'appAdminPW'
}

// Erstellung der Verbindung zur MySQL-Datenbank
const connection = mysql.createConnection(config)

connection.connect(function(err) {
    if (err) throw err;
    console.log('Connected to MySQL database:', connection.config.database);
    /*
     var sqlstmt = 'SELECT * from user';
     // Das SQL-Statement wird vorbereitetet
     connection.query(sqlstmt, function (err, result) {
         if (err) throw err;
         // console.log('Data from MySQL:');
         //console.log(result); //
     });
     */
});

// Starten des Express-Servers
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// GET-Anfrage für alle Users
app.get('/users', (req, res) => {
    connection.query('SELECT * FROM Users', (err, rows, fields) => {
        if (!err) {
            console.log(rows);
            res.send(rows);
        } else {
            console.log(err);
        }
    })
});

// GET-Anfrage für bestimmte users anhand der UserID
app.get('/users/:UserID', (req, res) => {
    connection.query('SELECT * FROM Users WHERE UserID = ?', [req.params.id], (err, rows, fields) => {
        if (!err) {
            console.log(rows);
            res.send(rows);
        } else {
            console.log(err);
        }
    })
});

// DELETE-Anfrage zum Löschen einer ReservationConflicts anhand der KonfliktID
app.delete('/users/:UserID', (req, res) => {
    connection.query('DELETE FROM Users WHERE UserID = ?', [req.params.id], (err, rows, fields) => {
        if (!err) {
            res.send('Delete operation was successful')
        } else {
            console.log(err);
        }
    })
});
