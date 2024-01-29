import React,{ useEffect, useState }from 'react';
import {Table} from 'react-bootstrap';

import {Button,ButtonToolbar } from 'react-bootstrap';
import { FaEdit } from 'react-icons/fa';
import { RiDeleteBin5Line } from 'react-icons/ri';
import AddChemicalModal from "./AddChemicalModal";
import UpdateChemicalModal from "./UpdateChemicalModal";
import { getChemicalApi, deleteChemicalApi } from '../../services/AppinfoService';


const Manage = () => {
    const [chemicals, setChemicals] = useState([]);
    const [addModalShow, setAddModalShow] = useState(false);
    const [editModalShow, setEditModalShow] = useState(false);
    const [editChemicals, setEditChemicals] = useState([]);
    const [isUpdated, setIsUpdated] = useState(false);

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
    
    const handleUpdate = (e, stu) => {
        e.preventDefault();
        setEditModalShow(true);
        setEditChemicals(stu);
    };

    const handleAdd = (e) => {
        e.preventDefault();
        setAddModalShow(true);
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
                  <th>Dev Remarks</th>
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
                      <td>{chem.unit || ''}</td>
                      <td>{chem.project_code || ''}</td>
                      <td>{chem.remarks || ''}</td>
                      <td>{chem.created_on || ''}</td>
                      <td>{chem.created_by || ''}</td>
                      <td>{chem.modified_on || ''}</td>
                      <td>{chem.modified_by || ''}</td>
                      <td>{chem.dev_remarks || ''}</td>
                      <td>
                          <Button className="mr-2" variant="danger" onClick={(event) => handleDelete(event, chem.c_id)}>
                              <RiDeleteBin5Line />
                          </Button>
                      </td>
                      <td>
                          <Button className="mr-2" onClick={(event) => handleUpdate(event, chem)}>
                              <FaEdit />
                          </Button>
                          <UpdateChemicalModal show={editModalShow} chemical={editChemicals} setUpdated={setIsUpdated} onHide={EditModelClose} />

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

export default Manage;