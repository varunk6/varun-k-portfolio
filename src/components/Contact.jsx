import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Send, CheckCircle2, Copy, Check, ExternalLink } from "lucide-react";
import { GithubMark, LinkedinMark, InstagramMark } from "./BrandIcons";
import SectionHeading from "./SectionHeading";
import { socialLinks } from "../data/navigation";

const initialState = { name: "", email: "", message: "" };
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Contact() {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | loading | success
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleCopyEmail = async () => {
    const emailStr = "skvvarun6@gmail.com";
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(emailStr);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = emailStr;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }
      showToast("Email copied!");
    } catch (err) {
      showToast("skvvarun6@gmail.com");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    setErrors((err) => ({ ...err, [name]: undefined }));
  };

  const validate = () => {
    const next = {};
    if (!values.name.trim()) next.name = "Please enter your name.";
    if (!values.email.trim()) next.email = "Please enter your email.";
    else if (!emailPattern.test(values.email))
      next.email = "Please enter a valid email address.";
    if (!values.message.trim()) next.message = "Please enter a message.";
    return next;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      setStatus("idle");
      return;
    }

    setStatus("loading");

    try {
      const response = await fetch("https://formspree.io/f/skvvarun6@gmail.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        setStatus("success");
        setValues(initialState);
      } else {
        const subject = encodeURIComponent(`Portfolio message from ${values.name}`);
        const body = encodeURIComponent(
          `${values.message}\n\n— ${values.name} (${values.email})`
        );
        window.location.href = `${socialLinks.email}?subject=${subject}&body=${body}`;
        setStatus("success");
        setValues(initialState);
      }
    } catch (err) {
      const subject = encodeURIComponent(`Portfolio message from ${values.name}`);
      const body = encodeURIComponent(
        `${values.message}\n\n— ${values.name} (${values.email})`
      );
      window.location.href = `${socialLinks.email}?subject=${subject}&body=${body}`;
      setStatus("success");
      setValues(initialState);
    }
  };

  return (
    <section id="contact" className="relative py-24 md:py-32 pb-32 md:pb-32">
      {/* Toast Notification Container */}
      <div
        aria-live="polite"
        className="fixed bottom-6 right-6 z-[400] pointer-events-none"
      >
        <AnimatePresence>
          {toastMessage && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              transition={{ duration: 0.25 }}
              className="pointer-events-auto flex items-center gap-2.5 px-4 py-3 rounded-xl bg-surface border border-orange/40 text-ink shadow-2xl text-xs font-mono"
            >
              <CheckCircle2 size={16} className="text-orange" />
              <span>{toastMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 grid md:grid-cols-2 gap-14 md:gap-16">
        <div>
          <SectionHeading
            number="06"
            label="CONTACT"
            title="Let's Work Together"
            subtitle="Interested in my work or have an opportunity? Feel free to reach out."
          />

          {/* Quick Contact CTA Action Buttons */}
          <div className="mt-8 space-y-3">
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={socialLinks.email}
                data-cursor-hover
                className="inline-flex items-center gap-2 bg-orange text-bg font-medium px-5 py-2.5 rounded-full hover:brightness-110 transition-all text-xs sm:text-sm shadow-md"
              >
                <Mail size={16} />
                <span>Email Me</span>
              </a>

              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noreferrer"
                data-cursor-hover
                className="inline-flex items-center gap-2 border border-border-soft bg-surface text-ink font-medium px-5 py-2.5 rounded-full hover:border-orange/50 hover:text-orange transition-colors text-xs sm:text-sm"
              >
                <LinkedinMark size={16} />
                <span>LinkedIn</span>
                <ExternalLink size={13} className="opacity-60" />
              </a>

              <button
                type="button"
                onClick={handleCopyEmail}
                data-cursor-hover
                aria-label="Copy email address skvvarun6@gmail.com"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-mono text-ink-soft bg-surface border border-border-soft hover:border-orange/40 hover:text-orange transition-all"
              >
                <Copy size={14} />
                <span>Copy Email</span>
              </button>
            </div>

            <div className="text-xs font-mono text-ink-muted pt-1">
              Direct email: <span className="text-ink font-medium select-all">skvvarun6@gmail.com</span>
            </div>
          </div>

          <div className="mt-8 flex items-center gap-4">
            <a
              href={socialLinks.github}
              target="_blank"
              rel="noreferrer"
              data-cursor-hover
              aria-label="GitHub profile"
              className="flex items-center justify-center w-11 h-11 rounded-full border border-border-soft text-ink-soft hover:text-orange hover:border-orange/40 transition-colors"
            >
              <GithubMark size={18} />
            </a>
            <a
              href={socialLinks.linkedin}
              target="_blank"
              rel="noreferrer"
              data-cursor-hover
              aria-label="LinkedIn profile"
              className="flex items-center justify-center w-11 h-11 rounded-full border border-border-soft text-ink-soft hover:text-orange hover:border-orange/40 transition-colors"
            >
              <LinkedinMark size={18} />
            </a>
            <a
              href={socialLinks.instagram}
              target="_blank"
              rel="noreferrer"
              data-cursor-hover
              aria-label="Instagram profile"
              className="flex items-center justify-center w-11 h-11 rounded-full border border-border-soft text-ink-soft hover:text-orange hover:border-orange/40 transition-colors"
            >
              <InstagramMark size={18} />
            </a>
            <a
              href={socialLinks.email}
              data-cursor-hover
              aria-label="Send an email"
              className="flex items-center justify-center w-11 h-11 rounded-full border border-border-soft text-ink-soft hover:text-orange hover:border-orange/40 transition-colors"
            >
              <Mail size={18} />
            </a>
          </div>
        </div>

        <motion.form
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          onSubmit={handleSubmit}
          noValidate
          className="space-y-5"
        >
          <div>
            <label htmlFor="name" className="block text-xs font-mono tracking-wide uppercase text-ink-muted mb-2">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={values.name}
              onChange={handleChange}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "name-error" : undefined}
              className="w-full bg-surface border border-border-soft rounded-xl px-4 py-3 text-ink placeholder:text-ink-muted focus:border-orange focus:outline-none transition-colors"
              placeholder="Your name"
            />
            {errors.name && (
              <p id="name-error" className="text-xs text-orange mt-1.5">
                {errors.name}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-xs font-mono tracking-wide uppercase text-ink-muted mb-2">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={values.email}
              onChange={handleChange}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "email-error" : undefined}
              className="w-full bg-surface border border-border-soft rounded-xl px-4 py-3 text-ink placeholder:text-ink-muted focus:border-orange focus:outline-none transition-colors"
              placeholder="you@example.com"
            />
            {errors.email && (
              <p id="email-error" className="text-xs text-orange mt-1.5">
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="message" className="block text-xs font-mono tracking-wide uppercase text-ink-muted mb-2">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              value={values.message}
              onChange={handleChange}
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? "message-error" : undefined}
              className="w-full bg-surface border border-border-soft rounded-xl px-4 py-3 text-ink placeholder:text-ink-muted focus:border-orange focus:outline-none transition-colors resize-none"
              placeholder="Tell me about your project or opportunity..."
            />
            {errors.message && (
              <p id="message-error" className="text-xs text-orange mt-1.5">
                {errors.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            data-cursor-hover
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-orange text-bg font-medium px-7 py-3.5 rounded-full hover:brightness-110 hover:shadow-[0_0_30px_rgba(255,122,51,0.3)] transition-all"
          >
            Send Message
            <Send size={16} />
          </button>

          {status === "success" && (
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 text-sm text-orange"
              role="status"
            >
              <CheckCircle2 size={16} />
              Opening your mail app with the message pre-filled.
            </motion.p>
          )}
        </motion.form>
      </div>
    </section>
  );
}
