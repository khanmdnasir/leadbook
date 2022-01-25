from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from .models import Company, FavouriteCompany
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.contrib.sites.shortcuts import get_current_site
from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.utils.encoding import force_bytes,force_text
from .utils import account_activation_token

class userSerializers(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=('id','email','username','password')
        extra_kwargs={'password':{'write_only':True,'required':True}}

    def create(self,validated_data):
        user=User.objects.create_user(**validated_data)
        user.is_active=False
        user.save()
        mail_subject = 'Activate your account.'
        message = render_to_string('app/activate.html', {
                    'user': user,
                    'domain': 'http://localhost:8000',
                    'uid': urlsafe_base64_encode(force_bytes(user.pk)),
                    'token': account_activation_token.make_token(user),
                })
        to_email = user.email
        send_mail(mail_subject, message, 'nasirkhan97.bd@gmail.com', [to_email])
        Token.objects.create(user=user)
        return user
    
class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model=Company
        fields=('__all__')

class FavouriteSerializer(serializers.ModelSerializer):
    company=CompanySerializer()
    class Meta:
        model=FavouriteCompany
        fields=('__all__')


