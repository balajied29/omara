"use client";

import { useActionState } from "react";
import { submitReservation, type ReservationState } from "@/app/actions";

const INITIAL: ReservationState = { status: "idle" };

export default function ContactForm() {
  // This version of useActionState returns pending as a third value, so the
  // form needs no separate useFormStatus child.
  const [state, formAction, pending] = useActionState(
    submitReservation,
    INITIAL
  );

  if (state.status === "sent") {
    return (
      <div className="form form--sent" role="status">
        <p className="title-m">{state.message}</p>
        <p className="small muted">
          If it is for tonight, do call us on{" "}
          <a href="tel:+919127000120">+91 91270 00120</a> as well.
        </p>
      </div>
    );
  }

  return (
    <form className="form" action={formAction}>
      <div className="form__row">
        <label>
          Name
          <input name="name" type="text" required autoComplete="name" />
        </label>
        <label>
          Email
          <input name="email" type="email" autoComplete="email" />
        </label>
      </div>
      <div className="form__row">
        <label>
          Phone
          <input name="phone" type="tel" autoComplete="tel" />
        </label>
        <label>
          Guests
          <input name="partySize" type="number" min={1} max={40} placeholder="2" />
        </label>
      </div>
      <div className="form__row">
        <label>
          Date and time
          <input name="wantedFor" type="datetime-local" />
        </label>
        <label>
          Occasion
          <input name="occasion" type="text" placeholder="Dinner, birthday…" />
        </label>
      </div>
      <label>
        Anything we should know
        <textarea name="message" rows={4} />
      </label>

      {/* Announced, not just coloured: this is the one form on the site where a
          silent failure costs the restaurant a booking. */}
      {state.status === "error" && (
        <p className="form__error" role="alert">
          {state.message}
        </p>
      )}

      <p className="small muted">
        An email address or a phone number is enough — we need one way to
        confirm.
      </p>

      <button type="submit" disabled={pending}>
        {pending ? "Sending…" : "Request a table"}
      </button>
    </form>
  );
}
