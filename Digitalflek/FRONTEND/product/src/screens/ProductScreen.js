import React, { useState, useEffect } from 'react';
import Navbar1 from '../components/Navbar1';
import Sidebar from '../components/Sidebar';
import editIcon from '../components/edit.png';
import deleteIcon from '../components/delete.png';
import categoryIcon from '../components/product.png';
import arrow from '../components/arrow.png';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct, getproduct } from '../actions/productAction';

const ProductScreen = () => {
  const dispatch = useDispatch();
  const product = useSelector(store => store.product);
  const [searchProduct, setSearchProduct] = useState('');
  const navigate = useNavigate();
  const { error, response, loading } = product;

  useEffect(() => {
    dispatch(getproduct());
  }, [dispatch]);

  
  const filteredProducts = response && response.data && response.data.filter(product => {
    return product.product_name.toLowerCase().includes(searchProduct.toLowerCase());
  });

  const handleDeleteProduct = (product_id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      dispatch(deleteProduct(product_id));
      alert('Status set to inactive successfully');
      window.location.reload();
    }
  };

  const handleEditProduct = (product_id) => {
    navigate(`/updateproduct/${product_id}`);
    window.location.reload();
  };

  const handleNewProduct = () => {
    navigate('/addproduct');

  };

  return (
    <div>
      <Navbar1 />
      <Sidebar />
      <div style={{ marginLeft: '480px', width: '1300px', height: '962px', top: '132px', left: '1694px', gap: '0px', borderRadius: '10px 0px 0px 0px', opacity: '0px' }}>
        <div style={{ marginLeft: '50px', width: '963px', height: '40px', top: '152px', left: '759px', gap: '0px', borderRadius: '10px 0px 0px 0px', display: 'flex', alignItems: 'center' }}>
          <img src={categoryIcon} alt="Category" style={{ marginRight: '15px', width: '20px', height: '20px' }} />
          <span style={{ marginRight: '300px'}}><h5>Products</h5></span>
          <input
            type="text"
            value={searchProduct}
            placeholder='Search product....'
            onChange={(e) => setSearchProduct(e.target.value)}
            style={{ marginLeft: '10px' }}
          />
          <button className='button-btn-primary' style={{ marginLeft: '140px', width: '963px', borderRadius: '10px 10px 10px 10px', height: '40px', color: 'rgba(255, 255, 255, 1)', background: 'rgba(102, 38, 113, 1)', }} onClick={handleNewProduct}>ADD New</button>
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
                    <img src={arrow} alt="Name" style={{ marginRight: '5px' }} />
                    Name
                  </div>
                </th>
                <th style={{ backgroundColor: 'rgba(255, 248, 183, 1)' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img src={arrow} alt="Pack size" style={{ marginRight: '5px' }} />
                    Pack size
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
                    <img src={arrow} alt="MRP" style={{ marginRight: '5px' }} />
                    MRP
                  </div>
                </th>
                <th style={{ backgroundColor: 'rgba(255, 248, 183, 1)' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img src={arrow} alt="Image" style={{ marginRight: '5px' }} />
                    Image
                  </div>
                </th>
                <th style={{ backgroundColor: 'rgba(255, 248, 183, 1)' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img src={arrow} alt="Status" style={{ marginRight: '5px' }} />
                    Status
                  </div>
                </th>
                <th style={{ backgroundColor: 'rgba(255, 248, 183, 1)' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img src={arrow} alt="Edit" style={{ marginRight: '5px' }} />
                    Edit
                  </div>
                </th>
                <th style={{ backgroundColor: 'rgba(255, 248, 183, 1)' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img src={arrow} alt="Delete" style={{ marginRight: '5px' }} />
                    Delete
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts && filteredProducts.length > 0 &&
                filteredProducts.map(product => (
                  <tr key={product.product_id}>
                    <td>{product.product_id}</td>
                    <td>{product.product_name}</td>
                    <td>{product.pack_size}</td>
                    <td>{product.name}</td>
                    <td>{product.mrp}</td>
                    <td>
                      {product.image ? (
                        <img src={product.image} style={{ height: '50px', width: '50px' }} />
                      ) : (
                        "Image not available"
                      )}
                    </td>
                    <td style={{ color: product.status === 'Active' ? 'green' : 'red' }}>{product.status}</td>
                    <td>
                      <button onClick={() => handleEditProduct(product.product_id)}>
                        <img src={editIcon} alt="Edit" />
                      </button>
                    </td>
                    <td>
                      {product.status === 'Active' ? (
                        <button onClick={() => handleDeleteProduct(product.product_id)}>
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

export default ProductScreen;
