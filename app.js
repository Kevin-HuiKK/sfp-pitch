(() => {
  const slides = () => document.querySelectorAll('.slide');
  let currentIndex = 0;

  function updateNav() {
    const dots = document.querySelectorAll('.slide-nav .dot');
    dots.forEach((d, i) => d.classList.toggle('active', i === currentIndex));
  }

  function goTo(index) {
    const s = slides();
    if (index < 0 || index >= s.length) return;
    currentIndex = index;
    s[index].scrollIntoView({ behavior: 'smooth' });
    updateNav();
  }

  function buildNav() {
    const nav = document.createElement('div');
    nav.className = 'slide-nav';
    slides().forEach((_, i) => {
      const dot = document.createElement('div');
      dot.className = 'dot' + (i === 0 ? ' active' : '');
      dot.addEventListener('click', () => goTo(i));
      nav.appendChild(dot);
    });
    document.body.appendChild(nav);
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') {
      e.preventDefault();
      goTo(currentIndex + 1);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      goTo(currentIndex - 1);
    } else if (e.key === 'Home' || e.key === 'Escape') {
      e.preventDefault();
      goTo(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      goTo(slides().length - 1);
    }
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const idx = Array.from(slides()).indexOf(entry.target);
        if (idx >= 0) currentIndex = idx;
        updateNav();
        entry.target.querySelectorAll('.fade-up').forEach((el, i) => {
          setTimeout(() => el.classList.add('visible'), i * 120);
        });
      }
    });
  }, { threshold: 0.4 });

  function addSlideCounters() {
    const total = slides().length;
    slides().forEach((s, i) => {
      const header = s.querySelector('.slide-header');
      if (header) {
        const counter = document.createElement('span');
        counter.className = 'slide-counter';
        counter.textContent = (i + 1) + ' / ' + total;
        header.appendChild(counter);
      }
    });
  }

  window.addEventListener('DOMContentLoaded', () => {
    buildNav();
    addSlideCounters();
    slides().forEach(s => observer.observe(s));
    slides()[0]?.querySelectorAll('.fade-up').forEach(el => el.classList.add('visible'));
  });
})();
