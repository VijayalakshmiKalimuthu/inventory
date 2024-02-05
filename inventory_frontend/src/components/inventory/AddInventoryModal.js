import React from 'react';
import {Modal, Col, Row, Form, Button} from 'react-bootstrap';
// import {FormControl, FormGroup, FormLabel} from 'react-bootstrap';
import { addInventoryApi } from '../../services/AppinfoService';
import './formBorder.css'

const AddInventoryModal = (props) => {

    const handleSubmit = (e) => {
        e.preventDefault();
    
        const formData = new FormData(e.target);
    
        const inventoryData = {
            item_code: formData.get('itemCode'),
            item_name: formData.get('itemName'),
            tran_type_IR: formData.get('tranTypeIR'),
            qnty: formData.get('qnty'),
            ref_number: formData.get('refNumber'),
            ref_type: formData.get('refType'),
            batch_number: formData.get('batchNumber'),
            remarks: formData.get('remarks'),
            created_on: formData.get('createdOn'),
            created_by: formData.get('createdBy'),
            modified_on: formData.get('modifiedOn'),
            modified_by: formData.get('modifiedBy'),
            quantity_issued: formData.get('quantityIssued'),
            quantity_recieved: formData.get('quantityRecieved'),
            stock: formData.get('stock'),
            dev_remarks: formData.get('devRemarks'),

        };
    
        addInventoryApi(inventoryData)
        .then((result) => {
            window.alert("Data added successfully");
                props.setUpdated(true);
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
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered >

                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Fill In Inventory Information
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col sm={12}>
                            <Form onSubmit={handleSubmit}>

                                <Row>
                                    <Col>                          
                                    <Form.Group controlId="itemCode">
                                            <Form.Label>Item Code</Form.Label>
                                            <Form.Control type="text" name="itemCode" required placeholder="" className="custom-border" />
                                    </Form.Group>
                                    </Col>

                                    <Col>                          
                                    <Form.Group controlId="itemName">
                                            <Form.Label>Item Name</Form.Label>
                                            <Form.Control type="text" name="itemName" required placeholder="" className="custom-border" />
                                    </Form.Group>
                                    </Col>

                                    <Col>
                                    <Form.Group controlId="tranTypeIR">
                                        <Form.Label>Tran Type I/R</Form.Label>
                                        <Form.Control as="select" name="tranTypeIR" required className="custom-border">
                                            <option value="" disabled>Select I/R</option>
                                            <option value="I">I</option>
                                            <option value="R">R</option>
                                        </Form.Control>
                                    </Form.Group>
                                    </Col>
                                    <Col>
                                    <Form.Group controlId="qnty">
                                            <Form.Label>Quantity</Form.Label>
                                            <Form.Control type="text" name="qnty" required placeholder="" className="custom-border" />
                                    </Form.Group>
                                    </Col>
                                </Row>
                                <p></p>

                                <Row>                                    
                                    <Col>
                                    <Form.Group controlId="refNumber">
                                            <Form.Label>Ref Number</Form.Label>
                                            <Form.Control type="text" name="refNumber" required placeholder="" className="custom-border" />
                                    </Form.Group>
                                    </Col>
                                    <Col>
                                    <Form.Group controlId="refType">
                                            <Form.Label>Ref type</Form.Label>
                                            <Form.Control type="text" name="refType" required placeholder="" className="custom-border" />
                                    </Form.Group>
                                    </Col>
                                    <Col>
                                    <Form.Group controlId="batchNumber">
                                            <Form.Label>Batch Number</Form.Label>
                                            <Form.Control type="text" name="batchNumber" required placeholder="" className="custom-border" />
                                    </Form.Group>
                                    </Col>

                                    <Col>
                                    <Form.Group controlId="remarks">
                                            <Form.Label>Remarks</Form.Label>
                                            <Form.Control type="text" name="remarks" required placeholder="" className="custom-border" />
                                    </Form.Group>
                                    </Col>
                                </Row>
                                <p></p>

                                <Row>
                                    <Col>
                                    <Form.Group controlId="createdOn">
                                            <Form.Label>Created On</Form.Label>
                                            <Form.Control type="text" name="createdOn" required placeholder="" className="custom-border" />
                                    </Form.Group>
                                    </Col>
                                    <Col>
                                    <Form.Group controlId="createdBy">
                                            <Form.Label>Created By</Form.Label>
                                            <Form.Control type="text" name="createdBy" required placeholder="" className="custom-border" />
                                    </Form.Group>
                                    </Col>

                                    <Col>
                                    <Form.Group controlId="modifiedOn">
                                            <Form.Label>Modified On</Form.Label>
                                            <Form.Control type="text" name="modifiedOn" required placeholder="" className="custom-border" />
                                    </Form.Group>
                                    </Col>
                                    <Col>
                                    <Form.Group controlId="modifiedBy">
                                            <Form.Label>Modified By</Form.Label>
                                            <Form.Control type="text" name="modifiedBy" required placeholder="" className="custom-border" />
                                    </Form.Group>
                                    </Col>
                                </Row>
                                <p></p>

                                <Row>
                                    <Col>
                                    <Form.Group controlId="quantityIssued">
                                            <Form.Label>Quantity Issued</Form.Label>
                                            <Form.Control type="text" name="quantityIssued" required placeholder="" className="custom-border" />
                                    </Form.Group>
                                    </Col>

                                    <Col>
                                    <Form.Group controlId="quantityRecieved">
                                            <Form.Label>Quantity Recieved</Form.Label>
                                            <Form.Control type="text" name="quantityRecieved" required placeholder="" className="custom-border" />
                                    </Form.Group>
                                    </Col>

                                    <Col>
                                    <Form.Group controlId="stock">
                                            <Form.Label>Stock</Form.Label>
                                            <Form.Control type="text" name="stock" required placeholder="" className="custom-border" />
                                    </Form.Group>
                                    </Col>  
                                    
                                    <Col>
                                    <Form.Group controlId="devRemarks">
                                            <Form.Label>Dev Remarks</Form.Label>
                                            <Form.Control type="text" name="devRemarks" required placeholder="" className="custom-border" />
                                    </Form.Group>
                                    </Col> 
                                </Row>
                            <Form.Group>
                                <p></p>
                                <Button variant="primary" type="submit" onClick={props.onHide}>
                                    Add
                                </Button>
                            </Form.Group>
                            </Form>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="danger" type="submit" onClick={props.onHide}>
                        Close
                </Button>

                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default AddInventoryModal;