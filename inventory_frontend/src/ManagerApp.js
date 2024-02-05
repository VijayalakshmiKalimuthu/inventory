import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./components/Home";
import ManagerNavigation from './components/manager/ManagerNavigation';
import AppinfoManager from './components/manager/AppinfoManager';
import ChemicalManager from './components/manager/ChemicalManager';
import InventoryManager from './components/manager/InventoryManager';
import {BrowserRouter, Route, Routes} from 'react-router-dom';


function ManagerApp() {
  return (
    <BrowserRouter>
      <ManagerNavigation />
      <Routes>
         <Route path="/" element={<Home/>} />
         <Route exact path="/home" element={<Home/>} />
         <Route path="/manager/appinfo" element={<AppinfoManager/>} />

         <Route path="/manager/chemical" element={<ChemicalManager/>} />

         <Route path="/manager/inventory" element={<InventoryManager/>} />

       </Routes>
    </BrowserRouter>
  );
};

export default ManagerApp;