const companies = [
  "AB InBev",
  "Amazon",
  "boAt",
  "Flipkart",
  "Google",
  "Microsoft",
];

const TrustedCompanies = () => {
  return (
    <section className="overflow-hidden border-y border-slate-100 py-12 sm:py-14 lg:py-16">
      {/* Heading */}
      <div className="text-center">
        <p className="text-[11px] font-black uppercase tracking-[0.22em] text-slate-400 sm:text-xs">
          Trusted by industry leaders
        </p>

        <h2 className="mt-3 text-xl font-black tracking-[-0.03em] text-slate-950 sm:text-2xl">
          Opportunities from leading companies
        </h2>
      </div>

      {/* Mobile horizontal scroll */}
      <div className="-mx-4 mt-8 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-3 scrollbar-hide sm:hidden">
        {companies.map((company) => (
          <div
            key={company}
            className="
              flex
              min-w-[145px]
              snap-start
              items-center
              justify-center
              rounded-2xl
              border
              border-slate-200/80
              bg-white
              px-5
              py-5
              text-base
              font-black
              tracking-[-0.02em]
              text-slate-500
              shadow-sm
            "
          >
            {company}
          </div>
        ))}
      </div>

      {/* Tablet / Desktop */}
      <div className="mt-10 hidden grid-cols-3 items-center gap-4 sm:grid lg:grid-cols-6">
        {companies.map((company) => (
          <div
            key={company}
            className="
              flex
              min-h-[82px]
              items-center
              justify-center
              rounded-2xl
              border
              border-transparent
              px-3
              text-center
              text-lg
              font-black
              tracking-[-0.025em]
              text-slate-400
              grayscale
              transition
              duration-300

              hover:-translate-y-1
              hover:border-slate-200
              hover:bg-slate-50
              hover:text-slate-900
              hover:grayscale-0
            "
          >
            {company}
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrustedCompanies;