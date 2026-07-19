import SponsorCard from "./SponsorCard";

const Sponsors = () => {
  const sponsors = [
    {
      id: 1,
      name: "Google",
      logo: "https://placehold.co/200x80?text=Google",
    },
    {
      id: 2,
      name: "Microsoft",
      logo: "https://placehold.co/200x80?text=Microsoft",
    },
    {
      id: 3,
      name: "Amazon",
      logo: "https://placehold.co/200x80?text=Amazon",
    },
    {
      id: 4,
      name: "IBM",
      logo: "https://placehold.co/200x80?text=IBM",
    },
    {
      id: 5,
      name: "GitHub",
      logo: "https://placehold.co/200x80?text=GitHub",
    },
    {
      id: 6,
      name: "Infosys",
      logo: "https://placehold.co/200x80?text=Infosys",
    },
  ];

  return (
    <section className="bg-gray-100 py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 text-center">
          <p className="font-semibold text-blue-600">
            OUR PARTNERS
          </p>

          <h2 className="mt-2 text-3xl font-bold text-gray-900 md:text-5xl">
            Trusted By Leading Companies
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            Our hackathons are supported by innovative companies and
            technology partners.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          {sponsors.map((sponsor) => (
            <SponsorCard
              key={sponsor.id}
              name={sponsor.name}
              logo={sponsor.logo}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Sponsors;