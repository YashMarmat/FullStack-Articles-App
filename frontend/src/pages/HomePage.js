import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { listArticles } from "../actions/articleActions";
import Article from '../components/Article';
import { USER_ACCOUNT_REQUEST } from '../constants';


function HomePage({ history }) {

    const dispatch = useDispatch()

    // article list reducer
    const articleListReducers = useSelector(state => state.articleListReducers)
    const { error, loading, articles } = articleListReducers

    // delete reducer
    const articleDeleteReducer = useSelector(state => state.articleDeleteReducer)
    const {success} = articleDeleteReducer

    useEffect(() => {
        dispatch(listArticles()) // action
        dispatch({ type: USER_ACCOUNT_REQUEST })        
    }, [dispatch, success])

    return (
        <div>
            {loading ? "Loading..." :
                error ? error :
                    <div>
                        {articles.length === 0 ? "No Articles yet!" :
                            <>
                                {articles.map(article => (
                                    <div key={article.id}>
                                        <Article article={article} />
                                    </div>
                                ))}
                            </>
                        }
                    </div>
            }
        </div>

    )
}

export default HomePage