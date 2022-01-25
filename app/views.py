from django.http import HttpResponse, request
from rest_framework import viewsets
from .serializers import *
from django.contrib.auth.models import User
from .models import *
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework.authentication import TokenAuthentication
from rest_framework.response import Response
class userviewsets(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = userSerializers
    permission_classes=(AllowAny ,)


class CompanyViewSet(viewsets.ModelViewSet):
    queryset=Company.objects.all()
    serializer_class=CompanySerializer
    authentication_classes=(TokenAuthentication, )
    permission_classes=(IsAuthenticated ,)

class FavouriteViewSet(viewsets.ModelViewSet):
    # queryset=FavouriteCompany.objects.all()
    serializer_class=FavouriteSerializer
    authentication_classes=(TokenAuthentication, )
    permission_classes=(IsAuthenticated ,)

    def create(self, request):
        cid=request.data['company']
        company=Company.objects.get(id=cid)
        fc=FavouriteCompany.objects.create(user=self.request.user,company=company)
        serializer_data=FavouriteSerializer(fc)
        return Response(serializer_data.data)

    def get_queryset(self):
        return FavouriteCompany.objects.filter(user=self.request.user)


def activate_user(request, uidb64, token):
    
    try:
        uid = force_text(urlsafe_base64_decode(uidb64))
        user = User.objects.get(pk=uid)
    except(TypeError, ValueError, OverflowError, User.DoesNotExist):
        user = None
    if user is not None and account_activation_token.check_token(user, token):
        user.is_active=True
        user.save()
        return HttpResponse('activated successfully')
    else:
        return HttpResponse('Activation link is invalid!')