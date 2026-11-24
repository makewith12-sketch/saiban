import React from 'react';
import { Phone } from 'lucide-react';

interface FloatingContactActionsProps {
  phoneNumber?: string;
  whatsappMessage?: string;
}

export const FloatingContactActions: React.FC<FloatingContactActionsProps> = ({
  phoneNumber = '+918127727747',
  whatsappMessage = 'Hello! I would like to inquire about loan options.',
}) => {
  // Strip '+' and spaces for wa.me URL format (918127727747)
  const cleanWaNumber = phoneNumber.replace(/[^0-9]/g, '');
  const whatsappUrl = `https://wa.me/${cleanWaNumber}?text=${encodeURIComponent(whatsappMessage)}`;
  const telUrl = `tel:${phoneNumber.replace(/\s+/g, '')}`;

  return (
    <div
      aria-label="Quick contact actions"
      className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3.5 sm:bottom-7 sm:right-7"
    >
      {/* Direct Phone Call Button */}
      <a
        href={telUrl}
        aria-label="Call +91 8127727747"
        className="group relative flex h-13 w-13 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-[#0052cc] text-white shadow-[0_10px_25px_rgba(0,82,204,0.4)] ring-2 ring-white transition-all duration-300 hover:scale-110 hover:bg-blue-700 active:scale-95"
      >
        {/* Hover Tooltip */}
        <span className="pointer-events-none absolute right-16 hidden whitespace-nowrap rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-bold text-white opacity-0 shadow-md transition-opacity duration-200 group-hover:opacity-100 sm:block">
          Call +91 81277 27747
        </span>
        <Phone className="h-6 w-6 fill-current" />
      </a>

      {/* WhatsApp Chat Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="group relative flex h-13 w-13 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_25px_rgba(37,211,102,0.45)] ring-2 ring-white transition-all duration-300 hover:scale-110 hover:bg-[#1ebe5d] active:scale-95"
      >
        {/* Subtle Pulse Ring */}
        <span className="pointer-events-none absolute inset-0 rounded-full bg-[#25D366] opacity-30 animate-ping" />

        {/* Hover Tooltip */}
        <span className="pointer-events-none absolute right-16 hidden whitespace-nowrap rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-bold text-white opacity-0 shadow-md transition-opacity duration-200 group-hover:opacity-100 sm:block">
          WhatsApp Chat
        </span>

        {/* Official WhatsApp SVG Icon */}
        <svg
          viewBox="0 0 32 32"
          className="relative z-10 h-7 w-7 fill-current"
          aria-hidden="true"
        >
          <path d="M16.004 3.2c-7.06 0-12.8 5.74-12.8 12.8 0 2.256.588 4.458 1.706 6.4L3.09 28.8l6.564-1.722a12.74 12.74 0 0 0 6.35 1.722h.006c7.058 0 12.796-5.74 12.796-12.8 0-3.42-1.332-6.636-3.75-9.054A12.715 12.715 0 0 0 16.004 3.2Zm0 23.436h-.004a10.6 10.6 0 0 1-5.404-1.48l-.388-.23-3.896 1.022 1.04-3.798-.252-.402a10.575 10.575 0 0 1-1.622-5.648c0-5.864 4.772-10.636 10.64-10.636 2.842 0 5.512 1.108 7.52 3.118a10.568 10.568 0 0 1 3.114 7.522c0 5.866-4.772 10.632-10.634 10.632Zm5.834-7.968c-.32-.16-1.892-.934-2.186-1.04-.292-.106-.506-.16-.72.16-.212.32-.826 1.04-1.012 1.254-.186.212-.372.24-.692.08-.32-.16-1.35-.498-2.572-1.588-.95-.848-1.592-1.896-1.778-2.216-.186-.32-.02-.492.14-.652.144-.144.32-.372.48-.56.16-.186.212-.32.32-.532.106-.214.054-.4-.026-.56-.08-.16-.72-1.734-.986-2.374-.26-.624-.524-.54-.72-.55l-.614-.01c-.214 0-.56.08-.852.4-.294.32-1.12 1.094-1.12 2.668s1.146 3.094 1.306 3.308c.16.212 2.256 3.444 5.466 4.83.764.33 1.36.526 1.824.674.766.244 1.464.21 2.016.126.614-.092 1.892-.774 2.158-1.52.266-.748.266-1.388.186-1.52-.08-.134-.292-.214-.612-.374Z" />
        </svg>
      </a>
    </div>
  );
};

export default FloatingContactActions;