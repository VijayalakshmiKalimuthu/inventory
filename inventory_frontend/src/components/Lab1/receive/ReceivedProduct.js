import React, { useEffect, useState, useRef } from 'react';
import { Col, Row, Form, Button } from 'react-bootstrap';
import { addItemReceiveApi, getMasterApi, getMasterChemicalApi, getMasterLabwareApi } from '../../../services/AppinfoService';
import '../../inventory/formBorder.css';
import Select from 'react-select';

const ReceivedProduct = () => {
    const [itemsCodes, setItemsCodes] = useState([]);
    const [itemsNames, setItemsNames] = useState([]);
    const [selectedItemCode, setSelectedItemCode] = useState(null);
    const [selectedItemDetails, setSelectedItemDetails] = useState(null);
    const [selectedItemName, setSelectedItemName] = useState(null);
    const [masterType, setMasterType] = useState('');
    const formRef = useRef(null); // Create a ref for the form
    const [errorMessages, setErrorMessages] = useState({
        bill: '',
        quantityReceived: '',
        poNumber: '',
        batchNumber: '',
        remarks: ''
    });

    useEffect(() => {
        // Fetch project codes
        getMasterApi()
            .then(data => {
                // Filter data based on masterType
                if (masterType === 'Chemical') {
                    data = data.filter(item => item.master_type === 'Chemical');
                } else if (masterType === 'Labware') {
                    data = data.filter(item => item.master_type === 'Labware');
                }
    
                // Set items codes and names
                setItemsCodes(data.map(item => ({ value: item.c_id, label: item.item_code, itemName: item.item_name, details: { units: item.units } })));
                setItemsNames(data.map(item => ({ value: item.c_id, label: item.item_name, itemCode: item.item_code, details: { units: item.units } })));
            })
            .catch(error => console.error('Error fetching project codes:', error));
    }, [masterType]);

    const handleItemCodeChange = (selectedOption) => {
        setSelectedItemCode(selectedOption);
        const selectedItem = itemsCodes.find(item => item.value === selectedOption.value);
        setSelectedItemName({ value: selectedItem.value, label: selectedItem.itemName });
        setSelectedItemDetails(selectedItem.details);
    };
    
    const handleItemNameChange = (selectedOption) => {
        setSelectedItemName(selectedOption);
        const selectedItem = itemsNames.find(item => item.value === selectedOption.value);
        setSelectedItemCode({ value: selectedItem.value, label: selectedItem.itemCode });
        setSelectedItemDetails(selectedItem.details);
    };

    const handleSubmit = () => {
        const formData = new FormData(formRef.current); // Access form data using ref
        const newErrorMessages = { ...errorMessages };

        // Check if any required field is empty
        const emptyFields = ['bill', 'quantityReceived', 'poNumber', 'batchNumber', 'remarks']
            .filter(field => {
                if (!formData.get(field)) {
                    newErrorMessages[field] = `Please fill ${field}`;
                    return true;
                }
                return false;
            });

        if (emptyFields.length > 0) {
            setErrorMessages(newErrorMessages);
            return; // Exit the function if any field is empty
        }
        
        const receiveData = {
            bill: formData.get('bill'),
            c_id: selectedItemCode.value,
            quantity_received: formData.get('quantityReceived'),
            po_number: formData.get('poNumber'),
            batch_number: formData.get('batchNumber'),
            remarks: formData.get('remarks'),
        };

        addItemReceiveApi(receiveData)
            .then((result) => {
                window.alert("Received Data added successfully");
                setSelectedItemCode(null); // Clear selected item
                setErrorMessages({
                    bill: '',
                    quantityReceived: '',
                    poNumber: '',
                    batchNumber: '',
                    remarks: ''
                });
                formRef.current.reset(); 
            })
            .catch((error) => {
                console.error("Failed to Add Received Data", error);
                alert("Failed to Add Received. Check console for details.");
                formRef.current.reset(); 
            });
    };

    return (
        <div>
            <div>
                <h1 style={{ textAlign: 'center' }}>
                    Add Receive
                </h1>
            </div>
            <p></p>
            <div >
                <Row style={{ paddingLeft: '80px'}}>
                    <Col sm={12}>
                        <Form onSubmit={handleSubmit} ref={formRef}>
                            <Row>                            
                                <Col>
                                    <Form.Group controlId="masterType">
                                        <Form.Label style={{ marginRight: '8px' }}>Master Type</Form.Label>
                                        <select
                                            value={masterType}
                                            className="form-control"
                                            style={{
                                                borderColor: 'black',
                                                width: 200,
                                                display: 'inline-block', // Add this line
                                                marginRight: '30px' // Make sure marginRight is still specified
                                            }}
                                            onChange={(e) => setMasterType(e.target.value)}
                                        >
                                            <option >Select Master Type</option>
                                            <option value="Chemical">Chemical</option>
                                            <option value="Labware">Labware</option>
                                        </select>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <p></p>
                            <Row>
                                <Col>
                                    <Form.Group controlId="bill">
                                        <Form.Label>Bill No</Form.Label>
                                        <Form.Control type="type" name="bill" required placeholder="" className="custom-border">
                                        </Form.Control>
                                    </Form.Group>
                                    <span style={{ color: 'red', float: 'right' }}>{errorMessages.bill}</span>
                                </Col>
                                <Col>
                                    <Form.Group controlId="poNumber">
                                        <Form.Label>PO Number</Form.Label>
                                        <Form.Control type="text" name="poNumber" required placeholder="" className="custom-border" />
                                    </Form.Group>
                                    <span style={{ color: 'red', float: 'right' }}>{errorMessages.poNumber}</span>
                                </Col>
                                <Col>
                                    <Form.Group controlId="itemCode">
                                        <Form.Label>Item Code</Form.Label>
                                        <Select
                                            options={itemsCodes.map(item => ({ value: item.value, label: item.label }))}
                                            value={selectedItemCode}
                                            onChange={handleItemCodeChange}
                                            placeholder="Select Item Code"
                                            styles={{ control: provided => ({ ...provided, borderColor: 'black' }) }}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group controlId="itemName">
                                        <Form.Label>Item Name</Form.Label>
                                        <Select
                                            options={itemsNames.map(item => ({ value: item.value, label: item.label }))}
                                            value={selectedItemName}
                                            onChange={handleItemNameChange}
                                            placeholder="Select Item Name"
                                            styles={{ control: provided => ({ ...provided, borderColor: 'black' }) }}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <p></p>

                            <Row>
                                <Col>
                                    <Form.Group controlId="units">
                                        <Form.Label>Units</Form.Label>
                                        <Form.Control type="text" value={selectedItemDetails ? selectedItemDetails.units : ''} readOnly
                                         style={{ borderColor: 'black' }} />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group controlId="quantityReceived">
                                        <Form.Label>Quantity Received</Form.Label>
                                        <Form.Control type="type" name="quantityReceived" required placeholder="" className="custom-border">
                                        </Form.Control>
                                    </Form.Group>
                                    <span style={{ color: 'red', float: 'right' }}>{errorMessages.quantityReceived}</span>
                                </Col>
                                <Col>
                                    <Form.Group controlId="batchNumber">
                                        <Form.Label>Batch Number</Form.Label>
                                        <Form.Control type="text" name="batchNumber" required placeholder="" className="custom-border" />
                                    </Form.Group>

                                    <span style={{ color: 'red', float: 'right' }}>{errorMessages.batchNumber}</span>
                                </Col>
                                <Col>
                                    <Form.Group controlId="remarks">
                                        <Form.Label>Remarks</Form.Label>
                                        <Form.Control type="text" name="remarks" required placeholder="" className="custom-border" />
                                    </Form.Group>
                                    <span style={{ color: 'red', float: 'right' }}>{errorMessages.remarks}</span>
                                </Col>
                            </Row>
                            <p></p>
                        </Form>                    
                        <div style={{ paddingTop: '10px', paddingLeft: '850px' }}>
                            <Button variant="primary" onClick={handleSubmit} style={{ width: '70px'}}>
                                    Add
                            </Button>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
        
    )
}

export default ReceivedProduct;
