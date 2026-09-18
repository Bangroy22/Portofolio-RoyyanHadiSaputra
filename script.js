// Tandai nav item aktif berdasarkan halaman saat ini
document.addEventListener('DOMContentLoaded', () => {
  const current = document.body.dataset.page;
  document.querySelectorAll('.nav-item').forEach(item => {
    if (item.dataset.page === current) item.classList.add('active');
  });

  // Beri delay bertahap (stagger) supaya elemen muncul satu-satu
  const revealEls = document.querySelectorAll('.reveal');
  revealEls.forEach((el, i) => {
    el.style.animationDelay = (i * 70) + 'ms';
  });

  // Reveal saat elemen masuk viewport
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in-view'));
  }

  // Tombol dengan efek "ripple" kecil saat ditekan
  document.querySelectorAll('.btn-primary, .btn-secondary').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.style.transform = 'scale(0.97)';
      setTimeout(() => { btn.style.transform = ''; }, 120);
    });
  });

  // ---------- Spotlight kursor di atas kartu (hanya perangkat dengan mouse) ----------
  // Ditambahkan tanpa mengubah kode di atas. Otomatis nonaktif kalau
  // perangkat tidak punya hover (HP/tablet) atau user minta reduced motion.
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hasHover = window.matchMedia('(hover: hover)').matches;

  if (!prefersReducedMotion && hasHover) {
    const glowSelector = '.proj-card, .body-card, .principle-item, .exp-card, ' +
      '.skills-card, .contact-card, .edu-card, .dossier-card, .hero-card';

    document.addEventListener('pointermove', (e) => {
      const target = e.target.closest(glowSelector);
      if (!target) return;
      const rect = target.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      target.style.setProperty('--mx', x + '%');
      target.style.setProperty('--my', y + '%');
    });
  }
});