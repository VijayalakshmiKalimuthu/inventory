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


const AdminNavigation = () => {
  return (
    <div>
      <Navbar bg="dark" variant="dark" id="my-nav" className="custom-navbar">
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
      <div className='sidebar'>
        <CDBSidebar className="narrow-sidebar" textColor="black" backgroundColor="gray">
          <CDBSidebarHeader prefix={<i className="fa fa-bars" />}>
            Admin
          </CDBSidebarHeader>
          <CDBSidebarContent>
            <CDBSidebarMenu>
              <NavLink exact to="/admin/home" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="home" className="black-text">Home</CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact to="/admin/project" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="list" className="black-text">Project Master</CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact to="/register" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="list" className="black-text">Settings</CDBSidebarMenuItem>
              </NavLink>

              <NavLink exact to="/password_reset" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="list" className="black-text">Password Reset</CDBSidebarMenuItem>
              </NavLink>

              <NavLink exact to="/notification" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="list" className="black-text">Notification</CDBSidebarMenuItem>
              </NavLink>

            </CDBSidebarMenu>
          </CDBSidebarContent>
        </CDBSidebar>
      </div>
    </div>
  );
};
 
export default AdminNavigation;
