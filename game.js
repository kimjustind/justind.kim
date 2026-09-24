/* justind.kim: motes, paper parallax, title menu, header, Hollow Knight style dialogue */
(() => {
  'use strict';

  document.documentElement.classList.add('js-on');

  const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  /* if the GSAP CDN fails the site still works, the animations just don't play */
  const HAS_GSAP = typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined';
  if (HAS_GSAP) gsap.registerPlugin(ScrollTrigger);
  const ANIMATE = HAS_GSAP && !REDUCED;

  const hero = document.getElementById('hero');

  /* ---------- motes: warm dust drifting up through the title screen ---------- */
  (() => {
    const canvas = document.getElementById('motes');
    const ctx = canvas.getContext('2d');
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let motes, w, h;
    let visible = true;

    function reset() {
      w = hero.clientWidth;
      h = hero.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      motes = Array.from({ length: Math.round(w / 30) }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.4 + 0.4,
        vy: Math.random() * 0.25 + 0.08,
        sway: Math.random() * Math.PI * 2,
        a: Math.random() * 0.5 + 0.2,
      }));
    }

    function draw(t) {
      ctx.clearRect(0, 0, w, h);
      for (const m of motes) {
        if (!REDUCED) {
          m.y -= m.vy;
          if (m.y < -4) { m.y = h + 4; m.x = Math.random() * w; }
        }
        const x = m.x + Math.sin(t * 0.0006 + m.sway) * 12;
        ctx.beginPath();
        ctx.arc(x, m.y, m.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 210, 170, ${m.a * (0.6 + 0.4 * Math.sin(t * 0.002 + m.sway))})`;
        ctx.shadowColor = 'rgba(255, 179, 138, 0.9)';
        ctx.shadowBlur = 6;
        ctx.fill();
      }
      if (!REDUCED && visible) requestAnimationFrame(draw); /* reduced motion: one static frame */
    }

    reset();
    requestAnimationFrame(draw);
    /* stop drawing once the title screen is off screen */
    new IntersectionObserver(([entry]) => {
      const was = visible;
      visible = entry.isIntersecting;
      if (visible && !was && !REDUCED) requestAnimationFrame(draw);
    }).observe(hero);
    window.addEventListener('resize', () => {
      reset();
      if (REDUCED) requestAnimationFrame(draw);
    });
  })();

  /* ---------- scroll reveals ---------- */
  function reveal(selector, from, stagger = 0.07) {
    if (!ANIMATE) return;
    gsap.utils.toArray(selector).forEach((el, i) => gsap.from(el, {
      opacity: 0, duration: 0.8, ease: 'power3.out', ...from,
      delay: (i % 5) * stagger,
      /* clear only what the tween set: a leftover inline transform kills CSS hover lifts,
         and parallax elements keep their own transform */
      clearProps: from.x || from.y ? 'opacity,transform' : 'opacity',
      scrollTrigger: { trigger: el, start: 'top 90%', once: true },
    }));
  }

  reveal('.section-head, .about-copy > *, .kit, .link-card, .fin', { y: 28 });
  reveal('.tile, .portrait', {}, 0.1);
  reveal('.tl-content', { x: -30 }, 0.1); /* the card, not the rail diamond */

  /* ---------- paper parallax ----------
     [data-depth] elements move inside their nearest [data-parallax] container:
     "away"   (hero)   layers sink at their depth while the page scrolls off them
     "settle" (footer) layers rise into place as the page bottoms out
     default           drift through the viewport, deeper = more travel */
  if (ANIMATE) document.querySelectorAll('[data-parallax] [data-depth]').forEach((el) => {
    const box = el.closest('[data-parallax]');
    const d = parseFloat(el.dataset.depth);
    const mode = box.dataset.parallax;
    const st = { trigger: box, scrub: true, invalidateOnRefresh: true };
    if (mode === 'away') {
      gsap.to(el, { y: () => d * box.offsetHeight * 0.6, ease: 'none', scrollTrigger: { ...st, start: 'top top', end: 'bottom top' } });
    } else if (mode === 'settle') {
      gsap.fromTo(el, { y: d * 140 }, { y: 0, ease: 'none', scrollTrigger: { ...st, start: 'top bottom', end: 'bottom bottom' } });
    } else {
      gsap.fromTo(el, { y: d * 60 }, { y: -d * 60, ease: 'none', scrollTrigger: { ...st, start: 'top bottom', end: 'bottom top' } });
    }
  });

  /* the title fades as it lifts away */
  if (ANIMATE) gsap.to('.hero-content', {
    opacity: 0, ease: 'none',
    scrollTrigger: { trigger: hero, start: 'top top', end: '60% top', scrub: true },
  });

  /* ---------- character level: age, birthday 11/28/1996 ---------- */
  (() => {
    const el = document.getElementById('char-lvl');
    const now = new Date();
    const lvl = now.getFullYear() - 1996 - (now < new Date(now.getFullYear(), 10, 28) ? 1 : 0);
    const show = (n) => { el.textContent = String(n); };
    if (!ANIMATE) return show(lvl);
    const counter = { v: 0 };
    show(0);
    gsap.to(counter, {
      v: lvl, duration: 1.4, ease: 'power2.out', snap: { v: 1 },
      onUpdate: () => show(Math.round(counter.v)),
      scrollTrigger: { trigger: el, start: 'top 92%', once: true },
    });
  })();

  /* ---------- title menu, header, journey rail ---------- */
  (() => {
    const header = document.getElementById('site-header');
    const progress = header.querySelector('.hd-progress');
    const items = Array.from(document.querySelectorAll('.menu-item'));
    let sel = 0;
    let heroGone = false;

    const setActive = (i) => {
      sel = i;
      items.forEach((it, j) => it.classList.toggle('is-active', j === i));
    };
    setActive(0);
    items.forEach((it, i) => {
      it.addEventListener('mouseenter', () => setActive(i));
      it.addEventListener('focus', () => setActive(i));
    });

    document.addEventListener('keydown', (e) => {
      if (heroGone || (e.key !== 'ArrowDown' && e.key !== 'ArrowUp')) return;
      e.preventDefault();
      const next = (sel + (e.key === 'ArrowDown' ? 1 : -1) + items.length) % items.length;
      items[next].focus();
      setActive(next);
    });

    /* once 60% of the hero has scrolled away the menu stops eating arrow keys and the header drops in */
    new IntersectionObserver(([entry]) => {
      heroGone = entry.intersectionRatio < 0.4;
      header.classList.toggle('show', heroGone);
    }, { threshold: 0.4 }).observe(hero);

    /* back to the title screen */
    document.querySelectorAll('a[href="#hero"]').forEach((a) => a.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      window.scrollTo({ top: 0, behavior: REDUCED ? 'instant' : 'smooth' });
    }));

    /* mark the section in the middle of the screen */
    const links = new Map(Array.from(header.querySelectorAll('.hd-nav a'), (a) => [a.getAttribute('href').slice(1), a]));
    const spy = new IntersectionObserver((entries) => entries.forEach((en) => {
      if (en.isIntersecting) links.forEach((a, id) => a.classList.toggle('is-current', id === en.target.id));
    }), { rootMargin: '-45% 0px -50% 0px' });
    links.forEach((_, id) => spy.observe(document.getElementById(id)));

    /* journey diamonds light as their card crosses the middle, and stay lit */
    const rail = new IntersectionObserver((entries) => entries.forEach((en) => {
      if (en.isIntersecting) { en.target.classList.add('is-lit'); rail.unobserve(en.target); }
    }), { rootMargin: '-40% 0px -45% 0px' });
    document.querySelectorAll('.tl-item').forEach((it) => rail.observe(it));

    let ticking = false;
    window.addEventListener('scroll', () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        progress.style.setProperty('--progress', max > 0 ? window.scrollY / max : 0);
        ticking = false;
      });
    }, { passive: true });
  })();

  /* ---------- dialogue box ---------- */
  const say = (() => {
    const box = document.getElementById('dialogue-box');
    const name = box.querySelector('.dlg-name');
    const text = box.querySelector('.dlg-text');
    const STEP = 18; /* ms between characters, matches the CSS delay */
    let typeTimer, hideTimer;
    let state = 'closed'; /* closed | typing | open */

    function close() {
      clearTimeout(hideTimer);
      clearTimeout(typeTimer);
      state = 'closed';
      box.classList.remove('show', 'is-done');
      document.body.classList.remove('dlg-open');
    }

    function finish() {
      clearTimeout(typeTimer);
      text.classList.add('lit', 'done');
      box.classList.add('is-done');
      state = 'open';
      hideTimer = setTimeout(close, 8000);
    }

    /* one span per character, grouped by word so lines only break between words */
    function build(line) {
      text.className = 'dlg-text';
      text.textContent = '';
      const sr = text.appendChild(document.createElement('span'));
      sr.className = 'sr-only';
      sr.textContent = line;
      const vis = text.appendChild(document.createElement('span'));
      vis.setAttribute('aria-hidden', 'true');
      let i = 0;
      line.split(' ').forEach((word, wi) => {
        if (wi) vis.append(' ');
        const w = vis.appendChild(document.createElement('span'));
        w.className = 'w';
        for (const c of word) {
          const ch = w.appendChild(document.createElement('span'));
          ch.className = 'ch';
          ch.style.setProperty('--i', i++);
          ch.textContent = c;
        }
      });
      return i;
    }

    /* who: small name over the ornament; line: the text that surfaces */
    function say(who, line) {
      clearTimeout(hideTimer);
      clearTimeout(typeTimer);
      name.textContent = who;
      const n = build(line);
      box.classList.remove('is-done');
      box.classList.add('show');
      document.body.classList.add('dlg-open');
      state = 'typing';
      if (REDUCED) return finish();
      void text.offsetWidth; /* commit the hidden state so the transition runs */
      text.classList.add('lit');
      typeTimer = setTimeout(finish, n * STEP + 400);
    }

    box.addEventListener('click', (e) => {
      e.stopPropagation();
      if (state === 'typing') finish();
      else close();
    });

    /* click anywhere else dismisses */
    document.addEventListener('click', close);
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && state === 'typing') finish();
      if (e.key === 'Escape') close();
    });

    return say;
  })();

  /* ---------- journey cards open the box: .tl-org speaks data-line ---------- */
  document.querySelectorAll('.tl-content[data-line]').forEach((el) => {
    const open = (e) => { e.stopPropagation(); say(el.querySelector('.tl-org').textContent, el.dataset.line); };
    el.tabIndex = 0;
    el.setAttribute('role', 'button');
    el.addEventListener('click', open);
    el.addEventListener('keydown', (e) => { if (e.key === 'Enter') open(e); });
  });
})();
