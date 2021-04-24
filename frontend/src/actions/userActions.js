import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT,

    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,

    USER_ACCOUNT_REQUEST,
    USER_ACCOUNT_SUCCESS,
    USER_ACCOUNT_FAIL,

    UPDATE_USER_ACCOUNT_REQUEST,
    UPDATE_USER_ACCOUNT_SUCCESS,
    UPDATE_USER_ACCOUNT_FAIL,
    UPDATE_USER_ACCOUNT_RESET,

} from '../constants/index'

import axios from 'axios'

// Login
export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST
        })

        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }

        const { data } = await axios.post(
            '/api/users/login/',
            { 'username': email, 'password': password },
            config
        )

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data)) // will create a new key-value pair in localStorage
        // also see store.js file

    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.detail ? error.response.data.detail : error.message
        })
    }
}

// Logout
export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo')
    dispatch({
        type: USER_LOGOUT
    })
    dispatch({
        type: UPDATE_USER_ACCOUNT_RESET
    })
}

// register
export const register = (name, email, password) => async (dispatch) => {
    try {
        dispatch({ type: USER_REGISTER_REQUEST })

        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }

        const { data } = await axios.post(`/api/users/register/`,
            { 'name': name, 'email': email, 'password': password },
            config
        )

        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data
        })

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))
    }
    catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.response && error.response.data.detail ? error.response.data.detail : error.message
        })
    }
}

// user account
export const getUserAccount = (user) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_ACCOUNT_REQUEST
        })

        const {
            userLoginReducer: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        // api call
        const { data } = await axios.get(`/api/users/${user}`, config)

        dispatch({
            type: USER_ACCOUNT_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: USER_ACCOUNT_FAIL,
            payload: error.response && error.response.data.detail ? error.response.data.detail : error.message
        })
    }
}

// update user account details
export const userAccountUpdate = (user) => async (dispatch, getState) => {

    try {
        dispatch({
            type: UPDATE_USER_ACCOUNT_REQUEST
        })

        const {
            userLoginReducer: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(`/api/users/account/update/`, user, config)

        dispatch({
            type: UPDATE_USER_ACCOUNT_SUCCESS,
            payload: data
        })

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        // updated token (a new one basically)
        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {
        dispatch({
            type: UPDATE_USER_ACCOUNT_FAIL,
            error: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        })
    }
}