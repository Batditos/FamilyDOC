from django.db import models

from services.models import Service
from cart.models import Cart, CartItem
from django.conf import settings

class Order(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, 
        null=True,
        blank=True, on_delete=models.SET_NULL)
    guest_name = models.CharField(max_length=200, blank=True)
    guest_phone = models.CharField(max_length=50, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def total_price(self):
        return sum(item.price * item.quantity for item in self.items.all())

    def __str__(self):
        return f"Заказ {self.id}"
    
class OrderItem(models.Model):
    order = models.ForeignKey(Order, related_name="items", on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    quantity = models.PositiveIntegerField()

    @staticmethod
    def create_from_cart_item(order, cart_item: CartItem):
        return OrderItem.objects.create(
            order=order,
            name=cart_item.service.name,
            price=cart_item.service.price,
            quantity=cart_item.quantity,
        )
