from django.shortcuts import render, redirect
from django.contrib.auth import login
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_str
from django.urls import reverse
from .forms import CustomUserCreationForm, LoginForm, PasswordResetRequestForm, PasswordResetConfirmForm
from .models import CustomUser

def register(request):
    if request.method == 'POST':
        form = CustomUserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            return redirect('login/')
    else:
        form = CustomUserCreationForm()
    return render(request, 'users/register.html', {'form': form})


def user_login(request):
    if request.method == 'POST':
        form = LoginForm(request.POST)
        if form.is_valid():
            user = form.cleaned_data['user']
            login(request, user)
            return redirect('core/home.html')
    else:
        form = LoginForm()
    return render(request, 'users/login.html', {'form': form})

def password_reset_request(request):
    if request.method == 'POST':
        form = PasswordResetRequestForm(request.POST)
        if form.is_valid():
            login = form.cleaned_data['login']
            user = CustomUser.objects.get(email=login) if '@' in login else CustomUser.objects.get(phone_number=login)
            token = default_token_generator.make_token(user)
            uid = urlsafe_base64_encode(force_bytes(user.pk))
            reset_url = request.build_absolute_uri(
                reverse('users:password_reset_confirm', kwargs={'uidb64': uid, 'token': token})
            )
            # In a real app, send reset_url via email/SMS
            return render(request, 'users/reset_sent.html', {'reset_url': reset_url})
    else:
        form = PasswordResetRequestForm()
    return render(request, 'users/password_reset_request.html', {'form': form})

def password_reset_confirm(request, uidb64, token):
    try:
        uid = force_str(urlsafe_base64_decode(uidb64))
        user = CustomUser.objects.get(pk=uid)
    except (TypeError, ValueError, OverflowError, CustomUser.DoesNotExist):
        user = None

    if user and default_token_generator.check_token(user, token):
        if request.method == 'POST':
            form = PasswordResetConfirmForm(user, request.POST)
            if form.is_valid():
                form.save()
                login(request, user)  # Log in user after reset
                return redirect('login')
        else:
            form = PasswordResetConfirmForm(user)
        return render(request, 'users/password_reset_confirm.html', {'form': form})
    return render(request, 'users/invalid_token.html')