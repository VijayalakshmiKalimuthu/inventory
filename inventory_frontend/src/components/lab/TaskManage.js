import React,{ useEffect, useState }from 'react';
import {Table} from 'react-bootstrap';

import {Button,ButtonToolbar } from 'react-bootstrap';
import { getIssueApi } from '../../services/AppinfoService';
import AddResearcherIssueTask from './AddResearcherIssueTask';



const TaskManage = () => {
    const [issues, setIssues] = useState([]);
    const [addModalShow, setAddModalShow] = useState(false);
    const [editModalShow, setEditModalShow] = useState(false);
    const [editIssues, setEditIssues] = useState([]);
    const [isUpdated, setIsUpdated] = useState(false);

    useEffect(() => {
      let mounted = true;
    
      console.log('Effect triggered. Checking conditions...');
    
      if (issues.length && !isUpdated) {
        console.log('Data already present and not updated. Returning early.');
        return;
      }
    
      console.log('Fetching new data...');
    
      getIssueApi()
        .then(data => {
          if (mounted) {
            console.log('Data received:', data);
            setIssues(data);
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
    }, [isUpdated, issues]);
    
    

    const handleAdd = (e) => {
        e.preventDefault();
        setAddModalShow(true);
    };

    
    let AddModelClose=()=>setAddModalShow(false);
    let EditModelClose=()=>setEditModalShow(false);
    return(
        <div className="container-fluid side-container">
        <div className="header-container">
          <h2 style={{ textAlign: 'center' }} className="appinfo-header">Issue Task</h2>
        </div>
        <div className="row side-row" >
        <p id="manage"></p>
            <Table striped bordered hover className="react-bootstrap-table" id="dataTable">
                <thead>
                <tr>
                  <th>Id</th>
                  <th>Researcher Name</th>
                  <th>Issue Task</th>
                  <th>Date/Time</th>
                  <th>Issue Raised By</th>
                  <th>Issue Status</th>
                </tr>
                </thead>
                <tbody>
                {issues.map((is) => (
                  <tr key={is.id}>
                      <td>{is.id}</td>
                      <td>{is.researcher_name || ''}</td>
                      <td>{is.issues_task || ''}</td>
                      <td>{is.date_time || ''}</td>
                      <td>{is.issue_raised_by || ''}</td>
                      <td>{is.issue_status || ''}</td>
                  </tr>))}

              </tbody>
            </Table>
            <ButtonToolbar>
                <Button variant="primary" onClick={handleAdd}>
                Add Task
                </Button>
                <AddResearcherIssueTask show={addModalShow} setUpdated={setIsUpdated}
                onHide={AddModelClose}></AddResearcherIssueTask>
            </ButtonToolbar>
        </div>
        </div>
    );
};

export default TaskManage;