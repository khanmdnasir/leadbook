from django.urls import path
from django.conf.urls import include
from .views import *
from rest_framework import routers

router = routers.DefaultRouter()
router.register('users',userviewsets)
router.register('company',CompanyViewSet)
router.register('favourite',FavouriteViewSet,basename='favourite')



urlpatterns = [
    path('', include(router.urls)),
]
