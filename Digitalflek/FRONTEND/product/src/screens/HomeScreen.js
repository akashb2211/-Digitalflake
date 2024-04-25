import React from 'react'
import Sidebar from '../components/Sidebar'
import Navbar1 from '../components/Navbar1'
import logo_c from './logo_c.jpg'

const HomeScreen = () => {
  return (
    <div >
       <Navbar1/>
       <Sidebar/>
       <div className='row' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '110vw', height: '18vh',marginTop:'200px',marginLeft:"110px" }}>
                <img src={logo_c} alt="Logo" style={{ width: '301px', height: '158px', top: '101px', left: '258px' }} />
                <h5 style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100vw', height: '1vh' }}>Welcome to Digitalflake Admin</h5>
            </div>
    </div>
  )
}

export default HomeScreen
