import StatCard from "./StatCard";

const Statistics = () => {
  const statistics = [
    {
      id: 1,
      number: "50+",
      title: "Hackathons",
    },
    {
      id: 2,
      number: "5K+",
      title: "Participants",
    },
    {
      id: 3,
      number: "1K+",
      title: "Projects Submitted",
    },
    {
      id: 4,
      number: "100+",
      title: "Winners",
    },
  ];

  return (
    <section className="bg-blue-600 py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 text-center text-white">
          <p className="font-semibold text-blue-200">
            OUR COMMUNITY
          </p>

          <h2 className="mt-2 text-3xl font-bold md:text-5xl">
            Growing Every Day
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-blue-100">
            Join our growing community of participants, organizers,
            mentors and judges.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {statistics.map((statistic) => (
            <StatCard
              key={statistic.id}
              number={statistic.number}
              title={statistic.title}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Statistics;