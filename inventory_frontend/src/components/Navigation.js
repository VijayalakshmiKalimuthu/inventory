import React from 'react';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink } from 'react-router-dom';
import { Navbar } from 'react-bootstrap';
import logo from '../assets/logo.png';
import '../App.css';

const Navigation = () => {
  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg" id="my-nav">
        <Navbar.Brand className="app-logo" href="/">
          <img
            src={logo}
            width="40"
            height="50"
            className="d-inline-block align-center"
            alt="React Bootstrap logo"
          />{' '}
          INVENTORY MANAGEMENT SYSTEM
        </Navbar.Brand>
      </Navbar>
      <div className='sidebar'>
        <CDBSidebar textColor="#333" backgroundColor="#f0f0f0">
          <CDBSidebarHeader prefix={<i className="fa fa-bars" />}>
            Navigation
          </CDBSidebarHeader>
          <CDBSidebarContent>
            <CDBSidebarMenu>
              <NavLink exact to="/" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="home">Home</CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact to="/appinfo" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="list">Appinfo List</CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact to="/chemical" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="list">Chemical List</CDBSidebarMenuItem>
              </NavLink>

              <NavLink exact to="/project" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="list">Project List</CDBSidebarMenuItem>
              </NavLink>

              <NavLink exact to="/inventory" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="list">Inventory List</CDBSidebarMenuItem>
              </NavLink>

            </CDBSidebarMenu>
          </CDBSidebarContent>
        </CDBSidebar>
      </div>
    </div>
  );
};

export default Navigation;
