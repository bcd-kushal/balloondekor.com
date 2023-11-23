from django.shortcuts import render

# Create your views here.



""" ===== DASHBOARD HOMEPAGE ===================== """
def dash_home(req):
    context={
        "company_name": "ABC" ,
        "username": "Kushal"
    }
    return render(req,"dash_home.html",context)




""" ===== DASHBOARD SIGN IN ===================== """
def dash_signin(req):
    context={

    }
    return render(req,"dash_signin.html",context)




""" ===== DASHBOARD LOGIN PAGE ===================== """
def dash_login(req):
    context={

    }
    return render(req,"dash_login.html",context)



