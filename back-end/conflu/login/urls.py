from django.urls import path, include
from rest_framework.routers import DefaultRouter
from login.views import LoginViewSet, RegisterViewSet

router = DefaultRouter()

router.register('login', LoginViewSet, basename='login')
router.register('register', RegisterViewSet, basename='register')

urlpatterns = [
    path('', include(router.urls)),
]