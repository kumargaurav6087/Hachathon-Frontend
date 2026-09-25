import { Suspense } from "react";
import Settings from "@/components/Settings/Settings";

const SettingsPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Settings />
    </Suspense>
  );
};

export default SettingsPage;