import { Suspense } from "react";
import Home from "@/components/Home/Home";

const Page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Home />
    </Suspense>
  );
};

export default Page;