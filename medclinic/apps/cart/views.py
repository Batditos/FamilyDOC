from django.shortcuts import render, redirect, get_object_or_404
from services.models import Service
from .models import Cart, CartItem

def _get_cart(request):
    """Возвращает корзину для текущего пользователя или гостя"""
    if request.user.is_authenticated:
        cart, created = Cart.objects.get_or_create(user=request.user)
    else:
        session_key = request.session.session_key
        if not session_key:
            request.session.create()
            session_key = request.session.session_key
        cart, created = Cart.objects.get_or_create(session_key=session_key)
    return cart

def cart_detail(request):
    cart = _get_cart(request)
    return render(request, "cart/cart_detail.html", {"cart": cart})

def cart_add(request, service_id):
    cart = _get_cart(request)
    service = get_object_or_404(Service, pk=service_id)
    item, created = CartItem.objects.get_or_create(cart=cart, service=service)
    if not created:
        item.quantity += 1
        item.save()
    return redirect("cart:cart_detail")

def cart_remove(request, item_id):
    item = get_object_or_404(CartItem, pk=item_id)
    if request.method == "POST":  # удаляем только через POST
        item.delete()
    return redirect("cart:cart_detail")
