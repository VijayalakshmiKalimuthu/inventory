import React,{ useEffect, useState }from 'react';
import {Table} from 'react-bootstrap';

import {Button,ButtonToolbar } from 'react-bootstrap';
import { FaEdit } from 'react-icons/fa';
import { RiDeleteBin5Line } from 'react-icons/ri';
import AddChemicalModal from "./AddChemicalModal";
import UpdateChemicalModal from "./UpdateChemicalModal";
import { getMasterApi, deleteChemicalApi, getRequestApi } from '../../services/AppinfoService';
import { useNavigate } from 'react-router-dom';
import { HiArrowCircleUp } from 'react-icons/hi';
import ApprovalChemicalModal from './ApprovalChemicalModal';
import { FaBell } from 'react-icons/fa';
import NoteStatus from './NoteStatus';


const ChemicalManage = () => {
    const [chemicals, setChemicals] = useState([]);
    const [addModalShow, setAddModalShow] = useState(false);
    const [editModalShow, setEditModalShow] = useState(false);
    const [editChemicals, setEditChemicals] = useState([]);
    const [isUpdated, setIsUpdated] = useState(false);
    const [approvalModalShow, setApprovalModalShow] = useState(false)
    const [itemCode, setItemCode] = useState('');
    const [itemName, setItemName] = useState('');
    const [itemType, setItemType] = useState('');

    const [modalShow, setModalShow] = useState(false);

    const handleShowModal = () => {
        setModalShow(true);
    };

    const handleCloseModal = () => {
        setModalShow(false);
    };

    useEffect(() => {
      let mounted = true;
    
      console.log('Effect triggered. Checking conditions...');
    
      if (chemicals.length && !isUpdated) {
        console.log('Data already present and not updated. Returning early.');
        return;
      }
    
      console.log('Fetching new data...');
    
      getMasterApi()
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
                (request.ItemType === 'Chemical' || request.ItemType === 'Inventory') &&
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

    const handleOpenApp = (e, itemCode, itemName, itemType) => {
      e.preventDefault();
      setApprovalModalShow(true);
      setItemCode(itemCode); // assuming you have a state variable to store itemCode
      setItemName(itemName); 
      setItemType(itemType);
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
      <div >
        <div style={{ background: "#C5EA31", height: '70px' }} className="header">
            <h2 style={{ textAlign: 'center', paddingTop: '15px', marginRight: '8px' }}>INVENTORY MASTER {' '}
            <FaBell onClick={handleShowModal} />
            <NoteStatus show={modalShow} setUpdated={setIsUpdated} onHide={handleCloseModal} />
            </h2>
        </div>
        <div className="row side-row" style={{ textAlign: 'center' }}>
            <ButtonToolbar>
                <Button variant="primary" onClick={handleAdd}>
                Add
                </Button>
                <AddChemicalModal show={addModalShow} setUpdated={setIsUpdated}
                onHide={AddModelClose}></AddChemicalModal>
            </ButtonToolbar>
        <p id="manage"></p>
            <Table striped bordered hover className="react-bootstrap-table" id="dataTable">
                <thead>
                <tr>
                <th>Id</th>
                  <th>Entry No</th>
                  <th>Item Code</th>
                  <th>Item Name</th>
                  <th>Date</th>
                  <th>Supplier</th>
                  <th>Master Type</th>
                  <th>Quantity</th>
                  <th>Units</th>
                  <th>Price</th>
                  <th>Project Code</th>
                  <th>Remarks</th>
                  <th colspan="2" style={{ textAlign: 'center' }}>Action</th>
                </tr>
                </thead>
                <tbody>
                {chemicals.map((chem) => (
                  <tr key={chem.c_id}>
                      <td>{chem.c_id}</td>
                      <td>{chem.entry_no || ''}</td>
                      <td>{chem.item_code || ''}</td>
                      <td>{chem.item_name || ''}</td>
                      <td>{chem.m_date || ''}</td>
                      <td>{chem.supplier || ''}</td>
                      <td>{chem.master_type || ''}</td>
                      <td>{chem.quantity || ''}</td>
                      <td>{chem.units || ''}</td>
                      <td>{chem.price || ''}</td>
                      <td>{chem.project_code || ''}</td>
                      <td>{chem.remarks || ''}</td>
                      {/*<td>
                          <Button className="mr-2" variant="danger" onClick={(event) => handleDelete(event, chem.c_id)}>
                              <RiDeleteBin5Line />
                          </Button>
                </td> */}
                      <td>
                          <Button className="mr-2" onClick={(event) => handleUpdate(event, chem, chem.item_code, chem.item_name)}>
                              <FaEdit style={{ fontSize: '24px' }} />
                          </Button>
                          <UpdateChemicalModal show={editModalShow} chemical={editChemicals} setUpdated={setIsUpdated} onHide={EditModelClose} />

                      </td>
                      <td>
                        <Button className='mr-2'onClick={(e) => handleOpenApp(e, chem.item_code, chem.item_name, chem.master_type)} style={{ backgroundColor: 'green', color: 'white' }}>
                          <HiArrowCircleUp style={{ fontSize: '24px' }}/>
                          </Button>
                          <ApprovalChemicalModal
                            show={approvalModalShow}
                            setUpdated={setIsUpdated}
                            onHide={ApprovalModalClose}
                            itemCode={itemCode} 
                            itemName={itemName} 
                            itemType={itemType}
                          />
                      </td>
                  </tr>))}

              </tbody>
            </Table>
        </div>
        </div>
    );
};

export default ChemicalManage;