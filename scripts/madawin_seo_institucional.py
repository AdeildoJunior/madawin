from pathlib import Path
import re
from datetime import date

root = Path(".")
today = date.today().isoformat()

pages = {
    "sobre/index.html": {
        "title": "Sobre a Mada Wine & Beer | Site oficial",
        "description": "Conheça a Mada Wine & Beer, marca com conteúdo destinado exclusivamente a maiores de 18 anos.",
        "h1": "Sobre a Mada Wine & Beer",
        "body": """
        <p>A Mada Wine & Beer é uma marca voltada ao público adulto, com comunicação responsável e conteúdo destinado exclusivamente a pessoas maiores de 18 anos.</p>
        <p>Este site reúne informações institucionais, canais oficiais e avisos importantes sobre maioridade e uso responsável.</p>
        """
    },
    "contato/index.html": {
        "title": "Contato | Mada Wine & Beer",
        "description": "Canais oficiais de contato da Mada Wine & Beer. Conteúdo destinado a maiores de 18 anos.",
        "h1": "Contato",
        "body": """
        <p>Use os canais oficiais da Mada Wine & Beer para informações institucionais.</p>
        <p>O conteúdo deste site é destinado exclusivamente a maiores de 18 anos.</p>
        """
    },
    "politica-de-privacidade/index.html": {
        "title": "Política de Privacidade | Mada Wine & Beer",
        "description": "Política de privacidade da Mada Wine & Beer.",
        "h1": "Política de Privacidade",
        "body": """
        <p>A Mada Wine & Beer respeita a privacidade dos visitantes do site.</p>
        <p>Podemos utilizar informações técnicas básicas de navegação para melhorar a segurança, funcionamento e experiência do site.</p>
        <p>Não utilize este site caso não tenha idade legal para acessar conteúdos relacionados a bebidas alcoólicas.</p>
        """
    },
    "termos-de-uso/index.html": {
        "title": "Termos de Uso | Mada Wine & Beer",
        "description": "Termos de uso do site Mada Wine & Beer.",
        "h1": "Termos de Uso",
        "body": """
        <p>Ao acessar este site, o visitante declara estar ciente de que o conteúdo é destinado exclusivamente a maiores de 18 anos.</p>
        <p>A Mada Wine & Beer incentiva o respeito à legislação brasileira e a comunicação responsável.</p>
        """
    },
}

BASE_CSS = """
<style>
:root {
  --green: #0f2318;
  --gold: #d4af37;
  --cream: #fff8e7;
}
body {
  margin: 0;
  font-family: Arial, sans-serif;
  background: var(--green);
  color: var(--cream);
  line-height: 1.6;
}
main {
  max-width: 920px;
  margin: 0 auto;
  padding: 56px 22px;
}
.card {
  background: rgba(255,255,255,.06);
  border: 1px solid rgba(212,175,55,.45);
  border-radius: 22px;
  padding: 32px;
}
h1 {
  color: var(--gold);
  margin-top: 0;
}
a {
  color: var(--gold);
}
nav {
  margin-bottom: 28px;
}
nav a {
  margin-right: 16px;
}
</style>
"""

NAV = """
<nav>
  <a href="/">Início</a>
  <a href="/sobre/">Sobre</a>
  <a href="/contato/">Contato</a>
  <a href="/aviso-de-maioridade/">Aviso de maioridade</a>
</nav>
"""

def make_page(path, title, description, h1, body):
    html = f"""<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{title}</title>
  <meta name="description" content="{description}">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="https://madawin.com.br/{path.parent.as_posix()}/">
  <meta property="og:title" content="{title}">
  <meta property="og:description" content="{description}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://madawin.com.br/{path.parent.as_posix()}/">
  {BASE_CSS}
</head>
<body>
  <main>
    {NAV}
    <section class="card">
      <h1>{h1}</h1>
      {body}
      <p><a href="/">Voltar para a página inicial</a></p>
    </section>
  </main>
</body>
</html>
"""
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(html, encoding="utf-8")

for rel, data in pages.items():
    make_page(root / rel, **data)

index = root / "index.html"
if index.exists():
    html = index.read_text(encoding="utf-8")

    seo_block = f"""
  <title>Mada Wine & Beer | Site oficial</title>
  <meta name="description" content="Site oficial da Mada Wine & Beer. Conteúdo destinado exclusivamente a maiores de 18 anos, com informações institucionais, contato e aviso de maioridade.">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="https://madawin.com.br/">
  <meta property="og:title" content="Mada Wine & Beer | Site oficial">
  <meta property="og:description" content="Site oficial da Mada Wine & Beer. Conteúdo destinado exclusivamente a maiores de 18 anos.">
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://madawin.com.br/">
  <script type="application/ld+json">
  {{
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Mada Wine & Beer",
    "url": "https://madawin.com.br/",
    "sameAs": []
  }}
  </script>
"""

    html = re.sub(r"<title>.*?</title>", "", html, flags=re.I|re.S)
    html = re.sub(r'<meta\s+name=["\']description["\'][^>]*>', "", html, flags=re.I)
    html = re.sub(r'<meta\s+name=["\']robots["\'][^>]*>', "", html, flags=re.I)
    html = re.sub(r'<link\s+rel=["\']canonical["\'][^>]*>', "", html, flags=re.I)
    html = re.sub(r'<meta\s+property=["\']og:[^"\']+["\'][^>]*>', "", html, flags=re.I)
    html = re.sub(r'<script\s+type=["\']application/ld\+json["\']>.*?</script>', "", html, flags=re.I|re.S)

    if "</head>" in html:
        html = html.replace("</head>", seo_block + "\n</head>", 1)

    if "/aviso-de-maioridade/" not in html and "</body>" in html:
        footer = """
<footer style="padding:24px;text-align:center;font-size:14px">
  <a href="/sobre/">Sobre</a> ·
  <a href="/contato/">Contato</a> ·
  <a href="/politica-de-privacidade/">Política de Privacidade</a> ·
  <a href="/termos-de-uso/">Termos de Uso</a> ·
  <a href="/aviso-de-maioridade/">Aviso de maioridade</a>
</footer>
"""
        html = html.replace("</body>", footer + "\n</body>", 1)

    index.write_text(html, encoding="utf-8")

sitemap_urls = [
    ("https://madawin.com.br/", "weekly", "1.0"),
    ("https://madawin.com.br/sobre/", "monthly", "0.7"),
    ("https://madawin.com.br/contato/", "monthly", "0.7"),
    ("https://madawin.com.br/politica-de-privacidade/", "monthly", "0.5"),
    ("https://madawin.com.br/termos-de-uso/", "monthly", "0.5"),
    ("https://madawin.com.br/aviso-de-maioridade/", "monthly", "0.6"),
]

sitemap = ['<?xml version="1.0" encoding="UTF-8"?>',
           '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
for loc, freq, priority in sitemap_urls:
    sitemap.append(f"""  <url>
    <loc>{loc}</loc>
    <lastmod>{today}</lastmod>
    <changefreq>{freq}</changefreq>
    <priority>{priority}</priority>
  </url>""")
sitemap.append("</urlset>\n")
(root / "sitemap.xml").write_text("\n".join(sitemap), encoding="utf-8")

(root / "robots.txt").write_text("""User-agent: *
Allow: /

Sitemap: https://madawin.com.br/sitemap.xml
""", encoding="utf-8")

print("SEO institucional aplicado com sucesso.")
