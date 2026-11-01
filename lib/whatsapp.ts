export interface CateringWhatsAppDetails {
  firstName?: string;
  lastName?: string;
  fullName?: string;
  phone?: string;
  email?: string;
  location?: string;
  service?: string;
  serviceType?: string;
  eventDate?: string;
  guestCount?: string;
  message?: string;
  customMessage?: string;
  selectedDishes?: string[];
}

export function buildWhatsAppLink(details?: CateringWhatsAppDetails): string {
  const baseNumber = "919967894979";
  const divider = "--------------------------------------------------";
  
  if (!details) {
    const defaultText = "Hello Nanda Caterers! I would like to enquire about your catering services.";
    return `https://wa.me/${baseNumber}?text=${encodeURIComponent(defaultText)}`;
  }

  const lines: string[] = [
    divider,
    "*NANDA CATERERS - CATERING ENQUIRY*",
    divider,
  ];

  const clientName =
    details.fullName ||
    [details.firstName, details.lastName].filter(Boolean).join(" ") ||
    "Valued Client";
  lines.push(`>> *Client Name:* ${clientName}`);

  if (details.phone) {
    lines.push(`>> *Contact Phone:* ${details.phone}`);
  }

  if (details.email) {
    lines.push(`>> *Email Address:* ${details.email}`);
  }

  const srv = details.service || details.serviceType || "Wedding";
  lines.push(`>> *Catering Service:* ${srv}`);

  if (details.eventDate) {
    lines.push(`>> *Event Date:* ${details.eventDate}`);
  }
  if (details.guestCount) {
    lines.push(`>> *Estimated Guests:* ${details.guestCount}`);
  }
  if (details.location) {
    lines.push(`>> *Event Location:* ${details.location}`);
  }

  const msg = details.message || details.customMessage;
  if (msg) {
    lines.push(`>> *Special Notes:* ${msg}`);
  }

  if (details.selectedDishes && details.selectedDishes.length > 0) {
    lines.push("");
    lines.push(`*Selected Menu Dishes (${details.selectedDishes.length}):*`);
    details.selectedDishes.forEach((dish) => {
      lines.push(`   * ${dish}`);
    });
  }

  lines.push(divider);
  lines.push("_Submitted via nandacaterers.com_");

  return `https://wa.me/${baseNumber}?text=${encodeURIComponent(lines.join("\n"))}`;
}
