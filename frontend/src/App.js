import React from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
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
import DemoPage from './pages/DemoPage'


function App() {
  
  return (
    <Router>
      <NavBar />
      <div className = "container mt-4">
      <Route path = "/" component = {WelcomePage} exact />
      <Route path = "/demoPage" component = {DemoPage} exact />
      <Route path = "/account" component = {AccountPage} exact />
      <Route path = "/account/update/" component = {AccountUpdatePage} exact />
      <Route path = "/articles" component = {HomePage} exact />
      <Route path = "/login" component = {LoginPage} exact />
      <Route path = "/register" component = {RegisterPage} exact />
      <Route path = "/articles/:id" component = {ArticleDetailsPage} exact />
      <Route path = "/new-article/" component = {ArticleCreatePage} exact />
      <Route path = "/articles/:id/article-edit/" component = {ArticleEditPage} exact />
      </div>
    </Router>

  );
}

export default App;
