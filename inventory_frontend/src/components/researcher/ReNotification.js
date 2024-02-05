import React, { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import "../../App.css";
import { NavLink } from 'react-router-dom';
import { getIssueApi } from '../../services/AppinfoService';

const ReNotification = () => {
  const [students, setNotifys] = useState([]);

  useEffect(() => {
    let mounted = true;
    getIssueApi()
      .then(data => {
        if (mounted) {
          setNotifys(data);
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
      <h2 style={{ textAlign: 'center' }} className="appinfo-header">Task</h2>
    </div>
      <div className="row side-row">
        
    <p id="before-table"></p>
        <Table striped bordered hover className="react-bootstrap-table" id="dataTable">
        <thead>
            <tr>
            <th>Id</th>
            <th>Reseacher Name</th>
            <th>Issue Task</th>
            <th>Date</th>
            <th>Issue Raised By</th>
            <th>Issue Status</th>
            </tr>
        </thead>
        <tbody>
            {students.map((ainfo) =>
            <tr key={ainfo.id}>
                <td>{ainfo.id}</td>
                <td>{ainfo.researcher_name}</td>
                <td>{ainfo.issues_task}</td>
                <td>{ainfo.date_time}</td>
                <td>{ainfo.issue_raised_by}</td>
                <td>{ainfo.issue_status}</td>
            </tr>)}
        </tbody>
    </Table>
    </div>
  </div>
  );
};

export default ReNotification;