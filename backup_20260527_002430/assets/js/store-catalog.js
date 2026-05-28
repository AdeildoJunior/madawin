(function () {
  const CATS = window.MADAWIN_CATEGORIES || {};
  const PRODUCTS = window.MADAWIN_PRODUCTS || [];
  const WHATSAPP_BASE = "https://wa.me/5581996787177?text=";

  function waLink(text) {
    return WHATSAPP_BASE + encodeURIComponent(text);
  }

  function productCard(p) {
    const cat = CATS[p.category] || {};
    const icon = cat.icon || "🛒";
    const msg = `Olá, gostaria de consultar disponibilidade de: ${p.name} na Mada Wine & Beer.`;

    return `
      <article class="mw-product-card">
        <div class="mw-product-card__visual">${icon}</div>
        <div class="mw-product-card__body">
          <h3>${p.name}</h3>
          <p>${p.detail}</p>
          <div class="mw-product-tags">
            <span>${cat.title || p.category}</span>
            ${(p.tags || []).map(t => `<span>${t}</span>`).join("")}
          </div>
          <a class="mw-btn mw-btn--solid" href="${waLink(msg)}" target="_blank" rel="noopener">
            Consultar disponibilidade
          </a>
        </div>
      </article>
    `;
  }

  function categoryCard(slug, cat) {
    return `
      <a class="mw-category-card" href="/${slug}/">
        <div class="mw-category-card__icon">${cat.icon || "🛒"}</div>
        <div class="mw-category-card__title">${cat.title || slug}</div>
        <div class="mw-category-card__text">${cat.subtitle || ""}</div>
      </a>
    `;
  }

  function buildHome() {
    const cats = document.getElementById("mw-best-offers-grid");
    const featured = document.getElementById("mw-featured-grid");

    if (cats) {
      cats.innerHTML = Object.entries(CATS).map(([slug, cat]) => categoryCard(slug, cat)).join("");
    }

    if (featured) {
      featured.innerHTML = PRODUCTS.slice(0, 12).map(productCard).join("");
    }
  }

  function buildCategoryPage() {
    const grid = document.getElementById("mw-category-grid");
    if (!grid) return;

    const slug = document.body.dataset.category;
    const cat = CATS[slug] || {};
    const title = document.getElementById("mw-category-title");
    const subtitle = document.getElementById("mw-category-subtitle");
    const count = document.getElementById("mw-category-count");
    const filters = document.getElementById("mw-filters");

    let list = PRODUCTS.filter(p => p.category === slug);

    if (title) title.textContent = cat.title || "Categoria";
    if (subtitle) subtitle.textContent = cat.subtitle || "";
    if (count) count.textContent = `${list.length} item(ns) para consulta`;

    if (filters) {
      const tags = [...new Set(list.flatMap(p => p.tags || []))];
      filters.innerHTML = tags.map(t => `<button class="mw-filter-chip" type="button" data-tag="${t}">${t}</button>`).join("");

      filters.querySelectorAll("[data-tag]").forEach(btn => {
        btn.addEventListener("click", () => {
          filters.querySelectorAll("[data-tag]").forEach(x => x.classList.remove("is-active"));
          btn.classList.add("is-active");
          const tag = btn.dataset.tag;
          const filtered = list.filter(p => (p.tags || []).includes(tag));
          grid.innerHTML = filtered.map(productCard).join("");
          if (count) count.textContent = `${filtered.length} item(ns) para consulta`;
        });
      });
    }

    grid.innerHTML = list.map(productCard).join("");
  }

  document.addEventListener("DOMContentLoaded", () => {
    buildHome();
    buildCategoryPage();
  });
})();
