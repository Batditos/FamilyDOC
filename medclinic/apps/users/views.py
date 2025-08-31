from django.shortcuts import get_object_or_404, render, redirect
from django.contrib.auth import login, logout
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_str
from django.urls import reverse
from django.contrib.admin.views.decorators import staff_member_required
from django.db.models import Count
from orders.models import Order, OrderItem
from .forms import CustomUserCreationForm, LoginForm, PasswordResetRequestForm, PasswordResetConfirmForm
from .models import CustomUser
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from .forms import PhoneUpdateForm


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
            return redirect('users:profile')
    else:
        form = LoginForm()
    return render(request, 'users/login.html', {'form': form})


@login_required
def user_logout(request):
    logout(request)
    return redirect("core:home")

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
                return redirect('users:profile')
        else:
            form = PasswordResetConfirmForm(user)
        return render(request, 'users/password_reset_confirm.html', {'form': form})
    return render(request, 'users/invalid_token.html')

@login_required
def profile(request):
    return render(request, 'users/profile.html', {'user': request.user})

@login_required
def update_phone(request):
    if request.method == 'POST':
        form = PhoneUpdateForm(request.POST, instance=request.user)
        if form.is_valid():
            form.save()
            messages.success(request, 'Номер телефона обновлен.')
            return redirect('users:profile')
        else:
            messages.error(request, 'Ошибка обновления номера телефона.')
    else:
        form = PhoneUpdateForm(instance=request.user)
    return render(request, 'users/update_phone.html', {'form': form})

@login_required
def profile(request):
    user = request.user
    # Получаем заказы текущего пользователя
    orders = Order.objects.filter(user=user).order_by('-created_at')
    return render(request, "users/profile.html", {"user": user,"orders": orders,})

@login_required
def order_detail(request, order_id):
    """
    Подробная информация о заказе пользователя.
    """
    order = get_object_or_404(Order, pk=order_id, user=request.user)
    return render(request, "orders/order_detail.html", {"order": order})



@login_required
def admin_profile(request):
    return render(request, 'users/admin_profile.html', {'user': request.user})

@login_required
def admin_profile(request):
    # Все заказы, отсортированные по дате
    orders_all = Order.objects.all().order_by('-created_at')
    
    # Топ популярных товаров
    popular = (
        OrderItem.objects
        .values('name','price')
        .annotate(order_count=Count('order', distinct=True))
        .order_by('-order_count')[:5]  # топ 5
    )

    context = {
        'user': request.user,
        'orders_all': orders_all,
        'popular': popular
    }
    return render(request, 'users/admin_profile.html', context)