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
import TN_Transparent_Logo from '../assets/TN_Transparent_Logo.png';
import '../App.css';
import './Navigation.css'

const Navigation = () => {
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
        <Button href="./Login" style={{ marginLeft: '800px' }} >Logout</Button>
      </Navbar>
      <div className='sidebar'>
        <CDBSidebar className="narrow-sidebar" textColor="black" backgroundColor="gray">
          <CDBSidebarHeader prefix={<i className="fa fa-bars" />}>
            Dashboard
          </CDBSidebarHeader>
          <CDBSidebarContent>
            <CDBSidebarMenu>
              <NavLink exact to="/" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="home" className="black-text">Home</CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact to="/appinfo" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="list" className="black-text">Appinfo </CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact to="/chemical" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="list" className="black-text">Chemical Master</CDBSidebarMenuItem>
              </NavLink>

              <NavLink exact to="/project" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="list" className="black-text">Project Master</CDBSidebarMenuItem>
              </NavLink>

              <NavLink exact to="/inventory" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="list" className="black-text">Inventory Master</CDBSidebarMenuItem>
              </NavLink>

              <NavLink exact to="/settings" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="list" className="black-text">Settings</CDBSidebarMenuItem>
              </NavLink>

            </CDBSidebarMenu>
          </CDBSidebarContent>
        </CDBSidebar>
      </div>
    </div>
  );
};

export default Navigation;
