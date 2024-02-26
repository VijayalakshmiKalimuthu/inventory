import React,{ useEffect, useState }from 'react';
import {Table} from 'react-bootstrap';

import {Button,ButtonToolbar } from 'react-bootstrap';
import { FaEdit } from 'react-icons/fa';
import AddEmployeeModal from "./AddEmployeeModal";
import UpdateEmployeeModal from "./UpdateEmployeeModal";
import { getEmployeeApi, inactiveEmployeeApi } from '../../../services/AppinfoService';


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

    const handleInactive = (e, emp_id) => {
      e.preventDefault();
      inactiveEmployeeApi(emp_id)
          .then(data => {
            alert('Employee Detail Inctived')
              console.log('Employee Detail inactive:', data);
              // Handle successful response, if needed
          })
          .catch(error => {
              console.error('Failed to delete Employee:', error);
              alert("Failed to Delete Employee Detail");
          });
  }; 

    let AddModelClose=()=>setAddModalShow(false);
    let EditModelClose=()=>setEditModalShow(false);
    return(
      <div >
        <div style={{background: "#C5EA31", height: '70px'}} className="header">
          <h2 style={{ textAlign: 'center', paddingTop: '15px' }} >EMPLOYEE MASTER</h2>
        </div>
          <div style={{ overflowY: 'scroll', maxHeight: '500px' }}>
        <div className="row side-row" style={{ textAlign: 'center' }}>
            <ButtonToolbar>
                <Button variant="primary" onClick={handleAdd}>
                Add Employee
                </Button>
                <AddEmployeeModal show={addModalShow} setUpdated={setIsUpdated}
                onHide={AddModelClose}></AddEmployeeModal>
            </ButtonToolbar>
        <p id="manage"></p>
            <Table striped bordered hover className="react-bootstrap-table" id="dataTable" style={{ margin: 'auto', width: '1000px' }}>
                <thead>
                <tr>
                <th style={{ backgroundColor: '#C5EA31',
                             width: '250px', 
                             color: 'black', 
                             textAlign: 'center', 
                             border: '1px solid black' }}>Employee Id</th>
                <th style={{ backgroundColor: '#C5EA31',
                             width: '250px', 
                             color: 'black', 
                             textAlign: 'center', 
                             border: '1px solid black' }}>Employee Name</th>
                <th style={{ backgroundColor: '#C5EA31',
                             width: '250px', 
                             color: 'black', 
                             textAlign: 'center', 
                             border: '1px solid black' }}>Designation</th>
                <th style={{ backgroundColor: '#C5EA31',
                             width: '250px', 
                             color: 'black', 
                             textAlign: 'center', 
                             border: '1px solid black' }}>Project Code</th>
                <th style={{ backgroundColor: '#C5EA31',
                             width: '250px', 
                             color: 'black', 
                             textAlign: 'center', 
                             border: '1px solid black' }}>Project Name</th>
                <th colspan="2" style={{ backgroundColor: '#C5EA31',
                             width: '250px', 
                             color: 'black', 
                             textAlign: 'center', 
                             border: '1px solid black' }}>Action</th>
                </tr>
                </thead>
                <tbody>
                {employees.map((emp) => (
                  <tr key={emp.emp_id}>
                      <td style={{ textAlign: 'center', 
                                 border: '1px solid black' }}>{emp.emp_id}</td>
                      <td style={{ textAlign: 'center', 
                                 border: '1px solid black' }}>{emp.emp_name || ''}</td>
                      <td style={{ textAlign: 'center', 
                                 border: '1px solid black' }}>{emp.designation || ''}</td>
                      <td style={{ textAlign: 'center', 
                                 border: '1px solid black' }}>{emp.project_code || ''}</td>
                      <td style={{ textAlign: 'center', 
                                 border: '1px solid black' }}>{emp.project_name || ''}</td>
                      <td style={{ textAlign: 'center', 
                                 border: '1px solid black' }}>
                          <Button className="mr-2" variant="secondary" onClick={(event) => handleInactive(event, emp.emp_id)}>
                              Inactive
                          </Button>
                          </td>
                        {/*  <td style={{ textAlign: 'center', 
                                 border: '1px solid black' }}>
                          <Button className="mr-2" onClick={(event) => handleUpdate(event, emp)}>
                              <FaEdit />
                          </Button>
                          <UpdateEmployeeModal show={editModalShow} employee={editEmployees} setUpdated={setIsUpdated} onHide={EditModelClose} />                       
                      </td> */ }
                  </tr>))}

              </tbody>
            </Table>
        </div>
        </div>
        </div>
    );
};

export default EmployeeManage;