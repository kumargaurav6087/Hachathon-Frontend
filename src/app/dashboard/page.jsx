import { Suspense } from "react";
import Dashboard from "@/components/Dashboard/Dashboard";

const DashboardPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Dashboard />
    </Suspense>
  );
};

export default DashboardPage;