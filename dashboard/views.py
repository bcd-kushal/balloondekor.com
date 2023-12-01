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
from .utils import get_date_time_rn

from django.views.decorators.csrf import csrf_exempt

from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from datetime import datetime

ATLAS_URI = "mongodb+srv://kushalkumar:iamkushal02@firstcluster.4mlqtzs.mongodb.net/?retryWrites=true&w=majority"
        


# from .forms import SignUpForm

# Create your views here.


""" ===== GOTO DASHBOARD HOMEPAGE ===================== """
def goto_dash_home(req):
    if req.method == "GET":
        return redirect("/dashboard/home/")


""" ===== DASHBOARD HOMEPAGE ===================== """
def dash_home(req):
    username = req.user.username or None
    degrees_symbol = "\u00b0"
    today = datetime.now()
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
        "greeting_details": f"Today is {today.strftime('%d %b')} | 19{degrees_symbol}C"
    }
    return render(req,"dash_home.html",context)


""" ===== DASHBOARD API ===================== """
def dash_api(req):
    username = req.user.username or None
    context={
        "company_name": "ABC" ,
        "username": username,
        "isLogin": "Logout",
        "user_desc": "Full Stack Dev",
        "theme_col": "197, 172, 244",
        "user_icon": username[0:1],
        "status": "green",
    }
    return render(req,"dash_api.html",context)



""" ===== DASHBOARD DATABASE ===================== """
def dash_db(req):
    username = req.user.username or None
    context={
        "company_name": "ABC" ,
        "username": username,
        "isLogin": "Logout",
        "user_desc": "Full Stack Dev",
        "theme_col": "197, 172, 244",
        "user_icon": username[0:1],
        "status": "green",
    }
    return render(req,"dash_databases.html",context)



""" ===== DASHBOARD DISCORD BOT ===================== """
def dash_bot(req):
    username = req.user.username or None
    context={
        "company_name": "ABC" ,
        "username": username,
        "isLogin": "Logout",
        "user_desc": "Full Stack Dev",
        "theme_col": "197, 172, 244",
        "user_icon": username[0:1],
        "status": "green",
    }
    return render(req,"dash_bot.html",context)



""" ===== DASHBOARD ANALYTICS ===================== """
def dash_analytics(req):
    username = req.user.username or None
    context={
        "company_name": "ABC" ,
        "username": username,
        "isLogin": "Logout",
        "user_desc": "Full Stack Dev",
        "theme_col": "197, 172, 244",
        "user_icon": username[0:1],
        "status": "green",
    }
    return render(req,"dash_analytics.html",context)









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






########[ DATABASES ]#######################################################
""" ===== SELECT DATABASE PAGE ===================== """
def create_database(req):
    global ATLAS_URI

    if req.method == "POST":

        if "SQLbox" in req.POST:

            mongo_client = MongoClient(ATLAS_URI,server_api = ServerApi('1'))

            atlas_db = mongo_client.get_database("users-crud-db")
            atlas_admin = atlas_db.admin
            
            DB_USER = req.user.username

            OBJ = atlas_admin.find_one({ "user": DB_USER })
            OBJ = OBJ["database_names"] if OBJ is not None else []
            OBJ_STR = ','.join(map(str, OBJ))

            print("```````````````````````````",OBJ_STR)

            return render(req,"database_model/createDB/createDB.html",{
                "loggedin_username": req.user.username or None,
                "username": req.user.username,
                "user_desc": "Full Stack Dev",
                "theme_col": "197, 172, 244",
                "user_icon": req.user.username[0:1],
                "status": "green",
                "databases": OBJ_STR,
                "makeSQL": 1
            })
        



        if "NoSQLbox" in req.POST:



            return render(req,"database_model/createDB/createDB.html",{
                "loggedin_username": req.user.username or None,
                "username": req.user.username,
                "user_desc": "Full Stack Dev",
                "theme_col": "197, 172, 244",
                "user_icon": req.user.username[0:1],
                "status": "green",
                "makeNoSQL": 1
            })
    


    if req.method == "GET":
        return render(req,"database_model/createDB/createDB.html",{
            "loggedin_username": req.user.username or None,
            "username": req.user.username,
            "user_desc": "Full Stack Dev",
            "theme_col": "197, 172, 244",
            "user_icon": req.user.username[0:1],
            "status": "green",
            "selectDB": 1
        })
    





""" ===== CREATE SQL DATABASE ===================== """
def create_SQL_DB(req):
    global ATLAS_URI

    if req.method == "POST":
        db = {
            "name": req.POST.get("db_name"),
            "attributes": req.POST.get("db_schema").split('\r\n'),
            "primary_key": req.POST.get("db_pk"),
            "foreign_key": req.POST.get("db_fk")
        }

        
        try:
            # mongo_client.admin.command('ping')
            mongo_client = MongoClient(ATLAS_URI,server_api = ServerApi('1'))

            atlas_db = mongo_client.get_database("users-crud-db")
            atlas_admin = atlas_db.admin
            atlas_sql = atlas_db.sql_table
            # atlas_nosql = atlas_db.nosql_table


            TIME_RN = get_date_time_rn()

            ADMIN_DOC_STRUCTURE = {
                "user": "",
                "database_names": []
            }

            SQL_DOC_STRUCTURE = {
                "user": "",
                "db_name": "",
                "primary_key": "",
                "date_created": TIME_RN,
                "date_modified": TIME_RN,
                "attributes": [],
                "rows": 0,
                "cols": 0,
                "description": "",
                "data": {}
            }


            DB_USER = req.user.username
            # create SQL table under this username

            if(atlas_sql.find_one({ "user": DB_USER, "db_name": db["name"] }) == None):
                SQL_DOC_STRUCTURE["user"] = DB_USER
                SQL_DOC_STRUCTURE["db_name"] = db["name"]
                SQL_DOC_STRUCTURE["attributes"] = db["attributes"]
                SQL_DOC_STRUCTURE["primary_key"] = db["primary_key"]
                SQL_DOC_STRUCTURE["cols"] = len(db["attributes"])

                atlas_sql.insert_one(SQL_DOC_STRUCTURE)

                # print(f"########### successfully added {db['name']} to user:{DB_USER} ###########################")



            OBJ = atlas_admin.find_one({ "user": DB_USER })

            if(OBJ == None):
                ADMIN_DOC_STRUCTURE["user"] = DB_USER
                ADMIN_DOC_STRUCTURE["database_names"].append(db["name"])
                atlas_admin.insert_one(ADMIN_DOC_STRUCTURE)
            
            else: 
                OBJ["database_names"].append(db["name"])
                atlas_admin.update_one({ "user": DB_USER }, { '$set': { "database_names" : OBJ["database_names"] }}) 




        except Exception as e:
            print(f"\n\n  [  ERR: {e}  ] \n\n")




        return redirect('/')







""" 
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { ref, child, get, set } from "firebase/database";

const firebaseConfig = {
    apiKey:                 "AIzaSyBO2LjF2Vau4wAhjiSB6i-xpUfIrWMv67w",
    authDomain:             "newsletter-5be1e.firebaseapp.com",
    databaseURL:            "https://newsletter-5be1e-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId:              "newsletter-5be1e",
    storageBucket:          "newsletter-5be1e.appspot.com",
    messagingSenderId:      "422358715800",
    appId:                  "1:422358715800:web:58f50be1736602d1be6fed"
};

const app = initializeApp(firebaseConfig);
const dataBase = getDatabase(app);



 """







