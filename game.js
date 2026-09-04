/* justind.kim: starfield, title menu, dialogue engine, tech tree, attribute bars */
(() => {
  'use strict';

  document.documentElement.classList.add('js-on');

  const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  /* if the GSAP CDN fails the site still works, the animations just don't play */
  const HAS_GSAP = typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined';
  if (HAS_GSAP) gsap.registerPlugin(ScrollTrigger);
  const ANIMATE = HAS_GSAP && !REDUCED;

  /* ---------- starfield ---------- */
  (() => {
    const canvas = document.getElementById('star-canvas');
    const ctx = canvas.getContext('2d');
    let stars;

    function reset() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      stars = Array.from({ length: 120 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.2 + 0.2,
        speed: Math.random() * 0.003 + 0.001,
        phase: Math.random() * Math.PI * 2,
      }));
    }

    function draw(t) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const s of stars) {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(126,200,255,${0.25 + 0.45 * Math.abs(Math.sin(t * s.speed + s.phase))})`;
        ctx.fill();
      }
      if (!REDUCED) requestAnimationFrame(draw); /* reduced motion: one static frame */
    }

    reset();
    requestAnimationFrame(draw);
    window.addEventListener('resize', () => {
      /* height-only changes (mobile URL bar) keep the stars where they are */
      if (canvas.width === window.innerWidth) canvas.height = window.innerHeight;
      else reset();
      if (REDUCED) requestAnimationFrame(draw);
    });
  })();

  /* ---------- scroll reveals ---------- */
  function reveal(selector, from, stagger = 0.07) {
    if (!ANIMATE) return;
    gsap.utils.toArray(selector).forEach((el, i) => gsap.from(el, {
      opacity: 0, duration: 0.55, ease: 'power2.out', ...from,
      delay: (i % 5) * stagger,
      /* clear only what the tween set: a leftover inline transform kills CSS hover lifts,
         and 'all' would also wipe the --lv custom property on attribute rows */
      clearProps: 'opacity,transform',
      scrollTrigger: { trigger: el, start: 'top 90%', once: true },
    }));
  }

  reveal('.section-title, .char-bio p, .project-bubble, .attr-row', { y: 20 });
  reveal('.info-row', { x: 20 });
  reveal('.tl-item', { x: -30, duration: 0.6 }, 0.1);

  /* ---------- character level: age, birthday 11/28/1996 ---------- */
  (() => {
    const el = document.getElementById('char-lvl');
    const now = new Date();
    const lvl = now.getFullYear() - 1996 - (now < new Date(now.getFullYear(), 10, 28) ? 1 : 0);
    const show = (n) => { el.textContent = String(n).padStart(2, '0'); };
    if (!ANIMATE) return show(lvl);
    const counter = { v: 0 };
    show(0);
    gsap.to(counter, {
      v: lvl, duration: 1.4, ease: 'power2.out', snap: { v: 1 },
      onUpdate: () => show(Math.round(counter.v)),
      scrollTrigger: { trigger: el, start: 'top 92%', once: true },
    });
  })();

  /* ---------- title screen: keyboard menu + restart button ---------- */
  (() => {
    const hero = document.getElementById('hero');
    const btn = document.getElementById('restart-btn');
    const items = Array.from(document.querySelectorAll('.menu-item'));
    let sel = 0;
    let heroGone = false;

    const setActive = (i) => {
      sel = i;
      items.forEach((it, j) => it.classList.toggle('is-active', j === i));
    };
    setActive(0);
    items.forEach((it, i) => it.addEventListener('mouseenter', () => setActive(i)));

    document.addEventListener('keydown', (e) => {
      if (heroGone || (e.key !== 'ArrowDown' && e.key !== 'ArrowUp')) return;
      e.preventDefault();
      const next = (sel + (e.key === 'ArrowDown' ? 1 : -1) + items.length) % items.length;
      items[next].focus();
      setActive(next);
    });

    /* once 60% of the hero has scrolled away the menu stops eating arrow keys and Restart appears */
    new IntersectionObserver(([entry]) => {
      heroGone = entry.intersectionRatio < 0.4;
      btn.classList.toggle('show', heroGone);
    }, { threshold: 0.4 }).observe(hero);

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      window.scrollTo({ top: 0, behavior: REDUCED ? 'instant' : 'smooth' });
    });
  })();

  /* ---------- dialogue box ---------- */
  const say = (() => {
    const box = document.getElementById('dialogue-box');
    const name = box.querySelector('.dlg-name');
    const text = box.querySelector('.dlg-text');
    let typeTimer, hideTimer;
    let current = '';
    let state = 'closed'; /* closed | typing | open */

    function close() {
      clearTimeout(hideTimer);
      clearInterval(typeTimer);
      state = 'closed';
      box.classList.remove('show');
      document.body.classList.remove('dlg-open');
    }

    function finish() {
      clearInterval(typeTimer);
      text.textContent = current;
      state = 'open';
      hideTimer = setTimeout(close, 8000);
    }

    /* who: small header in the box; line: typewritten body */
    function say(who, line) {
      clearTimeout(hideTimer);
      clearInterval(typeTimer);
      current = line;
      name.textContent = who;
      text.textContent = '';
      box.classList.add('show');
      document.body.classList.add('dlg-open');
      state = 'typing';
      if (REDUCED) return finish();
      let i = 0;
      typeTimer = setInterval(() => {
        text.textContent = current.slice(0, ++i);
        if (i >= current.length) finish();
      }, 24);
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

  /* ---------- clickable details: journey cards and attribute rows open the box ---------- */
  function wire(el, who, line) {
    el.tabIndex = 0;
    el.setAttribute('role', 'button');
    const open = (e) => { e.stopPropagation(); say(who, line); };
    el.addEventListener('click', open);
    el.addEventListener('keydown', (e) => { if (e.key === 'Enter') open(e); });
  }

  document.querySelectorAll('.tl-content[data-line]').forEach((c) => {
    wire(c, c.querySelector('.tl-org').textContent, c.dataset.line);
  });

  document.querySelectorAll('.attr-row').forEach((row) => {
    const t = (sel) => row.querySelector(sel).textContent;
    wire(row, t('.attr-name').toUpperCase(), `${t('.attr-lv')} · ${t('.attr-flavor')}`);
  });

  /* ---------- tech tree ---------- */
  (() => {
    const svg = document.getElementById('techtree');
    const wrap = document.getElementById('tt-wrap');
    const tooltip = document.getElementById('tt-tooltip');
    const tipName = tooltip.querySelector('.tt-name');
    const tipDesc = tooltip.querySelector('.tt-desc');
    const NS = 'http://www.w3.org/2000/svg';

    /* x/y: 720x770 landscape viewBox. mx/my: hand-placed portrait coords in a 480-wide
       viewBox, one constellation per category with its tools scattered around the main
       star. accent lives on the five roots and children inherit it. */
    const NODES = [
      { id: 'scripting',  label: 'SCRIPTING',        desc: 'Languages for building and automating.',          accent: 'blue',   x: 140, y: 95,  mx: 240, my: 60 },
      { id: 'webdev',     label: 'WEB DEVELOPMENT',  desc: 'Sites built by hand, including this one.',        accent: 'purple', x: 460, y: 115, mx: 240, my: 330 },
      { id: 'cloud',      label: 'CLOUD & DEVOPS',   desc: 'Infrastructure and the pipelines that ship it.',  accent: 'green',  x: 120, y: 360, mx: 240, my: 610 },
      { id: 'data',       label: 'DATA & ANALYTICS', desc: 'From raw tables to maps and dashboards.',         accent: 'yellow', x: 540, y: 420, mx: 240, my: 860 },
      { id: 'enterprise', label: 'OTHER SKILLS',     desc: 'Everything that doesn’t fit a neat box.',         accent: 'pink',   x: 290, y: 585, mx: 240, my: 1110 },

      { id: 'csharp',     label: 'C#',         desc: 'The main one. Apps, tooling, and Godot experiments.', parents: ['scripting'], x: 290, y: 45,  mx: 110, my: 135 },
      { id: 'python',     label: 'PYTHON',     desc: 'Scripts, automation, and data wrangling.',            parents: ['scripting'], x: 250, y: 180, mx: 205, my: 200 },
      { id: 'powershell', label: 'POWERSHELL', desc: 'Automation for the Windows fleet.',                   parents: ['scripting'], x: 95,  y: 230, mx: 345, my: 230 },
      { id: 'gdscript',   label: 'GDSCRIPT',   desc: 'Godot’s own language, for the game experiments.',     parents: ['scripting'], x: 355, y: 130, mx: 370, my: 115 },

      { id: 'javascript', label: 'JAVASCRIPT', desc: 'For the web. This site runs on it.',      parents: ['webdev'],     x: 590, y: 50,  mx: 120, my: 400 },
      { id: 'nodejs',     label: 'NODE.JS',    desc: 'JavaScript on the server.',               parents: ['javascript'], x: 660, y: 155, mx: 95,  my: 495 },
      { id: 'html',       label: 'HTML/CSS',   desc: 'Plain pages, no framework.',              parents: ['webdev'],     x: 545, y: 230, mx: 370, my: 390 },
      { id: 'php',        label: 'PHP',        desc: 'Server-rendered pages, the classic way.', parents: ['webdev'],     x: 420, y: 235, mx: 295, my: 475 },

      { id: 'azure', label: 'AZURE', desc: 'Cloud infrastructure and services.',      parents: ['cloud'], x: 270, y: 320, mx: 125, my: 675 },
      { id: 'aws',   label: 'AWS',   desc: 'Comfortable in the console and the CLI.', parents: ['cloud'], x: 300, y: 420, mx: 355, my: 670 },
      { id: 'cicd',  label: 'CI/CD', desc: 'Pipelines that build, test, and deploy.', parents: ['cloud'], x: 185, y: 480, mx: 255, my: 745 },

      { id: 'sql',     label: 'SQL',      desc: 'Queries, schemas, and data management.',  parents: ['data'], x: 665, y: 335, mx: 110, my: 925 },
      { id: 'powerbi', label: 'POWER BI', desc: 'Reports and dashboards for the day job.', parents: ['data'], x: 675, y: 490, mx: 365, my: 915 },
      { id: 'arcgis',  label: 'ARCGIS',   desc: 'Geospatial analysis and mapping.',        parents: ['data'], x: 545, y: 540, mx: 270, my: 995 },

      { id: 'itsupport',  label: 'IT SUPPORT',  desc: 'Where it started. Help desk to systems analyst.',     parents: ['enterprise'], x: 130, y: 625, mx: 100, my: 1175 },
      { id: 'ai',         label: 'AI TOOLING',  desc: 'LLMs, agents, and AI-assisted workflows.',            parents: ['enterprise'], x: 430, y: 640, mx: 330, my: 1190 },
      { id: 'claudecode', label: 'CLAUDE CODE', desc: 'Daily driver. It helped build this site.',           parents: ['ai'],         x: 600, y: 620, mx: 165, my: 1270 },
      { id: 'localllm',   label: 'LOCAL LLMS',  desc: 'Self-hosted models running on the homelab.',         parents: ['ai'],         x: 545, y: 720, mx: 395, my: 1285 },
      { id: 'agents',     label: 'AGENTS',      desc: 'Multi-step workflows that handle the boring parts.', parents: ['ai'],         x: 330, y: 725, mx: 290, my: 1350 },
    ];
    const byId = Object.fromEntries(NODES.map((n) => [n.id, n]));
    const rootOf = (n) => (n.parents ? rootOf(byId[n.parents[0]]) : n);
    const depthOf = (n) => (n.parents ? depthOf(byId[n.parents[0]]) + 1 : 0);
    /* leaves take the accent straight; roots get a darker cut of it */
    const colorOf = (n) => (n.parents
      ? `var(--${rootOf(n).accent})`
      : `color-mix(in srgb, var(--${n.accent}) 72%, #000)`);

    const el = (tag, attrs) => {
      const e = document.createElementNS(NS, tag);
      for (const k in attrs) e.setAttribute(k, attrs[k]);
      return e;
    };

    const pos = {};

    function render() {
      const vertical = wrap.clientWidth < 640;
      svg.setAttribute('viewBox', vertical ? '0 0 480 1410' : '0 0 720 770');
      NODES.forEach((n) => { pos[n.id] = vertical ? { x: n.mx, y: n.my } : { x: n.x, y: n.y }; });
      svg.innerHTML = '';
      const edges = svg.appendChild(el('g', {}));
      const nodes = svg.appendChild(el('g', {}));

      NODES.forEach((n) => (n.parents || []).forEach((pid) => edges.appendChild(el('line', {
        x1: pos[pid].x, y1: pos[pid].y, x2: pos[n.id].x, y2: pos[n.id].y,
        class: 'tt-edge', 'data-from': pid, 'data-to': n.id,
      }))));

      NODES.forEach((n) => {
        const g = nodes.appendChild(el('g', {
          class: 'tt-node', 'data-id': n.id,
          transform: `translate(${pos[n.id].x}, ${pos[n.id].y})`,
          tabindex: '0', role: 'button', 'aria-label': `${n.label}: ${n.desc}`,
          style: `color: ${colorOf(n)}`,
        }));
        const r = n.parents ? 11 : 15; /* main nodes read bigger */
        /* the inner group takes the reveal tween so it never clobbers the positioning transform */
        const inner = g.appendChild(el('g', { class: 'tt-inner' }));
        inner.appendChild(el('polygon', { points: `0,-${r} ${r},0 0,${r} -${r},0`, class: 'tt-diamond' }));
        inner.appendChild(el('text', { y: 30, 'text-anchor': 'middle', class: 'tt-label', 'font-size': vertical ? 14 : 17 }))
          .textContent = n.label;

        g.addEventListener('mouseenter', () => showTip(n, g));
        g.addEventListener('focus', () => showTip(n, g));
        g.addEventListener('mouseleave', hideTip);
        g.addEventListener('blur', hideTip);
        g.addEventListener('click', (e) => { e.stopPropagation(); hideTip(); say(n.label, n.desc); });
      });
    }

    function showTip(n, g) {
      tipName.textContent = n.label;
      tipName.style.color = colorOf(n);
      tipDesc.textContent = n.desc;
      tooltip.hidden = false;
      const d = g.getBoundingClientRect(), w = wrap.getBoundingClientRect(), t = tooltip.getBoundingClientRect();
      const left = Math.max(0, Math.min(d.left + d.width / 2 - w.left - t.width / 2, w.width - t.width));
      let top = d.top - w.top - t.height - 14;
      if (top < 0) top = d.bottom - w.top + 14;
      tooltip.style.left = `${left}px`;
      tooltip.style.top = `${top}px`;
    }

    const hideTip = () => { tooltip.hidden = true; };

    /* unlock choreography: roots -> edges -> mid -> edges -> leaves, once, on scroll-in */
    let tl = null;

    function animate() {
      if (tl) { tl.scrollTrigger?.kill(); tl.kill(); tl = null; }
      if (!ANIMATE) return; /* everything is already visible */
      const groups = Array.from(svg.querySelectorAll('.tt-inner'));
      const lines = Array.from(svg.querySelectorAll('.tt-edge'));
      gsap.set(groups, { opacity: 0, y: 8 });
      lines.forEach((l) => { l.style.strokeDasharray = l.style.strokeDashoffset = l.getTotalLength(); });

      const depth = (id) => depthOf(byId[id]);
      tl = gsap.timeline({ scrollTrigger: { trigger: wrap, start: 'top 70%', once: true } });
      [0, 1, 2].forEach((d) => {
        tl.to(groups.filter((g) => depth(g.parentNode.dataset.id) === d),
              { opacity: 1, y: 0, duration: 0.22, ease: 'power2.out', stagger: 0.04 });
        const next = lines.filter((l) => depth(l.dataset.from) === d);
        if (next.length) tl.to(next, { strokeDashoffset: 0, duration: 0.28, ease: 'none' });
      });
    }

    render();
    animate();

    let vertical = wrap.clientWidth < 640;
    window.addEventListener('resize', () => {
      hideTip();
      const v = wrap.clientWidth < 640;
      if (v === vertical) return;
      vertical = v;
      render();
      animate();
    });
  })();

  /* ---------- attribute bars ---------- */
  if (ANIMATE) document.querySelectorAll('.attr-fill').forEach((fill) => {
    gsap.from(fill, {
      scaleX: 0, duration: 1.1, ease: 'power3.out',
      scrollTrigger: { trigger: fill.closest('.attr-row'), start: 'top 85%', once: true },
    });
  });
})();
