(function () {
  "use strict";

  window.addEventListener('load', () => {
    on_page_load();
  });

  /**
   * Function gets called when page is loaded.
   */
  function on_page_load() {
    // 1) Inicializar AOS
    AOS.init({
      anchorPlacement: 'top-left',
      duration: 600,
      easing: "ease-in-out",
      once: true,
      mirror: false,
      disable: 'mobile'
    });

    const toggleSoundBtn = document.getElementById('toggleSound');
    const video            = document.getElementById('heroVideo');
    const aboutLink        = document.querySelector('a[href="#about"]');
    const scrollTopBtn     = document.getElementById('scrolltop');

    // 2) Función para actualizar el texto del botón
    function updateButtonText() {
      if (!toggleSoundBtn || !video) return;
      toggleSoundBtn.innerHTML = video.muted
        ? '🔇 Activar sonido'
        : '🔊 Desactivar sonido';
    }

    // 3) Arranque inicial del texto
    updateButtonText();

    // 4) Botón manual de sonido
    if (toggleSoundBtn && video) {
      toggleSoundBtn.addEventListener('click', () => {
        video.muted = !video.muted;
        updateButtonText();
        video.play().catch(err =>
          console.warn("Error manual play:", err)
        );
      });
    }

    // 5) Observer para play/pause según viewport
    if (video) {
      const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            video.muted = false;
            video.play().catch(err =>
              console.warn("Reproducción bloqueada:", err)
            );
          } else {
            video.muted = true;
            video.pause();
          }
          updateButtonText();
        });
      }, { threshold: 0.6 });

      videoObserver.observe(video);
    }

    // 6) Play video al hacer click en #about
    if (aboutLink && video) {
      aboutLink.addEventListener('click', () => {
        video.muted       = false;
        video.currentTime = 0;
        video.play().catch(err =>
          console.warn("Error play desde About:", err)
        );
        updateButtonText();
      });
    }

    // 7) Play video al hacer click en scrollTop (si lo usás)
    if (scrollTopBtn && video) {
      scrollTopBtn.addEventListener('click', () => {
        video.muted = false;
        video.play().catch(err =>
          console.warn("Error play desde ScrollTop:", err)
        );
        updateButtonText();
      });
    }
  }

  /**
   * Navbar effects and scrolltop button upon scrolling
   */
  const navbar    = document.getElementById('header-nav');
  const body      = document.getElementsByTagName("body")[0];
  const scrollTop = document.getElementById('scrolltop');
  window.onscroll = () => {
    if (window.scrollY > 0) {
      navbar.classList.add('fixed-top', 'shadow-sm');
      body.style.paddingTop = navbar.offsetHeight + "px";
      scrollTop.style.visibility = "visible";
      scrollTop.style.opacity    = 1;
    } else {
      navbar.classList.remove('fixed-top', 'shadow-sm');
      body.style.paddingTop = "0px";
      scrollTop.style.visibility = "hidden";
      scrollTop.style.opacity    = 0;
    }
  };

  /**
   * Masonry Grid
   */
  const elem = document.querySelector('.grid');
  if (elem) {
    imagesLoaded(elem, function () {
      new Masonry(elem, {
        itemSelector: '.grid-item',
        percentPosition: true,
        horizontalOrder: true
      });
    });
  }

  /**
   * BigPicture Popup for images and videos (data-bigpicture)
   */
  document.querySelectorAll("[data-bigpicture]").forEach(el => {
    el.addEventListener("click", e => {
      e.preventDefault();
      const data = JSON.parse(el.dataset.bigpicture);
      BigPicture({
        el: el,   // ahora pasamos el <a> o el <img> correcto
        ...data
      });
    });
  });

  /**
   * BigPicture Popup for Photo Gallery (.bp-gallery a)
   */
  const galleryLinks = Array.from(document.querySelectorAll(".bp-gallery a"));
  galleryLinks.forEach((link, idx) => {
    link.addEventListener("click", e => {
      e.preventDefault();
      BigPicture({
        gallery: galleryLinks,  // array con todos los <a>
        index:   idx            // abre justo el índice clickeado
      });
    });
  });

})();


// 1) selecciono todos los anchors de la galería
const galleryLinks = Array.from(document.querySelectorAll('.bp-gallery a'));

galleryLinks.forEach((anchor, idx) => {
  anchor.addEventListener('click', e => {
    e.preventDefault();

    BigPicture({
      gallery: galleryLinks, // array con todos los <a>
      index:   idx           // abro justo el clickeado
    });
  });
});