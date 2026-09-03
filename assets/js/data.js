/* ==========================================================================
   CLARENCE THUNDER 12U — SITE CONTENT
   --------------------------------------------------------------------------
   THIS IS THE ONLY FILE YOU NEED TO EDIT FOR DAY-TO-DAY UPDATES.
   Every page reads from the objects below. Nothing is hard-coded elsewhere.

   Quick edits you'll make most often:
     - fundraisingData.raised .......... update the money raised
     - scheduleData.games .............. add games / add results
     - resultsData.record .............. season record
     - sponsorData.sponsors ............ add a sponsor as they sign
     - newsData ........................ add a team update
     - teamData.players ................ roster + player photos

   Dates use "YYYY-MM-DD". Times use 24-hour "HH:MM" (18:30 = 6:30 PM).

   Roster, coaches, sponsorship levels, campaign goal and contact details below
   come from the 2027 Clarence Thunder Sponsorship Package. Anything still made
   up is marked TODO.
   ========================================================================== */

/* --------------------------------------------------------------------------
   1. SITE CONFIG — team identity, contact info, social links, payment links
   -------------------------------------------------------------------------- */
const siteConfig = {
  // Bump this whenever you REPLACE a player/coach photo but keep the same
  // filename - it forces browsers to fetch the new image instead of a cached one.
  assetVersion: "20260830h",
  teamName: "Clarence Thunder 12U",
  shortName: "Thunder",
  orgName: "Clarence Thunder Baseball",
  ageGroup: "12U",
  season: "2026-2027",
  city: "Clarence",
  state: "NY",
  location: "Clarence, New York",

  tagline: "One team. One goal. One unforgettable season.",
  missionLine: "Road to Cooperstown 2027",

  // The team mark, recolored so the C reads on this site's dark background.
  // assets/img/logo-on-light.png is the original black version for print.
  logo: "assets/img/logo.png",

  // Team contact (from the sponsorship package)
  contactName: "Heidi Burke",
  contactRole: "Team Treasurer & Authorized Signer",
  email: "hfmelancon@gmail.com",
  phone: "585-737-6756",

  // Social links. Set to "" (empty string) to hide that icon.
  social: {
    instagram: "https://www.instagram.com/clarencethunder12u/",
    facebook: "https://www.facebook.com/profile.php?id=61593715955233",
    x: "",
    youtube: ""
  },
  // Shown as text on the contact page.
  instagramHandle: "@clarencethunder12u",

  // Payment / donation links.
  payments: {
    venmoHandle: "@ClarenceThunder",       // the team account
    venmoLink: "",                         // e.g. "https://venmo.com/u/ClarenceThunder"
    paypalLink: "",
    otherLink: "",
    otherLabel: "Donate Online",
    checkPayableTo: "Heidi Burke (Team Treasurer & Authorized Signer)",
    qrImage: "assets/img/venmo-qr.png"
  },

  // Where contact + sponsorship forms are sent.
  // EASIEST OPTION: create a free form at https://formspree.io and paste the
  // endpoint here (looks like "https://formspree.io/f/abcdwxyz").
  // If left empty, forms open the visitor's email app pre-filled instead.
  formEndpoint: "https://formspree.io/f/mppzqqvd",

  // Photography credit shown on the gallery.
  photoCredit: {
    name: "Matthew Tyree Photography",
    url: "https://matthewtyreephotography.zenfoliosite.com/clarence-thunder-11u"
  },

  // Used for SEO / structured data. Update after you pick a domain.
  siteUrl: "https://www.clarencethunder.com"
};

/* --------------------------------------------------------------------------
   2. COOPERSTOWN — tournament details + the live countdown
   -------------------------------------------------------------------------- */
const cooperstownConfig = {
  // Cooperstown is AUGUST 2027. The exact week below is still a placeholder -
  // TODO: confirm the official dates and update startDate/endDate/displayDates.
  // The countdown on the site counts down to startDate.
  tournamentName: "Cooperstown",
  week: "",
  startDate: "2027-08-07",
  endDate: "2027-08-13",
  location: "Cooperstown, New York",
  displayDates: "August 2027",

  intro:
    "In August 2027, our boys will travel to Cooperstown, New York - the home of " +
    "the National Baseball Hall of Fame - to compete on the same fields where " +
    "baseball's history was made.",

  description:
    "A Cooperstown tournament is more than a baseball trip - it's a milestone. For " +
    "many of these players, it will be their first time competing on a national " +
    "stage, staying with their team for a full week, and experiencing the traditions " +
    "and history of the sport they love. It's an experience that shapes character as " +
    "much as it does skill.",

  // Exactly what sponsorship dollars cover (from the sponsorship package).
  costBreakdown: [
    { label: "Player room and board", detail: "The full week in Cooperstown for every player on the roster" },
    { label: "Coach room and board", detail: "Our volunteer coaches for the full week" },
    { label: "Umpire fees", detail: "Required umpire fees for tournament play" },
    { label: "Team trading pins", detail: "A Cooperstown tradition - every team trades them all week" },
    { label: "Contingency reserve", detail: "So no family is caught short by an unexpected cost" }
  ],

  // The journey timeline. Set done:true as milestones are completed.
  timeline: [
    { date: "2026 Season", title: "Championship Season", desc: "The Thunder close out 2026 with a 14-1 championship win over the Hamburg Dawgs.", done: true },
    { date: "Fall 2026", title: "The Campaign Opens", desc: "Sponsorship packages go out to Clarence-area businesses and fundraising begins.", done: true },
    { date: "Winter 2026-27", title: "Off-Season Work", desc: "Off-season practices and training while the campaign keeps building.", done: false },
    { date: "March 1, 2027", title: "Fundraising Deadline", desc: "Our $25,000 campaign goal needs to be met so the trip is fully covered.", done: false },
    { date: "August 2027", title: "Cooperstown", desc: "A full week at the home of baseball - the one we've been working toward.", done: false }
  ]
};

/* --------------------------------------------------------------------------
   3. FUNDRAISING — the goal, the money raised, and every active fundraiser
   -------------------------------------------------------------------------- */
const fundraisingData = {
  goal: 25000,        // campaign goal from the sponsorship package
  raised: 5200,       // <-- UPDATE THIS as money comes in
  deadline: "2027-03-01",
  deadlineLabel: "Campaign closes March 1, 2027",
  lastUpdated: "2026-08-27",

  headline: "Cooperstown Fundraising Goal",
  blurb:
    "Sponsorship dollars go directly toward team-level costs for the trip - not " +
    "general operating expenses - and toward making sure no family is caught short.",

  // status: "live" | "soon" | "closed"  ("soon" shows a COMING SOON badge)
  // details[] are the short scannable bullets on each card.
  fundraisers: [
    {
      id: "bills-squares",
      name: "Bills Season Squares",
      status: "live",
      image: "assets/img/photos/thumb/bills-squares.jpg",
      description:
        "Pick your square once and keep it for the whole Bills season. Cash payouts " +
        "every game - and the team's proceeds go straight to Cooperstown.",
      details: ["$100 - one time, all 17 Bills games", "Same square all season", "Cash payout every game"],
      deadline: "",
      deadlineLabel: "Boards open now",
      goal: 0,
      raised: 0,
      cta: "Buy a Square",
      link: "fundraising.html#squares"
    },
    {
      id: "fall-concessions",
      name: "Fall Ball Concessions",
      status: "live",
      image: "assets/img/photos/thumb/hero-sponsors.jpg",
      description:
        "Find the Thunder at the Meadowlakes concession stand every Tuesday and Thursday " +
        "of fall ball - snacks, pizza, drinks, and more. Every sale goes to the Cooperstown fund.",
      details: ["Every Tuesday & Thursday", "Meadowlakes - September 1 to October 1", "Snacks, pizza & drinks"],
      deadline: "2026-10-01",
      deadlineLabel: "Runs September 1 - October 1",
      goal: 0,
      raised: 0,
      cta: "See the Fall Ball Schedule",
      link: "https://www.clarencebaseball.com/schedules"
    },
    {
      id: "tv-raffle",
      name: "75\" TV Raffle",
      status: "live",
      image: "assets/img/photos/thumb/tv-raffle.jpg",
      description:
        "Win a 75-inch Samsung TV. Tickets are $10 - or 2 for $15, 3 for $20, or 10 for $50. " +
        "Pay by cash or Venmo. The drawing happens live on our Instagram on Friday, " +
        "October 16 - and you don't have to be present to win.",
      details: ["$10 each - 2/$15, 3/$20, 10/$50", "75-inch Samsung TV", "Drawn live on Instagram - Oct 16"],
      deadline: "2026-10-16",
      deadlineLabel: "Drawing Friday, October 16, 2026",
      goal: 0,
      raised: 0,
      cta: "Get Raffle Tickets",
      link: ""
    },
    {
      id: "restaurant-night",
      name: "Thunder Night Out",
      status: "soon",
      image: "assets/img/photos/thumb/event-bowling-01.jpg",
      description:
        "Eat out, back the team. A Clarence-area restaurant donates a share of the " +
        "night's sales to the Thunder. Bring the whole family.",
      details: ["Date to be announced", "Clarence-area restaurant", "Dine in or take out"],
      deadline: "",
      deadlineLabel: "Date coming soon",
      goal: 0,
      raised: 0,
      cta: "Get Details",
      link: ""
    },
    {
      id: "team-apparel",
      name: "Thunder Apparel",
      status: "live",
      image: "assets/img/photos/thumb/gallery-26.jpg",
      description:
        "Hoodies, tees and hats for players, parents and grandparents. The official " +
        "Thunder team store is open at Harmony Bats - wear the bolt and send a piece " +
        "of every order to Cooperstown.",
      details: ["Official team store is open", "Youth and adult sizes", "Proceeds to the trip"],
      deadline: "",
      deadlineLabel: "Store open now",
      goal: 0,
      raised: 0,
      cta: "Shop Thunder Gear",
      link: "https://www.harmonybats.com/team/clarence-thunder"
    },
    {
      id: "direct-donation",
      name: "Make a Donation",
      status: "live",
      image: "assets/img/photos/thumb/gallery-02.jpg",
      description:
        "No squares, no raffle, no order form. A direct contribution goes straight " +
        "into the Cooperstown fund - and any amount genuinely helps.",
      details: ["Venmo @ClarenceThunder", "Checks welcome", "Any amount helps"],
      deadline: "2027-03-01",
      deadlineLabel: "Open all campaign",
      goal: 0,
      raised: 0,
      cta: "Donate",
      link: "fundraising.html#donate"
    }
  ]
};

/* --------------------------------------------------------------------------
   4. TEAM — roster + coaching staff
   --------------------------------------------------------------------------
   PLAYER PHOTOS: drop a photo in assets/img/players/ and set `photo` to
   "assets/img/players/lastname.jpg". Portrait (3:4) crops look best.
   Leave photo:"" and a branded placeholder is shown instead.

   Optional fields - fill in whatever each player wants to share and it appears
   on their profile card. Anything left blank is simply hidden:
     bats, throws, favPlayer, favTeam, funFact, favoriteMemory

   sponsoredBy: if a business sponsors a player, put the business name here and
   a "Sponsored by ..." line appears on that player's card. Leave "" for none.

   Keep it baseball only - no schools, addresses, birthdays or contact details.
   -------------------------------------------------------------------------- */
const teamData = {
  players: [
    { number: 2,  first: "Leo",      last: "Siejak",      pos1: "1B", pos2: "LF", bats: "", throws: "", favPlayer: "", favTeam: "", funFact: "", bio: "", photo: "assets/img/players/siejak.jpg" , favoriteMemory: "", sponsoredBy: "" },
    { number: 8,  first: "Will",     last: "Pelkey",      pos1: "C",  pos2: "2B", bats: "", throws: "", favPlayer: "", favTeam: "", funFact: "", bio: "", photo: "assets/img/players/pelkey.jpg" , favoriteMemory: "", sponsoredBy: "" },
    { number: 10, first: "Brayden",  last: "McKenna",     pos1: "SS", pos2: "",   bats: "", throws: "", favPlayer: "", favTeam: "", funFact: "", bio: "", photo: "assets/img/players/mckenna.jpg" , favoriteMemory: "", sponsoredBy: "" },
    { number: 11, first: "Michael",  last: "Marranca",    pos1: "2B", pos2: "RF", bats: "Right", throws: "Right", favPlayer: "Ben Rice", favTeam: "New York Yankees", funFact: "",
      // bio can be a plain string or an array - each array entry renders as its own paragraph.
      bio: [
        "Michael is 11 years old and a sixth-grader at Clarence Middle School - an active, social kid who loves time with friends, traveling, and competing in just about any sport he can find.",
        "On the field he holds down second base and right field for the Thunder. He plays baseball, football, and basketball, keeping him busy year-round.",
        "Off the field you'll find him traveling and making memories with family and friends. Wherever he goes, he brings the same energy, competitiveness, and team-first attitude."
      ],
      photo: "assets/img/players/marranca.jpg" , favoriteMemory: "Beating the Hamburg Dawgs 14-1 to win the 2026 championship.", sponsoredBy: "" },
    { number: 16, first: "Luke",     last: "Johnson",     pos1: "P",  pos2: "C",  bats: "", throws: "", favPlayer: "", favTeam: "", funFact: "", bio: "", photo: "assets/img/players/johnson.jpg" , favoriteMemory: "", sponsoredBy: "" },
    { number: 19, first: "Nolan",    last: "Olewnik",     pos1: "2B", pos2: "P",  bats: "", throws: "", favPlayer: "", favTeam: "", funFact: "", bio: "", photo: "assets/img/players/olewnik.jpg" , favoriteMemory: "", sponsoredBy: "" },
    { number: 29, first: "Will",     last: "Shine",       pos1: "LF", pos2: "2B", bats: "", throws: "", favPlayer: "", favTeam: "", funFact: "", bio: "", photo: "assets/img/players/shine.jpg" , favoriteMemory: "", sponsoredBy: "" },
    { number: 35, first: "Ethan",    last: "Kozel",       pos1: "P",  pos2: "C",  bats: "", throws: "", favPlayer: "", favTeam: "", funFact: "", bio: "", photo: "assets/img/players/kozel.jpg" , favoriteMemory: "", sponsoredBy: "" },
    { number: 42, first: "Jonathan", last: "Cooper",      pos1: "C",  pos2: "P",  bats: "", throws: "", favPlayer: "", favTeam: "", funFact: "", bio: "", photo: "assets/img/players/cooper.jpg" , favoriteMemory: "", sponsoredBy: "" },
    { number: 56, first: "Ivan",     last: "Burke",       pos1: "3B", pos2: "P",  bats: "", throws: "", favPlayer: "", favTeam: "", funFact: "", bio: "", photo: "assets/img/players/burke.jpg" , favoriteMemory: "", sponsoredBy: "" },
    { number: 86, first: "Phoenix",  last: "Fredericks",  pos1: "P",  pos2: "C",  bats: "", throws: "", favPlayer: "", favTeam: "", funFact: "", bio: "", photo: "assets/img/players/fredericks.jpg" , favoriteMemory: "", sponsoredBy: "" }
  ],

  // bio is optional - add a line about each coach and it shows on their card.
  // Head Coach and Team Manager render centered on the top row;
  // everyone else lands on the assistants row below.
  coaches: [
    { role: "Head Coach",      name: "Jon Cooper",      bio: "", photo: "assets/img/coaches/cooper.jpg" },
    { role: "Team Manager",    name: "Clairice Cooper", bio: "", photo: "assets/img/coaches/cooper-clairice.jpg" },
    { role: "Assistant Coach", name: "Eric Johnson",    bio: "", photo: "assets/img/coaches/johnson.jpg" },
    { role: "Assistant Coach", name: "Matt Cardona",    bio: "", photo: "assets/img/coaches/cardona.jpg" },
    { role: "Assistant Coach", name: "Brett McKenna",   bio: "", photo: "assets/img/coaches/mckenna.jpg" }
  ]
};

/* --------------------------------------------------------------------------
   5. SCHEDULE — games and tournaments
   --------------------------------------------------------------------------
   status: "upcoming" | "final"
   For finals, fill in result: { us: 14, them: 1 }  (W/L/T is worked out for you)
   Set `tournament: true` to have it show under the Tournaments filter.

   TODO: the upcoming games below are EXAMPLES so you can see how the page works.
   Replace them with the real fall/spring schedule.
   -------------------------------------------------------------------------- */
const scheduleData = {
  games: [
    /* ---------- COMPLETED - 2026 716 Independence League season ----------
       Pulled from GameChanger (2026 Summer Clarence Thunder 11U). League play
       only - the fall 2025 game and the three tournament weekends are not here. */
    { date: "2026-03-13", time: "", opponent: "MMB Bandits Silver", event: "716 Independence League",
      field: "", city: "", home: true , status: "final", tournament: false,
      result: { us: 11, them: 4 } },
    { date: "2026-03-29", time: "", opponent: "Southline Shamrocks", event: "716 Independence League",
      field: "", city: "", home: false, status: "final", tournament: false,
      result: { us: 3, them: 19 } },
    { date: "2026-04-12", time: "", opponent: "Eden Raiders", event: "716 Independence League",
      field: "", city: "", home: false, status: "final", tournament: false,
      result: { us: 10, them: 6 } },
    { date: "2026-05-03", time: "", opponent: "Lewiston Cannons", event: "716 Independence League",
      field: "6200 Kraus Rd", city: "Clarence, NY", home: true , status: "final", tournament: false,
      result: { us: 4, them: 7 } },
    { date: "2026-05-03", time: "", opponent: "Southline Shamrocks Green", event: "716 Independence League",
      field: "6200 Kraus Rd", city: "Clarence, NY", home: true , status: "final", tournament: false,
      result: { us: 5, them: 3 } },
    { date: "2026-05-09", time: "", opponent: "Blaze Grey", event: "716 Independence League",
      field: "15 Shoshone St", city: "", home: false, status: "final", tournament: false,
      result: { us: 10, them: 7 } },
    { date: "2026-05-30", time: "", opponent: "NT Americans Blue", event: "716 Independence League",
      field: "", city: "", home: false, status: "final", tournament: false,
      result: { us: 10, them: 11 } },
    { date: "2026-05-31", time: "", opponent: "Central Amherst Yetis", event: "716 Independence League",
      field: "6200 Kraus Rd", city: "Clarence, NY", home: true , status: "final", tournament: false,
      result: { us: 15, them: 13 } },
    { date: "2026-05-31", time: "", opponent: "Grand Island Vikings", event: "716 Independence League",
      field: "", city: "", home: true , status: "final", tournament: false,
      result: { us: 18, them: 12 } },
    { date: "2026-06-05", time: "", opponent: "Lewiston Cannons", event: "716 Independence League",
      field: "", city: "", home: false, status: "final", tournament: false,
      result: { us: 18, them: 12 } },
    { date: "2026-06-06", time: "", opponent: "MMB Bandits Silver", event: "716 Independence League",
      field: "", city: "", home: false, status: "final", tournament: false,
      result: { us: 13, them: 0 } },
    { date: "2026-06-07", time: "", opponent: "Cement City Grizzlies", event: "716 Independence League",
      field: "", city: "", home: true , status: "final", tournament: false,
      result: { us: 20, them: 0 } },
    { date: "2026-06-07", time: "", opponent: "Cement City Grizzlies", event: "716 Independence League",
      field: "", city: "Clarence, NY", home: false, status: "final", tournament: false,
      result: { us: 30, them: 0 } },
    { date: "2026-06-21", time: "", opponent: "Hamburg Dawgs Purple", event: "716 Independence League",
      field: "", city: "", home: true , status: "final", tournament: false,
      result: { us: 10, them: 11 } },
    { date: "2026-06-28", time: "", opponent: "Lake Erie Lightning", event: "716 Independence League",
      field: "", city: "", home: true , status: "final", tournament: false,
      result: { us: 5, them: 20 } },
    { date: "2026-06-28", time: "", opponent: "Lake Erie Lightning", event: "716 Independence League",
      field: "", city: "", home: false, status: "final", tournament: false,
      result: { us: 12, them: 1 } },
    { date: "2026-06-30", time: "", opponent: "Buffalo Bomb Squad", event: "716 Independence League",
      field: "6570 Campbell Blvd", city: "", home: false, status: "final", tournament: false,
      result: { us: 13, them: 8 } },
    { date: "2026-07-07", time: "", opponent: "Buffalo Bomb Squad", event: "716 Independence League",
      field: "6200 Kraus Rd", city: "Clarence, NY", home: true , status: "final", tournament: false,
      result: { us: 12, them: 8 } },
    { date: "2026-07-14", time: "", opponent: "Grand Island Vikings", event: "716 Independence League",
      field: "Grand Island Little League", city: "Grand Island, NY", home: false, status: "final", tournament: false,
      result: { us: 17, them: 8 } },
    { date: "2026-07-19", time: "", opponent: "Buffalo Bomb Squad", event: "716 Independence League",
      field: "6200 Kraus Rd", city: "Clarence, NY", home: true , status: "final", tournament: false,
      result: { us: 11, them: 9 } },
    { date: "2026-07-23", time: "", opponent: "Lewiston Cannons", event: "716 Independence League",
      field: "", city: "", home: true , status: "final", tournament: false,
      result: { us: 14, them: 2 } },
    { date: "2026-07-30", time: "", opponent: "Hamburg Dawgs Purple", event: "716 Independence League Championship",
      field: "", city: "", home: false, status: "final", tournament: false,
      result: { us: 14, them: 1 } },

    /* ---------- UPCOMING ----------
       No games entered = the site shows a "coming soon" panel automatically.
       Add the real 12U schedule here as games are confirmed, e.g.:
       { date: "2026-09-12", time: "10:00", opponent: "Team Name", event: "Fall Ball",
         field: "Clarence Town Park", city: "Clarence, NY", home: true,
         status: "upcoming", tournament: false },
    */
  ],

  // Featured tournaments (shown as cards on the schedule page)
  tournaments: [
    {
      name: "Cooperstown",
      dates: "August 2027",
      location: "Cooperstown, NY",
      image: "assets/img/photos/thumb/hero-cooperstown.jpg",
      note: "The one we've been working toward. A full week at the home of baseball."
    }

    /* Add tournaments as they're booked:
    {
      name: "Queen City Fall Classic",
      dates: "September 19-20, 2026",
      location: "Cheektowaga, NY",
      image: "assets/img/photos/thumb/gallery-23.jpg",
      note: "Eight-team bracket."
    },
    */
  ]
};

/* --------------------------------------------------------------------------
   6. RESULTS — season record
   --------------------------------------------------------------------------
   autoCalculate:true  -> the record is worked out from the completed games above
   autoCalculate:false -> type the numbers in manually below

   Right now this is set to auto, so it only reflects games you've entered.
   Switch to false and fill in `record` if you'd rather show the full season.
   -------------------------------------------------------------------------- */
const resultsData = {
  seasonLabel: "2026 Season",

  // 716 Independence League play only, from GameChanger. Tournament weekends
  // and the fall 2025 game are not included in this record.
  autoCalculate: false,
  record: {
    wins: 17,
    losses: 5,
    ties: 0,
    runsScored: 275,
    runsAllowed: 162
  },
  note: "716 Independence League play. Tournament results are not included."
};

/* --------------------------------------------------------------------------
   7. SPONSORS — sponsorship levels + the sponsor wall
   --------------------------------------------------------------------------
   Levels below match the 2027 Clarence Thunder Sponsorship Package.

   To add a sponsor, add an object to `sponsors`:
     { name: "Business Name", tier: "grand-slam", url: "https://...",
       logo: "assets/img/sponsors/business.png", tagline: "What they do" }
   `tier` must match one of the level `id` values below.
   `logo` is optional - without it we render the business name in type.
   -------------------------------------------------------------------------- */
const sponsorData = {
  footnote: "Sponsorships of any amount are welcome and appreciated - these tiers are a guide, not a limit.",

  levels: [
    {
      id: "thunder-champion",
      name: "Thunder Champion",
      price: 2500,
      featured: false,
      flag: "",
      cta: "Reserve This Level",
      note: "Our top level of support",
      benefits: [
        "Top-billed logo on the website sponsor wall - largest placement, listed first",
        "Featured on the website homepage and the Cooperstown page",
        "Your own sponsor spotlight article on the team website",
        "Large logo on the team banner",
        "Prominent logo on the practice jersey sleeve (first 2 sponsors at this level only)",
        "Featured social media post",
        "Recognition at every event"
      ]
    },
    {
      id: "grand-slam",
      name: "Grand Slam",
      price: 1000,
      featured: true,          // <- the visually highlighted card
      flag: "Most Popular",
      cta: "Choose Grand Slam",
      note: "The one most businesses pick",
      benefits: [
        "Large logo on the website sponsor wall",
        "Featured on the website homepage and the Cooperstown page",
        "Medium logo on the team banner",
        "Logo on the practice jersey",
        "Social media recognition"
      ]
    },
    {
      id: "home-run",
      name: "Home Run",
      price: 500,
      featured: false,
      flag: "",
      cta: "Choose Home Run",
      note: "",
      benefits: [
        "Logo on the website sponsor wall",
        "Small logo on the team banner",
        "Social media mention"
      ]
    },
    {
      id: "triple",
      name: "Triple",
      price: 250,
      featured: false,
      flag: "",
      cta: "Choose Triple",
      note: "",
      benefits: [
        "Name on the website sponsor wall",
        "Name on the team banner"
      ]
    },
    {
      id: "double",
      name: "Double",
      price: 100,
      featured: false,
      flag: "",
      cta: "Choose Double",
      note: "Great for small and family-run businesses",
      benefits: [
        "Name in the website supporters list",
        "Named recognition in our final campaign thank-you report"
      ]
    }
  ],

  /* Add real sponsors here as they sign. Every field except `name` and `tier`
     is optional - anything you leave out is simply hidden on the card.

     {
       name: "Clarence Auto Works",          // required
       tier: "grand-slam",                   // required - must match a level id above
       category: "Auto Repair",              // short business category
       tagline: "Full-service auto repair on Main Street, Clarence",
       url: "https://clarenceautoworks.com", // makes the whole card clickable
       logo: "assets/img/sponsors/clarence-auto-works.png"
     },
  */
  sponsors: []
};

/* --------------------------------------------------------------------------
   8. NEWS — team updates
   --------------------------------------------------------------------------
   `body` is an array. Each item is either a plain string (a paragraph),
   or { h: "A subheading" }, or { quote: "A pull quote" },
   or { list: ["item one", "item two"] }.
   -------------------------------------------------------------------------- */
const newsData = [
  {
    slug: "cooperstown-2027",
    title: "Thunder Are Headed to Cooperstown in 2027",
    date: "2026-08-18",
    category: "Cooperstown",
    image: "assets/img/photos/team-photo.jpg",
    excerpt:
      "In August 2027, eleven Clarence boys will play a full week at the home of baseball. Here's what it takes to get them there.",
    body: [
      "In August 2027, Clarence Thunder 12U will travel to Cooperstown, New York - the home of the National Baseball Hall of Fame - to compete on the same fields where baseball's history was made.",
      "Our 12U roster is made up of eleven dedicated young athletes, every one of them from Clarence, coached by volunteers who invest their own time to develop these players both on and off the field.",
      { h: "Why It Matters" },
      "A Cooperstown tournament is more than a baseball trip - it's a milestone. For many of these players, it will be their first time competing on a national stage, staying with their team for a full week, and experiencing the traditions and history of the sport they love.",
      { h: "What It Takes" },
      "Our campaign goal is $25,000, to be raised between now and March 1, 2027. Sponsorship dollars go directly toward team-level costs for the trip - not general operating expenses:",
      { list: [
        "Player room and board for the week in Cooperstown",
        "Required umpire fees for tournament play",
        "Coach room and board for the week",
        "Team trading pins - a Cooperstown tradition",
        "A contingency reserve so no family is caught short"
      ]},
      { quote: "Partner with us to send eleven boys to the home of baseball." },
      "If you're a local business owner, or you just want to help these kids get there, we'd love to talk."
    ]
  },
  {
    slug: "sponsorship-open",
    title: "Sponsorship Is Open for the Cooperstown Campaign",
    date: "2026-08-04",
    category: "Sponsors",
    image: "assets/img/photos/gallery-19.jpg",
    excerpt:
      "Five levels of support, from $100 to $2,500 - with banner, jersey, social, and website recognition all season long.",
    body: [
      "Sponsorship for the Clarence Thunder Cooperstown campaign is officially open, and we're looking for local businesses to put their name behind this team.",
      "Our team plays approximately 25 games this season, plus off-season and in-season practices - and practice jerseys are also worn during school spirit days, giving sponsor logos regular, ongoing visibility.",
      { h: "Where the Money Goes" },
      "Sponsorship dollars go directly toward team-level costs for the Cooperstown trip - player and coach room and board, umpire fees, team trading pins, and a contingency reserve. Not general operating expenses.",
      "Levels run from $100 to $2,500, and sponsorships of any amount are welcome. These tiers are a guide, not a limit - if you have something else in mind, tell us and we'll build it."
    ]
  }
,
  {
    slug: "2026-championship",
    title: "Thunder Win the 2026 Championship",
    date: "2026-07-30",
    category: "Game Recap",
    image: "assets/img/photos/champions-2026.jpg",
    excerpt:
      "A 14-1 win over the Hamburg Dawgs closed out the 2026 season with a championship.",
    body: [
      "The Thunder closed out the 2026 season the right way, beating the Hamburg Dawgs 14-1 to take the championship.",
      "It's the kind of result that comes from years of practice, teamwork, and a group of kids who have grown up playing the game together.",
      "It's a good note to end the season on, and a good sign heading into a long off-season of work before the 2027 season - and Cooperstown."
    ]
  }
];

/* --------------------------------------------------------------------------
   9. GALLERY — photos and videos
   --------------------------------------------------------------------------
   category must be one of the `categories` ids below.
   For a video, use: { type:"video", videoUrl:"https://www.youtube.com/embed/XXXX",
                       thumb:"assets/img/photos/thumb/xxx.jpg", caption:"..." }
   -------------------------------------------------------------------------- */
const galleryData = {
  categories: [
    { id: "all",         label: "All" },
    { id: "games",       label: "Games" },
    { id: "tournaments", label: "Tournaments" },
    { id: "practices",   label: "Practices" },
    { id: "team",        label: "Team Events" },
    { id: "cooperstown", label: "Cooperstown Journey" }
  ],
  items: [
    { src: "gallery-16", category: "games",       caption: "Celebrating at the plate after a three-run inning" },
    { src: "gallery-03", category: "games",       caption: "Ball in the glove, waiting on the sign" },
    { src: "gallery-15", category: "games",       caption: "Head-first into third" },
    { src: "gallery-09", category: "games",       caption: "Framing behind the plate" },
    { src: "gallery-23", category: "tournaments", caption: "Dug in at the plate" },
    { src: "gallery-01", category: "team",        caption: "High five with the coach after a big hit" },
    { src: "gallery-27", category: "tournaments", caption: "Shades on, game face ready" },
    { src: "gallery-11", category: "games",       caption: "Catcher up and throwing" },
    { src: "gallery-14", category: "games",       caption: "Delivery, in black and white" },
    { src: "gallery-21", category: "games",       caption: "Coming home to score" },
    { src: "gallery-07", category: "games",       caption: "Calling for it in the infield" },
    { src: "gallery-25", category: "games",       caption: "Dust flying into second" },
    { src: "gallery-19", category: "team",        caption: "Coaches watching from the fence" },
    { src: "gallery-18", category: "games",       caption: "Gear on, glove up" },
    { src: "gallery-29", category: "tournaments", caption: "Setting up in the box" },
    { src: "gallery-26", category: "team",        caption: "Teammates on deck, waiting to hit" },
    { src: "gallery-12", category: "games",       caption: "Follow-through off the mound" },
    { src: "gallery-24", category: "games",       caption: "Play at the plate" },
    { src: "gallery-02", category: "team",        caption: "Dugout celebration" },
    { src: "gallery-17", category: "practices",   caption: "Bat in hand, waiting on deck" },
    { src: "gallery-30", category: "team",        caption: "Clarence Thunder, front and center" },
    { src: "gallery-20", category: "games",       caption: "Winding up" },
    { src: "gallery-28", category: "games",       caption: "Blocking in the dirt" },
    { src: "gallery-22", category: "games",       caption: "Balanced and ready to swing" },
    { src: "champions-2026", category: "team",   caption: "2026 League Champions - medals and number ones" },

    /* Monroeville tournament weekend, July 2026 - the team took in a Pirates
       game at PNC Park between games. */
    { src: "event-pittsburgh-01", category: "tournaments", caption: "PNC Park during the Monroeville tournament weekend, July 2026" },
    { src: "event-pittsburgh-02", category: "tournaments", caption: "Thunder at the rail, Pittsburgh skyline behind them" },
    { src: "event-pittsburgh-03", category: "tournaments", caption: "Taking in a Pirates game between tournament games" },
    { src: "event-pittsburgh-04", category: "tournaments", caption: "The whole crew in the stands at PNC Park" },

    /* Team bowling party, August 2026 */
    { src: "event-bowling-01",    category: "team",        caption: "Team bowling party, August 2026" },
    { src: "event-bowling-02",    category: "team",        caption: "Ready to roll at the team bowling party" },
    { src: "event-bowling-03",    category: "team",        caption: "Handing out the end-of-season awards" },
    { src: "event-bowling-04",    category: "team",        caption: "Cheering on a strike" },
    { src: "event-bowling-05",    category: "team",        caption: "Squad night at the lanes" },
    { src: "team-photo", category: "team",        caption: "Clarence Thunder - 2026 team photo" },
    { src: "coaches",    category: "team",        caption: "The coaching staff at work" },

    /* Added August 2026 */
    { src: "gallery-31", category: "games",       caption: "Digging hard out of the box" },
    { src: "gallery-32", category: "games",       caption: "Dealing in the sprinkle jerseys" },
    { src: "gallery-33", category: "games",       caption: "Leg kick, locked in" },
    { src: "gallery-34", category: "games",       caption: "Staring down the hitter" },
    { src: "gallery-35", category: "games",       caption: "Eye on the ball" },
    { src: "gallery-36", category: "games",       caption: "Charging the grounder" },
    { src: "gallery-37", category: "games",       caption: "Framing it in the sprinkle gear" },
    { src: "gallery-38", category: "games",       caption: "Game face on the way to the plate" },
    { src: "gallery-39", category: "games",       caption: "On the mound in the Pink Out jerseys" },
    { src: "gallery-40", category: "games",       caption: "Reading the pitcher from second" },
    { src: "gallery-41", category: "team",        caption: "All smiles between innings" },
    { src: "gallery-42", category: "games",       caption: "Firing it across from second" },
    { src: "gallery-43", category: "games",       caption: "Letting it rip in the red and gold" },
    { src: "gallery-44", category: "games",       caption: "Backhand pick on one knee" },
    { src: "gallery-45", category: "games",       caption: "Loaded up and looking for a fastball" },
    { src: "gallery-46", category: "games",       caption: "That one's got a chance" },
    { src: "gallery-47", category: "games",       caption: "Sidearm smoke" },
    { src: "gallery-48", category: "games",       caption: "Dealing from the windup" },
    { src: "gallery-49", category: "games",       caption: "Cannon from the outfield" },
    { src: "gallery-50", category: "games",       caption: "Turning the corner at full speed" },
    { src: "gallery-51", category: "games",       caption: "Ready for anything" },
    { src: "gallery-52", category: "games",       caption: "Digging for the extra base" },
    { src: "gallery-53", category: "games",       caption: "Bringing it home" },
    { src: "gallery-54", category: "games",       caption: "Barrel on the ball" },
    { src: "gallery-55", category: "games",       caption: "The windup" },
    { src: "gallery-56", category: "team",        caption: "Lining up at the lanes at the team bowling party" },
    { src: "gallery-58", category: "games",       caption: "Sliding in under the tag" },
    { src: "gallery-60", category: "games",       caption: "Dust cloud into third" },
    { src: "gallery-61", category: "games",       caption: "Pop time" },
    { src: "gallery-62", category: "games",       caption: "Stretching for the out" },
    { src: "gallery-63", category: "games",       caption: "Heading in after three outs" },
    { src: "gallery-64", category: "games",       caption: "Locked in at the corner" },
    { src: "gallery-65", category: "games",       caption: "Painting the corner" },
    { src: "gallery-66", category: "team",        caption: "High five rounding third" },
    { src: "gallery-67", category: "team",        caption: "Bat ready, grin ready" },
    { src: "gallery-68", category: "games",       caption: "Waiting on his pitch" }

    /* Add a video like this:
    { type: "video", videoUrl: "https://www.youtube.com/embed/VIDEO_ID",
      thumb: "assets/img/photos/thumb/gallery-01.jpg",
      category: "games", caption: "Highlight reel - 2026 championship" },
    */
  ]
};

/* --------------------------------------------------------------------------
   10. NAVIGATION — the site menu (used by every page's header and footer)
   -------------------------------------------------------------------------- */
// Top-level navigation. The logo links home, so Home isn't listed here.
const navData = [
  { label: "Team",        href: "team.html" },
  { label: "Schedule",    href: "schedule.html" },
  { label: "Cooperstown", href: "cooperstown.html" },
  { label: "Support Us",  href: "fundraising.html" },
  { label: "Sponsors",    href: "sponsors.html" }
];

// Lives under the "More" dropdown on desktop / the expandable More group on mobile.
const navMore = [
  { label: "News",     href: "news.html" },
  { label: "Gallery",  href: "gallery.html" },
  { label: "Contact",  href: "contact.html" }
];

// Extra pages that appear in the More group and footer but not the top nav.
const navExtras = [
  { label: "About the Thunder", href: "about.html" }
];
