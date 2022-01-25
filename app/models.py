from django.db import models
from django.contrib.auth.models import User

class Company(models.Model):
    name=models.CharField(max_length=200)
    address=models.CharField(max_length=255)
    employee=models.IntegerField()
    email=models.CharField(max_length=50)
    phone=models.CharField(max_length=50)
    website=models.CharField(max_length=50)

class FavouriteCompany(models.Model):
    user=models.ForeignKey(User,on_delete=models.CASCADE)
    company=models.ForeignKey(Company,on_delete=models.CASCADE)
