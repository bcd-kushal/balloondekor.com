from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse
from django.conf import settings
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate as default_authenticate, login as LoginUser, logout as LogoutUser
from django.contrib.auth.models import User as RegisteredUsers
from django.contrib.auth.views import LoginView


import json
from .forms import LoginForm, SigninForm, PayForm
from .auth_backends import EmailBackend
from .get_weather import get_weather as weather


import razorpay

from .models import PaymentRecord as Rec

from django.views.decorators.csrf import csrf_exempt

# from .forms import SignUpForm

# Create your views here.



""" ===== DASHBOARD HOMEPAGE ===================== """
def dash_home(req):
    username = req.user.username or None
    degrees_symbol = "\u00b0"
    #weather("Sydney")
    context={
        "company_name": "ABC" ,
        "username": username,
        "isLogin": "Logout",
        "user_desc": "Full Stack Dev",
        "theme_col": "197, 172, 244",
        "user_icon": username[0:1],
        "status": "green",
        "greeting": "Good Afternoon",
        "greeting_details": f"Today is 24 November | 19{degrees_symbol}C"
    }
    return render(req,"dash_home.html",context)







""" ===== DASHBOARD SIGN UP ===================== """
def dash_signin(req):
    if req.method == "POST":
        form = SigninForm(req.POST)
        if form.is_valid():

            # first get all the data from signup form ---------------
            fname = form.cleaned_data["first_name"]
            lname = form.cleaned_data["last_name"]
            email = form.cleaned_data["signin_email"]
            pass1 = form.cleaned_data["signin_password1"]
            pass2 = form.cleaned_data["signin_password2"]


            # check if this User already exists or not
            if RegisteredUsers.objects.filter(email=email).exists():
                return redirect('/login/')
            


            # next create a new user from User models   
            registered_user = RegisteredUsers.objects.create_user(
                                                            username=fname,
                                                            first_name=fname,
                                                            last_name=lname,
                                                            email=email,
                                                            password=pass1,
                                                            is_superuser=False
                                                        )
            
            LoginUser(req, registered_user)





            print(f"FULL NAME: {fname} {lname} | PASSWORD: ({pass1} ... {pass2}) | EMAIL ID: {email}")
            return redirect('/')


        else:
            return redirect('/signin/')


    else:
        return render(req,"signin.html",{
            "signin_form": SigninForm()
        })









""" ===== DASHBOARD LOG IN ===================== """
def capture_login_data(req):
    if req.method == "POST":
        form = LoginForm(req.POST)
        if form.is_valid():
            username = form.cleaned_data["username"]
            # mail = form.cleaned_data["email_or_mobile"]
            login_password = form.cleaned_data["login_password"]

            
            # logout user before logging in
            LogoutUser(req)


            # print(f"mail={mail} | pass={login_password}")
            print(f"LOGGED IN :/> full name={username} | pass={login_password}")

            """ print(f"EMAIL/PHONE: {mail_or_id} | PASSWORD: {login_password}")
            return redirect('/') """

            # auth_client = EmailBackend()
            user_exists = default_authenticate(req,username=username,password=login_password)
            # user_exists = auth_client.authenticate(req,email=mail,password=login_password)

            if user_exists is not None:
                print("LOGGED IN SUCCESSFULLY-----------------------------------")
                LoginUser(req,user_exists)
                return redirect('/')
            
            else:
                print("LOG IN UNSUCCESSFUL-----------------------------------")
                return redirect('/login/')               


        else:
            return redirect('/login/')


    else:
        return render(req,"login.html",{
            "login_form": LoginForm()
        })







class EmailLoginView(LoginView):
    template_name = 'login.html'
    fields = ['email', 'password']

    def get_success_url(self):
        return '/'
    
    def form_valid(self, form):
        response = super().form_valid(form)
        print("++++++++++ Login successful +++++++++++++++++++++++++++++++++++++++++")  # Print to console on successful login
        return response

    def form_invalid(self, form):
        response = super().form_invalid(form)
        print("++++++++++ Login failed +++++++++++++++++++++++++++++++++++++++++")  # Print to console on failed login
        return response
    
    redirect_authenticated_user = True







""" ===== DASHBOARD LOG OUT ===================== """
def user_logout(req):
    LogoutUser(req)
    return redirect('/login/')









""" ===== razorpay payment ===================== """
def make_RZP_payment(req):
    
    if req.method == "POST":
        item = req.POST.get("item_name")
        amount = req.POST.get("item_price") 
        print(f"item = {item} || amount = {amount}")


        client = razorpay.Client(auth=('rzp_test_i2Olh4B1BnBa6y','My7JEHHTovYfiSo4OlGUlVQg'))
        payment = client.order.create({
            'amount':int(amount)*100,
            'currency':"INR",
            'payment_capture': '1'
        })

        print(payment)


        model_obj = Rec(
            name=item,
            amount=amount,
            payment_id=payment['id'],
            paid=False
        )

        model_obj.save()

        return render(req, "pay.html", {
            'payment': payment,
            'theme': '#715fbe'
        })
    
    else:
        return render(req,"pay.html",{
            "pay_form": PayForm()
        })







@csrf_exempt
def payment_success(req):

    if req.method == "POST":
        capture = req.POST
        print(f"\n\n\n=======================================================\n{capture}\n=======================================================\n\n\n")
        
        order_id = ""
        for key,val in capture.items():
            if key == 'razorpay_order_id':
                order_id = val
                break

        user = Rec.objects.filter(payment_id=order_id).first()
        user.paid = True
        user.save()



    return render(req, "utils/dashboard/paymentSuccess.html", {})