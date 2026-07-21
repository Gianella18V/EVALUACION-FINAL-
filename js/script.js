/* =========================================================
   AROMA — script.js
   Inicializa AOS, Swiper (si existe en la página) y
   pequeñas interacciones (navbar activo, filtro de menú).
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

  // Animate On Scroll
  if (window.AOS) {
    AOS.init({
      duration: 800,
      once: true,
      offset: 80,
      easing: "ease-out-cubic"
    });
  }

  // Swiper (solo se ejecuta si el elemento .aroma-swiper existe en la página)
  if (window.Swiper && document.querySelector(".aroma-swiper")) {
    new Swiper(".aroma-swiper", {
      slidesPerView: 1,
      spaceBetween: 24,
      loop: true,
      autoplay: { delay: 3500, disableOnInteraction: false },
      pagination: { el: ".swiper-pagination", clickable: true },
      breakpoints: {
        768: { slidesPerView: 2 },
        1200: { slidesPerView: 3 }
      }
    });
  }

  // Resalta el link del navbar según la página actual
  const current = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".navbar-aroma .nav-link").forEach(link => {
    const href = link.getAttribute("href");
    if (href === current) link.classList.add("active");
  });

  // Filtro de categorías en la página de Menú
  const filterButtons = document.querySelectorAll(".menu-cat-btn");
  const menuGroups = document.querySelectorAll("[data-category]");
  if (filterButtons.length && menuGroups.length) {
    filterButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        filterButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        const cat = btn.dataset.filter;
        menuGroups.forEach(group => {
          if (cat === "todos" || group.dataset.category === cat) {
            group.style.display = "";
          } else {
            group.style.display = "none";
          }
        });
      });
    });
  }

  // Validación simple del formulario de contacto (visual, sin backend)
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      if (contactForm.checkValidity()) {
        const alertBox = document.getElementById("formAlert");
        alertBox.classList.remove("d-none");
        contactForm.reset();
        contactForm.classList.remove("was-validated");
      } else {
        contactForm.classList.add("was-validated");
      }
    });
  }

});
