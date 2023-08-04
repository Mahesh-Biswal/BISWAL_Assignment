import express from 'express';
import cors from 'cors';
import bodyParser from "body-parser";
import mysql from "mysql2";
import path from 'path';
import {
  fileURLToPath
} from 'url';
const serverPath = fileURLToPath(
  import.meta.url);

const app = express();
const port = 3000; // Change this port number to the desired one

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "mahesh",
  database: "new_schema",
  port: 3067
});

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

// CREATE operation - Add a new customer
app.post('/customer', (req, res) => {
  const {
    name,
    email,
    phone,
    password
  } = req.body;

  // Assuming the 'customers' table has columns 'name', 'email', 'phone', and 'password'
  pool.query(
    'INSERT INTO customers (name, email, phone, password) VALUES (?, ?, ?, ?)',
    [name, email, phone, password],
    (err, results) => {
      if (err) {
        console.error('Error inserting data:', err);
        return res.status(500).json({
          error: 'Error inserting data'
        });
      }

      // Redirect the user back to the checkout page after successful login
      res.status(201).json({
        message: 'Customer added successfully',
        customerId: results.insertId,
        redirect: '/checkout'
      });
    }
  );
});

app.post('/login', (req, res) => {
  const {
    email,
    password
  } = req.body;

  // Assuming you have a table named 'customers' with columns 'email' and 'password'
  pool.query('SELECT * FROM customers WHERE email = ?', [email], (err, results) => {
    if (err) {
      console.error('Error fetching customer:', err);
      return res.status(500).json({
        error: 'Error fetching customer'
      });
    }

    if (results.length === 0) {
      return res.status(401).json({
        error: 'Invalid credentials'
      });
    }

    const customer = results[0];
    // Compare hashed passwords (in a real application, you should use bcrypt or similar)
    if (customer.password !== password) {

      return res.status(401).json({
        error: 'Invalid credentials'
      });
    }
    res.json({
      message: 'Login successful'
    });
  });
});

// READ operation - Get a specific customer
app.get('/customer/:customerId', (req, res) => {
  const customerId = req.params.customerId;

  pool.query('SELECT * FROM customers WHERE id = ?', [customerId], (err, results) => {
    if (err) {
      console.error('Error fetching customer:', err);
      return res.status(500).json({
        error: 'Error fetching customer'
      });
    }

    if (results.length === 0) {
      return res.status(404).json({
        error: 'Customer not found'
      });
    }

    res.json(results[0]);
  });
});
// Create a route to fetch product data from the 'product' table
app.get('/products', (req, res) => {
  const category = req.query.category; // Get the category from the query parameter

  let query = 'SELECT * FROM products';
  if (category && category !== 'All') {
    query += ' WHERE category = ?';
  }
  pool.query(query, [category], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error fetching data');
    }
    // Send the modified product data to the client
    const modifiedProducts = results.map((product) => {
      return {
        id: product.id,
        prdName: product.prdName,
        prdImage: product.prdImage,
        price: product.price,
        instock: product.instock > 0, // Converting the value to a boolean (true if instock > 0, false otherwise)
      };
    });
    res.send(modifiedProducts);
  });
});
// Create operation - Add a new order
app.post('/placeOrder', (req, res) => {
  const {
    name,
    email,
    number,
    address,
    prdName,
    prdImage,
    price,
    orderNumber

  } = req.body;

  // Assuming the 'orders' table has columns 'name', 'email', 'number', 'address', 'orderNumber', 'prdName', 'prdImage', and 'price'
  pool.query(
    'INSERT INTO orders (name, email, number, address, prdName, prdImage, price, orderNumber ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [name, email, number, address, prdName, prdImage, price, orderNumber],
    (err, results) => {
      if (err) {
        console.error('Error inserting data:', err);
        return res.status(500).json({
          error: 'Error inserting data'
        });
      }
      // Reduce the 'instock' value of the ordered product by 1
      pool.query('UPDATE products SET instock = instock - 1 WHERE prdName = ?', [prdName], (err, updateResults) => {
        if (err) {
          console.error('Error updating inventory:', err);
          return res.status(500).json({
            error: 'Error updating inventory'
          });
        }

        res.status(201).json({
          message: 'Order placed successfully',
          orderId: results.insertId
        });
      });
    }
  );
});
// READ operation - Get order history for a specific customer based on email
app.get('/orderHistory', (req, res) => {
  const email = req.query.email; // Get the customer's email from the query parameter

  pool.query('SELECT * FROM orders WHERE email = ?', [email], (err, results) => {
    if (err) {
      console.error('Error fetching order history:', err);
      return res.status(500).json({
        error: 'Error fetching order history'
      });
    }

    res.json(results);
  });
});
// Add a new route to handle the checkout page
app.get('/checkout', (req, resp) => {
  resp.sendFile('homepage.html', {
    root: path.join(serverPath, './../')
  });
});

app.get('/', (req, resp) => {
  resp.sendFile('homePage.html', {
    root: path.join(serverPath, './../')
  });
});
app.get('/customer', (req, resp) => {
  resp.sendFile('customers.html', {
    root: path.join(serverPath, './../')
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});