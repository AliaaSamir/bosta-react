
import React from 'react';
import logo from './../logo.svg';

function Navbar() {
    return (
<nav className="navbar navbar-expand-lg navbar-light bg-light">
  <a className="navbar-brand" href="#">
    <img src={logo} alt="" className='w-50'/>
    </a>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item active">
        <a className="nav-link" href="#">Shipment Tracking <span className="sr-only">(current)</span></a>
      </li>
    </ul>
  </div>
</nav>
);
}
export default Navbar;


