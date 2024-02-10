import React, { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { getItemReceiveApi } from '../../services/AppinfoService';
import "../../App.css";
import { NavLink } from 'react-router-dom';

const ReceivedItems = () => {
  const [receive, setReceive] = useState([]);

  useEffect(() => {
    let mounted = true;
    getItemReceiveApi()
      .then(data => {
        if (mounted) {
          setReceive(data);
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
        <h2 style={{ textAlign: 'center', paddingTop: '15px' }} >RECEIVE</h2>
      </div>
      <div className="row side-row" style={{ textAlign: 'center' }}>
        <p id="before-table"></p>
        <Table striped bordered hover className="react-bootstrap-table" id="dataTable">
        <thead>
            <tr>
            <th>Item Code</th>
            <th>Item Name</th>
            <th>Units</th>
            <th>Receipt Date</th>
            <th>PO Number</th>
            <th>Batch/Lot Number</th>
            <th>Remarks</th>
            </tr>
        </thead>
        <tbody>
            {receive.map((inven) =>
            <tr key={inven.id}>
                <td>{inven.item_code}</td>
                <td>{inven.item_name}</td>
                <td>{inven.units}</td>
                <td>{inven.receipt_date}</td>
                <td>{inven.po_number}</td>
                <td>{inven.batch_number}</td>
                <td>{inven.remarks}</td>
            </tr>)}
        </tbody>
    </Table>
    </div>
  </div>
  );
};

export default ReceivedItems;