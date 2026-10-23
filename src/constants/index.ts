import type { TExperience } from '../types';

/** A role with no `end` is ongoing and sorts to the top of the timeline. */
const ONGOING = 9999;

const experienceEntries: TExperience[] = [
  {
    title: 'Frontend Developer & Freelance Projects',
    companyName: 'Personal Websites & Portfolios',
    date: '2021 - Present',
    start: 2021,
    points: [
      'Built personal and client websites using React, Next.js, and WordPress.',
      'Integrated APIs, payment systems, and dynamic dashboards.',
      'Delivered projects including hospital websites, business websites, and personal portfolios.',
      'Handled both design and frontend development ensuring responsive, optimized, and visually appealing sites.',
    ],
  },
  {
    title: 'Frontend & React Developer',
    companyName: 'COMCIN Project',
    date: '2025',
    start: 2025,
    end: 2025,
    points: [
      'Developed and maintained user-facing React applications for COMCIN.',
      'Implemented dynamic dashboards and multi-step forms for client interactions.',
      'Integrated APIs and handled responsive design for multiple devices.',
      'Optimized performance and code quality through reviews and testing.',
    ],
  },
  {
    title: 'Patient Tracker Developer',
    companyName: 'Nexalife Care',
    date: '2024-2025',
    start: 2024,
    end: 2025,
    points: [
      'Developed patient referral and tracking systems for Nexalife Care.',
      'Implemented real-time dashboards to track patient referrals and status updates.',
      'Integrated API endpoints and multi-step forms for data collection.',
    ],
  },
  {
    title: 'Frontend & React Developer',
    companyName: 'Calmglobal - Patient Dashboard',
    date: '2023-2025',
    start: 2023,
    end: 2025,
    points: [
      'Built patient dashboards to manage appointments, history, and communications.',
      'Integrated notification systems and dynamic user interfaces using React.',
      'Implemented role-based access and permissions for different user levels.',
    ],
  },
  {
    title: 'Admin Dashboard Developer',
    companyName: 'UrCalls Admin',
    date: '2024',
    start: 2024,
    end: 2024,
    points: [
      'Built an admin dashboard to manage users, subscribers, and payments.',
      'Implemented role-based permissions and dynamic UI updates for different users.',
      'Developed reusable components for faster project delivery.',
    ],
  },
  {
    title: 'Church Dashboard Developer',
    companyName: 'Church Management Dashboard',
    date: '2024',
    start: 2024,
    end: 2024,
    points: [
      'Built dashboard for church management using React.',
      'Implemented event scheduling, member tracking, and notifications.',
      'Designed interactive forms and data storage for easy administration.',
    ],
  },
  {
    title: 'Frontend & React Developer',
    companyName: 'AfricanProverbs',
    date: '2022 - 2023',
    start: 2022,
    end: 2023,
    points: [
      'Developed and maintained AfricanProverbs website using modern web technologies.',
      'Implemented search, filtering, and user-friendly UI/UX features.',
      'Managed content updates and integrated APIs for proverb data.',
    ],
  },
  {
    title: 'WordPress Designer & Developer',
    companyName: 'Wildfire',
    date: '2021',
    start: 2021,
    end: 2021,
    points: [
      'Designed and developed WordPress websites including hospital sites and business portfolios.',
      'Built custom themes and plugins tailored to client needs.',
      'Implemented responsive designs and optimized performance and SEO.',
    ],
  },
];

/**
 * Newest first: ongoing roles, then by the year the role ended, then by the
 * year it started. Sorting here means new entries can be added in any order.
 */
const experiences: TExperience[] = [...experienceEntries].sort(
  (a, b) =>
    (b.end ?? ONGOING) - (a.end ?? ONGOING) || b.start - a.start
);

/** The earliest year on the timeline — used to derive years of experience. */
export const CAREER_START = Math.min(...experienceEntries.map((e) => e.start));


export { experiences };

export {
  projects,
  projectBySlug,
  caseStudies,
  featuredProjects,
  WEB_APPS,
  WORDPRESS,
  MOBILE,
} from './projects';

export { services } from './services';
export type { TService } from './services';

export { enquiryChecklist, engagementProcess, faqs } from './contact';
export type { TStep, TFaq } from './contact';
