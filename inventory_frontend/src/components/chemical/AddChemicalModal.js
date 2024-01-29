import React from 'react';
import {Modal, Col, Row, Form, Button} from 'react-bootstrap';
// import {FormControl, FormGroup, FormLabel} from 'react-bootstrap';
import { addChemicalApi } from '../../services/AppinfoService';


const AddChemicalModal = (props) => {

    const handleSubmit = (e) => {
        e.preventDefault();
    
        // Extract values from the form
        const formData = new FormData(e.target);
    
        const chemicalData = {
            entry_no: formData.get('entryNo'),
            item_code: formData.get('itemCode'),
            item_name: formData.get('itemName'),
            unit: formData.get('unit'),
            project_code: formData.get('projectCode'),
            remarks: formData.get('remarks'),
            created_on: formData.get('createdOn'),
            created_by: formData.get('createdBy'),
            modified_on: formData.get('modifiedOn'),
            modified_by: formData.get('modifiedBy'),
            dev_remarks: formData.get('devRemarks'),
        };
    
        // Pass the extracted data to addChemicalApi
        addChemicalApi(chemicalData)
        .then((result) => {
            window.alert("Data added successfully");
                props.setUpdated(true);
            })
            .catch((error) => {
                alert("Failed to Add Chemical");
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
                        Fill In Chemical Information
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col sm={12}>
                            <Form onSubmit={handleSubmit}>

                                <Row>
                                    <Col>
                                    <Form.Group controlId="entryNo">
                                            <Form.Label>Entry No.</Form.Label>
                                            <Form.Control type="text" name="entryNo" required placeholder="" style={{ border: '1px solid black' }} />
                                    </Form.Group>
                                    </Col>
                                    <Col>
                                    <Form.Group controlId="itemCode">
                                            <Form.Label>Item Code</Form.Label>
                                            <Form.Control type="text" name="itemCode" required placeholder="" style={{ border: '1px solid black' }} />
                                    </Form.Group>
                                    </Col>
                                    <Col>
                                    <Form.Group controlId="itemName">
                                            <Form.Label>Item name</Form.Label>
                                            <Form.Control type="text" name="itemName" required placeholder="" style={{ border: '1px solid black' }} />
                                    </Form.Group>
                                    </Col>
                                </Row>
                                <p></p>
                            
                                <Row>                                    
                                    <Col>
                                    <Form.Group controlId="unit">
                                            <Form.Label>Unit</Form.Label>
                                            <Form.Control type="text" name="unit" required placeholder="" style={{ border: '1px solid black' }} />
                                    </Form.Group>
                                    </Col>
                                    <Col>
                                    <Form.Group controlId="projectCode">
                                            <Form.Label>Project Code</Form.Label>
                                            <Form.Control type="text" name="projectCode" required placeholder="" style={{ border: '1px solid black' }} />
                                    </Form.Group>
                                    </Col>
                                    <Col>
                                    <Form.Group controlId="remarks">
                                            <Form.Label>Remarks</Form.Label>
                                            <Form.Control type="text" name="remarks" required placeholder="" style={{ border: '1px solid black' }} />
                                    </Form.Group>
                                    </Col>
                                </Row>
                                <p></p>

                                <Row>
                                    <Col>
                                    <Form.Group controlId="createdOn">
                                            <Form.Label>Created On</Form.Label>
                                            <Form.Control type="text" name="createdOn" required placeholder="" style={{ border: '1px solid black' }} />
                                    </Form.Group>
                                    </Col>
                                    <Col>
                                    <Form.Group controlId="createdBy">
                                            <Form.Label>Created By</Form.Label>
                                            <Form.Control type="text" name="createdBy" required placeholder="" style={{ border: '1px solid black' }} />
                                    </Form.Group>
                                    </Col>
                                    <Col>
                                    <Form.Group controlId="modifiedOn">
                                            <Form.Label>Modified On</Form.Label>
                                            <Form.Control type="text" name="modifiedOn" required placeholder="" style={{ border: '1px solid black' }} />
                                    </Form.Group>
                                    </Col>
                                </Row>
                                <p></p>

                                <Row>
                                    
                                    <Col>
                                    <Form.Group controlId="modifiedBy">
                                            <Form.Label>Modified By</Form.Label>
                                            <Form.Control type="text" name="modifiedBy" required placeholder="" style={{ border: '1px solid black' }} />
                                    </Form.Group>
                                    </Col>
                                    <Col>
                                    <Form.Group controlId="devRemarks">
                                            <Form.Label>Dev Remarks</Form.Label>
                                            <Form.Control type="text" name="devRemarks" required placeholder="" style={{ border: '1px solid black' }} />
                                    </Form.Group>
                                    </Col>
                                    <Col></Col>
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

export default AddChemicalModal;