from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from .models import Article

from django.contrib.auth.models import User 
from .serializers import ArticleSerializer, UserSerializer, UserSerializerWithToken
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer 
from rest_framework_simplejwt.views import TokenObtainPairView # for login page
from django.contrib.auth.hashers import make_password
from rest_framework import status

from django.contrib.auth.hashers import check_password

# get all articles
@api_view(['GET'])
def getArticles(request):
    articles = Article.objects.all()
    serializer = ArticleSerializer(articles, many=True) # many = True (means we are serializing multiple objects)
    return Response(serializer.data)

# get article details
@api_view(['GET'])
def getArticleDetails(request, pk):
    try:
        article = Article.objects.get(id=pk)
        serializer = ArticleSerializer(article, many=False)
        return Response(serializer.data)
    except:
        message = {'detail': 'Article Not Found'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)

# create article
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createArticle(request):
    user = request.user
    data = request.data

    print(data)

    article = Article.objects.create(
        user=user,
        title=data["title"],
        description=data["description"],
    )

    serializer = ArticleSerializer(article, many=False)
    return Response(serializer.data)

# Method 2 (create article) 
# @api_view(['POST'])
# def createArticle(request):
# 	serializer = ArticleSerializer(data=request.data)

# 	if serializer.is_valid():
# 		serializer.save()

# 	return Response(serializer.data)
    
# article delete
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteArticle(request, pk):
    user = request.user
    article = Article.objects.get(id=pk)
    if article.user == user:
        article.delete()
        return Response('Article Deleted')
    else:
        return Response("Forbidden")


# article edit
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def editArticle(request, pk):
    user = request.user
    data = request.data
    article = Article.objects.get(id=pk)

    print(data)

    # note: this is how we can get previous data
    #serializer = ArticleSerializer(article, many=False)
    #previous_article = serializer.data['title']
    #previous_description = serializer.data['description']
    #print(previous_article, previous_description)

    if article.user == user:
        article.title = data['title']
        article.description = data['description']
        article.save()

        serializer = ArticleSerializer(article, many=False)
        return Response(serializer.data)    
    else:
        return Response("Forbidden")
        
# user
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    
    def validate(self, attrs):
        data = super().validate(attrs)

        serializer = UserSerializerWithToken(self.user).data

        for k, v in serializer.items():
            data[k] = v
        
        return data

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


# get all the users
@api_view(['GET'])
@permission_classes([IsAdminUser]) # requires token (only admin token)
def getUsers(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)


# get user details (will display the info of that user whose token is provided)
@api_view(['GET'])
@permission_classes([IsAuthenticated]) 
def getUserAccount(request):
    user = request.user
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)

# update user details
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateUserAccount(request):
    user = request.user
    serializer = UserSerializerWithToken(user, many=False)
    data = request.data

    print(data)

    user.username = data['email']
    user.email = data['email']

    if data['password'] != "":
        user.password = make_password(data['password'])
    
    user.save()
    return Response(serializer.data)    

# user registration/sign up
@api_view(['POST'])
def registerUser(request):
    data = request.data
    try:
        user = User.objects.create(
            username = data['email'],
            email = data['email'],
            password = make_password(data['password'])
        )

        serializer = UserSerializerWithToken(user, many=False)
        return Response(serializer.data)

    except:
        message = {'detail': 'User with this email already exists'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteUserAccount(request, pk):
    my_string=pk
    myid = my_string.split(",",1)[0]
    mypass = my_string.split(",",1)[1]
    print(myid, mypass)

    user = request.user
    data = request.data
    print(data)

    deleteUser = User.objects.get(id=myid)
    deleteUserPass = deleteUser.password

    passwordCheck = check_password(mypass, deleteUserPass)

    try:
        if user == deleteUser and passwordCheck == True:
            deleteUser.delete()
            return Response("User Deleted")
    except:
        message = 'Invalid Password'
        return Response(message, status=status.HTTP_400_BAD_REQUEST)   
