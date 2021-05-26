import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { articleDetails, articleEdit, editArticleImage } from '../actions/articleActions'
import { ARTICLE_DETAILS_REQUEST } from '../constants'
import { Link } from 'react-router-dom'


function ArticleEditPage({ match, history }) {
    const dispatch = useDispatch()
    const [newPic, setNewPic] = useState(false)
    const [cover, setCover] = useState(null)
    const [title, setTitle] = useState("")
    const [showConfirmMessage, setShowConfirmMessage] = useState(false)
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

    const editImageHandler = (id) => {
        let form_data = new FormData()
        form_data.append('cover', cover, cover.name)
        dispatch(editArticleImage(id, form_data))
        alert("New Image Uploaded!")
        setNewPic(false)
        setShowConfirmMessage(true)
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                
                <span
                    className="d-flex justify-content-center"
                    style={{ display: "flex", marginBottom: "15px", color: "#008080" }}>
                    <em>Edit Article</em>
                </span>

                {showConfirmMessage
                    ?
                    <span>
                        New Image Stored
                    <i style={{ color: "blue" }}
                            className="ml-1 fas fa-check-circle fa-lg">
                        </i>
                    </span>
                    :
                    <img src={article.cover} alt={article.title} height="200" />}
                <br />
                {newPic ?
                    <div>
                        <p>
                            <input type="file"
                                className="my-2"
                                id="edit-cover"
                                onChange={(e) => setCover(e.target.files[0])}
                            />
                        </p>
                        {cover !== null ?
                            <div>
                                <span onClick={() => editImageHandler(article.id)} className="btn btn-success btn-sm my-2">
                                    confirm change picture
                        </span>
                                <span className="btn btn-primary btn-sm ml-2" onClick={() => setNewPic(false)}>
                                    cancel
                        </span>
                            </div>
                            : <span className="btn btn-primary btn-sm" onClick={() => setNewPic(false)}>
                                cancel
                    </span>
                        }
                    </div>
                    : <span className="btn btn-success btn-sm my-2" onClick={() => setNewPic(true)}>Change thumbnail picture</span>}

                <br />
                <label className="col-form-label">
                    <b>Title</b>
                </label>
                <input
                    className="form-control form-control-sm"
                    autoFocus={true}
                    type="text"
                    defaultValue={article.title}
                    placeholder="title"
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <br />
                <label className="col-form-label">
                    <b>Description</b>
                </label>
                <textarea
                    className="form-control form-control-sm"
                    placeholder="description"
                    defaultValue={article.description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows="15"
                    cols="41"
                    required
                />
                <br />
                <button className="btn btn-success mb-2">
                    save
                </button>
                <Link to={`/articles/${article.id}/`}>
                    <button className="btn btn-primary ml-2 mb-2" type="button">
                        Cancel
                    </button>
                </Link>
            </form>
        </div>
    )
}

export default ArticleEditPage
