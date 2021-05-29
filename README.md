# FullStack Articles App
 An Articles Website, geared with React, Redux, Django and JWT 
 
<p id ="top" align="center">
  <img src="https://github.com/YashMarmat/Pages-App-django/blob/master/templates/welcome_page_article_app.png?raw=true" width="90%">
</p>

Checkout the site in action here https://nostalgic-northcutt-95f958.netlify.app/

# Table of contents
- [About_this_App](#About_this_App)
- [App_Overview](#App_Overview)
  * [Articles_Page](#Articles_Page)
  * [Article_Detail_Page](#Article_Detail_Page)
  * [Article_Edit_Page](#Article_Edit_Page)
  * [Article_Create_Page](#Article_Create_Page)
  * [User_Account_Page](#User_Account_Page)
  * [Update_User_Account_Page](#Update_User_Account_Page)
  * [Delete_User_Account_Page](#Delete_User_Account_Page)
  * [All_Users_Info_Page](#All_Users_Info_Page)
  * [Login_Page](#Login_Page)
  * [Register_Page](#Register_Page)
- [Installation](#Installation)
  * [Backend](#backend)
  * [Frontend](#frontend)

## About_this_App
An Articles app where people can create articles or blogs related to anytopic, the user can
read other users articles as well. Users can also update or delete articles (only those articles
which are created by them). If a user want they can also delete their account anytime (NOTE: with the
deletion of the account all their articles will be deleted as well).

## App_Overview
### Articles_Page
This page displays all the articles created by users on the website so far.
<p align="center">
  <img src="https://github.com/YashMarmat/Pages-App-django/blob/master/templates/all_articles_page.png?raw=true" width="90%">
</p>

### Article_Detail_Page
This page displays the details of the article like title description and the author.
The user can also delete the article from here (only if the currently logged in user found to be equal with the article author)
<p align="center">
  <img src="https://github.com/YashMarmat/Pages-App-django/blob/master/templates/articles_detail_page.png?raw=true" width="90%">
</p>

### Article_Edit_Page
This page handles the editing of the article, the user can edit their article image, title or description.
NOTE: The article edit page will only edit/update that article which is created by the currently logged in user, for this it compares the author of the article with the currently logged in user, if they are found to be equal then the user can edit the article, else not.
<p align="center">
  <img src="https://github.com/YashMarmat/Pages-App-django/blob/master/templates/articles_edit_page.png?raw=true" width="90%">
</p>

### Article_Create_Page
Here, the users can create their articles (if they are logged in and have an account on this webiste)
<p align="center">
  <img src="https://github.com/YashMarmat/Pages-App-django/blob/master/templates/article_create_page.png?raw=true" width="90%">
</p>

### User_Account_Page
Here, the users can see their details like their Name, Email and Admin Priviledges.
Note: In picture below the All Users Info link is only visible for admin users. 
<p align="center">
  <img src="https://github.com/YashMarmat/Pages-App-django/blob/master/templates/my_account_page_articles_app.png?raw=true" width="90%">
</p>

### Update_User_Account_Page
Here, the users can update their account details like username, email and can also reset their password.
<p align="center">
  <img src="https://github.com/YashMarmat/Pages-App-django/blob/master/templates/update_user_account_details_page_article_app.png?raw=true" width="90%">
</p>

### Delete_User_Account_Page
Here, the users can Delete their account (requires password confirmation)
<p align="center">
  <img src="https://github.com/YashMarmat/Pages-App-django/blob/master/templates/delete_account_page_articles_app.png?raw=true" width="90%">
</p>

### All_Users_Info_Page
Here, only admins can update a user admin priviledges, the admin can promote a user to admin or can demote them to user and can
even delete any user present in the list (Note: Currently logged in admin cannot delete their own account and can neither demote themselves to a user)
<p align="center">
  <img src="https://github.com/YashMarmat/Pages-App-django/blob/master/templates/all_users_info_page.png?raw=true" width="90%">
</p>

### Login_Page
Requires an Account on the Website
<p align="center">
  <img src="https://github.com/YashMarmat/Pages-App-django/blob/master/templates/sign_in_page_articles_app.png?raw=true" width="90%">
</p>

### Register_Page
<p align="center">
  <img src="https://github.com/YashMarmat/Pages-App-django/blob/master/templates/register_page_articles_app.png?raw=true" width="90%">
</p>

## Installation
after downloading/cloning the repository code follow below steps:

### Backend
* (METHOD 1, using pipenv) (both linux and windows)
1) Move in backend folder through terminal and run following commands,

`pipenv install`

`pipenv shell`

`python manage.py runserver`

* (METHOD 2, using python venv) (linux and windows)
1) Move in backend folder through terminal and run following commands,

`python3 -m venv env` (for windows --> `python -m venv env`) 

`source env/bin/activate` (for windows --> `env\scripts\activate`)

`pip install -r requirements.txt` (same for both)

`python manage.py runserver` (same for both)

### Frontend
2) Move in frontend folder through terminal and run follwing commands

`npm i`

`npm start`

## All set ! Happy coding :)

<p><a href="#top">Back to Top</a></p>

