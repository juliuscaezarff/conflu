# serializers.py
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from rest_framework import serializers

class RegisterSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('first_name', 'email', 'password')

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)