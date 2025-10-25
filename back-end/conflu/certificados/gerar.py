from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import letter
from reportlab.lib.colors import white
from PyPDF2 import PdfReader, PdfWriter
from datetime import datetime

def gerar_certificado(nome, caminho_pdf_original, caminho_pdf_saida) -> str:
    # Criar PDF temporário com o texto a ser inserido
    temp_pdf = "overlay.pdf"
    c = canvas.Canvas(temp_pdf, pagesize=letter)

    # ======= POSIÇÕES DO TEXTO =========
    # Ajuste se necessário após testar
    x_nome = 160   # eixo X onde o nome será escrito
    y_nome = 280   # eixo Y do nome

    x_data = 420   # posição da data
    y_data = 100   # posição da data
    # ===================================

    # Nome (fonte grande, centralizada horizontalmente manualmente se desejar)
    c.setFillColor(white)   
    c.setFont("Helvetica-Bold", 26)
    c.drawString(x_nome, y_nome, nome)

    # Data atual formatada
    data_atual = datetime.now().strftime("%d/%m/%Y")
    c.setFillColor(white)
    c.setFont("Helvetica", 14)
    c.drawString(x_data, y_data, data_atual)

    c.save()

    # Mesclar overlay com pdf original
    reader = PdfReader(caminho_pdf_original)
    writer = PdfWriter()

    overlay = PdfReader(temp_pdf)
    page = reader.pages[0]
    page.merge_page(overlay.pages[0])
    writer.add_page(page)

    with open(caminho_pdf_saida, "wb") as output_file:
        writer.write(output_file)

    print(f"✅ Certificado gerado com sucesso: {caminho_pdf_saida}")
    return caminho_pdf_saida