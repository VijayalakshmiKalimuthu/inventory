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
import TN_Transparent_Logo from '../../../assets/TN_Transparent_Logo.png';
import '../../../App.css';
import '../../Navigation.css';
import { FcAddDatabase } from "react-icons/fc";
import { FcHighPriority } from "react-icons/fc";
import { FcList } from 'react-icons/fc';
import { FcBarChart } from 'react-icons/fc';
import { FcHome, FcDown, FcExternal } from 'react-icons/fc';



const LabNavigation1 = () => {
  return (
    <div>
      <Navbar bg="dark" variant="dark" id="my-nav" className="custom-navbar" style={{width : '100%'}}>
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
      <div className='sidebar' style={{height: '530px'}}>
        <CDBSidebar className="narrow-sidebar" textColor="black" backgroundColor="gray">
          <CDBSidebarHeader prefix={<i className="fa fa-bars" />}>
            Lab Assistant 
          </CDBSidebarHeader>
          <CDBSidebarContent>
            <CDBSidebarMenu>
              <NavLink exact to="/master" activeClassName="activeClicked">
                <CDBSidebarMenuItem className="black-text">
                  <FcHome style={{ marginRight: '8px', fontSize: '24px' }} />
                  Home
                </CDBSidebarMenuItem>
              </NavLink>

              <NavLink exact to="/add_product" activeClassName="activeClicked">
                <CDBSidebarMenuItem className="black-text">
                  <FcAddDatabase style={{ marginRight: '8px', fontSize: '24px' }} />
                  Add Product
                </CDBSidebarMenuItem>
              </NavLink>

              <NavLink exact to="/received_product" activeClassName="activeClicked">
                <CDBSidebarMenuItem className="black-text">
                  <FcDown style={{ marginRight: '8px', fontSize: '24px' }} />
                  Add Receive
                </CDBSidebarMenuItem>
              </NavLink>

              <NavLink exact to="/issued_product" activeClassName="activeClicked">
                <CDBSidebarMenuItem className="black-text">
                  <FcExternal style={{ marginRight: '8px', fontSize: '24px' }} />
                  Add Issue
                </CDBSidebarMenuItem>
              </NavLink>
              
            </CDBSidebarMenu>
          </CDBSidebarContent>
        </CDBSidebar>
      </div>
    </div>
  );
};

export default LabNavigation1;
