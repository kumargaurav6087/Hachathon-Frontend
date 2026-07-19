import StepCard from "./StepCard";

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      step: "01",
      title: "Create Your Account",
      description:
        "Register as a participant and complete your profile information.",
    },
    {
      id: 2,
      step: "02",
      title: "Join a Hackathon",
      description:
        "Browse available hackathons and register for the event you like.",
    },
    {
      id: 3,
      step: "03",
      title: "Create Your Team",
      description:
        "Create a new team or join an existing team with other participants.",
    },
    {
      id: 4,
      step: "04",
      title: "Submit Your Project",
      description:
        "Upload your project files, presentation, PDF and GitHub repository.",
    },
  ];

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 text-center">
          <p className="font-semibold text-blue-600">
            SIMPLE PROCESS
          </p>

          <h2 className="mt-2 text-3xl font-bold text-gray-900 md:text-5xl">
            How It Works
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            Start your hackathon journey in four simple steps.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((item) => (
            <StepCard
              key={item.id}
              step={item.step}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;