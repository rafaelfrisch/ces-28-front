import logo from './logo.svg';
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
  );
}

export default App;
