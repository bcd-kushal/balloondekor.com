from django.shortcuts import render

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
        "status": "red",
        "greeting": "Good Afternoon",
        "greeting_details": f"Today is 24 November | 19{degrees_symbol}C"
    }
    return render(req,"dash_home.html",context)




""" ===== DASHBOARD SIGN IN ===================== """
def dash_signin(req):
    context={
    }
    return render(req,"signin.html",context)




""" ===== DASHBOARD LOGIN PAGE ===================== """
def dash_login(req):
    context={

    }
    return render(req,"login.html",context)



