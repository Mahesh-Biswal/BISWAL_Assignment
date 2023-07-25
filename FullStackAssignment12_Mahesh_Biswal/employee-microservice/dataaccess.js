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
];




class DataAccess {
    getEmployees(req,resp){
        return resp.status(200).send({
            message: 'Employees Data',
            data: employees
        });
    }
    saveEmployee(req,resp){
        // read body
        const emp = req.body;
        employees.push(emp);
        return resp.status(200).send({
            message: 'Employees with added Data',
            data: employees
        });
    }
}

// Export the DataAccess class a Custom Node.js module
// SO that it can be imported in otehr Node.js module
export default DataAccess;