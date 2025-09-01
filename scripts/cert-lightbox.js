// scripts/cert-lightbox.js
(function(){
  "use strict";
  document.addEventListener('DOMContentLoaded', () => {
    document
      .querySelectorAll('.bp-gallery .portfolio-item img[data-bp]')
      .forEach(img => {
        img.style.cursor = 'zoom-in';
        img.addEventListener('click', e => {
          e.preventDefault();
          e.stopPropagation();
          BigPicture({
            el:     img,
            imgSrc: img.dataset.bp
          });
        });
      });
  });
})();