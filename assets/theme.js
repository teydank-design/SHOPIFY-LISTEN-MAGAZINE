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

/* ── Intro Loader — ticker .NO / .LISTEN ─────────────────── */
/*
 * Séquence :
 *  Phase 1 (0 → ~2s)  : 4× ".NO"  apparaissent depuis le bas, ~300ms entre chaque
 *  Phase 2 (~2 → ~5s) : 3× ".LISTEN" sur le même mécanisme
 *  Fin                 : fade out blanc → reveal hero
 */
function initIntroLoader() {
  const loader = document.getElementById('intro-loader');
  const ticker = document.getElementById('intro-ticker');

  if (!loader || !ticker || typeof gsap === 'undefined') {
    if (loader) loader.remove();
    revealPage();
    return;
  }

  // Skip on tap / click
  loader.addEventListener('click', skipIntro, { once: true });

  const LINE_H   = window.innerHeight * 0.25; // 25vh en px
  const BOTTOM_Y = LINE_H * 3;               // 75vh — slot du bas (position top de l'item)
  const ENTER_Y  = window.innerHeight;        // démarre 1 viewport plus bas (invisible)

  // items actuellement à l'écran
  const activeItems = [];

  /**
   * Crée un item et l'anime depuis le bas vers son slot.
   * Mouvement fluide (expo.out) + fade-in simultané.
   * Tous les items existants montent d'un cran (LINE_H).
   * @param {string} text
   * @returns {Promise} résolu quand l'item est arrivé à destination
   */
  function addItem(text) {
    return new Promise((resolve) => {
      const el = document.createElement('div');
      el.className = 'intro-ticker__item';
      el.textContent = text;
      ticker.appendChild(el);

      // Départ : hors-écran en bas, invisible
      gsap.set(el, { top: ENTER_Y, opacity: 0 });

      // Décaler les items existants vers le haut — même courbe, même durée
      activeItems.forEach((existing) => {
        gsap.to(existing, {
          top: `-=${LINE_H}`,
          duration: 0.65,
          ease: 'expo.out',
        });
      });

      // Entrée : descente vers le slot bas + fade-in
      gsap.to(el, {
        top: BOTTOM_Y,
        opacity: 1,
        duration: 0.65,
        ease: 'expo.out',
        onComplete: resolve,
      });

      activeItems.push(el);
    });
  }

  /**
   * Expulse tous les items vers le haut hors du viewport — smooth + fade.
   * @returns {Promise}
   */
  function clearItems() {
    return new Promise((resolve) => {
      if (activeItems.length === 0) { resolve(); return; }
      gsap.to(activeItems, {
        top: -LINE_H,
        opacity: 0,
        duration: 0.55,
        ease: 'expo.in',
        stagger: 0.06,
        onComplete: () => {
          activeItems.forEach((el) => el.remove());
          activeItems.length = 0;
          resolve();
        },
      });
    });
  }

  /** Simple délai promisifié */
  function wait(ms) {
    return new Promise((r) => setTimeout(r, ms));
  }

  let skipped = false;
  function skipIntro() {
    skipped = true;
    gsap.killTweensOf('*');
    dismissLoader();
  }

  function dismissLoader() {
    gsap.to(loader, {
      opacity: 0,
      duration: 0.4,
      ease: 'power2.inOut',
      onComplete: () => {
        loader.remove();
        revealPage();
      },
    });
  }

  // ── Séquence principale ──────────────────────────────────
  async function runSequence() {
    // Phase 1 — .NO  (~300ms entre chaque, la durée d'anim est 650ms)
    await addItem('.NO');  if (skipped) return;
    await wait(260);
    await addItem('.NO');  if (skipped) return;
    await wait(260);
    await addItem('.NO');  if (skipped) return;
    await wait(260);
    await addItem('.NO');  if (skipped) return;

    // Pause — 4 lignes à l'écran
    await wait(500);       if (skipped) return;

    // Transition : vider l'écran
    await clearItems();    if (skipped) return;
    await wait(120);       if (skipped) return;

    // Phase 2 — .LISTEN (~1s entre chaque)
    await addItem('.LISTEN'); if (skipped) return;
    await wait(900);
    await addItem('.LISTEN'); if (skipped) return;
    await wait(900);
    await addItem('.LISTEN'); if (skipped) return;

    // Maintien avant sortie
    await wait(700);

    // Fade out → hero
    dismissLoader();
  }

  runSequence();
}

/* ── Hero reveal (appelé après la sortie du loader) ─────── */
function revealPage() {
  if (typeof gsap === 'undefined') return;

  const hero = document.querySelector('.hero');
  if (!hero) return;

  const eyebrow    = hero.querySelector('.hero__eyebrow');
  const titleLines = hero.querySelectorAll('.hero__title-line');
  const meta       = hero.querySelector('.hero__meta');

  gsap.set([eyebrow, titleLines, meta].filter(Boolean), { opacity: 0, y: 24 });

  gsap.to(eyebrow,    { opacity: 1, y: 0, duration: 0.55, ease: 'power3.out', delay: 0.05 });
  gsap.to(titleLines, { opacity: 1, y: 0, duration: 0.75, ease: 'power3.out', stagger: 0.07, delay: 0.15 });
  gsap.to(meta,       { opacity: 1, y: 0, duration: 0.55, ease: 'power3.out', delay: 0.45 });
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
