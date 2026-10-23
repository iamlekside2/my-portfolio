/**
 * Copy for the contact page.
 *
 * It lives here rather than inline in the component for the same reason the
 * services and profile copy does: the page is mostly prose, and prose that
 * sits in a constants file can be edited without reading JSX.
 *
 * The page is also the thinnest route on the site for anything that reads it
 * without running JavaScript — crawlers, link unfurlers, LLM fetchers. A form
 * carries almost no text. These sections are what give it something to read.
 */

export type TStep = {
  n: string;
  title: string;
  detail: string;
};

/** What a useful first message contains. Saves a round trip on both sides. */
export const enquiryChecklist: { title: string; detail: string }[] = [
  {
    title: 'The problem, not the feature list',
    detail:
      'What is slow, manual, breaking or missing today. The solution is easier to scope from the problem than from a spec.',
  },
  {
    title: 'Who it is for',
    detail:
      'Your customers, your staff, or both — an internal dashboard and a public product pull in different directions.',
  },
  {
    title: 'Where it stands',
    detail:
      'A blank page, a design, an existing site to rebuild, or a codebase someone else left behind. All four are workable.',
  },
  {
    title: 'Timing and budget range',
    detail:
      'Even a rough figure saves time. It decides what can be built properly rather than started and abandoned.',
  },
];

/** What actually happens after the form is sent. */
export const engagementProcess: TStep[] = [
  {
    n: '01',
    title: 'A reply from the founder',
    detail:
      'Usually within one working day, and from the person who would do the work — not a sales sequence or an account manager.',
  },
  {
    n: '02',
    title: 'A scoping conversation',
    detail:
      'A call or a written exchange to pin down what is actually being built, what it has to integrate with, and what is out of scope. No charge, no obligation.',
  },
  {
    n: '03',
    title: 'A written proposal',
    detail:
      'Scope, price, timeline and — just as important — what is explicitly excluded. You can take it elsewhere; it is yours either way.',
  },
  {
    n: '04',
    title: 'Build, with the work visible',
    detail:
      'Delivered in increments you can see running rather than a single reveal at the end, with direct access to the founder throughout.',
  },
];

export type TFaq = { q: string; a: string };

/**
 * Answers to what enquiries actually ask. Also emitted as FAQPage JSON-LD, so
 * search engines and assistants can quote them without guessing.
 */
export const faqs: TFaq[] = [
  {
    q: 'Where is the studio based, and do you work with clients abroad?',
    a: 'LeksIDE is based in Nigeria and works remotely with clients in Nigeria, the US and elsewhere. West African time overlaps the European working day in full and the US morning, so the day is shared either way.',
  },
  {
    q: 'How quickly will I get a reply?',
    a: 'Usually within one working day. If the enquiry is not a fit, you will be told that plainly rather than left waiting.',
  },
  {
    q: 'Can you take over a project someone else built?',
    a: 'Yes. Inheriting an existing codebase, WordPress site or half-finished build is routine work — maintenance, incremental features, performance and accessibility fixes, or finishing what was started.',
  },
  {
    q: 'Do you build on WordPress or write it from scratch?',
    a: 'Both, and the choice follows the client rather than a preference. WordPress where the team needs to edit their own content; a hand-coded React or Next.js build where speed, custom logic or scale matter more.',
  },
  {
    q: 'What happens after launch?',
    a: 'Ongoing technical partnership is available: maintenance, dependency upgrades, incremental features, and being the person who answers when something breaks. Projects can also simply be handed over.',
  },
  {
    q: 'Is there a minimum project size?',
    a: 'No fixed minimum. Small, well-defined pieces of work are welcome — a single integration, a performance problem, one broken flow — alongside full builds.',
  },
];

/**
 * Qualification fields on the enquiry form.
 *
 * Two selects rather than two more text inputs: a select costs one tap on a
 * phone, cannot be typed wrong, and both answers change how the reply is
 * written. Both stay optional — a visitor who does not know yet should not be
 * blocked from sending.
 */
export const projectTypes: string[] = [
  'Business website or WordPress',
  'Web application or dashboard',
  'Mobile app',
  'Custom software or internal tool',
  'API integration or automation',
  'Taking over an existing build',
  'Something else / not sure yet',
];

/**
 * Ranges rather than a figure. A visitor who will not type a number will often
 * still pick a band, and the band is enough to say whether the work is a fit.
 */
export const budgetRanges: string[] = [
  'Under $1,000',
  '$1,000 – $3,000',
  '$3,000 – $7,000',
  '$7,000 – $15,000',
  '$15,000+',
  'Not sure yet',
];
