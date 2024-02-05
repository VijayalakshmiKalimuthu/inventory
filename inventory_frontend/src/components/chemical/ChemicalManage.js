import React,{ useEffect, useState }from 'react';
import {Table} from 'react-bootstrap';

import {Button,ButtonToolbar } from 'react-bootstrap';
import { FaEdit } from 'react-icons/fa';
import { RiDeleteBin5Line } from 'react-icons/ri';
import AddChemicalModal from "./AddChemicalModal";
import UpdateChemicalModal from "./UpdateChemicalModal";
import { getChemicalApi, deleteChemicalApi, getRequestApi } from '../../services/AppinfoService';
import { useNavigate } from 'react-router-dom';
import { HiArrowCircleUp } from 'react-icons/hi';
import ApprovalChemicalModal from './ApprovalChemicalModal';


const ChemicalManage = () => {
    const [chemicals, setChemicals] = useState([]);
    const [addModalShow, setAddModalShow] = useState(false);
    const [editModalShow, setEditModalShow] = useState(false);
    const [editChemicals, setEditChemicals] = useState([]);
    const [isUpdated, setIsUpdated] = useState(false);
    const [approvalModalShow, setApprovalModalShow] = useState(false)
    const [itemCode, setItemCode] = useState('');
    const [itemName, setItemName] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
      let mounted = true;
    
      console.log('Effect triggered. Checking conditions...');
    
      if (chemicals.length && !isUpdated) {
        console.log('Data already present and not updated. Returning early.');
        return;
      }
    
      console.log('Fetching new data...');
    
      getChemicalApi()
        .then(data => {
          if (mounted) {
            console.log('Chemical Data received:', data);
            setChemicals(data);
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
    }, [isUpdated, chemicals]);
    
    const handleUpdate = (e, stu, item_code, item_name) => {
      e.preventDefault();
    
      // Fetch request data from the API
      getRequestApi()
        .then((response) => {
          console.log('API Response:', response);
    
          // Check if there is at least one request in the array
          if (response.length > 0) {
            let found = false;
    
            for (let i = 0; i < response.length; i++) {
              const request = response[i];
    
              // Check if the current request meets all conditions
              if (
                request.ItemType === 'Chemical' &&
                request.ItemCode === item_code &&
                request.ItemName === item_name &&
                request.RequestStatus === 'Approved'
              ) {
                found = true;
    
                // Perform actions if all conditions are met
                setEditModalShow(true);
                setEditChemicals(stu);
              }
            }
    
            if (!found) {
              console.log('No request found with matching conditions.');
              alert('Request is not approved.'); // Alert if conditions are not met
            }
          } else {
            console.log('No requests found in the response.');
            alert('Please send a request.'); // Alert if there are no requests
          }
        })
        .catch((error) => {
          console.error('Error fetching request data:', error);
        });
    };

    const handleAdd = (e) => {
        e.preventDefault();
        setAddModalShow(true);
    };

    const handleOpenApp = (e, itemCode, itemName) => {
      e.preventDefault();
      setApprovalModalShow(true);
      setItemCode(itemCode); // assuming you have a state variable to store itemCode
      setItemName(itemName); // assuming you have a state variable to store itemName
    };


    const handleDelete = (e, entry_no) => {
        if(window.confirm('Are you sure ?')){
            e.preventDefault();
            deleteChemicalApi(entry_no)
            .then((result)=>{
                alert("Deleted Successfully");
                setIsUpdated(true);
            },
            (error)=>{
                alert("Failed to Delete App Info");
            })
        }
    };

    let AddModelClose=()=>setAddModalShow(false);
    let EditModelClose=()=>setEditModalShow(false);
    let ApprovalModalClose=()=>setApprovalModalShow(false);

    return(
        <div className="container-fluid side-container">
        <div className="header-container">
          <h2 style={{ textAlign: 'center' }} className="appinfo-header">Chemicals</h2>
        </div>
        <div className="row side-row" >
        <p id="manage"></p>
            <Table striped bordered hover className="react-bootstrap-table" id="dataTable">
                <thead>
                <tr>
                <th>Chemical Id</th>
                  <th>Entry No</th>
                  <th>Item Code</th>
                  <th>Item Name</th>
                  <th>Unit</th>
                  <th>Project Code</th>
                  <th>Remarks</th>
                  <th>Created On</th>
                  <th>Created By</th>
                  <th>Modified On</th>
                  <th>Modified By</th>
                  <th>Batch/Lot Number</th>
                  <th>Issue Date</th>
                  <th>Issue To</th>
                  <th>Quantity Issued</th>
                  <th>Quantity Received</th>
                  <th>Stock </th>
                  <th>Dev Remarks</th> 
                  <th colspan="3" style={{ textAlign: 'center' }}>Action</th>
                </tr>
                </thead>
                <tbody>
                {chemicals.map((chem) => (
                  <tr key={chem.c_id}>
                      <td>{chem.c_id}</td>
                      <td>{chem.entry_no || ''}</td>
                      <td>{chem.item_code || ''}</td>
                      <td>{chem.item_name || ''}</td>
                      <td>{chem.unit || ''}</td>
                      <td>{chem.project_code || ''}</td>
                      <td>{chem.remarks || ''}</td>
                      <td>{chem.created_on || ''}</td>
                      <td>{chem.created_by || ''}</td>
                      <td>{chem.modified_on || ''}</td>
                      <td>{chem.modified_by || ''}</td>
                      <td>{chem.batch_number || ''}</td>
                      <td>{chem.issue_date || ''}</td>
                      <td>{chem.issue_to || ''}</td>
                      <td>{chem.quantity_issued || ''}</td>
                      <td>{chem.quantity_recieved}</td>
                      <td>{chem.stock || ''}</td>
                      <td>{chem.dev_remarks || ''}</td>
                      <td></td>
                      <td>
                          <Button className="mr-2" variant="danger" onClick={(event) => handleDelete(event, chem.c_id)}>
                              <RiDeleteBin5Line />
                          </Button>
                      </td>
                      <td>
                          <Button className="mr-2" onClick={(event) => handleUpdate(event, chem, chem.item_code, chem.item_name)}>
                              <FaEdit />
                          </Button>
                          <UpdateChemicalModal show={editModalShow} chemical={editChemicals} setUpdated={setIsUpdated} onHide={EditModelClose} />

                      </td>
                      <td>
                        <Button className='mr-2' onClick={handleOpenApp}>
                          <HiArrowCircleUp />
                          </Button>
                          <ApprovalChemicalModal
                            show={approvalModalShow}
                            setUpdated={setIsUpdated}
                            onHide={ApprovalModalClose}
                            itemCode={chem.item_code} // pass itemCode as a prop
                            itemName={chem.item_name} // pass itemName as a prop
                          />
                      </td>
                  </tr>))}

              </tbody>
            </Table>
            <ButtonToolbar>
                <Button variant="primary" onClick={handleAdd}>
                Add Chemical
                </Button>
                <AddChemicalModal show={addModalShow} setUpdated={setIsUpdated}
                onHide={AddModelClose}></AddChemicalModal>
            </ButtonToolbar>
        </div>
        </div>
    );
};

export default ChemicalManage;