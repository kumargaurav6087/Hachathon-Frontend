import { Suspense } from "react";
import Security from "@/components/Security/Security";

const SecurityPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Security />
    </Suspense>
  );
};

export default SecurityPage;