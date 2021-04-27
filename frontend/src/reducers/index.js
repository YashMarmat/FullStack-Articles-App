import {combineReducers} from 'redux'
import {articleListReducers, articleDetailsReducer, articleCreateReducer, articleDeleteReducer, articleEditReducer} from './articleReducers'
import {userLoginReducer, userRegisterReducer, getAccountReducer, updateAccountReducer, userDeleteReducer} from './userReducers'

const allReducers = combineReducers({
    articleListReducers,
    articleDetailsReducer,
    userLoginReducer,
    userRegisterReducer,
    articleCreateReducer,
    articleDeleteReducer,
    articleEditReducer,
    getAccountReducer,
    updateAccountReducer,
    userDeleteReducer,    
})

export default allReducers