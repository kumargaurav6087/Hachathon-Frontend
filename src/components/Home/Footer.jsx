import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-950 text-gray-300">
      {/* TOP FOOTER */}

      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:grid-cols-2 sm:px-5 sm:py-14 lg:grid-cols-4 lg:px-2 lg:py-16 xl:px-0">
        {/* BRAND */}

        <div>
          <Link
            href="/"
            className="inline-block text-2xl font-black tracking-[-0.03em] text-white transition hover:text-blue-400"
          >
            HackOn
          </Link>

          <p className="mt-4 max-w-sm text-sm leading-7 text-gray-400">
            A complete platform to discover, create,
            manage and participate in hackathons
            easily.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="#"
              aria-label="Facebook"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 text-sm font-bold text-gray-300 transition active:scale-95 hover:bg-[#1769c2] hover:text-white"
            >
              f
            </a>

            <a
              href="#"
              aria-label="Instagram"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 text-sm font-bold text-gray-300 transition active:scale-95 hover:bg-[#1769c2] hover:text-white"
            >
              IG
            </a>

            <a
              href="#"
              aria-label="LinkedIn"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 text-xs font-black text-gray-300 transition active:scale-95 hover:bg-[#1769c2] hover:text-white"
            >
              in
            </a>

            <a
              href="#"
              aria-label="GitHub"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 text-xs font-black text-gray-300 transition active:scale-95 hover:bg-[#1769c2] hover:text-white"
            >
              GH
            </a>
          </div>
        </div>

        {/* QUICK LINKS */}

        <div>
          <h3 className="text-sm font-black uppercase tracking-[0.08em] text-white sm:text-base">
            Quick Links
          </h3>

          <div className="mt-5 flex flex-col gap-3 text-sm text-gray-400">
            <FooterLink href="/">
              Home
            </FooterLink>

            <FooterLink href="/explore">
              Explore
            </FooterLink>

            <FooterLink href="/upcoming">
              Upcoming
            </FooterLink>

            <FooterLink href="/trending">
              Trending
            </FooterLink>
          </div>
        </div>

        {/* PLATFORM */}

        <div>
          <h3 className="text-sm font-black uppercase tracking-[0.08em] text-white sm:text-base">
            Platform
          </h3>

          <div className="mt-5 flex flex-col gap-3 text-sm text-gray-400">
            <FooterLink href="/dashboard">
              Dashboard
            </FooterLink>

            <FooterLink href="/teams">
              Teams
            </FooterLink>

            <FooterLink href="/submit">
              Submissions
            </FooterLink>

            <FooterLink href="/certificates">
              Certificates
            </FooterLink>
          </div>
        </div>

        {/* CONTACT */}

        <div>
          <h3 className="text-sm font-black uppercase tracking-[0.08em] text-white sm:text-base">
            Contact
          </h3>

          <div className="mt-5 space-y-4 text-sm leading-6 text-gray-400">
            <p>
              Mumbai, Maharashtra, India
            </p>

            <a
              href="mailto:support@hackon.com"
              className="block break-all transition hover:text-white"
            >
              support@hackon.com
            </a>

            <p>
              HackOn Platform
            </p>
          </div>
        </div>
      </div>

      {/* BOTTOM FOOTER */}

      <div className="border-t border-gray-800">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-6 text-center text-xs text-gray-500 sm:px-5 sm:text-sm md:flex-row md:items-center md:justify-between md:text-left lg:px-2 xl:px-0">
          <p>
            © 2026 HackOn. All rights reserved.
          </p>

          <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 md:justify-end">
            <Link
              href="/privacy-policy"
              className="transition hover:text-white"
            >
              Privacy Policy
            </Link>

            <Link
              href="/terms"
              className="transition hover:text-white"
            >
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

const FooterLink = ({
  href,
  children,
}) => {
  return (
    <Link
      href={href}
      className="w-fit transition hover:translate-x-1 hover:text-white"
    >
      {children}
    </Link>
  );
};

export default Footer;