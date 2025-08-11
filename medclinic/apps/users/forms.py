from django import forms
from django.contrib.auth.forms import UserCreationForm, SetPasswordForm
from django.contrib.auth import authenticate
from .models import CustomUser
import re




class CustomUserCreationForm(UserCreationForm):
    first_name = forms.CharField(max_length=100, required=True, label='Имя')
    last_name = forms.CharField(max_length=100, required=True, label='Фамилия')
    patronymic = forms.CharField(max_length=100, required=False, label='Отчество')
    phone_number = forms.CharField(max_length=15, required=True, label='Номер телефона')
    email = forms.EmailField(required=True, label='Электронная почта')
    gender = forms.ChoiceField(choices=[('male', 'Мужской'), ('female', 'Женский')], required=True, label='Пол')
    birth_date = forms.DateField(widget=forms.DateInput(attrs={'type': 'date'}), required=True, label='Дата рождения')
    password1 = forms.CharField(widget=forms.PasswordInput(attrs={'autocomplete': 'new-password'}), label='Пароль')
    password2 = forms.CharField(widget=forms.PasswordInput(attrs={'autocomplete': 'new-password'}), label='Подтверждение пароля')

    class Meta:
        model = CustomUser
        fields = ('first_name', 'last_name', 'patronymic', 'phone_number', 'email', 'gender', 'birth_date', 'password1', 'password2')
        
    def clean_phone_number(self):
            phone = self.cleaned_data['phone_number']
            if not re.match(r'^\+?\d{10,15}$', phone):
                raise forms.ValidationError('Неверный формат номера телефона')
            if CustomUser.objects.filter(phone_number=phone).exists():
                raise forms.ValidationError('Этот номер телефона уже используется')
            return phone

    def clean_email(self):
        email = self.cleaned_data['email']
        if CustomUser.objects.filter(email=email).exists():
            raise forms.ValidationError('Эта электронная почта уже используется')
        return email

    def clean(self):
        cleaned_data = super().clean()
        password1 = cleaned_data.get('password1')
        password2 = cleaned_data.get('password2')
        if password1 and password2 and password1 != password2:
            raise forms.ValidationError('Пароли не совпадают')
        return cleaned_data

class LoginForm(forms.Form):
    login = forms.CharField(max_length=100, required=True, label='Email или номер телефона')
    password = forms.CharField(widget=forms.PasswordInput, required=True, label='Пароль')

    def clean(self):
        cleaned_data = super().clean()
        login = cleaned_data.get('login')
        password = cleaned_data.get('password')

        if login and password:
            # Check if login is email or phone
            if '@' in login:
                try:
                    user = CustomUser.objects.get(email=login)
                except CustomUser.DoesNotExist:
                    raise forms.ValidationError('Неверный email или пароль')
            else:
                if not re.match(r'^\+?\d{10,15}$', login):
                    raise forms.ValidationError('Неверный формат номера телефона')
                try:
                    user = CustomUser.objects.get(phone_number=login)
                except CustomUser.DoesNotExist:
                    raise forms.ValidationError('Неверный номер телефона или пароль')

            # Authenticate user
            user = authenticate(username=user.username, password=password)
            if not user:
                raise forms.ValidationError('Неверный пароль')
            if not user.is_active:
                raise forms.ValidationError('Учетная запись не активна')
            cleaned_data['user'] = user
        return cleaned_data
    
    
class PasswordResetRequestForm(forms.Form):
    login = forms.CharField(max_length=100, required=True, label='Email или номер телефона')

    def clean_login(self):
        login = self.cleaned_data['login']
        if '@' in login:
            if not CustomUser.objects.filter(email=login).exists():
                raise forms.ValidationError('Пользователь с этим email не найден')
        else:
            if not re.match(r'^\+?\d{10,15}$', login):
                raise forms.ValidationError('Неверный формат номера телефона')
            if not CustomUser.objects.filter(phone_number=login).exists():
                raise forms.ValidationError('Пользователь с этим номером телефона не найден')
        return login

class PasswordResetConfirmForm(SetPasswordForm):
    new_password1 = forms.CharField(widget=forms.PasswordInput, label='Новый пароль')
    new_password2 = forms.CharField(widget=forms.PasswordInput, label='Подтверждение пароля')
    
class PhoneUpdateForm(forms.ModelForm):
    class Meta:
        model = CustomUser
        fields = ['phone_number']

    def clean_phone_number(self):
        phone = self.cleaned_data['phone_number']
        if not re.match(r'^\+?\d{10,15}$', phone):
            raise forms.ValidationError('Неверный формат: только цифры, длина 10-15.')
        if CustomUser.objects.filter(phone_number=phone).exclude(pk=self.instance.pk).exists():
            raise forms.ValidationError('Этот номер телефона уже используется.')
        return phone