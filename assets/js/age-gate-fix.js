(function () {
  const ACCEPT_KEY = 'madawin_age_ok';
  const EXIT_URL = 'https://www.google.com/';

  function norm(s) {
    return (s || '')
      .toString()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/\s+/g, ' ')
      .trim();
  }

  function clearOldAgeKeys() {
    const rx = /(age|idade|maior|adult|18|verify|verified)/i;
    try {
      Object.keys(localStorage).forEach(k => {
        if (rx.test(k)) localStorage.removeItem(k);
      });
      Object.keys(sessionStorage).forEach(k => {
        if (rx.test(k)) sessionStorage.removeItem(k);
      });
    } catch (e) {}
  }

  function setAccepted() {
    try {
      localStorage.setItem(ACCEPT_KEY, '1');

      // Compatibilidade com possíveis scripts antigos do site
      localStorage.setItem('ageVerified', 'true');
      localStorage.setItem('over18', 'true');
      localStorage.setItem('isAdult', 'true');
      localStorage.setItem('maior18', 'true');
      localStorage.setItem('madawin_age_verified', 'true');
    } catch (e) {}
  }

  function isAccepted() {
    try {
      return localStorage.getItem(ACCEPT_KEY) === '1';
    } catch (e) {
      return false;
    }
  }

  function looksLikeAgeText(t) {
    t = norm(t);
    return (
      t.includes('18') &&
      (
        t.includes('maior') ||
        t.includes('idade') ||
        t.includes('anos') ||
        t.includes('bebida') ||
        t.includes('alcool')
      )
    );
  }

  function isYesButton(el) {
    const t = norm(el.innerText || el.textContent || el.value || el.getAttribute('aria-label'));
    return (
      (t.includes('tenho') && t.includes('18')) ||
      (t.includes('sou maior') && t.includes('18')) ||
      t === 'sim' ||
      t.includes('entrar')
    );
  }

  function isNoButton(el) {
    const t = norm(el.innerText || el.textContent || el.value || el.getAttribute('aria-label'));
    return (
      (t.includes('nao') && t.includes('18')) ||
      t.includes('nao tenho') ||
      t.includes('sou menor') ||
      t === 'nao'
    );
  }

  function findGateRoot(fromEl) {
    let el = fromEl;
    while (el && el !== document.body) {
      const tx = el.innerText || el.textContent || '';
      const st = window.getComputedStyle(el);
      const cls = norm((el.className || '').toString() + ' ' + (el.id || ''));

      if (
        looksLikeAgeText(tx) &&
        (
          st.position === 'fixed' ||
          st.position === 'absolute' ||
          cls.includes('modal') ||
          cls.includes('overlay') ||
          cls.includes('age') ||
          cls.includes('idade') ||
          cls.includes('gate') ||
          cls.includes('popup')
        )
      ) {
        return el;
      }

      el = el.parentElement;
    }

    return null;
  }

  function hideAgeGate() {
    const buttons = Array.from(document.querySelectorAll('button, a, [role="button"], input[type="button"], input[type="submit"]'));

    buttons.forEach(btn => {
      if (!isYesButton(btn) && !isNoButton(btn)) return;

      const root = findGateRoot(btn);
      if (root) {
        root.style.setProperty('display', 'none', 'important');
        root.style.setProperty('visibility', 'hidden', 'important');
        root.style.setProperty('opacity', '0', 'important');
        root.style.setProperty('pointer-events', 'none', 'important');
      }
    });

    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
    document.body.classList.remove('modal-open', 'no-scroll', 'overflow-hidden');
  }

  function denyAccess() {
    try {
      localStorage.removeItem(ACCEPT_KEY);
      sessionStorage.removeItem(ACCEPT_KEY);
    } catch (e) {}

    window.location.href = EXIT_URL;
  }

  function boot() {
    const params = new URLSearchParams(window.location.search);

    if (params.has('resetAge')) {
      clearOldAgeKeys();
    }

    if (isAccepted()) {
      hideAgeGate();
    }

    document.addEventListener('click', function (ev) {
      const btn = ev.target.closest('button, a, [role="button"], input[type="button"], input[type="submit"]');
      if (!btn) return;

      if (isYesButton(btn)) {
        ev.preventDefault();
        ev.stopPropagation();
        ev.stopImmediatePropagation();

        setAccepted();
        hideAgeGate();

        return false;
      }

      if (isNoButton(btn)) {
        ev.preventDefault();
        ev.stopPropagation();
        ev.stopImmediatePropagation();

        denyAccess();

        return false;
      }
    }, true);

    setTimeout(function () {
      if (isAccepted()) hideAgeGate();
    }, 300);

    setTimeout(function () {
      if (isAccepted()) hideAgeGate();
    }, 1200);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
