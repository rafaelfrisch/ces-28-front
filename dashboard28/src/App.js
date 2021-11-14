import './App.css';
import React from 'react';

import Home from './components/Home'
import TimePlots from './components/TimePlots'
import PiePlots from './components/PiePlots'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'

function App() {
  return (
    <Router>
      <div className="App">
        {/* <Nav/> */}
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/timeplots/l7data" element={<TimePlots interval="7"/>}/>
          <Route path="/timeplots/l30data" element={<TimePlots interval="30"/>}/>
          <Route path="/pieplots" element={<PiePlots/>}/>
          <Route path="*" element={<h1>Rota não encontrada</h1>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;

