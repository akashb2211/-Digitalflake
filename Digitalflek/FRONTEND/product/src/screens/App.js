import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signinscreen from './Signinscreen';
import HomeScreen from './HomeScreen';
import ProductScreen from './ProductScreen';
import CategoryScreen from './CategoryScreen';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import ForgotpasswordScreen from './ForgotpasswordScreen';
import Navbar1 from '../components/Navbar1';
import Signout from './Signout';
import { useSelector } from 'react-redux';
import Mainscreen from './Mainscreen';
import AddcategoryScreen from './AddcategoryScreen';
import AddproductScreen from './AddproductScreen';
import UpdatecategoryScreen from './UpdatecategoryScreen';
import UpdateproductScreen from './UpdateproductScreen';
function App() {


  // const userSignin = useSelector(state => state.userSignin);
  // const isAuthenticated = userSignin.response && userSignin.response.data.status === 'success';



  return (
    <div>
      
       {/* {isAuthenticated && <Navbar1 />} */}
      {/* Sidebar and Navbar can be rendered here */}
      {/* <Signinscreen/> */}
         {/* <Sidebar/>  */}
     
      <BrowserRouter>
        <Routes>
          
          <Route path="/" element={<Signinscreen />} />
          <Route path="/home" element={<HomeScreen />} />
          <Route path="/product" element={<ProductScreen />} />
          <Route path="/category" element={<CategoryScreen />} />
          <Route path="/forgotpass" element={<ForgotpasswordScreen />} />
          <Route path="/signout" element={<Signout/>} />
          <Route path="/mainscreen" element={<Mainscreen/>} />
          <Route path="/addcategory" element={<AddcategoryScreen/>} />
          <Route path="/addproduct" element={<AddproductScreen/>} />
          <Route path="/updatecategory/:category_id" element={<UpdatecategoryScreen/>} />
          <Route path="/updateproduct/:product_id" element={<UpdateproductScreen/>} />

        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
