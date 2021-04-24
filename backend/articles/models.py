from django.db import models
from django.contrib.auth.models import User

class Article(models.Model):
    user = models.ForeignKey(User, on_delete = models.CASCADE, blank = True, null = True) 
    title = models.CharField(max_length=200, blank = True, null = True)
    description = models.TextField(blank = True, null = True)     

    def __str__(self):
        return self.title