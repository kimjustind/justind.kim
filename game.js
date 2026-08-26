/* ============================================================
   justind.kim — game.js
   Starfield, title screen, dialogue engine, tech tree, attributes
============================================================ */
(() => {
  'use strict';

  document.documentElement.classList.add('js-on');

  const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  /* if the GSAP CDN fails, everything still works — animations just don't play */
  const HAS_GSAP = typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined';

  /* ============================================================
     STARFIELD
  ============================================================ */
  (function starfield() {
    const canvas = document.getElementById('star-canvas');
    const ctx = canvas.getContext('2d');
    let stars = [];
    const COUNT = 120;

    function resize() {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    function init() {
      stars = [];
      for (let i = 0; i < COUNT; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          r: Math.random() * 1.2 + 0.2,
          speed: Math.random() * 0.003 + 0.001,
          phase: Math.random() * Math.PI * 2,
        });
      }
    }

    function draw(t) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const s of stars) {
        const alpha = 0.25 + 0.45 * Math.abs(Math.sin(t * s.speed + s.phase));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(126,200,255,${alpha})`;
        ctx.fill();
      }
      if (!REDUCED) requestAnimationFrame(draw); /* reduced motion: one static frame */
    }

    resize(); init(); requestAnimationFrame(draw);
    window.addEventListener('resize', () => {
      /* ignore height-only changes (mobile URL bar) so stars don't reshuffle mid-scroll */
      if (canvas.width === window.innerWidth) { canvas.height = window.innerHeight; }
      else { resize(); init(); }
      if (REDUCED) requestAnimationFrame(draw);
    });
  })();

  /* ============================================================
     GSAP SETUP + SCROLL CHOREOGRAPHY
  ============================================================ */
  if (HAS_GSAP) gsap.registerPlugin(ScrollTrigger);

  /* scroll reveals */
  function scrollReveal(selector, vars) {
    if (REDUCED || !HAS_GSAP) return;
    gsap.utils.toArray(selector).forEach((el, i) => {
      gsap.from(el, {
        ...vars,
        delay: (i % 5) * 0.07,
        scrollTrigger: { trigger: el, start: 'top 90%', once: true },
      });
    });
  }

  scrollReveal('.section-title',  { opacity: 0, y: 18, duration: 0.55, ease: 'power2.out' });
  scrollReveal('.about-text p',   { opacity: 0, y: 20, duration: 0.55, ease: 'power2.out' });
  scrollReveal('.info-row',       { opacity: 0, x: 20, duration: 0.45, ease: 'power2.out' });
  scrollReveal('.project-bubble', { opacity: 0, y: 30, duration: 0.55, ease: 'power2.out' });
  scrollReveal('.attr-row',       { opacity: 0, y: 18, duration: 0.5, ease: 'power2.out' });

  if (HAS_GSAP) gsap.utils.toArray('.tl-item').forEach((item, i) => {
    if (REDUCED) return;
    gsap.from(item, {
      opacity: 0, x: -30, duration: 0.6, ease: 'power2.out',
      delay: i * 0.1,
      scrollTrigger: { trigger: item, start: 'top 88%', once: true },
    });
  });

  /* ============================================================
     CHARACTER LEVEL — current date - 11/28/1996
  ============================================================ */
  (function charLevel() {
    const el = document.getElementById('char-lvl');
    if (!el) return;
    const born = new Date(1996, 10, 28);
    const now = new Date();
    let lvl = now.getFullYear() - born.getFullYear();
    const m = now.getMonth() - born.getMonth();
    if (m < 0 || (m === 0 && now.getDate() < born.getDate())) lvl--;
    if (lvl < 0) lvl = 0;

    if (REDUCED || !HAS_GSAP) {
      el.textContent = String(lvl).padStart(2, '0');
      return;
    }
    const counter = { v: 0 };
    el.textContent = '00';
    gsap.to(counter, {
      v: lvl,
      duration: 1.4,
      ease: 'power2.out',
      snap: { v: 1 },
      onUpdate: () => { el.textContent = String(Math.round(counter.v)).padStart(2, '0'); },
      scrollTrigger: { trigger: el, start: 'top 92%', once: true },
    });
  })();

  /* ============================================================
     SECTION TINTS — background tinting only happens inside the
     Journey: each objective re-tints the void to its own accent
     on hover. Everywhere else the void stays base.
  ============================================================ */
  (function sceneTints() {
    if (!HAS_GSAP) return;
    const BASE = '#16161d';
    const setTint = (color) => {
      gsap.to('body', {
        backgroundColor: color,
        duration: 0.9,
        ease: 'power1.inOut',
        overwrite: 'auto',
      });
    };

    /* deep-void takes on the timeline accents: green/yellow/pink/blue —
       on hover rather than scroll */
    const JOURNEY_TINTS = ['#122419', '#272009', '#2c1422', '#11213a'];
    gsap.utils.toArray('#experience .tl-item').forEach((item, i) => {
      const color = JOURNEY_TINTS[i % JOURNEY_TINTS.length];
      item.addEventListener('mouseenter', () => setTint(color));
      item.addEventListener('mouseleave', () => setTint(BASE));
    });
  })();

  /* ============================================================
     TITLE SCREEN MENU — keyboard nav
  ============================================================ */
  (function menu() {
    const items = Array.from(document.querySelectorAll('.menu-item'));
    if (!items.length) return;
    let sel = 0;
    items[0].classList.add('is-active');

    function setActive(i) {
      sel = i;
      items.forEach((it, j) => it.classList.toggle('is-active', j === i));
    }

    items.forEach((it, i) => it.addEventListener('mouseenter', () => setActive(i)));

    document.addEventListener('keydown', (e) => {
      if (window.scrollY > window.innerHeight * 0.8) return;
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        const next = (sel + (e.key === 'ArrowDown' ? 1 : -1) + items.length) % items.length;
        items[next].focus();
        setActive(next);
      }
    });
  })();

  /* ============================================================
     RESTART — appears once the hero scrolls away, warps back to
     the title screen
  ============================================================ */
  (function restart() {
    const btn  = document.getElementById('restart-btn');
    const hero = document.getElementById('hero');
    if (!btn) return;

    let shown = false;

    function update() {
      const limit = (hero ? hero.offsetHeight : window.innerHeight) * 0.6;
      const want = window.scrollY > limit;
      if (want === shown) return;
      shown = want;
      if (want) {
        btn.hidden = false;
        /* separate style computation so the fade-in transition runs */
        void btn.offsetHeight;
        btn.classList.add('show');
      } else {
        btn.classList.remove('show');
        setTimeout(() => { if (!shown) btn.hidden = true; }, 260);
      }
    }

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      window.scrollTo({ top: 0, behavior: REDUCED ? 'auto' : 'smooth' });
    });

    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
  })();

  /* ============================================================
     DIALOGUE ENGINE — opens on click from journey items,
     tech tree nodes, and attributes
  ============================================================ */
  const Dlg = (function dialogue() {
    const box   = document.getElementById('dialogue-box');
    const text  = box.querySelector('.dlg-text');
    let typeTimer = null;
    let hideTimer = null;
    let currentLine = null;
    let state = 'closed'; // closed | typing | open

    function closeDialogue() {
      clearTimeout(hideTimer);
      clearInterval(typeTimer);
      if (state === 'closed') return;
      state = 'closing';
      box.classList.remove('show');
      document.body.classList.remove('dlg-open');
      setTimeout(() => {
        /* a newer say() may have re-opened the box mid-close */
        if (state !== 'closing') return;
        box.hidden = true;
        state = 'closed';
        currentLine = null;
      }, 260);
    }

    function finishTyping() {
      clearInterval(typeTimer);
      text.textContent = currentLine;
      state = 'open';
      hideTimer = setTimeout(closeDialogue, 8000);
    }

    /* name: small header in the box; line: typewritten body */
    function say(name, line) {
      clearTimeout(hideTimer);
      clearInterval(typeTimer);
      currentLine = line;
      box.querySelector('.dlg-name').textContent = name;
      text.textContent = '';
      box.hidden = false;
      /* force a style flush so removing [hidden] and adding .show
         are separate style computations — keeps the fade transition */
      void box.offsetHeight;
      box.classList.add('show');
      document.body.classList.add('dlg-open');
      state = 'typing';

      if (REDUCED) { finishTyping(); return; }
      let idx = 0;
      typeTimer = setInterval(() => {
        idx++;
        text.textContent = line.slice(0, idx);
        if (idx >= line.length) finishTyping();
      }, 24);
    }

    box.addEventListener('click', (e) => {
      e.stopPropagation();
      if (state === 'typing') finishTyping();
      else if (state === 'open') closeDialogue();
    });

    /* click anywhere else dismisses */
    document.addEventListener('click', () => {
      if (state !== 'closed') closeDialogue();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && state === 'typing') finishTyping();
      if (e.key === 'Escape' && state !== 'closed') closeDialogue();
    });

    return { say };
  })();

  /* ============================================================
     CLICKABLE DETAILS — journey items + attributes open the box
  ============================================================ */
  (function clickableDetails() {
    document.querySelectorAll('.tl-content').forEach((c) => {
      if (!c.dataset.line) return;
      c.setAttribute('tabindex', '0');
      c.setAttribute('role', 'button');
      const open = (e) => {
        e.stopPropagation();
        Dlg.say(c.dataset.name, c.dataset.line);
      };
      c.addEventListener('click', open);
      c.addEventListener('keydown', (e) => { if (e.key === 'Enter') open(e); });
    });

    document.querySelectorAll('.attr-row').forEach((row) => {
      row.setAttribute('tabindex', '0');
      row.setAttribute('role', 'button');
      const name = row.querySelector('.attr-name').textContent.toUpperCase();
      const lv = row.querySelector('.attr-lv').textContent;
      const flavor = row.querySelector('.attr-flavor').textContent;
      const open = (e) => {
        e.stopPropagation();
        Dlg.say(name, lv + ' \u00b7 ' + flavor);
      };
      row.addEventListener('click', open);
      row.addEventListener('keydown', (e) => { if (e.key === 'Enter') open(e); });
    });
  })();

  /* ============================================================
     TECH TREE
  ============================================================ */
  (function techTree() {
    const svg = document.getElementById('techtree');
    const wrap = document.getElementById('tt-wrap');
    const tooltip = document.getElementById('tt-tooltip');
    if (!svg || !wrap) return;

    const NS = 'http://www.w3.org/2000/svg';
    /* one color family per constellation; *Dark is the main node */
    const ACCENTS = {
      blue:   '#7ec8ff', blueDark:   '#4e93c9',
      purple: '#c066ff', purpleDark: '#9243cc',
      green:  '#3ddba8', greenDark:  '#26a67d',
      gold:   '#ffc147', goldDark:   '#cc9230',
      pink:   '#ff7ea9', pinkDark:   '#cc5680',
    };

    /* x/y live in a 720x770 landscape viewBox; mx/my are hand-placed
       portrait coords in a 480-wide viewBox — each category is a
       constellation, a main star with its tools scattered around it */
    const NODES = [
      /* main nodes */
      { id: 'scripting',  label: 'SCRIPTING',       desc: 'Languages for building and automating.', accent: 'blueDark', x: 140, y: 95, mx: 240, my: 60 },
      { id: 'webdev',     label: 'WEB DEVELOPMENT', desc: 'Hand-rolled sites — including this one.', accent: 'purpleDark', x: 460, y: 115, mx: 240, my: 330 },
      { id: 'cloud',      label: 'CLOUD & DEVOPS',  desc: 'Infrastructure and the pipelines that ship it.', accent: 'greenDark', x: 120, y: 360, mx: 240, my: 610 },
      { id: 'data',       label: 'DATA & ANALYTICS',desc: 'From raw tables to maps and dashboards.', accent: 'goldDark', x: 540, y: 420, mx: 240, my: 860 },
      { id: 'enterprise', label: 'OTHER SKILLS',    desc: 'Everything that doesn’t fit a neat box.', accent: 'pinkDark', x: 290, y: 585, mx: 240, my: 1110 },

      /* scripting */
      { id: 'csharp',    label: 'C#',         desc: 'Primary language — apps, tooling, and Godot experiments.', parents: ['scripting'], accent: 'blue', x: 290, y: 45, mx: 110, my: 135 },
      { id: 'python',    label: 'PYTHON',     desc: 'Scripts, automation, and data wrangling.', parents: ['scripting'], accent: 'blue', x: 250, y: 180, mx: 205, my: 200 },
      { id: 'powershell',label: 'POWERSHELL', desc: 'Automation for the Windows fleet.', parents: ['scripting'], accent: 'blue', x: 95,  y: 230, mx: 345, my: 230 },
      { id: 'gdscript',  label: 'GDSCRIPT',   desc: 'Godot’s scripting language — for the game experiments.', parents: ['scripting'], accent: 'blue', x: 355, y: 130, mx: 370, my: 115 },

      /* web development */
      { id: 'javascript',label: 'JAVASCRIPT', desc: 'For the web — including this site.', parents: ['webdev'], accent: 'purple', x: 590, y: 50, mx: 120, my: 400 },
      { id: 'nodejs',    label: 'NODE.JS',    desc: 'JavaScript on the server side.', parents: ['javascript'], accent: 'purple', x: 660, y: 155, mx: 95, my: 495 },
      { id: 'html',      label: 'HTML/CSS',   desc: 'Hand-rolled pages, no framework required.', parents: ['webdev'], accent: 'purple', x: 545, y: 230, mx: 370, my: 390 },
      { id: 'php',       label: 'PHP',        desc: 'Server-rendered pages, the classic way.', parents: ['webdev'], accent: 'purple', x: 420, y: 235, mx: 295, my: 475 },

      /* cloud & devops */
      { id: 'azure',     label: 'AZURE',      desc: 'Cloud infrastructure and services.', parents: ['cloud'], accent: 'green', x: 270, y: 320, mx: 125, my: 675 },
      { id: 'aws',       label: 'AWS',        desc: 'Comfortable in the console and the CLI.', parents: ['cloud'], accent: 'green', x: 300, y: 420, mx: 355, my: 670 },
      { id: 'cicd',      label: 'CI/CD',      desc: 'Pipelines that build, test, and deploy.', parents: ['cloud'], accent: 'green', x: 185, y: 480, mx: 255, my: 745 },

      /* data & analytics */
      { id: 'sql',       label: 'SQL',        desc: 'Queries, schemas, and data management.', parents: ['data'], accent: 'gold', x: 665, y: 335, mx: 110, my: 925 },
      { id: 'powerbi',   label: 'POWER BI',   desc: 'Dashboards people actually open.', parents: ['data'], accent: 'gold', x: 675, y: 490, mx: 365, my: 915 },
      { id: 'arcgis',    label: 'ARCGIS',     desc: 'Geospatial analysis and mapping.', parents: ['data'], accent: 'gold', x: 545, y: 540, mx: 270, my: 995 },

      /* other skills */
      { id: 'itsupport', label: 'IT SUPPORT', desc: 'The origin story — help desk to systems analyst.', parents: ['enterprise'], accent: 'pink', x: 130, y: 625, mx: 100, my: 1175 },
      { id: 'ai',        label: 'AI TOOLING', desc: 'LLMs, agents, and AI-assisted workflows.', parents: ['enterprise'], accent: 'pink', x: 430, y: 640, mx: 330, my: 1190 },
      { id: 'claudecode',label: 'CLAUDE CODE',desc: 'Agentic coding, daily driver — it helped build this site.', parents: ['ai'], accent: 'pink', x: 600, y: 620, mx: 165, my: 1270 },
      { id: 'localllm',  label: 'LOCAL LLMS', desc: 'Self-hosted models, tuned and running at home.', parents: ['ai'], accent: 'pink', x: 545, y: 720, mx: 395, my: 1285 },
      { id: 'agents',    label: 'AGENTS',     desc: 'Multi-step agentic workflows that do real work.', parents: ['ai'], accent: 'pink', x: 330, y: 725, mx: 290, my: 1350 },
    ];
    const byId = Object.fromEntries(NODES.map((n) => [n.id, n]));
    const depthOf = (n) => (n.parents ? depthOf(byId[n.parents[0]]) + 1 : 0);

    let posMap = {};

    function el(tag, attrs) {
      const e = document.createElementNS(NS, tag);
      for (const k in attrs) e.setAttribute(k, attrs[k]);
      return e;
    }

    function computeLayout() {
      const vertical = wrap.clientWidth < 640;
      if (!vertical) {
        NODES.forEach((n) => { posMap[n.id] = { x: n.x, y: n.y }; });
        svg.setAttribute('viewBox', '0 0 720 770');
        return { vertical, fontSize: 17 };
      }
      /* portrait: hand-placed constellations, one per category */
      NODES.forEach((n) => { posMap[n.id] = { x: n.mx, y: n.my }; });
      svg.setAttribute('viewBox', '0 0 480 1410');
      return { vertical, fontSize: 14 };
    }

    function render() {
      svg.innerHTML = '';
      posMap = {};
      const { fontSize } = computeLayout();

      const edgeLayer = el('g', {});
      const nodeLayer = el('g', {});
      svg.appendChild(edgeLayer);
      svg.appendChild(nodeLayer);

      /* edges */
      NODES.forEach((n) => {
        (n.parents || []).forEach((pid) => {
          const p = posMap[pid], c = posMap[n.id];
          const line = el('line', {
            x1: p.x, y1: p.y, x2: c.x, y2: c.y,
            class: 'tt-edge', 'data-from': pid, 'data-to': n.id,
          });
          edgeLayer.appendChild(line);
        });
      });

      /* nodes */
      NODES.forEach((n) => {
        const { x, y } = posMap[n.id];
        const g = el('g', {
          class: 'tt-node', 'data-id': n.id,
          transform: `translate(${x}, ${y})`,
          tabindex: '0', role: 'img',
          'aria-label': `${n.label}: ${n.desc}`,
          style: `color: ${ACCENTS[n.accent]}`,
        });
        const r = n.parents ? 11 : 15; /* main nodes read bigger */
        const diamond = el('polygon', {
          points: `0,-${r} ${r},0 0,${r} -${r},0`,
          class: 'tt-diamond',
          stroke: ACCENTS[n.accent],
          style: `color: ${ACCENTS[n.accent]}`,
        });
        const label = el('text', {
          x: 0, y: 30, 'text-anchor': 'middle', class: 'tt-label',
          'font-size': fontSize,
        });
        label.textContent = n.label;
        /* inner group absorbs the reveal animation so gsap's y tween
           never clobbers the outer positioning transform */
        const inner = el('g', { class: 'tt-inner' });
        inner.appendChild(diamond);
        inner.appendChild(label);
        g.appendChild(inner);
        nodeLayer.appendChild(g);

        g.addEventListener('mouseenter', () => showTip(n, g));
        g.addEventListener('mouseleave', hideTip);
        g.addEventListener('focus', () => showTip(n, g));
        g.addEventListener('blur', hideTip);
        g.addEventListener('click', (e) => {
          e.stopPropagation();
          hideTip();
          Dlg.say(n.label, n.desc);
        });
      });
    }

    function showTip(node, gEl) {
      tooltip.querySelector('.tt-name')?.remove();
      tooltip.querySelector('.tt-desc')?.remove();
      const name = document.createElement('span');
      name.className = 'tt-name';
      name.textContent = node.label;
      name.style.color = ACCENTS[node.accent];
      const desc = document.createElement('span');
      desc.className = 'tt-desc';
      desc.textContent = node.desc;
      tooltip.append(name, desc);
      tooltip.hidden = false;

      const dRect = gEl.getBoundingClientRect();
      const wRect = wrap.getBoundingClientRect();
      const tipRect = tooltip.getBoundingClientRect();
      let left = dRect.left + dRect.width / 2 - wRect.left - tipRect.width / 2;
      left = Math.max(0, Math.min(left, wRect.width - tipRect.width));
      let top = dRect.top - wRect.top - tipRect.height - 14;
      if (top < 0) top = dRect.bottom - wRect.top + 14;
      tooltip.style.left = left + 'px';
      tooltip.style.top = top + 'px';
    }

    function hideTip() { tooltip.hidden = true; }

    /* unlock choreography: roots -> edges -> mid -> edges -> leaves */
    let activeTL = null;

    function animate() {
      const lines = Array.from(svg.querySelectorAll('.tt-edge'));

      if (activeTL) { activeTL.scrollTrigger?.kill(); activeTL.kill(); activeTL = null; }
      if (REDUCED || !HAS_GSAP) return; /* everything already visible */

      /* prep hidden states */
      const groups = Array.from(svg.querySelectorAll('.tt-inner'));
      gsap.set(groups, { opacity: 0, y: 8 });
      lines.forEach((l) => {
        const len = l.getTotalLength();
        l.style.strokeDasharray = len;
        l.style.strokeDashoffset = len;
      });

      /* play the whole unlock sequence once, when the tree scrolls into view */
      activeTL = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: wrap,
          start: 'top 70%',
          once: true,
        },
      });

      [0, 1, 2].forEach((d) => {
        activeTL.to(groups.filter((g) => depthOf(byId[g.closest('.tt-node').dataset.id]) === d),
              { opacity: 1, y: 0, duration: 0.22, ease: 'power2.out', stagger: 0.04 });
        activeTL.to(lines.filter((l) => depthOf(byId[l.dataset.from]) === d && depthOf(byId[l.dataset.to]) === d + 1),
              { strokeDashoffset: 0, duration: 0.28 });
      });
    }

    render();
    animate();

    let lastVertical = wrap.clientWidth < 640;
    window.addEventListener('resize', () => {
      const v = wrap.clientWidth < 640;
      if (v !== lastVertical) {
        lastVertical = v;
        render();
        animate();
      } else {
        hideTip();
      }
    });
  })();

  /* ============================================================
     ATTRIBUTE BARS
  ============================================================ */
  (function attributes() {
    if (REDUCED || !HAS_GSAP) return;
    document.querySelectorAll('.attr-fill').forEach((fill) => {
      fill.style.transform = 'scaleX(0)';
      gsap.to(fill, {
        scaleX: 1, duration: 1.1, ease: 'power3.out',
        scrollTrigger: { trigger: fill.closest('.attr-row'), start: 'top 85%', once: true },
      });
    });
  })();
})();
