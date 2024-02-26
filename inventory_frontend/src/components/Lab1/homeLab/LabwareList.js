import React, { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { getMasterLabwareApi } from '../../../services/AppinfoService';
import "../../../App.js";
import { FaEdit } from 'react-icons/fa';
import LabwareUpdate from '../update/LabwareUpdate.js';

const LabwareList = () => {
  const [masters, setMasters] = useState([]);
  const [addModalShow, setAddModalShow] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);
  const [editProjects, setEditProjects] = useState([]);
  const [isUpdated, setIsUpdated] = useState(false);


  useEffect(() => {
    let mounted = true;
    getMasterLabwareApi()
      .then(data => {
        if (mounted) {
          setMasters(data);
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  
      return () => {
         mounted = false;
         setIsUpdated(false);
      };
    }, [isUpdated, masters]);

  const handleUpdate = (e, stu) => {
    e.preventDefault();
    setEditModalShow(true);
    setEditProjects(stu);
};

let EditModelClose=()=>setEditModalShow(false);


  return(
    <div >
        <div style={{ overflowY: 'scroll', maxHeight: '350px' }}>
            <div className="row side-row" style={{ textAlign: 'center'}}>
                <p id="before-table"></p>
                <Table striped bordered hover className="react-bootstrap-table" id="dataTable">
                  <thead>
                    <tr>
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
                             border: '1px solid black' }}>Stock</th>
                      <th style={{ backgroundColor: '#C5EA31',
                             width: '250px', 
                             color: 'black', 
                             textAlign: 'center', 
                             border: '1px solid black' }}>Units</th>
                      <th style={{ backgroundColor: '#C5EA31',
                             width: '250px', 
                             color: 'black', 
                             textAlign: 'center', 
                             border: '1px solid black' }}>Price</th>
                      <th style={{ backgroundColor: '#C5EA31',
                             width: '250px', 
                             color: 'black', 
                             textAlign: 'center', 
                             border: '1px solid black' }}>Make</th>
                      <th style={{ backgroundColor: '#C5EA31',
                             width: '250px', 
                             color: 'black', 
                             textAlign: 'center', 
                             border: '1px solid black' }}>Instruction/ Specification</th>
                      <th style={{ backgroundColor: '#C5EA31',
                             width: '250px', 
                             color: 'black', 
                             textAlign: 'center', 
                             border: '1px solid black' }}>Min Req Stock</th>
                      <th style={{ backgroundColor: '#C5EA31',
                             width: '250px', 
                             color: 'black', 
                             textAlign: 'center', 
                             border: '1px solid black' }}>Quantity Received</th>
                      <th style={{ backgroundColor: '#C5EA31',
                             width: '250px', 
                             color: 'black', 
                             textAlign: 'center', 
                             border: '1px solid black' }}>Quantity Issued</th>
                      <th style={{ backgroundColor: '#C5EA31',
                             width: '250px', 
                             color: 'black', 
                             textAlign: 'center', 
                             border: '1px solid black' }}>Location Code</th>
                      <th style={{ backgroundColor: '#C5EA31',
                             width: '250px', 
                             color: 'black', 
                             textAlign: 'center', 
                             border: '1px solid black' }}>Remarks</th>
                      <th style={{ backgroundColor: '#bdb76b',
                             width: '250px', 
                             color: 'black', 
                             textAlign: 'center', 
                             border: '1px solid black' }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {masters.map((master) =>
                      <tr key={master.c_id}>
                        <td style={{ textAlign: 'center', 
                                 border: '1px solid black' }}>{master.item_code}</td>
                        <td style={{ textAlign: 'center', 
                                 border: '1px solid black' }}>{master.item_name}</td>
                        <td style={{ textAlign: 'center', 
                                 border: '1px solid black' }}>{master.quantity}</td>
                        <td style={{ textAlign: 'center', 
                                 border: '1px solid black' }}>{master.units}</td>
                        <td style={{ textAlign: 'center', 
                                 border: '1px solid black' }}>{master.price}</td>
                        <td style={{ textAlign: 'center', 
                                 border: '1px solid black' }}>{master.make}</td>
                        <td style={{ textAlign: 'center', 
                                 border: '1px solid black' }}>{master.instruction_specification}</td>
                        <td style={{ textAlign: 'center', 
                                 border: '1px solid black' }}>{master.min_req_stock}</td>
                        <td style={{ textAlign: 'center', 
                                 border: '1px solid black' }}>{master.quantity_received}</td>
                        <td style={{ textAlign: 'center', 
                                 border: '1px solid black' }}>{master.quantity_issued}</td>
                        <td style={{ textAlign: 'center', 
                                 border: '1px solid black' }}>{master.location_code}</td>
                        <td style={{ textAlign: 'center', 
                                 border: '1px solid black' }}>{master.remarks}</td>
                        <td style={{ textAlign: 'center', 
                                 border: '1px solid black' }}>
                          <Button className="mr-2" onClick={(event) => handleUpdate(event, master)}>
                              <FaEdit />
                          </Button>
                          <LabwareUpdate show={editModalShow} chemical={editProjects} setUpdated={setIsUpdated} onHide={EditModelClose} />
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
            </div>
        </div>
    </div>
  );
};

export default LabwareList;
