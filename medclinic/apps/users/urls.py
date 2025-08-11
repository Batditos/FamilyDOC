
from django.urls import path
from .views import password_reset_confirm, register, user_login, password_reset_request

app_name = 'users'

urlpatterns = [
    path('register/', register, name='register'),
    path('login/', user_login, name='login'),
   path('password/reset/', password_reset_request, name='password_reset_request'),
    path('password/reset/confirm/<uidb64>/<token>/', password_reset_confirm, name='password_reset_confirm'),
]