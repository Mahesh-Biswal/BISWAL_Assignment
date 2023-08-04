import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mysql from "mysql2";
import path from 'path';
import { fileURLToPath } from 'url';
const serverPath = fileURLToPath(import.meta.url);
const app = express();
const port = 3060; // Replace with your desired port number
const dbConfig = {
  host: "localhost",
  user: "root",
  password: "mahesh",
  database: "new_schema", 
  port: 3067
};

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Initialize MySQL connection pool
const pool = mysql.createPool(dbConfig);

class DbConnect {
  async connectToDb() {
    try {
      const connection = await pool.promise();
      console.log("Connected to the database!");
      return connection;
    } catch (ex) {
      console.error("Error connecting to the database:", ex.message);
      throw ex;
    }
  }
}

const db = new DbConnect();

const startServer = async () => {
  try {
    // Connect to the database
    const connection = await db.connectToDb();

    // Define the HTTP GET method for /api/search/:take/:skip endpoint
    app.get("/api/search/:take/:skip", async (req, res) => {
      try {
        const { take, skip } = req.params;
        const parsedTake = parseInt(take);
        const parsedSkip = parseInt(skip);

        // Get the total count of records in the table
        const [totalCountResult] = await connection.query("SELECT COUNT(*) as total FROM department");

        const totalRecords = totalCountResult[0].total;
        const pageSize = parsedTake;

        // Calculate the total number of pages needed for pagination
        const totalPages = Math.ceil(totalRecords / pageSize);

        // Query to get data based on the provided take and skip parameters
        const [data] = await connection.query(
          `SELECT * FROM department LIMIT ${parsedSkip}, ${parsedTake}`
        );

        // Build the pagination numbers
        const paginationNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

        // Send the response
        res.json({ data, paginationNumbers });
      } catch (error) {
        console.error("Error while processing request:", error.message);
        res.status(500).json({ error: "Internal server error" });
      }
    });

    // Define the HTTP POST method for /api/department endpoint (Create operation)
    app.post("/api/department", async (req, res) => {
      try {
        const { DeptNo, DeptName, Location, Capacity } = req.body;

        // Insert new record into the department table
        await connection.query(
          `INSERT INTO department (DeptNo, DeptName, Location, Capacity) VALUES (?, ?, ?, ?)`,
          [DeptNo, DeptName, Location, Capacity]
        );

        res.json({ success: true, message: "Record created successfully" });
      } catch (error) {
        console.error("Error while processing request:", error.message);
        res.status(500).json({ error: "Internal server error" });
      }
    });

    // Define the HTTP PUT method for /api/department/:id endpoint (Update operation)
    app.put("/api/department/:DeptNo", async (req, res) => {
      try {
        const { DeptNo } = req.params;
        const { DeptName, Location, Capacity } = req.body;
    
        // Connect to the database
        const connection = await db.connectToDb();
    
        // Update the record in the department table
        await connection.query(
          `UPDATE department SET DeptName = ?, Location = ?, Capacity = ? WHERE DeptNo = ?`,
          [DeptName, Location, Capacity, DeptNo]
        );
    
        res.json({ success: true, message: "Record updated successfully" });
      } catch (error) {
        console.error("Error while processing request:", error.message);
        res.status(500).json({ error: "Internal server error" });
      }
    });

    // Define the HTTP DELETE method for /api/department/:id endpoint (Delete operation)
    app.delete("/api/department/:DeptNo", async (req, res) => {
      try {
        const { DeptNo } = req.params;
    
        // Connect to the database
        const connection = await db.connectToDb();
    
        // Delete the record from the department table
        await connection.query(`DELETE FROM department WHERE DeptNo = ?`, [DeptNo]);
    
        res.json({ success: true, message: "Record deleted successfully" });
      } catch (error) {
        console.error("Error while processing request:", error.message);
        res.status(500).json({ error: "Internal server error" });
      }
    });

    app.get('/', (req, resp) => {
      resp.sendFile('server1.html', { root: path.join(serverPath, './../') });
    });

    // Start the server
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (ex) {
    console.error("Error starting the server:", ex.message);
  }
};

startServer();
