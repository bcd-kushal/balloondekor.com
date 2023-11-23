from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.conf import settings
from django.views.decorators.csrf import csrf_exempt
import json
# import razorpay


""" ===== ROOT HOMEPAGE ===================== """
def homepage(req):
    if(req.method=='GET'):
        #rzp_client = razorpay.Client(auth=(settings.ENV['RAZORPAY_API_KEY'], settings.ENV['RAZORPAY_KEY_SECRET']))
        context = {
            'name': 'Kushal'
        }
        return render(req, "home.html", context)
    


""" ===== SUCCESS PAGE ===================== """
def success_page(req):
    if(req.method=='GET'):
        #rzp_client = razorpay.Client(auth=(settings.ENV['RAZORPAY_API_KEY'], settings.ENV['RAZORPAY_KEY_SECRET']))
        context = {
            'name': 'Kushal'
        }
        return render(req, "success.html", context)
    


""" ===== FAILURE PAGE ===================== """
def failure_page(req):
    if(req.method=='GET'):
        #rzp_client = razorpay.Client(auth=(settings.ENV['RAZORPAY_API_KEY'], settings.ENV['RAZORPAY_KEY_SECRET']))
        context = {
            'name': 'Kushal'
        }
        return render(req, "failure.html", context)

        

""" ===== HANDLE PAYMENT DETAILS FROM FRONTEND ===================== """
@csrf_exempt
def get_form_data(req):
    if(req.method=='POST'):
        data = json.loads(req.body)

        # Access the data using keys
        name = data.get('product_name')
        price = data.get('price')

        # =======================================================
        # Process the data, perform database operations, etc.
        print(f"name: {name}\nprice: {price}")



        
        # =======================================================

        # Return a JSON response or any other appropriate response
        return JsonResponse({'message': 'Data received successfully'})