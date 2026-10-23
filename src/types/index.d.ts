export type TCommonProps = {
  title?: string;
  name?: string;
  icon?: string;
};

export type TExperience = {
  companyName: string;
  /** Human-readable span shown on the timeline, e.g. "2023-2025" */
  date: string;
  /** Year the role started — drives the timeline order */
  start: number;
  /** Year the role ended; omit for an ongoing role */
  end?: number;
  points: string[];
} & Required<Pick<TCommonProps, 'title'>>;

export type TProject = {
  /** URL segment for the case-study route. */
  slug: string;
  description: string;
  category: string;
  /** Additional categories this project also appears under in the filter */
  extraCategories?: string[];
  /** What the client actually does — omitted where it isn't known for certain. */
  sector?: string;
  /** Who the site or system is for. */
  audience?: string;
  /**
   * The long-form `problem` and `decisions` for a case study live in
   * `constants/caseStudyDetail.ts`, keyed by slug, so this module stays
   * light for the homepage and the portfolio grid.
   */
  /** Caption for the screenshot, where one adds something the image does not. */
  imageCaption?: string;
  /** Work genuinely carried out. Never aspirational, never invented. */
  contribution?: string[];
  stack?: string[];
  tags: {
    name: string;
    color: string;
  }[];
  image: string;
  sourceCodeLink: string;
} & Required<Pick<TCommonProps, 'name'>>;

export type TMotion = {
  direction: 'up' | 'down' | 'left' | 'right' | '';
  type: 'tween' | 'spring' | 'just' | '';
  delay: number;
  duration: number;
};
