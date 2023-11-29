from django.db import models
from django import forms
from django.contrib.auth.models import User
from mongoengine import Document, fields

# Create your models here.
""" 

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    email_verified = models.BooleanField(default=False)
    email_id = models.CharField(max_length=70)


    def __str__(self):
        return self.user.username """


class MongoUserDB(Document):
    field1 = fields.IntField()
    field2 = fields.StringField()


class PaymentRecord(models.Model):
    name = models.CharField(max_length=100)
    amount = models.CharField(max_length=100)
    payment_id = models.CharField(max_length=100)
    paid = models.BooleanField(default=False)