import { track } from "@vercel/analytics";

/**
 * Conversion events.
 *
 * Pageviews need nothing here — `<Analytics />` in `main.tsx` reports those on
 * every plan, which is what answers "is the Business Profile sending traffic".
 * This file covers the question after it: did any of that traffic turn into an
 * enquiry.
 *
 * Vercel gates custom events behind a paid plan. On the current one the call
 * below is accepted and dropped rather than throwing, so it is safe to ship
 * now and starts recording the day the plan changes. Wiring it at the point
 * the code already knows an enquiry succeeded is also the only way the signal
 * stays honest — a conversion defined in a dashboard, by URL or by a click on
 * a button, counts attempts rather than deliveries, and this form can fail
 * after the click.
 */

/** Where an enquiry came from, for when there is more than one route to one. */
export type EnquirySource = "contact-form";

/**
 * Fires once EmailJS has accepted the message — never on submit. The gap
 * matters: the form validates, throttles and can fail on send, and counting
 * any of those as an enquiry would overstate the number that reached an inbox.
 */
export const trackEnquiry = (source: EnquirySource) => {
  track("enquiry", { source });
};
