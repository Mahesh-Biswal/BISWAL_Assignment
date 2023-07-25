import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import DataAccess from './dataaccess.js';
import path from 'path';
import { fileURLToPath } from 'url';
const serverPath = fileURLToPath(import.meta.url);

// Define port
const PORT = process.env.PORT || 7007;

// Create an express instance
const instance = express();

instance.get('/', (req, resp) => {
    resp.sendFile('loginForm.html', { root: path.join(serverPath, './../') });
});

// Add the CORS policy in middleware
instance.use(cors({
    origin: '*', // all origins
    methods: '*', // all methods
    allowedHeaders: '*' // all headers
}));

// Add the JSON middleware
instance.use(express.json());

// URL encoding middleware so that the body can be read
instance.use(express.urlencoded({ extended: false }));

// Secret key for JWT
const secretKey = 'maheshbiswal_maheshbiswal_maheshbiswal'; // Replace with a strong secret key in production

// Mock user data for authentication
const users = [
    { username: 'maheshbiswal', password: 'maheshbiswal' },
    { username: 'papu', password: 'papu' },
    // Add more users if needed
];

const da = new DataAccess();

// Authentication endpoint to get JWT token
instance.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        // Generate JWT token
        const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });
        res.status(200).json({ token });
    } else {
        res.status(401).json({ message: 'Authentication failed' });
    }
});

// Authorization middleware
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: 'Access token not found' });
    }

    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }
        req.user = user;
        next();
    });
}

// REST Methods, the second parameter is RequestHandler
// that is executing 'Callback' functions
// these functions MUST accept Http Request and Response 
// objects

// Secured data endpoint, add authenticateToken middleware to protect this endpoint
instance.get('/api/emps', authenticateToken, da.getEmployees);

instance.post('/api/emps', authenticateToken, da.saveEmployee);
// Start Listening
instance.listen(PORT, () => {
    console.log(`Server started on PORT: ${PORT}`);
});
