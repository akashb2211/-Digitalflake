import axios from 'axios'

import { CATEGORY_ADD_FAIL, CATEGORY_ADD_REQUEST, CATEGORY_ADD_SUCCESS ,CATEGORY_ADD_RESET} from '../constants/catrgoryConstant';
import { CATEGORY_FETCH_FAIL,CATEGORY_FETCH_RESET,CATEGORY_FETCH_SUCCESS,CATEGORY_FETCH_REQUEST } from '../constants/catrgoryConstant';
import { CATEGORY_UPDATE_RESET,CATEGORY_UPDATE_SUCCESS,CATEGORY_UPDATE_REQUEST,CATEGORY_UPDATE_FAIL } from '../constants/catrgoryConstant';
import { CATEGORY_DELETE_FAIL,CATEGORY_DELETE_SUCCESS,CATEGORY_DELETE_RESET,CATEGORY_DELETE_REQUEST } from '../constants/catrgoryConstant';


export const addCategory = (name, description, status) => {
  return (dispatch) => {
    dispatch({
      type: CATEGORY_ADD_REQUEST,
    });

    const header = {
      headers: {
        'Content-Type': 'application/json',
        
        token: sessionStorage.getItem('token'), 
       
      },
    };
    
    const body = {
      name,
      description,
      status,
    };

    const token = sessionStorage.getItem('token');
    const url = `http://localhost:4001/category/addcategory/?token=${token}`;
    
    axios
      .post(url, body, header)
      .then((response) => {
        dispatch({
          type: CATEGORY_ADD_SUCCESS,
          payload: response.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: CATEGORY_ADD_FAIL,
          payload: error,
        });
      });
  };
};





export const getCategory = () => {
  return (dispatch) => {
    dispatch({
      type: CATEGORY_FETCH_REQUEST,
    });

    const token = sessionStorage.getItem('token'); // Retrieve token from sessionStorage

    const url = `http://localhost:4001/category/?token=${token}`; // Include token in the URL
    
    axios
      .get(url)
      .then((response) => {
        dispatch({
          type: CATEGORY_FETCH_SUCCESS,
          payload: response.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: CATEGORY_FETCH_FAIL,
          payload: error,
        });
      });
  };
};




  

export const updateCategory = (category_id, { name, description, status }) => {
    return (dispatch) => {
      dispatch({
        type: CATEGORY_UPDATE_REQUEST,
      });
  
      const header = {
        headers: {
          'Content-Type': 'application/json',
          token: sessionStorage.getItem('token'),
        },
      };
  
      const body = {
        name,
        description,
        status
      };
  
      const token = sessionStorage.getItem('token');
      const url = `http://localhost:4001/category/${category_id}/?token=${token}`;
  
      axios
        .put(url, body, header)
        .then((response) => {
          dispatch({
            type: CATEGORY_UPDATE_SUCCESS,
            payload: response.data,
          });
        })
        .catch((error) => {
          dispatch({
            type: CATEGORY_UPDATE_FAIL,
            payload: error,
          });
        });
    };
  };
  


  export const deleteCategory = (category_id) => {
    return (dispatch) => {
      dispatch({
        type: CATEGORY_DELETE_REQUEST,
      });

      const header = {
        headers: {
          'Content-Type': 'application/json',
          token: sessionStorage.getItem('token'),
        },
      };
  
      const token = sessionStorage.getItem('token');
      // Make an API call to update the status of the category to "inactive"
      axios
        .put(`http://localhost:4001/category/changestatus/${category_id}/?token=${token}`)
        .then((response) => {
          dispatch({
            type: CATEGORY_DELETE_SUCCESS,
            payload: category_id,
          });
        })
        .catch((error) => {
          dispatch({
            type: CATEGORY_DELETE_FAIL,
            payload: error,
          });
        });
    };
  };
  