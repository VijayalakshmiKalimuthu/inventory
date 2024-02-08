import React, { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { getProjectApi } from '../../../services/AppinfoService';
import "../../../App.css";
import { NavLink } from 'react-router-dom';

const Project = () => {
  const [project, setProject] = useState([]);

  useEffect(() => {
    let mounted = true;
    getProjectApi()
      .then(data => {
        if (mounted) {
          setProject(data);
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
      <h2 style={{ textAlign: 'center' }} className="appinfo-header">Project Master</h2>
    </div>
      <div className="row side-row">
        <NavLink exact to="/admin/project_manage" activeClassName="activeClicked" className="manage-button">
          <Button variant="primary" size="sm">
            Manage
          </Button>
        </NavLink>
    <p id="before-table"></p>
    <Table striped bordered hover className="react-bootstrap-table" id="dataTable" style={{ margin: 'auto', width: '500px' }}>
        <thead>
            <tr>
                <th style={{ backgroundColor: 'green',
                             width: '250px', 
                             color: 'white', 
                             textAlign: 'center', 
                             border: '1px solid black' }}>Project Code</th>
                <th style={{ backgroundColor: 'green', 
                             width: '250px', 
                             color: 'white', 
                             textAlign: 'center', 
                             border: '1px solid black' }}>Project Name</th>
            </tr>
        </thead>
        <tbody>
            {project.map((pro) => (
                <tr key={pro.id}>
                    <td style={{ textAlign: 'center', 
                                 border: '1px solid black' }}>{pro.project_code}</td>
                    <td style={{ textAlign: 'center', 
                                 border: '1px solid black' }}>{pro.project_name}</td>
                </tr>
            ))}
        </tbody>
    </Table>

    </div>
  </div>
  );
};

export default Project;