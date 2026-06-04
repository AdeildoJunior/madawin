#!/usr/bin/env bash
# ══════════════════════════════════════════════════════════════
#  PATCH — Mada Wine & Beer
#  Corrige catálogo, subpáginas, badge OFF, produtos reais
#  Gerado por Claude — cole e rode em ~/madawin
# ══════════════════════════════════════════════════════════════
set -euo pipefail

cd ~/madawin || { echo "ERRO: pasta ~/madawin não encontrada. Clone o repositório primeiro."; exit 1; }

# ─────────────────────────────────────────────
# 1. BACKUP
# ─────────────────────────────────────────────
backup_dir="backup_$(date +%Y%m%d_%H%M%S)"
mkdir -p "$backup_dir"
cp -R index.html assets vinhos cervejas espumantes whisky vodka gin destilados kits CNAME .nojekyll "$backup_dir" 2>/dev/null || true
echo "✅ Backup criado em: $backup_dir"

# ─────────────────────────────────────────────
# 2. store-data.js — produtos reais + OFF agressivo
# ─────────────────────────────────────────────
cat > assets/js/store-data.js << 'JSDATA'
window.MADAWIN_CATEGORIES = {
  "vinhos": {
    "title": "Vinhos",
    "subtitle": "Tintos, brancos, rosés e frisantes. Nacionais e importados.",
    "icon": "🍷",
    "filters": ["Tinto","Branco","Rosé","Frisante","Portugal","Chile","Argentina","Brasil"]
  },
  "cervejas": {
    "title": "Cervejas",
    "subtitle": "Long necks, latas, especiais e sem álcool.",
    "icon": "🍺",
    "filters": ["Latão 473ml","Long Neck","Lata 350ml","Heineken","Brahma","Stella Artois","Budweiser","Amstel","Corona","Spaten","Original"]
  },
  "espumantes": {
    "title": "Espumantes",
    "subtitle": "Brut, Demi-Sec, Moscatel e Rosé para celebrar.",
    "icon": "🥂",
    "filters": ["Brut","Demi-Sec","Moscatel","Rosé","Chandon","Casa Perini","Rio Sol","Campo Largo"]
  },
  "whisky": {
    "title": "Whisky",
    "subtitle": "Rótulos clássicos e premium.",
    "icon": "🥃",
    "filters": ["Johnnie Walker","Jack Daniels","Chivas Regal","Grand Old Parr","12 Anos","1L","750ml"]
  },
  "vodka": {
    "title": "Vodka",
    "subtitle": "Smirnoff, Ice e drinks prontos.",
    "icon": "🧊",
    "filters": ["Smirnoff","Ice","Original","Green Apple","269ml","275ml","998ml"]
  },
  "gin": {
    "title": "Gin",
    "subtitle": "Gin nacional e importado para drinks e presentes.",
    "icon": "🍸",
    "filters": ["Rocks","Larios","Intencion","1L","700ml","900ml"]
  },
  "destilados": {
    "title": "Destilados",
    "subtitle": "Rum, cachaça, aperitivo e bebidas especiais.",
    "icon": "🥃",
    "filters": ["Rum","Cachaça","Aperitivo","Bacardi","Pitu","Weber Haus","Aperol"]
  },
  "kits": {
    "title": "Kits",
    "subtitle": "Combinações para presente, datas especiais e lembranças.",
    "icon": "🎁",
    "filters": ["Presente","Celebração","Vinho","Cerveja","Whisky","Premium"]
  }
};

window.MADAWIN_PRODUCTS = [
  /* ─── VINHOS ─── */
  { slug:"vinha-grande-tto", category:"vinhos", name:"VH Vinha Grande Tinto 750ml", old_price:199.99, pix_price:149.99, installments:"3x de R$ 54,17", credit_price:"R$ 157,89 no crédito", tags:["Tinto","Portugal","750ml"] },
  { slug:"freixenet-pinot-grigio", category:"vinhos", name:"VH Freixenet Pinot Grigio Branco 750ml", old_price:99.99, pix_price:69.99, installments:"3x de R$ 24,71", credit_price:"R$ 73,67 no crédito", tags:["Branco","750ml"] },
  { slug:"sea-sun-rose", category:"vinhos", name:"VH Sea Sun Rosé 750ml", old_price:109.99, pix_price:79.99, installments:"3x de R$ 28,24", credit_price:"R$ 84,20 no crédito", tags:["Rosé","Chile","750ml"] },
  { slug:"verde-casal-garcia", category:"vinhos", name:"VH Verde Casal Garcia Branco 750ml", old_price:99.99, pix_price:69.99, installments:"3x de R$ 24,71", credit_price:"R$ 73,67 no crédito", tags:["Branco","Portugal","750ml"] },
  { slug:"mimi-provence-rose", category:"vinhos", name:"VH Mimi Côtes de Provence Rosé 750ml", old_price:269.99, pix_price:195.99, installments:"3x de R$ 69,12", credit_price:"R$ 206,31 no crédito", tags:["Rosé","França","750ml"] },
  { slug:"cristatus-merlot", category:"vinhos", name:"VH Cristatus Merlot Reserva Tinto 750ml", old_price:129.90, pix_price:89.90, installments:"3x de R$ 31,72", credit_price:"R$ 94,63 no crédito", tags:["Tinto","750ml"] },
  { slug:"cristatus-cabernet", category:"vinhos", name:"VH Cristatus Cabernet Sauvignon Reserva Tinto 750ml", old_price:129.90, pix_price:89.90, installments:"3x de R$ 31,72", credit_price:"R$ 94,63 no crédito", tags:["Tinto","750ml"] },
  { slug:"luigi-bosca-malbec", category:"vinhos", name:"VH Luigi Bosca Malbec Tinto 750ml", old_price:139.99, pix_price:99.99, installments:"3x de R$ 35,29", credit_price:"R$ 105,25 no crédito", tags:["Tinto","Argentina","750ml"] },
  { slug:"catena-alta-malbec", category:"vinhos", name:"VH Catena Alta Malbec Tinto 750ml", old_price:399.99, pix_price:299.99, installments:"3x de R$ 105,88", credit_price:"R$ 315,78 no crédito", tags:["Tinto","Argentina","750ml"] },
  { slug:"esporao-reserva", category:"vinhos", name:"VH Esporão Reserva Tinto 750ml", old_price:299.90, pix_price:220.00, installments:"3x de R$ 77,59", credit_price:"R$ 231,58 no crédito", tags:["Tinto","Portugal","750ml"] },
  { slug:"nicolas-catena-zapata", category:"vinhos", name:"VH Nicolas Catena Zapata 750ml", old_price:1199.90, pix_price:900.00, installments:"10x de R$ 97,90", credit_price:"R$ 947,37 no crédito", tags:["Tinto","Argentina","Premium","750ml"] },
  { slug:"loma-negra-cabernet", category:"vinhos", name:"VH Loma Negra Gran Reserva Cabernet Sauvignon 750ml", old_price:99.99, pix_price:69.99, installments:"3x de R$ 24,71", credit_price:"R$ 73,67 no crédito", tags:["Tinto","Chile","750ml"] },
  { slug:"casillero-diablo-pedro", category:"vinhos", name:"VH Casillero del Diablo Reserva Pedro Jiménez 750ml", old_price:69.90, pix_price:48.90, installments:"3x de R$ 17,25", credit_price:"R$ 51,47 no crédito", tags:["Branco","Chile","750ml"] },
  { slug:"pe-branco", category:"vinhos", name:"VH Pé Branco 750ml", old_price:59.99, pix_price:39.99, installments:"3x de R$ 14,12", credit_price:"R$ 42,10 no crédito", tags:["Branco","Portugal","750ml"] },
  { slug:"pe-tinto", category:"vinhos", name:"VH Pé Tinto 750ml", old_price:59.90, pix_price:42.90, installments:"3x de R$ 15,14", credit_price:"R$ 45,16 no crédito", tags:["Tinto","Portugal","750ml"] },
  { slug:"quinta-bons-ventos-tto", category:"vinhos", name:"VH Quinta dos Bons Ventos Tinto 750ml", old_price:79.99, pix_price:49.99, installments:"3x de R$ 17,64", credit_price:"R$ 52,62 no crédito", tags:["Tinto","Portugal","750ml"] },
  { slug:"quinta-bons-ventos-br", category:"vinhos", name:"VH Quinta dos Bons Ventos Branco 750ml", old_price:79.99, pix_price:49.99, installments:"3x de R$ 17,64", credit_price:"R$ 52,62 no crédito", tags:["Branco","Portugal","750ml"] },
  { slug:"terrazas-malbec", category:"vinhos", name:"Terrazas Reserva Malbec Tinto 750ml", old_price:159.90, pix_price:110.50, installments:"3x de R$ 38,97", credit_price:"R$ 116,32 no crédito", tags:["Tinto","Argentina","750ml"] },
  { slug:"terrazas-syrah", category:"vinhos", name:"Terrazas Reserva Syrah Tinto 750ml", old_price:159.90, pix_price:110.50, installments:"3x de R$ 38,97", credit_price:"R$ 116,32 no crédito", tags:["Tinto","Argentina","750ml"] },
  { slug:"intruso-branco", category:"vinhos", name:"VH Intruso Branco 750ml", old_price:89.90, pix_price:59.50, installments:"3x de R$ 20,99", credit_price:"R$ 62,63 no crédito", tags:["Branco","750ml"] },
  { slug:"tropical-rose-frisante", category:"vinhos", name:"VH Tropical Rosé Frisante 750ml", old_price:39.90, pix_price:25.90, installments:"3x de R$ 9,14", credit_price:"R$ 27,26 no crédito", tags:["Frisante","Rosé","750ml"] },
  { slug:"almaden-frisante-rose", category:"vinhos", name:"VH Almadén Frisante Rosé 750ml", old_price:49.90, pix_price:29.95, installments:"3x de R$ 10,57", credit_price:"R$ 31,53 no crédito", tags:["Frisante","Rosé","750ml"] },
  { slug:"casal-garcia-sweet", category:"vinhos", name:"VH Casal Garcia Sweet Tinto 750ml", old_price:99.99, pix_price:69.99, installments:"3x de R$ 24,71", credit_price:"R$ 73,67 no crédito", tags:["Tinto","Portugal","750ml"] },

  /* ─── CERVEJAS ─── */
  { slug:"devassa-latao", category:"cervejas", name:"Cerveja Devassa Puro Malte Latão 473ml", old_price:7.99, pix_price:5.50, installments:"3x de R$ 1,94", credit_price:"R$ 5,79 no crédito", tags:["Latão 473ml","Devassa","Puro Malte"] },
  { slug:"spaten-long-355", category:"cervejas", name:"Cerveja Spaten Puro Malte Long Neck 355ml", old_price:8.99, pix_price:5.99, installments:"3x de R$ 2,11", credit_price:"R$ 6,31 no crédito", tags:["Long Neck","Spaten","Puro Malte"] },
  { slug:"budweiser-long-330", category:"cervejas", name:"Cerveja Budweiser Long Neck 330ml", old_price:8.50, pix_price:5.90, installments:"3x de R$ 2,08", credit_price:"R$ 6,21 no crédito", tags:["Long Neck","Budweiser"] },
  { slug:"stella-long-330", category:"cervejas", name:"Cerveja Stella Artois Long Neck 330ml", old_price:11.90, pix_price:7.90, installments:"3x de R$ 2,79", credit_price:"R$ 8,32 no crédito", tags:["Long Neck","Stella Artois"] },
  { slug:"skol-latao-473", category:"cervejas", name:"Cerveja Skol Latão 473ml", old_price:7.99, pix_price:5.50, installments:"3x de R$ 1,94", credit_price:"R$ 5,79 no crédito", tags:["Latão 473ml","Skol"] },
  { slug:"original-latao-473", category:"cervejas", name:"Cerveja Original Latão 473ml", old_price:8.99, pix_price:6.25, installments:"3x de R$ 2,21", credit_price:"R$ 6,58 no crédito", tags:["Latão 473ml","Original"] },
  { slug:"brahma-latao-473", category:"cervejas", name:"Cerveja Brahma Chopp Latão 473ml", old_price:8.50, pix_price:5.75, installments:"3x de R$ 2,03", credit_price:"R$ 6,05 no crédito", tags:["Latão 473ml","Brahma"] },
  { slug:"heineken-long-330", category:"cervejas", name:"Cerveja Heineken Long Neck 330ml", old_price:10.90, pix_price:7.20, installments:"3x de R$ 2,54", credit_price:"R$ 7,58 no crédito", tags:["Long Neck","Heineken"] },
  { slug:"heineken-lata-350", category:"cervejas", name:"Cerveja Heineken Lata 350ml", old_price:9.90, pix_price:6.75, installments:"3x de R$ 2,38", credit_price:"R$ 7,11 no crédito", tags:["Lata 350ml","Heineken"] },
  { slug:"amstel-latao-473", category:"cervejas", name:"Cerveja Amstel Lager Puro Malte Latão 473ml", old_price:8.50, pix_price:5.90, installments:"3x de R$ 2,08", credit_price:"R$ 6,21 no crédito", tags:["Latão 473ml","Amstel"] },
  { slug:"corona-long-330", category:"cervejas", name:"Cerveja Corona Extra Long Neck 330ml", old_price:10.50, pix_price:7.20, installments:"3x de R$ 2,54", credit_price:"R$ 7,58 no crédito", tags:["Long Neck","Corona"] },
  { slug:"budweiser-latao-473", category:"cervejas", name:"Cerveja Budweiser Latão 473ml", old_price:8.50, pix_price:5.90, installments:"3x de R$ 2,08", credit_price:"R$ 6,21 no crédito", tags:["Latão 473ml","Budweiser"] },
  { slug:"beats-red-mix", category:"cervejas", name:"Cerveja Beats Red Mix 269ml", old_price:11.99, pix_price:7.99, installments:"3x de R$ 2,82", credit_price:"R$ 8,41 no crédito", tags:["Long Neck","Beats"] },
  { slug:"blue-moon-latao", category:"cervejas", name:"Cerveja Blue Moon Belgian White 350ml", old_price:13.90, pix_price:9.50, installments:"3x de R$ 3,35", credit_price:"R$ 10,00 no crédito", tags:["Lata 350ml","Especial","Blue Moon"] },
  { slug:"brahma-duplo-malte", category:"cervejas", name:"Cerveja Brahma Duplo Malte Lata 350ml", old_price:6.50, pix_price:4.25, installments:"3x de R$ 1,50", credit_price:"R$ 4,47 no crédito", tags:["Lata 350ml","Brahma"] },
  { slug:"spaten-latao-473", category:"cervejas", name:"Cerveja Spaten Puro Malte Latão 473ml", old_price:9.99, pix_price:6.90, installments:"3x de R$ 2,44", credit_price:"R$ 7,26 no crédito", tags:["Latão 473ml","Spaten","Puro Malte"] },
  { slug:"cerpa-long-350", category:"cervejas", name:"Cerveja Cerpa Export Long Neck 350ml", old_price:9.90, pix_price:6.50, installments:"3x de R$ 2,29", credit_price:"R$ 6,84 no crédito", tags:["Long Neck","Cerpa"] },
  { slug:"eisenbahn-pilsen", category:"cervejas", name:"Cerveja Eisenbahn Pilsen 350ml", old_price:8.90, pix_price:5.90, installments:"3x de R$ 2,08", credit_price:"R$ 6,21 no crédito", tags:["Lata 350ml","Especial","Eisenbahn"] },

  /* ─── ESPUMANTES ─── */
  { slug:"rio-sol-demi-sec", category:"espumantes", name:"Espumante Rio Sol Demi-Sec 750ml", old_price:69.90, pix_price:45.99, installments:"3x de R$ 16,23", credit_price:"R$ 48,41 no crédito", tags:["Demi-Sec","Rio Sol","750ml"] },
  { slug:"chandon-brut", category:"espumantes", name:"Espumante Chandon Brut 750ml", old_price:159.99, pix_price:119.99, installments:"3x de R$ 42,35", credit_price:"R$ 126,30 no crédito", tags:["Brut","Chandon","750ml"] },
  { slug:"casa-perini-aquarela", category:"espumantes", name:"Espumante Casa Perini Aquarela 750ml", old_price:79.90, pix_price:53.90, installments:"3x de R$ 19,02", credit_price:"R$ 56,74 no crédito", tags:["Rosé","Casa Perini","750ml"] },
  { slug:"casa-perini-brut", category:"espumantes", name:"Espumante Casa Perini Brut 750ml", old_price:79.90, pix_price:53.90, installments:"3x de R$ 19,02", credit_price:"R$ 56,74 no crédito", tags:["Brut","Casa Perini","750ml"] },
  { slug:"rio-sol-moscatel", category:"espumantes", name:"Espumante Rio Sol Moscatel 750ml", old_price:74.90, pix_price:48.90, installments:"3x de R$ 17,25", credit_price:"R$ 51,47 no crédito", tags:["Moscatel","Rio Sol","750ml"] },
  { slug:"campo-largo", category:"espumantes", name:"Espumante Campo Largo 750ml", old_price:74.90, pix_price:48.90, installments:"3x de R$ 17,25", credit_price:"R$ 51,47 no crédito", tags:["Brut","Campo Largo","750ml"] },
  { slug:"casa-perini-moscatel", category:"espumantes", name:"Espumante Casa Perini Moscatel 750ml", old_price:79.90, pix_price:53.90, installments:"3x de R$ 19,02", credit_price:"R$ 56,74 no crédito", tags:["Moscatel","Casa Perini","750ml"] },
  { slug:"chandon-pass-rose", category:"espumantes", name:"Espumante Chandon Passion Rosé 750ml", old_price:159.99, pix_price:115.00, installments:"3x de R$ 40,59", credit_price:"R$ 121,05 no crédito", tags:["Rosé","Chandon","750ml"] },
  { slug:"chandon-baby-brut", category:"espumantes", name:"Espumante Chandon Baby Reserva Brut 187ml", old_price:49.90, pix_price:32.55, installments:"3x de R$ 11,49", credit_price:"R$ 34,26 no crédito", tags:["Brut","Chandon","187ml"] },

  /* ─── WHISKY ─── */
  { slug:"jw-red-1l", category:"whisky", name:"Whisky Johnnie Walker Red Label 1L", old_price:179.90, pix_price:125.90, installments:"3x de R$ 44,44", credit_price:"R$ 132,53 no crédito", tags:["Johnnie Walker","1L","Escócia"] },
  { slug:"jack-daniels-fire-1l", category:"whisky", name:"Whisky Jack Daniel's Fire 1L", old_price:249.90, pix_price:179.90, installments:"3x de R$ 63,49", credit_price:"R$ 189,37 no crédito", tags:["Jack Daniels","1L","EUA"] },
  { slug:"grand-old-parr-1l", category:"whisky", name:"Whisky Grand Old Parr 12 Anos 1L", old_price:259.90, pix_price:185.90, installments:"3x de R$ 65,58", credit_price:"R$ 195,68 no crédito", tags:["Grand Old Parr","1L","12 Anos","Escócia"] },
  { slug:"chivas-regal-1l", category:"whisky", name:"Whisky Chivas Regal 12 Anos 1L", old_price:249.90, pix_price:175.90, installments:"3x de R$ 62,07", credit_price:"R$ 185,16 no crédito", tags:["Chivas Regal","1L","12 Anos","Escócia"] },
  { slug:"grand-old-parr-750", category:"whisky", name:"Whisky Grand Old Parr 12 Anos 750ml", old_price:249.90, pix_price:175.00, installments:"3x de R$ 61,76", credit_price:"R$ 184,21 no crédito", tags:["Grand Old Parr","750ml","12 Anos","Escócia"] },

  /* ─── VODKA ─── */
  { slug:"smirnoff-998", category:"vodka", name:"Vodka Smirnoff Tridestilada 998ml", old_price:79.90, pix_price:52.90, installments:"3x de R$ 18,67", credit_price:"R$ 55,68 no crédito", tags:["Smirnoff","Original","998ml"] },
  { slug:"smirnoff-ice-275", category:"vodka", name:"Smirnoff Ice Original 275ml", old_price:12.99, pix_price:8.99, installments:"3x de R$ 3,17", credit_price:"R$ 9,46 no crédito", tags:["Smirnoff","Ice","Original","275ml"] },
  { slug:"smirnoff-ice-269", category:"vodka", name:"Smirnoff Ice Original Lata 269ml", old_price:11.90, pix_price:8.50, installments:"3x de R$ 3,00", credit_price:"R$ 8,95 no crédito", tags:["Smirnoff","Ice","Original","269ml"] },
  { slug:"smirnoff-ice-green-269", category:"vodka", name:"Smirnoff Ice Green Apple Lata 269ml", old_price:11.90, pix_price:8.50, installments:"3x de R$ 3,00", credit_price:"R$ 8,95 no crédito", tags:["Smirnoff","Ice","Green Apple","269ml"] },

  /* ─── GIN ─── */
  { slug:"gin-rocks-1l", category:"gin", name:"Gin Rocks 1L", old_price:69.90, pix_price:45.00, installments:"3x de R$ 15,88", credit_price:"R$ 47,37 no crédito", tags:["Rocks","1L"] },
  { slug:"gin-larios-700", category:"gin", name:"Gin Larios Mediterránea 700ml", old_price:89.90, pix_price:59.99, installments:"3x de R$ 21,18", credit_price:"R$ 63,15 no crédito", tags:["Larios","700ml","Espanha"] },
  { slug:"gin-intencion-maca", category:"gin", name:"Gin Intencion Maçã Verde 900ml", old_price:39.90, pix_price:25.50, installments:"3x de R$ 9,00", credit_price:"R$ 26,84 no crédito", tags:["Intencion","900ml","Brasil"] },
  { slug:"gin-intencion-morango", category:"gin", name:"Gin Intencion Morango 900ml", old_price:39.90, pix_price:25.50, installments:"3x de R$ 9,00", credit_price:"R$ 26,84 no crédito", tags:["Intencion","900ml","Brasil"] },

  /* ─── DESTILADOS ─── */
  { slug:"aperol-750", category:"destilados", name:"Aperol Aperitivo 750ml", old_price:139.90, pix_price:90.00, installments:"3x de R$ 31,76", credit_price:"R$ 94,74 no crédito", tags:["Aperitivo","Aperol","750ml","Itália"] },
  { slug:"bacardi-branca-980", category:"destilados", name:"Rum Bacardi Carta Blanca 980ml", old_price:69.90, pix_price:43.99, installments:"3x de R$ 15,53", credit_price:"R$ 46,31 no crédito", tags:["Rum","Bacardi","980ml"] },
  { slug:"bacardi-big-apple", category:"destilados", name:"Rum Bacardi Big Apple 980ml", old_price:69.90, pix_price:43.99, installments:"3x de R$ 15,53", credit_price:"R$ 46,31 no crédito", tags:["Rum","Bacardi","980ml"] },
  { slug:"pitu-latao-473", category:"destilados", name:"Cachaça Pitú Latão 473ml", old_price:13.90, pix_price:8.50, installments:"3x de R$ 3,00", credit_price:"R$ 8,95 no crédito", tags:["Cachaça","Pitu","473ml"] },
  { slug:"weber-haus-premium", category:"destilados", name:"Cachaça Weber Haus Premium 5 Anos 750ml", old_price:149.90, pix_price:99.90, installments:"3x de R$ 35,26", credit_price:"R$ 105,16 no crédito", tags:["Cachaça","Weber Haus","750ml","Premium"] },
  { slug:"pitu-mel-limao", category:"destilados", name:"Pitú Mel e Limão Lata 350ml", old_price:12.90, pix_price:7.90, installments:"3x de R$ 2,79", credit_price:"R$ 8,32 no crédito", tags:["Cachaça","Pitu","350ml"] },
  { slug:"pitu-limao", category:"destilados", name:"Pitú Limão Lata 350ml", old_price:12.90, pix_price:7.90, installments:"3x de R$ 2,79", credit_price:"R$ 8,32 no crédito", tags:["Cachaça","Pitu","350ml"] },

  /* ─── KITS ─── */
  { slug:"kit-vinho-presente", category:"kits", name:"Kit Presente — Vinho + Taça", old_price:249.90, pix_price:169.90, installments:"3x de R$ 59,96", credit_price:"R$ 178,84 no crédito", tags:["Presente","Vinho","Médio"] },
  { slug:"kit-espumante-celebracao", category:"kits", name:"Kit Celebração — Espumante + Taças", old_price:299.90, pix_price:199.90, installments:"3x de R$ 70,58", credit_price:"R$ 210,42 no crédito", tags:["Celebração","Espumante","Médio"] },
  { slug:"kit-whisky-executivo", category:"kits", name:"Kit Executivo — Whisky + Copo", old_price:549.90, pix_price:369.90, installments:"3x de R$ 130,53", credit_price:"R$ 389,37 no crédito", tags:["Presente","Whisky","Premium"] },
  { slug:"kit-cerveja-petisco", category:"kits", name:"Kit Fim de Semana — Cervejas + Petiscos", old_price:129.90, pix_price:89.90, installments:"3x de R$ 31,72", credit_price:"R$ 94,63 no crédito", tags:["Presente","Cerveja","Médio"] },
  { slug:"kit-gin-tonica", category:"kits", name:"Kit Drink em Casa — Gin + Tônica", old_price:179.90, pix_price:119.90, installments:"3x de R$ 42,32", credit_price:"R$ 126,21 no crédito", tags:["Presente","Gin","Médio"] },
  { slug:"kit-vinho-casal", category:"kits", name:"Kit Casal — 2 Vinhos + Embalagem", old_price:399.90, pix_price:269.90, installments:"3x de R$ 95,26", credit_price:"R$ 284,10 no crédito", tags:["Presente","Vinho","Premium"] }
];
JSDATA
echo "✅ store-data.js atualizado com produtos reais"

# ─────────────────────────────────────────────
# 3. store-catalog.js — renderizador com badge OFF agressivo
# ─────────────────────────────────────────────
cat > assets/js/store-catalog.js << 'JSCAT'
(function () {
  const CATS     = window.MADAWIN_CATEGORIES || {};
  const PRODUCTS = window.MADAWIN_PRODUCTS   || [];
  const WA_BASE  = "https://wa.me/5581996787177?text=";

  function brl(v) {
    return Number(v).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  }

  function offPct(old_price, pix_price) {
    if (!old_price || !pix_price || old_price <= pix_price) return 0;
    return Math.round(((old_price - pix_price) / old_price) * 100);
  }

  function waMsg(name) {
    return WA_BASE + encodeURIComponent("Olá! Quero comprar: " + name + " — Mada Wine & Beer");
  }

  function productCard(p) {
    const icon = (CATS[p.category] && CATS[p.category].icon) ? CATS[p.category].icon : "🍷";
    const off  = offPct(p.old_price, p.pix_price);
    const badge = off >= 5 ? '<div class="mw-off-badge">' + off + '% OFF</div>' : "";
    return '<article class="mw-price-card">'
      + '<div class="mw-price-card__image">' + badge + icon + '</div>'
      + '<div class="mw-price-card__body">'
      + '<div class="mw-price-card__name">' + p.name + '</div>'
      + '<div class="mw-price-card__meta">' + (p.tags || []).join(" • ") + '</div>'
      + '<div class="mw-price-block">'
      + (p.old_price ? '<div class="mw-old-price">De: ' + brl(p.old_price) + '</div>' : "")
      + '<div class="mw-main-price">por: <strong>' + brl(p.pix_price) + '</strong> <span>no PIX</span></div>'
      + (p.installments ? '<div class="mw-installments">ou ' + p.installments + ' no cartão</div>' : "")
      + (p.credit_price ? '<div class="mw-credit">' + p.credit_price + '</div>' : "")
      + '</div>'
      + '<div class="mw-card-actions">'
      + '<a class="mw-btn mw-btn--line" href="/' + p.category + '/">Ver categoria</a>'
      + '<a class="mw-btn mw-btn--solid" href="' + waMsg(p.name) + '" target="_blank" rel="noopener">🛒 Comprar</a>'
      + '</div></div></article>';
  }

  function categoryCard(slug, cat) {
    return '<a class="mw-category-card" href="/' + slug + '/">'
      + '<div class="mw-category-card__icon">' + cat.icon + '</div>'
      + '<div class="mw-category-card__title">' + cat.title + '</div>'
      + '<div class="mw-category-card__text">' + cat.subtitle + '</div>'
      + '</a>';
  }

  function getQuery(name) {
    return new URLSearchParams(location.search).get(name) || "";
  }

  function buildHome() {
    var best = document.getElementById("mw-best-offers-grid");
    var feat = document.getElementById("mw-featured-grid");
    if (best) {
      best.innerHTML = Object.entries(CATS).map(function(e){ return categoryCard(e[0], e[1]); }).join("");
    }
    if (feat) {
      var featured = Object.keys(CATS).reduce(function(acc, slug){
        return acc.concat(PRODUCTS.filter(function(p){ return p.category === slug; }).slice(0, 2));
      }, []).slice(0, 12);
      feat.innerHTML = featured.map(productCard).join("");
    }
    var form  = document.getElementById("mw-home-search-form");
    var input = document.getElementById("mw-home-search-input");
    if (form && input) {
      form.addEventListener("submit", function(e){
        e.preventDefault();
        var q = input.value.trim();
        if (q) location.href = "/vinhos/?q=" + encodeURIComponent(q);
      });
    }
  }

  function buildCategoryPage() {
    var container = document.getElementById("mw-category-grid");
    if (!container) return;

    var slug = document.body.dataset.category;
    var list = PRODUCTS.filter(function(p){ return p.category === slug; });
    var q    = getQuery("q").toLowerCase().trim();
    if (q) {
      list = list.filter(function(p){
        return p.name.toLowerCase().indexOf(q) !== -1 ||
               (p.tags || []).join(" ").toLowerCase().indexOf(q) !== -1;
      });
    }

    var count    = document.getElementById("mw-category-count");
    var title    = document.getElementById("mw-category-title");
    var subtitle = document.getElementById("mw-category-subtitle");
    if (title)    title.textContent    = (CATS[slug] && CATS[slug].title)    || "Categoria";
    if (subtitle) subtitle.textContent = (CATS[slug] && CATS[slug].subtitle) || "";
    if (count)    count.textContent    = list.length + " produto(s) encontrado(s)";

    var filtersWrap = document.getElementById("mw-filters");
    if (filtersWrap) {
      var tags = [];
      list.forEach(function(p){ (p.tags||[]).forEach(function(t){ if(tags.indexOf(t)===-1) tags.push(t); }); });
      filtersWrap.innerHTML = '<button class="mw-filter-chip is-active" type="button" data-tag="">Todos</button>'
        + tags.map(function(t){ return '<button class="mw-filter-chip" type="button" data-tag="' + t + '">' + t + '</button>'; }).join("");
      filtersWrap.querySelectorAll(".mw-filter-chip").forEach(function(btn){
        btn.addEventListener("click", function(){
          filtersWrap.querySelectorAll(".mw-filter-chip").forEach(function(x){ x.classList.remove("is-active"); });
          btn.classList.add("is-active");
          var tag      = btn.dataset.tag;
          var filtered = tag ? list.filter(function(p){ return (p.tags||[]).indexOf(tag) !== -1; }) : list;
          container.innerHTML = filtered.map(productCard).join("");
          if (count) count.textContent = filtered.length + " produto(s) encontrado(s)";
        });
      });
    }

    container.innerHTML = list.map(productCard).join("");

    var sForm  = document.getElementById("mw-cat-search-form");
    var sInput = document.getElementById("mw-cat-search-input");
    if (sForm && sInput) {
      if (q) sInput.value = q;
      sForm.addEventListener("submit", function(e){
        e.preventDefault();
        var qq = sInput.value.trim();
        location.href = location.pathname + (qq ? "?q=" + encodeURIComponent(qq) : "");
      });
    }
  }

  document.addEventListener("DOMContentLoaded", function(){
    buildHome();
    buildCategoryPage();
  });
})();
JSCAT
echo "✅ store-catalog.js atualizado com badge OFF"

# ─────────────────────────────────────────────
# 4. CSS — badge OFF + cor corrigida
# ─────────────────────────────────────────────
# Remover bloco anterior se já foi aplicado (idempotente)
python3 - << 'PY'
with open("assets/css/store-catalog.css", "r") as f:
    css = f.read()
marker = "/* ─── Badge OFF agressivo ─── */"
if marker in css:
    css = css[:css.index(marker)]
    with open("assets/css/store-catalog.css", "w") as f:
        f.write(css)
    print("  (bloco OFF anterior removido para reaplicar)")
PY

cat >> assets/css/store-catalog.css << 'ADDCSS'

/* ─── Badge OFF agressivo ─── */
.mw-price-card__image {
  position: relative;
}
.mw-off-badge {
  position: absolute;
  top: 12px;
  left: 12px;
  background: #d4000a;
  color: #fff;
  font-weight: 900;
  font-size: 13px;
  padding: 4px 10px;
  border-radius: 999px;
  letter-spacing: .04em;
  box-shadow: 0 3px 10px rgba(212,0,10,.35);
  z-index: 2;
}
/* Cor do preço principal — verde Mada */
.mw-main-price strong {
  color: #0a5e30 !important;
}
/* Filtro ativo */
.mw-filter-chip.is-active {
  background: #0d572f;
  color: #fff;
  border-color: #0d572f;
}
ADDCSS
echo "✅ store-catalog.css: badge OFF aplicado"

# ─────────────────────────────────────────────
# 5. Subpáginas — header padronizado (todas as 8)
# ─────────────────────────────────────────────
python3 - << 'PY'
import os
from urllib.parse import quote

CATS = {
    "vinhos":     "Vinhos",
    "cervejas":   "Cervejas",
    "espumantes": "Espumantes",
    "whisky":     "Whisky",
    "vodka":      "Vodka",
    "gin":        "Gin",
    "destilados": "Destilados",
    "kits":       "Kits",
}

TPL = """\
<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{title} | Mada Wine & Beer</title>
  <meta name="description" content="Confira {title_lower} com preços e promoções na Mada Wine & Beer. Exclusivo para maiores de 18 anos.">
  <meta name="theme-color" content="#073b24">
  <link rel="stylesheet" href="/assets/css/style.css">
  <link rel="stylesheet" href="/assets/css/store-catalog.css">
</head>
<body data-category="{slug}">

  <div class="top-warning">
    Venda e consumo de bebidas alcoólicas proibidos para menores de 18 anos. Beba com responsabilidade.
  </div>

  <header class="site-header">
    <div class="container header-grid">
      <a class="brand" href="/" aria-label="Mada Wine & Beer — início">
        <span class="brand-shield">M</span>
        <span>
          <strong>Mada Wine &amp; Beer</strong>
          <small>madawin.com.br</small>
        </span>
      </a>
      <form class="mw-search-inline" id="mw-cat-search-form" style="flex:1;max-width:560px;margin:0;" aria-label="Buscar produto">
        <input id="mw-cat-search-input" type="search" placeholder="Buscar em {title_lower}...">
        <button class="mw-btn mw-btn--solid" type="submit">Buscar</button>
      </form>
      <div class="header-actions">
        <a class="instagram-top" href="https://www.instagram.com/madawinebeer/" target="_blank" rel="noopener" aria-label="Instagram Mada Wine & Beer">
          <span class="instagram-icon" aria-hidden="true"></span>
          Instagram
        </a>
        <a class="gold-link" href="https://wa.me/5581996787177?text=Ol%C3%A1%2C+gostaria+de+consultar+{title_enc}+na+Mada+Wine+%26+Beer." target="_blank" rel="noopener">WhatsApp</a>
      </div>
    </div>
    <nav class="category-nav" aria-label="Categorias">
      <div class="container nav-scroll">
        <a href="/">Home</a>
        <a href="/whisky/">Whisky</a>
        <a href="/vinhos/">Vinhos</a>
        <a href="/cervejas/">Cervejas</a>
        <a href="/espumantes/">Espumantes</a>
        <a href="/vodka/">Vodka</a>
        <a href="/gin/">Gin</a>
        <a href="/destilados/">Destilados</a>
        <a href="/kits/">Kits</a>
      </div>
    </nav>
  </header>

  <div class="mw-catalog-layout">
    <aside class="mw-sidebar">
      <h3>Filtrar</h3>
      <div id="mw-filters" class="mw-filter-list"></div>
    </aside>
    <main>
      <div class="mw-cat-head">
        <div>
          <h1 id="mw-category-title"></h1>
          <div id="mw-category-subtitle" class="mw-cat-subtitle"></div>
        </div>
        <div id="mw-category-count" class="mw-count"></div>
      </div>
      <div id="mw-category-grid" class="mw-price-grid"></div>
    </main>
  </div>

  <a class="whatsapp-float"
     href="https://wa.me/5581996787177?text=Ol%C3%A1%2C+gostaria+de+consultar+{title_enc}+na+Mada+Wine+%26+Beer."
     target="_blank" rel="noopener" aria-label="WhatsApp Mada Wine &amp; Beer">
    <span class="whatsapp-bar-icon" aria-hidden="true">&#127867;</span>
    <span><strong>Dúvidas sobre {title_lower}?</strong> Fale no WhatsApp.</span>
  </a>

  <footer class="site-footer">
    <div class="container footer-grid">
      <div>
        <strong>Mada Wine &amp; Beer</strong>
        <span>madawin.com.br</span>
      </div>
      <p>Venda e consumo de bebidas alcoólicas proibidos para menores de 18 anos. Beba com responsabilidade.</p>
    </div>
  </footer>

  <script src="/assets/js/store-data.js"></script>
  <script src="/assets/js/store-catalog.js"></script>
</body>
</html>
"""

for slug, title in CATS.items():
    os.makedirs(slug, exist_ok=True)
    html = TPL.replace("{slug}", slug)\
              .replace("{title}", title)\
              .replace("{title_lower}", title.lower())\
              .replace("{title_enc}", quote(title))
    with open(f"{slug}/index.html", "w", encoding="utf-8") as f:
        f.write(html)
    print(f"  ✅ {slug}/index.html")
PY
echo "✅ Subpáginas geradas e padronizadas"

# ─────────────────────────────────────────────
# 6. Garantir CNAME e .nojekyll intactos
# ─────────────────────────────────────────────
echo "madawin.com.br" > CNAME
touch .nojekyll
echo "✅ CNAME e .nojekyll preservados"

# ─────────────────────────────────────────────
# 7. DIAGNÓSTICO FINAL
# ─────────────────────────────────────────────
echo ""
echo "══════════════════════════════════════════════"
echo " DIAGNÓSTICO FINAL"
echo "══════════════════════════════════════════════"
echo ""
echo "— Produtos por categoria em store-data.js:"
python3 - << 'PY'
import re
from collections import Counter
txt = open("assets/js/store-data.js").read()
cats = re.findall(r'category:"([^"]+)"', txt)
for cat, n in sorted(Counter(cats).items()):
    print(f"  {n:3d}  {cat}")
print(f"  ---  {sum(Counter(cats).values())} total")
PY

echo ""
echo "— Links nas subpáginas (deve ser /slug/):"
grep -roh 'href="/[a-z][^"]*"' vinhos cervejas espumantes whisky vodka gin destilados kits 2>/dev/null | grep -v assets | sort -u

echo ""
echo "— Links antigos tipo href=\"#vinhos\" (deve estar vazio = OK):"
grep -rn 'href="#vinhos\|href="#cervejas\|href="#kits\|href="#catalogo\|href="#whisky' \
  vinhos cervejas espumantes whisky vodka gin destilados kits 2>/dev/null \
  || echo "  Nenhum link antigo — OK ✅"

echo ""
echo "— CNAME: $(cat CNAME)"
echo "— .nojekyll: $([ -f .nojekyll ] && echo 'presente ✅' || echo 'AUSENTE ❌')"
echo ""
git status
echo ""
echo "══════════════════════════════════════════════"
echo " PATCH CONCLUÍDO"
echo " Para testar: python3 -m http.server 8080"
echo " Para publicar:"
echo "   git add ."
echo "   git commit -m 'Corrige catalogo, OFF e subpaginas - Mada Wine Beer'"
echo "   git push origin main"
echo "══════════════════════════════════════════════"
