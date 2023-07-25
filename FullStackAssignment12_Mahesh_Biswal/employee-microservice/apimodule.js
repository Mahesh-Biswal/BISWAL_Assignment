import express from 'express';
import cors from 'cors';
import DataAccess from './dataaccess.js';

// define port

const PORT = process.env.PORT || 9001;

// create an express instance
const instance = express();
// add the CORS policy in middleware
instance.use(cors({
    origin:'*', // all origins
    methods: '*', // all methods
    allowedHeaders: '*' // all headers
}));
// add the JSON 
instance.use(express.json());
// URL encoding so that the body can be read
instance.use(express.urlencoded({extended:false}));

const da = new DataAccess();


instance.get('/api/emps', da.getEmployees);

instance.post('/api/emps', da.saveEmployee);

// Start Listening

instance.listen(PORT, ()=>{
     console.log(`Srever started on PORT : ${PORT}`);
});


