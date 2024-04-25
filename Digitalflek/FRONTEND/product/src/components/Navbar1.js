import React from 'react';
import logo from './logo.png';
import profileout from './profileout.png';
import { useSelector } from 'react-redux';

function Navbar1(props) {
    const userSignin = useSelector(state => state.userSignin);

    return (
        
                <div>
                    <nav style={{ background: 'rgba(102, 38, 113, 1)', width: "1900px", height: "70px" }}>
                        <a className="navbar-brand" href="/home">
                            <img src={logo} width="296" height="45.96" style={{ background: 'rgba(102, 38, 113, 1)', marginTop: '15px' }} alt="Logo" />
                        </a>
                        <a className="navbar-brand" href="/signout">
                            <img src={profileout} width="50" height="50" style={{ background: 'rgba(102, 38, 113, 1)', marginTop: '15px', marginLeft: '1420px' }} alt="Logo" />
                        </a>
                    </nav>
                </div>
  )  }
      
  


export default Navbar1;

