import React from 'react';
import { MessageSquare } from 'lucide-react';

export const WhatsAppButton: React.FC = () => {
  const message = encodeURIComponent("Hello AB TechSol, I'd like to discuss a project.");
  const whatsappUrl = `https://wa.me/918861375377?text=${message}`;

  return (
    <aside aria-label="Quick Communication">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with AB TechSol on WhatsApp"
        className="fixed bottom-6 right-6 z-40 p-3.5 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center group"
      >
        <MessageSquare className="w-5 h-5 fill-white" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out text-xs font-semibold pl-0 group-hover:pl-2">
          Chat on WhatsApp
        </span>
      </a>
    </aside>
  );
};
