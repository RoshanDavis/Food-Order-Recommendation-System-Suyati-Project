from django.db import models

# Create your models here.


class User(models.Model):
    email = models.EmailField()
    password = models.CharField(max_length=100)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    
    class Meta:
        db_table= 'users'
   