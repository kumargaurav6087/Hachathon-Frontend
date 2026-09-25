import { Suspense } from "react";
import Reports from "@/components/Reports/Reports";

const ReportsPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Reports />
    </Suspense>
  );
};

export default ReportsPage;