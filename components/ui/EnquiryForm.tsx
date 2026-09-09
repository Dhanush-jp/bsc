"use client";

import { useState, type FormEvent } from "react";
import { projectTypes } from "@/data/site-content";
import type { EnquiryFormData } from "@/lib/types";
import { openWhatsAppEnquiry } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";
import { MagneticButton } from "@/components/ui/MagneticButton";

type FormErrors = Partial<Record<keyof EnquiryFormData, string>>;

const initialState: EnquiryFormData = {
  name: "",
  phone: "",
  email: "",
  company: "",
  projectType: projectTypes[0] || "",
  projectLocation: "",
  message: ""
};

export function EnquiryForm() {
  const [form, setForm] = useState<EnquiryFormData>(initialState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);

  const validate = (): FormErrors => {
    const next: FormErrors = {};
    if (!form.name.trim()) next.name = "Please enter your name.";
    if (!form.phone.trim() || form.phone.trim().length < 10) next.phone = "Please enter a valid phone number.";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = "Please enter a valid email address.";
    }
    if (!form.projectType.trim()) next.projectType = "Please select a project type.";
    if (!form.projectLocation.trim()) next.projectLocation = "Please enter a project location.";
    if (!form.message.trim()) next.message = "Please share a brief message.";
    return next;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitting(true);
    openWhatsAppEnquiry(form);
    window.setTimeout(() => setSubmitting(false), 600);
  };

  const update = (field: keyof EnquiryFormData, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    if (errors[field]) {
      setErrors((current) => {
        const next = { ...current };
        delete next[field];
        return next;
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-6" noValidate>
      <Field label="Name" error={errors.name}>
        <input
          id="name"
          name="name"
          value={form.name}
          onChange={(event) => update("name", event.target.value)}
          className={fieldClass(errors.name)}
          autoComplete="name"
        />
      </Field>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Phone" error={errors.phone}>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={form.phone}
            onChange={(event) => update("phone", event.target.value)}
            className={fieldClass(errors.phone)}
            autoComplete="tel"
          />
        </Field>
        <Field label="Email" error={errors.email}>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={(event) => update("email", event.target.value)}
            className={fieldClass(errors.email)}
            autoComplete="email"
          />
        </Field>
      </div>

      <Field label="Company" hint="Optional">
        <input
          id="company"
          name="company"
          value={form.company}
          onChange={(event) => update("company", event.target.value)}
          className={fieldClass()}
          autoComplete="organization"
        />
      </Field>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Project Type" error={errors.projectType}>
          <select
            id="projectType"
            name="projectType"
            value={form.projectType}
            onChange={(event) => update("projectType", event.target.value)}
            className={fieldClass(errors.projectType)}
          >
            {projectTypes.map((type) => (
              <option key={type} value={type} className="bg-charcoal text-ivory">
                {type}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Project Location" error={errors.projectLocation}>
          <input
            id="projectLocation"
            name="projectLocation"
            value={form.projectLocation}
            onChange={(event) => update("projectLocation", event.target.value)}
            className={fieldClass(errors.projectLocation)}
          />
        </Field>
      </div>

      <Field label="Message" error={errors.message}>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={form.message}
          onChange={(event) => update("message", event.target.value)}
          className={cn(fieldClass(errors.message), "min-h-[140px] resize-y")}
        />
      </Field>

      <MagneticButton type="submit" variant="primary" disabled={submitting} className="w-full sm:w-auto">
        {submitting ? "Opening WhatsApp..." : "Send Enquiry via WhatsApp"}
      </MagneticButton>
    </form>
  );
}

function Field({
  label,
  hint,
  error,
  children
}: {
  label: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="grid gap-2">
      <span className="flex items-baseline justify-between gap-3">
        <span className="text-[0.68rem] font-medium uppercase tracking-[0.24em] text-ivory">
          {label}
        </span>
        {hint ? <span className="text-[0.62rem] uppercase tracking-[0.18em] text-stone">{hint}</span> : null}
      </span>
      {children}
      {error ? (
        <span className="text-xs text-red-400 font-medium" role="alert">
          {error}
        </span>
      ) : null}
    </label>
  );
}

function fieldClass(error?: string) {
  return cn(
    "w-full border-b border-white/20 bg-transparent px-0 py-3 text-sm text-ivory placeholder-stone/50 outline-none transition-colors duration-300 focus:border-bronze",
    error && "border-red-500 focus:border-red-500"
  );
}

