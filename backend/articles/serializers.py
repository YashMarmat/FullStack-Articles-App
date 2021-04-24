from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User
from .models import Article

# to display articles
class ArticleSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField(read_only = True)

    class Meta:
        model = Article
        fields = "__all__"

    def get_user(self, obj):
        user = obj.user
        serializer = UserSerializer(user, many=False)
        return serializer.data

# to display user info
class UserSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(read_only=True)
    isAdmin = serializers.SerializerMethodField(read_only = True)

    class Meta:
        model = User
        fields = ['id', 'name', 'username', 'email', 'isAdmin']

    def get_isAdmin(self, obj):
        return obj.is_staff 

    def get_name(self, obj):
        name = obj.username
        if name == "":
            name = obj.email
        return name
        

# token auth with user
class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only = True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'isAdmin', 'token']

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)