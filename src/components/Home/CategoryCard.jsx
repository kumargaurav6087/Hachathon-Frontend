import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const CategoryCard = ({
  title,
  events,
  href,
  icon: Icon,
  iconColor,
  iconBackground,
  cardBackground,
}) => {
  return (
    <Link
      href={href}
      className={`group relative flex min-h-[180px] flex-col items-center justify-center rounded-2xl border border-slate-200 p-6 text-center shadow-sm transition duration-300 hover:-translate-y-2 hover:border-slate-300 hover:shadow-xl ${cardBackground}`}
    >
      <span className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white text-slate-400 opacity-0 shadow-sm transition group-hover:opacity-100">
        <ArrowUpRight size={16} />
      </span>

      <span
        className={`mb-4 flex h-14 w-14 items-center justify-center rounded-full ${iconBackground} ${iconColor}`}
      >
        <Icon size={26} strokeWidth={1.8} />
      </span>

      <h3 className="text-base font-bold text-slate-950">{title}</h3>

      <p className={`mt-1 text-sm font-medium ${iconColor}`}>{events}</p>
    </Link>
  );
};

export default CategoryCard;