from django.db import models

from services.models import Service
from django.conf import settings

class Cart(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, 
        null=True,
        blank=True,
        on_delete=models.CASCADE
    )
    session_key = models.CharField(max_length=40, null=True, blank=True)

    def __str__(self):
        if self.user:
            return f"Корзина {self.user.username}"
        return f"Гостевая корзина {self.session_key}"

class CartItem(models.Model):
    cart = models.ForeignKey(Cart, related_name="items", on_delete=models.CASCADE)
    service = models.ForeignKey(Service, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)

    def total_price(self):
        return self.service.price * self.quantity
