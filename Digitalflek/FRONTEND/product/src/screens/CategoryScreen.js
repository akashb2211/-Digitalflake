
import React, { useEffect, useState } from 'react';
import Navbar1 from '../components/Navbar1';
import Sidebar from '../components/Sidebar';
import editIcon from '../components/edit.png';
import deleteIcon from '../components/delete.png';
import categoryIcon from '../components/product.png';
import arrow from '../components/arrow.png';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCategory, deleteCategory } from '../actions/categoryAction';

const CategoryScreen = () => {
  const dispatch = useDispatch();
  const { error, response, loading } = useSelector(store => store.category);
  const [searchCategory, setSearchCategory] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);

     useEffect(() => {
    
   }, [error,response,loading,]);


  const handleDeleteCategory = (category_id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      dispatch(deleteCategory(category_id));
      alert('Status set to inactive successfully');
      window.location.reload();
    }
  };

  const handleEditCategory = (category_id) => {
    navigate(`/updatecategory/${category_id}`);
  };

  const handleNewCategory = () => {
    navigate('/addcategory');
  };

  let filteredCategories = [];
  if (response && response.data && Array.isArray(response.data)) {
    filteredCategories = response.data.filter(category => {
      return category.name.toLowerCase().includes(searchCategory.toLowerCase());
    });
  }

  return (
    <div>
      <Navbar1 />
      <Sidebar />
      <div style={{ marginLeft: '480px', width: '1350px', height: '962px', top: '132px', left: '1694px', gap: '0px', borderRadius: '10px 0px 0px 0px', opacity: '0px' }}>
        <div style={{ marginLeft: '40px', width: '963px', height: '40px', top: '152px', left: '759px', gap: '0px', borderRadius: '10px 0px 0px 0px', display: 'flex', alignItems: 'center' }}>
          <img src={categoryIcon} alt="Category" style={{ marginRight: '15px', width: '20px', height: '20px' }} />
          <span style={{ marginRight: '300px' }}><h5>Category</h5></span>
          <input
            type="text"
            value={searchCategory}
            placeholder='Search category....'
            onChange={(e) => setSearchCategory(e.target.value)}
            style={{ marginLeft: '10px',marginRight:'30px',width:'560px',height:'35px',marginBottom:'20px' }}
          />
          <button className='button-btn-primary' style={{ marginBottom:'15px',marginLeft: '146px',marginRight:'2px', width: '963px', borderRadius: '10px 10px 10px 10px', height: '40px', color: 'rgba(255, 255, 255, 1)', background: 'rgba(102, 38, 113, 1)', }} onClick={handleNewCategory}>ADD New</button>
        </div>
        <div>
          <table className="table">
            <thead>
              <tr>
                <th style={{ backgroundColor: 'rgba(255, 248, 183, 1)' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img src={arrow} alt="ID" style={{ marginRight: '5px' }} />
                    ID
                  </div>
                </th>
                <th style={{ backgroundColor: 'rgba(255, 248, 183, 1)' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img src={arrow} alt="Category" style={{ marginRight: '5px' }} />
                    Category
                  </div>
                </th>
                <th style={{ backgroundColor: 'rgba(255, 248, 183, 1)' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img src={arrow} alt="Description" style={{ marginRight: '5px' }} />
                    Description
                  </div>
                </th>
                <th style={{ backgroundColor: 'rgba(255, 248, 183, 1)' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img src={arrow} alt="Status" style={{ marginRight: '5px' }} />
                    Status
                  </div>
                </th>
                <th style={{ backgroundColor: 'rgba(255, 248, 183, 1)' }}></th>
                <th style={{ backgroundColor: 'rgba(255, 248, 183, 1)' }}></th>
              </tr>
            </thead>
            <tbody>
              {filteredCategories.map(category => (
                <tr key={category.category_id}>
                  <td>{category.category_id}</td>
                  <td>{category.name}</td>
                  <td>{category.description}</td>
                  <td style={{ color: category.status === 'Active' ? 'green' : 'red' }}>{category.status}</td>
                  <td>
                    <button onClick={() => handleEditCategory(category.category_id)}>
                      <img src={editIcon} alt="Edit" />
                    </button>
                  </td>
                  <td>
                    {category.status === 'Active' ? (
                      <button onClick={() => handleDeleteCategory(category.category_id)}>
                        <img src={deleteIcon} alt="Delete" />
                      </button>
                    ) : (
                      <button className="blurred-icon" disabled>
                        <img src={deleteIcon} alt="Delete" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default CategoryScreen;
