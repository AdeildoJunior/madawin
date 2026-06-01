(function () {
  const CATS     = window.MADAWIN_CATEGORIES || {};
  const PRODUCTS = window.MADAWIN_PRODUCTS   || [];
  const WA_BASE  = "https://wa.me/5581996787177?text=";

  // Silhuetas de linha (substituem o emoji "infantil" no card sem foto)
  var LINE_ICONS = {
    vinhos: '<path d="M10 2.5h4M11 2.5v2.8c0 .7-.2 1.3-.7 1.9L9.1 8.7c-.5.6-.7 1.2-.7 1.9V19.5A1.6 1.6 0 0 0 10 21.1h4A1.6 1.6 0 0 0 15.6 19.5V10.5c0-.7-.2-1.3-.7-1.9l-1.2-1.5c-.5-.6-.7-1.2-.7-1.9V2.5"/><path d="M8.4 13h7.2"/>',
    cervejas: '<path d="M7 7.5h8.5v12.5a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V7.5z"/><path d="M15.5 9.5H18a1.6 1.6 0 0 1 1.6 1.6v3.6A1.6 1.6 0 0 1 18 16.3h-2.5"/><path d="M7 7.5c0-1.7 1.1-2.8 2.8-2.8S12.6 5.8 12.6 7.5"/>',
    espumantes: '<path d="M8.5 3.5l1 6.2a2 2 0 0 0 1.5 1.6V20M8.5 20h4"/><path d="M15.5 3.5l-1 6.2a2 2 0 0 1-1.5 1.6"/>',
    whisky: '<path d="M6.5 6.5h11l-1.1 12.4a1 1 0 0 1-1 .9H8.6a1 1 0 0 1-1-.9L6.5 6.5z"/><path d="M8 12.5c2.2-1.1 5.8-1.1 8 0"/>',
    destilados: '<path d="M10 2.5h4M11 2.5v2.8c0 .7-.2 1.3-.7 1.9L9.1 8.7c-.5.6-.7 1.2-.7 1.9V19.5A1.6 1.6 0 0 0 10 21.1h4A1.6 1.6 0 0 0 15.6 19.5V10.5c0-.7-.2-1.3-.7-1.9l-1.2-1.5c-.5-.6-.7-1.2-.7-1.9V2.5"/>',
    kits: '<rect x="4" y="9.5" width="16" height="11" rx="1.2"/><path d="M4 13.5h16M12 9.5v11M12 9.5C10 6 6.5 6.3 6.5 8.3S9.8 9.5 12 9.5zM12 9.5C14 6 17.5 6.3 17.5 8.3S14.2 9.5 12 9.5z"/>'
  };
  LINE_ICONS.vodka = LINE_ICONS.destilados;
  LINE_ICONS.gin   = LINE_ICONS.destilados;

  function lineIcon(cat) {
    var p = LINE_ICONS[cat] || LINE_ICONS.destilados;
    return '<svg class="mw-bottle-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" '
      + 'stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + p + '</svg>';
  }

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
      + '<span class="mw-fallback__icon">' + lineIcon(p.category) + '</span>'
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
