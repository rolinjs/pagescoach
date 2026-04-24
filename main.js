/* ============================================
   CEO CREATOR · MAIN JS
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ─── SCROLL ANIMATION OBSERVER ───────────────────────────────────────
  const animatedEls = document.querySelectorAll('[data-animate]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = parseInt(el.dataset.delay || 0);
        setTimeout(() => {
          el.classList.add('is-visible');
        }, delay);
        observer.unobserve(el);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  animatedEls.forEach(el => observer.observe(el));

  // ─── VIDEO PLACEHOLDERS (click to embed) ─────────────────────────────
  const videoPlaceholders = document.querySelectorAll('.video-placeholder');
  videoPlaceholders.forEach(placeholder => {
    placeholder.addEventListener('click', () => {
      // In production, replace with actual video embed URL
      // e.g. YouTube: https://www.youtube.com/embed/VIDEO_ID?autoplay=1
      const iframe = document.createElement('iframe');
      iframe.setAttribute('src', 'https://www.youtube.com/embed/?autoplay=1');
      iframe.setAttribute('frameborder', '0');
      iframe.setAttribute('allow', 'autoplay; encrypted-media; fullscreen');
      iframe.setAttribute('allowfullscreen', '');
      iframe.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;border-radius:inherit;';
      placeholder.style.position = 'relative';
      placeholder.appendChild(iframe);
    });
  });

  // Testimonial video placeholders
  const testimonialVideos = document.querySelectorAll('.testimonial-video-placeholder');
  testimonialVideos.forEach(placeholder => {
    placeholder.addEventListener('click', () => {
      const iframe = document.createElement('iframe');
      iframe.setAttribute('src', 'https://www.youtube.com/embed/?autoplay=1');
      iframe.setAttribute('frameborder', '0');
      iframe.setAttribute('allow', 'autoplay; encrypted-media; fullscreen');
      iframe.setAttribute('allowfullscreen', '');
      iframe.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;';
      placeholder.style.position = 'relative';
      placeholder.appendChild(iframe);
    });
  });

  // ─── NUMBER COUNTER ANIMATION ─────────────────────────────────────────
  const numberEls = document.querySelectorAll('.number-value[data-count]');

  const countUp = (el) => {
    const target = parseInt(el.dataset.count);
    const prefix = el.dataset.prefix || '';
    const suffix = el.textContent.replace(/[0-9]/g, '').replace(prefix, '');
    const duration = 1800;
    const start = performance.now();

    const step = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);
      el.textContent = prefix + current + suffix;
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  };

  const numberObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        countUp(entry.target);
        numberObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  numberEls.forEach(el => numberObserver.observe(el));

  // ─── SMOOTH SCROLL FOR CTA BUTTONS ───────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ─── CTA BUTTON PULSE ON HOVER ────────────────────────────────────────
  document.querySelectorAll('.btn--primary').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
      btn.style.setProperty('--glow-intensity', '1');
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.setProperty('--glow-intensity', '0');
    });
  });

  // ─── URGENCY BAR MARQUEE (on mobile) ─────────────────────────────────
  const isMobile = window.innerWidth < 640;
  if (isMobile) {
    const bar = document.querySelector('.urgency-bar__inner');
    if (bar) {
      bar.style.overflow = 'hidden';
      bar.style.whiteSpace = 'nowrap';
    }
  }

});