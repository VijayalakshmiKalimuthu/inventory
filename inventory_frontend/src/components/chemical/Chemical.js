import React, { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { getChemicalApi } from '../../services/AppinfoService';
import "../../App.css";
import { NavLink } from 'react-router-dom';

const Chemical = () => {
  const [chemical, setChemical] = useState([]);

  useEffect(() => {
    let mounted = true;
    getChemicalApi()
      .then(data => {
        if (mounted) {
          setChemical(data);
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  
    return () => (mounted = false);
  }, []);

  return(
    <div className="container-fluid side-container">
    <div className="header-container">
      <h2 style={{ textAlign: 'center' }} className="appinfo-header">Chemicals</h2>
    </div>
      <div className="row side-row">
        <NavLink exact to="/chemical_manage" activeClassName="activeClicked" className="manage-button">
          <Button variant="primary" size="sm">
            Manage
          </Button>
        </NavLink>
    <p id="before-table"></p>
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
            </tr>
        </thead>
        <tbody>
            {chemical.map((chem) =>
            <tr key={chem.id}>
                <td>{chem.c_id}</td>
                <td>{chem.entry_no}</td>
                <td>{chem.item_code}</td>
                <td>{chem.item_name}</td>
                <td>{chem.unit}</td>
                <td>{chem.project_code}</td>
                <td>{chem.remarks}</td>
                <td>{chem.created_on}</td>
                <td>{chem.created_by}</td>
                <td>{chem.modified_on}</td>
                <td>{chem.modified_by}</td>
                <td>{chem.dev_remarks}</td>
            </tr>)}
        </tbody>
    </Table>
    </div>
  </div>
  );
};

export default Chemical;