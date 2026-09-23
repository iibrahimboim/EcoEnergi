/* ============================================================
   EcoEnergi Sekolah - script.js
   Navbar scroll effect, back-to-top, active link highlight
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  const navbar = document.getElementById('mainNavbar');
  const btnTop = document.getElementById('btnBackToTop');
  const navLinks = document.querySelectorAll('#navMenu .nav-link');
  const sections = document.querySelectorAll('section[id]');

  /* ---------- Navbar: add .scrolled on scroll ---------- */
  function handleScroll() {
    // navbar shrink
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // back-to-top visibility
    if (window.scrollY > 400) {
      btnTop.classList.add('show');
    } else {
      btnTop.classList.remove('show');
    }

    // active nav link based on scroll position
    let current = '';
    sections.forEach(function (section) {
      var top = section.offsetTop - 100;
      if (window.scrollY >= top) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(function (link) {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // run once on load

  /* ---------- Back to Top ---------- */
  btnTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------- Close mobile nav on link click ---------- */
  var navCollapse = document.getElementById('navMenu');
  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      if (navCollapse.classList.contains('show')) {
        bootstrap.Collapse.getOrCreateInstance(navCollapse).hide();
      }
    });
  });

  /* ---------- Fade-in on scroll (IntersectionObserver) ---------- */
  var fadeEls = document.querySelectorAll('.fade-in-section');
  if (fadeEls.length && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    fadeEls.forEach(function (el) { observer.observe(el); });
  }
});
