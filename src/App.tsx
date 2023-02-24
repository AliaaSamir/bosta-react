import React from 'react';
import logo from './logo.svg';
//import './App.css';
import Shipment from './component/Shipment';
import NavBar from './component/NavBar';

function App() {
  return (
    <div className="container">
      <NavBar></NavBar>
      <Shipment />
    </div>
  );
}

export default App;
