import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminNavigation from './components/admin/AdminNavigation';
import AdminHome from './components/admin/AdminHome';
import Appinfo from "./components/appinfo/Appinfo";
import Project from './components/admin/projects/Project';
import ProjectManage from './components/admin/projects/ProjectManage'
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Register from './components/auth/Register';
import ReactDOM from 'react-dom';
import App from './App';
import Notification from './components/admin/Notification';
import PasswordReset from './components/auth/PasswordReset';

function AdminApp() {
  return (
    <BrowserRouter>
      <AdminNavigation />
        <Routes>
          <Route path="/" element={<AdminHome/>} />
          <Route exact path="/admin/home" element={<AdminHome/>} />
          <Route path="/admin/appinfo" element={<Appinfo/>} />
          <Route path="/admin/project" element={<Project/>} />
          <Route path="/admin/project_manage" element={<ProjectManage/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/password_reset" element={<PasswordReset/>} />

          <Route path="/notification" element={<Notification/>} />
        </Routes>
    </BrowserRouter>
  );
}

export default AdminApp;
