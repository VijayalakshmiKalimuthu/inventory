import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import Appinfo from "./components/Appinfo";
import Manage from "./components/Manage";
import Chemical from "./components/chemical/Chemical"
import ChemicalManage from "./components/chemical/ChemicalManage"
import Project from './components/projects/Project';
import ProjectManage from './components/projects/ProjectManage'
import Inventory from './components/inventory/Inventory'
import InventoryManage from './components/inventory/InventoryManage';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Login from '../src/components/Login';

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
         <Route exact path="/" element={<Home/>} />
         <Route path="/appinfo" element={<Appinfo/>} />
         <Route path="/appinfo_manage" element={<Manage/>} />

         <Route path="/chemical" element={<Chemical/>} />
         <Route path="/chemical_manage" element={<ChemicalManage/>} />

         <Route path="/project" element={<Project/>} />
         <Route path="/project_manage" element={<ProjectManage/>} />
         
         <Route path="/inventory" element={<Inventory/>} />
         <Route path="/inventory_manage" element={<InventoryManage/>} />
       </Routes>
    </BrowserRouter>
  );
};

export default App;