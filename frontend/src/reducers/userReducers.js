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
    USER_ACCOUNT_RESET,

    UPDATE_USER_ACCOUNT_REQUEST,
    UPDATE_USER_ACCOUNT_SUCCESS,
    UPDATE_USER_ACCOUNT_FAIL,
    UPDATE_USER_ACCOUNT_RESET,

    
    USER_ACCOUNT_DELETE_REQUEST,
    USER_ACCOUNT_DELETE_SUCCESS,
    USER_ACCOUNT_DELETE_FAIL,

} from '../constants/index'

// Login
export const userLoginReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return {
                ...state,
                loading: true
            }
        case USER_LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                userInfo: action.payload
            }
        case USER_LOGIN_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case USER_LOGOUT:
            return {}

        default:
            return state
    }
}

// Register
export const userRegisterReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_REGISTER_REQUEST:
            return {
                ...state,
                loading: true
            }
        case USER_REGISTER_SUCCESS:
            return {
                ...state,
                loading: false,
                userInfo: action.payload
            }
        case USER_REGISTER_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case USER_LOGOUT:
            return {}

        default:
            return state
    }
}

// user account
export const getAccountReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case USER_ACCOUNT_REQUEST:
            return {
                loading: true,
                user: {}
            }
        case USER_ACCOUNT_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.payload
            }
        case USER_ACCOUNT_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case USER_ACCOUNT_RESET:
            return {}
        default:
            return state
    }
}

// update user account details
export const updateAccountReducer = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_USER_ACCOUNT_REQUEST:
            return {
                loading: true
            }
        case UPDATE_USER_ACCOUNT_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                userInfo: action.payload
            }
        case UPDATE_USER_ACCOUNT_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case UPDATE_USER_ACCOUNT_RESET:
            return {}

        default:
            return state
    }
}

// delete user account
export const userDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_ACCOUNT_DELETE_REQUEST:
            return {
                loading: true,
            }
        case USER_ACCOUNT_DELETE_SUCCESS:
            return {
                loading: false,
                success: true,
                user: action.payload               
            }
        case USER_ACCOUNT_DELETE_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}
