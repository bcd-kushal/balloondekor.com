
from django.contrib import admin
from django.urls import path

from rk_src import views as rv
from dashboard import views as dv
from rptest import views as rp

urlpatterns = [
    path('admin/', admin.site.urls),

    path('payment/', rv.homepage, name='root-homepage'),
    path('payment/success/', rv.success_page, name='root-success'),
    path('payment/failed/', rv.failure_page, name='root-failed'),
    path('payment/rzp/', rv.get_form_data, name='razorpay-order'),

    path('', dv.goto_dash_home, name='redirect-to-dash-homepage-1'),
    path('dashboard/', dv.goto_dash_home, name='redirect-to-dash-homepage-2'),
    path('dashboard/home/', dv.dash_home, name='dash-homepage'),
    path('dashboard/api/', dv.dash_api, name='dash-api'),
    path('dashboard/database/', dv.dash_db, name='dash-database'),
    path('dashboard/bot/', dv.dash_bot, name='dash-bot'),
    path('dashboard/analytics/', dv.dash_analytics, name='dash-analytics'),

    path('signin/', dv.dash_signin, name='dash-signin'),
    path('login/', dv.capture_login_data, name='dash-login'),
    path('logout/', dv.user_logout, name='dash-logout'),
    path('buymeacoffee/', dv.make_RZP_payment, name='razorpay-payment'),
    path('buymeacoffee/success/', dv.payment_success, name='razorpay-payment-success'),
    #path('login/authenticate/', dv.EmailLoginView.as_view(), name='dash-login-authenticate'),

    path('rp/', rp.rptest_home, name='razorpaytest-home'),
    path('rp/success/', rp.rptest_success, name='razorpaytest-success'),



    path('dashboard/database/create/', dv.create_database, name='database-create'),
    path('dashboard/database/<int:db_id>/', dv.create_database, name='database-1'),



    
]
