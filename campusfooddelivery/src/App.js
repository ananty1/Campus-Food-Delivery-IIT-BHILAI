import './App.css';
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";

import Navbar from './components/Navbar';
import { Home } from './components/Home';
import About  from './components/About';
import OrderState from './context/orders/OrderState';
import LogIn from './components/LogIn';
import SignUp from './components/SignUp';
import Alert from './components/Alert';

function App() {
  const [alert,setAlert] = useState(null);
  const showAlert = (message, type)=>{
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
        setAlert(null);
    }, 1500);
}


  return (
    <>
      <OrderState>
      <Router>
        <Navbar showAlert={showAlert}/>
        <Alert alert={alert}/>
        <div className='container'>
        <Routes>
          <Route path="/" element={<Home showAlert={showAlert} />}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/login" element={<LogIn showAlert={showAlert} />}/> 
          <Route path="/signup" element={<SignUp showAlert={showAlert} />}/>
        </Routes>
        </div>
      </Router>
      </OrderState>
    </>
  );
}

export default App;
