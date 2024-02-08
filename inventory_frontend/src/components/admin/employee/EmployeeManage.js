import React,{ useEffect, useState }from 'react';
import {Table} from 'react-bootstrap';

import {Button,ButtonToolbar } from 'react-bootstrap';
import { FaEdit } from 'react-icons/fa';
import { RiDeleteBin5Line } from 'react-icons/ri';
import AddEmployeeModal from "./AddEmployeeModal";
import UpdateEmployeeModal from "./UpdateEmployeeModal";
import { getEmployeeApi, deleteEmployeeApi } from '../../../services/AppinfoService';


const EmployeeManage = () => {
    const [employees, setEmployees] = useState([]);
    const [addModalShow, setAddModalShow] = useState(false);
    const [editModalShow, setEditModalShow] = useState(false);
    const [editEmployees, setEditEmployees] = useState([]);
    const [isUpdated, setIsUpdated] = useState(false);

    useEffect(() => {
      let mounted = true;
    
      console.log('Effect triggered. Checking conditions...');
    
      if (employees.length && !isUpdated) {
        console.log('Data already present and not updated. Returning early.');
        return;
      }
    
      console.log('Fetching new data...');
    
      getEmployeeApi()
        .then(data => {
          if (mounted) {
            console.log('Employee Data received:', data);
            setEmployees(data);
          }
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    
      return () => {
        console.log('Cleanup: Effect will unmount.');
        mounted = false;
        setIsUpdated(false);
      };
    }, [isUpdated, employees]);
    
    const handleUpdate = (e, emp) => {
        e.preventDefault();
        setEditModalShow(true);
        setEditEmployees(emp);
    };

    const handleAdd = (e) => {
        e.preventDefault();
        setAddModalShow(true);
    };

    const handleDelete = (e, emp_id) => {
        if(window.confirm('Are you sure ?')){
            e.preventDefault();
            deleteEmployeeApi(emp_id)
            .then((result)=>{
                alert("Deleted Successfully");
                setIsUpdated(true);
            },
            (error)=>{
                alert("Failed to Delete Employee");
            })
        }
    };

    let AddModelClose=()=>setAddModalShow(false);
    let EditModelClose=()=>setEditModalShow(false);
    return(
        <div className="container-fluid side-container">
        <div className="header-container">
          <h2 style={{ textAlign: 'center' }} className="appinfo-header">EMPLOYEES</h2>
        </div>
        <div className="row side-row" >
        <p id="manage"></p>
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
                {employees.map((emp) => (
                  <tr key={emp.emp_id}>
                      <td>{emp.emp_id}</td>
                      <td>{emp.emp_name || ''}</td>
                      <td>{emp.designation || ''}</td>
                      <td>{emp.project_code || ''}</td>
                      <td>{emp.project_name || ''}</td>
                      <td>
                          <Button className="mr-2" variant="danger" onClick={(event) => handleDelete(event, emp.emp_id)}>
                              <RiDeleteBin5Line />
                          </Button>
                          <span>&nbsp;&nbsp;&nbsp;</span>
                          <Button className="mr-2" onClick={(event) => handleUpdate(event, emp)}>
                              <FaEdit />
                          </Button>
                          <UpdateEmployeeModal show={editModalShow} employee={editEmployees} setUpdated={setIsUpdated} onHide={EditModelClose} />

                      </td>
                  </tr>))}

              </tbody>
            </Table>
            <ButtonToolbar>
                <Button variant="primary" onClick={handleAdd}>
                Add Employee
                </Button>
                <AddEmployeeModal show={addModalShow} setUpdated={setIsUpdated}
                onHide={AddModelClose}></AddEmployeeModal>
            </ButtonToolbar>
        </div>
        </div>
    );
};

export default EmployeeManage;