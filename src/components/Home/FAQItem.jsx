"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-slate-200/80 py-4 transition-all">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between gap-4 text-left font-bold text-slate-900 transition hover:text-violet-600 sm:text-lg"
        aria-expanded={isOpen}
      >
        <span>{question}</span>
        <span
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 transition-transform duration-200 ${
            isOpen ? "rotate-180 bg-violet-100 text-violet-700" : "text-slate-500"
          }`}
        >
          <ChevronDown size={18} />
        </span>
      </button>

      {isOpen && (
        <div className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
          {answer}
        </div>
      )}
    </div>
  );
};

export default FAQItem;
