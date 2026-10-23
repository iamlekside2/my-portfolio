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
} & Required<Pick<TCommonProps, "title">>;

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
   * The situation the work was commissioned to change, described without
   * numbers. Present only where the problem is actually known rather than
   * reconstructed from the finished product.
   */
  problem?: string;
  /**
   * Implementation decisions worth defending, and why each was taken. These
   * are the engineering content of a case study — the part a prospective
   * client cannot infer from a screenshot.
   */
  decisions?: { title: string; detail: string }[];
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
} & Required<Pick<TCommonProps, "name">>;

export type TMotion = {
  direction: "up" | "down" | "left" | "right" | "";
  type: "tween" | "spring" | "just" | "";
  delay: number;
  duration: number;
};
