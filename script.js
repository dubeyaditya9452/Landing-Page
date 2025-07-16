// FAQ Accordion
const faqQuestions = document.querySelectorAll('.faq-question');
faqQuestions.forEach(q => {
  q.addEventListener('click', function() {
    const item = this.parentElement;
    item.classList.toggle('open');
    this.classList.toggle('active');
  });
});

// Captcha Generation
function generateCaptcha() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let captcha = '';
  for (let i = 0; i < 5; i++) {
    captcha += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return captcha;
}

const captchaText = document.getElementById('captcha-text');
let currentCaptcha = '';
if (captchaText) {
  currentCaptcha = generateCaptcha();
  captchaText.textContent = currentCaptcha;
}

// Form Validation
const form = document.getElementById('consultation-form');
if (form) {
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    let valid = true;
    const name = form.elements['name'];
    const mobile = form.elements['mobile'];
    const captcha = form.elements['captcha'];
    const terms = form.elements['terms'];

    // Name validation
    if (!name.value.trim()) {
      name.style.borderColor = 'red';
      valid = false;
    } else {
      name.style.borderColor = '#cbd5e1';
    }
    // Mobile validation
    if (!/^\d{10}$/.test(mobile.value.trim())) {
      mobile.style.borderColor = 'red';
      valid = false;
    } else {
      mobile.style.borderColor = '#cbd5e1';
    }
    // Captcha validation
    if (captcha.value.trim().toUpperCase() !== currentCaptcha) {
      captcha.style.borderColor = 'red';
      valid = false;
      // Regenerate captcha
      currentCaptcha = generateCaptcha();
      captchaText.textContent = currentCaptcha;
    } else {
      captcha.style.borderColor = '#cbd5e1';
    }
    // Terms checkbox
    if (!terms.checked) {
      terms.parentElement.style.color = 'red';
      valid = false;
    } else {
      terms.parentElement.style.color = '';
    }
    if (valid) {
      alert('Consultation booked successfully!');
      form.reset();
      currentCaptcha = generateCaptcha();
      captchaText.textContent = currentCaptcha;
    }
  });
}

// 1. Animate stats row numbers counting up on scroll into view
function animateCountUp(el, target) {
  let start = 0;
  const duration = 1200;
  const startTime = performance.now();
  function update(now) {
    const progress = Math.min((now - startTime) / duration, 1);
    el.textContent = Math.floor(progress * target);
    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      el.textContent = target;
    }
  }
  requestAnimationFrame(update);
}
const statNumbers = document.querySelectorAll('.stat-number');
let statsAnimated = false;
function handleStatsAnimation() {
  const statsRow = document.querySelector('.stats-row');
  if (!statsRow) return;
  const rect = statsRow.getBoundingClientRect();
  if (!statsAnimated && rect.top < window.innerHeight - 100) {
    statsAnimated = true;
    statNumbers.forEach(el => {
      const num = parseInt(el.textContent.replace(/\D/g, ''));
      if (!isNaN(num)) animateCountUp(el, num);
    });
  }
}
window.addEventListener('scroll', handleStatsAnimation);

// 2. Animate testimonial cards sliding in on scroll
const testimonialCards = document.querySelectorAll('.testimonial-card');
function animateTestimonials() {
  testimonialCards.forEach(card => {
    const rect = card.getBoundingClientRect();
    if (rect.top < window.innerHeight - 60) {
      card.style.transition = 'transform 0.7s cubic-bezier(.23,1.01,.32,1), opacity 0.7s';
      card.style.transform = 'translateY(0)';
      card.style.opacity = 1;
    }
  });
}
window.addEventListener('scroll', animateTestimonials);
window.addEventListener('DOMContentLoaded', () => {
  testimonialCards.forEach(card => {
    card.style.transform = 'translateY(40px)';
    card.style.opacity = 0;
  });
  animateTestimonials();
});

// 3. Smooth scroll for anchor links
const anchorLinks = document.querySelectorAll('a[href^="#"]');
anchorLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href').slice(1);
    const target = document.getElementById(targetId) || document.querySelector(`[name='${targetId}']`);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// 4. Scroll-to-top button
const scrollBtn = document.createElement('button');
scrollBtn.textContent = '↑';
scrollBtn.className = 'scroll-to-top-btn';
document.body.appendChild(scrollBtn);
scrollBtn.style.position = 'fixed';
scrollBtn.style.bottom = '32px';
scrollBtn.style.right = '32px';
scrollBtn.style.padding = '0.7em 1em';
scrollBtn.style.borderRadius = '50%';
scrollBtn.style.background = '#f7941d';
scrollBtn.style.color = '#fff';
scrollBtn.style.fontSize = '1.5rem';
scrollBtn.style.border = 'none';
scrollBtn.style.boxShadow = '0 2px 8px rgba(0,0,0,0.13)';
scrollBtn.style.cursor = 'pointer';
scrollBtn.style.display = 'none';
scrollBtn.style.zIndex = 1000;
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    scrollBtn.style.display = 'block';
  } else {
    scrollBtn.style.display = 'none';
  }
});
scrollBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Why Choose Clove Dental: Plus icon toggles
const whyPluses = document.querySelectorAll('.why-plus');
const whyDetails = document.querySelectorAll('.why-feature-detail');
whyPluses.forEach(plus => {
  plus.addEventListener('click', function() {
    const idx = this.getAttribute('data-index');
    whyDetails.forEach((detail, i) => {
      if (detail.getAttribute('data-index') === idx) {
        const isOpen = detail.style.display === 'block';
        whyDetails.forEach(d => d.style.display = 'none');
        detail.style.display = isOpen ? 'none' : 'block';
      } else {
        detail.style.display = 'none';
      }
    });
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const patientVideos = document.querySelectorAll('.patient-video');
  patientVideos.forEach(video => {
    // Play on hover
    video.addEventListener('mouseenter', () => {
      video.play();
    });
    // Pause on mouse leave
    video.addEventListener('mouseleave', () => {
      video.pause();
      video.currentTime = 0;
    });
    // Also support hover on parent card for better UX
    const card = video.closest('.patient-card');
    if (card) {
      card.addEventListener('mouseenter', () => {
        video.play();
      });
      card.addEventListener('mouseleave', () => {
        video.pause();
        video.currentTime = 0;
      });
    }
  });
}); 