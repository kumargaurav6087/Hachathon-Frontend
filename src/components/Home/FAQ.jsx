import FAQItem from "./FAQItem";

const FAQ = () => {
  const faqs = [
    {
      id: 1,
      question: "How do I register for a hackathon?",
      answer:
        "Create an account, browse available hackathons and click Register.",
    },
    {
      id: 2,
      question: "Can I participate without a team?",
      answer:
        "Yes. You can register individually and later create or join a team.",
    },
    {
      id: 3,
      question: "How do I submit my project?",
      answer:
        "Go to your dashboard and upload your project files, PPT, PDF and GitHub repository link.",
    },
    {
      id: 4,
      question: "Who can see my submission?",
      answer:
        "Only judges and organizers can access your submitted project before results.",
    },
    {
      id: 5,
      question: "How are winners selected?",
      answer:
        "Judges evaluate projects based on innovation, implementation, presentation and impact.",
    },
  ];

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-4xl px-6">

        <div className="mb-12 text-center">
          <p className="font-semibold text-blue-600">
            FAQ
          </p>

          <h2 className="mt-2 text-4xl font-bold text-gray-900">
            Frequently Asked Questions
          </h2>

          <p className="mt-4 text-gray-600">
            Everything you need to know about our Hackathon Platform.
          </p>
        </div>

        {faqs.map((faq) => (
          <FAQItem
            key={faq.id}
            question={faq.question}
            answer={faq.answer}
          />
        ))}

      </div>
    </section>
  );
};

export default FAQ;