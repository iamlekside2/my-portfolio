import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import PageTransition from '../components/tunis/PageTransition';
import { useIsFirstPage } from '../components/tunis/useIsFirstPage';
import Socials from '../components/tunis/Socials';
import Typewriter from '../components/tunis/Typewriter';
import ProjectCard from '../components/work/ProjectCard';
import { LeksIdeMark } from '../components/brand/LeksIdeLogo';
import { services, featuredProjects } from '../constants';
import { founder } from '../constants/profile';
import { BRAND_PROMISE } from '../constants/seo';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const SectionHeading = ({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children?: React.ReactNode;
}) => (
  <div className="mb-10 max-w-2xl">
    <span
      className="text-[12px] font-bold uppercase tracking-[0.25em]"
      style={{ color: 'var(--color-accent)' }}
    >
      {eyebrow}
    </span>
    <h2 className="mt-3 text-[28px] font-extrabold leading-tight md:text-[36px]">{title}</h2>
    {children && <p className="mt-4 text-[15px] leading-[1.9] text-secondary">{children}</p>}
  </div>
);

const Home = () => {
  const isFirstPage = useIsFirstPage();
  return (
    <PageTransition>
      <div className="mx-auto max-w-6xl px-6 pb-28 pt-24 md:pl-10 md:pr-28 2xl:pr-10">
        {/* ── Hero ───────────────────────────────────────────── */}
        <motion.section
          variants={container}
          // Same reason as PageTransition: the stagger starts from opacity 0,
          // which would hide the hero in the prerendered HTML until hydration.
          initial={isFirstPage ? false : 'hidden'}
          animate="show"
          className="min-h-[72vh] py-10"
        >
          <motion.div variants={item} className="mb-7 flex items-center gap-3">
            <LeksIdeMark size={34} decorative />
            <span className="text-[12px] font-bold uppercase tracking-[0.3em] text-secondary">
              Technology Studio
            </span>
          </motion.div>

          <motion.h1
            variants={item}
            className="max-w-4xl text-[34px] font-extrabold leading-[1.12] md:text-[58px]"
          >
            We build digital solutions that{' '}
            <span style={{ color: 'var(--color-accent)' }}>move businesses forward.</span>
          </motion.h1>

          <motion.p variants={item} className="mt-4 text-[17px] font-semibold md:text-[20px]">
            <span className="text-secondary">We build </span>
            <Typewriter
              words={[
                'web applications',
                'business websites',
                'internal dashboards',
                'mobile apps',
                'custom software',
              ]}
            />
          </motion.p>

          <motion.p
            variants={item}
            className="mt-7 max-w-2xl text-[15px] leading-[1.95] text-secondary md:text-[16px]"
          >
            LeksIDE is a founder-led technology studio. We work with startups and growing businesses
            — in the US, the UK and across Nigeria — on the systems that carry real operational
            weight: the dashboard your team runs on, the platform your customers log into, the site
            that has to earn their trust first.
          </motion.p>

          <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-5">
            <Link to="/contact" className="tunis-btn h-[48px]">
              Start a project
              <span className="tunis-btn-arrow">
                <FiArrowRight />
              </span>
            </Link>
            <Link
              to="/portfolio"
              className="text-[13px] font-bold uppercase tracking-widest underline-offset-8 hover:underline"
            >
              See selected work
            </Link>
          </motion.div>
        </motion.section>

        {/* ── Services ───────────────────────────────────────── */}
        <section className="py-20" id="services">
          <SectionHeading eyebrow="What we do" title="Built around the outcome, not the stack.">
            Five ways the studio gets engaged. Most projects start as one of these and grow into a
            longer working relationship.
          </SectionHeading>

          <div className="grid gap-5 md:grid-cols-2">
            {services.map(s => (
              <div
                key={s.id}
                className="flex flex-col rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1"
                style={{
                  background: 'var(--color-surface-elevated)',
                  border: '1px solid var(--glass-border)',
                }}
              >
                <h3 className="text-[17px] font-bold">{s.title}</h3>
                <p
                  className="mt-2 text-[13.5px] font-semibold"
                  style={{ color: 'var(--color-accent)' }}
                >
                  {s.outcome}
                </p>
                <p className="mt-3 text-[13.5px] leading-relaxed text-secondary">{s.description}</p>
              </div>
            ))}
            <Link
              to="/services"
              className="flex items-center justify-center gap-3 rounded-2xl p-6 text-[13px] font-bold uppercase tracking-widest transition-all duration-300 hover:-translate-y-1"
              style={{
                border: '1px dashed var(--glass-border)',
                color: 'var(--color-accent)',
              }}
            >
              All services and deliverables <FiArrowRight />
            </Link>
          </div>
        </section>

        {/* ── Selected work ──────────────────────────────────── */}
        <section className="py-20">
          <SectionHeading eyebrow="Selected work" title="Systems in production, not concepts.">
            A cross-section: a product with web and mobile clients, two internal platforms, a
            referral tracker, and client sites in Nigeria and the US.
          </SectionHeading>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map(p => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>

          <div className="mt-10">
            <Link to="/portfolio" className="tunis-btn h-[46px]">
              See all work
              <span className="tunis-btn-arrow">
                <FiArrowRight />
              </span>
            </Link>
          </div>
        </section>

        {/* ── Founder ────────────────────────────────────────── */}
        <section className="py-20">
          <SectionHeading eyebrow="Who you work with" title="Founder-led, end to end." />
          <div className="grid items-start gap-10 md:grid-cols-[220px_1fr]">
            <div className="relative mx-auto w-[200px] md:mx-0">
              <div
                className="absolute -left-3 -top-3 h-full w-full rounded-3xl"
                style={{ background: 'var(--color-accent)' }}
              />
              <img
                src="/portrait.jpg"
                alt={founder.name}
                width={200}
                height={250}
                loading="lazy"
                decoding="async"
                className="relative aspect-[4/5] w-full rounded-3xl object-cover"
                onError={e => {
                  (e.currentTarget.parentElement as HTMLElement).style.display = 'none';
                }}
              />
            </div>
            <div>
              <h3 className="text-[20px] font-bold">{founder.name}</h3>
              <p
                className="mt-1 text-[13px] font-bold uppercase tracking-widest"
                style={{ color: 'var(--color-accent)' }}
              >
                {founder.role}
              </p>
              <p className="mt-5 text-[14.5px] leading-[1.95] text-secondary">{founder.bio[0]}</p>
              <div className="mt-7 flex flex-wrap items-center gap-5">
                <Link
                  to="/about"
                  className="text-[13px] font-bold uppercase tracking-widest underline-offset-8 hover:underline"
                >
                  More about the studio
                </Link>
                <Socials />
              </div>
            </div>
          </div>
        </section>

        {/* ── Closing CTA ────────────────────────────────────── */}
        <section
          className="mt-10 rounded-3xl p-8 text-center md:p-14"
          style={{
            background: 'var(--color-surface-elevated)',
            border: '1px solid var(--glass-border)',
          }}
        >
          <h2 className="mx-auto max-w-2xl text-[26px] font-extrabold leading-tight md:text-[34px]">
            {BRAND_PROMISE}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[15px] leading-[1.9] text-secondary">
            Tell us what you are building and what is in the way. You will get a straight answer on
            scope, approach and whether we are the right studio for it.
          </p>
          <div className="mt-8 flex justify-center">
            <Link to="/contact" className="tunis-btn h-[48px]">
              Start a project
              <span className="tunis-btn-arrow">
                <FiArrowRight />
              </span>
            </Link>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default Home;
