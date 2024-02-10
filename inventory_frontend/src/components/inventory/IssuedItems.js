import React, { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { getItemIssueApi } from '../../services/AppinfoService';
import "../../App.css";
import { NavLink } from 'react-router-dom';

const IssuedItems = () => {
  const [issued, setIssued] = useState([]);

  useEffect(() => {
    let mounted = true;
    getItemIssueApi()
      .then(data => {
        if (mounted) {
          setIssued(data);
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  
    return () => (mounted = false);
  }, []);

  return(
    <div >
      <div style={{background: "#C5EA31", height: '70px'}} className="header">
        <h2 style={{ textAlign: 'center', paddingTop: '15px' }} >ISSUE</h2>
      </div>
      <div className="row side-row" style={{ textAlign: 'center' }}>
        <p id="before-table"></p>
        <Table striped bordered hover className="react-bootstrap-table" id="dataTable">
        <thead>
            <tr>
            <th>Entry No</th>
            <th>Item Code</th>
            <th>Item Name</th>
            <th>Units</th>
            <th>Issue Date</th>
            <th>Quantity Issued</th>
            <th>Issued To</th>
            <th>Project Code</th>
            <th>Project Name</th>
            <th>Researcher Name</th>
            <th>Batch/Lot Number</th>
            <th>Remarks</th>
            </tr>
        </thead>
        <tbody>
            {issued.map((inven) =>
            <tr key={inven.id}>
                <td>{inven.entry_no}</td>
                <td>{inven.item_code}</td>
                <td>{inven.item_name}</td>
                <td>{inven.units}</td>
                <td>{inven.issue_date}</td>
                <td>{inven.quantity_issued}</td>
                <td>{inven.issued_to}</td>
                <td>{inven.project_code}</td>
                <td>{inven.project_name}</td>
                <td>{inven.researcher_name}</td>
                <td>{inven.batch_number}</td>
                <td>{inven.remarks}</td>
            </tr>)}
        </tbody>
    </Table>
    </div>
  </div>
  );
};

export default IssuedItems;