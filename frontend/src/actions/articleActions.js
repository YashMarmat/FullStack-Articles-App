import axios from 'axios'
import {
    ARTICLES_LIST_REQUEST,
    ARTICLES_LIST_SUCCESS,
    ARTICLES_LIST_FAIL,

    ARTICLE_DETAILS_REQUEST,
    ARTICLE_DETAILS_SUCCESS,
    ARTICLE_DETAILS_FAIL,

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

// to get all articles
export const listArticles = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: ARTICLES_LIST_REQUEST
        })

        // api call
        const { data } = await axios.get("/api/articles/") // setted up proxy in package.json

        dispatch({
            type: ARTICLES_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ARTICLES_LIST_FAIL,
            payload: error.response && error.response.data.detail ? error.response.data.detail : error.message
        })
    }
}

// to get article details
export const articleDetails = (id) => async (dispatch) => {
    try {
        dispatch({
            type: ARTICLE_DETAILS_REQUEST
        })

        // api call
        const { data } = await axios.get(`/api/articles/${id}`)

        dispatch({
            type: ARTICLE_DETAILS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ARTICLE_DETAILS_FAIL,
            payload: error.response && error.response.data.detail ? error.response.data.detail : error.message
        })
    }
}

// create article
export const articleCreate = (title, description) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ARTICLES_CREATE_REQUEST
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

        const { data } = await axios.post(
            `/api/article-create/`,
            { 'title': title, 'description': description },
            config
        )

        dispatch({
            type: ARTICLES_CREATE_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: ARTICLES_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        })
    }
}


// article delete
export const articleDelete = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ARTICLE_DELETE_REQUEST
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

        const { data } = await axios.delete(
            `/api/articles/${id}/article-delete/`,
            config
        )

        dispatch({
            type: ARTICLE_DELETE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ARTICLE_DELETE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

// article edit
export const articleEdit = (articleData) => async (dispatch, getState) => {
    const id = articleData.articleID
    const title = articleData.updatedTitle
    const description = articleData.updatedDescription
    const article = {title, description}

    console.log(typeof(id))
    
    try {
        dispatch({
            type: ARTICLE_EDIT_REQUEST
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

        const { data } = await axios.put(`/api/articles/${id}/article-edit/`, article, config)

        dispatch({
            type: ARTICLE_EDIT_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ARTICLE_EDIT_FAIL,
            error: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        })
    }
}