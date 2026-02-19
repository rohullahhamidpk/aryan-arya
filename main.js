document.addEventListener('DOMContentLoaded', () => {
  const header = document.getElementById('header');
  const nav = document.querySelector('.site-nav');
  const toggle = document.querySelector('.nav-toggle');
  const yearEl = document.getElementById('year');

  if (yearEl) yearEl.textContent = new Date().getFullYear().toString();

  const setHeaderState = () => {
    const scrolled = window.scrollY > 8;
    header.style.boxShadow = scrolled ? '0 6px 20px rgba(0,0,0,.08)' : 'none';
  };
  setHeaderState();
  window.addEventListener('scroll', setHeaderState, { passive: true });

  if (toggle) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href');
      if (!id || id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const headerHeight = header.offsetHeight || 0;
      const top = target.getBoundingClientRect().top + window.scrollY - (headerHeight + 8);
      window.scrollTo({ top, behavior: 'smooth' });
      nav.classList.remove('open');
      if (toggle) toggle.setAttribute('aria-expanded', 'false');
    });
  });

  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const name = form.querySelector('#name')?.value?.trim() || '';
      const email = form.querySelector('#email')?.value?.trim() || '';
      const message = form.querySelector('#message')?.value?.trim() || '';
      if (!name || !email || !message) {
        alert('Please fill out all fields.');
        return;
      }
      const mail = 'info@aryanarya.com';
      const subject = encodeURIComponent('Partnership Inquiry');
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
      window.location.href = `mailto:${mail}?subject=${subject}&body=${body}`;
    });
  }
});
