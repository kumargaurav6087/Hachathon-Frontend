import { Suspense } from "react";
import Upcoming from "@/components/Upcoming/Upcoming";

const UpcomingPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Upcoming />
    </Suspense>
  );
};

export default UpcomingPage;