import React, { useState } from 'react';
 import { Link, useNavigate } from 'react-router-dom';
import Navbar1 from '../components/Navbar1';
import Sidebar from '../components/Sidebar';
import {logout} from'../actions/userAction'
import { useDispatch } from 'react-redux';

function Signout() {
  const dispatch=useDispatch()
  const [showModal, setShowModal] = useState(false);
  // const navigate = useNavigate();
  const handleSignOut = () => {
    dispatch(logout())
   
    // navigate('/')

    setShowModal(false); // Close the modal after sign-out
  };

  return (
    <div>
      <Navbar1 />
      
      <button className="btn btn-danger" style={{marginLeft:"1690px"}}onClick={() => setShowModal(true)}>Sign Out</button>

      {showModal && (
        <div className="modal" tabIndex="-1" style={{ display: 'block' }} role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Log Out</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to sign out?</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="button" className="btn btn-primary" onClick={handleSignOut}>Confirm</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Signout;
