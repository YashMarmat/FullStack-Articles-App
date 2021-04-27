import {
    ARTICLES_LIST_REQUEST,
    ARTICLES_LIST_SUCCESS,
    ARTICLES_LIST_FAIL,

    ARTICLE_DETAILS_REQUEST,
    ARTICLE_DETAILS_SUCCESS,
    ARTICLE_DETAILS_FAIL,
    ARTICLE_DETAILS_RESET,

    ARTICLES_CREATE_REQUEST,
    ARTICLES_CREATE_SUCCESS,
    ARTICLES_CREATE_FAIL,

    ARTICLE_DELETE_REQUEST,
    ARTICLE_DELETE_SUCCESS,
    ARTICLE_DELETE_FAIL,

    ARTICLE_EDIT_REQUEST,
    ARTICLE_EDIT_SUCCESS,
    ARTICLE_EDIT_FAIL,

} from '../constants/index'


// articles list
export const articleListReducers = (state = { articles: [] }, action) => {
    switch (action.type) {
        case ARTICLES_LIST_REQUEST:
            return {
                loading: true,
                articles: []
            }
        case ARTICLES_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                articles: action.payload
            }
        case ARTICLES_LIST_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}

// article details
export const articleDetailsReducer = (state = { article: {} }, action) => {
    switch (action.type) {
        case ARTICLE_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
                article: {}
            }
        case ARTICLE_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                article: action.payload
            }
        case ARTICLE_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case ARTICLE_DETAILS_RESET:
            return { 
                article: {} 
            }        
    
        default:
            return state
    }
}

// article create
export const articleCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case ARTICLES_CREATE_REQUEST:
            return {
                loading: true,
            }
        case ARTICLES_CREATE_SUCCESS:
            return {
                loading: false,
                article: action.payload
            }
        case ARTICLES_CREATE_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}

// article delete
export const articleDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case ARTICLE_DELETE_REQUEST:
            return {
                loading: true,
            }
        case ARTICLE_DELETE_SUCCESS:
            return {
                loading: false,
                success: true,
            }
        case ARTICLE_DELETE_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}

// article edit reducer
export const articleEditReducer = (state = {}, action) => {
    switch (action.type) {
        case ARTICLE_EDIT_REQUEST:
            return {
                loading: true,
            }
        case ARTICLE_EDIT_SUCCESS:
            return {
                loading: false,
                article: action.payload
            }
        case ARTICLE_EDIT_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}