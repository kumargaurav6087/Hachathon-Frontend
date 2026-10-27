import FAQItem from "./FAQItem";
import { HelpCircle } from "lucide-react";

const FAQ = () => {
  const faqs = [
    {
      id: 1,
      question: "How can citizens report real-world community problems?",
      answer:
        "Any community member or civic organization can click 'Raise a Problem', select one of our 9 focus categories (like Water Conservation, Waste Management, or Public Safety), provide location and issue details, and submit for moderator review.",
    },
    {
      id: 2,
      question: "Who can discover challenges and propose solutions?",
      answer:
        "Students, developers, UX designers, researchers, NGOs, and innovators can browse the Explore Challenges page, form multidisciplinary teams, claim problem statements, and submit functional prototypes.",
    },
    {
      id: 3,
      question: "What is the 5-stage Social Innovation lifecycle?",
      answer:
        "Challenges progress transparently through 5 milestones: 1. Citizen Report -> 2. Review & Moderation -> 3. Hackathon Sprints -> 4. Prototype Validation -> 5. Civic Community Deployment.",
    },
    {
      id: 4,
      question: "How are team submissions evaluated by judges?",
      answer:
        "Judges score solutions based on technological innovation, community relevance, feasibility, presentation quality, and measurable social impact.",
    },
    {
      id: 5,
      question: "Are certificates and participation verifiable?",
      answer:
        "Yes. NexKripa issues cryptographically verifiable digital certificates for team members, finalists, and winning innovators, ready for resumes and academic portfolios.",
    },
  ];

  return (
    <section className="rounded-3xl border border-violet-100 bg-gradient-to-b from-violet-50/30 to-white p-6 sm:p-10 lg:p-14">
      <div className="mx-auto max-w-4xl">
        <div className="mb-10 text-center">
          <div className="mx-auto inline-flex items-center gap-1.5 rounded-full bg-violet-100 px-3.5 py-1 text-xs font-bold text-violet-700">
            <HelpCircle size={14} />
            Platform FAQs
          </div>

          <h2 className="mt-3 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl lg:text-4xl">
            Frequently Asked Questions
          </h2>

          <p className="mt-2 text-xs text-slate-500 sm:text-sm">
            Everything you need to know about NexKripa&apos;s Community Social Innovation Platform.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq) => (
            <FAQItem
              key={faq.id}
              question={faq.question}
              answer={faq.answer}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;