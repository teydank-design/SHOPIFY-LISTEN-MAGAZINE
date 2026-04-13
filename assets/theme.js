/* ============================================================
   LISTEN MAGAZINE — Theme JS
   GSAP animations, custom cursor, intro loader, scroll reveals
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initCursor();
  initScrollReveals();
  initProductGallery();
  initAudioPlayers();
  initCartDrawer();

  if (document.querySelector('.intro-loader')) {
    initIntroLoader();
  } else {
    revealPage();
  }
});

/* ── Custom Cursor ───────────────────────────────────────── */
function initCursor() {
  const cursor = document.querySelector('.cursor');
  if (!cursor || window.matchMedia('(pointer: coarse)').matches) return;

  let mouseX = 0, mouseY = 0;
  let cursorX = 0, cursorY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateCursor() {
    const ease = 0.18;
    cursorX += (mouseX - cursorX) * ease;
    cursorY += (mouseY - cursorY) * ease;
    cursor.style.left = cursorX + 'px';
    cursor.style.top  = cursorY + 'px';
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Hover states
  const hoverTargets = 'a, button, [data-cursor-hover], .product-gallery__thumb, .audio-player__btn';
  document.querySelectorAll(hoverTargets).forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('cursor--hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('cursor--hover'));
  });

  document.addEventListener('mousedown', () => cursor.classList.add('cursor--click'));
  document.addEventListener('mouseup',   () => cursor.classList.remove('cursor--click'));
}

/* ── Intro Loader ─────────────────────────────────────────── */
function initIntroLoader() {
  const loader = document.querySelector('.intro-loader');
  const logoEl = document.querySelector('.intro-loader__logo');
  const subEl  = document.querySelector('.intro-loader__sub');

  if (!loader || typeof gsap === 'undefined') {
    revealPage();
    return;
  }

  const tl = gsap.timeline({
    onComplete: () => {
      revealPage();
      gsap.to(loader, {
        yPercent: -100,
        duration: 0.8,
        ease: 'power3.inOut',
        onComplete: () => loader.remove()
      });
    }
  });

  tl
    .to(logoEl, {
      clipPath: 'inset(0 0% 0 0)',
      duration: 1.0,
      ease: 'power4.out',
    }, 0.2)
    .to(subEl, {
      opacity: 1,
      duration: 0.5,
      ease: 'power2.out',
    }, 0.8)
    .to({}, { duration: 0.6 });
}

function revealPage() {
  if (typeof gsap === 'undefined') return;

  const hero = document.querySelector('.hero');
  if (!hero) return;

  const eyebrow = hero.querySelector('.hero__eyebrow');
  const titleLines = hero.querySelectorAll('.hero__title-line');
  const meta = hero.querySelector('.hero__meta');

  gsap.set([eyebrow, titleLines, meta], { opacity: 0, y: 20 });
  gsap.to(eyebrow, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', delay: 0.1 });
  gsap.to(titleLines, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.08, delay: 0.2 });
  gsap.to(meta, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', delay: 0.55 });
}

/* ── Hero Parallax ───────────────────────────────────────── */
function initHeroParallax() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  const heroBg = document.querySelector('.hero__bg img');
  if (!heroBg) return;

  gsap.to(heroBg, {
    yPercent: 20,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true,
    }
  });
}

/* ── Scroll Reveals ──────────────────────────────────────── */
function initScrollReveals() {
  if (typeof gsap === 'undefined') {
    // Fallback: IntersectionObserver without GSAP
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    document.querySelectorAll('[data-reveal]').forEach(el => observer.observe(el));
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  document.querySelectorAll('[data-reveal]').forEach(el => {
    const dir = el.dataset.reveal;
    const fromX = dir === 'left' ? -40 : dir === 'right' ? 40 : 0;
    const fromY = (!dir || dir === '') ? 36 : 0;

    gsap.fromTo(el,
      { opacity: 0, x: fromX, y: fromY },
      {
        opacity: 1,
        x: 0,
        y: 0,
        duration: 0.75,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none none',
        }
      }
    );
  });

  initHeroParallax();
}

/* ── Product Gallery ─────────────────────────────────────── */
function initProductGallery() {
  const gallery = document.querySelector('.product-gallery');
  if (!gallery) return;

  const mainImg = gallery.querySelector('.product-gallery__main img');
  const thumbs  = gallery.querySelectorAll('.product-gallery__thumb');

  thumbs.forEach(thumb => {
    thumb.addEventListener('click', () => {
      const newSrc    = thumb.dataset.src;
      const newSrcset = thumb.dataset.srcset;

      // Swap image with a quick fade
      if (mainImg && newSrc) {
        mainImg.style.opacity = '0';
        mainImg.style.transition = 'opacity 0.25s ease';
        setTimeout(() => {
          mainImg.src = newSrc;
          if (newSrcset) mainImg.srcset = newSrcset;
          mainImg.style.opacity = '1';
        }, 250);
      }

      thumbs.forEach(t => t.classList.remove('is-active'));
      thumb.classList.add('is-active');
    });
  });
}

/* ── Audio Players ───────────────────────────────────────── */
function initAudioPlayers() {
  document.querySelectorAll('.audio-player').forEach(player => {
    const audio       = player.querySelector('audio');
    const playBtn     = player.querySelector('.audio-player__btn--play');
    const progressBar = player.querySelector('.audio-player__progress');
    const fill        = player.querySelector('.audio-player__progress-fill');
    const timeEl      = player.querySelector('.audio-player__time');

    if (!audio || !playBtn) return;

    const playIcon  = playBtn.querySelector('.icon-play');
    const pauseIcon = playBtn.querySelector('.icon-pause');

    playBtn.addEventListener('click', () => {
      if (audio.paused) {
        // Pause all other players first
        document.querySelectorAll('.audio-player audio').forEach(a => {
          if (a !== audio) {
            a.pause();
            const btn = a.closest('.audio-player')?.querySelector('.audio-player__btn--play');
            btn?.querySelector('.icon-play')?.classList.remove('hidden');
            btn?.querySelector('.icon-pause')?.classList.add('hidden');
          }
        });
        audio.play();
        playIcon?.classList.add('hidden');
        pauseIcon?.classList.remove('hidden');
      } else {
        audio.pause();
        playIcon?.classList.remove('hidden');
        pauseIcon?.classList.add('hidden');
      }
    });

    audio.addEventListener('timeupdate', () => {
      if (!audio.duration) return;
      const pct = (audio.currentTime / audio.duration) * 100;
      if (fill) fill.style.width = pct + '%';
      if (timeEl) {
        const remaining = audio.duration - audio.currentTime;
        timeEl.textContent = formatTime(remaining);
      }
    });

    audio.addEventListener('ended', () => {
      playIcon?.classList.remove('hidden');
      pauseIcon?.classList.add('hidden');
      if (fill) fill.style.width = '0%';
    });

    // Seek on progress bar click
    if (progressBar) {
      progressBar.addEventListener('click', (e) => {
        const rect = progressBar.getBoundingClientRect();
        const pct  = (e.clientX - rect.left) / rect.width;
        audio.currentTime = pct * audio.duration;
      });
    }
  });
}

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

/* ── Cart Drawer ─────────────────────────────────────────── */
function initCartDrawer() {
  const drawer  = document.querySelector('.cart-drawer');
  const overlay = document.querySelector('.cart-drawer__overlay');
  const closeBtn = document.querySelector('.cart-drawer__close');

  if (!drawer) return;

  function openCart() {
    drawer.classList.add('is-open');
    overlay?.classList.add('is-visible');
    document.body.style.overflow = 'hidden';
  }

  function closeCart() {
    drawer.classList.remove('is-open');
    overlay?.classList.remove('is-visible');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('[data-open-cart]').forEach(btn => {
    btn.addEventListener('click', (e) => { e.preventDefault(); openCart(); });
  });

  closeBtn?.addEventListener('click', closeCart);
  overlay?.addEventListener('click', closeCart);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeCart();
  });
}

/* ── Stock Counter ───────────────────────────────────────── */
function updateStockDisplay() {
  const stockEl = document.querySelector('[data-stock-count]');
  if (!stockEl) return;

  const count = parseInt(stockEl.dataset.stockCount, 10);
  if (isNaN(count)) return;

  if (count <= 10) {
    stockEl.textContent = `${count} exemplaire${count > 1 ? 's' : ''} restant${count > 1 ? 's' : ''}`;
    stockEl.classList.add('low');
  } else {
    stockEl.textContent = `${count} exemplaires disponibles`;
  }
}

document.addEventListener('DOMContentLoaded', updateStockDisplay);
