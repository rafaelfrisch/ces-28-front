import './App.css';
import SideBar from './components/SideBar';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Products from './pages/Products';
import Users from './pages/Users';
import Home from './components/Home'
import Dashboards from './components/Dashboards'

function App() {
  return (
      <Router>
        <div className="App">
          <SideBar />
          <Routes>
            <Route path='/products' element={<Products />} />
            <Route path='/users' element={<Users />} />
            <Route path="/" element={<Home/>}/>
            <Route path="/dashboards" element={<Dashboards/>}/>
            <Route path="*" element={<h1>Rota não encontrada</h1>}/>
          </Routes>
          </div>        
      </Router> 
  );
}

export default App;

