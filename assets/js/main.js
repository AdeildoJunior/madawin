document.addEventListener("DOMContentLoaded", () => {
  const gate = document.getElementById("ageGate");
  const confirmAge = document.getElementById("confirmAge");

  if (localStorage.getItem("mada-age-ok") === "yes") {
    gate?.classList.add("is-hidden");
  }

  confirmAge?.addEventListener("click", () => {
    localStorage.setItem("mada-age-ok", "yes");
    gate?.classList.add("is-hidden");
  });

  const tickerTrack = document.getElementById("tickerTrack");
  if (tickerTrack && !tickerTrack.dataset.cloned) {
    tickerTrack.innerHTML += tickerTrack.innerHTML;
    tickerTrack.dataset.cloned = "true";
  }

  const slides = Array.from(document.querySelectorAll(".hero-slide"));
  const dotsContainer = document.getElementById("heroDots");
  let currentSlide = 0;
  let slideTimer;

  function renderDots() {
    if (!dotsContainer) return;

    dotsContainer.innerHTML = "";

    slides.forEach((_, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.setAttribute("aria-label", `Ir para o banner ${index + 1}`);
      button.addEventListener("click", () => {
        showSlide(index);
        restartTimer();
      });
      dotsContainer.appendChild(button);
    });
  }

  function showSlide(index) {
    if (!slides.length) return;

    currentSlide = (index + slides.length) % slides.length;

    slides.forEach((slide, i) => {
      const offset = i - currentSlide;
      slide.style.transform = `translateX(${offset * 100}%)`;
      slide.classList.toggle("active", i === currentSlide);
    });

    const dots = dotsContainer ? Array.from(dotsContainer.children) : [];
    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === currentSlide);
    });
  }

  function nextSlide() {
    showSlide(currentSlide + 1);
  }

  function restartTimer() {
    clearInterval(slideTimer);
    slideTimer = setInterval(nextSlide, 4000);
  }

  renderDots();
  showSlide(0);
  restartTimer();

  const productCarousel = document.getElementById("productCarousel");
  const productsPrev = document.getElementById("productsPrev");
  const productsNext = document.getElementById("productsNext");

  function scrollProducts(direction) {
    if (!productCarousel) return;
    const amount = Math.min(340, productCarousel.clientWidth * 0.8);
    productCarousel.scrollBy({
      left: direction * amount,
      behavior: "smooth"
    });
  }

  productsPrev?.addEventListener("click", () => scrollProducts(-1));
  productsNext?.addEventListener("click", () => scrollProducts(1));

  const promoCarousel = document.getElementById("widePromoCarousel");
  const promoPrev = document.getElementById("promoPrev");
  const promoNext = document.getElementById("promoNext");

  function scrollPromo(direction) {
    if (!promoCarousel) return;
    const amount = Math.min(520, promoCarousel.clientWidth * 0.7);
    promoCarousel.scrollBy({
      left: direction * amount,
      behavior: "smooth"
    });
  }

  promoPrev?.addEventListener("click", () => scrollPromo(-1));
  promoNext?.addEventListener("click", () => scrollPromo(1));
});

/* === BUSCA, SUBMENUS E CATÁLOGO MADA WINE & BEER === */
document.addEventListener("DOMContentLoaded", () => {
  const WHATSAPP_NUMBER = "5581996787177";

  const products = [
    {cat:"Whisky", emoji:"🥃", name:"Whisky Johnnie Walker 1L", detail:"Whisky • 1 litro", tags:["whisky","johnnie walker","1l"]},
    {cat:"Whisky", emoji:"🥃", name:"Whisky Jack Daniel's Fire 1L", detail:"Whisky • 1 litro", tags:["whisky","jack daniels","fire"]},
    {cat:"Whisky", emoji:"🥃", name:"Whisky Grand Old Parr 12 anos", detail:"Whisky • 750ml / 1L", tags:["whisky","old parr","12 anos"]},
    {cat:"Whisky", emoji:"🥃", name:"Whisky Chivas Regal 12 anos", detail:"Whisky • 1 litro", tags:["whisky","chivas","12 anos"]},

    {cat:"Vinhos", emoji:"🍷", name:"Vinha Grande Tinto 750ml", detail:"Vinho tinto • 750ml", tags:["vinho","tinto","vinha grande"]},
    {cat:"Vinhos", emoji:"🍷", name:"Freixenet Pinot Grigio 750ml", detail:"Vinho branco • 750ml", tags:["vinho","branco","pinot grigio"]},
    {cat:"Vinhos", emoji:"🍷", name:"Casal Garcia Branco 750ml", detail:"Vinho verde/branco • 750ml", tags:["vinho","casal garcia","branco"]},
    {cat:"Vinhos", emoji:"🍷", name:"Luigi Bosca Malbec 750ml", detail:"Vinho tinto • 750ml", tags:["vinho","malbec","luigi bosca"]},
    {cat:"Vinhos", emoji:"🍷", name:"Esporão Reserva Tinto 750ml", detail:"Vinho tinto • 750ml", tags:["vinho","reserva","esporão"]},
    {cat:"Vinhos", emoji:"🍷", name:"Casillero del Diablo Chardonnay 750ml", detail:"Vinho branco • 750ml", tags:["vinho","casillero","chardonnay"]},

    {cat:"Cervejas", emoji:"🍺", name:"Cerveja Heineken Long Neck 330ml", detail:"Cerveja long neck", tags:["cerveja","heineken","long neck"]},
    {cat:"Cervejas", emoji:"🍺", name:"Cerveja Corona Extra 330ml", detail:"Cerveja long neck", tags:["cerveja","corona","long neck"]},
    {cat:"Cervejas", emoji:"🍺", name:"Cerveja Spaten Puro Malte", detail:"Cerveja lata/long neck", tags:["cerveja","spaten","puro malte"]},
    {cat:"Cervejas", emoji:"🍺", name:"Cerveja Stella Artois", detail:"Cerveja lata/long neck", tags:["cerveja","stella","artois"]},
    {cat:"Cervejas", emoji:"🍺", name:"Cerveja Brahma Chopp Latão", detail:"Cerveja latão", tags:["cerveja","brahma","latão"]},
    {cat:"Cervejas", emoji:"🍺", name:"Cerveja Amstel Lager", detail:"Cerveja latão", tags:["cerveja","amstel","lager"]},

    {cat:"Espumantes", emoji:"🥂", name:"Espumante Chandon Brut 750ml", detail:"Espumante • 750ml", tags:["espumante","chandon","brut"]},
    {cat:"Espumantes", emoji:"🥂", name:"Espumante Casa Perini Brut 750ml", detail:"Espumante • 750ml", tags:["espumante","casa perini","brut"]},
    {cat:"Espumantes", emoji:"🥂", name:"Espumante Rio Sol Demi-Sec 750ml", detail:"Espumante • 750ml", tags:["espumante","rio sol","demi-sec"]},
    {cat:"Espumantes", emoji:"🥂", name:"Espumante Chandon Baby 187ml", detail:"Espumante pequeno • 187ml", tags:["espumante","chandon","baby"]},

    {cat:"Vodka", emoji:"🍸", name:"Vodka Smirnoff Tridestilada 998ml", detail:"Vodka • 998ml", tags:["vodka","smirnoff"]},
    {cat:"Vodka", emoji:"🍸", name:"Smirnoff Ice Original", detail:"Bebida pronta", tags:["vodka","smirnoff ice","ice"]},
    {cat:"Vodka", emoji:"🍸", name:"Schweppes Mixed Spritz", detail:"Bebida pronta em lata", tags:["spritz","schweppes","vodka"]},

    {cat:"Energéticos", emoji:"⚡", name:"Red Bull 250ml", detail:"Energético", tags:["energético","red bull"]},
    {cat:"Energéticos", emoji:"⚡", name:"Monster Energy 473ml", detail:"Energético", tags:["energético","monster"]},
    {cat:"Energéticos", emoji:"⚡", name:"Baly Energy 2L", detail:"Energético", tags:["energético","baly"]},

    {cat:"Sem álcool", emoji:"🥤", name:"Coca-Cola 2L", detail:"Refrigerante", tags:["refrigerante","coca cola"]},
    {cat:"Sem álcool", emoji:"🥤", name:"Guaraná Antarctica 2L", detail:"Refrigerante", tags:["refrigerante","guaraná"]},
    {cat:"Sem álcool", emoji:"💧", name:"Água mineral com ou sem gás", detail:"Água mineral", tags:["água","mineral","sem álcool"]},

    {cat:"Snacks", emoji:"🥜", name:"Amendoins e castanhas", detail:"Petiscos para acompanhar", tags:["amendoim","castanhas","petisco"]},
    {cat:"Snacks", emoji:"🍟", name:"Salgadinhos e batatas", detail:"Snacks diversos", tags:["salgadinho","batata","doritos","ruffles"]},
    {cat:"Snacks", emoji:"🍫", name:"Chocolates e doces", detail:"Doces e conveniência", tags:["chocolate","doces","snickers","kit kat"]},

    {cat:"Kits", emoji:"🎁", name:"Kit vinho para presente", detail:"Monte sob consulta", tags:["kit","presente","vinho"]},
    {cat:"Kits", emoji:"🎁", name:"Kit cervejas e petiscos", detail:"Monte sob consulta", tags:["kit","cerveja","petiscos"]},
    {cat:"Kits", emoji:"🎁", name:"Kit espumante para celebração", detail:"Monte sob consulta", tags:["kit","espumante","presente"]}
  ];

  const categories = ["Todos", "Whisky", "Vinhos", "Cervejas", "Espumantes", "Vodka", "Energéticos", "Sem álcool", "Snacks", "Kits"];
  const categoryHints = {
    "Todos": ["Whisky", "Vinhos", "Cervejas", "Espumantes", "Vodka", "Energéticos", "Sem álcool", "Snacks", "Kits"],
    "Whisky": ["Johnnie Walker", "Jack Daniel's", "Old Parr", "Chivas", "12 anos", "1 litro"],
    "Vinhos": ["Tintos", "Brancos", "Rosés", "Verdes", "Malbec", "Chardonnay"],
    "Cervejas": ["Long neck", "Latão", "Puro malte", "Zero álcool", "Heineken", "Corona"],
    "Espumantes": ["Brut", "Demi-sec", "Moscatel", "Chandon", "Casa Perini", "Rio Sol"],
    "Vodka": ["Smirnoff", "Ice", "Spritz", "Bebidas prontas"],
    "Energéticos": ["Red Bull", "Monster", "Baly", "Flying Horse"],
    "Sem álcool": ["Água", "Refrigerantes", "Sucos", "Coca-Cola", "Guaraná"],
    "Snacks": ["Amendoins", "Salgadinhos", "Batatas", "Chocolates", "Doces"],
    "Kits": ["Presentes", "Vinho + embalagem", "Cerveja + petisco", "Espumante"]
  };

  const searchForm = document.getElementById("productSearchForm");
  const searchInput = document.getElementById("productSearch");
  const searchResults = document.getElementById("searchResults");
  const catalogGrid = document.getElementById("catalogGrid");
  const catalogStatus = document.getElementById("catalogStatus");
  const catalogPills = document.getElementById("catalogFilterPills");
  const megaMenu = document.getElementById("megaMenu");
  const navLinks = Array.from(document.querySelectorAll("[data-nav-category]"));

  let activeCategory = "Todos";
  let activeQuery = "";

  function normalize(text) {
    return String(text || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\\u0300-\\u036f]/g, "");
  }

  function whatsappFor(productName) {
    const msg = `Olá, gostaria de consultar disponibilidade e valor de: ${productName} na Mada Wine & Beer.`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  }

  function matches(product, query) {
    const q = normalize(query);
    if (!q) return true;
    const haystack = normalize([product.name, product.cat, product.detail, ...product.tags].join(" "));
    return haystack.includes(q);
  }

  function filteredProducts() {
    return products.filter((product) => {
      const categoryOk = activeCategory === "Todos" || product.cat === activeCategory;
      const queryOk = matches(product, activeQuery);
      return categoryOk && queryOk;
    });
  }

  function renderPills() {
    if (!catalogPills) return;
    catalogPills.innerHTML = categories.map((cat) => {
      return `<button type="button" class="${cat === activeCategory ? "is-active" : ""}" data-filter-pill="${cat}">${cat}</button>`;
    }).join("");

    catalogPills.querySelectorAll("[data-filter-pill]").forEach((button) => {
      button.addEventListener("click", () => {
        setCategory(button.dataset.filterPill, true);
      });
    });
  }

  function renderCatalog() {
    if (!catalogGrid) return;

    const list = filteredProducts();

    if (catalogStatus) {
      const label = activeCategory === "Todos" ? "todas as categorias" : activeCategory;
      catalogStatus.textContent = `${list.length} opção(ões) em ${label}. Consulte disponibilidade pelo WhatsApp.`;
    }

    catalogGrid.innerHTML = list.map((product) => `
      <article class="catalog-card" data-product-card>
        <div class="catalog-card-visual">${product.emoji}</div>
        <h3>${product.name}</h3>
        <p>${product.detail}</p>
        <div class="catalog-meta">
          <span>${product.cat}</span>
          <span>Consultar disponibilidade</span>
        </div>
        <a href="${whatsappFor(product.name)}" target="_blank" rel="noopener">Consultar no WhatsApp</a>
      </article>
    `).join("");
  }

  function setCategory(category, scroll = false) {
    activeCategory = categories.includes(category) ? category : "Todos";
    activeQuery = "";
    if (searchInput) searchInput.value = "";

    navLinks.forEach((link) => {
      link.classList.toggle("is-active", link.dataset.navCategory === activeCategory);
    });

    renderPills();
    renderCatalog();
    closeSearch();
    closeMega();

    if (scroll) {
      document.getElementById("catalogo")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  function runSearch(query, scroll = false) {
    activeQuery = query.trim();
    activeCategory = "Todos";
    renderPills();
    renderCatalog();
    closeSearch();

    if (scroll) {
      document.getElementById("catalogo")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  function closeSearch() {
    searchResults?.classList.remove("is-open");
  }

  function renderSearchResults(query) {
    if (!searchResults) return;

    const q = query.trim();
    if (!q) {
      closeSearch();
      return;
    }

    const list = products.filter((product) => matches(product, q)).slice(0, 8);

    if (!list.length) {
      searchResults.innerHTML = `<div class="search-empty">Nenhum item encontrado. Tente buscar por vinho, cerveja, whisky, energético ou snacks.</div>`;
      searchResults.classList.add("is-open");
      return;
    }

    searchResults.innerHTML = list.map((product, index) => `
      <button type="button" class="search-result-item" data-search-index="${index}">
        <span>${product.emoji}</span>
        <span>
          <strong>${product.name}</strong>
          <small>${product.detail}</small>
        </span>
        <em>${product.cat}</em>
      </button>
    `).join("");

    searchResults.querySelectorAll("[data-search-index]").forEach((button) => {
      button.addEventListener("click", () => {
        const product = list[Number(button.dataset.searchIndex)];
        activeCategory = product.cat;
        activeQuery = product.name;
        if (searchInput) searchInput.value = product.name;
        renderPills();
        renderCatalog();
        closeSearch();
        document.getElementById("catalogo")?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });

    searchResults.classList.add("is-open");
  }

  function closeMega() {
    megaMenu?.classList.remove("is-open");
    if (megaMenu) megaMenu.innerHTML = "";
  }

  function openMega(category) {
    if (!megaMenu) return;

    const selected = category || "Todos";
    const menuProducts = products
      .filter((product) => selected === "Todos" || product.cat === selected)
      .slice(0, 4);

    const hints = categoryHints[selected] || categories;

    megaMenu.innerHTML = `
      <div class="mega-inner">
        <div class="mega-left">
          <h3>${selected === "Todos" ? "Categorias" : selected}</h3>
          <div class="mega-list">
            ${hints.map((hint) => `<button type="button" data-mega-hint="${hint}">${hint}</button>`).join("")}
          </div>
        </div>

        <div class="mega-products">
          <h3>${selected === "Todos" ? "Mais procurados" : "Sugestões em " + selected}</h3>
          <div class="mega-product-grid">
            ${menuProducts.map((product) => `
              <button type="button" class="mega-product" data-mega-product="${product.name}">
                <span class="emoji">${product.emoji}</span>
                <strong>${product.name}</strong>
                <small>${product.detail}</small>
              </button>
            `).join("")}
          </div>
        </div>
      </div>
    `;

    megaMenu.classList.add("is-open");

    megaMenu.querySelectorAll("[data-mega-hint]").forEach((button) => {
      button.addEventListener("click", () => {
        const hint = button.dataset.megaHint;
        if (categories.includes(hint)) {
          setCategory(hint, true);
        } else {
          runSearch(hint, true);
        }
      });
    });

    megaMenu.querySelectorAll("[data-mega-product]").forEach((button) => {
      button.addEventListener("click", () => {
        runSearch(button.dataset.megaProduct, true);
      });
    });
  }

  navLinks.forEach((link) => {
    link.addEventListener("mouseenter", () => openMega(link.dataset.navCategory));
    link.addEventListener("focus", () => openMega(link.dataset.navCategory));
    link.addEventListener("click", (event) => {
      event.preventDefault();
      setCategory(link.dataset.navCategory, true);
    });
  });

  document.querySelector(".site-header")?.addEventListener("mouseleave", closeMega);

  searchInput?.addEventListener("input", () => {
    renderSearchResults(searchInput.value);
  });

  searchInput?.addEventListener("focus", () => {
    renderSearchResults(searchInput.value);
  });

  searchForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    runSearch(searchInput?.value || "", true);
  });

  document.addEventListener("click", (event) => {
    if (!event.target.closest(".search-box")) closeSearch();
  });

  renderPills();
  renderCatalog();
});
