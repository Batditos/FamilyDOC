from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser

@admin.register(CustomUser)
class CustomUserAdmin(UserAdmin):
    model = CustomUser
    list_display = ('email','first_name', 'last_name', 'patronymic', 'phone_number','password','is_staff',)
    search_fields = ('email', 'first_name', 'last_name')
    ordering = ('email',)

    # fieldsets = (
    #     (None, {'fields': ('email', 'password')}),
    #     ('Личная информация', {'fields': ('first_name', 'last_name', 'phone', 'gender', 'birth_date')}),
    #     ('Права доступа', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
    #     ('Важные даты', {'fields': ('last_login', 'date_joined')}),
    # )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'first_name', 'last_name', 'phone', 'gender', 'birth_date', 'password1', 'password2'),
        }),
    )