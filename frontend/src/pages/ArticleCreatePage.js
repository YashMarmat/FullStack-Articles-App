import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { articleCreate } from '../actions/articleActions'
import { Link } from 'react-router-dom'
import { MDBBadge, MDBContainer } from "mdbreact";


function ArticleCreatePage({ history }) {
  const dispatch = useDispatch()

  const [cover, setCover] = useState(null)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  const onSubmit = (e) => {
    e.preventDefault()
    let form_data = new FormData()
    form_data.append('title', title)
    form_data.append('description', description)
    form_data.append('cover', cover, cover.name)
    dispatch(articleCreate(form_data))
    alert("Article Created!")
    history.push("/articles")
    window.location.reload()
  }

  // reducer
  const userLoginReducer = useSelector(state => state.userLoginReducer)
  const { userInfo } = userLoginReducer

  useEffect(() => {
    if (!userInfo) {
      history.push("/login")
    }
  }, [history, userInfo])

  return (
    <div>
      <form onSubmit={onSubmit}>
        <span
          className="d-flex justify-content-center"
          style={{ display: "flex", marginBottom: "15px", color: "#008080" }}>
          <em>New Article</em>
        </span>

        <label className="col-form-label">
          <b>Thumbnail Image File</b>
        </label>
        <p>
          <input type="file"
            id="covers"
            onChange={(e) => setCover(e.target.files[0])}
            required
          />
        </p>

        <label className="col-form-label">
          <b>Title</b>
        </label>
        <input
          className="form-control form-control-sm"
          autoFocus={true}
          type="text"
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
          onChange={(e) => setDescription(e.target.value)}
          rows="15"
          cols="41"
          required
        />

        <br />
        <button type="submit" className="btn btn-success mb-2">
          Save
        </button>

        <Link to="/articles">
          <button className="btn btn-primary ml-2 mb-2" type="button">
            Cancel
          </button>
        </Link>


      </form>
    </div>
  );

}
export default ArticleCreatePage
