from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse
from django.conf import settings
from django.views.decorators.csrf import csrf_exempt
import json
import razorpay as rzp

from .purchase_items_list import PurchaseForm


""" ===== ROOT PAYMENT HOMEPAGE ===================== """
def homepage(req):
    if req.method=='POST':
        form = PurchaseForm(req.POST)
        if form.is_valid():

            # first get all the data from signup form ---------------
            item_name = form.cleaned_data["item_name"]
            item_price = int(form.cleaned_data["item_price"]) * 100

            print(f"\n\n[\n name:: {item_name}\n price:: {item_price}\n]\n\n")
            
            rzp_client = rzp.Client(auth=('rzp_test_i2Olh4B1BnBa6y','My7JEHHTovYfiSo4OlGUlVQg'))
            rzp_payment = rzp_client.order.create(data={
                'amount': item_price,
                'currency': 'INR',
                'payment_capture': '1'
            })


            return render(req,"home.html",{
                'payment': rzp_payment
            })


    if(req.method=='GET'):
        #rzp_client = razorpay.Client(auth=(settings.ENV['RAZORPAY_API_KEY'], settings.ENV['RAZORPAY_KEY_SECRET']))
        context = {
            'name': 'Kushal',
            'price': '300.00',
            "purchase_form": PurchaseForm(),
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