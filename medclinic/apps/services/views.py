from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required, user_passes_test
from .models import Drip, DripCategory

# Страница со списком капельниц
def drip_list(request):
    drips = Drip.objects.all()
    return render(request, "services/drip_list.html", {"drips": drips})

# === Кастомная "мини-админка" для капельниц ===

# Проверка: только staff могут редактировать
def staff_required(view_func):
    return user_passes_test(lambda u: u.is_staff)(view_func)

@staff_required
def drip_admin(request):
    drips = Drip.objects.all()
    return render(request, "services/drip_admin.html", {"drips": drips})

@staff_required
def drip_add(request):
    if request.method == "POST":
        name = request.POST.get("name")
        price = request.POST.get("price")
        description = request.POST.get("description")
        Drip.objects.create(name=name, price=price, description=description)
        return redirect("services:drip_admin")
    return render(request, "services/drip_form.html")

@staff_required
def drip_edit(request, pk):
    drip = get_object_or_404(Drip, pk=pk)
    if request.method == "POST":
        drip.name = request.POST.get("name")
        drip.price = request.POST.get("price")
        drip.description = request.POST.get("description")
        drip.save()
        return redirect("services:drip_admin")
    return render(request, "services/drip_form.html", {"drip": drip})

@staff_required
def drip_delete(request, pk):
    drip = get_object_or_404(Drip, pk=pk)
    drip.delete()
    return redirect("services:drip_admin")
