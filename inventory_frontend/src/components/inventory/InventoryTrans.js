import React, { useState } from 'react';
import { Button, ButtonToolbar } from 'react-bootstrap';
import AddInventoryReceiveModal from "./AddInventoryReceiveModal";
import AddIssueInventoryModal from './AddIssueInventoryModal';

const InventoryTrans = () => {
    const [receiveModalShow, setReceiveModalShow] = useState(false);
    const [issueModalShow, setIssueModalShow] = useState(false);

    const handleReceive = (e) => {
        e.preventDefault();
        setReceiveModalShow(true);
    };

    const handleIssue = (e) => {
        e.preventDefault();
        setIssueModalShow(true);
    };

    const receiveModelClose = () => setReceiveModalShow(false);
    const issueModelClose = () => setIssueModalShow(false);

    return (
        <div>
            <div style={{ background: "#C5EA31", height: '70px' }} className="header">
                <h2 style={{ textAlign: 'center', paddingTop: '15px' }}>INVENTORY TRANSACTION</h2>
            </div>
            <div className="row side-row" style={{ textAlign: 'center' }}>
                <p id="manage"></p>
                <ButtonToolbar>
                    <Button variant="primary" onClick={handleReceive} style={{ backgroundColor: '#C5EA31', 
                    width: '200px', margin: '10px', borderRadius: '20px', color: "black", fontWeight: "bold" }}>
                        Receive
                    </Button>
                    <AddInventoryReceiveModal show={receiveModalShow} 
                    setUpdated={setReceiveModalShow} 
                    onHide={receiveModelClose}></AddInventoryReceiveModal>

                    <Button variant="primary" onClick={handleIssue} style={{ backgroundColor: '#C5EA31', 
                    width: '200px', margin: '10px', borderRadius: '20px', color: "black", fontWeight: "bold" }}>
                        Issue
                    </Button>
                    <AddIssueInventoryModal show={issueModalShow} 
                    setUpdated={setIssueModalShow} 
                    onHide={issueModelClose}></AddIssueInventoryModal>

                    <Button variant="primary" style={{ backgroundColor: '#C5EA31', 
                    width: '200px', margin: '10px', borderRadius: '20px', color: "black", fontWeight: "bold" }}>
                        Return
                    </Button>
                </ButtonToolbar>
            </div>
        </div>
    );
};

export default InventoryTrans;
