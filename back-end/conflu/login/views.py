from rest_framework import viewsets
from rest_framework.response import Response
from .serializers import RegisterSerializer, LoginSerializer
from django.contrib.auth.models import User


class LoginViewSet(viewsets.ViewSet):
    """
    ViewSet simples para registro e login de usuários.
    """
    def create(self, request):
        if request.method == "POST":
            serializer = LoginSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            email = serializer.data.get('email')
            password = serializer.data.get('password')
            user = User.objects.filter(email=email, password=password).first()
            if user:
                return Response({
                    "id": user.id,
                    "email": user.email,
                    "name": user.first_name
                })
            else:
                return Response({"error": "Email e Senha incorretos!"}, status=400)

class RegisterViewSet(viewsets.ViewSet):
    """
    ViewSet simples para registro e login de usuários.
    """
    def create(self, request):
        if request.method == "POST":
            serializer = RegisterSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            first_name = serializer.data.get('first_name')
            email = serializer.data.get('email')
            password = serializer.data.get('password')
            user = User.objects.create(username=first_name, first_name=first_name, email=email, password=password)
            return Response({
                "id": user.id,
                "email": user.email,
                "name": user.first_name
            })