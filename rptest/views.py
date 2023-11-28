from django.shortcuts import render
import razorpay

from .models import PaymentRecord

from django.views.decorators.csrf import csrf_exempt

# Create your views here.



def rptest_home(req):

    if req.method == "POST":
        item = req.POST.get("item_name")
        amount = int(req.POST.get("item_price")) * 100 #in paise it was
        print(f"item = {item} || amount = {amount}")
        

        client = razorpay.Client(auth=('rzp_test_i2Olh4B1BnBa6y','My7JEHHTovYfiSo4OlGUlVQg'))
        payment = client.order.create({
            'amount':amount,
            'currency':"INR",
            'payment_capture': '1'
        })

        print(payment)


        model_obj = PaymentRecord(
            name=item,
            amount=amount,
            payment_id=payment['id'],
            paid=False
        )

        model_obj.save()

        return render(req, "rptest/paymentHome.html", {
            'payment': payment,
            'theme': '#715fbe'
        })

    return render(req, "rptest/paymentHome.html", {})



@csrf_exempt
def rptest_success(req):

    if req.method == "POST":
        capture = req.POST
        order_id = ""
        for key,val in capture.items():
            if key == 'razorpay_order_id':
                order_id = val
                break

        user = PaymentRecord.objects.filter(payment_id=order_id).first()
        user.paid = True
        user.save()


        print(f"\n\n\n=======================================================\n{capture}\n=======================================================\n\n\n")

    return render(req, "rptest/successHome.html", {})