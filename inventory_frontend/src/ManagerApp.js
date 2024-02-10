import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./components/Home";
import ManagerNavigation from './components/manager/ManagerNavigation';
import AppinfoManager from './components/manager/AppinfoManager';
import ChemicalManager from './components/manager/ChemicalManager';
import InventoryManager from './components/manager/InventoryManager';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Notification from './components/manager/Notification';


function ManagerApp() {
  return (
    <BrowserRouter>
      <ManagerNavigation />
      <Routes>
         <Route path="/" element={<Home/>} />
         <Route exact path="/home" element={<Home/>} />
         <Route path="/manager/appinfo" element={<AppinfoManager/>} />

         <Route path="/manager/master" element={<ChemicalManager/>} />

         <Route path="/manager/inventory" element={<InventoryManager/>} />

         <Route path="/notification" element={<Notification/>} />

       </Routes>
    </BrowserRouter>
  );
};

export default ManagerApp;