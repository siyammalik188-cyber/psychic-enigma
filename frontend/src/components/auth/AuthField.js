import React from "react";

export default function AuthField({
  label,
  icon: Icon,
  testId,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
  minLength,
  autoComplete,
}) {
  return (
    <label className="mt-6 block first:mt-8">
      <span className="text-xs uppercase tracking-[0.2em] font-semibold text-ink2">{label}</span>
      <div className="mt-3 flex items-center gap-3 rounded-2xl border border-line bg-canvas px-4 py-3 focus-within:border-sage transition-colors">
        <Icon size={18} className="text-ink3" />
        <input
          data-testid={testId}
          type={type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          required={required}
          minLength={minLength}
          autoComplete={autoComplete}
          className="w-full bg-transparent text-ink placeholder:text-ink3 outline-none"
        />
      </div>
    </label>
  );
}
