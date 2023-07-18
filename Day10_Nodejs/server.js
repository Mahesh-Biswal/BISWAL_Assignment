/* This is a complete server thatn will work on data as well as UI Files */
import express from 'express';
import fs from 'fs';
import path from 'path';
import {
    fileURLToPath
} from 'url';
import http from 'http';
// /* Data Storage */
let employees = [{
        EmpNo: 1,
        EmpName: 'A',
        DeptName: 'D1'
    },
    {
        EmpNo: 2,
        EmpName: 'B',
        DeptName: 'D2'
    },
    {
        EmpNo: 3,
        EmpName: 'C',
        DeptName: 'D3'
    },
    {
        EmpNo: 4,
        EmpName: 'D',
        DeptName: 'D1'
    },
    {
        EmpNo: 5,
        EmpName: 'E',
        DeptName: 'D2'
    },
    {
        EmpNo: 6,
        EmpName: 'F',
        DeptName: 'D3'
    },
    {
        EmpNo: 7,
        EmpName: 'G',
        DeptName: 'D1'
    },
    {
        EmpNo: 8,
        EmpName: 'H',
        DeptName: 'D2'
    },
    {
        EmpNo: 9,
        EmpName: 'I',
        DeptName: 'D3'
    },
];

const PORT = process.env.PORT || 7005;

const instance = express();

const serverPath = fileURLToPath(
    import.meta.url);

instance.use(
    express.static(path.join(serverPath, './../getData&PostData/server.js'))
);

// define routing for various HTML pages from 'views' folder

const router = express.Router();

instance.use(router);
// respond the HTML from Express Server
// from the path the is configured in
// Middleware and now used as root on express server

router.get('/', (req, resp) => {
    resp.sendFile('home.html', {
        root: path.join(serverPath, './../')
    })
});
//  route to handle the GET request and return the data
router.get('/get-data', (req, resp) => {
    resp.setHeader('Access-Control-Allow-Origin', '*');
    resp.status(200).json(employees);
});
instance.post('/', express.json(), (req, resp) => {
    try {
        const newEmployee = req.body;
        employees.push(newEmployee);
        resp.setHeader('Access-Control-Allow-Origin', '*');
        resp.status(201).json(newEmployee);
    } catch (error) {
        resp.status(400).json({
            error: 'Invalid JSON data for new employee.'
        });
    }
});

instance.listen(PORT, () => {
    console.log(`UI App Started on Port ${PORT}`);
});