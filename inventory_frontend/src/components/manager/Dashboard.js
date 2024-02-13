import React, { useState } from 'react';
import { Button, ButtonToolbar } from 'react-bootstrap';
import { CDBContainer } from 'cdbreact';
import ProjectFilter from './dashboard/ProjectFilter';
import MasterFilter from './dashboard/MasterFilter';
import EmployeeFilter from './dashboard/EmployeeFilter';
import ReceivedFilter from './dashboard/ReceivedFilter';
import IssuedFilter from './dashboard/IssuedFilter';

const Dasboard = () => {
    // State to track which button is clicked
    const [selectedButton, setSelectedButton] = useState(null);

    // Function to handle button click
    const handleButtonClick = (buttonName) => {
        setSelectedButton(buttonName);
    };

    return (
        <div>
            <div style={{ background: "#C5EA31", height: '70px' }} className="header">
                <h2 style={{ textAlign: 'center', paddingTop: '15px' }}>INVENTORY TRANSACTION</h2>
            </div>
            <div className="header-menubar" style={{ textAlign: 'center' }}>
                <p id="manage"></p>
                <ButtonToolbar>
                    <Button variant="primary" onClick={() => handleButtonClick('ProjectFilter')} style={{ backgroundColor: '#C5EA31', 
                    width: '150px', margin: '10px', borderRadius: '20px', color: "black", fontWeight: "bold" }}>
                        Project
                    </Button>

                    <Button variant="primary" onClick={() => handleButtonClick('MasterFilter')} style={{ backgroundColor: '#C5EA31', 
                    width: '150px', margin: '10px', borderRadius: '20px', color: "black", fontWeight: "bold" }}>
                        Master
                    </Button>

                    <Button variant="primary" onClick={() => handleButtonClick('EmployeeFilter')} style={{ backgroundColor: '#C5EA31', 
                    width: '150px', margin: '10px', borderRadius: '20px', color: "black", fontWeight: "bold" }}>
                        Employee
                    </Button>

                    <Button variant="primary" onClick={() => handleButtonClick('ReceivedFilter')} style={{ backgroundColor: '#C5EA31', 
                    width: '150px', margin: '10px', borderRadius: '20px', color: "black", fontWeight: "bold" }}>
                        Receive
                    </Button>

                    <Button variant="primary" onClick={() => handleButtonClick('IssuedFilter')} style={{ backgroundColor: '#C5EA31', 
                    width: '150px', margin: '10px', borderRadius: '20px', color: "black", fontWeight: "bold" }}>
                        Issue
                    </Button>
                </ButtonToolbar>
            </div>
            <div className='main-container' style={{marginTop: '50px', marginLeft: '150px'}}>      
                <CDBContainer>
                    {/* Conditional rendering based on selectedButton */}
                    {selectedButton === 'ProjectFilter' && <ProjectFilter />}
                    {selectedButton === 'MasterFilter' && <MasterFilter />}
                    {selectedButton === 'EmployeeFilter' && <EmployeeFilter />}
                    {selectedButton === 'ReceivedFilter' && <ReceivedFilter />}
                    {selectedButton === 'IssuedFilter' && <IssuedFilter />}
                </CDBContainer>          
            </div>
        </div>
    );
};

export default Dasboard;
