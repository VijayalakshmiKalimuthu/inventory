import React from 'react';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink } from 'react-router-dom';
import { Button, Navbar } from 'react-bootstrap';
import TN_Transparent_Logo from '../../assets/TN_Transparent_Logo.png';
import '../../App.css';
import '../Navigation.css';
import { FcAddDatabase } from "react-icons/fc";
import { FcHighPriority } from "react-icons/fc";
import { FcList } from 'react-icons/fc';
import { FcBarChart } from 'react-icons/fc';
import { FcHome } from 'react-icons/fc';



const LabNavigation = () => {
  return (
    <div>
      <Navbar bg="dark" variant="dark" id="my-nav" className="custom-navbar" style={{width : '140%'}}>
        <Navbar.Brand className="app-logo" href="/home">
          <img
            src={TN_Transparent_Logo}
            width="40"
            height="50"
            className="d-inline-block align-center"
            alt="React Bootstrap logo"
          />{' '}
          INVENTORY MANAGEMENT SYSTEM
        </Navbar.Brand>
        <Button href="./Login" style={{ marginLeft: '800px' }} >Logout</Button>
      </Navbar>
      <div className='sidebar'>
        <CDBSidebar className="narrow-sidebar" textColor="black" backgroundColor="gray">
          <CDBSidebarHeader prefix={<i className="fa fa-bars" />}>
            Lab Assistant 
          </CDBSidebarHeader>
          <CDBSidebarContent>
            <CDBSidebarMenu>
              <NavLink exact to="/lab_assistant/inventory_trans" activeClassName="activeClicked">
                <CDBSidebarMenuItem className="black-text">
                  <FcHome style={{ marginRight: '8px', fontSize: '24px' }} />
                  Home
                </CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact to="/lab_assistant/appinfo" activeClassName="activeClicked">
                <CDBSidebarMenuItem className="black-text" >
                  <FcAddDatabase style={{ marginRight: '8px', fontSize: '24px' }} />
                  Appinfo
                </CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact to="/lab_assistant/master_manage" activeClassName="activeClicked">
                <CDBSidebarMenuItem className="black-text">
                  <FcBarChart style={{ marginRight: '8px', fontSize: '24px' }} />
                  Inventory Master
                </CDBSidebarMenuItem>
              </NavLink>

              <NavLink exact to="/lab_assistant/received_items" activeClassName="activeClicked">
                <CDBSidebarMenuItem className="black-text">
                  <FcBarChart style={{ marginRight: '8px', fontSize: '24px' }} />
                  Receive
                </CDBSidebarMenuItem>
              </NavLink>
              
              <NavLink exact to="/lab_assistant/issued_items" activeClassName="activeClicked">
                <CDBSidebarMenuItem className="black-text">
                  <FcBarChart style={{ marginRight: '8px', fontSize: '24px' }} />
                  Issue
                </CDBSidebarMenuItem>
              </NavLink>

              {/*<NavLink exact to="/lab_assistant/inventory_trans" activeClassName="activeClicked">
                <CDBSidebarMenuItem className="black-text">
                  <FcList style={{ marginRight: '8px', fontSize: '24px' }} />
                  Inventory Transactions
                </CDBSidebarMenuItem>
              </NavLink> */}

              <NavLink exact to="/lab_assistant/task_manage" activeClassName="activeClicked">
                <CDBSidebarMenuItem className="black-text">
                  <FcHighPriority style={{ marginRight: '8px', fontSize: '24px' }} />
                  Reasearcher Issue Task
                </CDBSidebarMenuItem>
              </NavLink>

            </CDBSidebarMenu>
          </CDBSidebarContent>
        </CDBSidebar>
      </div>
    </div>
  );
};

export default LabNavigation;
