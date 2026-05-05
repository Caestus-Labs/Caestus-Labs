/* ------------------------------------------------------------------
   Caestus Labs — shared page interactions
   - .reveal / .reveal-stagger via IntersectionObserver
   - data-counter elements tween from 0 → target on reveal
   - .draw-path SVG path length auto-detection
   ------------------------------------------------------------------ */

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ----- Reveal observer ----- */
const revealObserver = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-in');
      if (entry.target.dataset.counter !== undefined) {
        animateCounter(entry.target);
      }
      const counters = entry.target.querySelectorAll('[data-counter]');
      counters.forEach(animateCounter);
      revealObserver.unobserve(entry.target);
    }
  }
}, { threshold: 0.18, rootMargin: '0px 0px -8% 0px' });

document.querySelectorAll('.reveal, .reveal-stagger').forEach(el => revealObserver.observe(el));

/* ----- SVG path length auto-init ----- */
document.querySelectorAll('.draw-path').forEach((path) => {
  if (path.tagName.toLowerCase() === 'path' || path.tagName.toLowerCase() === 'line' || path.tagName.toLowerCase() === 'polyline') {
    try {
      const len = path.getTotalLength();
      path.style.setProperty('--len', len);
    } catch (_) { /* path may not be in DOM yet */ }
  }
});

/* ----- Counter tween -----
   Use: <span class="counter" data-counter data-from="0" data-to="184" data-suffix="g" data-duration="1400"></span>
*/
const counted = new WeakSet();
function animateCounter(el) {
  if (counted.has(el)) return;
  counted.add(el);
  const from = parseFloat(el.dataset.from ?? '0');
  const to = parseFloat(el.dataset.to ?? el.textContent ?? '0');
  const suffix = el.dataset.suffix ?? '';
  const prefix = el.dataset.prefix ?? '';
  const decimals = parseInt(el.dataset.decimals ?? '0', 10);
  const duration = parseInt(el.dataset.duration ?? '1200', 10);

  if (prefersReducedMotion) {
    el.textContent = `${prefix}${to.toFixed(decimals)}${suffix}`;
    return;
  }

  const start = performance.now();
  function frame(now) {
    const t = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - t, 3);
    const v = from + (to - from) * eased;
    el.textContent = `${prefix}${v.toFixed(decimals)}${suffix}`;
    if (t < 1) requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

/* ----- Smooth-scroll anchor links ----- */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const id = a.getAttribute('href');
    if (id.length < 2) return;
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
  });
});
