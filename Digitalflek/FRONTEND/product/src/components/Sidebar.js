import React from 'react';
import { NavLink } from 'react-router-dom';
import product from './product.png';
import category from './category.png';
import home from './home.png';

const Sidebar = () => {
  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
       
        <div className="col-auto col-sm-3 col-xl-2 px-sm-2 px-0" style={{ background: 'rgba(244, 244, 244, 1)', boxShadow: '0px 4px 10px 0px rgba(0, 0, 0, 0.2)', width: '448px', height: '1600px', gap: '0px', opacity: '0.7', position: 'fixed', top: '11100', left: '0', zIndex: '1000', marginRight: '20px',marginTop:'0px' }}>
          <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-dark min-vh-100">

            <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
              <li className="nav-item">
                <NavLink to="/home" className="nav-link align-middle px-10">
                  <img src={home} alt="Home" width="30" height="30" className="rectangle" />
                  <span className="ms-2 d-none d-sm-inline">Home</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/category" className="nav-link px-10 align-middle">
                  <img src={category} alt="Category" width="30" height="30" className="rectangle" />
                  <span className="ms-2 d-none d-sm-inline">Category</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/product" className="nav-link px-10 align-middle">
                  <img src={product} alt="Product" width="30" height="30" className="rectangle" />
                  <span className="ms-2 d-none d-sm-inline">Products</span>
                </NavLink>
              </li>
            </ul>
            <hr />
          </div>
        </div>
       
        <div className="col py-3">
         
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
