import React, { useEffect, useState } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import { getProjectApi } from '../../../services/AppinfoService';
import "../../../App.css";



const ProjectFilter = () => {
  const [project, setProject] = useState([]);

  useEffect(() => {
    let mounted = true;
    getProjectApi()
      .then(data => {
        if (mounted) {
          setProject(data);
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  
    return () => (mounted = false);
  }, []);

  // Define columns
  const columns = [
    {
      dataField: 'project_code',
      text: 'Project Code',
      sort: true,
      headerStyle: {
        backgroundColor: '#C5EA31',
        width: '100px',
        color: 'black',
        textAlign: 'center',
        border: '1px solid black'
      },
      style: {
        textAlign: 'center',
        border: '1px solid black'
      },
      filter: textFilter() // Adding filter to the column
    },
    {
      dataField: 'project_name',
      text: 'Project Name',
      sort: true,
      headerStyle: {
        backgroundColor: '#C5EA31',
        width: '100px',
        color: 'black',
        textAlign: 'center',
        border: '1px solid black'
      },
      style: {
        textAlign: 'center',
        border: '1px solid black'
      },
      filter: textFilter() // Adding filter to the column
    }
  ];

  return (
    <div>
      <div style={{ background: "#C5EA31", height: '50px' }} className="header">
        <h2 style={{ textAlign: 'center', paddingTop: '5px' }}>PROJECT MASTER</h2>
      </div>
      <div style={{ overflowY: 'scroll', maxHeight: '280px' }}>
        <div className="row side-row" style={{ textAlign: 'center' }}>
          <BootstrapTable
            keyField='id'
            data={project}
            columns={columns}
            filter={filterFactory()}
            striped
            bordered
            hover
            className="react-bootstrap-table"
            id="dataTable"
            style={{ margin: 'auto', width: '100px' }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectFilter;
