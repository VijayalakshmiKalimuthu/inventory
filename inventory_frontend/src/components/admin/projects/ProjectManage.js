import React,{ useEffect, useState }from 'react';
import {Table} from 'react-bootstrap';

import {Button,ButtonToolbar } from 'react-bootstrap';
import { FaEdit } from 'react-icons/fa';
import { RiDeleteBin5Line } from 'react-icons/ri';
import AddProjectModal from "./AddProjectModal";
import UpdateProjectModal from "./UpdateProjectModal";
import { getProjectApi, inactiveProjectApi } from '../../../services/AppinfoService';


const ProjectManage = () => {
    const [projects, setProjects] = useState([]);
    const [addModalShow, setAddModalShow] = useState(false);
    const [editModalShow, setEditModalShow] = useState(false);
    const [editProjects, setEditProjects] = useState([]);
    const [isUpdated, setIsUpdated] = useState(false);

    useEffect(() => {
      let mounted = true;
    
      console.log('Effect triggered. Checking conditions...');
    
      if (projects.length && !isUpdated) {
        console.log('Data already present and not updated. Returning early.');
        return;
      }
    
      console.log('Fetching new data...');
    
      getProjectApi()
        .then(data => {
          if (mounted) {
            console.log('Project Data received:', data);
            setProjects(data);
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
    }, [isUpdated, projects]);
    
    const handleUpdate = (e, stu) => {
        e.preventDefault();
        setEditModalShow(true);
        setEditProjects(stu);
    };

    const handleAdd = (e) => {
        e.preventDefault();
        setAddModalShow(true);
    };

    const handleInactive = (e, project_code) => {
      e.preventDefault();
      inactiveProjectApi(project_code)
          .then(data => {
            alert('Project Inctived')
              console.log('Project inactive:', data);
              // Handle successful response, if needed
          })
          .catch(error => {
              console.error('Failed to delete project:', error);
              alert("Failed to Delete App Info");
          });
  }; 

    let AddModelClose=()=>setAddModalShow(false);
    let EditModelClose=()=>setEditModalShow(false);
    return(
      <div >
        <div style={{background: "#C5EA31", height: '70px'}} className="header">
          <h2 style={{ textAlign: 'center', paddingTop: '15px' }} >PROJECT MASTER</h2>
        </div>
          <div style={{ overflowY: 'scroll', maxHeight: '500px' }}>
        <div className="row side-row" style={{ textAlign: 'center' }}>
            <ButtonToolbar>
                <Button variant="primary" onClick={handleAdd}>
                Add Project
                </Button>
                <AddProjectModal show={addModalShow} setUpdated={setIsUpdated}
                onHide={AddModelClose}></AddProjectModal>
            </ButtonToolbar>
        <p id="manage"></p>
            <Table striped bordered hover className="react-bootstrap-table" id="dataTable" style={{ margin: 'auto', width: '500px' }}>
                <thead>
                <tr>
                <th style={{ backgroundColor: '#C5EA31',
                             width: '250px', 
                             color: 'black', 
                             textAlign: 'center', 
                             border: '1px solid black' }}>Project Code</th>
                  <th style={{ backgroundColor: '#C5EA31',
                             width: '250px', 
                             color: 'black', 
                             textAlign: 'center', 
                             border: '1px solid black' }}>Projects Name</th>
                  <th style={{ backgroundColor: '#C5EA31',
                             width: '250px', 
                             color: 'black', 
                             textAlign: 'center', 
                             border: '1px solid black' }}>Action</th>
                </tr>
                </thead>
                <tbody>
                {projects.map((proj) => (
                  <tr key={proj.project_code}>
                      <td style={{ textAlign: 'center', 
                                 border: '1px solid black' }}>{proj.project_code}</td>
                      <td style={{ textAlign: 'center', 
                                 border: '1px solid black' }}>{proj.project_name || ''}</td>
                      <td style={{ textAlign: 'center', border: '1px solid black' }}>
                          <Button className="mr-2" variant='secondary' onClick={(event) => handleInactive(event, proj.project_code)} style={{ backgroundColor: 'thickgray'}}>
                              Inactive
                          </Button>
                          { /* <span>&nbsp;&nbsp;&nbsp;</span>
                          <Button className="mr-2" onClick={(event) => handleUpdate(event, proj)}>
                              <FaEdit />
                          </Button>
                          <UpdateProjectModal show={editModalShow} project={editProjects} setUpdated={setIsUpdated} onHide={EditModelClose} />
                */ }
                      </td>
                  </tr>))}

              </tbody>
            </Table>
        </div>
        </div>
        </div>
    );
};

export default ProjectManage;