import React from 'react'
import { Link } from 'react-router-dom'

function WelcomePage() {
    return (
        <div
            style={{
                backgroundImage: `url("https://github.com/YashMarmat/Pages-App-django/blob/master/templates/final_welcome_page_articles_app%20(1).jpg?raw=true")`,
                backgroundRepeat: "no-repeat",
                width: '100%',
                height: "550px",
            }}
        >
            <div className="home-css ml-2">
                <h5>Welcome to Articles App</h5>
            </div>
            <span className="ml-2 home-page-title">create articles on any topic</span>
            <div style={{ display: "flex", marginTop: "20px" }}>
                <Link to="/new-article">
                    <button className="ml-2 btn btn-success">
                        <span>Create Now</span>
                    </button>
                    <span className="sr-only">(current)</span>
                </Link>
                <Link to="/articles">
                    <button className="ml-2 btn btn-primary">
                        <span>See all Articles</span>
                    </button>
                    <span className="sr-only">(current)</span>
                </Link>
            </div>
        </div>

    )
}

export default WelcomePage
