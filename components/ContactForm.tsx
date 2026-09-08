"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const projectTypes = [
  "Residential Interiors",
  "Commercial Interiors",
  "Office Interiors",
  "Fit-Out Solutions",
  "Ceiling Works",
  "Turnkey Interiors",
];

const budgets = ["Under ₹10L", "₹10L – ₹25L", "₹25L – ₹50L", "₹50L – ₹1Cr", "₹1Cr+"];

const fieldClass =
  "w-full border-b border-ivory/25 bg-transparent py-4 text-base text-ivory placeholder:text-ivory/40 focus:border-gold focus:outline-none transition-colors";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex min-h-[320px] flex-col justify-center"
      >
        <p className="font-serif text-3xl text-ivory">Thank you.</p>
        <p className="mt-3 max-w-sm text-ivory/60">
          Your enquiry has been received. Our team will get back to you within
          one business day to discuss your project.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-8 sm:grid-cols-2">
      <input name="name" required placeholder="Name" className={fieldClass} />
      <input name="phone" required placeholder="Phone Number" className={fieldClass} />
      <input name="email" type="email" required placeholder="Email" className={`${fieldClass} sm:col-span-2`} />

      <select name="projectType" required defaultValue="" className={`${fieldClass} appearance-none`}>
        <option value="" disabled className="text-charcoal">
          Project Type
        </option>
        {projectTypes.map((t) => (
          <option key={t} value={t} className="text-charcoal">
            {t}
          </option>
        ))}
      </select>

      <select name="budget" required defaultValue="" className={`${fieldClass} appearance-none`}>
        <option value="" disabled className="text-charcoal">
          Budget Range
        </option>
        {budgets.map((b) => (
          <option key={b} value={b} className="text-charcoal">
            {b}
          </option>
        ))}
      </select>

      <textarea
        name="message"
        required
        rows={3}
        placeholder="Tell us about your space"
        className={`${fieldClass} resize-none sm:col-span-2`}
      />

      <button
        type="submit"
        disabled={status === "loading"}
        data-cursor="Send"
        className="mt-2 inline-flex w-fit items-center gap-3 rounded-full bg-gold px-9 py-4 text-xs font-medium uppercase tracking-[0.18em] text-charcoal transition-colors duration-300 hover:bg-ivory disabled:opacity-60 sm:col-span-2"
      >
        {status === "loading" ? "Sending..." : "Let's Talk"}
      </button>

      {status === "error" && (
        <p className="text-sm text-red-400 sm:col-span-2">
          Something went wrong. Please try again, or call us directly.
        </p>
      )}
    </form>
  );
}
