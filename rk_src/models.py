from django.db import models

# Create your models here.

class Purchase_Details(models.Model):
    name = models.CharField(max_length=100,default='default_ERR_user')
    amount = models.IntegerField(default=0)
    payment_id = models.CharField(max_length=50,primary_key=True,default='ERR_PAYMENT_ID_RZP')
    paid = models.BooleanField(default=False)
