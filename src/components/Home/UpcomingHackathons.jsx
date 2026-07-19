import HackathonCard from "./HackathonCard";

const UpcomingHackathons = () => {
  const hackathons = [
    {
      id: 1,
      title: "AI Innovation Challenge",
      date: "20 Aug 2026",
      location: "Mumbai",
      mode: "Offline",
      prize: "₹1,00,000",
    },
    {
      id: 2,
      title: "Smart India Hackathon",
      date: "12 Sep 2026",
      location: "Delhi",
      mode: "Hybrid",
      prize: "₹5,00,000",
    },
    {
      id: 3,
      title: "CodeFest 2026",
      date: "28 Sep 2026",
      location: "Online",
      mode: "Online",
      prize: "₹2,50,000",
    },
  ];

  return (
    <section className="bg-gray-100 py-20">
      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-12 text-center">
          <p className="font-semibold text-blue-600">
            EVENTS
          </p>

          <h2 className="mt-2 text-4xl font-bold">
            Upcoming Hackathons
          </h2>

          <p className="mt-4 text-gray-600">
            Participate in exciting hackathons and showcase your skills.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {hackathons.map((item) => (
            <HackathonCard
              key={item.id}
              title={item.title}
              date={item.date}
              location={item.location}
              mode={item.mode}
              prize={item.prize}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default UpcomingHackathons;