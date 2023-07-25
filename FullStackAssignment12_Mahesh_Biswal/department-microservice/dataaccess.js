let department = [
    {DeptNo:1, EmpName: 'A', DeptName: 'D1'},
    {DeptNo:2, EmpName: 'B', DeptName: 'D2'},
    {DeptNo:3, EmpName: 'C', DeptName: 'D3'},
    {DeptNo:4, EmpName: 'D', DeptName: 'D1'},
    {DeptNo:5, EmpName: 'E', DeptName: 'D2'},
    {DeptNo:6, EmpName: 'F', DeptName: 'D3'},
    {DeptNo:7, EmpName: 'G', DeptName: 'D1'},
    {DeptNo:8, EmpName: 'H', DeptName: 'D2'},
    {DeptNo:9, EmpName: 'I', DeptName: 'D3'},
];




class DataAccess {
    getDeparment(req,resp){
        return resp.status(200).send({
            message: 'Employees Data',
            data: department
        });
    }
    saveDeparment(req,resp){
        // read body
        const dep = req.body;
        employees.push(dep);
        return resp.status(200).send({
            message: 'Department with added Data',
            data: department
        });
    }
}


export default DataAccess;