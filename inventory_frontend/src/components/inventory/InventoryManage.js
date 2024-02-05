import React,{ useEffect, useState }from 'react';
import {Table} from 'react-bootstrap';

import {Button,ButtonToolbar } from 'react-bootstrap';
import { FaEdit } from 'react-icons/fa';
import { RiDeleteBin5Line } from 'react-icons/ri';
import AddInventoryModal from "./AddInventoryModal";
import UpdateInventoryModal from "./UpdateInventoryModal";
import { getInventoryApi, deleteInventoryApi, getRequestApi } from '../../services/AppinfoService';
import { useNavigate } from 'react-router-dom';
import { HiArrowCircleUp } from "react-icons/hi";
import ApprovalInventoryModal from './ApprovalInventoryModal';


const InventoryManage = () => {
    const [inventories, setInventory] = useState([]);
    const [addModalShow, setAddModalShow] = useState(false);
    const [editModalShow, setEditModalShow] = useState(false);
    const [editInventory, setEditInventory] = useState([]);
    const [isUpdated, setIsUpdated] = useState(false);
    const [approvalModalShow, setApprovalModalShow] = useState(false)
    const [itemCode, setItemCode] = useState('');
    const [itemName, setItemName] = useState('');
  

    const navigate = useNavigate();

    useEffect(() => {
      let mounted = true;
    
      console.log('Effect triggered. Checking conditions...');
    
      if (inventories.length && !isUpdated) {
        console.log('Data already present and not updated. Returning early.');
        return;
      }
    
      console.log('Fetching new data...');
    
      getInventoryApi()
        .then(data => {
          if (mounted) {
            console.log('Inventory Data received:', data);
            setInventory(data);
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
    }, [isUpdated, inventories]);
    
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
                request.ItemType === 'Inventory' &&
                request.ItemCode === item_code &&
                request.ItemName === item_name &&
                request.RequestStatus === 'Approved'
              ) {
                found = true;
    
                // Perform actions if all conditions are met
                setEditModalShow(true);
                setEditInventory(stu);
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

    const handleDelete = (e, eno) => {
        if(window.confirm('Are you sure ?')){
            e.preventDefault();
            deleteInventoryApi(eno)
            .then((result)=>{
                alert("Deleted Successfully");
                setIsUpdated(true);
            },
            (error)=>{
                alert("Failed to Delete Inventory");
            })
        }
    };

    let AddModelClose=()=>setAddModalShow(false);
    let EditModelClose=()=>setEditModalShow(false);
    let ApprovalModalClose=()=>setApprovalModalShow(false);

    return(
        <div className="container-fluid side-container">
        <div className="header-container">
          <h2 style={{ textAlign: 'center' }} className="appinfo-header">Inventory</h2>
        </div>
        <div className="row side-row" >
        <p id="manage"></p>
            <Table striped bordered hover className="react-bootstrap-table" id="dataTable">
                <thead>
                <tr>
                  <th>Entry No</th>
                  <th>Item Code</th>
                  <th>Item Name</th>
                  <th>Tran Type IR</th>
                  <th>Quantity</th>
                  <th>Ref Number</th>
                  <th>Ref Type</th>
                  <th>Batch Number</th>
                  <th>Remarks</th>
                  <th>Created On</th>
                  <th>Created By</th>
                  <th>Modified On</th>
                  <th>Modified By</th>
                  <th>Quantity Issued</th>
                  <th>Quantity Recieved</th>
                  <th>Stock</th>
                  <th>Dev Remarks</th>
                  <th colspan="3" style={{ textAlign: 'center' }}>Action</th>
                </tr>
                </thead>
                <tbody>
                {inventories.map((inven) => (
                  <tr key={inven.entry_no}>
                      <td>{inven.entry_no}</td>
                      <td>{inven.item_code || ''}</td>
                      <td>{inven.item_name || ''}</td>
                      <td>{inven.tran_type_IR || ''}</td>
                      <td>{inven.qnty || ''}</td>
                      <td>{inven.ref_number || ''}</td>
                      <td>{inven.ref_type || ''}</td>
                      <td>{inven.batch_number || ''}</td>
                      <td>{inven.remarks || ''}</td>
                      <td>{inven.created_on || ''}</td>
                      <td>{inven.created_by || ''}</td>
                      <td>{inven.modified_on || ''}</td>
                      <td>{inven.modified_by || ''}</td>
                      <td>{inven.quantity_issued || ''}</td>
                      <td>{inven.quantity_recieved || ''}</td>
                      <td>{inven.stock || ''}</td>
                      <td>{inven.dev_remarks || ''}</td>
                      <td>
                          <Button className="mr-2" variant="danger" onClick={(event) => handleDelete(event, inven.entry_no)}>
                              <RiDeleteBin5Line />
                          </Button>
                      </td>
                      <td>
                          <Button className="mr-2" onClick={(event) => handleUpdate(event, inven, inven.item_code, inven.item_name)}>
                              <FaEdit />
                          </Button>
                          <UpdateInventoryModal show={editModalShow} inventory={editInventory} setUpdated={setIsUpdated} onHide={EditModelClose} />

                      </td>
                      <td>
                        <Button className='mr-2' onClick={handleOpenApp}>
                          <HiArrowCircleUp />
                          </Button>
                          <ApprovalInventoryModal
                            show={approvalModalShow}
                            setUpdated={setIsUpdated}
                            onHide={ApprovalModalClose}
                            itemCode={inven.item_code} // pass itemCode as a prop
                            itemName={inven.item_name} // pass itemName as a prop
                          />
                      </td>
                  </tr>))}

              </tbody>
            </Table>
            <ButtonToolbar>
                <Button variant="primary" onClick={handleAdd}>
                Add Inventory
                </Button>
                <AddInventoryModal show={addModalShow} setUpdated={setIsUpdated}
                onHide={AddModelClose}></AddInventoryModal>
            </ButtonToolbar>
        </div>
        </div>
    );
};

export default InventoryManage;