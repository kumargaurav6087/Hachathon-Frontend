import { Suspense } from "react";
import Leaderboard from "@/components/Leaderboard/Leaderboard";

const LeaderboardPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Leaderboard />
    </Suspense>
  );
};

export default LeaderboardPage;