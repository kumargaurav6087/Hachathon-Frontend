import { Suspense } from "react";
import Certificates from "@/components/Certificates/Certificates";

const CertificatesPage = () => {
  return (
    <Suspense fallback={<div>Loading certificates...</div>}>
      <Certificates />
    </Suspense>
  );
};

export default CertificatesPage;