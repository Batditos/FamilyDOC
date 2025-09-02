from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    username = None  # убираем username
    email = models.EmailField(unique=True) 
    patronymic = models.CharField(max_length=100, blank=True)
    phone_number = models.CharField(max_length=15, unique=True)
    gender = models.CharField(max_length=10, choices=[('male', 'Мужской'), ('female', 'Женский')])
    birth_date = models.DateField(null=True, blank=True)
    
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []