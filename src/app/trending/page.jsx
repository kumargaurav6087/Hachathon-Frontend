import { Suspense } from "react";
import Trending from "@/components/Trending/Trending";

const TrendingPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Trending />
    </Suspense>
  );
};

export default TrendingPage;