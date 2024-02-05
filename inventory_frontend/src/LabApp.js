import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import LabNavigation from './components/lab/LabNavigation';
import Home from "./components/Home";
import Appinfo from "./components/appinfo/Appinfo";
import Manage from "./components/appinfo/Manage";
import Chemical from "./components/chemical/Chemical"
import ChemicalManage from "./components/chemical/ChemicalManage"
import Inventory from './components/inventory/Inventory'
import InventoryManage from './components/inventory/InventoryManage';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import ApprovalChemicalModal from './components/chemical/ApprovalChemicalModal';
import ApprovalInventoryModal from './components/inventory/ApprovalInventoryModal';
import TaskManage from './components/lab/TaskManage';
import AddResearcherIssueTask from './components/lab/AddResearcherIssueTask';


function LabApp() {
  return (
    <BrowserRouter>
      <LabNavigation />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route exact path="/home" element={<Home/>} />
          <Route path="/lab_assistant/appinfo" element={<Appinfo/>} />
          <Route path="/lab_assistant/appinfo_manage" element={<Manage/>} />
    
          <Route path="/lab_assistant/chemical" element={<Chemical/>} />
          <Route path="/lab_assistant/chemical_manage" element={<ChemicalManage/>} />
          <Route path="/lab_assistant/chemical_approval" element={<ApprovalChemicalModal/>} />
    
          <Route path="/lab_assistant/inventory" element={<Inventory/>} />
          <Route path="/lab_assistant/inventory_manage" element={<InventoryManage/>} />
          <Route path='/lab_assistant/inventory_approval' element={<ApprovalInventoryModal/>} />

          <Route path="/lab_assistant/task_manage" element={<TaskManage/>} />
          <Route path="/lab_assistant/add_task_modal" element={<AddResearcherIssueTask/>} />

        </Routes>
    </BrowserRouter>
  );
};

export default LabApp;