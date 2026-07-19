import FeatureCard from "./FeatureCard";

const Features = () => {
  const features = [
    {
      id: 1,
      icon: "🏆",
      title: "Manage Hackathons",
      description:
        "Create, update and manage complete hackathon events from one platform.",
    },
    {
      id: 2,
      icon: "👥",
      title: "Team Management",
      description:
        "Participants can create teams, join teams and manage their team members.",
    },
    {
      id: 3,
      icon: "📤",
      title: "Project Submission",
      description:
        "Submit project files, presentation, PDF and GitHub repository easily.",
    },
    {
      id: 4,
      icon: "⚖️",
      title: "Judge Evaluation",
      description:
        "Judges can review submissions, give scores and provide feedback.",
    },
    {
      id: 5,
      icon: "📊",
      title: "Live Leaderboard",
      description:
        "Display participant rankings and scores through a dynamic leaderboard.",
    },
    {
      id: 6,
      icon: "📜",
      title: "Certificates",
      description:
        "Generate and download certificates for participants and winners.",
    },
  ];

  return (
    <section className="bg-gray-100 py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 text-center">
          <p className="mb-2 font-semibold text-blue-600">
            PLATFORM FEATURES
          </p>

          <h2 className="text-3xl font-bold text-gray-900 md:text-5xl">
            Everything You Need
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            Manage your complete hackathon process from registration to
            winner announcement.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <FeatureCard
              key={feature.id}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;