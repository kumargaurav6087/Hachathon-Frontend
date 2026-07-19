"use client";

import { useState } from "react";

const FAQItem = ({ question, answer }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="mb-4 rounded-xl border border-gray-200 bg-white shadow">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between p-5 text-left"
      >
        <h3 className="text-lg font-semibold text-gray-800">
          {question}
        </h3>

        <span className="text-2xl font-bold">
          {open ? "-" : "+"}
        </span>
      </button>

      {open && (
        <div className="px-5 pb-5">
          <p className="leading-7 text-gray-600">
            {answer}
          </p>
        </div>
      )}
    </div>
  );
};

export default FAQItem;