from django.urls import path
from . import views

urlpatterns = [
    # articles
    path('articles/', views.getArticles, name = "articles"),
    path('articles/<str:pk>/', views.getArticleDetails, name = "article-details"),
    path('articles/<str:pk>/upload/', views.editArticlePicture, name = "picture-edit"),
    path('article-create/', views.createArticle, name = 'article-create'),
    path('articles/<str:pk>/article-delete/', views.deleteArticle, name = 'article-delete'),
    path('articles/<str:pk>/article-edit/', views.editArticle, name = 'article-edit'),

    # users
    path('users/login/', views.MyTokenObtainPairView.as_view(), name = "token_obtain_pair"),
    path('users/', views.getUsers, name = "users"), 
    path('<str:pk>/admin-update/', views.makeUserAdmin, name = "admin-update"), 
    path('<str:pk>/delete-user/', views.deleteUserByAdmin, name = "delete-user"), 
    path('users/account/', views.getUserAccount, name = "account"),
    path('users/account/update/', views.updateUserAccount, name = "account-update"),
    path('users/register/', views.registerUser, name = "register"),
    path('users/account/delete/<str:pk>/', views.deleteUserAccount, name = "account-delete"),
]