import './App.css';
import React from 'react';

import Home from './components/Home'
import Dashboards from './components/Dashboards'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'

function App() {
  return (
    <Router>
        <Routes>
          {/* <Route path="/" element={<Home/>}/> */}
          {/* <Route path="/" element ={<h1>Home</h1>}/> */}
          <Route path="/dashboards" element={<Dashboards/>}/>
          <Route path="*" element={<h1>Rota não encontrada</h1>}/>
        </Routes>
    </Router>
  );
}

export default App;

