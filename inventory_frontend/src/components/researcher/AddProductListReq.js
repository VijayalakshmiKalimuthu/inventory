import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { addProductReqApi } from '../../services/AppinfoService';
import { FaBell } from 'react-icons/fa';
import ProductResponse from './ProductResponse';

const AddProductListReq = (props) => {
  const { readOnly } = props;
  const [productList, setProductList] = useState('');
  const [isUpdated, setIsUpdated] = useState(false);

  const [modalShow, setModalShow] = useState(false);

  const handleShowModal = () => {
      setModalShow(true);
  };

  const handleCloseModal = () => {
      setModalShow(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Extract values from the form
    const formData = new FormData(e.target);

    const reqData = {
      RequestedBy: formData.get('requestedBy'),
      RequestDetails: `Can I add this ${productList} Product list?`,
      RequestedTo: formData.get('requestedTo') 
    };

    addProductReqApi(reqData)
      .then((result) => {
        window.alert('Request Sent successfully');
        setProductList('')
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('Failed to Request');
      });
  };

  const handleProductListChange = (e) => {
    setProductList(e.target.value);
  };

  return (
    <div>
    <div style={{ background: "#C5EA31", height: '70px' }} className="header">
        <h2 style={{ textAlign: 'center', paddingTop: '15px', marginRight: '8px' }}>REQUEST {' '}
        <FaBell onClick={handleShowModal} style={{ float: 'right'}}/>
        <ProductResponse show={modalShow} setUpdated={setIsUpdated} onHide={handleCloseModal} />
        </h2>
    </div>
      <p></p>
      <div className="container">
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col>            
              <Form.Group controlId="newProductList">
                <Form.Label>Product List</Form.Label>
                <Form.Control
                  type="text"
                  name="newProductList"
                  required
                  placeholder="Enter Product List"
                  style={{ 
                    width: 350,
                    border: '1px solid black',
                    backgroundColor: 'lightyellow',
                    padding: '8px', }}
                  value={productList}
                  onChange={handleProductListChange}
                  readOnly={readOnly}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="requestedBy">
                <Form.Label>Requested By</Form.Label>
                <Form.Control
                  type="text"
                  name="requestedBy"
                  required
                  defaultValue={'Researcher'}
                  placeholder=""
                  style={{ 
                    width: 350,
                    border: '1px solid black',
                    backgroundColor: 'lightyellow',
                    padding: '8px', }}
                  readOnly={readOnly}
                  />
              </Form.Group>
            </Col>
          </Row>
          <p></p>
          <Row>
            <Col>
              <Form.Group controlId="requestDetails">
                <Form.Label>Request Details</Form.Label>
                <Form.Control
                  type="text"
                  name="requestDetails"
                  required
                  defaultValue={`Can I add this ${productList} Product list?`}
                  placeholder=""
                  style={{ 
                    width: 350,
                    border: '1px solid black',
                    backgroundColor: 'lightyellow',
                    padding: '8px', }}
                  readOnly={readOnly}
                  />
              </Form.Group>
            </Col>
          </Row>
          <p></p>
          <Row>
            <Col>            
            <Form.Group controlId="requestedTo">
                <Form.Label>Requested To</Form.Label>
                <Form.Control
                  type="text"
                  name="requestedTo"
                  required
                  defaultValue={'Lab Assistant'}
                  placeholder=""
                  style={{ 
                    width: 350,
                    border: '1px solid black',
                    backgroundColor: 'lightyellow',
                    padding: '8px', }}
                  readOnly={readOnly}
                  />
              </Form.Group>
            </Col>
          </Row>
          <p></p>
          <Row>
            <Col>
              <Button variant="primary" type="submit" disabled={readOnly}>
                Send
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
  
};

export default AddProductListReq;
