"use server";

/**
 * Reservation enquiries, posted to the Hotel Palacio dashboard.
 *
 * This runs on the server, not in the browser. That keeps the dashboard's
 * address out of the client bundle and sidesteps CORS entirely — the form is a
 * plain POST to this app, which then talks to the API machine-to-machine.
 *
 * The previous version composed a `mailto:` to a placeholder address, so every
 * enquiry either went nowhere or depended on the guest having a mail client
 * configured. Bookings are the one thing on this site that must not be lost.
 */

const API = process.env.CONTENT_API_URL;
const VENUE = "omara";

export type ReservationState = {
  status: "idle" | "sent" | "error";
  message?: string;
};

/** Trims, and treats a blank field as absent rather than as an empty string. */
function field(data: FormData, key: string): string | undefined {
  const v = data.get(key);
  if (typeof v !== "string") return undefined;
  const t = v.trim();
  return t.length ? t : undefined;
}

export async function submitReservation(
  _prev: ReservationState,
  data: FormData
): Promise<ReservationState> {
  const name = field(data, "name");
  const email = field(data, "email");
  const phone = field(data, "phone");

  // Mirrors what the API enforces, so the guest is told here rather than
  // after a round trip.
  if (!name) {
    return { status: "error", message: "Please tell us your name." };
  }
  if (!email && !phone) {
    return {
      status: "error",
      message: "Please leave an email address or a phone number so we can reply.",
    };
  }

  const partyRaw = field(data, "partySize");
  const partySize = partyRaw ? Number(partyRaw) : undefined;

  const payload = {
    name,
    email,
    phone,
    partySize: Number.isFinite(partySize) ? partySize : undefined,
    wantedFor: field(data, "wantedFor"),
    occasion: field(data, "occasion"),
    message: field(data, "message"),
  };

  if (!API) {
    // Never claim a booking landed when there is nowhere for it to land.
    return {
      status: "error",
      message:
        "Online booking is not configured yet. Please call us on +91 91270 00120 and we will take your table.",
    };
  }

  try {
    const res = await fetch(`${API}/api/${VENUE}/reservations`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
      // A booking is never worth serving from cache.
      cache: "no-store",
    });

    if (!res.ok) {
      const body = (await res.json().catch(() => ({}))) as { error?: string };
      return {
        status: "error",
        message:
          body.error ??
          "We could not send that just now. Please call us on +91 91270 00120.",
      };
    }

    return {
      status: "sent",
      message: "Thank you — we have your request and will confirm shortly.",
    };
  } catch {
    return {
      status: "error",
      message:
        "We could not reach our booking system. Please call us on +91 91270 00120.",
    };
  }
}
