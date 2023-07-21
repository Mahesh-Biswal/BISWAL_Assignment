import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mysql from "mysql2";
import path from 'path';
import {
  fileURLToPath
} from 'url';
const serverPath = fileURLToPath(
  import.meta.url);
const app = express();
const port = 3060; // Replace with your desired port number
const dbConfig = {
  host: "localhost",
  user: "root",
  password: "mahesh",
  database: "new_schema", // Replace with your database name
  port: 3067
};

app.use(cors());
app.use(bodyParser.urlencoded({
  extended: true
}));
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
        const {
          take,
          skip
        } = req.params;
        const parsedTake = parseInt(take);
        const parsedSkip = parseInt(skip);

        // Get the total count of records in the table
        const [totalCountResult] = await connection.query("SELECT COUNT(*) as total FROM department"); // Replace department with the actual table name

        const totalRecords = totalCountResult[0].total;
        const pageSize = parsedTake;

        // Calculate the total number of pages needed for pagination
        const totalPages = Math.ceil(totalRecords / pageSize);

        // Query to get data based on the provided take and skip parameters
        const [data] = await connection.query(
          `SELECT * FROM department LIMIT ${parsedSkip}, ${parsedTake}` // Replace department with the actual table name
        );

        // Build the pagination numbers
        const paginationNumbers = Array.from({
          length: totalPages
        }, (_, i) => i + 1);

        // Send the response
        res.json({
          data,
          paginationNumbers
        });
      } catch (error) {
        console.error("Error while processing request:", error.message);
        res.status(500).json({
          error: "Internal server error"
        });
      }
    });
    app.get('/', (req, resp) => {
      resp.sendFile('server1.html', {
        root: path.join(serverPath, './../')
      })
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