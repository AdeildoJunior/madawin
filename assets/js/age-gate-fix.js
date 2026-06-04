(function () {
  const KEY = 'madawin_age_ok';
  const EXIT_URL = 'https://www.google.com/';

  function accepted() {
    try {
      return localStorage.getItem(KEY) === '1';
    } catch (e) {
      return false;
    }
  }

  function accept() {
    try {
      localStorage.setItem(KEY, '1');
      localStorage.setItem('ageVerified', 'true');
      localStorage.setItem('over18', 'true');
      localStorage.setItem('isAdult', 'true');
      localStorage.setItem('maior18', 'true');
      localStorage.setItem('madawin_age_verified', 'true');
    } catch (e) {}

    hideAllAgeOverlays();
    document.documentElement.classList.remove('mw-age-lock');
    document.body.classList.remove('mw-age-lock');
  }

  function deny() {
    try {
      localStorage.removeItem(KEY);
      localStorage.removeItem('ageVerified');
      localStorage.removeItem('over18');
      localStorage.removeItem('isAdult');
      localStorage.removeItem('maior18');
      localStorage.removeItem('madawin_age_verified');
    } catch (e) {}

    window.location.href = EXIT_URL;
  }

  function clearOnReset() {
    const params = new URLSearchParams(window.location.search);
    if (!params.has('resetAge')) return;

    try {
      localStorage.removeItem(KEY);
      localStorage.removeItem('ageVerified');
      localStorage.removeItem('over18');
      localStorage.removeItem('isAdult');
      localStorage.removeItem('maior18');
      localStorage.removeItem('madawin_age_verified');
      sessionStorage.clear();
    } catch (e) {}
  }

  function isOldAgeOverlay(el) {
    if (!el || el.id === 'mw-age-gate-v2') return false;

    const text = (el.innerText || el.textContent || '').toLowerCase();

    return (
      text.includes('maiores de 18') ||
      text.includes('maior de 18') ||
      text.includes('tenho 18') ||
      text.includes('bebidas alcoólicas') ||
      text.includes('bebidas alcoolicas')
    );
  }

  function hideAllAgeOverlays() {
    Array.from(document.body.querySelectorAll('*')).forEach(el => {
      if (el.id === 'mw-age-gate-v2') return;

      const st = window.getComputedStyle(el);
      const fixedOrOverlay =
        st.position === 'fixed' ||
        st.position === 'absolute' ||
        (el.className || '').toString().toLowerCase().includes('modal') ||
        (el.className || '').toString().toLowerCase().includes('overlay') ||
        (el.className || '').toString().toLowerCase().includes('age') ||
        (el.className || '').toString().toLowerCase().includes('idade');

      if (fixedOrOverlay && isOldAgeOverlay(el)) {
        el.style.setProperty('display', 'none', 'important');
        el.style.setProperty('visibility', 'hidden', 'important');
        el.style.setProperty('opacity', '0', 'important');
        el.style.setProperty('pointer-events', 'none', 'important');
      }
    });

    const gate = document.getElementById('mw-age-gate-v2');
    if (gate) gate.remove();

    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
  }

  function makeGate() {
    if (accepted()) {
      hideAllAgeOverlays();
      return;
    }

    document.documentElement.classList.add('mw-age-lock');
    document.body.classList.add('mw-age-lock');

    Array.from(document.body.querySelectorAll('*')).forEach(el => {
      if (el.id !== 'mw-age-gate-v2' && isOldAgeOverlay(el)) {
        el.style.setProperty('display', 'none', 'important');
      }
    });

    let gate = document.getElementById('mw-age-gate-v2');
    if (gate) return;

    gate = document.createElement('div');
    gate.id = 'mw-age-gate-v2';
    gate.innerHTML = `
      <div class="mw-age-card-v2" role="dialog" aria-modal="true" aria-labelledby="mw-age-title-v2">
        <img class="mw-age-logo-v2" src="/assets/img/madawin-logo.png?v=age2" alt="Mada Wine & Beer">
        <h2 id="mw-age-title-v2">Mada Wine & Beer</h2>
        <p class="mw-age-main-v2">
          Este site apresenta conteúdo relacionado a bebidas alcoólicas e é destinado apenas a maiores de 18 anos.
        </p>
        <p class="mw-age-note-v2">
          Venda e consumo de bebidas alcoólicas proibidos para menores de 18 anos. Beba com responsabilidade.
        </p>
        <div class="mw-age-actions-v2">
          <button type="button" id="mw-age-yes-v2">Tenho 18 anos ou mais</button>
          <button type="button" id="mw-age-no-v2">Não tenho 18 anos</button>
        </div>
      </div>
    `;

    document.body.appendChild(gate);

    document.getElementById('mw-age-yes-v2').addEventListener('click', function (e) {
      e.preventDefault();
      accept();
    });

    document.getElementById('mw-age-no-v2').addEventListener('click', function (e) {
      e.preventDefault();
      deny();
    });
  }

  function boot() {
    clearOnReset();

    if (accepted()) {
      hideAllAgeOverlays();
      return;
    }

    makeGate();

    setTimeout(makeGate, 500);
    setTimeout(makeGate, 1500);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

  window.addEventListener('load', boot);
})();
