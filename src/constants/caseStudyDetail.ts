/**
 * The long-form half of a case study: the situation the work was
 * commissioned to change, and the decisions worth defending.
 *
 * Kept out of `projects.ts` because only `CaseStudyPage` reads it, while
 * `projects.ts` is pulled in by the homepage, the portfolio grid and the
 * project cards. Left in the shared module this prose was 19KB of the
 * 41KB file, shipped to every visitor who never opened a case study.
 *
 * Keyed by slug rather than nested in each project so the split is obvious:
 * anything in here costs nothing until somebody opens a case study.
 */

export type TDecision = {
  title: string;
  detail: string;
};

export type TCaseStudyDetail = {
  problem?: string;
  decisions?: TDecision[];
};

export const caseStudyDetail: Record<string, TCaseStudyDetail> = {
  comcin: {
    problem:
      'A submission that moves through several stages and more than one reviewer does not fit on a single page. Asking for everything at once produces abandoned forms and half-complete records, and it leaves neither the person submitting nor the staff reviewing any way to answer the only question either of them has: where has this got to.',
    decisions: [
      {
        title: 'Stages that persist independently',
        detail:
          'Each step validates and saves on its own rather than the form submitting once at the end. A submission can be resumed after a dropped connection, and a reviewer can see precisely how far it progressed instead of inferring it from an empty record.',
      },
      {
        title: 'A single store behind form and dashboard',
        detail:
          'Form state spans several screens while the dashboard reads the same records. Redux Toolkit holds both so the two cannot drift, which is the usual failure when a multi-step flow keeps its own local copy.',
      },
      {
        title: 'The dashboard exists to answer status',
        detail:
          'It was built around progress through stages rather than around totals. The measure of the feature is whether it removes the phone call asking where a submission has reached.',
      },
    ],
  },
  urcalls: {
    problem:
      'A consumer calling product accumulates account, subscription and payment records faster than any manual process can service them. Support, finance and administration all need to act on the same records but should not all see or change the same fields, and until a back office exists every request lands on whoever happens to have database access.',
    decisions: [
      {
        title: 'The role decides the surface',
        detail:
          'Rather than render one screen and hide the controls a user may not touch, each role is given its own view. Hiding after the fact leaks through direct links and stale views, and it leaves everyone reading an interface built mostly for somebody else.',
      },
      {
        title: 'Billing state read from the payment APIs',
        detail:
          'Subscription and payment status is read from the payment provider rather than mirrored into a second table. A local copy of financial state is a second source of truth, and the two disagree exactly when it matters.',
      },
      {
        title: 'A component set built before the screens',
        detail:
          'An admin tool is several dozen variations on table, form and detail view. Building the shared set first made each later screen a composition rather than a rebuild, and it is why the surface stayed consistent as it grew.',
      },
    ],
  },
  nexalife: {
    problem:
      'Referrals arriving by phone, email and paper leave no shared record of what happened next. Coordinators chase outcomes by asking colleagues, and a referral that stalls stays invisible until somebody happens to notice. The gap between referral and outcome is the thing that matters most in coordinated care, and a spreadsheet records it worst.',
    decisions: [
      {
        title: 'Status is the spine of the system',
        detail:
          'A referral carries an explicit status rather than having it inferred from which columns are filled in. Every view is built on that status, so a stalled referral surfaces on the dashboard instead of waiting to be discovered.',
      },
      {
        title: 'Capture staged at the point of referral',
        detail:
          'Referral details are collected in stages matching how the information actually arrives, rather than demanding a complete record before anything can be saved. An incomplete referral inside the system beats a complete one in a notebook.',
      },
      {
        title: 'Dashboards that move when the data moves',
        detail:
          'Status changes reflect on the dashboard as they happen. A tracking system that has to be refreshed to be trusted gets checked less often, and then stops being the source of truth.',
      },
    ],
  },
  hrrp: {
    problem:
      'HR work that spans more than one person — a leave request, an appraisal, an onboarding — had no single place to live. Records sat in spreadsheets, approvals happened in email, and the question of where a request had got to could only be answered by asking someone. The reporting an HR function needs had to be assembled by hand each time.',
    decisions: [
      {
        title: 'Role decides the surface, not just the permissions',
        detail:
          'Rather than render one interface and hide what a user may not touch, each role is given its own view of the platform. A staff member, a line manager and an HR administrator open the same route and see different pages. Hiding controls after the fact tends to leak — through a direct URL, through a stale cached view — and it also leaves every user reading an interface mostly built for someone else.',
      },
      {
        title: 'Workflow stage as the unit of state',
        detail:
          'A request carries an explicit stage rather than a scatter of booleans. Adding an approval step is a change to the stage list instead of a change to every screen that reads the record, and "where has this got to" has one authoritative answer.',
      },
      {
        title: 'TypeScript across the record and workflow models',
        detail:
          'Staff records and workflow payloads are typed end to end. On a platform where several roles write to the same record, a shape mismatch between a form and the API is the failure that costs most to find in production.',
      },
    ],
  },
  kpi: {
    problem:
      'Performance reviews that begin from separately maintained spreadsheets spend their first half disputing whose numbers are correct. Targets agreed in one place and results recorded in another drift apart over a quarter, and by review time nobody can reconstruct what was actually agreed or when it changed.',
    decisions: [
      {
        title: 'Targets and results in one system',
        detail:
          'Setting a target and reporting against it are the same workflow rather than two documents that have to be reconciled. That is the whole point of the platform: the review starts from numbers both sides already accept.',
      },
      {
        title: 'Team-level aggregation as a first-class view',
        detail:
          'Roll-up to team was designed in rather than added later as a report. A manager and an individual ask different questions of the same data, and recomputing one from the other by hand is where errors enter.',
      },
      {
        title: 'TypeScript across the metric models',
        detail:
          'Targets, results and their aggregations are typed end to end. On a reporting surface a silently wrong number does more damage than a crash, because nobody notices it.',
      },
    ],
  },
  'church-dashboard': {
    problem:
      'The recurring administration of a congregation, meaning who is a member, what is scheduled and who needs telling, usually lives across notebooks, personal phone contacts and group chats. It works until the person holding it is unavailable, and it cannot be handed over when a role changes.',
    decisions: [
      {
        title: 'Firebase so there is no server to run',
        detail:
          'A congregation has no technical staff and little appetite for infrastructure cost. A managed backend keeps running cost and maintenance near zero, which is what decides whether a system like this is still in use in two years.',
      },
      {
        title: 'Members, events and notifications in one model',
        detail:
          'The three were built against a shared data model rather than as separate tools, because in practice they are one workflow: a member record drives who is contacted about which event.',
      },
      {
        title: 'Forms designed for occasional use',
        detail:
          'The people entering data do it infrequently and are not trained on it. The entry forms assume somebody returning after a month, not a daily operator who has memorised the fields.',
      },
    ],
  },
  africanproverbs: {
    problem:
      'A large collection of very short texts is the hardest kind of content to browse. Proverbs have no natural hierarchy, their title is the text itself, and a visitor rarely recalls the exact wording they are looking for. Without good retrieval a large collection is genuinely less useful than a small one.',
    decisions: [
      {
        title: 'Retrieval built as the interface',
        detail:
          'Search and filtering are the primary way through the collection rather than a box added above a list. The browsing experience was designed around not knowing the exact phrase, which is the normal case here.',
      },
      {
        title: 'Next.js so individual entries are server-rendered',
        detail:
          'Short texts live or die on being findable. Server rendering means each proverb is a real page a search engine can index, rather than a fragment that exists only once JavaScript has run.',
      },
      {
        title: 'A content pipeline kept separate from the site',
        detail:
          'Proverb data is integrated through its own APIs rather than held inside the pages. Adding to the collection is a content operation, not a deployment.',
      },
    ],
  },
  realcousins: {
    problem:
      'Family knowledge in Nigerian and diaspora families sits with the oldest living relatives and travels by conversation. Once a family is spread across continents those conversations stop happening, and the generic genealogy tools built around Western record sets handle neither the family structures nor the absence of digitised records. The people most able to fill a tree in are also the least likely to be at a laptop.',
    decisions: [
      {
        title: 'One backend, two clients',
        detail:
          'The web app and the React Native app consume the same Node.js API rather than each owning its own logic. A relative who adds a cousin on a phone and one browsing on a laptop are reading the same tree with no sync layer to go wrong — and relationship rules are enforced once, on the server, instead of twice.',
      },
      {
        title: 'A relational store for graph-shaped data',
        detail:
          'A family tree is a graph, which argues for a graph database. PostgreSQL with Prisma was chosen anyway: the traversals the product actually performs are shallow, and the relational model made the constraints that keep a tree valid — no one their own ancestor, no duplicate parentage — enforceable in the schema rather than in application code.',
      },
      {
        title: 'Expo for one mobile codebase',
        detail:
          'Expo carries the iOS and Android builds from one codebase, which is what makes a mobile app viable for a product at this stage at all. Over-the-air updates mean a correction reaches users without waiting on a store review.',
      },
    ],
  },
  aerocruise: {
    problem:
      'An agency running ticketing, hotels, MICE, visa processing, airport protocol and transfers across three cities has a breadth problem rather than a depth one. Presented as one list every line is diluted, a company looking only for visa processing should not have to read past six other services to find it, and the enquiry route has to stay within reach of wherever they landed.',
    decisions: [
      {
        title: 'Each service line findable on its own',
        detail:
          'The range is structured so a single service can be arrived at directly, rather than requiring the visitor to understand the whole offering first. Breadth is an asset only when each part can be found alone.',
      },
      {
        title: 'The enquiry route repeated, not centralised',
        detail:
          'Rather than funnel everyone to one contact page, the enquiry route sits with each service. A visitor who is ready to act should never have to navigate back out in order to do it.',
      },
      {
        title: 'WordPress so offerings change without a developer',
        detail:
          'Travel services shift with seasons, routes and regulations. The content had to belong to the agency, and that is what decided the platform.',
      },
    ],
  },
  rostrumsec: {
    problem:
      'In regulated finance the first question a visitor has is whether the firm is real and properly registered. Somebody checking a broker or dealer is performing due diligence rather than shopping, and a site that leads with marketing language ahead of regulatory standing fails the only test actually being applied to it.',
    decisions: [
      {
        title: 'Regulatory standing before the marketing',
        detail:
          'SEC registration and the Nigerian Exchange trading licence are presented up front rather than filed under an About page. For this audience that is not a credential to mention in passing, it is the reason they opened the site.',
      },
      {
        title: 'Advisory lines stated plainly',
        detail:
          'Service descriptions avoid the inflated language common to the sector. In a field where confidence is the product, overstatement reads as a warning sign rather than as strength.',
      },
      {
        title: 'Content the firm can correct itself',
        detail:
          'Registrations, disclosures and service descriptions change and occasionally have to be corrected quickly. Building on WordPress meant a compliance correction never waits on developer availability.',
      },
    ],
  },
  rayaelite: {
    problem:
      'Residential and commercial cleaning in the Maryland and DC area is a crowded market where the buyer is choosing a stranger to let into their home or office. Bonded and insured status is the thing that settles that decision, and it is usually buried on an about page. The site had to lead with the credentials, keep residential, commercial and government work legible as separate offers, and let someone request a quote without a phone call.',
    decisions: [
      {
        title: 'Credentials above the fold, not on an about page',
        detail:
          'Bonded and insured is the single fact that moves a visitor from browsing to enquiring for this category of business, so it sits in the first screenful rather than being left for the visitor to go looking for.',
      },
      {
        title: 'Service tiers broken out rather than listed',
        detail:
          'Residential, commercial and government clients are buying different things under one word. Each is given its own section so a facilities manager and a homeowner can each find their own offer instead of reading past the other one.',
      },
      {
        title: 'WordPress so the owner controls the content',
        detail:
          'A service business changes its pricing, areas and availability far more often than its design. WordPress was chosen over a hand-built site specifically so those edits never need a developer.',
      },
      {
        title: 'Local SEO structured around the service area',
        detail:
          'Discovery for this business is geographic. The site is structured around the Maryland and DC service area so the pages match how the work is actually searched for.',
      },
    ],
  },
  gmbjet: {
    problem:
      'An agency selling a local-search outcome competes against both free DIY advice and cheaper freelancers. The visitor usually already knows their Google Business Profile is underperforming, and what they are weighing is whether this agency will actually fix it. A brochure site answers a question nobody asked.',
    decisions: [
      {
        title: 'Built as a conversion path, not a brochure',
        detail:
          'The page order follows the decision the visitor is making rather than the structure of the company. Nothing is included merely because a corporate site conventionally has it.',
      },
      {
        title: 'Lead capture at the point of decision',
        detail:
          'Enquiry forms sit where the visitor becomes convinced rather than only at the end. Making somebody navigate once they have already decided loses a proportion of them for no reason.',
      },
      {
        title: 'Service pages that lead with the outcome',
        detail:
          'Each page opens with what the client ends up with rather than the method used to get there. The method matters to the agency, the outcome is what is being bought.',
      },
    ],
  },
  reinstateboost: {
    problem:
      'A business whose Google Business Profile has been suspended has lost its local visibility without warning and usually without a clear reason. They arrive anxious and sceptical, because the market around this problem is full of people promising reinstatement. Selling before explaining reads as one more opportunist.',
    decisions: [
      {
        title: 'Process before pitch',
        detail:
          'The reinstatement walkthrough comes ahead of the sales copy. Showing the visitor that the problem is understood is what earns the enquiry here, and explaining work that is genuinely hard to do costs nothing.',
      },
      {
        title: 'One problem, one site',
        detail:
          'The offer was deliberately kept narrow rather than broadened into general profile management. A single-problem service is more credible to somebody who has exactly that problem.',
      },
      {
        title: 'Elementor so the process copy stays current',
        detail:
          'Google changes its policies and appeal routes regularly. The walkthrough is the most valuable thing on the site and the quickest to go stale, so it had to be editable without a developer.',
      },
    ],
  },
  kanary: {
    problem:
      'Five unrelated service lines under one company is a structural problem before it is a design one. Consulting, agricultural solutions, human capital development, corporate training and CNG vehicle conversion share no audience and no vocabulary. Presented as one list the company reads as unfocused, split into five sites it loses the single corporate identity holding them together.',
    decisions: [
      {
        title: 'Each line given its own section',
        detail:
          'The five are separated so a visitor can go straight to the one that concerns them without reading past four they do not care about. The alternative is a homepage that describes nobody.',
      },
      {
        title: 'Enquiry routes per service line',
        detail:
          'Each line has its own enquiry path rather than one shared form, because an enquiry about CNG conversion and one about corporate training need different information and reach different people.',
      },
      {
        title: 'One corporate frame around five offers',
        detail:
          'A shared identity and navigation hold the lines together so the breadth reads as capability rather than as drift. Striking that balance was the actual brief.',
      },
    ],
  },
  stjohns: {
    problem:
      'Somebody choosing where to seek care is answering practical questions under stress: does this hospital treat what I have, what facilities does it hold, and how do I reach it. A hospital site that prioritises imagery over those answers fails the visitor at precisely the moment they most need it.',
    decisions: [
      {
        title: 'Departments and services as the primary structure',
        detail:
          'The site is organised around what the hospital treats rather than around its institutional history. The visitor arrived with a condition in mind, and that is the axis they navigate on.',
      },
      {
        title: 'Contact and location reachable from any page',
        detail:
          'Address and contact details are available wherever the visitor happens to be, rather than only on a contact page. Somebody deciding to travel to a hospital should never have to go looking for how.',
      },
      {
        title: 'WordPress so hospital staff maintain it',
        detail:
          'Departments, services and facility information change with staffing and equipment. Keeping those edits in the hands of the hospital is what stops the site drifting out of date.',
      },
    ],
  },
};
