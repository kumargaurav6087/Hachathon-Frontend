"use client";

import { useMemo, useState } from "react";

import {
  BookOpen,
  ChevronDown,
  CircleHelp,
  FileText,
  Mail,
  MessageCircle,
  Search,
  Send,
  ShieldCheck,
  UserRound,
  Users,
} from "lucide-react";

import Header from "@/components/Home/Header";
import Sidebar from "@/components/Home/Sidebar";

const faqData = [
  {
    id: 1,
    category: "Account",
    question: "How do I create my HackOn account?",
    answer:
      "Open the authentication page, complete the registration form and login using your registered credentials.",
  },
  {
    id: 2,
    category: "Hackathons",
    question: "How can I register for a hackathon?",
    answer:
      "Open Explore or Upcoming, select a hackathon, check its eligibility and registration deadline, then use the registration option on the event page.",
  },
  {
    id: 3,
    category: "Teams",
    question: "How do I create or join a team?",
    answer:
      "You can create a team from the team section or join an existing team using its team code when team functionality is enabled for that hackathon.",
  },
  {
    id: 4,
    category: "Submission",
    question: "How do I submit my project?",
    answer:
      "Open Submit Project, select the hackathon and team, add project details, GitHub or demo links and required files, then submit before the deadline.",
  },
  {
    id: 5,
    category: "Certificates",
    question: "Where can I find my certificates?",
    answer:
      "Open the Certificates page after login. Eligible certificates will appear there with preview and download options.",
  },
  {
    id: 6,
    category: "Security",
    question: "What should I do if I notice suspicious activity?",
    answer:
      "Open the Security page, review recent login activity and active sessions, then logout from unknown devices and update your password.",
  },
];

const helpCategories = [
  {
    title: "Getting Started",
    description:
      "Learn how HackOn works and how to start participating.",
    icon: BookOpen,
    style: "bg-blue-50 text-blue-700",
  },
  {
    title: "Account & Profile",
    description:
      "Login, profile settings and account related guidance.",
    icon: UserRound,
    style: "bg-violet-50 text-violet-700",
  },
  {
    title: "Teams",
    description:
      "Help with team creation, joining and member management.",
    icon: Users,
    style: "bg-emerald-50 text-emerald-700",
  },
  {
    title: "Submissions",
    description:
      "Project submission, links, files and deadline related help.",
    icon: FileText,
    style: "bg-amber-50 text-amber-700",
  },
  {
    title: "Certificates",
    description:
      "Certificate availability, verification and download help.",
    icon: ShieldCheck,
    style: "bg-cyan-50 text-cyan-700",
  },
  {
    title: "Contact Support",
    description:
      "Still stuck? Send your question to the HackOn team.",
    icon: MessageCircle,
    style: "bg-rose-50 text-rose-700",
  },
];

const Help = () => {
  const [searchText, setSearchText] = useState("");
  const [openFaq, setOpenFaq] = useState(null);

  const [supportForm, setSupportForm] = useState({
    subject: "",
    message: "",
  });

  const [statusMessage, setStatusMessage] =
    useState("");

  const filteredFaqs = useMemo(() => {
    const query = searchText
      .trim()
      .toLowerCase();

    if (!query) {
      return faqData;
    }

    return faqData.filter((faq) => {
      return (
        faq.question
          .toLowerCase()
          .includes(query) ||
        faq.answer
          .toLowerCase()
          .includes(query) ||
        faq.category
          .toLowerCase()
          .includes(query)
      );
    });
  }, [searchText]);

  const handleSupportChange = (event) => {
    const { name, value } = event.target;

    setSupportForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSupportSubmit = (event) => {
    event.preventDefault();

    if (
      !supportForm.subject.trim() ||
      !supportForm.message.trim()
    ) {
      setStatusMessage(
        "Subject aur message dono fill karo.",
      );

      return;
    }

    setStatusMessage(
      "Support request submitted successfully.",
    );

    setSupportForm({
      subject: "",
      message: "",
    });

    window.setTimeout(() => {
      setStatusMessage("");
    }, 3000);
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f5f7fb] text-slate-950">
      <Sidebar />

      <div className="min-h-screen w-full md:pl-19">
        <Header />

        <section className="mx-auto w-full max-w-350 px-3 py-5 min-[380px]:px-4 sm:px-6 sm:py-7 lg:px-8 xl:px-10 xl:py-10">
          <HelpHero
            searchText={searchText}
            setSearchText={setSearchText}
          />

          <HelpCategories />

          <div className="mt-6 grid min-w-0 gap-6 xl:grid-cols-[1.15fr_0.85fr]">
            <FaqSection
              faqs={filteredFaqs}
              openFaq={openFaq}
              setOpenFaq={setOpenFaq}
            />

            <SupportSection
              supportForm={supportForm}
              onChange={handleSupportChange}
              onSubmit={handleSupportSubmit}
              statusMessage={statusMessage}
            />
          </div>
        </section>
      </div>
    </main>
  );
};

const HelpHero = ({
  searchText,
  setSearchText,
}) => {
  return (
    <section className="relative overflow-hidden rounded-2xl bg-slate-950 px-5 py-7 text-white sm:rounded-3xl sm:px-8 sm:py-9 lg:px-10">
      <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-blue-600/30 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-24 left-1/3 h-60 w-60 rounded-full bg-violet-600/20 blur-3xl" />

      <div className="relative">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3.5 py-2 text-xs font-bold text-blue-100">
          <CircleHelp size={15} />
          Help Centre
        </span>

        <h1 className="mt-5 text-3xl font-black tracking-[-0.04em] sm:text-4xl lg:text-5xl">
          How can we help?
        </h1>

        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base sm:leading-7">
          Search answers, explore common topics or
          contact the HackOn support team.
        </p>

        <div className="relative mt-6 max-w-2xl">
          <Search
            size={19}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            value={searchText}
            onChange={(event) =>
              setSearchText(
                event.target.value,
              )
            }
            placeholder="Search help articles..."
            className="h-13 w-full rounded-2xl border border-white/10 bg-white px-12 pr-4 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:ring-4 focus:ring-blue-500/20"
          />
        </div>
      </div>
    </section>
  );
};

const HelpCategories = () => {
  return (
    <section className="mt-6">
      <div className="mb-4">
        <h2 className="text-xl font-black text-slate-950 sm:text-2xl">
          Browse help topics
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Choose a category to quickly find help.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {helpCategories.map((item) => {
          const Icon = item.icon;

          return (
            <article
              key={item.title}
              className="min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg sm:rounded-3xl"
            >
              <div
                className={`flex h-11 w-11 items-center justify-center rounded-xl ${item.style}`}
              >
                <Icon size={20} />
              </div>

              <h3 className="mt-4 wrap-break-word text-base font-black text-slate-950">
                {item.title}
              </h3>

              <p className="mt-2 wrap-break-word text-sm leading-6 text-slate-500">
                {item.description}
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
};

const FaqSection = ({
  faqs,
  openFaq,
  setOpenFaq,
}) => {
  return (
    <section className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:rounded-3xl sm:p-6">
      <div>
        <h2 className="text-xl font-black text-slate-950">
          Frequently Asked Questions
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Quick answers to common questions.
        </p>
      </div>

      {faqs.length > 0 ? (
        <div className="mt-5 space-y-3">
          {faqs.map((faq) => {
            const isOpen =
              openFaq === faq.id;

            return (
              <article
                key={faq.id}
                className="overflow-hidden rounded-2xl border border-slate-200"
              >
                <button
                  type="button"
                  onClick={() =>
                    setOpenFaq(
                      isOpen
                        ? null
                        : faq.id,
                    )
                  }
                  className="flex w-full items-center justify-between gap-4 bg-white px-4 py-4 text-left transition hover:bg-slate-50 sm:px-5"
                >
                  <div className="min-w-0">
                    <span className="text-[10px] font-black uppercase tracking-wider text-blue-700">
                      {faq.category}
                    </span>

                    <p className="mt-1 wrap-break-word text-sm font-black text-slate-900">
                      {faq.question}
                    </p>
                  </div>

                  <ChevronDown
                    size={19}
                    className={`shrink-0 text-slate-400 transition-transform ${
                      isOpen
                        ? "rotate-180"
                        : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="border-t border-slate-100 bg-slate-50 px-4 py-4 sm:px-5">
                    <p className="wrap-break-word text-sm leading-6 text-slate-600">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      ) : (
        <div className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-5 py-12 text-center">
          <CircleHelp
            size={28}
            className="mx-auto text-slate-400"
          />

          <h3 className="mt-4 text-base font-black text-slate-900">
            No matching help found
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            Try another search keyword.
          </p>
        </div>
      )}
    </section>
  );
};

const SupportSection = ({
  supportForm,
  onChange,
  onSubmit,
  statusMessage,
}) => {
  return (
    <section className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:rounded-3xl sm:p-6">
      <div className="flex items-start gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
          <MessageCircle size={20} />
        </div>

        <div className="min-w-0">
          <h2 className="text-xl font-black text-slate-950">
            Contact Support
          </h2>

          <p className="mt-1 text-sm leading-6 text-slate-500">
            Answer nahi mila? Support team ko message
            bhejo.
          </p>
        </div>
      </div>

      {statusMessage && (
        <div className="mt-5 rounded-xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm font-semibold text-blue-700">
          {statusMessage}
        </div>
      )}

      <form
        onSubmit={onSubmit}
        className="mt-6 space-y-5"
      >
        <div>
          <label className="mb-2 block text-sm font-bold text-slate-700">
            Subject
          </label>

          <input
            type="text"
            name="subject"
            value={supportForm.subject}
            onChange={onChange}
            placeholder="What do you need help with?"
            className="h-12 w-full min-w-0 rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-50 sm:rounded-2xl"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-bold text-slate-700">
            Message
          </label>

          <textarea
            name="message"
            value={supportForm.message}
            onChange={onChange}
            rows={6}
            placeholder="Describe your issue..."
            className="w-full min-w-0 resize-none rounded-xl border border-slate-200 bg-white p-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-50 sm:rounded-2xl"
          />
        </div>

        <button
          type="submit"
          className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 text-sm font-bold text-white transition hover:bg-blue-700 sm:w-auto sm:px-6"
        >
          <Send size={17} />
          Send Request
        </button>
      </form>

      <div className="mt-6 border-t border-slate-100 pt-5">
        <div className="flex items-start gap-3 rounded-2xl bg-slate-50 p-4">
          <Mail
            size={19}
            className="mt-0.5 shrink-0 text-blue-700"
          />

          <div className="min-w-0">
            <p className="text-sm font-black text-slate-900">
              Email Support
            </p>

            <p className="mt-1 break-all text-xs text-slate-500">
              support@hackon.com
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Help;