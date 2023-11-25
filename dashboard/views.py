from django.shortcuts import render, redirect
from django.contrib.auth import login
from django.http import HttpResponse, JsonResponse
from django.conf import settings
from django.views.decorators.csrf import csrf_exempt
import json
from django.contrib.auth import authenticate as LoginUserAuthentication, login as LoginUser, logout as LogoutUser
from django.contrib.auth.models import User as RegisteredUsers

from .forms import LoginForm, SigninForm

# from .forms import SignUpForm

# Create your views here.



""" ===== DASHBOARD HOMEPAGE ===================== """
def dash_home(req):
    username = "Kushal"
    degrees_symbol = "\u00b0"
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
            
            login(req, registered_user)





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
            mail_or_id = form.cleaned_data["email_or_mobile"]
            login_password = form.cleaned_data["login_password"]

            print(f"EMAIL/PHONE: {mail_or_id} | PASSWORD: {login_password}")
            return redirect('/')


        else:
            return redirect('/login/')


    else:
        return render(req,"login.html",{
            "login_form": LoginForm()
        })
