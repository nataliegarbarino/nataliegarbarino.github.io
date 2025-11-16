// Initialize all Swiper instances on the page
const swipers = document.querySelectorAll('.swiper');

swipers.forEach(swiperEl => {
  // Initialize Swiper for this container
  new Swiper(swiperEl, {
    direction: 'horizontal',
    loop: true,
    autoHeight: true, // makes swiper grow to fit image + caption

    // Pagination
    pagination: {
      el: swiperEl.querySelector('.swiper-pagination'),
      clickable: true,
    },

    // Navigation arrows
    navigation: {
      nextEl: swiperEl.querySelector('.swiper-button-next'),
      prevEl: swiperEl.querySelector('.swiper-button-prev'),
    },
  });

  // Set arrow colors for this carousel
  const prevBtn = swiperEl.querySelector('.swiper-button-prev');
  const nextBtn = swiperEl.querySelector('.swiper-button-next');

  if (prevBtn && nextBtn) {
    prevBtn.style.color = '#6e6e73'; // neutral arrow color
    nextBtn.style.color = '#6e6e73';
  }
});


// carousel
const buttons = document.querySelectorAll("[data-carousel-button]")

buttons.forEach(button => {
    button.addEventListener("click", () => {
    const offset = button.dataset.carouselButton === "next" ? 1 : -1
    const slides = button
        .closest("[data-carousel]")
        .querySelector("[data-slides]")

    const activeSlide = slides.querySelector("[data-active]")
    let newIndex = [...slides.children].indexOf(activeSlide) + offset
    if (newIndex < 0) newIndex = slides.children.length -1
    if (newIndex >= slides.children.length) newIndex = 0 /*makes for continuous loop of images*/

    slides.children[newIndex].dataset.active = true
    delete activeSlide.dataset.active
    })
})


/*parallax section*/
(function () {
  const sections = Array.from(document.querySelectorAll('.parallax'));

  // initialize backgrounds from data-bg
  sections.forEach(s => {
    const url = s.dataset.bg;
    if (url) s.style.backgroundImage = `url("${url}")`;
  });

  // throttle with requestAnimationFrame
  let ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const vh = window.innerHeight;
      sections.forEach(s => {
        const r = s.getBoundingClientRect();
        // only update when section is at least near viewport
        if (r.bottom > -50 && r.top < vh + 50) {
          // percent of viewport height from top to section center (-1..1)
          const center = (r.top + r.height / 2 - vh / 2) / (vh / 2);
          const maxShift = 20; // px up/down max shift
          const shift = Math.max(-1, Math.min(1, center)) * maxShift;
          // center the background at 50% and offset by shift px
          s.style.backgroundPosition = `center calc(50% + ${shift}px)`;
        }
      });
      ticking = false;
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  // run once to set initial position
  onScroll();
})();
