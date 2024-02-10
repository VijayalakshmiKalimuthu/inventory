import React, { useEffect, useState } from 'react';
import {Modal, Col, Row, Form, Button} from 'react-bootstrap';
// import {FormControl, FormGroup, FormLabel} from 'react-bootstrap';
import { addItemReceiveApi, getMasterApi } from '../../services/AppinfoService';
import './formBorder.css';
import Select from 'react-select';

const AddInventoryReceiveModal = (props) => {
    const [itemsCodes, setItemsCodes] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);

    useEffect(() => {
        // Fetch project codes
        getMasterApi()
            .then(data => {
                setItemsCodes(data.map(item => ({ value: item.c_id, label: item.item_code })));
            })
            .catch(error => console.error('Error fetching project codes:', error));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
    
        const formData = new FormData(e.target);
    
        const receiveData = {
            c_id: selectedItem.value,
            quantity_received: formData.get('quantityReceived'),
            po_number: formData.get('poNumber'),
            batch_number: formData.get('batchNumber'),
            remarks: formData.get('remarks'),


        };
    
        addItemReceiveApi(receiveData)
        .then((result) => {
            window.alert("Data added successfully");
                props.setUpdated(true);
                setSelectedItem('')
            })
            .catch((error) => {
            console.error("Failed to Add Inventory Data", error);  // Log the error to the console
            alert("Failed to Add Inventory. Check console for details.");
            });
    };

    return(
        <div className="container">

            <Modal
                {...props}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered >

                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Item Receive Form
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col sm={10}>
                            <Form onSubmit={handleSubmit}>

                                <Row>
                                    <Col>                          
                                    <Form.Group controlId="itemCode">
                                            <Form.Label>Item Code</Form.Label>
                                    <Select
                                        options={itemsCodes}
                                        value={selectedItem}
                                        onChange={setSelectedItem}
                                        placeholder="Select Item Code"
                                    />
                                            {/*<Form.Control type='text' as="select" name="itemCode" required style={{ border: '1px solid black' }}>
                                                {itemsCodes.map((itemCode, index) => (
                                                    <option key={index} value={itemCode.value}>{itemCode.label}</option>
                                                ))}
                                                </Form.Control> */}
                                    </Form.Group>
                                    </Col>

                                    <Col>
                                    <Form.Group controlId="quantityReceived">
                                        <Form.Label>Quantity Received</Form.Label>
                                        <Form.Control type="type" name="quantityReceived" required placeholder="" className="custom-border">
                                        </Form.Control>
                                    </Form.Group>
                                    </Col>
                                </Row>
                                <p></p>
                                <Row>
                                    <Col>
                                    <Form.Group controlId="poNumber">
                                            <Form.Label>PO Number</Form.Label>
                                            <Form.Control type="text" name="poNumber" required placeholder="" className="custom-border" />
                                    </Form.Group>
                                    </Col>  
                                    <Col>
                                    <Form.Group controlId="batchNumber">
                                            <Form.Label>Batch Number</Form.Label>
                                            <Form.Control type="text" name="batchNumber" required placeholder="" className="custom-border" />
                                    </Form.Group>
                                    </Col>
                                </Row>
                                <p></p>

                                <Row> 

                                    <Col>
                                    <Form.Group controlId="remarks">
                                            <Form.Label>Remarks</Form.Label>
                                            <Form.Control type="text" name="remarks" required placeholder="" className="custom-border" />
                                    </Form.Group>
                                    </Col>
                                    <Col></Col>
                                </Row>
                                <p></p>

                            <Form.Group>
                                <p></p>
                                <Button variant="primary" type="submit" onClick={props.onHide} style={{ width: '70px' }}>
                                    Add
                                </Button>
                                <Button variant="danger" type="submit" onClick={props.onHide} style={{ marginLeft: '10px'}}>
                                    Cancel
                                </Button>
                            </Form.Group>
                            </Form>
                        </Col>
                    </Row>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default AddInventoryReceiveModal;