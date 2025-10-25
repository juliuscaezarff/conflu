from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand
import os

class Command(BaseCommand):
    help = 'Cria um superusuário automaticamente se não existir'

    def handle(self, *args, **kwargs):
        User = get_user_model()

        username = os.environ.get("DJANGO_SUPERUSER_USERNAME")
        password = os.environ.get("DJANGO_SUPERUSER_PASSWORD")
        email = os.environ.get("DJANGO_SUPERUSER_EMAIL")

        if not username or not password:
            print("Variáveis de ambiente para superuser não definidas.")
            return

        if not User.objects.filter(username=username).exists():
            print(f"📌 Criando superuser {username}...")
            User.objects.create_superuser(username=username, email=email, password=password)
        else:
            print(f"✅ Superuser {username} já existe, ignorando.")