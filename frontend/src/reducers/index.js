import {combineReducers} from 'redux'
import {
    articleListReducers, 
    articleDetailsReducer, 
    articleCreateReducer, 
    articleDeleteReducer, 
    articleEditReducer, 
    editImageReducer

} from './articleReducers'

import {
    userLoginReducer, 
    userRegisterReducer, 
    getAccountReducer, 
    updateAccountReducer, 
    userDeleteReducer,
    allUsersDetailReducer,
    changeAdminStatusReducer,
    deleteUserByAdminReducer

} from './userReducers'

const allReducers = combineReducers({
    articleListReducers,
    articleDetailsReducer,
    editImageReducer,
    userLoginReducer,
    userRegisterReducer,
    articleCreateReducer,
    articleDeleteReducer,
    articleEditReducer,
    getAccountReducer,
    updateAccountReducer,
    userDeleteReducer,
    allUsersDetailReducer,
    changeAdminStatusReducer,
    deleteUserByAdminReducer    
})

export default allReducers