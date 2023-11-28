from django import forms

class PurchaseForm(forms.Form):
    item_name = forms.CharField(
                            max_length=100
                        )
    item_price = forms.IntegerField(
                            min_value=0.01, max_value=100000.00
                        )
