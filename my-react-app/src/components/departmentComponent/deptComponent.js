import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TableComponent from '../../reUsableComponents/tablecomponent';
import { DepartmentService } from "../../services/departmentservice";

const DeptCompoent = () => {

    const [dept, setDept] = useState({ DeptNo: 0, DeptName: '', Location: '', Capacity: 0 });
    const [depts, setDepts] = useState([]);

    const [message, setMessage] = useState('');
    /* Service instance */

    let serv = new DepartmentService();

    const locations = [
        { value: 'Pune', label: 'Pune' },
        { value: 'Mumbai', label: 'Mumbai' },
        { value: 'Chennai', label: 'Chennai' },
        { value: 'Bengaluru', label: 'Bengaluru' },
      ];

    /* use useEffect() to get data from REST APIs */

    useEffect(() => {
        // Use Axios to fetch data from the backend API
        axios.get('http://localhost:3043/department')
            .then((response) => {
                setDepts(response.data);
                setMessage('Data read is successful');
            })
            .catch((error) => {
                setMessage(`Data read failed ${error}`);
            });
    }, []);

    const clear = () => {
        setDept({ DeptNo: 0, DeptName: '', Location: '', Capacity: 0 });
      };
      
    const add = () => {
        // Use the DepartmentService to send a POST request to the backend API to add a new department
        serv.postData(dept)
        .then((response) => {
          // Handle the response if needed
          setMessage('Data added successfully.');
          // Clear the form after adding a new department
          clear();
          // Fetch the updated list of departments after adding
          axios.get('http://localhost:3043/department')
            .then((response) => {
              setDepts(response.data);
            })
            .catch((error) => {
              setMessage(`Data read failed ${error}`);
            });
        })
        .catch((error) => {
          setMessage(`Data add failed: ${error}`);
        });
    };

    const update = () => {
        serv.putData(dept.DeptNo, dept)
          .then((response) => {
            // Handle the response if needed
            setMessage('Data updated successfully.');
            // Fetch the updated list of departments after updating
            axios.get('http://localhost:3043/department')
              .then((response) => {
                setDepts(response.data);
              })
              .catch((error) => {
                setMessage(`Data read failed ${error}`);
              });
          })
          .catch((error) => {
            setMessage(`Data update failed: ${error}`);
          });
      };
      

    const handleDelete = (row) => {
        // Make the REST API call to delete the record using the 'row' data.

        setDepts(depts.filter((item) => item.DeptNo !== row.DeptNo));
    };

    return (
        <div className="container">
            <h3>Call to REST API</h3>

            <div className="form-control">
                <label>DeptNo:</label>
                <input className="form-control" value={dept.DeptNo} onChange={(evt) => setDept({ ...dept, DeptNo: evt.target.value })}></input>
            </div>
            <div className="form-control">
                <label>DeptName:</label>
                <input className="form-control" value={dept.DeptName} onChange={(evt) => setDept({ ...dept, DeptName: evt.target.value })}></input>
            </div>
            <div className="form-control">
                <label>Location:</label>
                <select className="form-control" value={dept.Location} onChange={(evt) => setDept({ ...dept, Location: evt.target.value })}>
                    {/* generation options dynamically */}
                    <option key="selectLocation">Select Location</option>
                    {locations.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>
            <div className="form-control">
                <label>Capacity:</label>
                <input className="form-control" value={dept.Capacity} onChange={(evt) => setDept({ ...dept, Capacity: evt.target.value })}></input>
            </div>
            <div className="btn-group-lg">
                <button className="btn btn-primary" onClick={add}>Add</button>
                <button className='btn btn-warning' onClick={update}>Update</button>
                <button className="btn btn-info" onClick={clear}>Clear</button>


                {/* Delete button should be shown only if canDelete is true */}
                {/* {canDelete && (
                    <button className='btn btn-danger' onClick={() => handleDelete(dept)}>
                        Delete
                    </button>
                )} */}
            </div>
            <br />
            <div className='container'>
                <strong>
                    {message}
                </strong>
            </div>
            <hr />
            <hr />
            {/* Pass canDelete and deleteRecord as props to TableComponent */}
            <TableComponent selectedRow={(row) => setDept(row)} dataSource={depts} canDelete={true} deleteRecord={handleDelete}></TableComponent>

        </div>
    )
}

export default DeptCompoent;