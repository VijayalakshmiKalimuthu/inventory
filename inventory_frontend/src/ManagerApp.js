import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./components/Home";
import ManagerNavigation from './components/manager/ManagerNavigation';
import AppinfoManager from './components/manager/AppinfoManager';
import ChemicalManager from './components/manager/ChemicalManager';
import InventoryManager from './components/manager/InventoryManager';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Notification from './components/manager/Notification';
import ViewEntry from './components/manager/viewEntry';
import Dasboard from './components/manager/Dashboard';
import Project from './components/admin/projects/Project';
import MasterFilter from './components/manager/dashboard/MasterFilter';


function ManagerApp() {
  return (
    <BrowserRouter>
      <ManagerNavigation />
      <Routes>
         <Route path="/" element={<Dasboard/>} />
         <Route exact path="/dashboard" element={<Dasboard/>} />
         <Route exact path="/project" element={<Project/>} />
         <Route path="/manager/appinfo" element={<AppinfoManager/>} />

         <Route path="/manager/master" element={<ChemicalManager/>} />
         <Route path="/manager/master_filter" element={<MasterFilter/>} />

         <Route path="/manager/inventory" element={<InventoryManager/>} />

         <Route path="/notification" element={<Notification/>} />
         <Route path="/view_entry" element={<ViewEntry/>} />

       </Routes>
    </BrowserRouter>
  );
};

export default ManagerApp;