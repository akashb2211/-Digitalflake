import axios from 'axios'

import { PRODUCT_ADD_FAIL, PRODUCT_ADD_REQUEST, PRODUCT_ADD_SUCCESS ,PRODUCT_ADD_RESET} from '../constants/productConstant';
import { PRODUCT_FETCH_FAIL,PRODUCT_FETCH_RESET,PRODUCT_FETCH_SUCCESS,PRODUCT_FETCH_REQUEST } from '../constants/productConstant';
import { PRODUCT_UPDATE_RESET,PRODUCT_UPDATE_SUCCESS,PRODUCT_UPDATE_REQUEST,PRODUCT_UPDATE_FAIL } from '../constants/productConstant';
import { PRODUCT_DELETE_FAIL,PRODUCT_DELETE_SUCCESS,PRODUCT_DELETE_RESET,PRODUCT_DELETE_REQUEST } from '../constants/productConstant';


export const addProduct = (name, pack_size, category_id, mrp, image, status) => {
  return (dispatch) => {
    dispatch({
      type: PRODUCT_ADD_REQUEST,
    });

    const header = {
      headers: {
        'Content-Type': 'application/json',
        token: sessionStorage.getItem('token'), 
      },
    };
    
    const body = {
        name,pack_size,category_id,mrp,image,status
    };
    const token = sessionStorage.getItem('token');
    const url = `http://localhost:4001/product/addproduct/?token=${token}`;
    
    axios
      .post(url, body, header)
      .then((response) => {
        dispatch({
          type: PRODUCT_ADD_SUCCESS,
          payload: response.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: PRODUCT_ADD_FAIL,
          payload: error,
        });
      });
  };
};



export const getproduct = () => {
    return (dispatch) => {
      dispatch({
        type: PRODUCT_FETCH_REQUEST,
      });
  
      const header = {
        headers: {
          'Content-Type': 'application/json',
          token: sessionStorage.getItem('token'), 
        },
      };
      
      
      const token = sessionStorage.getItem('token');
      const url = `http://localhost:4001/product/?token=${token}`; 
      
      axios
        .get(url,header)
        .then((response) => {
          dispatch({
            type: PRODUCT_FETCH_SUCCESS,
            payload: response.data,
            
          });
        })
        .catch((error) => {
          dispatch({
            type: PRODUCT_FETCH_FAIL,
            payload: error,
          });
        });
    };
  };



  

export const updateProduct = (product_id, { name, pack_size, category_id, mrp, image, status }) => {
    return (dispatch) => {
      dispatch({
        type: PRODUCT_UPDATE_REQUEST,
      });
  
      const header = {
        headers: {
          'Content-Type': 'application/json',
          token: sessionStorage.getItem('token'),
        },
      };
  
      const body = {
        name, pack_size, category_id, mrp, image, status
      };
  
      const token = sessionStorage.getItem('token');
      const url = `http://localhost:4001/product/updateproduct/${product_id}/?token=${token}`;
  
      axios
        .put(url, body, header)
        .then((response) => {
          dispatch({
            type: PRODUCT_UPDATE_SUCCESS,
            payload: response.data,
          });
        })
        .catch((error) => {
          dispatch({
            type: PRODUCT_UPDATE_FAIL,
            payload: error,
          });
        });
    };
  };
  



 

  export const deleteProduct = (product_id) => {
    return (dispatch) => {
      dispatch({
        type: PRODUCT_DELETE_REQUEST,
      });
  
      const token = sessionStorage.getItem('token');
     
      axios
        .put(`http://localhost:4001/product/changestatus/${product_id}/?token=${token}`)
        .then((response) => {
          dispatch({
            type: PRODUCT_DELETE_SUCCESS,
            payload: product_id,
          });
        })
        .catch((error) => {
          dispatch({
            type: PRODUCT_DELETE_FAIL,
            payload: error,
          });
        });
    };
  };
  