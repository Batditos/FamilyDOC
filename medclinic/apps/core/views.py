from django.shortcuts import render
from orders.models import OrderItem
from django.db.models import Count

def home(request):
    # Здесь мы получаем данные о популярных товарах
    popular = (
        OrderItem.objects
        .values('id', 'name', 'price')
        .annotate(order_count=Count('order', distinct=True))
        .order_by('-order_count')[:10]
    )

    # И передаем их в контекст
    context = {
        'popular': popular,
    }
    return render(request, 'core/home.html', context)