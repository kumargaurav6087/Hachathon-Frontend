import Header from "@/components/Home/Header";
import Sidebar from "@/components/Home/Sidebar";
import Link from "next/link";
import { Shield, ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | NexKripa Social Innovation",
  description: "Privacy Policy for NexKripa Community-Based Hackathon Platform",
};

export default function PrivacyPolicyPage() {
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
              <Shield size={24} />
            </span>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-violet-700">NexKripa Platform</span>
              <h1 className="text-3xl font-black text-slate-950 sm:text-4xl">Privacy Policy</h1>
            </div>
          </div>
          <p className="text-sm text-slate-500 mb-8">Last updated: October 2026 • Effective for all community participants and organizers.</p>

          <div className="prose prose-slate max-w-none space-y-6 text-slate-700 leading-relaxed text-sm sm:text-base">
            <section className="rounded-2xl border border-slate-200/80 bg-slate-50/50 p-6">
              <h2 className="text-lg font-bold text-slate-900 mb-2">1. Purpose & Scope</h2>
              <p>
                NexKripa operates as a community-driven civic innovation platform. We collect minimal information required to verify problem submissions, form collaborative multidisciplinary teams, evaluate prototype submissions, and issue authentic completion certificates.
              </p>
            </section>

            <section className="rounded-2xl border border-slate-200/80 bg-slate-50/50 p-6">
              <h2 className="text-lg font-bold text-slate-900 mb-2">2. Data We Collect</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Citizen & Innovator Profiles:</strong> Name, email address, role, and skills/interests.</li>
                <li><strong>Community Problems:</strong> Title, description, category, impact area, and uploaded media evidence.</li>
                <li><strong>Hackathon Submissions:</strong> GitHub repositories, presentation decks, video demos, and project descriptions.</li>
              </ul>
            </section>

            <section className="rounded-2xl border border-slate-200/80 bg-slate-50/50 p-6">
              <h2 className="text-lg font-bold text-slate-900 mb-2">3. Transparency & Civic Open Data</h2>
              <p>
                Community-submitted challenges are published openly on the platform so researchers, developers, NGOs, and municipal bodies can review and solve them. Personal contact details of reporting citizens are kept private and accessible only to verified platform administrators.
              </p>
            </section>

            <section className="rounded-2xl border border-slate-200/80 bg-slate-50/50 p-6">
              <h2 className="text-lg font-bold text-slate-900 mb-2">4. Contact NexKripa Team</h2>
              <p>
                For privacy inquiries or account data removal requests, contact the NexKripa team at{" "}
                <a href="mailto:privacy@nexkripa.org" className="font-semibold text-violet-700 underline">
                  privacy@nexkripa.org
                </a>.
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
