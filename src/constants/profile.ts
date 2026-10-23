// Founder profile data for the LeksIDE site.
import { projects, CAREER_START, WEB_APPS, WORDPRESS } from './index';

/**
 * Counts a category the same way the work filter does, so the headline figures
 * can never drift out of step with the projects actually on display.
 */
const countIn = (category: string) =>
  projects.filter(
    (p) => p.category === category || p.extraCategories?.includes(category)
  ).length;

const yearsOfExperience = new Date().getFullYear() - CAREER_START;

export const founder = {
  name: 'Olamilekan Olakunle',
  role: 'Founder & Lead Engineer',
  location: 'Nigeria — working with clients internationally',
  email: 'horllyk12@gmail.com',
  whatsapp: '0706 873 6818',
  whatsappUrl: 'https://wa.me/2347068736818',
  github: 'iamlekside2',
  bio: [
    `LeksIDE is led by Olamilekan Olakunle. Over the last ${yearsOfExperience} years he has built web applications, internal dashboards and business websites for organisations in healthcare, financial services, corporate travel, education and the non-profit sector — in Nigeria and, increasingly, for clients in the US.`,
    'The studio works across the whole delivery path rather than a single layer: the data model and API, the interface on top, the WordPress build where a client needs to own their own content, and the mobile app where the audience is on a phone. One person accountable end to end — usually the reason a smaller team picks a studio over an agency.',
  ],
};

export const personalInfo: { label: string; value: string; accent?: boolean }[] = [
  { label: 'Founder', value: 'Olamilekan Olakunle' },
  { label: 'Studio', value: 'LeksIDE — Technology Studio' },
  { label: 'Based in', value: 'Nigeria' },
  { label: 'Working with', value: 'US & international clients', accent: true },
  { label: 'Availability', value: 'Taking new projects', accent: true },
  { label: 'Languages', value: 'English' },
  { label: 'Email', value: 'horllyk12@gmail.com' },
  { label: 'GitHub', value: 'iamlekside2' },
];

export const stats: { value: number; suffix: string; label: string }[] = [
  { value: yearsOfExperience, suffix: '+', label: 'Years Building Software' },
  { value: countIn(WEB_APPS), suffix: '', label: 'Web Apps & Dashboards' },
  { value: countIn(WORDPRESS), suffix: '', label: 'Websites Delivered' },
  { value: projects.length, suffix: '', label: 'Projects Shipped' },
];

/**
 * Replaces the old percentage bars. A self-assigned "TypeScript 85%" tells a
 * client nothing and invites scepticism; grouping by what the studio actually
 * builds with is both more honest and more useful to someone scoping a job.
 */
export type TCapability = {
  group: string;
  summary: string;
  items: string[];
};

export const capabilities: TCapability[] = [
  {
    group: 'Front end',
    summary: 'The interface layer, from marketing pages to dense internal tools.',
    items: [
      'React',
      'TypeScript',
      'Next.js',
      'Redux Toolkit',
      'Tailwind CSS',
      'HTML & CSS',
      'Framer Motion',
    ],
  },
  {
    group: 'Back end & data',
    summary: 'APIs, data models and the services behind the screens.',
    items: ['Node.js', 'REST APIs', 'PostgreSQL', 'Prisma', 'MySQL', 'Firebase'],
  },
  {
    group: 'WordPress',
    summary: 'Where the client needs to own and edit their own content.',
    items: ['WordPress', 'Elementor', 'Custom themes', 'Plugin work', 'On-page SEO'],
  },
  {
    group: 'Mobile',
    summary: 'Shipped to iOS and Android from a shared codebase.',
    items: ['React Native', 'Expo', 'Shared web/mobile APIs'],
  },
  {
    group: 'Delivery',
    summary: 'How the work gets built, reviewed and shipped.',
    items: ['Git', 'Vercel', 'CI builds', 'Code review', 'Accessibility', 'Performance'],
  },
];
