import React, { useEffect, useState } from 'react'

import { Link, useNavigate } from 'react-router-dom'

import { signin } from '../actions/userAction'
import { useDispatch, useSelector } from 'react-redux'
import logo_c from "./logo_c.jpg";


const Signinscreen = (props) => {
    const [email_id, setEmail_Id] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();
    const userSignin = useSelector((store) => store.userSignin)
    const { loading, error, response } = userSignin
    const dispatch = useDispatch()
    const onSignin = () => {
        dispatch(signin(email_id, password))
    }
    useEffect(() => {
        if (email_id.length === 0) {
            // alert('Please enter email');
        } else if (password.length === 0) {
            // alert('Please enter password');
        } else {
            if (response && response.data.status === 'success') {
                const data = response['data']
                sessionStorage['token'] = data['token']
                sessionStorage['email'] = data['email_id']
                navigate('/home');
            } else if (response && response.data.status === 'error') {
                // alert(response.error);
                alert('cheack paswword And username');
            } else if (error) {
                alert(error);
            }
        }
    }, [loading, error, response]);

  


    return (

        <div>
       
            <div className='row' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100vw', height: '18vh',marginTop:'180px' }}>
                <img src={logo_c} alt="Logo" style={{ width: '301px', height: '158px', top: '161px', left: '258px' }} />
                <h5 style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100vw', height: '1vh' }}>Welcome to Digitalflake Admin</h5>
            </div>
           
            <div className='row'>
                <div className='col'></div>
                <div className='col'>
                    <div className='mb-3'>
                        <label htmlFor=''>Email</label>
                        <input
                            onChange={(e) => setEmail_Id(e.target.value)}
                            type='text'
                            className='form-control'
                        />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor=''>Password</label>
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            type='password'
                            className='form-control'
                        />
                    </div>
                    <div className='mb-3'>
                        <div className='mb-3' style={{left:'100px'}} >
                           <Link to='/forgotpass'>Forgot Password?.</Link>
                        </div>
                        <button onClick={onSignin} className='btn btn-primary btn-lg btn-block'style={{ width: '600px' }} >
                            Login
                        </button>
                    </div>
                </div>
                <div className='col'></div>
            </div>
            
        </div>
    )
}

export default Signinscreen
