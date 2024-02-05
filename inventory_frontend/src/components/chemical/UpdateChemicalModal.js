import React from 'react';
import { Modal, Col, Row, Form, Button } from 'react-bootstrap';
import { updateChemicalApi } from '../../services/AppinfoService';

const UpdateChemicalModal = (props) => {
    const handleSubmit = async (e) => {
        e.preventDefault();
      
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
            batch_number: formData.get('batchNumber'),
            issue_date: formData.get('issueDate'),
            issue_to: formData.get('issueTo'),
            quantity_issued: formData.get('quantityIsuued'),
            quantity_recieved: formData.get('quantityRecieved'),
            stock: formData.get('stock'),
            dev_remarks: formData.get('devRemarks'),
        };
      
        try {
          const result = await updateChemicalApi(props.chemical.c_id, chemicalData);
          alert("Updated Successfully");
          props.setUpdated(true);
        } catch (error) {
          console.error('Failed to Update Chemical:', error);
          alert(`Failed to Update Chemical: ${error.message}`);
        }
      };


      
      
        return (
            <div className="container">
    
                <Modal
                    {...props}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered >
    
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Update Chemical Information
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
                                    <Form.Control type="text" name="entryNo" required defaultValue={props.chemical?.entry_no || ''} placeholder="" style={{ border: '1px solid black' }} />
                                  </Form.Group>
                                  </Col>
                                  <Col>
                                  <Form.Group controlId="itemCode">
                                    <Form.Label>Item Code</Form.Label>
                                    <Form.Control type="text" name="itemCode" required defaultValue={props.chemical?.item_code || ''} placeholder="" style={{ border: '1px solid black' }} />
                                  </Form.Group>
                                  </Col>
                                  <Col>
                                  <Form.Group controlId="itemName">
                                    <Form.Label>Item Name</Form.Label>
                                    <Form.Control type="text" name="itemName" required defaultValue={props.chemical?.item_name || ''} placeholder="" style={{ border: '1px solid black' }} />
                                  </Form.Group>
                                  </Col>
                                  <Col>
                                  <Form.Group controlId="unit">
                                    <Form.Label>Unit</Form.Label>
                                    <Form.Control type="text" name="unit" required defaultValue={props.chemical?.unit || ''} placeholder="" style={{ border: '1px solid black' }} />
                                  </Form.Group>
                                  </Col>
                                  <Col>
                                  <Form.Group controlId="projectCode">
                                    <Form.Label>Project Code</Form.Label>
                                    <Form.Control type="text" name="projectCode" required defaultValue={props.chemical?.project_code || ''} placeholder="" style={{ border: '1px solid black' }} />
                                  </Form.Group>
                                  </Col>
                                </Row>
                                <p></p>

                                <Row>                                  
                                  <Col>
                                  <Form.Group controlId="remarks">
                                    <Form.Label>Remarks</Form.Label>
                                    <Form.Control type="text" name="remarks" required defaultValue={props.chemical?.remarks || ''} placeholder="" style={{ border: '1px solid black' }} />
                                  </Form.Group>
                                  </Col>
                                  
                                  <Col>
                                  <Form.Group controlId="createdOn">
                                    <Form.Label>Created On</Form.Label>
                                    <Form.Control type="text" name="createdOn" required defaultValue={props.chemical?.created_on || ''} placeholder="" style={{ border: '1px solid black' }} />
                                  </Form.Group>
                                  </Col>
                                  <Col>
                                  <Form.Group controlId="createdBy">
                                    <Form.Label>Created By</Form.Label>
                                    <Form.Control type="text" name="createdBy" required defaultValue={props.chemical?.created_by || ''} placeholder="" style={{ border: '1px solid black' }} />
                                  </Form.Group>
                                  </Col>
                                  <Col>
                                  <Form.Group controlId="modifiedOn">
                                    <Form.Label>Modified On</Form.Label>
                                    <Form.Control type="text" name="modifiedOn" required defaultValue={props.chemical?.modified_on || ''} placeholder="" style={{ border: '1px solid black' }} />
                                  </Form.Group>
                                  </Col>                                 
                                  <Col>
                                  <Form.Group controlId="modifiedBy">
                                    <Form.Label>Modified By</Form.Label>
                                    <Form.Control type="text" name="modifiedBy" required defaultValue={props.chemical?.modified_by || ''} placeholder="" style={{ border: '1px solid black' }} />
                                  </Form.Group>
                                  </Col>
                                </Row>
                                <p></p>

                                <Row>
                                  <Col>
                                  <Form.Group controlId="batchNumber">
                                    <Form.Label>Batch Number</Form.Label>
                                    <Form.Control type="text" name="batchNumber" required defaultValue={props.chemical?.batch_number || ''} placeholder="" style={{ border: '1px solid black' }} />
                                  </Form.Group>
                                  </Col>

                                  <Col>
                                  <Form.Group controlId="issueDate">
                                    <Form.Label>Issue Date</Form.Label>
                                    <Form.Control type="text" name="issueDate" required defaultValue={props.chemical?.issue_date || ''} placeholder="" style={{ border: '1px solid black' }} />
                                  </Form.Group>
                                  </Col>

                                  <Col>
                                  <Form.Group controlId="issueTo">
                                    <Form.Label>Issue To</Form.Label>
                                    <Form.Control type="text" name="issueTo" required defaultValue={props.chemical?.issue_to || ''} placeholder="" style={{ border: '1px solid black' }} />
                                  </Form.Group>
                                  </Col>

                                  <Col>
                                  <Form.Group controlId="quantityIsuued">
                                    <Form.Label>Quantity Issued</Form.Label>
                                    <Form.Control type="text" name="quantityIsuued" required defaultValue={props.chemical?.quantity_issued || ''} placeholder="" style={{ border: '1px solid black' }} />
                                  </Form.Group>
                                  </Col>
                                <Col>
                                  <Form.Group controlId="quantityRecieved">
                                    <Form.Label>Quantity Recieved</Form.Label>
                                    <Form.Control type="text" name="quantityRecieved" required defaultValue={props.chemical?.quantity_recieved || ''} placeholder="" style={{ border: '1px solid black' }} />
                                  </Form.Group>
                                  </Col>
                                </Row>
                                <p></p>

                                <Row>
                                  <Col>
                                  <Form.Group controlId="stock">
                                    <Form.Label>Stock</Form.Label>
                                    <Form.Control type="text" name="stock" required defaultValue={props.chemical?.dev_remarks || ''} placeholder="" style={{ border: '1px solid black' }} />
                                  </Form.Group>
                                  </Col> 
                                  <Col>
                                  <Form.Group controlId="devRemarks">
                                    <Form.Label>Dev Remarks</Form.Label>
                                    <Form.Control type="text" name="devRemarks" required defaultValue={props.chemical?.dev_remarks || ''} placeholder="" style={{ border: '1px solid black' }} />
                                  </Form.Group>
                                  </Col>
                                  <Col></Col>
                                  <Col></Col>
                                  <Col></Col>
                                  
                                </Row>
                                <Form.Group>
                                  <p></p>
                                  <Button variant="primary" type="submit" onClick={props.onHide}>
                                    Submit
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

export default UpdateChemicalModal;
