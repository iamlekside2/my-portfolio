import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FiMail,
  FiGithub,
  FiSend,
  FiAlertCircle,
  FiCheckCircle,
  FiArrowRight,
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import emailjs from "@emailjs/browser";
import PageShell from "../components/tunis/PageShell";
import Socials from "../components/tunis/Socials";
import { config } from "../constants/config";
import { founder } from "../constants/profile";
import {
  enquiryChecklist,
  engagementProcess,
  faqs,
  projectTypes,
  budgetRanges,
} from "../constants/contact";
import { services } from "../constants/services";
import { SITE_URL, BRAND } from "../constants/seo";

/**
 * Enquiry form.
 *
 * Two rules drive this component:
 *  1. Never report success unless EmailJS actually resolved. The old version
 *     toasted "Thank you!" and cleared the form on an unverified promise.
 *  2. If delivery is impossible — missing configuration, network failure — say
 *     so plainly and hand the visitor a route that does work (email, WhatsApp)
 *     with their message preserved, rather than losing it.
 */
const emailjsConfig = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  accessToken: import.meta.env.VITE_EMAILJS_ACCESS_TOKEN,
};

/** True only when all three values are present at build time. */
const isConfigured = Boolean(
  emailjsConfig.serviceId && emailjsConfig.templateId && emailjsConfig.accessToken
);

/**
 * `projectType` and `budget` are deliberately optional: they sharpen the reply
 * when answered, but a visitor who does not know yet must still be able to
 * send. Only name, email and message are required.
 */
const INITIAL = {
  name: "",
  email: "",
  projectType: "",
  budget: "",
  message: "",
};
type Fields = typeof INITIAL;
type Status = "idle" | "sending" | "sent" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const validate = (f: Fields): Partial<Record<keyof Fields, string>> => {
  const errors: Partial<Record<keyof Fields, string>> = {};
  if (f.name.trim().length < 2) errors.name = "Please enter your name.";
  if (!EMAIL_RE.test(f.email.trim()))
    errors.email = "Please enter a valid email address so we can reply.";
  if (f.message.trim().length < 20)
    errors.message = "A little more detail helps — 20 characters minimum.";
  return errors;
};

const infoCards = [
  {
    icon: FaWhatsapp,
    label: "WhatsApp",
    value: founder.whatsapp,
    href: founder.whatsappUrl,
  },
  { icon: FiMail, label: "Email", value: config.html.email, href: `mailto:${config.html.email}` },
  {
    icon: FiGithub,
    label: "GitHub",
    value: `github.com/${founder.github}`,
    href: `https://github.com/${founder.github}`,
  },
];

const card = {
  background: "var(--color-surface-elevated)",
  border: "1px solid var(--glass-border)",
};

const accent = { color: "var(--color-accent)" };

/**
 * Machine-readable version of the page. The FAQ block is the point: it lets a
 * search engine or an assistant answer "where are they based", "do they take
 * over existing projects" by quoting the studio rather than guessing.
 */
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ContactPage",
      "@id": `${SITE_URL}/contact`,
      url: `${SITE_URL}/contact`,
      name: `Start a Project — Contact ${BRAND}`,
      about: { "@id": `${SITE_URL}/#organization` },
    },
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: BRAND,
      url: SITE_URL,
      email: config.html.email,
      founder: { "@type": "Person", name: founder.name },
      address: { "@type": "PostalAddress", addressCountry: "NG" },
      contactPoint: [
        {
          "@type": "ContactPoint",
          contactType: "sales",
          email: config.html.email,
          telephone: `+${founder.whatsappUrl.split("/").pop()}`,
          areaServed: ["NG", "US"],
          availableLanguage: "English",
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

const field =
  "w-full rounded-xl px-5 py-4 text-[14px] outline-none transition-all duration-300";

const ContactPage = () => {
  const [form, setForm] = useState<Fields>(INITIAL);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [status, setStatus] = useState<Status>("idle");

  const fieldStyle = (name: keyof Fields) => ({
    background: "var(--color-tertiary)",
    color: "var(--text-primary)",
    border: `1px solid ${errors[name] ? "#ef5350" : "var(--glass-border)"}`,
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof Fields]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  /** A mailto carrying whatever the visitor already typed, qualifiers included. */
  const fallbackMailto = () => {
    const qualifiers = [
      form.projectType && `Project type: ${form.projectType}`,
      form.budget && `Budget: ${form.budget}`,
    ]
      .filter(Boolean)
      .join("\n");

    const body = encodeURIComponent(
      `${form.message}\n\n${qualifiers}${qualifiers ? "\n\n" : ""}— ${form.name}${
        form.email ? ` (${form.email})` : ""
      }`
    );
    return `mailto:${config.html.email}?subject=${encodeURIComponent(
      `Project enquiry via ${BRAND}`
    )}&body=${body}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // The button is disabled while sending, but a second submit can still
    // arrive from the Enter key before React has repainted. Drop it.
    if (status === "sending") return;

    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    if (!isConfigured) {
      setStatus("error");
      return;
    }

    setStatus("sending");
    try {
      await emailjs.send(
        emailjsConfig.serviceId,
        emailjsConfig.templateId,
        {
          form_name: form.name,
          to_name: config.html.fullName,
          from_email: form.email,
          to_email: config.html.email,
          project_type: form.projectType || "Not specified",
          budget: form.budget || "Not specified",
          message: form.message,
        },
        emailjsConfig.accessToken
      );
      // Only now is it safe to say the message was sent.
      setStatus("sent");
      setForm(INITIAL);
    } catch {
      setStatus("error");
    }
  };

  return (
    <PageShell ghost="Contact" first="Start a" second="Project">
      <p className="mx-auto mb-10 max-w-2xl text-center text-[15px] leading-[1.95] text-secondary">
        Tell us what you are building and what is in the way. You will get a
        straight answer on scope, approach, and whether LeksIDE is the right
        studio for it — not a sales sequence.
      </p>

      <div className="mb-10 grid gap-5 sm:grid-cols-3">
        {infoCards.map(({ icon: Icon, label, value, href }) => (
          <div key={label} className="info-chip flex items-center gap-4">
            <span
              aria-hidden
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full"
              style={{ background: "var(--color-accent)", color: "#111" }}
            >
              <Icon size={18} />
            </span>
            <div className="min-w-0">
              <div className="text-[11px] uppercase tracking-wider text-secondary">
                {label}
              </div>
              <a
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="block truncate text-[14px] font-semibold hover:underline"
              >
                {value}
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="mb-14 flex justify-center">
        <Socials />
      </div>

      <div className="mx-auto max-w-xl">
        <h2 className="text-[18px] font-bold uppercase tracking-wider">
          Tell us about the{" "}
          <span style={{ color: "var(--color-accent)" }}>project</span>
        </h2>

        {!isConfigured && (
          <p
            role="status"
            className="mt-4 flex gap-3 rounded-xl p-4 text-[13.5px] leading-relaxed"
            style={{ background: "var(--color-tertiary)", border: "1px solid #ef535055" }}
          >
            <FiAlertCircle className="mt-0.5 shrink-0" aria-hidden />
            <span>
              The form is not connected to a mail service in this build, so it
              cannot deliver a message. Please use{" "}
              <a className="underline" href={`mailto:${config.html.email}`}>
                email
              </a>{" "}
              or{" "}
              <a
                className="underline"
                href={founder.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp
              </a>{" "}
              instead.
            </span>
          </p>
        )}

        <form onSubmit={handleSubmit} noValidate className="mt-6 flex flex-col gap-5">
          <div>
            <label htmlFor="name" className="mb-2 block text-[13px] font-semibold">
              Your name
            </label>
            <input
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Who are we speaking with?"
              className={field}
              style={fieldStyle("name")}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "name-error" : undefined}
            />
            {errors.name && (
              <p id="name-error" className="mt-2 text-[12.5px]" style={{ color: "#ef5350" }}>
                {errors.name}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="mb-2 block text-[13px] font-semibold">
              Your email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Where should the reply go?"
              className={field}
              style={fieldStyle("email")}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "email-error" : undefined}
            />
            {errors.email && (
              <p id="email-error" className="mt-2 text-[12.5px]" style={{ color: "#ef5350" }}>
                {errors.email}
              </p>
            )}
          </div>

          {/* Optional qualifiers. Side by side on a wide screen, stacked on a
              phone, and both answerable with a single tap. */}
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="projectType"
                className="mb-2 block text-[13px] font-semibold"
              >
                Type of project{" "}
                <span className="font-normal text-secondary">(optional)</span>
              </label>
              <select
                id="projectType"
                name="projectType"
                value={form.projectType}
                onChange={handleChange}
                className={field}
                style={fieldStyle("projectType")}
              >
                <option value="">Select one…</option>
                {projectTypes.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="budget"
                className="mb-2 block text-[13px] font-semibold"
              >
                Budget range{" "}
                <span className="font-normal text-secondary">(optional)</span>
              </label>
              <select
                id="budget"
                name="budget"
                value={form.budget}
                onChange={handleChange}
                className={field}
                style={fieldStyle("budget")}
              >
                <option value="">Select one…</option>
                {budgetRanges.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="message" className="mb-2 block text-[13px] font-semibold">
              What are you building?
            </label>
            <textarea
              id="message"
              name="message"
              rows={7}
              value={form.message}
              onChange={handleChange}
              placeholder="The problem, who it is for, and any deadline you are working to."
              className={`${field} resize-none`}
              style={fieldStyle("message")}
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? "message-error" : undefined}
            />
            {errors.message && (
              <p id="message-error" className="mt-2 text-[12.5px]" style={{ color: "#ef5350" }}>
                {errors.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="tunis-btn h-[48px] w-fit"
            disabled={status === "sending"}
          >
            {status === "sending" ? "Sending…" : "Send enquiry"}
            <span className="tunis-btn-arrow">
              <FiSend size={16} />
            </span>
          </button>
        </form>

        {/* Outcome, announced to assistive tech. */}
        <div aria-live="polite" className="mt-6">
          {status === "sent" && (
            <p
              className="flex gap-3 rounded-xl p-4 text-[14px] leading-relaxed"
              style={{
                background: "var(--color-tertiary)",
                border: "1px solid var(--color-accent)",
              }}
            >
              <FiCheckCircle
                className="mt-0.5 shrink-0"
                style={{ color: "var(--color-accent)" }}
                aria-hidden
              />
              <span>
                <strong>Message delivered.</strong> You will get a reply at the
                address you gave, usually within one working day.
              </span>
            </p>
          )}

          {status === "error" && (
            <div
              role="alert"
              className="flex gap-3 rounded-xl p-4 text-[14px] leading-relaxed"
              style={{ background: "var(--color-tertiary)", border: "1px solid #ef5350" }}
            >
              <FiAlertCircle className="mt-0.5 shrink-0" style={{ color: "#ef5350" }} aria-hidden />
              <span>
                <strong>That did not send.</strong> Your message has not been
                delivered — nothing has been lost from the box above. Send it
                directly via{" "}
                <a className="underline" href={fallbackMailto()}>
                  email
                </a>{" "}
                or{" "}
                <a
                  className="underline"
                  href={founder.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp
                </a>
                .
              </span>
            </div>
          )}
        </div>
      </div>

      {/* ---- Everything below is what the page says to a reader, or a
             crawler, that never fills the form in. ---- */}

      <h2 className="mb-3 mt-24 text-center text-[18px] font-bold uppercase tracking-wider">
        What to put in the <span style={accent}>message</span>
      </h2>
      <p className="mx-auto mb-10 max-w-xl text-center text-[14px] leading-[1.9] text-secondary">
        None of it is required — &ldquo;can you help with this?&rdquo; is a fine
        way to start. But the more of it a first message carries, the sooner it
        turns into a real answer instead of a round of questions.
      </p>
      <div className="grid gap-5 sm:grid-cols-2">
        {enquiryChecklist.map((item) => (
          <div key={item.title} className="rounded-2xl p-5" style={card}>
            <h3 className="text-[15px] font-bold">{item.title}</h3>
            <p className="mt-1.5 text-[13px] leading-relaxed text-secondary">
              {item.detail}
            </p>
          </div>
        ))}
      </div>

      <h2 className="mb-3 mt-20 text-center text-[18px] font-bold uppercase tracking-wider">
        What happens <span style={accent}>next</span>
      </h2>
      <p className="mx-auto mb-10 max-w-xl text-center text-[14px] leading-[1.9] text-secondary">
        The whole path from enquiry to build, so you know what you are starting
        before you start it.
      </p>
      <ol className="grid list-none gap-5 md:grid-cols-2 lg:grid-cols-4">
        {engagementProcess.map((step) => (
          <li key={step.n} className="info-chip">
            <span
              aria-hidden
              className="text-[28px] font-extrabold leading-none"
              style={accent}
            >
              {step.n}
            </span>
            <h3 className="mt-3 text-[15px] font-bold">{step.title}</h3>
            <p className="mt-1.5 text-[13px] leading-relaxed text-secondary">
              {step.detail}
            </p>
          </li>
        ))}
      </ol>

      <h2 className="mb-3 mt-20 text-center text-[18px] font-bold uppercase tracking-wider">
        Work the studio <span style={accent}>takes on</span>
      </h2>
      <p className="mx-auto mb-10 max-w-xl text-center text-[14px] leading-[1.9] text-secondary">
        If your project sits outside all of these, say so anyway — it is quicker
        to be told no than to wonder.
      </p>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => (
          <div key={s.id} className="rounded-2xl p-5" style={card}>
            <h3 className="text-[15px] font-bold">{s.title}</h3>
            <p className="mt-1.5 text-[13px] leading-relaxed text-secondary">
              {s.outcome}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-8 text-center">
        <Link to="/services" className="tunis-btn h-[48px]">
          See what each one involves
          <span className="tunis-btn-arrow">
            <FiArrowRight />
          </span>
        </Link>
      </div>

      <h2 className="mb-10 mt-20 text-center text-[18px] font-bold uppercase tracking-wider">
        Common <span style={accent}>questions</span>
      </h2>
      <dl className="mx-auto max-w-3xl">
        {faqs.map((f) => (
          <div
            key={f.q}
            className="border-b py-6 first:border-t"
            style={{ borderColor: "var(--glass-border)" }}
          >
            <dt className="text-[15px] font-bold">{f.q}</dt>
            <dd className="mt-2.5 text-[13.5px] leading-[1.95] text-secondary">
              {f.a}
            </dd>
          </div>
        ))}
      </dl>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </PageShell>
  );
};

export default ContactPage;
