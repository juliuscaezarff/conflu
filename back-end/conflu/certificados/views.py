from conflu_ai import settings
from email.message import EmailMessage
from rest_framework import viewsets
from rest_framework.response import Response
from certificados.gerar import gerar_certificado
import smtplib
import ssl
import os

# Create your views here.
class GerarCertificadoViewSet(viewsets.ViewSet):

    def create(self, request):
        if request.method == "POST":
            aluno_nome = request.data.get("nome", None)
            aluno_email = request.data.get("email", None)

            if not aluno_email or not aluno_nome:
                return Response({"msg": "Envie o nome e o email do Aluno"}, status=400)
            
             # Caminhos
            pdf_original = settings.CERTIFICADO_BASE  # coloque no settings
            pdf_saida = f"certificado_{aluno_nome}.pdf"

            path_arquivo_final = gerar_certificado(
                nome=aluno_nome,
                caminho_pdf_original=pdf_original,
                caminho_pdf_saida=pdf_saida
            )
             # Envia o certificado
            enviado = self.send(aluno_email, aluno_nome, path_arquivo_final)

            if enviado:
                # remove o arquivo após enviar
                os.remove(path_arquivo_final)
                return Response({"msg": "Certificado enviado com sucesso!"}, status=200)

            return Response({"msg": "Erro ao enviar certificado"}, status=400)

            
    def send(self, aluno_email: str, aluno_nome: str, caminho_certificado: str) -> bool | None:
        msg = EmailMessage()
        msg['From'] = settings.SMTP_CONFIG['admin']
        msg['To'] = aluno_email
        msg['Subject'] = f"CERTIFICADO - {aluno_nome}"
        
        msg.set_content(f"""
            Olá, {aluno_nome}! Segue em anexo o certificado referente ao curso concluído.
                
            Atenciosamente, Equipe Conflu AI
        """)

         # Anexa o PDF
        with open(caminho_certificado, 'rb') as arq:
            msg.add_attachment(
                arq.read(),
                maintype='application',
                subtype='pdf',
                filename=os.path.basename(caminho_certificado)
            )

        safe = ssl.create_default_context()
        try:
            with smtplib.SMTP_SSL(host=str(settings.SMTP_CONFIG['server']), port=465, context=safe) as smtp:
                smtp.login(settings.SMTP_CONFIG['admin'], settings.SMTP_CONFIG['password'])
                smtp.sendmail(
                    from_addr=settings.SMTP_CONFIG['admin'],
                    to_addrs=aluno_email,
                    msg=msg.as_string()
                )
            return True
        except Exception as e:
            print(e)
            return False