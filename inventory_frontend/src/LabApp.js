import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import HomeLab from '../src/components/Lab1/homeLab/HomeLab'
import LabNavigation1 from './components/Lab1/homeLab/LabNavigation1';
import AddProduct from './components/Lab1/addProduct/AddProduct';
import ReceivedProduct from './components/Lab1/receive/ReceivedProduct';
import IssuedProduct from './components/Lab1/issue/IssuedProduct';
import ChemicalList from './components/Lab1/homeLab/ChemicalList';


function LabApp() {
  return (
    <BrowserRouter>
      <LabNavigation1 />
        <Routes>
          <Route path="/" element={<HomeLab/>} />
          <Route path="/master" element={<HomeLab/>} />
          <Route path="/add_product" element={<AddProduct/>} />
          <Route path="/received_product" element={<ReceivedProduct/>} />
          <Route path="/issued_product" element={<IssuedProduct />} />

          <Route path="/chemical_list" element={<ChemicalList />} />

        </Routes>
    </BrowserRouter>
  );
};

export default LabApp;