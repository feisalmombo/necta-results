const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

// The port number after run the project using the command of 
// node serve.js - Server running at http://localhost:3000 and Connected to database.
const app = express();
const port = 3000;

app.use(cors());

// Create a connection for Mysql database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'necta_results'
});

// Show error message if the connection of database is successfully or fail to connect
db.connect(err => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to database.');
});

app.get('/results', (req, res) => {
     // Fetch all data from this table results
    db.query('SELECT * FROM results', (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        const examResults = results.map(row => ({
            examNumber: row.examNumber,
            points: row.points,
            division: row.division,
            subjects: []
        }));

        // Fetch all data from this table subjects
        db.query('SELECT * FROM subjects', (err, subjects) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            examResults.forEach(result => {
                result.subjects = subjects.filter(subject => subject.examNumber === result.examNumber)
                .map(subject => ({ subject: subject.subject, grade: subject.grade }));
            });

            res.json(examResults);
        });
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`); 
});
