import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMessageCircle, FiX, FiSend } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

const WHATSAPP_URL = "https://wa.me/2347068736818";
import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";
import { config } from "../../constants/config";

const emailjsConfig = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  accessToken: import.meta.env.VITE_EMAILJS_ACCESS_TOKEN,
};

const INITIAL = { name: "", email: "", message: "" };

const FloatingMessage = () => {
  const [open, setOpen] = useState(false);
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
          setOpen(false);
          toast.success("Message sent! I'll get back to you soon.");
        },
        () => {
          setSending(false);
          toast.error("Something went wrong. Please try again.");
        }
      );
  };

  const field =
    "w-full rounded-xl px-4 py-3 text-[13px] outline-none transition-all duration-300";
  const fieldStyle = {
    background: "var(--color-tertiary)",
    color: "var(--text-primary)",
    border: "1px solid var(--glass-border)",
  };

  return (
    <div className="fixed bottom-20 right-4 z-50 flex flex-col items-end gap-3 md:bottom-8 md:right-24">
      <AnimatePresence>
        {open && (
          <motion.form
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.22 }}
            onSubmit={handleSubmit}
            className="glass-card flex w-[310px] flex-col gap-3 p-5"
            style={{ borderTop: "2px solid var(--color-accent)" }}
          >
            <div className="text-[14px] font-bold uppercase tracking-wider">
              Message me{" "}
              <span style={{ color: "var(--color-accent)" }}>directly</span>
            </div>
            <input
              required
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your name"
              className={field}
              style={fieldStyle}
            />
            <input
              required
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Your email"
              className={field}
              style={fieldStyle}
            />
            <textarea
              required
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Your message…"
              rows={4}
              className={`${field} resize-none`}
              style={fieldStyle}
            />
            <button
              type="submit"
              disabled={sending}
              className="flex items-center justify-center gap-2 rounded-xl py-3 text-[13px] font-bold uppercase tracking-wider transition-transform duration-200 hover:scale-[1.02] disabled:opacity-60"
              style={{ background: "var(--color-accent)", color: "#111" }}
            >
              {sending ? "Sending…" : "Send"} <FiSend size={14} />
            </button>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-xl py-3 text-[13px] font-bold uppercase tracking-wider transition-transform duration-200 hover:scale-[1.02]"
              style={{ background: "#25D366", color: "#fff" }}
            >
              <FaWhatsapp size={16} /> Chat on WhatsApp
            </a>
          </motion.form>
        )}
      </AnimatePresence>

      <motion.button
        aria-label={open ? "Close message form" : "Send me a message"}
        onClick={() => setOpen((o) => !o)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        className="flex h-14 w-14 items-center justify-center rounded-full shadow-[0_8px_30px_rgba(255,180,0,0.35)]"
        style={{ background: "var(--color-accent)", color: "#111" }}
      >
        {open ? <FiX size={22} /> : <FiMessageCircle size={24} />}
      </motion.button>
    </div>
  );
};

export default FloatingMessage;
