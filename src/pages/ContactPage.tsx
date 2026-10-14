import { Suspense, lazy, useState } from "react";
import { FiMail, FiGithub, FiSend } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";
import PageShell from "../components/tunis/PageShell";
import Socials from "../components/tunis/Socials";
import { config } from "../constants/config";

// Lazy-loaded: pulls in three.js, which shouldn't weigh down the rest of the site
const EarthCanvas = lazy(() => import("../components/canvas/Earth"));

const emailjsConfig = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  accessToken: import.meta.env.VITE_EMAILJS_ACCESS_TOKEN,
};

const INITIAL = { name: "", email: "", message: "" };

const infoCards = [
  {
    icon: FaWhatsapp,
    label: "WhatsApp",
    value: "0706 873 6818",
    href: "https://wa.me/2347068736818" as string | undefined,
  },
  {
    icon: FiMail,
    label: "Email",
    value: config.html.email,
    href: `mailto:${config.html.email}`,
  },
  {
    icon: FiGithub,
    label: "GitHub",
    value: "github.com/iamlekside2",
    href: "https://github.com/iamlekside2",
  },
];

const field =
  "w-full rounded-xl px-5 py-4 text-[14px] outline-none transition-all duration-300 focus:border-[var(--color-accent)]";
const fieldStyle = {
  background: "var(--color-tertiary)",
  color: "var(--text-primary)",
  border: "1px solid var(--glass-border)",
};

const ContactPage = () => {
  const [form, setForm] = useState(INITIAL);
  const [sending, setSending] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    emailjs
      .send(
        emailjsConfig.serviceId,
        emailjsConfig.templateId,
        {
          form_name: form.name,
          to_name: config.html.fullName,
          from_email: form.email,
          to_email: config.html.email,
          message: form.message,
        },
        emailjsConfig.accessToken
      )
      .then(
        () => {
          setSending(false);
          setForm(INITIAL);
          toast.success("Thank you! I will get back to you soon.");
        },
        () => {
          setSending(false);
          toast.error("Something went wrong. Please try again.");
        }
      );
  };

  return (
    <PageShell ghost="Contact" first="Get In" second="Touch">
      <p className="mx-auto mb-10 max-w-2xl text-center text-[15px] leading-[1.9] text-secondary">
        Open to new projects, collaborations and full-time roles. Don't be shy
        — drop a message and I'll get back to you fast.
      </p>

      <div className="mb-10 grid gap-5 sm:grid-cols-3">
        {infoCards.map(({ icon: Icon, label, value, href }) => (
          <div key={label} className="info-chip flex items-center gap-4">
            <span
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full"
              style={{ background: "var(--color-accent)", color: "#111" }}
            >
              <Icon size={18} />
            </span>
            <div className="min-w-0">
              <div className="text-[11px] uppercase tracking-wider text-secondary">
                {label}
              </div>
              {href ? (
                <a
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="block truncate text-[14px] font-semibold hover:underline"
                >
                  {value}
                </a>
              ) : (
                <div className="truncate text-[14px] font-semibold">{value}</div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mb-14 flex justify-center">
        <Socials />
      </div>

      {/* Form + globe, side by side on desktop */}
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <h2 className="text-[18px] font-bold uppercase tracking-wider">
            Send a{" "}
            <span style={{ color: "var(--color-accent)" }}>message</span>
          </h2>
          <input
            required
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="What's your name?"
            className={field}
            style={fieldStyle}
          />
          <input
            required
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="What's your email?"
            className={field}
            style={fieldStyle}
          />
          <textarea
            required
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="What do you want to say?"
            rows={7}
            className={`${field} resize-none`}
            style={fieldStyle}
          />
          <button type="submit" className="tunis-btn h-[46px] w-fit" disabled={sending}>
            {sending ? "Sending…" : "Send Message"}
            <span className="tunis-btn-arrow">
              <FiSend size={16} />
            </span>
          </button>
        </form>

        <div className="order-first h-[340px] md:h-[460px] lg:order-none lg:h-[540px]">
          <Suspense fallback={null}>
            <EarthCanvas />
          </Suspense>
        </div>
      </div>
    </PageShell>
  );
};

export default ContactPage;
