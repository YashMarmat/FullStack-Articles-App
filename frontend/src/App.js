import React from 'react'
import { HashRouter as Router, Route } from 'react-router-dom'
import NavBar from './components/Navbar';
import ArticleDetailsPage from './pages/ArticleDetailsPage';
import WelcomePage from './pages/WelcomePage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ArticleCreatePage from './pages/ArticleCreatePage'
import ArticleEditPage from './pages/ArticleEditPage';
import AccountPage from './pages/AccountPage'
import AccountUpdatePage from './pages/AccountUpdatePage'
import DeleteUserAccount from './pages/DeleteUserAccount'
import AllUsersPage from './pages/AllUsersPage';



function App() {

  return (
    <div>
      <Router>
        <NavBar />
        <div className="container mt-4">
          <Route path="/" component={WelcomePage} exact />
          <Route path="/account" component={AccountPage} exact />
          <Route path="/account/update/" component={AccountUpdatePage} exact />
          <Route path="/account/delete/" component={DeleteUserAccount} exact />
          <Route path="/users" component={AllUsersPage} exact />
          <Route path="/articles" component={HomePage} exact />
          <Route path="/login" component={LoginPage} exact />
          <Route path="/register" component={RegisterPage} exact />
          <Route path="/articles/:id" component={ArticleDetailsPage} exact />
          <Route path="/new-article/" component={ArticleCreatePage} exact />
          <Route path="/articles/:id/article-edit/" component={ArticleEditPage} exact />
        </div>
      </Router>
    </div>
  );
}

export default App;
