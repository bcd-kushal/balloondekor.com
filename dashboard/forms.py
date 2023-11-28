from django import forms

class LoginForm(forms.Form):
    username = forms.CharField(
                            max_length=100
                        )
    # email = forms.CharField(
    #                         max_length=100,
    #                         widget=forms.EmailInput()
    #                     )
    login_password = forms.CharField(
                            widget=forms.PasswordInput()
                        )




class SigninForm(forms.Form):
    first_name = forms.CharField(max_length=100)
    last_name = forms.CharField(max_length=100)
    signin_email = forms.CharField(
                            max_length=100, 
                            widget=forms.EmailInput()
                        )
    signin_password1 = forms.CharField(
                            widget=forms.PasswordInput()
                        )
    signin_password2 = forms.CharField(
                            widget=forms.PasswordInput()
                        )





class PayForm(forms.Form):
    itemname = forms.CharField(
                            max_length=100
                        )
    # email = forms.CharField(
    #                         max_length=100,
    #                         widget=forms.EmailInput()
    #                     )
    price = forms.IntegerField(min_value=1)


