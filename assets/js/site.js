/* ==========================================================================
   CLARENCE THUNDER 12U — SITE ENGINE
   Header, footer, countdown, reveals, lightbox, forms, structured data.
   You shouldn't need to edit this file for normal content updates.
   ========================================================================== */
(function () {
  "use strict";

  /* ---------- tiny helpers ---------- */
  const $  = (sel, ctx) => (ctx || document).querySelector(sel);
  const $$ = (sel, ctx) => Array.from((ctx || document).querySelectorAll(sel));
  const esc = (s) =>
    String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");

  const money = (n) =>
    "$" + Number(n || 0).toLocaleString("en-US", { maximumFractionDigits: 0 });

  // Parse "YYYY-MM-DD" as a LOCAL date (avoids the UTC off-by-one day bug)
  const parseDate = (d, t) => {
    if (!d) return null;
    const [y, m, day] = d.split("-").map(Number);
    let hh = 0, mm = 0;
    if (t) { const p = t.split(":").map(Number); hh = p[0] || 0; mm = p[1] || 0; }
    return new Date(y, (m || 1) - 1, day || 1, hh, mm);
  };

  const DAYS   = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

  const fmt = {
    long:  (d) => { const x = parseDate(d); return x ? `${DAYS[x.getDay()]}, ${MONTHS[x.getMonth()]} ${x.getDate()}` : ""; },
    medium:(d) => { const x = parseDate(d); return x ? `${MONTHS[x.getMonth()].slice(0,3)} ${x.getDate()}, ${x.getFullYear()}` : ""; },
    dow:   (d) => { const x = parseDate(d); return x ? DAYS[x.getDay()].slice(0,3) : ""; },
    day:   (d) => { const x = parseDate(d); return x ? x.getDate() : ""; },
    mon:   (d) => { const x = parseDate(d); return x ? MONTHS[x.getMonth()].slice(0,3) : ""; },
    time:  (t) => {
      if (!t) return "";
      const [h, m] = t.split(":").map(Number);
      const ap = h >= 12 ? "PM" : "AM";
      const hr = h % 12 === 0 ? 12 : h % 12;
      return `${hr}:${String(m).padStart(2,"0")} ${ap}`;
    }
  };

  /* ---------- icons ---------- */
  const icon = {
    arrow: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    pin:   '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/></svg>',
    clock: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
    field: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3 3 12l9 9 9-9-9-9z"/><path d="M8 12a4 4 0 0 1 8 0"/></svg>',
    cal:   '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>',
    nav:   '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11l19-8-8 19-2-8-9-3z"/></svg>',
    check: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>',
    play:  '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>',
    facebook:  '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0 0 22 12z"/></svg>',
    instagram: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none"/></svg>',
    x:         '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.2 2H21l-6.5 7.4L22 22h-6l-4.7-6.2L5.8 22H3l7-8-7.3-12h6.2l4.3 5.7L18.2 2zm-1 18h1.6L7.9 3.7H6.1L17.2 20z"/></svg>',
    youtube:   '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12s0-3.3-.4-4.8a2.5 2.5 0 0 0-1.8-1.8C18.3 5 12 5 12 5s-6.3 0-7.8.4a2.5 2.5 0 0 0-1.8 1.8C2 8.7 2 12 2 12s0 3.3.4 4.8a2.5 2.5 0 0 0 1.8 1.8C5.7 19 12 19 12 19s6.3 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8C22 15.3 22 12 22 12zM10 15V9l5.2 3L10 15z"/></svg>',
    mail:      '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>'
  };

  /* ---------- current page ---------- */
  const currentPage = (() => {
    const p = window.location.pathname.split("/").pop();
    return !p || p === "" ? "index.html" : p;
  })();

  /* ======================================================================
     HEADER + MOBILE NAV
     ====================================================================== */
  function socialIcons() {
    return Object.entries(siteConfig.social)
      .filter(([, url]) => url)
      .map(([k, url]) =>
        `<a href="${esc(url)}" target="_blank" rel="noopener" aria-label="${k} (opens in a new tab)">${icon[k] || icon.mail}</a>`
      ).join("");
  }

  function buildHeader() {
    const host = $("#site-header");
    if (!host) return;

    const links = navData.map((n) => {
      const cur = n.href === currentPage ? ' aria-current="page"' : "";
      return `<a href="${n.href}"${cur}>${esc(n.label)}</a>`;
    }).join("");

    // "More" dropdown - highlights itself when the current page lives inside it.
    const moreCurrent = navMore.some((n) => n.href === currentPage);
    const moreLinks = navMore.map((n) => {
      const cur = n.href === currentPage ? ' aria-current="page"' : "";
      return `<a href="${n.href}"${cur}>${esc(n.label)}</a>`;
    }).join("");
    const more = `
      <div class="nav-more${moreCurrent ? " nav-more--current" : ""}">
        <button class="nav-more__btn" type="button" aria-expanded="false" aria-haspopup="true">
          More
          <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>
        </button>
        <div class="nav-more__menu">${moreLinks}</div>
      </div>`;

    host.className = "site-header";
    host.innerHTML = `
      <div class="site-header__inner">
        <a class="brand" href="index.html" aria-label="${esc(siteConfig.teamName)} home">
          <img src="${siteConfig.logo}" alt="" width="46" height="46">
          <span class="brand__text">
            <span class="brand__name">Clarence Thunder</span>
            <span class="brand__sub">${esc(siteConfig.ageGroup)} &middot; ${esc(siteConfig.location)}</span>
          </span>
        </a>
        <nav class="nav" aria-label="Main">${links}${more}</nav>
        <div class="header__cta">
          <div class="socials socials--header">${socialIcons()}</div>
          <a class="btn btn--sm" href="sponsors.html">Support the Thunder</a>
          <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="mobile-nav" aria-label="Open menu">
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>`;

    const drawer = document.createElement("div");
    drawer.className = "mobile-nav";
    drawer.id = "mobile-nav";
    drawer.innerHTML = `
      <div class="mobile-nav__panel">
        <div class="mobile-nav__cta mobile-nav__cta--top">
          <a class="btn btn--block" href="sponsors.html">Support the Thunder</a>
        </div>
        ${navData.map((n) => {
          const cur = n.href === currentPage ? ' aria-current="page"' : "";
          return `<a class="mobile-link" href="${n.href}"${cur}>${esc(n.label)}<i>&rsaquo;</i></a>`;
        }).join("")}
        <button class="mobile-link mobile-more__btn" type="button" aria-expanded="${navMore.concat(navExtras).some((n) => n.href === currentPage)}">
          More<i class="mobile-more__chevron">&rsaquo;</i>
        </button>
        <div class="mobile-more__list"${navMore.concat(navExtras).some((n) => n.href === currentPage) ? "" : " hidden"}>
          ${navMore.concat(navExtras).map((n) => {
            const cur = n.href === currentPage ? ' aria-current="page"' : "";
            return `<a class="mobile-link mobile-link--sub" href="${n.href}"${cur}>${esc(n.label)}<i>&rsaquo;</i></a>`;
          }).join("")}
        </div>
        <div class="mobile-nav__cta">
          <a class="btn btn--outline btn--block" href="fundraising.html">Support a Fundraiser</a>
        </div>
        <div class="socials socials--drawer">${socialIcons()}</div>
        <div class="mobile-nav__meta">
          <a href="mailto:${esc(siteConfig.email)}">${esc(siteConfig.email)}</a>
          <span>${esc(siteConfig.location)}</span>
        </div>
      </div>`;
    document.body.appendChild(drawer);

    const toggle = $(".nav-toggle", host);
    const setOpen = (open) => {
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      drawer.classList.toggle("is-open", open);
      document.body.classList.toggle("nav-open", open);
    };
    toggle.addEventListener("click", () =>
      setOpen(toggle.getAttribute("aria-expanded") !== "true")
    );
    $$("a.mobile-link, .mobile-nav__cta a", drawer).forEach((a) =>
      a.addEventListener("click", () => setOpen(false))
    );
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && drawer.classList.contains("is-open")) setOpen(false);
    });

    // Mobile "More" expands and collapses in place
    const mMoreBtn = $(".mobile-more__btn", drawer);
    const mMoreList = $(".mobile-more__list", drawer);
    if (mMoreBtn && mMoreList) {
      mMoreBtn.addEventListener("click", () => {
        const open = mMoreList.hidden;
        mMoreList.hidden = !open;
        mMoreBtn.setAttribute("aria-expanded", String(open));
      });
    }

    // Desktop "More" dropdown - click or hover opens; Escape, outside click,
    // or tabbing away closes.
    const moreWrap = $(".nav-more", host);
    if (moreWrap) {
      const moreBtn = $(".nav-more__btn", moreWrap);
      let hoverTimer;
      const setMore = (open) => {
        clearTimeout(hoverTimer);
        moreWrap.classList.toggle("is-open", open);
        moreBtn.setAttribute("aria-expanded", String(open));
      };
      moreBtn.addEventListener("click", () => setMore(!moreWrap.classList.contains("is-open")));
      // Hover open/close only where hover actually exists - on touch screens
      // these events fire alongside the tap and fight the click toggle.
      if (window.matchMedia("(hover: hover)").matches) {
        // A grace period on mouseleave lets the pointer cross the gap between
        // the button and the menu without the menu snapping shut.
        moreWrap.addEventListener("mouseenter", () => setMore(true));
        moreWrap.addEventListener("mouseleave", () => {
          hoverTimer = setTimeout(() => setMore(false), 220);
        });
      }
      moreWrap.addEventListener("focusout", (e) => {
        if (!moreWrap.contains(e.relatedTarget)) setMore(false);
      });
      // pointerdown, not click: taps on empty page background don't reliably
      // bubble a click to document on touch devices, which left the menu stuck.
      document.addEventListener("pointerdown", (e) => {
        if (!moreWrap.contains(e.target)) setMore(false);
      });
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && moreWrap.classList.contains("is-open")) {
          setMore(false);
          moreBtn.focus();
        }
      });
    }

    // Sticky state
    const onScroll = () => host.classList.toggle("is-stuck", window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ======================================================================
     FOOTER
     ====================================================================== */
  function buildFooter() {
    const host = $("#site-footer");
    if (!host) return;

    const socials = Object.entries(siteConfig.social)
      .filter(([, url]) => url)
      .map(([k, url]) =>
        `<a href="${esc(url)}" target="_blank" rel="noopener" aria-label="${k} (opens in a new tab)">${icon[k] || icon.mail}</a>`
      ).join("");

    const col = (title, items) => `
      <div class="footer-col">
        <h2>${esc(title)}</h2>
        <ul>${items.map((i) => `<li><a href="${i.href}">${esc(i.label)}</a></li>`).join("")}</ul>
      </div>`;

    host.className = "site-footer";
    host.innerHTML = `
      <div class="container">
        <div class="footer-grid">
          <div class="footer-brand">
            <img src="${siteConfig.logo}" alt="${esc(siteConfig.teamName)} logo" width="64" height="64">
            <p><strong>${esc(siteConfig.teamName)} Baseball</strong><br>${esc(siteConfig.location)}</p>
            <p style="margin-top:12px">${esc(siteConfig.tagline)}</p>
            <div class="socials">${socials}
              <a href="mailto:${esc(siteConfig.email)}" aria-label="Email the team">${icon.mail}</a>
            </div>
          </div>
          ${col("Team", navData)}
          ${col("Support", navMore.concat(navExtras))}
          <div class="footer-col">
            <h2>Get In Touch</h2>
            <ul>
              <li><a href="mailto:${esc(siteConfig.email)}">${esc(siteConfig.email)}</a></li>
              ${siteConfig.phone ? `<li><a href="tel:${esc(siteConfig.phone.replace(/[^0-9+]/g,""))}">${esc(siteConfig.phone)}</a></li>` : ""}
            </ul>
            <a class="btn btn--sm" href="sponsors.html" style="margin-top:10px">Become a Sponsor</a>
          </div>
        </div>
        <div class="footer-bottom">
          <span>&copy; ${new Date().getFullYear()} ${esc(siteConfig.orgName)}. All rights reserved.</span>
          <span class="tagline">${esc(siteConfig.missionLine)}</span>
        </div>
        ${siteConfig.photoCredit && siteConfig.photoCredit.name ? `
        <p class="footer-credit" style="padding-bottom:22px;margin-top:-8px">
          Team photography by <a href="${esc(siteConfig.photoCredit.url)}" target="_blank" rel="noopener">${esc(siteConfig.photoCredit.name)}</a>.
        </p>` : ""}
      </div>`;
  }

  /* ======================================================================
     STICKY MOBILE SUPPORT BAR
     ====================================================================== */
  function buildSupportBar() {
    if (document.body.hasAttribute("data-no-support-bar")) return;
    const bar = document.createElement("div");
    bar.className = "support-bar";
    bar.innerHTML = `
      <a class="btn btn--sm" href="sponsors.html">Sponsor the Team</a>
      <a class="btn btn--sm btn--ghost" href="fundraising.html">Donate</a>`;
    document.body.appendChild(bar);
    const onScroll = () => bar.classList.toggle("is-visible", window.scrollY > 520);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ======================================================================
     SCROLL REVEALS + NUMBER COUNTERS + PROGRESS BARS
     ====================================================================== */
  function initReveals() {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const items = $$("[data-reveal]");
    if (reduce || !("IntersectionObserver" in window)) {
      items.forEach((el) => el.classList.add("is-in"));
      $$("[data-progress]").forEach(fillBar);
      $$("[data-countup]").forEach((el) => (el.textContent = el.dataset.countup));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        en.target.classList.add("is-in");
        io.unobserve(en.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px" });
    items.forEach((el) => io.observe(el));

    const io2 = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        if (en.target.hasAttribute("data-progress")) fillBar(en.target);
        if (en.target.hasAttribute("data-countup")) countUp(en.target);
        io2.unobserve(en.target);
      });
    }, { threshold: 0.4 });
    $$("[data-progress], [data-countup]").forEach((el) => io2.observe(el));
  }

  function fillBar(el) {
    requestAnimationFrame(() => { el.style.width = el.dataset.progress + "%"; });
  }

  function countUp(el) {
    const target = parseFloat(el.dataset.countup) || 0;
    const prefix = el.dataset.prefix || "";
    const dur = 1200;
    const start = performance.now();
    const step = (now) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const val = Math.round(target * eased);
      el.textContent = prefix + val.toLocaleString("en-US");
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  /* ======================================================================
     COOPERSTOWN COUNTDOWN
     ====================================================================== */
  function initCountdown() {
    const hosts = $$("[data-countdown]");
    if (!hosts.length) return;
    const target = parseDate(cooperstownConfig.startDate, "09:00");

    const tick = () => {
      const diff = target - new Date();
      const done = diff <= 0;
      const s = Math.max(0, Math.floor(diff / 1000));
      const d = Math.floor(s / 86400);
      const h = Math.floor((s % 86400) / 3600);
      const m = Math.floor((s % 3600) / 60);
      const sec = s % 60;

      hosts.forEach((host) => {
        if (host.dataset.countdown === "days-inline") {
          host.textContent = done ? "0" : d.toLocaleString("en-US");
          return;
        }
        if (host.dataset.countdown === "days") {
          host.innerHTML = done
            ? `<span>WE'RE HERE.</span> COOPERSTOWN 2027`
            : `<span>${d}</span> Day${d === 1 ? "" : "s"} Until Cooperstown`;
          return;
        }
        host.innerHTML = [
          [d, "Days"], [h, "Hours"], [m, "Minutes"], [sec, "Seconds"]
        ].map(([v, l]) =>
          `<div class="count-unit"><div class="v">${String(v).padStart(2,"0")}</div><div class="l">${l}</div></div>`
        ).join("");
      });
    };
    tick();
    setInterval(tick, 1000);
  }

  /* ======================================================================
     LIGHTBOX (gallery + article photos)
     ====================================================================== */
  const lightbox = {
    items: [], index: 0, el: null, lastFocus: null,

    ensure() {
      if (this.el) return this.el;
      const el = document.createElement("div");
      el.className = "lightbox";
      el.setAttribute("role", "dialog");
      el.setAttribute("aria-modal", "true");
      el.setAttribute("aria-label", "Photo viewer");
      el.innerHTML = `
        <button class="lightbox__close" type="button" aria-label="Close photo viewer">&times;</button>
        <div class="lightbox__count"></div>
        <button class="lightbox__nav lightbox__nav--prev" type="button" aria-label="Previous photo">&lsaquo;</button>
        <div class="lightbox__stage"></div>
        <button class="lightbox__nav lightbox__nav--next" type="button" aria-label="Next photo">&rsaquo;</button>
        <div class="lightbox__cap"></div>`;
      document.body.appendChild(el);
      $(".lightbox__close", el).addEventListener("click", () => this.close());
      $(".lightbox__nav--prev", el).addEventListener("click", () => this.go(-1));
      $(".lightbox__nav--next", el).addEventListener("click", () => this.go(1));
      el.addEventListener("click", (e) => { if (e.target === el) this.close(); });
      document.addEventListener("keydown", (e) => {
        if (!el.classList.contains("is-open")) return;
        if (e.key === "Escape") this.close();
        if (e.key === "ArrowLeft") this.go(-1);
        if (e.key === "ArrowRight") this.go(1);
      });
      this.el = el;
      return el;
    },

    open(items, index) {
      this.lastFocus = document.activeElement;
      this.items = items; this.index = index;
      const el = this.ensure();
      el.classList.add("is-open");
      document.body.classList.add("nav-open");
      this.render();
      $(".lightbox__close", el).focus();
    },

    render() {
      const el = this.el;
      const it = this.items[this.index];
      const stage = $(".lightbox__stage", el);
      stage.innerHTML = it.videoUrl
        ? `<div class="lightbox__frame"><iframe src="${esc(it.videoUrl)}" title="${esc(it.caption || "Team video")}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>`
        : `<img class="lightbox__img" src="${esc(it.full)}" alt="${esc(it.caption || "")}">`;
      $(".lightbox__cap", el).innerHTML = it.caption
        ? `<b>${esc(it.categoryLabel || "Thunder in Action")}</b>${esc(it.caption)}`
        : "";
      $(".lightbox__count", el).textContent = `${this.index + 1} / ${this.items.length}`;
      const multi = this.items.length > 1;
      $(".lightbox__nav--prev", el).style.display = multi ? "" : "none";
      $(".lightbox__nav--next", el).style.display = multi ? "" : "none";
    },

    go(dir) {
      if (!this.items.length) return;
      this.index = (this.index + dir + this.items.length) % this.items.length;
      this.render();
    },

    close() {
      if (!this.el) return;
      this.el.classList.remove("is-open");
      document.body.classList.remove("nav-open");
      $(".lightbox__stage", this.el).innerHTML = "";
      if (this.lastFocus) this.lastFocus.focus();
    }
  };

  /* ======================================================================
     GENERIC MODAL
     ====================================================================== */
  const modal = {
    el: null, lastFocus: null,
    ensure() {
      if (this.el) return this.el;
      const el = document.createElement("div");
      el.className = "modal";
      el.setAttribute("role", "dialog");
      el.setAttribute("aria-modal", "true");
      el.innerHTML = `
        <div class="modal__backdrop"></div>
        <div class="modal__panel">
          <button class="modal__close" type="button" aria-label="Close">&times;</button>
          <div class="modal__content"></div>
        </div>`;
      document.body.appendChild(el);
      $(".modal__backdrop", el).addEventListener("click", () => this.close());
      $(".modal__close", el).addEventListener("click", () => this.close());
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && el.classList.contains("is-open")) this.close();
      });
      this.el = el;
      return el;
    },
    open(html, label) {
      this.lastFocus = document.activeElement;
      const el = this.ensure();
      $(".modal__content", el).innerHTML = html;
      el.setAttribute("aria-label", label || "Dialog");
      el.classList.add("is-open");
      document.body.classList.add("nav-open");
      $(".modal__close", el).focus();
      return el;
    },
    close() {
      if (!this.el) return;
      this.el.classList.remove("is-open");
      document.body.classList.remove("nav-open");
      $(".modal__content", this.el).innerHTML = "";
      if (this.lastFocus) this.lastFocus.focus();
    }
  };

  /* ======================================================================
     FORMS — posts to formEndpoint, or falls back to a pre-filled email
     ====================================================================== */
  function initForms() {
    $$("form[data-form]").forEach((form) => {
      form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const status = $(".form-status", form);
        const btn = $("button[type=submit]", form);
        const data = Object.fromEntries(new FormData(form).entries());
        const subject = form.dataset.subject || "Website Enquiry";

        const show = (kind, msg) => {
          if (!status) return;
          status.className = `form-status form-status--${kind} is-visible`;
          status.textContent = msg;
        };

        if (siteConfig.formEndpoint) {
          btn.disabled = true;
          const original = btn.textContent;
          btn.textContent = "Sending...";
          try {
            const res = await fetch(siteConfig.formEndpoint, {
              method: "POST",
              headers: { Accept: "application/json" },
              body: new FormData(form)
            });
            if (!res.ok) throw new Error("Bad response");
            form.reset();
            show("ok", "Thank you - your message is on its way. We'll get back to you shortly.");
          } catch (err) {
            show("err", `Something went wrong sending that. Please email us directly at ${siteConfig.email}.`);
          } finally {
            btn.disabled = false;
            btn.textContent = original;
          }
          return;
        }

        // No endpoint configured yet -> open the visitor's email app, pre-filled.
        const body = Object.entries(data)
          .filter(([k]) => k !== "_gotcha")
          .map(([k, v]) => `${k.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}: ${v}`)
          .join("\n");
        window.location.href =
          `mailto:${siteConfig.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        show("ok", "Your email app should be opening with this message ready to send. If it doesn't, email us at " + siteConfig.email + ".");
      });
    });
  }

  /* ======================================================================
     CALENDAR (.ics) + DIRECTIONS
     ====================================================================== */
  function icsFor(game) {
    const start = parseDate(game.date, game.time);
    const end = new Date(start.getTime() + 2 * 60 * 60 * 1000);
    const z = (d) =>
      d.getFullYear() +
      String(d.getMonth() + 1).padStart(2, "0") +
      String(d.getDate()).padStart(2, "0") + "T" +
      String(d.getHours()).padStart(2, "0") +
      String(d.getMinutes()).padStart(2, "0") + "00";
    const title = `${siteConfig.shortName} vs ${game.opponent}`;
    const loc = [game.field, game.city].filter(Boolean).join(", ");
    return [
      "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Clarence Thunder 12U//EN",
      "BEGIN:VEVENT",
      `UID:${game.date}-${game.time}-${Math.random().toString(36).slice(2)}@clarencethunder`,
      `DTSTAMP:${z(new Date())}`,
      `DTSTART:${z(start)}`,
      `DTEND:${z(end)}`,
      `SUMMARY:${title}`,
      `DESCRIPTION:${game.event || "Clarence Thunder 12U"}`,
      `LOCATION:${loc}`,
      "END:VEVENT", "END:VCALENDAR"
    ].join("\r\n");
  }

  function downloadIcs(game) {
    const blob = new Blob([icsFor(game)], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `thunder-vs-${String(game.opponent).toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${game.date}.ics`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  const directionsUrl = (game) =>
    "https://www.google.com/maps/dir/?api=1&destination=" +
    encodeURIComponent([game.field, game.city].filter(Boolean).join(", "));

  /* ======================================================================
     STRUCTURED DATA (SEO)
     ====================================================================== */
  function injectSchema() {
    const base = siteConfig.siteUrl.replace(/\/$/, "");
    const graph = [
      {
        "@type": "SportsTeam",
        "@id": base + "/#team",
        name: siteConfig.teamName,
        alternateName: siteConfig.orgName,
        sport: "Baseball",
        url: base,
        logo: base + "/" + siteConfig.logo,
        email: siteConfig.email,
        location: {
          "@type": "Place",
          address: {
            "@type": "PostalAddress",
            addressLocality: siteConfig.city,
            addressRegion: siteConfig.state,
            addressCountry: "US"
          }
        },
        sameAs: Object.values(siteConfig.social).filter(Boolean),
        memberOf: { "@type": "SportsOrganization", name: siteConfig.orgName }
      },
      {
        "@type": "WebSite",
        "@id": base + "/#website",
        url: base,
        name: siteConfig.teamName,
        publisher: { "@id": base + "/#team" }
      }
    ];

    // Upcoming games as SportsEvents
    (scheduleData.games || [])
      .filter((g) => g.status === "upcoming")
      .slice(0, 12)
      .forEach((g) => {
        const start = parseDate(g.date, g.time);
        graph.push({
          "@type": "SportsEvent",
          name: `${siteConfig.teamName} vs ${g.opponent}`,
          startDate: start ? start.toISOString() : g.date,
          eventStatus: "https://schema.org/EventScheduled",
          eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
          location: {
            "@type": "Place",
            name: g.field,
            address: { "@type": "PostalAddress", addressLocality: g.city }
          },
          competitor: [
            { "@type": "SportsTeam", name: siteConfig.teamName },
            { "@type": "SportsTeam", name: g.opponent }
          ],
          organizer: { "@id": base + "/#team" }
        });
      });

    // Page-specific article schema
    if (window.__ARTICLE__) {
      const a = window.__ARTICLE__;
      graph.push({
        "@type": "NewsArticle",
        headline: a.title,
        datePublished: a.date,
        image: base + "/" + a.image,
        author: { "@type": "Organization", name: siteConfig.orgName },
        publisher: { "@id": base + "/#team" },
        mainEntityOfPage: base + "/news-article.html?post=" + a.slug
      });
    }

    const el = document.createElement("script");
    el.type = "application/ld+json";
    el.textContent = JSON.stringify({ "@context": "https://schema.org", "@graph": graph });
    document.head.appendChild(el);
  }

  /* ======================================================================
     MARQUEE (duplicated track so the loop is seamless)
     ====================================================================== */
  function initMarquee() {
    $$(".marquee").forEach((m) => {
      const track = $(".marquee__track", m);
      if (!track) return;
      track.innerHTML = track.innerHTML + track.innerHTML;
    });
  }

  /* ---------- expose helpers for page scripts ---------- */
  window.TH = {
    $, $$, esc, money, parseDate, fmt, icon, lightbox, modal,
    downloadIcs, directionsUrl, currentPage, countUp
  };

  /* ---------- boot ---------- */
  document.addEventListener("DOMContentLoaded", () => {
    buildHeader();
    buildFooter();
    buildSupportBar();
    if (window.renderPage) window.renderPage();   // from render.js / page scripts
    initMarquee();
    initForms();
    initCountdown();
    initReveals();
    injectSchema();
  });
})();
