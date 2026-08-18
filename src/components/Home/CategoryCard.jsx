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
      className={`
        group
        relative
        flex
        min-h-[165px]
        h-full
        flex-col
        justify-between
        overflow-hidden
        rounded-[24px]
        border
        border-slate-200/80
        p-5
        shadow-[0_8px_25px_rgba(15,23,42,0.05)]
        transition
        duration-300

        active:scale-[0.98]

        sm:min-h-[180px]
        sm:p-6
        sm:hover:-translate-y-1.5
        sm:hover:border-slate-300
        sm:hover:shadow-[0_18px_40px_rgba(15,23,42,0.10)]

        ${cardBackground}
      `}
    >
      {/* Decorative glow */}
      <span
        className={`
          pointer-events-none
          absolute
          -right-8
          -top-8
          h-24
          w-24
          rounded-full
          opacity-40
          blur-2xl
          ${iconBackground}
        `}
      />

      {/* Top */}
      <div className="relative flex items-start justify-between">
        <span
          className={`
            flex
            h-12
            w-12
            shrink-0
            items-center
            justify-center
            rounded-2xl
            transition
            duration-300

            sm:h-14
            sm:w-14

            sm:group-hover:scale-105

            ${iconBackground}
            ${iconColor}
          `}
        >
          <Icon size={24} strokeWidth={1.9} />
        </span>

        <span
          className="
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-full
            border
            border-white/80
            bg-white/80
            text-slate-400
            shadow-sm
            backdrop-blur
            transition
            duration-300

            group-hover:text-slate-800

            sm:opacity-0
            sm:group-hover:translate-x-0.5
            sm:group-hover:-translate-y-0.5
            sm:group-hover:opacity-100
          "
        >
          <ArrowUpRight size={16} strokeWidth={2} />
        </span>
      </div>

      {/* Bottom */}
      <div className="relative mt-6 text-left">
        <h3 className="text-[17px] font-black tracking-[-0.025em] text-slate-950 sm:text-lg">
          {title}
        </h3>

        <p className={`mt-1.5 text-sm font-bold ${iconColor}`}>
          {events}
        </p>
      </div>
    </Link>
  );
};

export default CategoryCard;