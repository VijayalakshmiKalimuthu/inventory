import { useState, useEffect } from "react";
import { addLabMasterApi, getChemicalDescApi, getLabwareDescApi } from "../../../services/AppinfoService";
import { Button } from 'react-bootstrap';

const AddProduct = () => {
    const [masterType, setMasterType] = useState('');
    const [itemCode, setItemCode] = useState('');
    const [itemName, setItemName] = useState('');
    const [units, setUnits] = useState('');
    const [price, setPrice] = useState('');
    const [make, setMake] = useState('');
    const [instructionSpecification, setInstructionSpecification] = useState('');
    const [minReqStock, setMinReqStock] = useState('');
    const [remarks, setRemarks] = useState('');
    const [locationCode, setLocationCode] = useState('');

    useEffect(() => {
        if (masterType === 'Chemical') {
            getChemicalDescApi()
                .then(data => {
                    if (data.length > 0) {
                        const lastItemCode = data[0].item_code;
                        console.log("Chemical Last Item Code:, ", lastItemCode)
                        const numericPart = parseInt(lastItemCode.substring(2));
                        console.log("Chemical Numeric Part: ", numericPart)
                        const nextNumericPart = numericPart + 1;
                        console.log("Chemical Next Numeric Part: ", nextNumericPart)
                        const nextItemCode = `CR${nextNumericPart.toString().padStart(4, '0')}`;
                        console.log("Chemical Next Item Code: ", nextItemCode)
                        setItemCode(nextItemCode);
                        console.log("Chemical Item Code: ", itemCode)
                    } else {
                        // If no existing item codes, start with CR0001
                        setItemCode('CR0001');
                    }
                })
                .catch(error => console.error('Failed to fetch chemical descriptions:', error));
        } else if (masterType === 'Labware') {
            getLabwareDescApi()
                .then(data => {
                    if (data.length > 0) {
                        const lastItemCode = data[0].item_code;
                        console.log("Labware Last Item Code:, ", lastItemCode)
                        const numericPart = parseInt(lastItemCode.substring(1)); // Start from index 1 for Labware
                        console.log("Labware Numeric Part: ", numericPart)
                        const nextNumericPart = numericPart + 1;
                        console.log("Labware Next Numeric Part: ", nextNumericPart)
                        const nextItemCode = `L${nextNumericPart.toString().padStart(4, '0')}`; // Use "L" prefix for Labware
                        console.log("Labware Next Item Code: ", nextItemCode)
                        setItemCode(nextItemCode);
                        console.log("Labware Item Code: ", itemCode)
                    } else {
                        // If no existing item codes, start with CR0001
                        setItemCode('L0001');
                    }
                })
                .catch(error => console.error('Failed to fetch chemical descriptions:', error));
        }
    }, [masterType]);

    const handleSubmit = (e) => {
        e.preventDefault();
    
        const masterData = {
            master_type: masterType,
            item_code: itemCode,
            item_name: itemName,
            location_code: locationCode,
            units: units,
            price: price,
            make: make,
            instruction_specification: instructionSpecification,
            min_req_stock: minReqStock,
            remarks: remarks,
            
        };
    
        addLabMasterApi(masterData)
            .then((result) => {
                console.log(masterData);
                window.alert('Data added successfully');
                setMasterType('')
                setItemCode('')
                setItemName('')
                setMake('')
                setInstructionSpecification('')
                setUnits('')
                setPrice('')
                setRemarks('')
                setMinReqStock('')
                setLocationCode('')
            })
            .catch((error) => {
                console.log("Master Data: ", masterData);
                console.error('Failed to Add Master:', error);
                alert('Failed to Add Master: ' + error.message);
                setMasterType('')
                setItemCode('')
                setItemName('')
                setMake('')
                setInstructionSpecification('')
                setUnits('')
                setPrice('')
                setRemarks('')
                setMinReqStock('')
                setLocationCode('')
            });
    };

    return (
        <div className="container">
            <div>
                <div style={{ textAlign: 'right',  paddingTop: '20px', paddingRight: '500px'}}>
                    <label htmlFor="masterType" style={{ marginRight: '30px'}} >Master Type</label>
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
                </div>
                {/* Other input fields */}
                <div style={{ textAlign: 'right',  paddingTop: '10px', paddingRight: '500px'}}>
                    <label htmlFor="itemCode" style={{ marginRight: '30px'}} >ID/Code</label>
                    <label
                        className="form-control"
                        style={{
                            height: '30px',
                            textAlign: 'center',
                            borderColor: 'black',
                            width: 200,
                            display: 'inline-block',
                            marginRight: '30px'
                        }}
                    >
                        {itemCode}
                    </label>
                </div>
                <div style={{ textAlign: 'right',  paddingTop: '10px', paddingRight: '500px'}}>
                <label htmlFor="itemName" style={{ marginRight: '30px' }}>Name</label>
                    <input
                        type="text"
                        value={itemName}
                        className="form-control"
                        placeholder=""
                        style={{
                            height: '30px',
                            borderColor: 'black',
                            width: 200,
                            display: 'inline-block', // Add this line
                            marginRight: '30px' // Make sure marginRight is still specified
                        }}
                        onChange={(e) => setItemName(e.target.value)}
                    />
                </div>
                <div style={{ textAlign: 'right',  paddingTop: '10px', paddingRight: '500px'}}>
                <label htmlFor="locationCode" style={{ marginRight: '30px' }}>Location Code</label>
                    <input
                        type="text"
                        value={locationCode}
                        className="form-control"
                        placeholder=""
                        style={{
                            height: '30px',
                            borderColor: 'black',
                            width: 200,
                            display: 'inline-block', // Add this line
                            marginRight: '30px' // Make sure marginRight is still specified
                        }}
                        onChange={(e) => setLocationCode(e.target.value)}
                    />
                </div>
                <div style={{ textAlign: 'right',  paddingTop: '10px', paddingRight: '500px'}}>
                    <label htmlFor="units" style={{ marginRight: '30px'}} >Unit</label>
                    <input
                        type="text"
                        value={units}
                        className="form-control"
                        placeholder=""
                        style={{
                            height: '30px',
                            borderColor: 'black',
                            width: 200,
                            display: 'inline-block', // Add this line
                            marginRight: '30px' // Make sure marginRight is still specified
                        }}
                        onChange={(e) => setUnits(e.target.value)}
                    />
                </div>
                <div style={{ textAlign: 'right',  paddingTop: '10px', paddingRight: '500px'}}>
                    <label htmlFor="price" style={{ marginRight: '30px'}} >Unit Price</label>
                    <input
                        type="text"
                        value={price}
                        className="form-control"
                        placeholder=""
                        style={{
                            height: '30px',
                            borderColor: 'black',
                            width: 200,
                            display: 'inline-block', // Add this line
                            marginRight: '30px' // Make sure marginRight is still specified
                        }}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </div>
                <div style={{ textAlign: 'right',  paddingTop: '10px', paddingRight: '500px'}}>
                    <label htmlFor="make" style={{ marginRight: '30px'}} >Make</label>
                    <input
                        type="text"
                        value={make}
                        className="form-control"
                        placeholder=""
                        style={{
                            height: '30px',
                            borderColor: 'black',
                            width: 200,
                            display: 'inline-block', // Add this line
                            marginRight: '30px' // Make sure marginRight is still specified
                        }}
                        onChange={(e) => setMake(e.target.value)}
                    />
                </div>
                <div style={{ textAlign: 'right',  paddingTop: '10px', paddingRight: '500px'}}>
                    <label htmlFor="instructionSpecification"
                     style={{ marginRight: '30px'}} >Instruction or specification</label>
                    <input
                        type="text"
                        value={instructionSpecification}
                        className="form-control"
                        placeholder=""
                        style={{
                            height: '30px',
                            borderColor: 'black',
                            width: 200,
                            display: 'inline-block', // Add this line
                            marginRight: '30px' // Make sure marginRight is still specified
                        }}
                        onChange={(e) => setInstructionSpecification(e.target.value)}
                    />
                </div>
                <div style={{ textAlign: 'right',  paddingTop: '10px', paddingRight: '500px'}}>
                    <label htmlFor="minReqStock" style={{ marginRight: '30px'}} >Min Required Stock</label>
                    <input
                        type="text"
                        value={minReqStock}
                        className="form-control"
                        placeholder=""
                        style={{
                            height: '30px',
                            borderColor: 'black',
                            width: 200,
                            display: 'inline-block', // Add this line
                            marginRight: '30px' // Make sure marginRight is still specified
                        }}
                        onChange={(e) => setMinReqStock(e.target.value)}
                    />
                </div>
                <div style={{ textAlign: 'right',  paddingTop: '10px', paddingRight: '500px'}}>
                    <label htmlFor="remarks" style={{ marginRight: '30px'}} >Remarks</label>
                    <input
                        type="text"
                        value={remarks}
                        className="form-control"
                        placeholder=""
                        style={{
                            height: '30px',
                            borderColor: 'black',
                            width: 200,
                            display: 'inline-block', // Add this line
                            marginRight: '30px' // Make sure marginRight is still specified
                        }}
                        onChange={(e) => setRemarks(e.target.value)}
                    />
                </div>
                <p></p>
                <div style={{ paddingTop: '20px', paddingLeft: '700px' }}>
                    <Button variant="primary" type="submit" onClick={handleSubmit} >
                        Add
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default AddProduct;