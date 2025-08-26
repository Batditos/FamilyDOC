from django.urls import path
from . import views

app_name = 'services'

urlpatterns = [
    path("drips/", views.drip_list, name="drip_list"), # мини-админка
    path("drips/admin/", views.drip_admin, name="drip_admin"),
    path("drips/add/", views.drip_add, name="drip_add"),
    path("drips/<int:pk>/edit/", views.drip_edit, name="drip_edit"),
    path("drips/<int:pk>/delete/", views.drip_delete, name="drip_delete"),
]
