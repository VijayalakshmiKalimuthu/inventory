import React, { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { getItemReceiveApi } from '../../../services/AppinfoService';
import "../../../App.css";
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';


const ReceivedFilter = () => {
  const [receive, setReceive] = useState([]);

  useEffect(() => {
    let mounted = true;
    getItemReceiveApi()
      .then(data => {
        if (mounted) {
          setReceive(data);
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  
    return () => (mounted = false);
  }, []);
  // Define your columns as you did before
  const columns = [
      {
          dataField: 'item_code',
          text: 'Item Code',
          filter: textFilter(),
          sort: true,
          headerStyle: { backgroundColor: '#C5EA31',
          width: '50px', 
          color: 'black', 
          textAlign: 'center', 
          border: '1px solid black' },
          style: { textAlign: 'center', 
                  border: '1px solid black' }
      },
      {
        dataField: 'item_name',
        text: 'Item Name',
        filter: textFilter(),
        sort: true,
        headerStyle: { backgroundColor: '#C5EA31',
        width: '50px', 
        color: 'black', 
        textAlign: 'center', 
        border: '1px solid black' },
        style: { textAlign: 'center', 
                border: '1px solid black' }
    },
    {
        dataField: 'units',
        text: 'Units',
        sort: true,
        headerStyle: { backgroundColor: '#C5EA31',
        width: '50px', 
        color: 'black', 
        textAlign: 'center', 
        border: '1px solid black' },
        style: { textAlign: 'center', 
                border: '1px solid black' }
    },
    {
        dataField: 'receipt_date',
        text: 'Receipt Date',
        filter: textFilter(),
        sort: true,
        headerStyle: { backgroundColor: '#C5EA31',
        width: '50px', 
        color: 'black', 
        textAlign: 'center', 
        border: '1px solid black' },
        style: { textAlign: 'center', 
                border: '1px solid black' }
    },
    {
        dataField: 'quantity_received',
        text: 'Quantity Received',
        filter: textFilter(),
        sort: true,
        headerStyle: { backgroundColor: '#C5EA31',
        width: '50px', 
        color: 'black', 
        textAlign: 'center', 
        border: '1px solid black' },
        style: { textAlign: 'center', 
                border: '1px solid black' }
    },
    {
        dataField: 'po_number',
        text: 'PO Number',
        sort: true,
        headerStyle: { backgroundColor: '#C5EA31',
        width: '50px', 
        color: 'black', 
        textAlign: 'center', 
        border: '1px solid black' },
        style: { textAlign: 'center', 
                border: '1px solid black' }
    },
    {
        dataField: 'batch_number',
        text: 'Batch/Lot Number',
        sort: true,
        headerStyle: { backgroundColor: '#C5EA31',
        width: '50px', 
        color: 'black', 
        textAlign: 'center', 
        border: '1px solid black' },
        style: { textAlign: 'center', 
                border: '1px solid black' }
    },
    {
        dataField: 'remarks',
        text: 'Remarks',
        sort: true,
        headerStyle: { backgroundColor: '#C5EA31',
        width: '50px', 
        color: 'black', 
        textAlign: 'center', 
        border: '1px solid black' },
        style: { textAlign: 'center', 
                border: '1px solid black' }
    },
  ]

  return(
    <div>
        <div style={{ background: "#C5EA31", height: '50px' }} className="header">
            <h2 style={{ textAlign: 'center', paddingTop: '5px' }}>RECEIVE</h2>
        </div>
        <div style={{ overflowY: 'scroll', maxHeight: '300px' }}>
            <div className="row side-row" style={{ textAlign: 'center' }}>
                <BootstrapTable
                    keyField={(row, index) => `${row.c_id}-${index}`}
                    data={receive}
                    columns={columns}
                    filter={filterFactory()}
                    striped
                    bordered
                    hover
                    className="react-bootstrap-table"
                    id="dataTable" style={{ margin: 'auto', width: '1000px' }}
                />
            </div>
        </div>
    </div>
);
};

export default ReceivedFilter;