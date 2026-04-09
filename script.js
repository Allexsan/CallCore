// script.js
document.addEventListener('DOMContentLoaded', () => {
  // Preloader
  const preloader = document.getElementById('preloader');
  if (preloader) {
    setTimeout(() => {
      preloader.style.opacity = '0';
      setTimeout(() => preloader.style.display = 'none', 500);
    }, 800);
  }

  // Theme Toggle
  const themeToggle = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.setAttribute('data-theme', 'dark');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  }

  themeToggle.addEventListener('click', () => {
    const isDark = document.body.getAttribute('data-theme') === 'dark';
    if (isDark) {
      document.body.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
      themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    } else {
      document.body.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
      themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
  });

  // Mobile Menu
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const navList = document.querySelector('.nav-list');
  mobileBtn.addEventListener('click', () => {
    navList.classList.toggle('active');
    const icon = mobileBtn.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navList.classList.remove('active');
      mobileBtn.querySelector('i').classList.add('fa-bars');
      mobileBtn.querySelector('i').classList.remove('fa-times');
    });
  });

  // Active nav link on scroll
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.scrollY + 200;
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // Animate numbers
  const statNumbers = document.querySelectorAll('.stat-number');
  const animateNumbers = () => {
    statNumbers.forEach(el => {
      const target = parseInt(el.getAttribute('data-target'), 10);
      if (!el.dataset.animated && target) {
        el.dataset.animated = 'true';
        let current = 0;
        const step = target / 50;
        const timer = setInterval(() => {
          current += step;
          if (current >= target) {
            el.innerText = target;
            clearInterval(timer);
          } else {
            el.innerText = Math.floor(current);
          }
        }, 20);
      }
    });
  };

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateNumbers();
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  
  const statsContainer = document.querySelector('.hero-stats');
  if (statsContainer) statsObserver.observe(statsContainer);

  // Form submit
  const form = document.getElementById('contactForm');
  const toast = document.getElementById('toast');

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 4000);
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const service = document.getElementById('service').value;
    const message = document.getElementById('message').value;

    if (!name || !email || !phone) {
      showToast('Пожалуйста, заполните имя, email и телефон');
      return;
    }

    // Simulate API call
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = 'Отправка... <i class="fas fa-spinner fa-spin"></i>';
    submitBtn.disabled = true;

    setTimeout(() => {
      console.log({ name, email, phone, service, message });
      showToast(`Спасибо, ${name}! Мы свяжемся с вами в ближайшее время.`);
      form.reset();
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }, 1000);
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
});