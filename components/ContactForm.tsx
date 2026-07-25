"use client";

import { useState } from "react";

export default function ContactForm() {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const subject = encodeURIComponent(
      `Enquiry from ${data.get("name") || "the Omara website"}`
    );
    const body = encodeURIComponent(
      `Name: ${data.get("name")}\nEmail: ${data.get("email")}\nPhone: ${data.get(
        "phone"
      )}\n\n${data.get("message")}`
    );
    // Placeholder address — swap for the real reservations inbox
    window.location.href = `mailto:reservations@omara.example?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <form className="form" onSubmit={onSubmit}>
      <div className="form__row">
        <label>
          Name
          <input name="name" type="text" required autoComplete="name" />
        </label>
        <label>
          Email
          <input name="email" type="email" required autoComplete="email" />
        </label>
      </div>
      <div className="form__row">
        <label>
          Phone
          <input name="phone" type="tel" autoComplete="tel" />
        </label>
        <label>
          Occasion
          <input name="occasion" type="text" placeholder="Dinner, event…" />
        </label>
      </div>
      <label>
        Message
        <textarea name="message" rows={4} required />
      </label>
      <button type="submit">{sent ? "Opening your mail app…" : "Send enquiry"}</button>
    </form>
  );
}
