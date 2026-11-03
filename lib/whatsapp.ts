export const WHATSAPP_PHONE = "919967894979"; // country code + number, digits only, no + or spaces

export interface WhatsAppDetails {
  name?: string;
  fullName?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  email?: string;
  event?: string;
  service?: string;
  serviceType?: string;
  eventType?: string;
  date?: string;
  eventDate?: string;
  guests?: string | number;
  guestCount?: string | number;
  exactGuests?: string;
  guestRange?: string;
  location?: string;
  city?: string;
  notes?: string;
  message?: string;
  customMessage?: string;
  specialRequests?: string;
  menuPreference?: string;
  selectedDishes?: string[];
}

export type CateringWhatsAppDetails = WhatsAppDetails;

/**
 * Builds the plain text WhatsApp enquiry message.
 * Uses high-elegance Unicode iconography (✦, ◆, ☏, ★, ▦, ◉, ⚲, ❖, •) that are 100% immune
 * to WhatsApp Web/Desktop/wa.me encoding bugs, never degrading into '?' or ''.
 */
export function buildWhatsAppMessage(details: WhatsAppDetails = {}): string {
  const name =
    details.name ||
    details.fullName ||
    [details.firstName, details.lastName].filter(Boolean).join(" ") ||
    "-";

  const phone = details.phone || "-";

  const event =
    details.event ||
    details.service ||
    details.serviceType ||
    details.eventType ||
    "-";

  const date = details.date || details.eventDate || "-";

  const guests =
    details.guests != null && String(details.guests).trim() !== ""
      ? String(details.guests)
      : details.guestCount != null && String(details.guestCount).trim() !== ""
      ? String(details.guestCount)
      : details.exactGuests && details.exactGuests.trim() !== ""
      ? `${details.exactGuests.trim()} guests`
      : details.guestRange && details.guestRange.trim() !== ""
      ? details.guestRange
      : "-";

  const location = details.location || details.city || "-";

  const notes =
    details.notes ||
    details.message ||
    details.customMessage ||
    details.specialRequests;

  const menuPref = details.menuPreference;
  const dishes =
    details.selectedDishes && details.selectedDishes.length > 0
      ? details.selectedDishes
      : null;

  let message =
`✦ *Namaste Nanda Caterers!* ✦

I would like to enquire about your catering services.

◆ *Name:* ${name}
☏ *Phone:* ${phone}
★ *Event:* ${event}
▦ *Date:* ${date}
◉ *Guests:* ${guests}
⚲ *Location:* ${location}`;

  if (details.email && details.email.trim()) {
    message += `\n✉ *Email:* ${details.email.trim()}`;
  }

  if (menuPref) {
    message += `\n❖ *Menu Preference:* ${menuPref}`;
  }

  if (notes) {
    message += `\n✎ *Notes:* ${notes}`;
  }

  if (dishes) {
    message += `\n\n❖ *Selected Dishes (${dishes.length}):*\n` + dishes.map((d) => `  • ${d}`).join("\n");
  }

  message += `\n\n✦ Please share your menu and pricing. Thank you!`;

  return message;
}

/**
 * Generates the WhatsApp URL.
 * Uses api.whatsapp.com directly to bypass wa.me's intermediate 302 redirect.
 */
export function getWhatsAppUrl(details: WhatsAppDetails = {}): string {
  const message = buildWhatsAppMessage(details);
  return `https://api.whatsapp.com/send?phone=${WHATSAPP_PHONE}&text=${encodeURIComponent(message)}`;
}

/**
 * Alias for getWhatsAppUrl.
 */
export const getWhatsAppApiUrl = getWhatsAppUrl;
export const buildWhatsAppLink = getWhatsAppUrl;

/**
 * ONE reusable function to trigger WhatsApp across the entire application.
 * Opens directly in WhatsApp / WhatsApp Web and logs the preview in the browser console.
 */
export function openWhatsApp(details: WhatsAppDetails = {}): void {
  const url = getWhatsAppUrl(details);

  if (typeof window !== "undefined") {
    const textPart = url.split("text=")[1];
    if (textPart) {
      console.log("[WhatsApp] Opening URL:", url);
      console.log("[WhatsApp] Decoded message preview:\n" + decodeURIComponent(textPart));
    }
    window.open(url, "_blank", "noopener,noreferrer");
  }
}
