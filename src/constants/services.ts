/**
 * What LeksIDE offers. Each entry leads with the business outcome rather than
 * the technology, because that is what an enquiring client is buying.
 */
import { caseStudies } from './projects';

export type TService = {
  id: string;
  title: string;
  outcome: string;
  description: string;
  deliverables: string[];
  /**
   * Slugs of case studies that demonstrate this service. A service description
   * is a claim; these are the route from the claim to the work behind it.
   * Every slug must exist in `caseStudies` — `servicesWithProof` drops any
   * that does not rather than rendering a link to a redirect.
   */
  proof?: string[];
};

export const services: TService[] = [
  {
    id: 'websites',
    title: 'Business Websites & WordPress',
    outcome: 'A credible storefront that wins trust and enquiries.',
    description:
      'Marketing sites for companies that need to look established and be found. Built on WordPress when the client needs to edit content themselves, hand-coded when speed and control matter more.',
    deliverables: [
      'Design and build, desktop through mobile',
      'Content structure and on-page SEO',
      'Enquiry and lead-capture flows',
      'Editor training and handover',
    ],
    proof: ['rayaelite', 'aerocruise', 'stjohns', 'kanary'],
  },
  {
    id: 'web-apps',
    title: 'Web Applications & Dashboards',
    outcome: 'Replace spreadsheets and manual process with software that scales.',
    description:
      'Internal tools, admin portals and reporting dashboards: the systems a growing business runs on. Role-based access, multi-step data capture, and reporting built around how the team actually works.',
    deliverables: [
      'Admin portals and role-based permissions',
      'Reporting and KPI dashboards',
      'Multi-step forms and data capture',
      'Integration with existing APIs and databases',
    ],
    proof: ['hrrp', 'kpi', 'urcalls', 'nexalife'],
  },
  {
    id: 'mobile',
    title: 'Mobile Applications',
    outcome: 'Reach users on the device they actually carry.',
    description:
      'React Native and Expo apps that share a codebase and a backend with the web product, so one team can ship to iOS, Android and the browser without maintaining three stacks.',
    deliverables: [
      'React Native / Expo apps for iOS and Android',
      'Shared API and data model with the web app',
      'Store submission and release builds',
    ],
    proof: ['realcousins'],
  },
  {
    id: 'custom-software',
    title: 'Custom Software, APIs & Automation',
    outcome: 'Remove the manual steps that cost your team hours every week.',
    description:
      'Bespoke systems, integrations between tools that do not talk to each other, and automation of the repetitive work in between. Scoped to the specific bottleneck rather than sold as a platform.',
    deliverables: [
      'API design and third-party integration',
      'Workflow and back-office automation',
      'Data migration and clean-up',
      'Bespoke internal systems',
    ],
    proof: ['nexalife', 'comcin', 'church-dashboard'],
  },
  {
    id: 'partnership',
    title: 'Ongoing Technical Partnership',
    outcome: 'A technical team on call, without a technical hire.',
    description:
      'Continuing support for clients who have shipped: maintenance, incremental features, performance work, and being the person who answers when something breaks.',
    deliverables: [
      'Maintenance and dependency upgrades',
      'Incremental feature delivery',
      'Performance and accessibility work',
      'Direct access to the founder',
    ],
  },
];

/**
 * Services paired with the case studies that demonstrate them.
 *
 * Resolution happens here rather than in the page so a stale slug can never
 * render a dead link: `caseStudies` is the single source of which projects
 * have a page, and anything not in it is silently dropped.
 */
export const servicesWithProof = (): {
  service: TService;
  proof: { slug: string; name: string }[];
}[] =>
  services.map((service) => ({
    service,
    proof: (service.proof ?? [])
      .map((slug) => caseStudies.find((p) => p.slug === slug))
      .filter((p): p is (typeof caseStudies)[number] => Boolean(p))
      .map((p) => ({ slug: p.slug, name: p.name })),
  }));
