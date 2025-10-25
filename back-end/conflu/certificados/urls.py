from django.urls import path, include
from rest_framework import routers
from certificados import views

router = routers.DefaultRouter()


router.register('certificados', views.GerarCertificadoViewSet, basename='certificados')


urlpatterns = [
    path('', include(router.urls))
]