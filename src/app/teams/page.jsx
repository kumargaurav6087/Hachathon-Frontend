import { Suspense } from "react";
import Teams from "@/components/Teams/Teams";

const TeamsPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Teams />
    </Suspense>
  );
};

export default TeamsPage;