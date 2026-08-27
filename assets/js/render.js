/* ==========================================================================
   CLARENCE THUNDER 12U — SECTION RENDERERS
   Every page drops in <div data-render="roster"></div> style hooks and this
   file fills them from data.js. Options come from data-* attributes.
   ========================================================================== */
(function () {
  "use strict";

  const { $, $$, esc, money, parseDate, fmt, icon, lightbox, modal } = window.TH;

  const PHOTO      = (slug) => `assets/img/photos/${slug}.jpg`;
  const PHOTO_THUMB= (slug) => `assets/img/photos/thumb/${slug}.jpg`;

  /* ======================================================================
     FUNDRAISING PROGRESS
     ====================================================================== */
  function progressPct(raised, goal) {
    if (!goal) return 0;
    return Math.max(0, Math.min(100, (raised / goal) * 100));
  }

  function renderProgress(host) {
    const pct = progressPct(fundraisingData.raised, fundraisingData.goal);
    const compact = host.dataset.variant === "compact";

    host.innerHTML = `
      <div class="progress-block">
        <div class="progress__nums">
          <div>
            <div class="progress__raised"><span data-countup="${fundraisingData.raised}" data-prefix="$">$0</span>
              <small>Raised So Far</small>
            </div>
          </div>
          <div class="progress__goal">
            <div class="v">${money(fundraisingData.goal)}</div>
            <div class="l">Cooperstown Goal</div>
          </div>
        </div>
        <div class="progress-bar">
          <div class="progress-bar__fill" data-progress="${pct.toFixed(1)}"
               role="progressbar" aria-valuenow="${Math.round(pct)}" aria-valuemin="0" aria-valuemax="100"
               aria-label="Cooperstown fundraising progress"></div>
        </div>
        <div class="progress__meta">
          <span><b>${Math.round(pct)}%</b> of the way there</span>
          <span><b>${money(Math.max(0, fundraisingData.goal - fundraisingData.raised))}</b> still to raise</span>
          ${fundraisingData.deadlineLabel ? `<span>${esc(fundraisingData.deadlineLabel)}</span>` : ""}
        </div>
        ${compact ? "" : `
        <div class="row" style="margin-top:26px">
          <a class="btn" href="sponsors.html">Become a Sponsor</a>
          <a class="btn btn--outline" href="fundraising.html">Support a Fundraiser</a>
        </div>`}
      </div>`;
  }

  /* ======================================================================
     ROSTER + PLAYER MODAL
     ====================================================================== */
  function playerPhoto(p) {
    return p.photo ? p.photo : "assets/img/player-placeholder.svg";
  }

  function renderRoster(host) {
    const limit = parseInt(host.dataset.limit || "0", 10);
    const list = limit ? teamData.players.slice(0, limit) : teamData.players;

    host.className = "roster-grid";
    host.innerHTML = list.map((p, i) => `
      <button class="player-card" type="button" data-player="${teamData.players.indexOf(p)}"
              data-reveal data-reveal-delay="${(i % 4) + 1}"
              aria-label="View profile for number ${p.number}, ${esc(p.first)} ${esc(p.last)}">
        <span class="player-card__media">
          <img src="${esc(playerPhoto(p))}" alt="${esc(p.first)} ${esc(p.last)}, number ${p.number}"
               loading="lazy" width="300" height="400">
        </span>
        <span class="player-card__num"><i>#</i>${p.number}</span>
        <span class="player-card__hint" aria-hidden="true">+</span>
        <span class="player-card__body">
          <span class="player-card__first">${esc(p.first)}</span>
          <span class="player-card__last">${esc(p.last)}</span>
          <span class="player-card__pos">${esc(p.pos1)}${p.pos2 ? " / " + esc(p.pos2) : ""}</span>
        </span>
      </button>`).join("");

    $$(".player-card", host).forEach((btn) => {
      btn.addEventListener("click", () => openPlayer(teamData.players[+btn.dataset.player]));
    });
  }

  function openPlayer(p) {
    if (!p) return;
    const chip = (l, v) => v ? `<div class="stat-chip"><div class="l">${esc(l)}</div><div class="v">${esc(v)}</div></div>` : "";
    modal.open(`
      <div class="player-modal">
        <div class="player-modal__media">
          <img src="${esc(playerPhoto(p))}" alt="${esc(p.first)} ${esc(p.last)}">
          <div class="player-modal__num">#${p.number}</div>
        </div>
        <div class="player-modal__body">
          <div class="card__label">Clarence Thunder ${esc(siteConfig.ageGroup)}</div>
          <h2 class="player-modal__name">${esc(p.first)}<br>${esc(p.last)}</h2>
          <div class="player-modal__pos">${esc(p.pos1)}${p.pos2 ? " / " + esc(p.pos2) : ""}</div>
          <div class="player-modal__grid">
            ${chip("Bats", p.bats)}
            ${chip("Throws", p.throws)}
            ${chip("Favorite Team", p.favTeam)}
            ${chip("Favorite Player", p.favPlayer)}
          </div>
          ${p.funFact ? `
          <div class="player-modal__fact">
            <div class="l">Fun Fact</div>
            <p>${esc(p.funFact)}</p>
          </div>` : ""}
        </div>
      </div>`, `${p.first} ${p.last} player profile`);
  }

  /* ======================================================================
     COACHES
     ====================================================================== */
  function renderCoaches(host) {
    host.className = "grid grid--2";
    host.innerHTML = teamData.coaches.map((c, i) => `
      <div class="card card--hover coach-card" data-reveal data-reveal-delay="${(i % 4) + 1}">
        ${c.photo
          ? `<img class="coach-card__img" src="${esc(c.photo)}" alt="${esc(c.name)}" loading="lazy">`
          : `<img class="coach-card__img" src="assets/img/player-placeholder.svg" alt="" aria-hidden="true" loading="lazy">`}
        <div>
          <div class="coach-card__role">${esc(c.role)}</div>
          <div class="coach-card__name">${esc(c.name)}</div>
          ${c.bio ? `<p class="coach-card__bio">${esc(c.bio)}</p>` : ""}
        </div>
      </div>`).join("");
  }

  /* ======================================================================
     SCHEDULE
     ====================================================================== */
  function outcomeOf(g) {
    if (!g.result) return "";
    if (g.result.us > g.result.them) return "w";
    if (g.result.us < g.result.them) return "l";
    return "t";
  }

  function gameCard(g) {
    const oc = outcomeOf(g);
    const isFinal = g.status === "final";
    const vsLabel = g.home ? "vs" : "at";

    const side = isFinal
      ? `<div class="result-pill result-pill--${oc}">
           <span class="badge">${oc.toUpperCase()}</span>
           ${g.result.us}&ndash;${g.result.them}
         </div>
         <div class="game-actions">
           <span class="pill">${g.home ? "Home" : "Away"}</span>
         </div>`
      : `<div class="game-time">${fmt.time(g.time)}</div>
         <div class="game-actions">
           <a class="icon-btn" href="${esc(window.TH.directionsUrl(g))}" target="_blank" rel="noopener">
             ${icon.nav} Directions
           </a>
           <button class="icon-btn" type="button" data-ics="${esc(JSON.stringify(g))}">
             ${icon.cal} Add to Calendar
           </button>
         </div>`;

    return `
      <article class="game-card ${isFinal ? "game-card--final game-card--" + oc : ""}" data-reveal>
        <div class="game-date">
          <div class="dow">${fmt.dow(g.date)}</div>
          <div class="day">${fmt.day(g.date)}</div>
          <div class="mon">${fmt.mon(g.date)}</div>
        </div>
        <div class="game-main">
          ${g.event ? `<div class="tourney">${esc(g.event)}${g.tournament ? " &middot; Tournament" : ""}</div>` : ""}
          <h3 class="matchup">Thunder <em>${vsLabel}</em> ${esc(g.opponent)}</h3>
          <div class="meta">
            ${g.field ? `<span>${icon.field} ${esc(g.field)}</span>` : ""}
            ${g.city ? `<span>${icon.pin} ${esc(g.city)}</span>` : ""}
          </div>
        </div>
        <div class="game-side">${side}</div>
      </article>`;
  }

  function bindGameActions(host) {
    $$("[data-ics]", host).forEach((btn) => {
      btn.addEventListener("click", () => {
        try { window.TH.downloadIcs(JSON.parse(btn.dataset.ics)); } catch (e) {}
      });
    });
  }

  const byDateAsc  = (a, b) => parseDate(a.date, a.time) - parseDate(b.date, b.time);
  const byDateDesc = (a, b) => parseDate(b.date, b.time) - parseDate(a.date, a.time);

  function renderSchedulePreview(host) {
    const limit = parseInt(host.dataset.limit || "3", 10);
    const games = scheduleData.games
      .filter((g) => g.status === "upcoming")
      .sort(byDateAsc)
      .slice(0, limit);

    host.innerHTML = games.length
      ? `<div class="stack">${games.map(gameCard).join("")}</div>`
      : `<div class="empty-state"><b>No games on the schedule right now</b>
           <p>The next slate of games will be posted here as soon as it's confirmed.</p></div>`;
    bindGameActions(host);
  }

  function renderSchedule(host) {
    const wrap = document.createElement("div");
    wrap.innerHTML = `
      <div class="filter-bar" role="group" aria-label="Filter games">
        <button class="filter-btn" type="button" data-filter="upcoming" aria-pressed="true">Upcoming</button>
        <button class="filter-btn" type="button" data-filter="completed" aria-pressed="false">Completed</button>
        <button class="filter-btn" type="button" data-filter="tournaments" aria-pressed="false">Tournaments</button>
        <button class="filter-btn" type="button" data-filter="all" aria-pressed="false">All Games</button>
      </div>
      <div class="stack" id="schedule-list" aria-live="polite"></div>`;
    host.innerHTML = "";
    host.appendChild(wrap);

    const list = $("#schedule-list", wrap);

    const apply = (filter) => {
      let games = scheduleData.games.slice();
      if (filter === "upcoming")      games = games.filter((g) => g.status === "upcoming").sort(byDateAsc);
      else if (filter === "completed")games = games.filter((g) => g.status === "final").sort(byDateDesc);
      else if (filter === "tournaments") games = games.filter((g) => g.tournament).sort(byDateAsc);
      else games = games.sort(byDateAsc);

      const emptyCopy = {
        upcoming:   ["Nothing on the calendar yet", "As soon as the next games are confirmed, they'll show up here."],
        completed:  ["No results posted yet", "Scores will appear here once games have been played."],
        tournaments:["No tournaments listed yet", "Tournament weekends will be posted here as they're booked."],
        all:        ["No games listed yet", "Check back soon."]
      }[filter];

      list.innerHTML = games.length
        ? games.map(gameCard).join("")
        : `<div class="empty-state"><b>${emptyCopy[0]}</b><p>${emptyCopy[1]}</p></div>`;
      $$("[data-reveal]", list).forEach((el) => el.classList.add("is-in"));
      bindGameActions(list);
    };

    $$(".filter-btn", wrap).forEach((btn) => {
      btn.addEventListener("click", () => {
        $$(".filter-btn", wrap).forEach((b) => b.setAttribute("aria-pressed", String(b === btn)));
        apply(btn.dataset.filter);
      });
    });

    apply("upcoming");
  }

  function renderTournaments(host) {
    host.className = "grid grid--3";
    host.innerHTML = (scheduleData.tournaments || []).map((t, i) => `
      <article class="tourney-card" data-reveal data-reveal-delay="${(i % 3) + 1}">
        ${t.image ? `<img src="${esc(t.image)}" alt="" loading="lazy">` : ""}
        <div class="tourney-card__body">
          <div class="tourney-card__date">${esc(t.dates)}</div>
          <h3 class="tourney-card__name">${esc(t.name)}</h3>
          <div class="tourney-card__loc">${icon.pin} ${esc(t.location)}</div>
          ${t.note ? `<p class="tourney-card__loc" style="margin-top:10px">${esc(t.note)}</p>` : ""}
        </div>
      </article>`).join("");
  }

  /* ======================================================================
     SEASON RECORD
     ====================================================================== */
  function computedRecord() {
    if (!resultsData.autoCalculate) return resultsData.record;
    const finals = scheduleData.games.filter((g) => g.status === "final" && g.result);
    return finals.reduce((acc, g) => {
      const oc = outcomeOf(g);
      if (oc === "w") acc.wins++;
      else if (oc === "l") acc.losses++;
      else acc.ties++;
      acc.runsScored  += g.result.us;
      acc.runsAllowed += g.result.them;
      return acc;
    }, { wins: 0, losses: 0, ties: 0, runsScored: 0, runsAllowed: 0 });
  }

  function renderRecord(host) {
    const r = computedRecord();
    const played = r.wins + r.losses + r.ties;
    const pct = played ? ((r.wins + r.ties * 0.5) / played) : 0;
    const diff = r.runsScored - r.runsAllowed;

    // No games entered yet - show a proper empty state rather than "0-0".
    if (!played) {
      host.innerHTML = `
        <div class="empty-state" data-reveal>
          <b>Season Record Coming Soon</b>
          <p style="margin:0 auto 20px;max-width:52ch">
            Game results get posted here as the season goes on. Check the schedule for
            what's next.
          </p>
          <a class="btn btn--ghost" href="schedule.html">See the Schedule</a>
        </div>`;
      return;
    }

    const recent = scheduleData.games
      .filter((g) => g.status === "final" && g.result)
      .sort(byDateDesc)
      .slice(0, 10);

    host.innerHTML = `
      <div class="record-hero" data-reveal>
        <div>
          <div class="record-hero__main">${r.wins}<span>&ndash;</span>${r.losses}${r.ties ? `<span>&ndash;</span>${r.ties}` : ""}</div>
          <div class="record-hero__label">${esc(resultsData.seasonLabel)} Record</div>
        </div>
      </div>

      <div class="stat-tiles" style="margin-top:clamp(28px,4vw,44px)" data-reveal>
        <div class="stat-tile"><div class="v">${r.wins}</div><div class="l">Wins</div></div>
        <div class="stat-tile"><div class="v">${r.losses}</div><div class="l">Losses</div></div>
        <div class="stat-tile"><div class="v">${r.ties}</div><div class="l">Ties</div></div>
        <div class="stat-tile"><div class="v">${(pct).toFixed(3).replace(/^0/, "")}</div><div class="l">Win Pct</div></div>
        <div class="stat-tile"><div class="v">${r.runsScored}</div><div class="l">Runs Scored</div></div>
        <div class="stat-tile"><div class="v">${r.runsAllowed}</div><div class="l">Runs Allowed</div></div>
        <div class="stat-tile"><div class="v">${diff > 0 ? "+" : ""}${diff}</div><div class="l">Run Differential</div></div>
      </div>

      ${recent.length ? `
      <div style="margin-top:clamp(30px,4vw,48px)" data-reveal>
        <div class="card__label" style="margin-bottom:14px">Last ${recent.length} Results</div>
        <div class="result-strip">
          ${recent.slice().reverse().map((g) => {
            const oc = outcomeOf(g);
            return `<span class="result-dot result-dot--${oc}" title="${esc(g.opponent)} ${g.result.us}-${g.result.them} (${fmt.medium(g.date)})">${oc.toUpperCase()}</span>`;
          }).join("")}
        </div>
        ${resultsData.note ? `<p class="muted" style="margin-top:16px;font-size:.9rem">${esc(resultsData.note)}</p>` : ""}
      </div>` : ""}`;
  }

  function renderRecentResults(host) {
    const limit = parseInt(host.dataset.limit || "4", 10);
    const games = scheduleData.games
      .filter((g) => g.status === "final" && g.result)
      .sort(byDateDesc)
      .slice(0, limit);

    host.innerHTML = games.length
      ? `<div class="stack">${games.map(gameCard).join("")}</div>`
      : `<div class="empty-state"><b>No results yet</b><p>Scores will show up here once the season starts.</p></div>`;
    bindGameActions(host);
  }

  /* ======================================================================
     SPONSORSHIP LEVELS
     ====================================================================== */
  function renderSponsorLevels(host) {
    host.className = "tier-grid";
    host.innerHTML = sponsorData.levels.map((lv, i) => `
      <article class="tier-card ${lv.featured ? "tier-card--featured" : ""}" data-reveal data-reveal-delay="${(i % 4) + 1}">
        ${lv.featured ? `<div class="tier-card__flag">Most Impact</div>` : ""}
        <h3 class="tier-card__name">${esc(lv.name)}</h3>
        <div class="tier-card__price"><sup>$</sup>${lv.price.toLocaleString("en-US")}</div>
        ${lv.note ? `<div class="tier-card__note">${esc(lv.note)}</div>` : `<div class="tier-card__note">Full season recognition</div>`}
        <ul class="tier-card__benefits">
          ${lv.benefits.map((b) => `<li>${icon.check}<span>${esc(b)}</span></li>`).join("")}
        </ul>
        <button class="btn ${lv.featured ? "" : "btn--ghost"}" type="button"
                data-sponsor-level="${esc(lv.name)}">Become a Sponsor</button>
      </article>`).join("") +
      (sponsorData.footnote
        ? `<p class="muted center" style="grid-column:1/-1;margin:6px auto 0;font-size:.95rem">${esc(sponsorData.footnote)}</p>`
        : "");

    $$("[data-sponsor-level]", host).forEach((btn) => {
      btn.addEventListener("click", () => {
        const form = $("#sponsor-form");
        const select = $("#sponsorship_level");
        if (select) {
          const match = Array.from(select.options).find((o) => o.value.startsWith(btn.dataset.sponsorLevel));
          if (match) select.value = match.value;
        }
        if (form) {
          form.scrollIntoView({ behavior: "smooth", block: "center" });
          const first = $("input, select, textarea", form);
          setTimeout(() => first && first.focus({ preventScroll: true }), 500);
        } else {
          window.location.href = "sponsors.html#sponsor-form";
        }
      });
    });
  }

  /* ======================================================================
     SPONSOR WALL
     ====================================================================== */
  function sponsorCard(s, tierIndex) {
    const size = Math.min(tierIndex + 1, 4);
    const inner = `
      ${s.logo
        ? `<img src="${esc(s.logo)}" alt="${esc(s.name)}" loading="lazy">`
        : `<span class="sponsor-card__name">${esc(s.name)}</span>`}
      ${s.tagline ? `<span class="sponsor-card__tag">${esc(s.tagline)}</span>` : ""}`;
    return s.url
      ? `<a class="sponsor-card sponsor-card--${size}" href="${esc(s.url)}" target="_blank" rel="noopener"
            aria-label="${esc(s.name)} (opens in a new tab)">${inner}</a>`
      : `<div class="sponsor-card sponsor-card--${size}">${inner}</div>`;
  }

  function renderSponsorWall(host) {
    const sponsors = sponsorData.sponsors || [];

    if (!sponsors.length) {
      host.innerHTML = `
        <div class="empty-state" data-reveal style="border-color:rgba(255,199,44,.35)">
          <b>Our First Sponsors Go Here</b>
          <p style="margin:0 auto 22px;max-width:56ch">
            We're building our founding group of Clarence-area business sponsors for the
            2026&ndash;27 season and the road to Cooperstown. Get your business in front of
            local families every weekend &mdash; and be one of the names these kids remember.
          </p>
          <div class="row row--center">
            <a class="btn" href="sponsors.html">See Sponsorship Levels</a>
            <a class="btn btn--outline" href="contact.html">Ask a Question</a>
          </div>
        </div>
        <div class="sponsor-grid sponsor-grid--3" style="margin-top:22px" data-reveal>
          ${Array.from({ length: 4 }, () =>
            `<div class="sponsor-empty"><b>Your Logo Here</b><span>Available now</span></div>`).join("")}
        </div>`;
      return;
    }

    // "featured" walls (homepage, Cooperstown page) show logos for the top two
    // levels only, so the higher tiers genuinely buy more prominence. The full
    // wall on the sponsors page shows every level.
    const featured = host.dataset.featured === "true";
    const FEATURED_TIERS = 2;

    const tiersToShow = featured
      ? sponsorData.levels.slice(0, FEATURED_TIERS)
      : sponsorData.levels;

    const rest = featured
      ? sponsors.filter((s) => !tiersToShow.some((lv) => lv.id === s.tier))
      : [];

    host.innerHTML = tiersToShow.map((lv, idx) => {
      const inTier = sponsors.filter((s) => s.tier === lv.id);
      if (!inTier.length) return "";
      const size = Math.min(idx + 1, 4);
      return `
        <section class="sponsor-tier" data-reveal>
          <div class="sponsor-tier__head">
            <h3>${esc(lv.name)}${inTier.length > 1 ? "s" : ""}</h3>
            <hr class="rule">
          </div>
          <div class="sponsor-grid sponsor-grid--${size}">
            ${inTier.map((s) => sponsorCard(s, idx)).join("")}
          </div>
        </section>`;
    }).join("") + (rest.length ? `
      <p class="muted center" data-reveal style="margin:0 auto 22px">
        Plus ${rest.length} more ${rest.length === 1 ? "business" : "businesses"} backing the Thunder &mdash;
        <a href="sponsors.html" style="color:var(--gold)">see every sponsor</a>.
      </p>` : "") + `
      <div class="center" data-reveal style="margin-top:26px">
        <p class="muted" style="margin:0 auto 18px">There's still room on the banner.</p>
        <a class="btn" href="sponsors.html">Become a Sponsor</a>
      </div>`;
  }

  /* ======================================================================
     FUNDRAISERS
     ====================================================================== */
  function renderFundraisers(host) {
    const limit = parseInt(host.dataset.limit || "0", 10);
    let list = fundraisingData.fundraisers.slice();
    if (host.dataset.filter === "live") list = list.filter((f) => f.status === "live");
    if (limit) list = list.slice(0, limit);

    const statusLabel = { live: "Live Now", soon: "Coming Soon", closed: "Closed" };

    host.className = "grid grid--3";
    host.innerHTML = list.map((f, i) => {
      const pct = progressPct(f.raised, f.goal);
      const href = f.link || "contact.html?reason=Fundraising&about=" + encodeURIComponent(f.name);
      const external = f.link ? ' target="_blank" rel="noopener"' : "";
      return `
        <article class="fund-card" data-reveal data-reveal-delay="${(i % 3) + 1}">
          <div class="fund-card__media">
            ${f.image ? `<img src="${esc(f.image)}" alt="" loading="lazy">` : ""}
            <span class="fund-card__status status--${f.status}">${statusLabel[f.status] || ""}</span>
          </div>
          <div class="fund-card__body">
            <h3 class="fund-card__name">${esc(f.name)}</h3>
            <p class="fund-card__desc">${esc(f.description)}</p>
            ${f.deadlineLabel ? `<div class="fund-card__deadline">${icon.clock} ${esc(f.deadlineLabel)}</div>` : ""}
            ${f.goal ? `
              <div>
                <div class="progress-bar progress-bar--sm">
                  <div class="progress-bar__fill" data-progress="${pct.toFixed(1)}"
                       role="progressbar" aria-valuenow="${Math.round(pct)}" aria-valuemin="0" aria-valuemax="100"
                       aria-label="${esc(f.name)} progress"></div>
                </div>
                <div class="progress__meta" style="font-size:.82rem;margin-top:9px">
                  <span><b>${money(f.raised)}</b> raised</span>
                  <span>Goal ${money(f.goal)}</span>
                </div>
              </div>` : ""}
            <a class="btn btn--sm ${f.status === "soon" ? "btn--ghost" : ""}" href="${esc(href)}"${external}>${esc(f.cta)}</a>
          </div>
        </article>`;
    }).join("");
  }

  function renderDonatePanel(host) {
    const p = siteConfig.payments;
    const buttons = [
      p.venmoLink  ? `<a class="btn" href="${esc(p.venmoLink)}" target="_blank" rel="noopener">Give with Venmo</a>` : "",
      p.paypalLink ? `<a class="btn btn--outline" href="${esc(p.paypalLink)}" target="_blank" rel="noopener">Give with PayPal</a>` : "",
      p.otherLink  ? `<a class="btn btn--outline" href="${esc(p.otherLink)}" target="_blank" rel="noopener">${esc(p.otherLabel || "Donate Online")}</a>` : ""
    ].filter(Boolean).join("");

    host.innerHTML = `
      <div class="donate-panel" data-reveal>
        <div>
          <div class="eyebrow">Donate Directly</div>
          <h2>Every Dollar Goes<br>To The Trip</h2>
          <p class="lede" style="margin-top:18px">
            No squares, no raffle, no order form. A direct contribution goes straight into the
            Cooperstown fund &mdash; tournament fees, housing, travel, and gear for the team.
          </p>
          <div class="row" style="margin-top:26px">
            ${buttons || `<a class="btn" href="mailto:${esc(siteConfig.email)}?subject=${encodeURIComponent("I'd like to donate to Clarence Thunder 12U")}">Email Us to Donate</a>`}
            <a class="btn btn--ghost" href="contact.html?reason=Fundraising">Ask a Question</a>
          </div>
          <div class="stack" style="margin-top:26px;gap:8px">
            ${p.venmoHandle ? `<p class="muted" style="margin:0"><strong>Venmo:</strong> ${esc(p.venmoHandle)} &mdash; our team account</p>` : ""}
            ${p.checkPayableTo ? `<p class="muted" style="margin:0"><strong>Check payable to:</strong> ${esc(p.checkPayableTo)}</p>` : ""}
          </div>
          ${!buttons ? `<p class="form__note" style="margin-top:16px">
            <strong>Setup note:</strong> add a Venmo, PayPal, or Stripe link in
            <code>assets/js/data.js</code> (siteConfig.payments) to turn these into one-tap buttons.</p>` : ""}
        </div>
        <div class="qr-box">
          ${p.qrImage
            ? `<img src="${esc(p.qrImage)}" alt="Scan to donate">`
            : `<div class="ph">Drop your Venmo QR code image here<br><br>(siteConfig.payments.qrImage)</div>`}
          <b>${esc(p.venmoHandle || "Scan to Give")}</b>
        </div>
      </div>`;
  }

  /* ======================================================================
     NEWS
     ====================================================================== */
  function renderNews(host) {
    const limit = parseInt(host.dataset.limit || "0", 10);
    const posts = (limit ? newsData.slice(0, limit) : newsData);

    host.className = "grid grid--3";
    host.innerHTML = posts.length ? posts.map((n, i) => `
      <a class="news-card" href="news-article.html?post=${encodeURIComponent(n.slug)}"
         data-reveal data-reveal-delay="${(i % 3) + 1}">
        <div class="news-card__media">
          ${n.image ? `<img src="${esc(n.image)}" alt="" loading="lazy">` : ""}
          ${n.category ? `<span class="news-card__tag">${esc(n.category)}</span>` : ""}
        </div>
        <div class="news-card__body">
          <div class="news-card__date">${fmt.medium(n.date)}</div>
          <h3 class="news-card__title">${esc(n.title)}</h3>
          <p class="news-card__excerpt">${esc(n.excerpt)}</p>
          <span class="link-arrow">Read More ${icon.arrow}</span>
        </div>
      </a>`).join("") : `<div class="empty-state"><b>No updates yet</b><p>Team news will be posted here.</p></div>`;
  }

  /* ======================================================================
     GALLERY
     ====================================================================== */
  function galleryItems() {
    return galleryData.items.map((it) => ({
      ...it,
      thumb: it.thumb || PHOTO_THUMB(it.src),
      full:  it.full  || PHOTO(it.src),
      categoryLabel: (galleryData.categories.find((c) => c.id === it.category) || {}).label || ""
    }));
  }

  function renderGallery(host) {
    const limit = parseInt(host.dataset.limit || "0", 10);
    const all = galleryItems();
    const showFilters = host.dataset.filters !== "false";

    const wrap = document.createElement("div");
    wrap.innerHTML = `
      ${showFilters ? `
      <div class="filter-bar" role="group" aria-label="Filter photos">
        ${galleryData.categories.map((c, i) =>
          `<button class="filter-btn" type="button" data-cat="${c.id}" aria-pressed="${i === 0}">${esc(c.label)}</button>`
        ).join("")}
      </div>` : ""}
      <div class="masonry" id="gallery-grid" aria-live="polite"></div>`;
    host.innerHTML = "";
    host.appendChild(wrap);

    const grid = $("#gallery-grid", wrap);

    const paint = (cat) => {
      let items = cat && cat !== "all" ? all.filter((i) => i.category === cat) : all;
      if (limit) items = items.slice(0, limit);

      grid.innerHTML = items.length ? items.map((it, i) => `
        <button class="masonry__item" type="button" data-idx="${i}"
                aria-label="${esc(it.caption || "Open photo")}">
          <img src="${esc(it.thumb)}" alt="${esc(it.caption || "Clarence Thunder 12U")}" loading="lazy">
          ${it.videoUrl ? `<span class="masonry__play"><i>${icon.play}</i></span>` : ""}
          <span class="masonry__cap">
            <b>${esc(it.categoryLabel)}</b>
            <span>${esc(it.caption || "")}</span>
          </span>
        </button>`).join("")
        : `<div class="empty-state" style="column-span:all"><b>No photos in this category yet</b>
             <p>More photos are added after every tournament weekend.</p></div>`;

      $$(".masonry__item", grid).forEach((btn) => {
        btn.addEventListener("click", () => lightbox.open(items, +btn.dataset.idx));
      });
    };

    $$(".filter-btn", wrap).forEach((btn) => {
      btn.addEventListener("click", () => {
        $$(".filter-btn", wrap).forEach((b) => b.setAttribute("aria-pressed", String(b === btn)));
        paint(btn.dataset.cat);
      });
    });

    paint("all");
  }

  /* ======================================================================
     COOPERSTOWN EXTRAS
     ====================================================================== */
  function renderTimeline(host) {
    host.className = "timeline";
    host.innerHTML = cooperstownConfig.timeline.map((t) => `
      <div class="timeline__item ${t.done ? "timeline__item--done" : ""}" data-reveal>
        <div class="timeline__date">${esc(t.date)}</div>
        <div class="timeline__title">${esc(t.title)}</div>
        <p class="timeline__desc">${esc(t.desc)}</p>
      </div>`).join("");
  }

  function renderCostBreakdown(host) {
    host.className = "grid grid--2";
    host.innerHTML = cooperstownConfig.costBreakdown.map((c, i) => `
      <div class="value-card card" data-reveal data-reveal-delay="${(i % 3) + 1}">
        <div class="value-card__icon">${icon.check}</div>
        <div>
          <h3>${esc(c.label)}</h3>
          <p>${esc(c.detail)}</p>
        </div>
      </div>`).join("");
  }

  /* ======================================================================
     NEWS ARTICLE PAGE
     ====================================================================== */
  function renderArticle(host) {
    const params = new URLSearchParams(window.location.search);
    const slug = params.get("post");
    const post = newsData.find((n) => n.slug === slug) || newsData[0];

    if (!post) {
      host.innerHTML = `<div class="empty-state"><b>Story not found</b>
        <p>That update may have moved.</p>
        <a class="btn" href="news.html" style="margin-top:18px">All Team News</a></div>`;
      return;
    }

    window.__ARTICLE__ = post;
    document.title = `${post.title} | ${siteConfig.teamName}`;
    const md = document.querySelector('meta[name="description"]');
    if (md) md.setAttribute("content", post.excerpt);

    const body = post.body.map((b) => {
      if (typeof b === "string") return `<p>${esc(b)}</p>`;
      if (b.h) return `<h2>${esc(b.h)}</h2>`;
      if (b.quote) return `<blockquote>${esc(b.quote)}</blockquote>`;
      if (b.list) return `<ul>${b.list.map((li) => `<li><span>${esc(li)}</span></li>`).join("")}</ul>`;
      return "";
    }).join("");

    const others = newsData.filter((n) => n.slug !== post.slug).slice(0, 3);

    host.innerHTML = `
      <article class="article">
        <div class="article__meta">
          ${post.category ? `<span class="tag">${esc(post.category)}</span>` : ""}
          <span>${fmt.long(post.date)}, ${parseDate(post.date).getFullYear()}</span>
        </div>
        <h1 style="font-size:clamp(2.1rem,5.4vw,3.6rem);margin-bottom:26px">${esc(post.title)}</h1>
        ${post.image ? `
          <div class="frame" style="margin-bottom:32px">
            <img src="${esc(post.image)}" alt="" style="aspect-ratio:16/9">
          </div>` : ""}
        <div class="article__body">${body}</div>
        <hr class="rule" style="margin:44px 0 32px">
        <div class="row">
          <a class="btn" href="sponsors.html">Support the Thunder</a>
          <a class="btn btn--outline" href="news.html">All Team News</a>
        </div>
      </article>
      ${others.length ? `
      <div style="margin-top:clamp(56px,8vw,90px)">
        <div class="section-head section-head--center">
          <div class="eyebrow eyebrow--center">Keep Reading</div>
          <h2>More From The Thunder</h2>
        </div>
        <div class="grid grid--3">
          ${others.map((n) => `
            <a class="news-card" href="news-article.html?post=${encodeURIComponent(n.slug)}">
              <div class="news-card__media">
                ${n.image ? `<img src="${esc(n.image)}" alt="" loading="lazy">` : ""}
                ${n.category ? `<span class="news-card__tag">${esc(n.category)}</span>` : ""}
              </div>
              <div class="news-card__body">
                <div class="news-card__date">${fmt.medium(n.date)}</div>
                <h3 class="news-card__title">${esc(n.title)}</h3>
                <p class="news-card__excerpt">${esc(n.excerpt)}</p>
              </div>
            </a>`).join("")}
        </div>
      </div>` : ""}`;
  }

  /* ======================================================================
     SMALL DYNAMIC BITS
     ====================================================================== */
  function renderCooperstownFacts(host) {
    const c = cooperstownConfig;
    host.className = "stat-tiles";
    host.innerHTML = `
      <div class="stat-tile"><div class="v">${esc(c.displayDates.split(",")[0].split(" ")[0])}</div><div class="l">2027</div></div>
      <div class="stat-tile"><div class="v">7</div><div class="l">Days</div></div>
      <div class="stat-tile"><div class="v">${teamData.players.length}</div><div class="l">Players</div></div>
      <div class="stat-tile"><div class="v">1</div><div class="l">Shot At It</div></div>`;
  }

  function renderRosterCount(host) {
    host.textContent = teamData.players.length;
  }

  function fillText(host) {
    const key = host.dataset.text;
    const map = {
      "team-name": siteConfig.teamName,
      "location": siteConfig.location,
      "email": siteConfig.email,
      "phone": siteConfig.phone,
      "season": siteConfig.season,
      "tagline": siteConfig.tagline,
      "cooperstown-dates": cooperstownConfig.displayDates,
      "cooperstown-location": cooperstownConfig.location,
      "cooperstown-name": cooperstownConfig.tournamentName,
      "instagram-handle": siteConfig.instagramHandle,
      "goal": money(fundraisingData.goal),
      "raised": money(fundraisingData.raised),
      "player-count": String(teamData.players.length)
    };
    if (map[key] == null) return;
    host.textContent = map[key];
    // Keep mailto:/tel: links in sync with siteConfig
    if (host.tagName === "A") {
      if (key === "email") host.href = "mailto:" + siteConfig.email;
      if (key === "phone") host.href = "tel:" + String(siteConfig.phone).replace(/[^0-9+]/g, "");
      if (key === "instagram-handle" && siteConfig.social.instagram) {
        host.href = siteConfig.social.instagram;
        host.target = "_blank";
        host.rel = "noopener";
      }
    }
  }

  /* ======================================================================
     DISPATCHER
     ====================================================================== */
  const renderers = {
    "progress":          renderProgress,
    "roster":            renderRoster,
    "coaches":           renderCoaches,
    "schedule":          renderSchedule,
    "schedule-preview":  renderSchedulePreview,
    "tournaments":       renderTournaments,
    "record":            renderRecord,
    "recent-results":    renderRecentResults,
    "sponsor-levels":    renderSponsorLevels,
    "sponsor-wall":      renderSponsorWall,
    "fundraisers":       renderFundraisers,
    "donate-panel":      renderDonatePanel,
    "news":              renderNews,
    "gallery":           renderGallery,
    "timeline":          renderTimeline,
    "cost-breakdown":    renderCostBreakdown,
    "article":           renderArticle,
    "cooperstown-facts": renderCooperstownFacts,
    "roster-count":      renderRosterCount
  };

  window.renderPage = function () {
    $$("[data-render]").forEach((host) => {
      const fn = renderers[host.dataset.render];
      if (fn) {
        try { fn(host); }
        catch (err) { console.error("Render failed for", host.dataset.render, err); }
      }
    });
    $$("[data-text]").forEach(fillText);

    // Pre-select contact form reason from a query string (?reason=Sponsorship)
    const params = new URLSearchParams(window.location.search);
    const reason = params.get("reason");
    if (reason) {
      const sel = document.getElementById("reason");
      if (sel) {
        const opt = Array.from(sel.options).find(
          (o) => o.value.toLowerCase() === reason.toLowerCase()
        );
        if (opt) sel.value = opt.value;
      }
      const about = params.get("about");
      const msg = document.getElementById("message");
      if (about && msg && !msg.value) msg.value = `I'm interested in: ${about}\n\n`;
    }
  };
})();
