import { Suspense } from "react";
import Help from "@/components/Help/Help";

const HelpPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Help />
    </Suspense>
  );
};

export default HelpPage;