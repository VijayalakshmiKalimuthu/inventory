import React, { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { getTempReceiveApi } from '../../../services/AppinfoService';
import "../../../App.css";

const TempReceiveTable = () => {
  const [receive, setReceive] = useState([]);
  const [isUpdated, setIsUpdated] = useState(false);

  useEffect(() => {
    let mounted = true;
    getTempReceiveApi()
      .then(data => {
        if (mounted) {
          setReceive(data);
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  
    return () => {
        mounted = false;
        setIsUpdated(false);
    };
  }, [isUpdated, receive]);

  return(
    <div >
        <div style={{ overflowY: 'scroll', maxHeight: '230px' }}>
      <div className="row side-row" style={{ textAlign: 'center' }}>
        <p id="before-table"></p>
        <Table striped bordered hover className="react-bootstrap-table" id="dataTable">
        <thead>
            <tr>
            <th style={{ backgroundColor: '#C5EA31',
                             width: '250px', 
                             color: 'black', 
                             textAlign: 'center', 
                             border: '1px solid black' }}>Bill Detail</th>
            <th style={{ backgroundColor: '#C5EA31',
                             width: '250px', 
                             color: 'black', 
                             textAlign: 'center', 
                             border: '1px solid black' }}>Item Code</th>
            <th style={{ backgroundColor: '#C5EA31',
                             width: '250px', 
                             color: 'black', 
                             textAlign: 'center', 
                             border: '1px solid black' }}>Item Name</th>
            <th style={{ backgroundColor: '#C5EA31',
                             width: '250px', 
                             color: 'black', 
                             textAlign: 'center', 
                             border: '1px solid black' }}>Units</th>
            <th style={{ backgroundColor: '#C5EA31',
                             width: '250px', 
                             color: 'black', 
                             textAlign: 'center', 
                             border: '1px solid black' }}>Receipt Date</th>
            <th style={{ backgroundColor: '#C5EA31',
                             width: '250px', 
                             color: 'black', 
                             textAlign: 'center', 
                             border: '1px solid black' }}>Quantity Received</th>
            <th style={{ backgroundColor: '#C5EA31',
                             width: '250px', 
                             color: 'black', 
                             textAlign: 'center', 
                             border: '1px solid black' }}>PO Number</th>
            <th style={{ backgroundColor: '#C5EA31',
                             width: '250px', 
                             color: 'black', 
                             textAlign: 'center', 
                             border: '1px solid black' }}>Batch/Lot Number</th>
            <th style={{ backgroundColor: '#C5EA31',
                             width: '250px', 
                             color: 'black', 
                             textAlign: 'center', 
                             border: '1px solid black' }}>Remarks</th>
            </tr>
        </thead>
        <tbody>
            {receive.map((inven) =>
            <tr key={inven.id}>
            <td style={{ textAlign: 'center', 
                             border: '1px solid black' }}>{inven.bill_no}</td>
                <td style={{ textAlign: 'center', 
                                 border: '1px solid black' }}>{inven.item_code}</td>
                <td style={{ textAlign: 'center', 
                                 border: '1px solid black' }}>{inven.item_name}</td>
                <td style={{ textAlign: 'center', 
                                 border: '1px solid black' }}>{inven.units}</td>
                <td style={{ textAlign: 'center', 
                                 border: '1px solid black' }}>{inven.receipt_date}</td>
                <td style={{ textAlign: 'center', 
                                 border: '1px solid black' }}>{inven.quantity_received}</td>
                <td style={{ textAlign: 'center', 
                                 border: '1px solid black' }}>{inven.po_number}</td>
                <td style={{ textAlign: 'center', 
                                 border: '1px solid black' }}>{inven.batch_number}</td>
                <td style={{ textAlign: 'center', 
                                 border: '1px solid black' }}>{inven.remarks}</td>
            </tr>)}
        </tbody>
    </Table>
    </div>
    </div>
  </div>
  );
};

export default TempReceiveTable;