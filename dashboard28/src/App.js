import './App.css';
import SideBar from './components/SideBar';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import Users from './pages/Users';

function App() {
  return (
      <Router>
        <SideBar />
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/products' element={<Products />} />
            <Route path='/users' element={<Users />} />
          </Routes>        
      </Router> 
import React from 'react';

import Home from './components/Home'
import Dashboards from './components/Dashboards'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'

function App() {
  return (
    <Router>
      <div className="App">
        {/* <Nav/> */}
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/dashboards" element={<Dashboards/>}/>
          <Route path="*" element={<h1>Rota não encontrada</h1>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;

