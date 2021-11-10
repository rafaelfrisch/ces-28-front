import './App.css';
import React from 'react';

// import Nav from './components/Nav'
import Home from './components/Home'
// import Aulas from './components/Aulas'
// import Sobre from './components/Sobre'
// import Aula from './components/Aula'
// import Assistir from './components/Assitir';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'

function App() {
  return (
    <Router>
      <div className="App">
        {/* <Nav/> */}
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="*" element={<div>Vazio</div>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;

