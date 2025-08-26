from django.contrib import admin
from polymorphic.admin import PolymorphicParentModelAdmin, PolymorphicChildModelAdmin
from .models import Service, Drip, DripCategory, Analysis, Doctor

# --- Категории капельниц ---
@admin.register(DripCategory)
class DripCategoryAdmin(admin.ModelAdmin):
    list_display = ("id", "name")
    search_fields = ("name",)

# --- Капельницы (дочерняя модель Service) ---
@admin.register(Drip)
class DripAdmin(PolymorphicChildModelAdmin):
    base_model = Service
    list_display = ("name", "price", "category")
    search_fields = ("name", "description")
    list_filter = ("category",)

# --- Анализы (дочерняя модель Service) ---
@admin.register(Analysis)
class AnalysisAdmin(PolymorphicChildModelAdmin):
    base_model = Service
    list_display = ("name", "price", "api_id")
    search_fields = ("name", "description", "api_id")

# --- Врачи (дочерняя модель Service) ---
@admin.register(Doctor)
class DoctorAdmin(PolymorphicChildModelAdmin):
    base_model = Service
    list_display = ("name", "specialty", "price", "api_id")
    search_fields = ("name", "specialty", "api_id")

# --- Родительская модель Service для polymorphic ---
@admin.register(Service)
class ServiceParentAdmin(PolymorphicParentModelAdmin):
    base_model = Service
    child_models = (Drip, Analysis, Doctor)
    list_display = ("name", "price")
