import http from 'http';
const port = 4434;
/* Data Storage */
let employees = [
    {EmpNo:1, EmpName: 'A', DeptName: 'D1'},
    {EmpNo:2, EmpName: 'B', DeptName: 'D2'},
    {EmpNo:3, EmpName: 'C', DeptName: 'D3'},
    {EmpNo:4, EmpName: 'D', DeptName: 'D1'},
    {EmpNo:5, EmpName: 'E', DeptName: 'D2'},
    {EmpNo:6, EmpName: 'F', DeptName: 'D3'},
    {EmpNo:7, EmpName: 'G', DeptName: 'D1'},
    {EmpNo:8, EmpName: 'H', DeptName: 'D2'},
    {EmpNo:9, EmpName: 'I', DeptName: 'D3'},
    {EmpNo:10, EmpName: 'j', DeptName: 'D1'},
    {EmpNo:11, EmpName: 'k', DeptName: 'D2'},
];

/*create server*/

const server = http.createServer((req,resp)=>{

    /* detect the method and accrdingly implement the request processing */
     /* the GET request */
     if (req.method === 'GET') {
      /* Read the request header */
      const empName = req.headers.empname;
      const deptName = req.headers.deptname;

      /* Filter data from employees based on empName and deptName */
      const filteredEmployees = employees.filter((employee) => {
          return (
              (!empName || employee.EmpName === empName) &&
              (!deptName || employee.DeptName === deptName)
          );
      });

      /* Send the filtered data */
      resp.writeHead(200, { 'Content-Type': 'application/json' });
      /* JSON response for employees data */
      resp.write(JSON.stringify(filteredEmployees));
      resp.end();

    }
   


   /* The POST Request */

   if (req.method === 'POST') {
      /* CORS Settings*/
            /* Allow requests from all origins */
            resp.setHeader('Access-Control-Allow-Origin',"*"); 
            /* Allow requests from all HTTP Methods GET/POST/PUT/DELETE */
        resp.setHeader('Access-Control-Allow-Methods',"*");
    console.log('The POST Request');
    let receivedData;
    /* Start evaluating the request */
    /* Chunk is the stream of received data by the server over the request */
    req.on('data', (chunk) => {
        /* Stream parsed into JSON */
        receivedData = JSON.parse(chunk);
    });
    /* Complete the data processing and return response */
    req.on('end', () => {
        employees.push(receivedData);
        resp.writeHead(200, { 'Content-Type': 'application/json' });
        /* JSON response for employees data */
        resp.write(JSON.stringify(employees));
        resp.end();
    });
}

     /* The PUT Request */
     if (req.method === 'PUT') {
      console.log('The PUT Request');
      let body = '';
      req.on('data', (chunk) => {
        body += chunk.toString();
      });

      req.on('end', () => {
        const updatedEmployee = JSON.parse(body);
        const id = parseInt(updatedEmployee.EmpNo);
        const employeeIndex = employees.findIndex((employee) => employee.EmpNo === id);

        if (employeeIndex !== -1) {
          employees[employeeIndex] = updatedEmployee;
          resp.writeHead(200, { 'Content-Type': 'application/json' });
          resp.write(JSON.stringify(employees[employeeIndex]));
        } else {
          resp.writeHead(404, { 'Content-Type': 'application/json' });
          resp.write(JSON.stringify({ message: 'Employee not found' }));
        }

        resp.end();
      });
    }

   /* The DELETE Request */

   if (req.method === 'DELETE') {
    console.log('The DELETE Request');
    /* Read id from headers */
    const id = parseInt(req.headers.id);
    /* Find the employee by id */
    const employeeIndex = employees.findIndex((employee) => employee.EmpNo === id);
    if (employeeIndex !== -1) {
        /* Delete the record from the array */
        employees.splice(employeeIndex, 1);
        /* Respond with the modified array */
        resp.writeHead(200, { 'Content-Type': 'application/json' });
        /* JSON response for the modified employee array */
        resp.write(JSON.stringify(employees));
    } else {
        resp.writeHead(404, { 'Content-Type': 'application/json' });
        /* JSON response for not found */
        resp.write(JSON.stringify({ message: 'Employee not found' }));
    }
    resp.end();

}

});


server.listen(port);
console.log('Server started on 4434');
