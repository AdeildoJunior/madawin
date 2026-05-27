(function () {
  const CATS = window.MADAWIN_CATEGORIES || {};
  const PRODUCTS = window.MADAWIN_PRODUCTS || [];
  const WHATSAPP = "https://wa.me/5581996787177?text=";

  function brl(v) {
    if (v === null || v === undefined || v === "") return "";
    return Number(v).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL"
    });
  }

  function waMsg(name) {
    return WHATSAPP + encodeURIComponent(
      "Olá, gostaria de consultar disponibilidade e valor de: " + name + " | Mada Wine & Beer"
    );
  }

  function productCard(p) {
    const cat = CATS[p.category] || {};
    const icon = cat.icon || "🍷";

    const oldPrice = p.old_price
      ? `<div class="mw-old-price">De: ${brl(p.old_price)}</div>`
      : "";

    const pixPrice = p.pix_price
      ? `<div class="mw-main-price">por: <strong>${brl(p.pix_price)}</strong> <span>no pix</span></div>`
      : `<div class="mw-main-price"><strong>Consulte</strong> <span>o valor</span></div>`;

    const installments = p.installments
      ? `<div class="mw-installments">${p.installments}</div>`
      : "";

    const credit = p.credit_price
      ? `<div class="mw-credit">${p.credit_price}</div>`
      : "";

    return `
      <article class="mw-price-card">
        <div class="mw-price-card__image">${icon}</div>

        <div class="mw-price-card__body">
          <div class="mw-price-card__name">${p.name}</div>
          <div class="mw-price-card__meta">${(p.tags || []).join(" • ")}</div>

          <div class="mw-price-block">
            ${oldPrice}
            ${pixPrice}
            ${installments}
            ${credit}
          </div>

          <div class="mw-card-actions">
            <a class="mw-btn mw-btn--line" href="/${p.category}/">Ver categoria</a>
            <a class="mw-btn mw-btn--solid" href="${waMsg(p.name)}" target="_blank" rel="noopener">Consultar no WhatsApp</a>
          </div>
        </div>
      </article>
    `;
  }

  function categoryCard(slug, cat) {
    return `
      <a class="mw-category-card" href="/${slug}/">
        <div class="mw-category-card__icon">${cat.icon || "🍷"}</div>
        <div class="mw-category-card__title">${cat.title || slug}</div>
        <div class="mw-category-card__text">${cat.subtitle || ""}</div>
      </a>
    `;
  }

  function getQuery(name) {
    return new URLSearchParams(location.search).get(name) || "";
  }

  function buildHome() {
    const best = document.getElementById("mw-best-offers-grid");
    const feat = document.getElementById("mw-featured-grid");

    if (best) {
      best.innerHTML = Object.entries(CATS)
        .map(([slug, cat]) => categoryCard(slug, cat))
        .join("");
    }

    if (feat) {
      feat.innerHTML = PRODUCTS.slice(0, 12)
        .map(productCard)
        .join("");
    }

    const searchForm = document.getElementById("mw-home-search-form");
    const searchInput = document.getElementById("mw-home-search-input");

    if (searchForm && searchInput) {
      searchForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const q = searchInput.value.trim();
        if (!q) return;
        location.href = "/vinhos/?q=" + encodeURIComponent(q);
      });
    }
  }

  function buildCategoryPage() {
    const container = document.getElementById("mw-category-grid");
    if (!container) return;

    const slug = document.body.dataset.category;
    let list = PRODUCTS.filter(p => p.category === slug);

    const q = getQuery("q").toLowerCase().trim();
    if (q) {
      list = PRODUCTS.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        (p.tags || []).join(" ").toLowerCase().includes(q)
      );
    }

    const count = document.getElementById("mw-category-count");
    if (count) count.textContent = list.length + " produto(s) encontrado(s)";

    const title = document.getElementById("mw-category-title");
    const subtitle = document.getElementById("mw-category-subtitle");

    if (title) title.textContent = (CATS[slug] && CATS[slug].title) || "Categoria";
    if (subtitle) subtitle.textContent = (CATS[slug] && CATS[slug].subtitle) || "";

    const filtersWrap = document.getElementById("mw-filters");
    if (filtersWrap) {
      const tags = [...new Set(list.flatMap(p => p.tags || []))];

      filtersWrap.innerHTML = tags
        .map(t => `<button class="mw-filter-chip" type="button" data-tag="${t}">${t}</button>`)
        .join("");

      filtersWrap.querySelectorAll(".mw-filter-chip").forEach(btn => {
        btn.addEventListener("click", () => {
          filtersWrap.querySelectorAll(".mw-filter-chip").forEach(x => x.classList.remove("is-active"));
          btn.classList.add("is-active");

          const tag = btn.dataset.tag;
          const filtered = list.filter(p => (p.tags || []).includes(tag));

          container.innerHTML = filtered.map(productCard).join("");
          if (count) count.textContent = filtered.length + " produto(s) encontrado(s)";
        });
      });
    }

    container.innerHTML = list.map(productCard).join("");

    const searchForm = document.getElementById("mw-cat-search-form");
    const searchInput = document.getElementById("mw-cat-search-input");

    if (searchForm && searchInput) {
      if (q) searchInput.value = q;

      searchForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const qq = searchInput.value.trim();
        location.href = location.pathname + (qq ? "?q=" + encodeURIComponent(qq) : "");
      });
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    buildHome();
    buildCategoryPage();
  });
})();
