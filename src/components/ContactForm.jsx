import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Send, CheckCircle2 } from "lucide-react";
import { useLanguage } from "../context/LanguageContext.jsx";
import { fetchPostContactMessage } from "../services/eventService.js";

const initialForm = { name: "", email: "", message: "" };

export default function ContactForm() {
  const { t } = useLanguage();
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!form.name.trim()) {
      newErrors.name = t("contactFormNameRequired");
    }
    if (!form.email.trim()) {
      newErrors.email = t("contactFormEmailRequired");
    }
    if (!form.message.trim()) {
      newErrors.message = t("contactFormMessageRequired");
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setSubmitted(true);
    fetchPostContactMessage(form);
    setForm(initialForm);
    setTimeout(() => setSubmitted(false), 6000);
  };

  const infoItems = [
    {
      Icon: MapPin,
      label: t("contactAddressLabel"),
      value: t("contactAddress"),
    },
    { Icon: Phone, label: t("contactPhoneLabel"), value: t("contactPhone") },
    { Icon: Mail, label: t("contactEmailLabel"), value: t("contactEmail") },
  ];

  return (
    <section id="contact" className="py-12 lg:py-16 relative bg-church-bg-alt">
      <div className="max-w-[1180px] mx-auto px-5 sm:px-7">
        <div className="max-w-[640px] mx-auto mb-8 text-center">
          <span className="inline-flex items-center gap-2.5 font-body text-xs font-bold tracking-[0.14em] uppercase text-church-accent before:content-[''] before:w-5.5 before:h-[1.5px] before:bg-church-accent">
            {t("contactEyebrow")}
          </span>
          <h2 className="font-display font-semibold text-3xl sm:text-4xl lg:text-[42px] leading-tight text-church-ink mt-3.5 tracking-tight">
            {t("contactHeading")}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-church-ink-muted max-w-[56ch] mx-auto">
            {t("contactIntro")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-10 lg:gap-12 items-start">
          <motion.div
            className="flex flex-col gap-6"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              className="rounded-2xl overflow-hidden border border-church-border shadow-church-sm aspect-[16/10] bg-church-surface"
              aria-hidden="true"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3516.324732027444!2d96.1269419102515!3d16.790921619648284!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30c1eb136ffea469%3A0xcc07e79b376eeb21!2sBrayton%20Pwo%20Karen%20Baptist%20Church!5e1!3m2!1sen!2ssg!4v1789028401105!5m2!1sen!2ssg"
                width="600"
                height="450"
                style={{ border: "0" }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                className="w-full h-full"
              />
            </div>
            <ul className="flex flex-col gap-4.5 m-0 p-0 list-none">
              {infoItems.map(({ Icon, label, value }) => (
                <li key={label} className="flex items-start gap-3.5">
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-church-surface border border-church-border text-church-accent shrink-0 shadow-xs">
                    <Icon size={18} strokeWidth={1.8} />
                  </span>
                  <span className="flex flex-col">
                    <span className="text-[11px] font-bold text-church-ink-faint uppercase tracking-wider">
                      {label}
                    </span>
                    <span className="text-sm sm:text-base font-medium text-church-ink mt-0.5">
                      {value}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.form
            className="bg-church-surface border border-church-border rounded-2xl p-6 sm:p-8 flex flex-col gap-4 shadow-church-sm"
            onSubmit={handleSubmit}
            noValidate
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            <div>
              <label htmlFor="name" className="sr-only">
                {t("contactFormName")}
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder={t("contactFormName")}
                value={form.name}
                onChange={handleChange}
                className={`w-full px-4 py-3.5 rounded-lg border bg-church-bg text-church-ink text-[15px] focus:outline-none transition-colors placeholder:text-church-ink-muted/60 ${
                  errors.name
                    ? "border-rose-500 focus:border-rose-500 focus:ring-1 focus:ring-rose-500"
                    : "border-church-border focus:border-church-cta focus:ring-1 focus:ring-church-cta"
                }`}
              />
              {errors.name && (
                <p className="mt-1.5 text-xs text-rose-500 font-medium">
                  {errors.name}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="sr-only">
                {t("contactFormEmail")}
              </label>
              <input
                id="email"
                name="email"
                type="text"
                placeholder={t("contactFormEmail")}
                value={form.email}
                onChange={handleChange}
                className={`w-full px-4 py-3.5 rounded-lg border bg-church-bg text-church-ink text-[15px] focus:outline-none transition-colors placeholder:text-church-ink-muted/60 ${
                  errors.email
                    ? "border-rose-500 focus:border-rose-500 focus:ring-1 focus:ring-rose-500"
                    : "border-church-border focus:border-church-cta focus:ring-1 focus:ring-church-cta"
                }`}
              />
              {errors.email && (
                <p className="mt-1.5 text-xs text-rose-500 font-medium">
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="message" className="sr-only">
                {t("contactFormMessage")}
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                placeholder={t("contactFormMessage")}
                value={form.message}
                onChange={handleChange}
                className={`w-full px-4 py-3.5 rounded-lg border bg-church-bg text-church-ink text-[15px] focus:outline-none transition-colors placeholder:text-church-ink-muted/60 resize-y ${
                  errors.message
                    ? "border-rose-500 focus:border-rose-500 focus:ring-1 focus:ring-rose-500"
                    : "border-church-border focus:border-church-cta focus:ring-1 focus:ring-church-cta"
                }`}
              />
              {errors.message && (
                <p className="mt-1.5 text-xs text-rose-500 font-medium">
                  {errors.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-semibold text-sm bg-church-cta text-church-cta-text hover:bg-church-cta-hover transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] self-start mt-2 cursor-pointer"
            >
              {t("contactFormSubmit")} <Send size={16} />
            </button>

            {submitted && (
              <motion.p
                className="flex items-center gap-2 text-sm text-emerald-600 dark:text-emerald-400 font-medium mt-2"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <CheckCircle2 size={16} /> {t("contactFormSuccess")}
              </motion.p>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
}
