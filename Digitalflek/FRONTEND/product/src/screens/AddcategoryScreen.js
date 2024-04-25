import React, { useEffect, useState } from 'react';
import Navbar1 from '../components/Navbar1';
import Sidebar from '../components/Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { addCategory } from '../actions/categoryAction';
import { useNavigate } from 'react-router-dom';

const AddcategoryScreen = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('Active');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const addCategoryStore = useSelector((store) => store.addCategory);

  const { loading, error, response } = addCategoryStore;

  useEffect(() => {
    if (response && response.status.data === 'success') {
      navigate('/home');
    } else if (response && response.status === 'error') {
      alert('Error');
    }
  }, [response, navigate]);

  const onAdd = () => {
    dispatch(addCategory(name, description, status));
    alert('add sucessfully')
    navigate('/category');
  };

  const onCancel = () => {
    navigate('/mainscreen');
  };

  return (
    <div>
      <Navbar1 />
      <Sidebar />
      <div style={{ marginLeft: '480px', width: '1300px', height: '962px', top: '132px', left: '1694px', gap: '0px', borderRadius: '10px 0px 0px 0px', opacity: '0px' }}>
        <div style={{ marginLeft: '50px', marginTop: '20px', width: '963px', height: '200px', borderRadius: '10px', padding: '20px' }}>
          <h3>Add Category</h3>
          <div style={{ display: 'flex' }}>
            <div style={{ marginRight: '20px' }}>
              <label>Category Name:</label>
              <input onChange={(e) => setName(e.target.value)} type="text" style={{ width: '200px', height: '30px' }} />
            </div>
            <div style={{ marginRight: '30px', marginBottom: '10px' }}>
              <label>Description:</label>
              <textarea onChange={(e) => setDescription(e.target.value)} style={{ width: '200px', height: '30px' }} ></textarea>
            </div>
            <div>
              <label>Status:</label>
              <select onChange={(e) => setStatus(e.target.value)} style={{ width: '200px', height: '30px' }} >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div className='container' style={{ marginTop: '20px', alignItems: 'center', alignContent: 'end', marginLeft: '800px', borderRadius: '10px', padding: '20px' }}>
            <button style={{ marginLeft: '20px', marginRight: '20px', borderRadius: '10px', width: '100px' }} className="button-btn-secondary" onClick={onCancel}>Cancel</button>
            <button style={{ backgroundColor: 'blue', width: '100px', marginRight: '20px', marginLeft: '20px', borderRadius: '10px' }} className="button-btn-primary" onClick={onAdd}>Save</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddcategoryScreen;
