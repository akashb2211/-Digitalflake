import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request to your backend with the email
      const response = await fetch('http://localhost:5000/forgotpassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      // Assuming your backend sends a message upon successful submission
      setMessage(data.message);
      navigate('/');
    } catch (error) {
      
      setMessage(error.message || 'An error occurred.');
    }
  };

  return (
    
 
    
      <div className='container' style={{ alignItems: 'center', marginLeft: "700px", marginTop: "250px" }}>
        <div className="card text-center" style={{ width: '495px' }}>
          <div className="card-body px-15">
            <p className="card-text py-2">
              <h5 style={{color:'rgba(102, 38, 113, 1)'}}>Did you forget your password?</h5>
              <p>Enter your email address and we'll send you a link to restore password</p>
            </p>
            <div data-mdb-input-init className="form-outline">
              <input type="email" id="typeEmail" className="form-control my-3" onChange={(e) => setEmail(e.target.value)} />
              <label className="form-label" htmlFor="typeEmail"></label>
            </div>
            <button onClick={handleSubmit} className="btn btn-primary w-100">Request reset link</button>
            <div className="d-flex justify-content-between mt-4">
              <a style={{marginLeft:'180px',color:'#9C9C9C'}} href="/">Back to log in</a>
            </div>
          </div>
        </div>
      </div>
    );
  }    
export default ForgotPassword;
