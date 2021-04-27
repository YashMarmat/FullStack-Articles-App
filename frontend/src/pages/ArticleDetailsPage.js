import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Modal, Spinner } from 'react-bootstrap'
import { articleDetails, articleDelete } from '../actions/articleActions'
import { ARTICLES_LIST_REQUEST } from '../constants'
import Message from '../components/Message';


function ArticleDetailsPage({ history, match }) {
    const dispatch = useDispatch()

    // modal state and functions
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // reducer
    const articleDetailsReducer = useSelector(state => state.articleDetailsReducer)
    const { error, loading, article } = articleDetailsReducer

    // reducer
    const userLoginReducer = useSelector(state => state.userLoginReducer)
    const { userInfo } = userLoginReducer


    useEffect(() => {
        dispatch(articleDetails(match.params.id))
    }, [dispatch, match])

    // Authorization Check (for deleting article)
    const articleDeleteHandler = (userId) => {
        if (!userInfo || userInfo.id !== userId.id) {
            alert("Not Authorized")
        }
        else {
            handleShow()
        }
    }

    const confirmDelete = (id) => {
        dispatch(articleDelete(id))
        history.push("/articles")
        dispatch({
            type: ARTICLES_LIST_REQUEST
        })
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
            {loading ? <Spinner animation="border" /> :
                error ? <Message variant='danger'>{error}</Message> :
                    <div>
                        {/* Modal Start*/}
                        <div>
                            <>
                                <Modal show={show} onHide={handleClose}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Delete Confirmation</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>Are you sure you want to delete the article "{article.title}"?</Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="danger" onClick={() => confirmDelete(article.id)}>
                                            Confirm Delete
                                        </Button>
                                        <Button variant="primary" onClick={handleClose}>
                                            Cancel
                                        </Button>
                                    </Modal.Footer>
                                </Modal>
                            </>
                        </div>

                        {/* Modal End */}

                        <div class="d-flex justify-content-center">
                            <p><strong className = "text-capitalize">{article.title}</strong>
                                {article.user
                                    ?
                                    <span style={{ color: "grey" }}>{" "}<em>
                                        - by {article.user.username ? article.user.username : ""}
                                    </em></span>
                                    : ""}
                            </p>
                        </div>
                        {/* Delete Button */}
                        <div className="mb-2 buttons-width-css">
                            <span
                                onClick={() => articleDeleteHandler(article.user)}>
                                <i
                                    title="delete article"
                                    className="fas fa-trash-alt fa-2x delete-button-css mx-2"
                                ></i>
                            </span>

                            {/* Edit Button */}
                            <span
                                onClick={() => articleEditHandler(article.id, article.user)}>
                                <i
                                    title="edit article"
                                    className="fas fa-edit fa-2x edit-button-css"
                                ></i>
                            </span>
                        </div>
                        {/* Description */}
                        <p className="shadow p-3 bg-white rounded justify-description-css">{article.description}</p>
                    </div>
            }

        </div>
    )
}

export default ArticleDetailsPage
