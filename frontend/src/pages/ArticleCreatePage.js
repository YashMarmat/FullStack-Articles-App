import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { articleCreate } from '../actions/articleActions'


function ArticleCreatePage({ history }) {
  const dispatch = useDispatch()

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(articleCreate(title, description))
    alert("Article Created!")
    history.push("/articles")
  }

  // reducer
  const userLoginReducer = useSelector(state => state.userLoginReducer)
  const {userInfo} = userLoginReducer

  useEffect(() => {
    if (!userInfo) {
      history.push("/login")
    }
  }, [history, userInfo])

  return (
    <div>
      <form onSubmit={onSubmit}>
        <h2>New Article</h2>
        <label className="col-sm-12 col-form-label">
          <b>Title</b>
          <input
            className="form-control form-control-sm"
            autoFocus={true}
            type="text"
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
            onChange={(e) => setDescription(e.target.value)}
            rows="16"
            cols="41"
            required
          />
        </label>
        <br />
        <button title="save post" className="btn btn-success ml-3">
          save
            </button>
      </form>
    </div>
  );

}
export default ArticleCreatePage
