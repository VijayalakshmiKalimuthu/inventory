import React, { useEffect, useState } from 'react';
import { Table, Button, ButtonToolbar, label } from 'react-bootstrap';
import { CDBContainer } from 'cdbreact';
import "../../../App.css";
import ChemicalList from './ChemicalList';
import LabwareList from './LabwareList';
import { getStockLevelApi } from '../../../services/AppinfoService';


const HomeLab = () => {
  // State to track which button is clicked
  const [selectedButton, setSelectedButton] = useState('ChemicalList');
  const [stockLevel, setStockLevel] = useState('')

  // Function to handle button click
  const handleButtonClick = (buttonName) => {
      setSelectedButton(buttonName);
  };

  useEffect(() => {
    getStockLevelApi()
      .then(response => response.json())
      .then(data => {
        setStockLevel(data.stock_level);
      })
      .catch(error => {
        console.error('Error fetching stock level:', error);
        setStockLevel('Error fetching stock level');
      });
  }, []);

  // Define background color based on stock level
  const backgroundColor = stockLevel === 'Stock is Sufficient' ? '#3cb371' : stockLevel === 'Stock has to be Reorder' ? 'red' : '';


  return (
      <div>
          <div style={{ background: "#C5EA31", height: '70px' }} className="header">
              <h2 style={{ textAlign: 'center', paddingTop: '15px', marginRight: '20px' }}>
                INVENTORY {' '} <label style={{ float: 'right', fontSize: '20px', fontWeight: 'bold', background: backgroundColor }}>{ stockLevel }</label>
              </h2>
          </div>
          <div className="header-menubar" style={{ textAlign: 'center' }}>
              <p id="manage"></p>
              <ButtonToolbar>
                  <Button variant="primary" onClick={() => handleButtonClick('LabwareList')} style={{ backgroundColor: selectedButton === 'LabwareList' ? '#D3D3D3' : '#C5EA31', 
                  width: '150px', margin: '10px', borderRadius: '20px', color: "black", fontWeight: "bold" }}>
                      Labware Inventory
                  </Button>

                  <Button variant="primary" onClick={() => handleButtonClick('ChemicalList')} style={{ backgroundColor: selectedButton === 'ChemicalList' ? '#D3D3D3' : '#C5EA31', 
                  width: '150px', margin: '10px', borderRadius: '20px', color: "black", fontWeight: "bold" }}>
                      Chemical Inventory
                  </Button>
              </ButtonToolbar>
          </div>
          <div className='main-container' style={{marginTop: '5px', marginLeft: '150px'}}>      
              <CDBContainer>
                  {/* Conditional rendering based on selectedButton */}
                  {selectedButton === 'ChemicalList' && <ChemicalList />}
                  {selectedButton === 'LabwareList' && <LabwareList />}
              </CDBContainer>          
          </div>
      </div>
  );
};

export default HomeLab;
