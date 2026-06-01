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
    const imgSrc = p.image || ("/assets/img/products/" + p.slug + ".jpg");
    // Fallback elegante sempre presente; a foto real fica por cima e só
    // aparece se carregar (senão o <img> se remove e mostra o fallback).
    const visual = '<div class="mw-fallback">'
      + '<span class="mw-fallback__icon">' + icon + '</span>'
      + '<span>' + p.name + '</span>'
      + '<small>Foto sob consulta</small>'
      + '</div>'
      + '<img class="mw-photo" src="' + imgSrc + '" alt="' + p.name.replace(/"/g, "&quot;") + '" '
      + 'loading="lazy" onerror="this.remove();">';
    return '<article class="mw-price-card">'
      + '<div class="mw-price-card__image">' + badge + visual + '</div>'
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
