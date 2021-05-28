import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Spinner } from 'react-bootstrap'
import { listArticles } from "../actions/articleActions";
import Article from '../components/Article';
import { USER_ACCOUNT_REQUEST, ARTICLE_DETAILS_RESET } from '../constants';
import Message from '../components/Message';


function HomePage({ history }) {

    const dispatch = useDispatch()

    // article list reducer
    const articleListReducers = useSelector(state => state.articleListReducers)
    const { error, loading, articles } = articleListReducers

    // delete reducer
    const articleDeleteReducer = useSelector(state => state.articleDeleteReducer)
    const { success } = articleDeleteReducer

    useEffect(() => {
        dispatch(listArticles()) // action
        dispatch({ type: USER_ACCOUNT_REQUEST })
        dispatch({ type: ARTICLE_DETAILS_RESET })
    }, [dispatch, success])

    return (
        <div>
            {loading ? <span style = {{ display: "flex" }}><h5>Getting Articles</h5><span className = "ml-2"><Spinner animation="border" /></span></span> :
                error ? <Message variant='danger'>{error}</Message> :
                    <span>
                        {articles.length === 0 ? "No Articles yet!" :
                            <span>
                                {articles.map(article => (
                                    <span key={article.id}>
                                        <Article article={article} />
                                    </span>
                                ))}
                            </span>
                        }
                    </span>
            }
        </div>

    )
}

export default HomePage