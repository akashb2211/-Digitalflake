
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Navbar1 from '../components/Navbar1';
import Sidebar from '../components/Sidebar';
import { addProduct, updateProduct } from '../actions/productAction';
import { getCategory } from '../actions/categoryAction';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


function UpdateproductScreen() {
  const [name, setName] = useState('');
  const [pack_size, setPackSize] = useState('');
  const [category_id, setCategory_id] = useState('');
  const [mrp, setMRP] = useState('');
  const [image, setImage] = useState(null);
  const [status, setStatus] = useState('Active');
  const [selectedCategory, setSelectedCategory] = useState('');
  const dispatch = useDispatch();
  const { product_id } = useParams();
  const navigate = useNavigate();
  const category = useSelector((state) => state.category);
  const { loading, error, response: categoryList } = category;

  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);

  const onAdd = () => {
    dispatch(addProduct(name, pack_size, selectedCategory, mrp, image, status));
    // Reset form fields or navigate to another page after adding the product
  };
  
  const onUpdate = () => {
    
    alert(product_id)
  dispatch(updateProduct(product_id, { name, pack_size, category_id, mrp, image, status }));
  alert('add successfully');
  navigate('/product');
};

  const onCancel = () => {
    navigate('/mainscreen');
  };

  return (
    <div>
      <Navbar1 />
      <Sidebar />
      <div style={{ marginLeft: '480px', width: '1300px', height: '962px', top: '132px', left: '1694px', gap: '0px', borderRadius: '10px 0px 0px 0px', opacity: '0px' }}>
        <div style={{ marginLeft: '50px', marginTop: '20px', width: '963px', height: '200px', borderRadius: '10px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h3>Add Product</h3>
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            <div style={{ flex: '1' }}>
              <label>Category:</label>
              <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} style={{ width: '200px', height: '30px' }}>
                <option value="">Select Category</option>
                {categoryList && categoryList.data && categoryList.data.map((category) => (
                  <option key={category.category_id} value={category.category_id}>{category.name}</option>
                ))}
              </select>
            </div>
            <div style={{ flex: '1' }}>
              <label>Product Name:</label>
              <input value={name} onChange={(e) => setName(e.target.value)} type="text" style={{ width: '200px', height: '30px' }} />
            </div>
            <div style={{ flex: '1' }}>
              <label>Pack Size:</label>
              <input value={pack_size} onChange={(e) => setPackSize(e.target.value)} type="text" style={{ width: '200px', height: '30px' }} />
            </div>
            <div style={{ flex: '1' }}>
              <label>MRP:</label>
              <input value={mrp} onChange={(e) => setMRP(e.target.value)} type="text" style={{ width: '200px', height: '30px' }} />
            </div>
            <div style={{ flex: '2' }}>
              <label>Product Image:</label>
              <input onChange={(e) => setImage(e.target.value)} type="text" accept="image/*" />

            </div>
            <div style={{ flex: '2' }}>
              <label>Status:</label>
              <select value={status} onChange={(e) => setStatus(e.target.value)} style={{ width: '200px', height: '30px' }} >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
          <div style={{ marginTop: '20px', alignItems: 'center', display: 'flex', justifyContent: 'center' }}>
            <button style={{ marginRight: '10px' }} className="button-btn-secondary" onClick={onCancel}>Cancel</button>
            <button className="button-btn-primary" onClick={onUpdate}>Update</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateproductScreen;
