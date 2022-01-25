import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Home from './pages/home';
import Login from './pages/login';
import Favourite from './pages/favourite';
import { Cookies, CookiesProvider } from 'react-cookie';

function App() {
  return (
    <Router>
      <CookiesProvider>
        
        
        <Routes>
          
          <Route exact path="/" element={<Login/>}/> 
          <Route exact path="/home" element={<Home/>}/>       
          <Route exact path="/fav_list" element={<Favourite/>} />
      
          
              
        </Routes>

      </CookiesProvider>
      
    </Router>
  );
}

export default App;
