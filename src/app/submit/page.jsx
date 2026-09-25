import { Suspense } from "react";
import ProjectSubmission from "@/components/Submission/ProjectSubmission";

const SubmitPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProjectSubmission />
    </Suspense>
  );
};

export default SubmitPage;