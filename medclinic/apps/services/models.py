from django.db import models
from polymorphic.models import PolymorphicModel

# Базовая модель услуги
class Service(PolymorphicModel):
    name = models.CharField(max_length=200)
    price = models.DecimalField(max_digits=10, decimal_places=0)

    def __str__(self):
        return self.name

# Категории капельниц
class DripCategory(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

# Модель "Капельница"
class Drip(Service):
    category = models.ForeignKey(DripCategory, on_delete=models.CASCADE, null=True, blank=True)
    description = models.TextField()

    class Meta:
        verbose_name = "Капельница"
        verbose_name_plural = "Капельницы"

# Анализы
class Analysis(Service):
    api_id = models.CharField(max_length=50, unique=True)
    description = models.TextField()

# Врачи
class Doctor(Service):
    api_id = models.CharField(max_length=50, unique=True)
    specialty = models.CharField(max_length=100)
