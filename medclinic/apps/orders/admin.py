from django.contrib import admin

from users.models import CustomUser
from .models import Order, OrderItem

# --- Элементы заказа ---
class OrderItemInline(admin.TabularInline):
    model = OrderItem
    readonly_fields = ("name", "price", "quantity")
    can_delete = False
    extra = 0

# --- Заказы ---
@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ("id", "user", "guest_name", "guest_phone", "created_at", "total_price")
    list_filter = ("created_at",)
    search_fields = ("user__username", "guest_name", "guest_phone")
    inlines = [OrderItemInline]

    def total_price(self, obj):
        return obj.total_price()
