import React from 'react'
import {Link} from 'react-router-dom'

function WelcomePage() {
    return (
        <div>
            <h3>Welcome to Articles App</h3>
            <Link to = "/articles">Go to Articles</Link>
        </div>
    )
}

export default WelcomePage
