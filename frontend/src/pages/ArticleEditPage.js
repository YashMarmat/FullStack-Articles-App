import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { articleDetails, articleEdit } from '../actions/articleActions'
import { ARTICLE_DETAILS_REQUEST } from '../constants'
import {Link} from 'react-router-dom'


function ArticleEditPage({ match, history }) {
    const dispatch = useDispatch()

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")

    // reducer
    const articleDetailsReducer = useSelector(state => state.articleDetailsReducer)
    const { article } = articleDetailsReducer

    // reducer
    const userLoginReducer = useSelector(state => state.userLoginReducer)
    const { userInfo } = userLoginReducer

    useEffect(() => {
        if (!userInfo) {
            history.push("/login")
        }
        dispatch(articleDetails(match.params.id))
    }, [dispatch, match, history, userInfo])

    const onSubmit = (e) => {
        e.preventDefault()
        const articleID = article.id
        const updatedTitle = title === "" ? article.title : title
        const updatedDescription = description === "" ? article.description : description
        const articleData = { articleID, updatedTitle, updatedDescription }
        dispatch(articleEdit(articleData))
        dispatch({
            type: ARTICLE_DETAILS_REQUEST
        })
        history.push(`/articles/${articleID}/`)
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <h2>Edit Article</h2>
                <label className="col-sm-12 col-form-label">
                    <b>Title</b>
                    <input
                        className="form-control form-control-sm"
                        autoFocus={true}
                        type="text"
                        defaultValue={article.title}
                        placeholder="title"
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </label>
                <br />
                <label className="col-sm-12 col-form-label">
                    <b>Description</b>
                    <textarea
                        className="form-control form-control-sm"
                        placeholder="description"
                        defaultValue={article.description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows="16"
                        cols="41"
                        required
                    />
                </label>
                <br />
                <button className="btn btn-success ml-3">
                    save
                </button>
                <Link to={`/articles/${article.id}/`}>
                    <button className = "btn btn-primary ml-2" type="button">
                        Cancel
                    </button>
                </Link>
            </form>
        </div>
    )
}

export default ArticleEditPage
