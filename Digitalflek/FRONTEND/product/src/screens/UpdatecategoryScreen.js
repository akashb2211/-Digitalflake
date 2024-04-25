import React, { useEffect, useState } from 'react';
import Navbar1 from '../components/Navbar1';
import Sidebar from '../components/Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { updateCategory } from '../actions/categoryAction';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const UpdatecategoryScreen = ( ) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('Active');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const updateCategoryStore = useSelector((store) => store.updateCategory);
  const { category_id } = useParams();

  const { loading, error, response } = updateCategoryStore;

//   useEffect(() => {
//     if (response && response.status.data === 'success') {
//       alert('Category updated successfully');
//       navigate('/category');
//     } else if (error) {
//       alert('Error updating category');
//     }
//   }, [response, error, navigate]);

const onUpdate = () => {
    
    // alert(category_id)
  dispatch(updateCategory(category_id, { name, description, status }));
  alert('Update successfully');
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
          <h3>Edit Category</h3>
          <div style={{ display: 'flex' }}>
            <div style={{ marginRight: '20px' }}>
              <label>Category Name:</label>
              <input value={name} onChange={(e) => setName(e.target.value)} type="text" style={{ width: '200px', height: '30px' }} />
            </div>
            <div style={{ marginRight: '30px', marginBottom: '10px' }}>
              <label>Description:</label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} style={{ width: '200px', height: '30px' }} ></textarea>
            </div>
            <div>
              <label>Status:</label>
              <select value={status} onChange={(e) => setStatus(e.target.value)} style={{ width: '200px', height: '30px' }} >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div className='container' style={{ marginTop: '20px', alignItems: 'center', alignContent: 'end', marginLeft: '800px', borderRadius: '10px', padding: '20px' }}>
            <button style={{ marginLeft: '20px', marginRight: '20px', borderRadius: '10px', width: '100px' }} className="button-btn-secondary" onClick={onCancel}>Cancel</button>
            <button style={{ backgroundColor: 'blue', width: '100px', marginRight: '20px', marginLeft: '20px', borderRadius: '10px' }} className="button-btn-primary" onClick={onUpdate}>Update</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdatecategoryScreen;
