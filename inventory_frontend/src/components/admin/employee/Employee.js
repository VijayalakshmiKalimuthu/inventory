import React, { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { getEmployeeApi } from '../../../services/AppinfoService';
import "../../../App.css";
import { NavLink } from 'react-router-dom';

const Employee = () => {
  const [employee, setEmployee] = useState([]);

  useEffect(() => {
    let mounted = true;
    getEmployeeApi()
      .then(data => {
        if (mounted) {
          setEmployee(data);
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  
    return () => (mounted = false);
  }, []);

  return(
    <div className="container-fluid side-container">
    <div className="header-container">
      <h2 style={{ textAlign: 'center' }} className="appinfo-header">Employees</h2>
    </div>
      <div className="row side-row">
        <NavLink exact to="/employee_manage" activeClassName="activeClicked" className="manage-button">
          <Button variant="primary" size="sm">
            Manage
          </Button>
        </NavLink>
    <p id="before-table"></p>
        <Table striped bordered hover className="react-bootstrap-table" id="dataTable">
        <thead>
            <tr>
            <th>Employee Id</th>
            <th>Employee Name</th>
            <th>Designation</th>
            <th>Project Code</th>
            <th>Project Name</th>
            </tr>
        </thead>
        <tbody>
            {employee.map((emp) =>
            <tr key={emp.id}>
                <td>{emp.emp_id}</td>
                <td>{emp.emp_name}</td>
                <td>{emp.designation}</td>
                <td>{emp.project_code}</td>
                <td>{emp.project_name}</td>
            </tr>)}
        </tbody>
    </Table>
    </div>
  </div>
  );
};

export default Employee;