from django.shortcuts import get_object_or_404, render, redirect
from .models import Order, OrderItem
from cart.models import Cart
from cart.views import _get_cart
from django.contrib.auth.decorators import login_required


def order_create(request):
    cart = _get_cart(request)  # получаем корзину пользователя/гостя

    # Проверка, есть ли товары в корзине
    if not cart.items.exists():
        return redirect("cart:cart_detail")

    if request.method == "POST":
        if request.user.is_authenticated:
            order = Order.objects.create(user=request.user)
        else:
            name = request.POST.get("name")
            phone = request.POST.get("phone")
            email = request.POST.get("email")  # если хочешь email гостей
            order = Order.objects.create(
                guest_name=name,
                guest_phone=phone,
                guest_email=email
            )

        # Копируем элементы корзины
        for item in cart.items.all():
            OrderItem.create_from_cart_item(order, item)

        cart.items.all().delete()  # очищаем корзину
        return redirect("orders:order_success", order_id=order.id)

    return render(request, "orders/order_form.html", {"cart": cart})


def order_success(request, order_id):
    order = get_object_or_404(Order, pk=order_id)
    return render(request, "orders/order_success.html", {"order": order})


@login_required
def order_detail(request, order_id):
    """
    Подробная информация о заказе пользователя.
    """
    order = get_object_or_404(Order, pk=order_id, user=request.user)
    return render(request, "orders/order_detail.html", {"order": order})
