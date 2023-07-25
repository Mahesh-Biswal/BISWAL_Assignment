const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser'); 



const app = express();
app.use(cors());
app.use(bodyParser.json()); // Add this line to parse JSON data from the request body
app.use(bodyParser.urlencoded({ extended: true }));
const port = 3043;

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'mahesh',
  database: 'new_schema',
  port: 3067,
};

const connection = mysql.createConnection(dbConfig);

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to MySQL database!');
});


// API endpoint to fetch data from the department table
app.get('/department', (req, res) => {
  const sql = 'SELECT * FROM department';

  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Failed to fetch data from the database.' });
      return;
    }

    res.json(results);
  });
});

// API endpoint to add a new department
app.post('/department', (req, res) => {
  const { DeptName, Location, Capacity } = req.body;

  const sql = `INSERT INTO new_schema.department (DeptNo, DeptName, Location, Capacity) VALUES (${DeptNo},${DeptName},${Location},${Capacity})`;
  connection.query(sql, (err, result) => {
    if (err) {
      console.error('Error executing query:', err); // Log the error message
      res.status(500).json({ error: 'Failed to add data to the database.' });
      return;
    }
    res.json(result);
  });
});


// API endpoint to update an existing department
app.put('/department/:DeptNo', (req, res) => {
  const { DeptNo } = req.params;
  const { DeptName, Location, Capacity } = req.body;
  console.log('Received PUT request for DeptNo:', DeptNo);
  console.log('Request body:', req.body);

  const sql = 'UPDATE department SET DeptName=?, Location=?, Capacity=? WHERE DeptNo=?';
  connection.query(sql, [DeptName, Location, Capacity, DeptNo], (err, result) => {
    if (err) {
      console.error('Error executing query:', err.message);
      res.status(500).json({ error: 'Failed to update data in the database.' });
      return;
    }
    res.json(result);
  });
});





app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});