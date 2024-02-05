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
        <div className="container-fluid side-container">
        <div className="header-container">
          <h2 style={{ textAlign: 'center' }} className="appinfo-header">Notifications</h2>
        </div>
        <div className="row side-row" >
        <p id="manage"></p>
            <Table striped bordered hover className="react-bootstrap-table" id="dataTable">
                <thead>
                <tr>
                <th>Id</th>
                  <th>Item Code</th>
                  <th>Item Type</th>
                  <th>Item Name</th>
                  <th>Request Date</th>
                  <th>Request Status</th>
                  <th>Requested By</th>
                  <th>Request Details</th>
                  <th>Approved By</th>
                  <th colspan="2" style={{ textAlign: 'center' }}>Action</th>
                </tr>
                </thead>
                <tbody>
                {note.map((no) => (
                  <tr key={no.id}>
                      <td>{no.id}</td>
                      <td>{no.ItemCode || ''}</td>
                      <td>{no.ItemType || ''}</td>
                      <td>{no.ItemName || ''}</td>
                      <td>{no.RequestDate || ''}</td>
                      <td>{no.RequestStatus || ''}</td>
                      <td>{no.RequestedBy || ''}</td>
                      <td>{no.RequestDetails || ''}</td>
                      <td>{no.ApprovedBy || ''}</td>                    
                      <td>
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
    );
};

export default Notification;