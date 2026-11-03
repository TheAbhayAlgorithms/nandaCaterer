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
  menuPreference?: string;
  message?: string;
  customMessage?: string;
  selectedDishes?: string[];
}

export function buildWhatsAppLink(details?: CateringWhatsAppDetails): string {
  const baseNumber = "919967894979";
  const divider = "━━━━━━━━━━━━━━━━━━━━━━━━━━━━";

  if (!details) {
    const defaultLines = [
      "👑 *NANDA CATERERS*",
      "🍽️ _A Perfect Blend of Sensational Food_",
      "🌐 https://nandacaterer.com/logo.png",
      "",
      divider,
      "Hello Nanda Caterers! I would like to enquire about your catering services.",
      divider,
      "",
      "For more information",
      "visit - nandacaterer.com",
    ];
    return `https://wa.me/${baseNumber}?text=${encodeURIComponent(defaultLines.join("\n"))}`;
  }

  const hasClientInfo = Boolean(
    details.fullName?.trim() ||
    details.firstName?.trim() ||
    details.lastName?.trim() ||
    details.phone?.trim()
  );

  const hasDishesOnly = !hasClientInfo && details.selectedDishes && details.selectedDishes.length > 0;

  if (hasDishesOnly) {
    const dishesLines: string[] = [
      "👑 *NANDA CATERERS*",
      "🍽️ _A Perfect Blend of Sensational Food_",
      "🌐 https://nandacaterer.com/logo.png",
      "",
      divider,
      "🍽️ *MENU DISHES SELECTION*",
      divider,
      "Hello Nanda Caterers! I have selected the following dishes from your website menu:",
      "",
      `• 🥘 *Selected Menu Dishes (${details.selectedDishes!.length}):*`,
    ];

    details.selectedDishes!.forEach((dish) => {
      dishesLines.push(`   ▪️ ${dish}`);
    });

    dishesLines.push("");
    dishesLines.push("Please share catering availability and estimate packages for these items.");
    dishesLines.push(divider);
    dishesLines.push("For more information");
    dishesLines.push("visit - nandacaterer.com");

    return `https://wa.me/${baseNumber}?text=${encodeURIComponent(dishesLines.join("\n"))}`;
  }

  const lines: string[] = [
    "👑 *NANDA CATERERS*",
    "🍽️ _A Perfect Blend of Sensational Food_",
    "🌐 https://nandacaterer.com/logo.png",
    "",
    divider,
    "📋 *NEW CATERING ENQUIRY*",
    divider,
  ];

  const clientName =
    details.fullName?.trim() ||
    [details.firstName, details.lastName].filter(Boolean).join(" ").trim() ||
    "Valued Client";
  lines.push(`• 👤 *Client Name:* ${clientName}`);

  if (details.phone?.trim()) {
    lines.push(`• 📞 *Contact Phone:* ${details.phone.trim()}`);
  }

  if (details.email?.trim()) {
    lines.push(`• ✉️ *Email Address:* ${details.email.trim()}`);
  }

  const srv = details.service || details.serviceType || "General Event";
  lines.push(`• 🍽️ *Catering Service:* ${srv}`);

  if (details.eventDate) {
    lines.push(`• 📅 *Event Date:* ${details.eventDate}`);
  }
  if (details.guestCount) {
    lines.push(`• 👥 *Estimated Guests:* ${details.guestCount}`);
  }
  if (details.location?.trim()) {
    lines.push(`• 📍 *Event Location:* ${details.location.trim()}`);
  }
  if (details.menuPreference?.trim()) {
    lines.push(`• 🥗 *Menu Preference:* ${details.menuPreference.trim()}`);
  }

  const msg = details.message || details.customMessage;
  if (msg?.trim()) {
    lines.push(`• 📝 *Special Notes:* ${msg.trim()}`);
  }

  if (details.selectedDishes && details.selectedDishes.length > 0) {
    lines.push("");
    lines.push(`• 🥘 *Selected Menu Dishes (${details.selectedDishes.length}):*`);
    details.selectedDishes.forEach((dish) => {
      lines.push(`   ▪️ ${dish}`);
    });
  }

  lines.push(divider);
  lines.push("For more information");
  lines.push("visit - nandacaterer.com");

  return `https://wa.me/${baseNumber}?text=${encodeURIComponent(lines.join("\n"))}`;
}
