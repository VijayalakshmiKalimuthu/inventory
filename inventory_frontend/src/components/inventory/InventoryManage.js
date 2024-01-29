import React,{ useEffect, useState }from 'react';
import {Table} from 'react-bootstrap';

import {Button,ButtonToolbar } from 'react-bootstrap';
import { FaEdit } from 'react-icons/fa';
import { RiDeleteBin5Line } from 'react-icons/ri';
import AddInventoryModal from "./AddInventoryModal";
import UpdateInventoryModal from "./UpdateInventoryModal";
import { getInventoryApi, deleteInventoryApi } from '../../services/AppinfoService';


const InventoryManage = () => {
    const [inventories, setInventory] = useState([]);
    const [addModalShow, setAddModalShow] = useState(false);
    const [editModalShow, setEditModalShow] = useState(false);
    const [editInventory, setEditInventory] = useState([]);
    const [isUpdated, setIsUpdated] = useState(false);

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
    
    const handleUpdate = (e, stu) => {
        e.preventDefault();
        setEditModalShow(true);
        setEditInventory(stu);
    };

    const handleAdd = (e) => {
        e.preventDefault();
        setAddModalShow(true);
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
                  <th>Dev Remarks</th>
                  <th colspan="2" style={{ textAlign: 'center' }}>Action</th>
                </tr>
                </thead>
                <tbody>
                {inventories.map((inven) => (
                  <tr key={inven.entry_no}>
                      <td>{inven.entry_no}</td>
                      <td>{inven.item_code || ''}</td>
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
                      <td>{inven.dev_remarks || ''}</td>
                      <td>
                          <Button className="mr-2" variant="danger" onClick={(event) => handleDelete(event, inven.entry_no)}>
                              <RiDeleteBin5Line />
                          </Button>
                      </td>
                      <td>
                          <Button className="mr-2" onClick={(event) => handleUpdate(event, inven)}>
                              <FaEdit />
                          </Button>
                          <UpdateInventoryModal show={editModalShow} inventory={editInventory} setUpdated={setIsUpdated} onHide={EditModelClose} />

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