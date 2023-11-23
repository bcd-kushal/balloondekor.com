
from django.contrib import admin
from django.urls import path

from rk_src import views as rv
from dashboard import views as dv

urlpatterns = [
    path('admin/', admin.site.urls),

    path('payment/', rv.homepage, name='root-homepage'),
    path('payment/success/', rv.success_page, name='root-success'),
    path('payment/failed/', rv.failure_page, name='root-failed'),
    path('payment/orders-paypal/', rv.get_form_data, name='paypal-order'),

    path('', dv.dash_home, name='dash-homepage'),
]
