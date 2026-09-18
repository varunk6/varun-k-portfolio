import { motion } from "framer-motion";
import { WhatsAppIcon } from "./BrandIcons";
import { WHATSAPP_NUMBER } from "../data/navigation";

export default function WhatsAppButton() {
  // If no verified number is configured, the WhatsApp widget remains completely hidden.
  // Visitors will never see any configuration or error warnings.
  const isConfigured =
    Boolean(WHATSAPP_NUMBER) &&
    typeof WHATSAPP_NUMBER === "string" &&
    WHATSAPP_NUMBER.trim() !== "" &&
    WHATSAPP_NUMBER !== "YOUR_NUMBER_HERE" &&
    WHATSAPP_NUMBER !== "YOUR_REAL_WHATSAPP_NUMBER" &&
    WHATSAPP_NUMBER !== "REPLACE_WITH_VERIFIED_NUMBER";

  if (!isConfigured) {
    return null;
  }

  // Sanitize number: remove '+', spaces, hyphens, brackets and non-digit characters
  const rawDigits = WHATSAPP_NUMBER.replace(/[^0-9]/g, "");

  // If sanitized number is too short, do not create a broken link
  if (rawDigits.length < 7) {
    return null;
  }

  // For Indian phone numbers (10 digits), ensure the 91 country code is present
  const cleanNumber = rawDigits.length === 10 ? `91${rawDigits}` : rawDigits;

  // Pre-filled professional message safely URL-encoded
  const prefilledText = encodeURIComponent(
    "Hi Varun, I visited your portfolio and would like to connect with you."
  );

  const whatsappUrl = `https://wa.me/${cleanNumber}?text=${prefilledText}`;

  return (
    <aside
      aria-label="WhatsApp quick chat"
      className="fixed bottom-20 md:bottom-6 right-4 md:right-6 z-40"
    >
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        data-cursor-hover
        initial={{ opacity: 0, scale: 0.85, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="group relative flex items-center justify-center gap-2.5 bg-[#25D366] text-white p-3 md:py-2.5 md:px-4 rounded-full shadow-[0_8px_25px_rgba(37,211,102,0.4)] hover:shadow-[0_10px_32px_rgba(37,211,102,0.6)] hover:brightness-105 transition-all duration-300 focus-visible:outline-2 focus-visible:outline-[#25D366] focus-visible:outline-offset-4"
      >
        {/* Subtle Ambient Pulse Ring */}
        <span
          aria-hidden="true"
          className="absolute inset-0 rounded-full bg-[#25D366] opacity-30 animate-ping pointer-events-none -z-10"
          style={{ animationDuration: "3s" }}
        />

        {/* Circular WhatsApp Icon */}
        <div className="flex items-center justify-center shrink-0">
          <WhatsAppIcon
            size={22}
            className="text-white drop-shadow-sm transition-transform duration-300 group-hover:scale-110"
          />
        </div>

        {/* Desktop Agency Label: "Chat on WhatsApp" */}
        <span className="hidden md:inline font-sans text-xs font-semibold tracking-wide text-white pr-1 select-none whitespace-nowrap">
          Chat on WhatsApp
        </span>
      </motion.a>
    </aside>
  );
}
