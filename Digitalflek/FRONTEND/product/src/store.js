 import { combineReducers,applyMiddleware, createStore } from "redux";

// import thunk from 'redux-thunk';
// import rootReducer from './reducers';
import{addCategoryReducer, fetchCategoryReducer, updateCategoryReducer}from'./screens/reducers/categoryReducers';
import { userSigninReducer } from "./screens/reducers/userReducers";
import logger from 'redux-logger';
import { thunk } from 'redux-thunk';

import{composeWithDevTools} from '@redux-devtools/extension'
import { addProductReducer, fetchProductReducer, updateProductReducer } from "./screens/reducers/productReducers";

// combineReducer
const reducers=combineReducers({
    userSignin: userSigninReducer,
    addCategory:addCategoryReducer,
    category:fetchCategoryReducer,
    updateCategory:updateCategoryReducer,

    addProduct:addProductReducer,
    product:fetchProductReducer,
    updateProduct:updateProductReducer,

})

const store=createStore(
    reducers,
    composeWithDevTools(applyMiddleware(logger,thunk))
)

export default store


