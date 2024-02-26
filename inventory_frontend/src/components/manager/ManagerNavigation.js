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
import '../../App.css'
import '../Navigation.css'
import { FcAddDatabase } from "react-icons/fc";
import { FcList } from 'react-icons/fc';
import { FcBarChart } from 'react-icons/fc';
import { FcHome } from 'react-icons/fc';
import { FcNews, FcDataSheet } from 'react-icons/fc';



const ManagerNavigation = () => {
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
        <Button href="./Login" style={{ marginLeft: '700px' }} >Logout</Button>
      </Navbar>
      <div className='sidebar' style={{height: '530px'}}>
        <CDBSidebar className="narrow-sidebar" textColor="black" backgroundColor="gray">
          <CDBSidebarHeader prefix={<i className="fa fa-bars" />}>
            Manager Site 
          </CDBSidebarHeader>
          <CDBSidebarContent>
            <CDBSidebarMenu>
            {/*  <NavLink exact to="/" activeClassName="activeClicked">
                <CDBSidebarMenuItem className="black-text">
                  <FcHome style={{ marginRight: '8px', fontSize: '24px' }} />
                  Dashboard
                </CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact to="/manager/appinfo" activeClassName="activeClicked">
                <CDBSidebarMenuItem className="black-text">
                  <FcAddDatabase style={{ marginRight: '8px', fontSize: '24px' }} />
                  Appinfo
                </CDBSidebarMenuItem>
              </NavLink> */}
              <NavLink exact to="/manager/master_filter" activeClassName="activeClicked">
                <CDBSidebarMenuItem className="black-text">
                  <FcBarChart style={{ marginRight: '8px', fontSize: '24px' }} />
                  Inventory Master
                </CDBSidebarMenuItem>
              </NavLink>

              <NavLink exact to="/notification" activeClassName="activeClicked">
                <CDBSidebarMenuItem className="black-text">
                  <FcNews style={{ marginRight: '10px', fontSize: '24px' }} />
                  Notification
                </CDBSidebarMenuItem>
              </NavLink>

              { /*<NavLink exact to="/view_entry" activeClassName="activeClicked">
                <CDBSidebarMenuItem className="black-text">
                  <FcDataSheet style={{ marginRight: '10px', fontSize: '24px' }} />
                  View Entry 
                </CDBSidebarMenuItem>
            </NavLink> */ }

            </CDBSidebarMenu>
          </CDBSidebarContent>
        </CDBSidebar>
      </div>
    </div>
  );
};

export default ManagerNavigation;
