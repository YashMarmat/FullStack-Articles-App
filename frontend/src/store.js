import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import allReducers from './reducers/index'

// userInfoFromStorage ? so that when user refreshes the whole site they do not need to sign in again 
// (will get the info about the user from local storage)
const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

const initialState = {
    userLoginReducer: { userInfo: userInfoFromStorage }
}

const middleware = [thunk]

const store = createStore(allReducers, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store