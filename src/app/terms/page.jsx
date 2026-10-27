import Header from "@/components/Home/Header";
import Sidebar from "@/components/Home/Sidebar";
import Link from "next/link";
import { FileText, ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Terms & Conditions | NexKripa Social Innovation",
  description: "Terms and conditions of participation in NexKripa Social Innovation Hackathons",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <Sidebar />
      <div className="min-h-screen pl-0 md:pl-19">
        <Header />
        <div className="mx-auto max-w-4xl px-6 py-12 lg:py-16">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-violet-700 hover:text-violet-900 mb-8"
          >
            <ArrowLeft size={16} /> Back to Home
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-100 text-violet-700">
              <FileText size={24} />
            </span>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-violet-700">NexKripa Platform</span>
              <h1 className="text-3xl font-black text-slate-950 sm:text-4xl">Terms & Conditions</h1>
            </div>
          </div>
          <p className="text-sm text-slate-500 mb-8">Effective date: October 2026 • Governs challenges, hackathons, and community contributions.</p>

          <div className="prose prose-slate max-w-none space-y-6 text-slate-700 leading-relaxed text-sm sm:text-base">
            <section className="rounded-2xl border border-slate-200/80 bg-slate-50/50 p-6">
              <h2 className="text-lg font-bold text-slate-900 mb-2">1. Social Innovation Charter</h2>
              <p>
                By reporting community problems or participating in NexKripa hackathons, participants agree that all problem statements aim to advance civic welfare across our 9 core domains: Environment, Waste Management, Education, Healthcare, Transportation, Accessibility, Public Safety, Water Conservation, and Rural Development.
              </p>
            </section>

            <section className="rounded-2xl border border-slate-200/80 bg-slate-50/50 p-6">
              <h2 className="text-lg font-bold text-slate-900 mb-2">2. Authentic Problem Statements</h2>
              <p>
                Community problem reporters confirm that reported issues represent bona fide civic challenges in their local neighborhoods or regions. Defamatory, commercial advertising, or spurious submissions are moderated and rejected by platform reviewers.
              </p>
            </section>

            <section className="rounded-2xl border border-slate-200/80 bg-slate-50/50 p-6">
              <h2 className="text-lg font-bold text-slate-900 mb-2">3. Intellectual Property & Open Source</h2>
              <p>
                Participant teams retain intellectual property over their prototype submissions while granting open civic access for pilot implementations with local communities and non-profit partners. Plagiarism or submission of pre-existing commercial products is strictly prohibited.
              </p>
            </section>

            <section className="rounded-2xl border border-slate-200/80 bg-slate-50/50 p-6">
              <h2 className="text-lg font-bold text-slate-900 mb-2">4. Evaluation & Fair Judging</h2>
              <p>
                Judge scores and rankings are final. Verified certificates of participation and merit are issued through the NexKripa cryptographic verification engine based on recorded evaluation metrics.
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
