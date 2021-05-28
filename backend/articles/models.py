from django.db import models
from django.contrib.auth.models import User

class Article(models.Model):
    user = models.ForeignKey(User, on_delete = models.CASCADE, blank = True, null = True)
    #cover = models.ImageField(upload_to='covers/', null = True, blank = True) # new 
    #cover = models.ImageField(upload_to='covers/', default = "/no_preview_image.png", null = True, blank = True) # new 
    image = models.ImageField(null=True, blank=True)
    title = models.CharField(max_length=200, blank = True, null = True)
    description = models.TextField(blank = True, null = True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)    

    def __str__(self):
        return self.title
