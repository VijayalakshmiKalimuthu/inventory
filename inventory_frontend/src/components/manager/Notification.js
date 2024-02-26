import React,{ useEffect, useState }from 'react';
import {Table} from 'react-bootstrap';

import {Button,ButtonToolbar } from 'react-bootstrap';
import { FaEdit } from 'react-icons/fa';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { getRequestApi } from '../../services/AppinfoService';
import AdminApprovalModal from './AdminApproval';


const Notification = () => {
    const [note, setNote] = useState([]);
    const [addModalShow, setAddModalShow] = useState(false);
    const [editModalShow, setEditModalShow] = useState(false);
    const [editNotes, setEditNotes] = useState([]);
    const [isUpdated, setIsUpdated] = useState(false);


    useEffect(() => {
      let mounted = true;
    
      console.log('Effect triggered. Checking conditions...');
    
      if (note.length && !isUpdated) {
        console.log('Data already present and not updated. Returning early.');
        return;
      }
    
      console.log('Fetching new data...');
    
      getRequestApi()
        .then(data => {
          if (mounted) {
            console.log('Request Data received:', data);
            setNote(data);
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
    }, [isUpdated, note]);
    
    const handleUpdate = (e, stu) => {
      e.preventDefault();
      setEditModalShow(true);
      setEditNotes(stu);
  };

    const handleAdd = (e) => {
        e.preventDefault();
        setAddModalShow(true);
    };

    let AddModelClose=()=>setAddModalShow(false);
    let EditModelClose=()=>setEditModalShow(false);
    return(
      <div >
        <div style={{background: "#C5EA31", height: '70px'}} className="header">
          <h2 style={{ textAlign: 'center', paddingTop: '15px' }} >NOTIFICATION</h2>
        </div>
          <div style={{ overflowY: 'scroll', maxHeight: '480px' }}>
        <div className="row side-row" style={{ textAlign: 'center' }}>
        <p id="manage"></p>
            <Table striped bordered hover className="react-bootstrap-table" id="dataTable" style={{ margin: 'auto', width: '1500px' }}>
                <thead>
                <tr>
                <th style={{ backgroundColor: '#C5EA31',
                             width: '250px', 
                             color: 'black', 
                             textAlign: 'center', 
                             border: '1px solid black' }}>Id</th>
                  <th style={{ backgroundColor: '#C5EA31',
                             width: '250px', 
                             color: 'black', 
                             textAlign: 'center', 
                             border: '1px solid black' }}>Item Code</th>
                  <th style={{ backgroundColor: '#C5EA31',
                             width: '250px', 
                             color: 'black', 
                             textAlign: 'center', 
                             border: '1px solid black' }}>Item Type</th>
                  <th style={{ backgroundColor: '#C5EA31',
                             width: '250px', 
                             color: 'black', 
                             textAlign: 'center', 
                             border: '1px solid black' }}>Item Name</th>
                  <th style={{ backgroundColor: '#C5EA31',
                             width: '250px', 
                             color: 'black', 
                             textAlign: 'center', 
                             border: '1px solid black' }}>Request Date</th>
                  <th style={{ backgroundColor: '#C5EA31',
                             width: '500px', 
                             color: 'black', 
                             textAlign: 'center', 
                             border: '1px solid black' }}>Request Status</th>
                  <th style={{ backgroundColor: '#C5EA31',
                             width: '250px', 
                             color: 'black', 
                             textAlign: 'center', 
                             border: '1px solid black' }}>Requested By</th>
                  <th style={{ backgroundColor: '#C5EA31',
                             width: '500px', 
                             color: 'black', 
                             textAlign: 'center', 
                             border: '1px solid black' }}>Request Details</th>
                  <th style={{ backgroundColor: '#C5EA31',
                             width: '250px', 
                             color: 'black', 
                             textAlign: 'center', 
                             border: '1px solid black' }}>Approved By</th>
                  <th colspan="2" style={{ backgroundColor: '#C5EA31',
                             width: '250px', 
                             color: 'black', 
                             textAlign: 'center', 
                             border: '1px solid black' }}>Action</th>
                </tr>
                </thead>
                <tbody>
                {note.map((no) => (
                  <tr key={no.id}>
                      <td style={{ textAlign: 'center', 
                                 border: '1px solid black' }}>{no.id}</td>
                      <td style={{ textAlign: 'center', 
                                 border: '1px solid black' }}>{no.ItemCode || ''}</td>
                      <td style={{ textAlign: 'center', 
                                 border: '1px solid black' }}>{no.ItemType || ''}</td>
                      <td style={{ textAlign: 'center', 
                                 border: '1px solid black' }}>{no.ItemName || ''}</td>
                      <td style={{ textAlign: 'center', 
                                 border: '1px solid black' }}>{no.RequestDate || ''}</td>
                      <td style={{ textAlign: 'center', 
                                 border: '1px solid black' }}>{no.RequestStatus || ''}</td>
                      <td style={{ textAlign: 'center', 
                                 border: '1px solid black' }}>{no.RequestedBy || ''}</td>
                      <td style={{ textAlign: 'center', 
                                 border: '1px solid black' }}>{no.RequestDetails || ''}</td>
                      <td style={{ textAlign: 'center', 
                                 border: '1px solid black' }}>{no.ApprovedBy || ''}</td>                    
                      <td style={{ textAlign: 'center', 
                                 border: '1px solid black' }}>
                          <Button className="mr-2" onClick={(event) => handleUpdate(event, no)}>
                              <FaEdit />
                          </Button>
                          <AdminApprovalModal show={editModalShow} request={editNotes} setUpdated={setIsUpdated} onHide={EditModelClose} />

                      </td>
                  </tr>))}

              </tbody>
            </Table>
        </div>
        </div>
        </div>
    );
};

export default Notification;