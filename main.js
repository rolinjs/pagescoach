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

  // ─── FAQ ACCORDION ────────────────────────────────────────────────────
  const faqItems = document.querySelectorAll('.faq__item');

  faqItems.forEach(item => {
    const btn = item.querySelector('.faq__question');
    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');

      // Close all open items first
      faqItems.forEach(i => {
        i.classList.remove('is-open');
        i.querySelector('.faq__question').setAttribute('aria-expanded', 'false');
      });

      // Toggle the clicked one
      if (!isOpen) {
        item.classList.add('is-open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // ─── VIDEO PLACEHOLDERS (click to embed) ─────────────────────────────
  const videoPlaceholders = document.querySelectorAll('.video-placeholder');
  videoPlaceholders.forEach(placeholder => {
    placeholder.addEventListener('click', () => {
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
      const eased = 1 - Math.pow(1 - progress, 3); // ease out cubic
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

  // ─── YOUTUBE THUMBNAIL LAZY LOADER ───────────────────────────────────
  document.querySelectorAll('.yt-embed-container').forEach(container => {
    const videoId = container.dataset.videoId;
    if (!videoId) return;

    // Ocultar el iframe original hasta que el usuario haga click
    const iframe = container.querySelector('iframe');
    if (iframe) iframe.style.display = 'none';

    // Crear el thumbnail clickeable
    const thumb = document.createElement('div');
    thumb.className = 'yt-thumb';
    thumb.style.cssText = [
      'position: absolute',
      'inset: 0',
      'cursor: pointer',
      'background: #000 url("https://i.ytimg.com/vi/' + videoId + '/hqdefault.jpg") center / cover no-repeat',
      'display: flex',
      'align-items: center',
      'justify-content: center',
      'z-index: 2',
    ].join(';');

    // Botón play estilo YouTube
    const playBtn = document.createElement('div');
    playBtn.style.cssText = 'transition: transform 0.2s ease; filter: drop-shadow(0 2px 10px rgba(0,0,0,0.6));';
    playBtn.innerHTML = `
      <svg width="68" height="48" viewBox="0 0 68 48" xmlns="http://www.w3.org/2000/svg">
        <path d="M66.5 7.7c-.8-2.9-3-5.2-5.9-6C55.8 0 34 0 34 0S12.2 0 7.4 1.7c-2.9.8-5.1 3.1-5.9 6C0 12.5 0 24 0 24s0 11.5 1.5 16.3c.8 2.9 3 5.2 5.9 6C12.2 48 34 48 34 48s21.8 0 26.6-1.7c2.9-.8 5.1-3.1 5.9-6C68 35.5 68 24 68 24s0-11.5-1.5-16.3z" fill="#FF0000"/>
        <path d="M27 34l18-10-18-10v20z" fill="#FFFFFF"/>
      </svg>
    `;

    thumb.appendChild(playBtn);
    container.appendChild(thumb);

    // Hover: escalar el botón play
    thumb.addEventListener('mouseenter', () => {
      playBtn.style.transform = 'scale(1.12)';
    });
    thumb.addEventListener('mouseleave', () => {
      playBtn.style.transform = 'scale(1)';
    });

    // Click: mostrar el iframe con autoplay
    thumb.addEventListener('click', () => {
      if (iframe) {
        const src = iframe.getAttribute('src');
        // Agregar autoplay al src existente (ya tiene otros params)
        iframe.setAttribute(
          'src',
          src + (src.includes('?') ? '&' : '?') + 'autoplay=1'
        );
        iframe.style.display = 'block';
      }
      thumb.remove();
    });
  });

});