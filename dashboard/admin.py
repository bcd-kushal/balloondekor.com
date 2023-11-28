from django.contrib import admin

# Register your models here.

from .models import PaymentRecord

admin.site.register(PaymentRecord)