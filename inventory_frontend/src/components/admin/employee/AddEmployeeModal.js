import React, { useState, useEffect } from 'react';
import { Modal, Col, Row, Form, Button } from 'react-bootstrap';
import { addEmployeeApi, getDistinctRoleApi, getProjectApi } from '../../../services/AppinfoService';

const AddEmployeeModal = (props) => {
    const [designations, setDesignations] = useState([]);
    const [projectCodes, setProjectCodes] = useState([]);

    useEffect(() => {
        // Fetch designations
        getDistinctRoleApi()
            .then(data => {
                setDesignations(data.map(item => ({ value: item.role, label: item.role })));
            })
            .catch(error => console.error('Error fetching designations:', error));

        // Fetch project codes
        getProjectApi()
            .then(data => {
                setProjectCodes(data.map(item => ({ value: item.project_code, label: item.project_name })));
            })
            .catch(error => console.error('Error fetching project codes:', error));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const empData = {
            emp_name: formData.get('empName'),
            designation: formData.get('designation'),
            project_code: formData.get('projectCode')
        };
        addEmployeeApi(empData)
            .then((result) => {
                window.alert("Data added successfully");
                props.setUpdated(true);
            })
            .catch((error) => {
                console.error("Failed to Add Project Data", error);
                alert("Failed to Add Project. Check console for details.");
            });
    };

    return (
        <div className="container">
            <Modal
                {...props}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Employees
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col sm={12}>
                            <Form onSubmit={handleSubmit}>
                                <Row>
                                    <Col>
                                        <Form.Group controlId="empName">
                                            <Form.Label>Employee Name.</Form.Label>
                                            <Form.Control type="text" name="empName" required placeholder="" style={{ border: '1px solid black' }} />
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group controlId="designation">
                                            <Form.Label>Designation</Form.Label>
                                            <Form.Control as="select" name="designation" required style={{ border: '1px solid black' }}>
                                                {designations.map((designation, index) => (
                                                    <option key={index} value={designation.value}>{designation.label}</option>
                                                ))}
                                            </Form.Control>
                                        </Form.Group>
                                    </Col>
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
                                </Row>
                                <Form.Group>
                                    <p></p>
                                    <Button variant="primary" type="submit" onClick={props.onHide} style={{marginRight: '8px'}}>
                                        Add
                                    </Button>
                                    <Button variant="danger" type="submit" onClick={props.onHide}>
                                        Cancel
                                    </Button>
                                </Form.Group>
                            </Form>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default AddEmployeeModal;
