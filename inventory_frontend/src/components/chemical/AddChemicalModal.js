import React, { useState, useEffect } from 'react';
import { Modal, Col, Row, Form, Button } from 'react-bootstrap';
import { addMasterApi, getProjectApi } from '../../services/AppinfoService';

const AddChemicalModal = (props) => {
    const [projectCodes, setProjectCodes] = useState([]);

    useEffect(() => {
        // Fetch project codes
        getProjectApi()
        .then(data => {
            setProjectCodes(data.map(item => ({ value: item.project_code, label: item.project_name })));
        })
        .catch(error => console.error('Error fetching project codes:', error));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
    
        // Extract values from the form
        const formData = new FormData(e.target);
    
        const masterData = {
            entry_no: formData.get('entryNo'),
            item_code: formData.get('itemCode'),
            item_name: formData.get('itemName'),
            supplier: formData.get('supplier'),
            master_type: formData.get('masterType'),
            quantity: formData.get('quantity'),
            units: formData.get('units'),
            price: formData.get('price'),
            project_code: formData.get('projectCode'),
            remarks: formData.get('remarks'),
        };
    
        addMasterApi(masterData)
            .then((result) => {
                console.log(masterData)
                window.alert('Data added successfully');
                props.setUpdated(true);
                props.onHide(); // Close the modal only if data is successfully added
            })
            .catch((error) => {
                console.error('Failed to Add Master:', error);
                alert('Failed to Add Master: ' + error.message);
            });
    };

    return (
        <div className="container">
            <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">Add Inventory Form</Modal.Title>
                </Modal.Header>
                <Modal.Body>
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
                            <Col>
                                <Form.Group controlId="supplier">
                                    <Form.Label>Supplier</Form.Label>
                                    <Form.Control type="text" name="supplier" required placeholder="" style={{ border: '1px solid black' }} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <p></p>
                        <Row>
                            <Col>
                                <Form.Group controlId="masterType">
                                    <Form.Label>Master Type</Form.Label>
                                    {/* Provide options for Chemical and Inventory */}
                                    <Form.Control as="select" name="masterType" required style={{ border: '1px solid black' }}>
                                        <option value="">Select Master Type</option>
                                        <option value="Chemical">Chemical</option>
                                        <option value="Inventory">Inventory</option>
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="quantity">
                                    <Form.Label>Quantity</Form.Label>
                                    <Form.Control type="text" name="quantity" required placeholder="Enter Numeric value" style={{ border: '1px solid black' }} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="units">
                                    <Form.Label>Units</Form.Label>
                                    <Form.Control type="text" name="units" required placeholder="Enter Numeric value" style={{ border: '1px solid black' }} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="price">
                                    <Form.Label>Price</Form.Label>
                                    <Form.Control type="text" name="price" required placeholder="Enter Numeric value" style={{ border: '1px solid black' }} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <p></p>
                        <Row>
                            <Col>
                                <Form.Group controlId="projectCode">
                                    <Form.Label>Project Code</Form.Label>
                                    <Form.Control as="select" name="projectCode" required style={{ border: '1px solid black' }}>
                                        {projectCodes.map((projectCode, index) => (
                                            <option key={index} value={projectCode.value}>{projectCode.label}</option>
                                        ))}
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="remarks">
                                    <Form.Label>Remarks</Form.Label>
                                    <Form.Control type="text" name="remarks" required placeholder="" style={{ border: '1px solid black' }} />
                                </Form.Group>
                            </Col>
                            <Col></Col>
                            <Col></Col>
                        </Row>
                        <p></p>
                        <Button variant="primary" type="submit" onClick={props.onHide}  style={{ marginRight: '10px' }}>
                            Add
                        </Button>
                        <Button variant="danger" type="submit" onClick={props.onHide}>
                            Cancel
                        </Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer></Modal.Footer>
            </Modal>
        </div>
    );
};

export default AddChemicalModal;
