import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { articleDetails, articleDelete } from '../actions/articleActions'
import { ARTICLES_LIST_REQUEST } from '../constants'


function ArticleDetailsPage({ history, match }) {
    const dispatch = useDispatch()

    // reducer
    const articleDetailsReducer = useSelector(state => state.articleDetailsReducer)
    const { loading, error, article } = articleDetailsReducer

    // reducer
    const userLoginReducer = useSelector(state => state.userLoginReducer)
    const { userInfo } = userLoginReducer


    useEffect(() => {
        dispatch(articleDetails(match.params.id))
    }, [dispatch, match])

    // Authorization Check (for deleting article)
    const articleDeleteHandler = (articleId, userId) => {
        if (!userInfo || userInfo.id !== userId.id) {
            alert("Not Authorized")
        }
        else {
            dispatch(articleDelete(articleId))
            history.push("/articles")
            dispatch({
                type: ARTICLES_LIST_REQUEST
            })
        }
    }

    // Authorization Check (for editing article)
    const articleEditHandler = (articleId, userId) => {
        if (!userInfo || userInfo.id !== userId.id) {
            alert("Not Authorized")
        }
        else {
            history.push(`/articles/${articleId}/article-edit/`)
        }
    }

    return (
        <div>
            {loading ? "Loading..." :
                error ? error :
                    <div>
                        <p><strong>{article.title}</strong>
                            {article.user
                                ?
                                <span style={{ color: "grey" }}>{" "}<em>
                                    - by {article.user.username ? article.user.username : ""}
                                </em></span>
                                : ""}
                        </p>
                        <p>{article.description}</p>
                        {/* Delete Button */}
                        <span onClick={() => articleDeleteHandler(article.id, article.user)}><i className="fas fa-trash-alt fa-2x"></i></span>
                    
                        {/* Edit Button */}
                        <span onClick={() => articleEditHandler(article.id, article.user)}><i className = "fas fa-edit ml-2 fa-2x"></i></span>
                    </div>
            }
        </div>
    )
}

export default ArticleDetailsPage
