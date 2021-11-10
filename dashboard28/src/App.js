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
          <Route path="/timeplots" element={<TimePlots/>}/>
          <Route path="/pieplots" element={<PiePlots/>}/>
          <Route path="*" element={<div>Vazio</div>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;

