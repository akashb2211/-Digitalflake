import { USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNOUT, USER_SIGNIN_SUCCESS } from "../constants/userConstants"

import axios from 'axios';


export const logout=()=>{
    return(dispatch)=>{
        sessionStorage.removeItem('token')
        dispatch({type:USER_SIGNOUT})
        document.location.href='/'
    }
}
export const signin = (email_id, password) => {
    return (dispatch) => {
        dispatch({
            type: USER_SIGNIN_REQUEST
        })
        const header = {
            headers: {
                'Content-Type': 'application/json',
            },
        }

        const body = {
            email_id,
            password,
        }
        const url = 'http://localhost:4001/admin/signin'
        axios
            .post(url, body, header)
            .then((response) => {
                dispatch({
                    type: USER_SIGNIN_SUCCESS,
                    payload: response.data,
                })
            })
            .catch((error) => {
                dispatch({
                    type: USER_SIGNIN_FAIL,
                    payload: error,
                })
            })
    }
}