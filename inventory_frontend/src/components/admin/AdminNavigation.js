import React, {useState} from 'react';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink } from 'react-router-dom';
import { Button, Navbar } from 'react-bootstrap';
import '../../App.css';
import '../Navigation.css'
import TN_Transparent_Logo from '../../assets/TN_Transparent_Logo.png';
import { FcHome, FcRedo, FcNews } from 'react-icons/fc';
import { FcBarChart } from 'react-icons/fc';
import { FcServices } from 'react-icons/fc';
import { FcBusinessman } from 'react-icons/fc';
import { FcContacts } from 'react-icons/fc';



const AdminNavigation = () => {
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
            Admin
          </CDBSidebarHeader>
          <CDBSidebarContent>
            <CDBSidebarMenu>
              <NavLink exact to="/" activeClassName="activeClicked">
                <CDBSidebarMenuItem className="black-text">
                  <FcHome style={{ marginRight: '10px', fontSize: '24px' }} />
                  Home
                </CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact to="/admin/project_manage" activeClassName="activeClicked">
              <CDBSidebarMenuItem className="black-text">
                  <FcBarChart style={{ marginRight: '10px', fontSize: '24px' }} />
                  Project Master
                </CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact to="/register" activeClassName="activeClicked">
                <CDBSidebarMenuItem className="black-text">
                  <FcBusinessman style={{ marginRight: '10px', fontSize: '24px' }} />
                  New User
                </CDBSidebarMenuItem>
              </NavLink>

              <NavLink exact to="/password_reset" activeClassName="activeClicked">
                <CDBSidebarMenuItem className="black-text">
                  <FcRedo style={{ marginRight: '10px', fontSize: '24px' }} />
                  Password Reset
                </CDBSidebarMenuItem>
              </NavLink>

              <NavLink exact to="/employee_manage" activeClassName="activeClicked">
                <CDBSidebarMenuItem className="black-text">
                  <FcContacts style={{ marginRight: '10px', fontSize: '24px' }} />
                  Employee Details
                </CDBSidebarMenuItem>
              </NavLink>

              

            </CDBSidebarMenu>
          </CDBSidebarContent>
        </CDBSidebar>
      </div>
    </div>
  );
};
 
export default AdminNavigation;
