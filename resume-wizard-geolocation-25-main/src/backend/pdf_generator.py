from weasyprint import HTML
from jinja2 import Template

resume_template = """
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .header { text-align: center; font-size: 24px; font-weight: bold; }
        .section { margin-top: 20px; }
    </style>
</head>
<body>
    <div class="header">{{ name }}</div>
    <div class="section">Email: {{ email }}</div>
    <div class="section">Phone: {{ phone }}</div>
    <div class="section">Address: {{ address.city }}, {{ address.region }}, {{ address.country }}</div>
    <div class="section"><strong>Education:</strong></div>
    {% for edu in education %}
        <div>{{ edu.degree }} - {{ edu.institution }}</div>
    {% endfor %}
    <div class="section"><strong>Skills:</strong> {{ skills | join(', ') }}</div>
</body>
</html>
"""

def generate_pdf(resume_data, resume_id):
    template = Template(resume_template)
    html_content = template.render(resume_data)
    pdf_path = f"static/resume_{resume_id}.pdf"
    HTML(string=html_content).write_pdf(pdf_path)
    return pdf_path
