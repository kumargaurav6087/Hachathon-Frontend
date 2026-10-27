import Link from "next/link";
import { Sparkles, HeartHandshake, ShieldCheck, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-slate-900 bg-slate-950 text-slate-300">
      {/* TOP FOOTER */}
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:grid-cols-2 sm:px-6 sm:py-14 lg:grid-cols-4 lg:px-8 lg:py-16">
        {/* BRAND & MISSION */}
        <div>
          <Link
            href="/"
            className="flex items-center gap-2.5 text-2xl font-black tracking-tight text-white transition hover:text-violet-400"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-violet-600 to-purple-600 text-base font-black text-white shadow-md">
              N
            </span>
            <span>NexKripa</span>
          </Link>

          <p className="mt-4 max-w-sm text-xs leading-6 text-slate-400 sm:text-sm">
            Community-Based Hackathon for Social Innovation. Empowering grassroots citizens to voice real-world
            challenges and inspiring multidisciplinary innovators to build sustainable technology solutions.
          </p>

          <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-violet-900/60 bg-violet-950/40 px-3 py-1.5 text-xs font-semibold text-violet-300">
            <HeartHandshake size={14} className="text-violet-400" />
            Social Impact Driven
          </div>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="text-xs font-black uppercase tracking-wider text-white sm:text-sm">
            Innovation Hub
          </h3>

          <div className="mt-4 flex flex-col gap-2.5 text-xs text-slate-400 sm:text-sm">
            <FooterLink href="/">Home</FooterLink>
            <FooterLink href="/explore">Explore Challenges</FooterLink>
            <FooterLink href="/problems/new">Raise a Problem</FooterLink>
            <FooterLink href="/about">About the Project</FooterLink>
            <FooterLink href="/explore?tab=hackathons">Hackathon Sprints</FooterLink>
          </div>
        </div>

        {/* PLATFORM WORKFLOW */}
        <div>
          <h3 className="text-xs font-black uppercase tracking-wider text-white sm:text-sm">
            Platform Workflow
          </h3>

          <div className="mt-4 flex flex-col gap-2.5 text-xs text-slate-400 sm:text-sm">
            <FooterLink href="/dashboard">User Dashboard</FooterLink>
            <FooterLink href="/teams">Team Formation</FooterLink>
            <FooterLink href="/submit">Project Submissions</FooterLink>
            <FooterLink href="/certificates">Verified Certificates</FooterLink>
            <FooterLink href="/admin/moderation">Admin Moderation</FooterLink>
          </div>
        </div>

        {/* CONTACT & TEAM */}
        <div>
          <h3 className="text-xs font-black uppercase tracking-wider text-white sm:text-sm">
            NexKripa Team
          </h3>

          <div className="mt-4 space-y-3 text-xs leading-5 text-slate-400 sm:text-sm">
            <div className="flex items-center gap-2">
              <MapPin size={15} className="shrink-0 text-violet-400" />
              <span>Community Innovation Lab</span>
            </div>

            <div className="flex items-center gap-2">
              <Mail size={15} className="shrink-0 text-violet-400" />
              <a
                href="mailto:contact@nexkripa.org"
                className="transition hover:text-white"
              >
                contact@nexkripa.org
              </a>
            </div>

            <p className="pt-2 text-xs text-slate-500">
              Transforming citizen problem reports into viable civic prototypes and community deployments.
            </p>
          </div>
        </div>
      </div>

      {/* BOTTOM FOOTER */}
      <div className="border-t border-slate-900 bg-slate-950/80">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-6 text-center text-xs text-slate-500 sm:px-6 sm:text-sm md:flex-row md:items-center md:justify-between md:text-left lg:px-8">
          <p>
            © {new Date().getFullYear()} NexKripa Team — Community-Based Hackathon for Social Innovation. All rights reserved.
          </p>

          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 md:justify-end text-xs">
            <Link href="/privacy-policy" className="transition hover:text-slate-300">
              Privacy Policy
            </Link>
            <Link href="/terms" className="transition hover:text-slate-300">
              Terms & Conditions
            </Link>
            <Link href="/about" className="transition hover:text-slate-300">
              Methodology & Scope
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

const FooterLink = ({ href, children }) => {
  return (
    <Link
      href={href}
      className="w-fit transition hover:translate-x-1 hover:text-violet-300"
    >
      {children}
    </Link>
  );
};

export default Footer;