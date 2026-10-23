import type { TProject } from '../types';

export const WEB_APPS = 'Web Apps & Dashboards';
export const WORDPRESS = 'Websites & WordPress';
export const MOBILE = 'Mobile';

const tag = (...names: string[]) =>
  names.map((name, i) => ({
    name,
    color: ['blue-text-gradient', 'green-text-gradient', 'pink-text-gradient'][i % 3],
  }));

/**
 * Every entry is grounded in work actually delivered and in what each live
 * site itself states about its business. `sector` and `audience` are left off
 * rather than guessed where the client's purpose isn't publicly stated.
 *
 * Deliberately absent: metrics, results, rankings and testimonials. None of
 * those have been independently verified, so none are claimed.
 */
const webApps: TProject[] = [
  {
    name: 'COMCIN Project',
    slug: 'comcin',
    category: WEB_APPS,
    audience: 'Staff and members working through multi-stage submissions',
    description:
      'React front end built around dashboards and multi-step forms that carry a submission through its stages, rather than collecting everything on a single page.',
    contribution: [
      'Built and maintained the user-facing React application',
      'Implemented dashboards and multi-step form flows',
      'Integrated platform APIs and handled responsive layouts',
      'Worked on performance and code quality through review and testing',
    ],
    stack: ['React', 'Redux Toolkit', 'Tailwind CSS', 'REST APIs'],
    tags: tag('react', 'redux', 'tailwind'),
    image: '',
    sourceCodeLink: 'https://comcin.com.ng/',
  },
  {
    name: 'UrCalls Admin Dashboard',
    slug: 'urcalls',
    category: WEB_APPS,
    sector: 'Communications product',
    audience: 'Internal administrators managing accounts and billing',
    description:
      'Back-office dashboard behind a consumer calling product. Holds the accounts, subscriptions and payment records the public app depends on, with the interface changing by staff role.',
    contribution: [
      'Built the admin dashboard for users, subscribers and payments',
      'Implemented role-based permissions and role-dependent UI',
      'Developed a reusable component set to speed up later delivery',
    ],
    stack: ['React', 'Redux Toolkit', 'Payment APIs'],
    tags: tag('react', 'redux'),
    image: '',
    sourceCodeLink: 'https://urcalls.com/',
  },
  {
    name: 'NexaLife Care — Patient Tracker',
    slug: 'nexalife',
    category: WEB_APPS,
    sector: 'Health and wellness provider',
    audience: 'Care coordinators following referrals through to outcome',
    description:
      'Referral and patient-tracking system. Referrals are captured through staged forms and then followed on a dashboard that reflects status changes as they happen, instead of living in a spreadsheet.',
    contribution: [
      'Developed the patient referral and tracking system',
      'Built dashboards reflecting referral status updates in real time',
      'Integrated API endpoints and multi-step data-collection forms',
    ],
    stack: ['React', 'Tailwind CSS', 'REST APIs'],
    tags: tag('react', 'tailwind', 'api'),
    image: '',
    sourceCodeLink: 'https://nexalifecare.com/',
  },
  {
    name: 'HRRP — HR Platform',
    slug: 'hrrp',
    category: WEB_APPS,
    sector: 'Technology and health-tech services company',
    audience: 'HR staff and managers across the organisation',
    description:
      'HR platform covering staff records, the workflows that move a request between people, and reporting across both. Access is scoped by role, so staff, managers and HR each see a different surface.',
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
    contribution: [
      'Built the HR platform front end in React and TypeScript',
      'Implemented staff records, workflow stages and reporting views',
      'Implemented role-based access control across the surfaces',
    ],
    stack: ['React', 'TypeScript', 'REST APIs'],
    tags: tag('react', 'typescript', 'api'),
    image: '',
    sourceCodeLink: 'https://hrrp.calmglobal.com/',
  },
  {
    name: 'KPI Platform',
    slug: 'kpi',
    category: WEB_APPS,
    sector: 'Technology and health-tech services company',
    audience: 'Team leads and management reviewing performance',
    description:
      'Performance tracking across teams: targets are set, progress reports back through dashboards, and review conversations start from the same numbers rather than from competing spreadsheets.',
    contribution: [
      'Built the KPI tracking and reporting interface',
      'Implemented target setting and team-level performance analytics',
      'Developed the dashboard and reporting views',
    ],
    stack: ['React', 'TypeScript', 'Dashboards'],
    tags: tag('react', 'typescript', 'dashboards'),
    image: '',
    sourceCodeLink: 'https://kpi.calmglobal.com/login',
  },
  {
    name: 'Church Management Dashboard',
    slug: 'church-dashboard',
    category: WEB_APPS,
    sector: 'Religious organisation',
    audience: 'Church administrators managing members and events',
    description:
      'Administration dashboard covering member records, event scheduling and notifications — the recurring admin work of running a congregation, gathered into one place.',
    contribution: [
      'Built the management dashboard in React',
      'Implemented event scheduling, member tracking and notifications',
      'Designed the data-entry forms and storage model',
    ],
    stack: ['React', 'TypeScript', 'Firebase'],
    tags: tag('react', 'typescript', 'firebase'),
    image: '',
    sourceCodeLink: '',
  },
  {
    name: 'African Proverbs',
    slug: 'africanproverbs',
    category: WEB_APPS,
    sector: 'Culture and education',
    audience: 'Readers browsing and searching a proverb collection',
    description:
      'A searchable collection of African proverbs. The real work was retrieval — search and filtering that make a large body of very short texts navigable — plus the content pipeline behind it.',
    contribution: [
      'Developed and maintained the site',
      'Implemented search, filtering and the browsing interface',
      'Managed content updates and integrated the proverb data APIs',
    ],
    stack: ['React', 'Next.js', 'Tailwind CSS'],
    tags: tag('react', 'nextjs', 'tailwind'),
    image: '',
    sourceCodeLink: 'https://africanproverbs.com/',
  },
];

const mobileApps: TProject[] = [
  {
    name: 'RealCousins',
    slug: 'realcousins',
    category: MOBILE,
    extraCategories: [WEB_APPS],
    sector: 'Consumer product — family history',
    audience: 'Families across Nigeria, Africa and the diaspora',
    description:
      'A family-tree platform built on the premise that your family tree is your network. A single backend serves both a web app and a React Native app, so relatives on either side of a migration build and browse the same tree.',
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
    contribution: [
      'Built the web application and the React Native / Expo mobile app',
      'Developed the shared Node.js backend with Prisma and PostgreSQL',
      'Designed the data model and API consumed by both clients',
      'Shipped and maintained the app through successive store releases',
    ],
    stack: ['React Native', 'Expo', 'Node.js', 'Prisma', 'PostgreSQL'],
    tags: tag('react-native', 'expo', 'api'),
    image: '',
    sourceCodeLink: 'https://realcousins.com/',
  },
];

/**
 * Website builds. Each is described by what the organisation actually does and
 * who it serves — taken from the live site — so the list reads as distinct
 * businesses rather than twenty interchangeable "corporate websites".
 */
type SiteSeed = {
  name: string;
  slug: string;
  url: string;
  sector?: string;
  audience?: string;
  description: string;
  contribution?: string[];
  problem?: string;
  decisions?: { title: string; detail: string }[];
};

const siteSeeds: SiteSeed[] = [
  {
    name: 'Aerocruise Travels Management',
    slug: 'aerocruise',
    url: 'https://aerocruisetravelsng.com/',
    sector: 'Corporate travel management',
    audience: 'Nigerian companies booking business travel',
    description:
      'Corporate travel agency running flight ticketing, hotels, MICE, visa applications, FAAN-registered airport protocol and transfers from offices in Ibadan, Lagos and Abuja. The site has to carry a wide service range without burying the enquiry route.',
    contribution: [
      'Designed and built the site on WordPress',
      'Structured the service range so each line is findable on its own',
      'Set up the enquiry route and ongoing content maintenance',
    ],
  },
  {
    name: 'Rostrum Investments & Securities',
    slug: 'rostrumsec',
    url: 'https://rostrumsec.com/',
    sector: 'Stockbroking and investment advisory',
    audience: 'Investors and institutions checking a regulated broker',
    description:
      'A Nigerian broker/dealer registered with the Securities and Exchange Commission and a trading licence holder of the Nigerian Exchange. In regulated finance the site is a credibility document first: registration status and advisory services have to be legible immediately.',
    contribution: [
      'Designed and built the corporate site on WordPress',
      'Presented regulatory standing and the advisory service lines clearly',
      'Built the contact and enquiry flows',
    ],
  },
  {
    name: 'Tomil Trust Limited',
    slug: 'tomiltrust',
    url: 'https://tomiltrustlimited.com/',
    sector: 'Stockbroking and investment management',
    audience: 'Clients evaluating an investment manager',
    description:
      'Stockbrokers and investment managers. Same sector as Rostrum but a different emphasis — the firm leads on investment management rather than brokerage, and the site is organised around that.',
    contribution: [
      'Designed and built the corporate site on WordPress',
      'Organised the company profile and service listings',
    ],
  },
  {
    name: 'Tyndale Securities',
    slug: 'tyndale',
    url: 'https://tyndale-securities.com/',
    sector: 'Securities firm',
    audience: 'Prospective clients and counterparties',
    description:
      'Corporate presence for a Nigerian securities firm — company profile, services and contact routes, kept deliberately spare.',
    contribution: [
      'Designed and built the site on WordPress',
      'Set up the company profile and contact flows',
    ],
  },
  {
    name: 'Raya Elite Cleaning',
    slug: 'rayaelite',
    url: 'https://rayaelitehomesandofficescleaningservices.com/',
    sector: 'Home and office cleaning — Maryland & Washington DC',
    audience: 'US homeowners, businesses and government clients',
    description:
      'A bonded and insured cleaning company operating in Maryland and Washington DC, serving residential, commercial and government clients. A US service business where the site has to convert: credentials up front, then a direct route to booking.',
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
    contribution: [
      'Designed and built the site on WordPress',
      'Broke out the service tiers and surfaced the bonded/insured credentials',
      'Set up online booking and quote requests',
      'Implemented local SEO for the Maryland and DC service area',
    ],
  },
  {
    name: 'GMBJet',
    slug: 'gmbjet',
    url: 'https://gmbjet.com/',
    sector: 'Google Business Profile agency',
    audience: 'Local businesses competing in map and local search',
    description:
      'An agency that restores, optimises and boosts Google Business Profiles. The site sells an outcome in local search, so it is written as a conversion page rather than a brochure.',
    contribution: [
      'Designed and built the site on WordPress',
      'Structured the service pages around the conversion path',
      'Built the lead-capture and enquiry flows',
    ],
  },
  {
    name: 'ReinstateBoost',
    slug: 'reinstateboost',
    url: 'https://reinstateboost.com/',
    sector: 'Google Business Profile reinstatement',
    audience: 'Businesses whose Google profile has been suspended',
    description:
      'A single-problem service: getting a suspended Google Business Profile reinstated. The audience arrives in difficulty and needs the process explained before they will enquire, so the site leads with the walkthrough.',
    contribution: [
      'Built the site on WordPress with Elementor',
      'Laid out the reinstatement process ahead of the sales pitch',
      'Implemented the lead-capture forms',
    ],
  },
  {
    name: 'Kanary Ancillaries',
    slug: 'kanary',
    url: 'https://kanaryancillaries.com/',
    sector: 'Business consulting, agriculture and CNG conversion',
    audience: 'Nigerian businesses and training clients',
    description:
      'An Abuja company spanning genuinely unrelated lines — business consulting, agricultural solutions, human capital development, corporate training and CNG vehicle conversion. The structural problem was letting five unrelated offerings coexist without the site reading as unfocused.',
    contribution: [
      'Designed and built the site on WordPress',
      'Separated the five service lines into their own navigable sections',
      'Built the enquiry routes per service line',
    ],
  },
  {
    name: "St John's Catholic Hospital, Kabba",
    slug: 'stjohns',
    url: 'https://stjohnscatholichospitalkabba.com.ng/',
    sector: 'Hospital',
    audience: 'Patients and families seeking care in Kogi State',
    description:
      'A mission hospital presenting its departments, services and facilities. Visitors are often deciding where to seek care, so clarity about what the hospital treats and how to reach it outranks visual flourish.',
    contribution: [
      'Designed and built the hospital site on WordPress',
      'Structured departments, services and facility information',
      'Made contact and location details reachable from any page',
    ],
  },
  {
    name: 'Beyond Healthcare Fertility',
    slug: 'beyondhealth',
    url: 'https://beyondhealthcarefertility.com/',
    sector: 'Fertility clinic',
    audience: 'Couples and individuals considering fertility treatment',
    description:
      'A fertility clinic, where the audience is researching a sensitive and expensive decision. The site needs to explain treatment paths calmly and make the first appointment enquiry feel low-pressure.',
    contribution: [
      'Designed and built the clinic site on WordPress',
      'Presented treatment services and the appointment enquiry route',
    ],
  },
  {
    name: 'Dumaac Projects',
    slug: 'dumaac',
    url: 'https://dumaacprojects.com/',
    sector: 'B2B products and services, OEM partnerships',
    audience: 'Corporate buyers and procurement teams',
    description:
      'A projects company partnering with original equipment manufacturers to deliver products and services to business customers. The site works as procurement-facing proof of competence and partnerships.',
    contribution: [
      'Designed and built the corporate site on WordPress',
      'Presented the OEM partnerships and service capability',
    ],
  },
  {
    name: 'CalmGlobal Technologies',
    slug: 'calmglobal',
    url: 'https://calmglobal.com/',
    sector: 'Software and health-tech services',
    audience: 'Prospective clients and partners',
    description:
      'Company site for the software and health-tech services business behind the HRRP and KPI platforms — the same client, presented publicly rather than internally.',
    contribution: ['Built and maintained the company website'],
  },
  {
    name: 'Press Featured',
    slug: 'pressfeatured',
    url: 'https://www.pressfeatured.com/',
    sector: 'Media and PR placement',
    audience: 'Founders and brands seeking press coverage',
    description:
      'A PR service selling media placement. Credibility rests on the outlets it can reach, so the site is built around that proof rather than around agency copy.',
    contribution: ['Designed and built the site on WordPress'],
  },
  {
    name: 'Xmage Photography',
    slug: 'xmage',
    url: 'https://xmagephotography.com/',
    sector: 'Photography studio',
    audience: 'Clients booking shoots',
    description:
      'Portfolio site for photographer Sanjo Adeoti. Image-led by necessity: galleries carry the sale, so the build had to keep large photography fast and let the work fill the frame.',
    contribution: [
      'Designed and built the portfolio site on WordPress',
      'Built the gallery presentation and booking enquiry route',
    ],
  },
  {
    name: 'Oladele Oyelola Foundation',
    slug: 'oladele',
    url: 'https://oladeleoyelolafoundation.org/',
    sector: 'Foundation / NGO',
    audience: 'Supporters, beneficiaries and partners',
    description:
      'Foundation site presenting programmes and the routes for people who want to get involved or get in touch.',
    contribution: ['Designed and built the foundation site on WordPress'],
  },
  {
    name: 'RCCG Jubilee House',
    slug: 'rccgjubilee',
    url: 'https://rccgjubileehouse.com/',
    sector: 'Church',
    audience: 'Members and first-time visitors',
    description:
      'Parish website covering who the church is, when it meets and what its ministries do — written for a first-time visitor deciding whether to attend.',
    contribution: ['Designed and built the church site on WordPress'],
  },
  {
    name: 'Great Ife Alumni Canada',
    slug: 'greatife',
    url: 'https://greatifealumni.ca/',
    sector: 'Alumni association — Canada',
    audience: 'Obafemi Awolowo University alumni in Canada',
    description:
      'Canadian chapter of the Obafemi Awolowo University alumni association. A diaspora membership body, so the site is organised around joining and staying connected rather than around marketing.',
    contribution: [
      'Designed and built the association site on WordPress',
      'Implemented the membership and contact flows',
    ],
  },
  {
    name: 'Okun Development Association',
    slug: 'okundev',
    url: 'https://okundev.org/',
    sector: 'Community development association',
    audience: 'Members of the Okun community at home and abroad',
    description:
      'Development association site covering the community, its activities and membership — serving members spread well beyond the home region.',
    contribution: [
      'Designed and built the association site on WordPress',
      'Implemented the membership and contact features',
    ],
  },
  {
    name: 'Ayetoro Gbede Global Network',
    slug: 'ayetoro',
    url: 'https://ayetorogbedeglobalnetwork.org/',
    sector: 'Diaspora community network',
    audience: 'Ayetoro Gbede indigenes worldwide',
    description:
      'A global network connecting people from one Kogi State town across the world. Built to keep a geographically scattered community in one place online.',
    contribution: ['Designed and built the network site on WordPress'],
  },
  {
    name: 'Eniwo Egbeme',
    slug: 'eniwoegbeme',
    url: 'https://eniwoegbeme.com/',
    sector: 'Personal brand',
    audience: 'Professional audience and prospective collaborators',
    description:
      'Personal brand site — a single individual presenting their work and their public profile.',
    contribution: ['Designed and built the personal site on WordPress'],
  },
];

const websites: TProject[] = siteSeeds.map((s) => ({
  name: s.name,
  slug: s.slug,
  category: WORDPRESS,
  sector: s.sector,
  audience: s.audience,
  description: s.description,
  contribution: s.contribution,
  problem: s.problem,
  decisions: s.decisions,
  stack: ['WordPress', 'Elementor', 'PHP'],
  tags: tag('wordpress', 'elementor'),
  image: '',
  sourceCodeLink: s.url,
}));

export const projects: TProject[] = [...webApps, ...mobileApps, ...websites];

export const projectBySlug = (slug: string): TProject | undefined =>
  projects.find((p) => p.slug === slug);

/** Projects with enough verified detail to carry a case-study page. */
export const caseStudies: TProject[] = projects.filter(
  (p) => (p.contribution?.length ?? 0) >= 3
);

/** Shown on the homepage: breadth across the three categories. */
export const featuredSlugs = [
  'realcousins',
  'hrrp',
  'nexalife',
  'rayaelite',
  'urcalls',
  'aerocruise',
];

export const featuredProjects: TProject[] = featuredSlugs
  .map((s) => projectBySlug(s))
  .filter((p): p is TProject => Boolean(p));
