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
    <section className="border-y border-slate-100 py-16">
      <p className="text-center text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
        Trusted by industry veterans
      </p>

      <div className="mt-10 grid grid-cols-2 items-center gap-7 text-center sm:grid-cols-3 lg:grid-cols-6">
        {companies.map((company) => (
          <div
            key={company}
            className="text-lg font-bold text-slate-400 grayscale transition hover:text-slate-800 hover:grayscale-0"
          >
            {company}
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrustedCompanies;