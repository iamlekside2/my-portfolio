import type {
  TNavLink,
  TService,
  TTechnology,
  TExperience,
  TTestimonial,
  TProject,
} from '../types';

import {
  mobile,
  backend,
  creator,
  web,
  javascript,
  typescript,
  html,
  css,
  reactjs,
  redux,
  tailwind,
  git,
  // nexalife,
  // comcin,
  // urcalls,
  // africanproverbs,
  // websites,
  threejs,
} from '../assets';
import africanproverbs from '../assets/africanproverbs.png';
import nexalife from '../assets/nexalife.png';
import comcin from '../assets/comcin.png';
import urcalls from '../assets/urcalls.png';
import websites from '../assets/websites.png';

export const navLinks: TNavLink[] = [
  {
    id: 'about',
    title: 'About',
  },
  {
    id: 'work',
    title: 'Work',
  },
  {
    id: 'contact',
    title: 'Contact',
  },
];

const services: TService[] = [
  {
    title: 'Frontend Developer',
    icon: web,
  },
  {
    title: 'Mobile App Developer',
    icon: mobile,
  },
  {
    title: 'WordPress Developer',
    icon: backend,
  },
  {
    title: 'API & State Management',
    icon: creator,
  },
];

const technologies: TTechnology[] = [
  {
    name: 'HTML 5',
    icon: html,
  },
  {
    name: 'CSS 3',
    icon: css,
  },
  {
    name: 'JavaScript',
    icon: javascript,
  },
  {
    name: 'TypeScript',
    icon: typescript,
  },
  {
    name: 'React JS',
    icon: reactjs,
  },
  {
    name: 'Next JS',
    icon: reactjs,
  },
  {
    name: 'Redux Toolkit',
    icon: redux,
  },
  {
    name: 'Tailwind CSS',
    icon: tailwind,
  },
  {
    name: 'Three JS',
    icon: threejs,
  },
  {
    name: 'git',
    icon: git,
  },
];

const experiences: TExperience[] = [
  {
    title: 'Frontend & React Developer',
    companyName: 'COMCIN Project',
    icon: web,
    iconBg: '#383E56',
    date: '2025',
    points: [
      'Developed and maintained user-facing React applications for COMCIN.',
      'Implemented dynamic dashboards and multi-step forms for client interactions.',
      'Integrated APIs and handled responsive design for multiple devices.',
      'Optimized performance and code quality through reviews and testing.',
    ],
  },
  {
    title: 'Admin Dashboard Developer',
    companyName: 'UrCalls Admin',
    icon: backend,
    iconBg: '#E6DEDD',
    date: '2024',
    points: [
      'Built an admin dashboard to manage users, subscribers, and payments.',
      'Implemented role-based permissions and dynamic UI updates for different users.',
      'Developed reusable components for faster project delivery.',
    ],
  },
  {
    title: 'Church Dashboard Developer',
    companyName: 'Church Management Dashboard',
    icon: mobile,
    iconBg: '#383E56',
    date: '2024',
    points: [
      'Built dashboard for church management using React.',
      'Implemented event scheduling, member tracking, and notifications.',
      'Designed interactive forms and data storage for easy administration.',
    ],
  },
  {
    title: 'WordPress Designer & Developer',
    companyName: 'Wildfire',
    icon: creator,
    iconBg: '#E6DEDD',
    date: '2021',
    points: [
      'Designed and developed WordPress websites including hospital sites and business portfolios.',
      'Built custom themes and plugins tailored to client needs.',
      'Implemented responsive designs and optimized performance and SEO.',
    ],
  },
  {
    title: 'Patient Tracker Developer',
    companyName: 'Nexalife Care',
    icon: web,
    iconBg: '#383E56',
    date: '2024-2025',
    points: [
      'Developed patient referral and tracking systems for Nexalife Care.',
      'Implemented real-time dashboards to track patient referrals and status updates.',
      'Integrated API endpoints and multi-step forms for data collection.',
    ],
  },
  {
    title: 'Frontend & React Developer',
    companyName: 'Calmglobal - Patient Dashboard',
    icon: backend,
    iconBg: '#E6DEDD',
    date: '2023-2025',
    points: [
      'Built patient dashboards to manage appointments, history, and communications.',
      'Integrated notification systems and dynamic user interfaces using React.',
      'Implemented role-based access and permissions for different user levels.',
    ],
  },
  {
    title: 'Frontend & React Developer',
    companyName: 'AfricanProverbs',
    icon: web,
    iconBg: '#383E56',
    date: '2022 - 2023',
    points: [
      'Developed and maintained AfricanProverbs website using modern web technologies.',
      'Implemented search, filtering, and user-friendly UI/UX features.',
      'Managed content updates and integrated APIs for proverb data.',
    ],
  },
  {
    title: 'Frontend Developer & Freelance Projects',
    companyName: 'Personal Websites & Portfolios',
    icon: web,
    iconBg: '#383E56',
    date: '2021 - Present',
    points: [
      'Built personal and client websites using React, Next.js, and WordPress.',
      'Integrated APIs, payment systems, and dynamic dashboards.',
      'Delivered projects including hospital websites, business websites, and personal portfolios.',
      'Handled both design and frontend development ensuring responsive, optimized, and visually appealing sites.',
    ],
  },
];

const testimonials: TTestimonial[] = [
  {
    testimonial:
      'I thought it was impossible to make a website as impressive as our brand, but Olamilekan proved me wrong.',
    name: 'Mr Ben',
    designation: 'C.E.O',
    company: 'ABC Consult',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    testimonial:
      "I've never met a developer who truly cares about the success of their clients like Olamilekan does.",
    name: 'Mr Rilwan',
    designation: 'COO',
    company: 'Concim Ventures',
    image: 'https://randomuser.me/api/portraits/men/45.jpg',
  },
  {
    testimonial:
      "After Olamilekan optimized our website, our traffic increased significantly. We can't thank him enough!",
    name: 'Mr Dimeji',
    designation: 'CTO',
    company: 'Press Featured',
    image: 'https://randomuser.me/api/portraits/women/46.jpg',
  },
];

const projects: TProject[] = [
  {
    name: 'COMCIN Project',
    description:
      'Web application for managing COMCIN workflows, including user dashboards, multi-step forms, and API integrations to streamline operations.',
    tags: [
      { name: 'react', color: 'blue-text-gradient' },
      { name: 'redux', color: 'green-text-gradient' },
      { name: 'tailwind', color: 'pink-text-gradient' },
    ],
    image: comcin,
    sourceCodeLink: 'https://comcin.com.ng/',
  },
  {
    name: 'UrCalls Admin Dashboard',
    description:
      'Admin dashboard for UrCalls to manage users, subscriptions, payments, and role-based permissions, built with React and integrated with multiple payment APIs.',
    tags: [
      { name: 'react', color: 'blue-text-gradient' },
      { name: 'redux', color: 'pink-text-gradient' },
    ],
    image: urcalls,
    sourceCodeLink: 'https://urcalls.com/', // replace
  },
  {
    name: 'Nexalife Care (Patient Tracker)',
    description:
      'Patient referral and tracking system for Nexalife Care with real-time dashboards, multi-step forms, and API integration to manage patient data efficiently.',
    tags: [
      { name: 'react', color: 'blue-text-gradient' },
      { name: 'tailwind', color: 'green-text-gradient' },
      { name: 'api', color: 'pink-text-gradient' },
    ],
    image: nexalife,
    sourceCodeLink: 'https://nexalifecare.com/',
  },
  {
    name: 'Church Dashboard',
    description:
      'Dashboard for church management including event scheduling, member tracking, and notifications, providing an easy-to-use admin interface.',
    tags: [
      { name: 'react', color: 'blue-text-gradient' },
      { name: 'typescript', color: 'green-text-gradient' },
      { name: 'firebase', color: 'pink-text-gradient' },
    ],
    image: '',
    sourceCodeLink: '',
  },
  {
    name: 'AfricanProverbs',
    description:
      'Web platform showcasing African proverbs with search, filtering, and dynamic UI features, developed for educational and cultural engagement.',
    tags: [
      { name: 'react', color: 'blue-text-gradient' },
      { name: 'nextjs', color: 'green-text-gradient' },
      { name: 'tailwind', color: 'pink-text-gradient' },
    ],
    image: africanproverbs,
    sourceCodeLink: 'https://africanproverbs.com/', // replace
  },
  {
    name: 'Freelance Websites',
    description:
      'Designed and developed multiple WordPress and custom websites for hospitals, businesses, and personal portfolios, handling both frontend design and backend setup.',
    tags: [
      { name: 'wordpress', color: 'blue-text-gradient' },
      { name: 'php', color: 'green-text-gradient' },
      { name: 'elementor', color: 'pink-text-gradient' },
    ],
    image: websites,
    sourceCodeLink: 'https://www.pressfeatured.com/',
  },
];

export { services, technologies, experiences, testimonials, projects };
