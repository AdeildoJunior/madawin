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
