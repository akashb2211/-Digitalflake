import { PRODUCT_UPDATE_REQUEST,PRODUCT_UPDATE_SUCCESS,PRODUCT_UPDATE_FAIL,PRODUCT_UPDATE_RESET } from '../../constants/productConstant'
import{PRODUCT_ADD_REQUEST,PRODUCT_ADD_SUCCESS,PRODUCT_ADD_FAIL,PRODUCT_ADD_RESET}from '../../constants/productConstant'
import { PRODUCT_FETCH_FAIL,PRODUCT_FETCH_RESET,PRODUCT_FETCH_SUCCESS,PRODUCT_FETCH_REQUEST } from '../../constants/productConstant'
import { PRODUCT_DELETE_FAIL,PRODUCT_DELETE_REQUEST,PRODUCT_DELETE_SUCCESS,PRODUCT_DELETE_RESET } from '../../constants/productConstant'



export const addProductReducer = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_ADD_REQUEST:
            return { login: true }
        case PRODUCT_ADD_SUCCESS:
            return { loading: false, response: action.payload }
        case PRODUCT_ADD_FAIL:
            return { loading: false, error: action.payload }
        case PRODUCT_ADD_RESET:
            return{}
        default:
            return state
    }
}


export const fetchProductReducer = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_FETCH_REQUEST:
            return { login: true }
        case PRODUCT_FETCH_SUCCESS:
            return { loading: false, response: action.payload }
        case PRODUCT_FETCH_FAIL:
            return { loading: false, error: action.payload }
        case PRODUCT_FETCH_RESET:
            return{}
        default:
            return state
    }
}


export const updateProductReducer = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_UPDATE_REQUEST:
            return { login: true }
        case PRODUCT_UPDATE_SUCCESS:
            return { loading: false, response: action.payload }
        case PRODUCT_UPDATE_FAIL:
            return { loading: false, error: action.payload }
        case PRODUCT_UPDATE_RESET:
            return{}
        default:
            return state
    }
}

export const deleteProductReducer = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_DELETE_REQUEST:
            return { login: true }
        case PRODUCT_DELETE_SUCCESS:
            return { loading: false, response: action.payload }
        case PRODUCT_DELETE_FAIL:
            return { loading: false, error: action.payload }
        case PRODUCT_DELETE_RESET:
            return{}
        default:
            return state
    }
}