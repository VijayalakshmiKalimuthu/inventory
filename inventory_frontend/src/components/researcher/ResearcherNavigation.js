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
import { FcHome } from 'react-icons/fc';
import { FcHighPriority } from "react-icons/fc";

const ResearcherNavigation = () => {
  return (
    <div>
      <Navbar bg="dark" variant="dark" id="my-nav" className="custom-navbar" style={{ width: '100%' }}>
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
            Researcher 
          </CDBSidebarHeader>
          <CDBSidebarContent>
            <CDBSidebarMenu>
              <NavLink exact to="/" activeClassName="activeClicked">
                <CDBSidebarMenuItem  className="black-text">
                  <FcHome style={{ marginRight: '8px', fontSize: '24px' }} />
                  Home
                </CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact to="/re_notify" activeClassName="activeClicked">
                <CDBSidebarMenuItem className="black-text">
                  <FcHighPriority style={{ marginRight: '8px', fontSize: '24px' }} />
                  Notification 
                </CDBSidebarMenuItem>
              </NavLink>

              <NavLink exact to="/addProductReq" activeClassName="activeClicked">
                <CDBSidebarMenuItem className="black-text">
                  <FcHighPriority style={{ marginRight: '8px', fontSize: '24px' }} />
                  Request 
                </CDBSidebarMenuItem>
              </NavLink>


            </CDBSidebarMenu>
          </CDBSidebarContent>
        </CDBSidebar>
      </div>
    </div>
  );
};

export default ResearcherNavigation;
