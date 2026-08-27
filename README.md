# Clarence Thunder 12U Baseball — Team Website

A complete, mobile-first website for Clarence Thunder 12U travel baseball, built around
the Road to Cooperstown 2027.

**No build step. No Node. No dependencies.** Plain HTML, CSS, and JavaScript — open the
files, edit, save, done.

---

## Run it on your computer

```bash
cd "C:\Users\Allison Marranca\clarence-thunder"; python -m http.server 8940
```

Then open <http://localhost:8940>. Leave that window open while you're browsing; closing
it kills the link.

(You need a local server rather than double-clicking `index.html`, because the pages load
their content from a shared JavaScript file.)

---

## THE ONE FILE YOU EDIT

**`assets/js/data.js`**

Everything on the site comes from that one file — roster, schedule, results, sponsors,
sponsorship levels, fundraisers, news, photos, the Cooperstown date, the campaign goal,
contact details and social links. Ten clearly-labelled sections with comments.

You do not need to touch any HTML to update content.

### The edits you'll make most often

| What you want to do | Where |
|---|---|
| Update money raised | `fundraisingData.raised` |
| Add a game or post a score | `scheduleData.games` |
| Update the season record | `resultsData.record` |
| Add a sponsor | `sponsorData.sponsors` |
| Change sponsorship prices/benefits | `sponsorData.levels` |
| Add or edit a fundraiser | `fundraisingData.fundraisers` |
| Post a team update | `newsData` |
| Update the roster | `teamData.players` |
| Change the Cooperstown date | `cooperstownConfig.startDate` |
| Change email / phone / socials | `siteConfig` |
| Sponsorship prices, benefits, CTA | `sponsorData.levels` |
| Which level is "Most Popular" | `sponsorData.levels[].featured` + `.flag` |
| Player count shown on the site | derived from `teamData.players` - nothing to edit |

**Cache note:** browsers hold on to CSS and JS. If you edit a file and don't see the
change, bump the `?v=` number on the `styles.css` and `.js` links in the HTML files
(they're all set to the same value) and everyone picks it up on their next visit.

**Posting a game result:** find the game in `scheduleData.games`, change
`status: "upcoming"` to `status: "final"`, and add `result: { us: 14, them: 1 }`.
The W/L/T badge and colour are worked out automatically.

---

## What's real and what still needs you

Roster, coaches, sponsorship levels, the $25,000 goal, the March 1 2027 deadline, and the
contact details all came from your sponsorship package. Everything below is still open.
Search `data.js` for `TODO`.

1. **Amount raised** — `fundraisingData.raised` is `0`. Set it to the real total.
2. **Season record** — `resultsData.record` is empty, so the site shows a "coming soon"
   panel rather than a wrong number. Fill in the real 2026 W–L–T and runs and it goes live.
   (The 14–1 championship over the Hamburg Dawgs is already in as a completed game.)
3. **Schedule** — upcoming games are placeholders marked TBD. Replace with the real
   fall/spring schedule.
4. **Cooperstown dates** — I assumed **July 10–16, 2027** so the countdown has a target.
   Confirm your real week and update `cooperstownConfig.startDate`.
5. **Social links** — `siteConfig.social` still points at facebook.com / instagram.com.
6. **Domain** — `siteConfig.siteUrl`, plus the `canonical` and `og:image` tags in each
   page's `<head>`.
7. **Four player photos** and **five coach photos** — see below.

### Two things worth a second thought before this is public

**Player names.** Eleven minors' full names are listed. That's normal for a youth team site
and they're already in your sponsorship package — but a public web page is far more exposed
than a PDF handed to a business. If you'd rather, first name + last initial works fine: edit
the `last` field in `teamData.players`.

**Heidi's contact details.** Her personal email and mobile appear on the contact page, the
footer and the sponsorship page, because that's what the package lists. On a public site
those get harvested by scrapers. A free team address forwarding to her would spare her the
spam — change it in one place, `siteConfig.email`.

---

## The logo

- `assets/img/logo.png` — the site version. Same artwork, with the **C reversed to white**
  so it reads on the near-black background. Nothing about the shape was altered.
- `assets/img/logo-on-light.png` — the original black version, for print and flyers.
- `assets/img/Thunder Logo.png` — your original file, untouched.
- `assets/img/favicon.png` — browser tab icon.

The source file is 170 × 109 px, which is small. It looks fine at the sizes the site uses,
but **if whoever designed it can send the original vector (.ai/.eps/.svg) or a large PNG,
drop it in and it'll be sharper on high-resolution screens.**

---

## Photography

41 photos from the 2026 season by **Matthew Tyree Photography** are built in, at two sizes:
`assets/img/photos/` (~1800px) and `assets/img/photos/thumb/` (~820px). Cards and the
gallery grid load thumbnails; the lightbox loads full size.

The photographer is credited in the footer and on the gallery page with a link to his site.
**Confirm with Matthew Tyree that you have permission to use these on a public website** —
a credit isn't a licence, and it's worth a two-minute email before you go live.

### Player photos

Seven players have photos, cropped from the 2026 set and matched by the **name and number
on their jersey**:

| # | Player | | # | Player |
|---|---|---|---|---|
| 10 | Brayden McKenna | | 29 | Will Shine |
| 11 | Michael Marranca | | 35 | Ethan Kozel |
| 16 | Luke Johnson | | 42 | Jonathan Cooper |
| 19 | Nolan Olewnik | | | |

**Still needed: #2 Leo Siejak, #8 Will Pelkey, #56 Ivan Burke, #86 Phoenix Fredericks.**
I couldn't find them in the photo set with a legible number, and I didn't guess — putting
the wrong kid on a card is worse than a placeholder. They show a branded placeholder until
you add one.

To add a photo:

1. Save a portrait-cropped photo (3:4 works best) to `assets/img/players/`
2. Set that player's `photo:` in `data.js` — e.g. `photo: "assets/img/players/burke.jpg"`

### Coach photos

All five coaches are listed by name and role with placeholder avatars. I deliberately
didn't assign faces: several adults appear in the photos, but only one is identifiable
(a "MC KENNA 11" coaching shirt), and misidentifying someone's coach isn't a risk worth
taking. Add photos via `teamData.coaches[].photo`, same as players.

You can also add a `bio:` line to each coach and it appears on their card.

### Adding more gallery photos

1. Drop the file in `assets/img/photos/` and a smaller copy in `assets/img/photos/thumb/`
   (same filename in both)
2. Add an entry to `galleryData.items`:
   ```js
   { src: "gallery-31", category: "games", caption: "What's happening in the photo" }
   ```
   `src` is the filename without `.jpg`.

Videos work too — there's a commented-out example in `galleryData.items`.

---

## Making the forms actually send

Right now the sponsorship and contact forms open the visitor's email app with the message
pre-filled. That works, but it's not ideal on mobile.

**Better (free, 2 minutes):**

1. Create a form at <https://formspree.io>
2. Copy the endpoint (looks like `https://formspree.io/f/abcdwxyz`)
3. Paste it into `siteConfig.formEndpoint` in `data.js`

Submissions then get emailed to you directly and the visitor sees a success message without
leaving the page.

## Donation buttons

The fundraising page already shows your Venmo handle (@ClarenceThunder) and the check
payable-to line. Add `venmoLink`, `paypalLink` or `otherLink` in `siteConfig.payments` and
they become one-tap buttons. Add a Venmo QR image path to `qrImage` and it renders in the
donate panel.

---

## Publishing to GitHub Pages

```bash
cd "C:\Users\Allison Marranca\clarence-thunder"; git init; git add .; git commit -m "Clarence Thunder 12U website"; git branch -M main
```

Create an empty repo on GitHub, push to it, then set **Settings → Pages → Source: `main`
branch, `/ (root)`**. You'll get a public URL in about a minute.

`.nojekyll` is already included so GitHub serves the files as-is.

---

## How it's built

```
index.html            Homepage
team.html             Roster + coaches + season record
schedule.html         Games (filterable) + tournaments + record
cooperstown.html      Countdown, fundraising, journey timeline
fundraising.html      Fundraisers + direct donation
sponsors.html         Sponsorship levels + form + sponsor wall
news.html             All updates
news-article.html     Individual story (reads ?post=slug)
gallery.html          Filterable masonry gallery + lightbox
about.html            Program story and values
contact.html          Contact form
404.html              Not-found page

assets/css/styles.css Design system — brand colours are at the top in :root
assets/js/data.js     ALL CONTENT — this is the file you edit
assets/js/site.js     Header, footer, countdown, lightbox, forms, SEO schema
assets/js/render.js   Renders each section from the data
```

Pages use `<div data-render="roster">`-style hooks; `render.js` fills them from `data.js`.
To move a section to another page, copy the hook — that's it.

### Changing the colours

Everything derives from the tokens at the top of `assets/css/styles.css` — navy base,
Thunder red, and the gold of the logo bolt. Change them there and the whole site follows.

---

## What's already handled

- Mobile-first throughout; verified with no horizontal scroll at 375px on every page
- Sticky header + a persistent Support/Donate bar on mobile
- Directions and Add-to-Calendar (.ics) on every upcoming game
- Full SEO metadata, Open Graph tags, `sitemap.xml`, `robots.txt`
- Structured data (SportsTeam, SportsEvent, NewsArticle) injected automatically
- Accessible: skip link, keyboard-navigable modals and lightbox, labelled forms, correct
  heading order, alt text on every image
- Lazy-loaded images and a dedicated thumbnail set for fast mobile loading
- Empty states everywhere — the sponsor wall recruits sponsors while it's empty instead of
  looking broken, and the record panel says "coming soon" rather than showing 0–0
