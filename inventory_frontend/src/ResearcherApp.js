import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./components/Home";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import ResearcherNavigation from './components/researcher/ResearcherNavigation';
import ReNotification from './components/researcher/ReNotification';
import AddProductListReq from './components/researcher/AddProductListReq';


function ResearcherApp() {
  return (
    <BrowserRouter>
      <ResearcherNavigation />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route exact path="/home" element={<Home/>} />
          <Route exact path="re_notify" element={<ReNotification/>} />
          <Route exact path="/addProductReq" element={<AddProductListReq/>} />
        </Routes>
    </BrowserRouter>
  );
};

export default ResearcherApp;