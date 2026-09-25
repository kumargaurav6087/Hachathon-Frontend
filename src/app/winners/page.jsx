import { Suspense } from "react";
import Winners from "@/components/Winners/Winners";

const WinnersPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Winners />
    </Suspense>
  );
};

export default WinnersPage;