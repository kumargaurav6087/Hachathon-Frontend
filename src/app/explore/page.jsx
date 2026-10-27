import { Suspense } from "react";
import Explore from "@/components/Explore/Explore";

export const metadata = {
  title: "Explore Challenges & Sprints | NexKripa Social Innovation",
  description: "Discover community problems and social innovation hackathon sprints.",
};

const ExplorePage = () => {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center text-sm font-semibold text-slate-500">Loading challenges...</div>}>
      <Explore />
    </Suspense>
  );
};

export default ExplorePage;