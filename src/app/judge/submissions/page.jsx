import JudgeSubmissions from "@/components/Judge/JudgeSubmissions";
import RoleGuard from "@/components/Auth/RoleGuard";

const JudgeSubmissionsPage = () => {
  return (
    <RoleGuard allowedRoles={["judge", "admin"]}>
      <JudgeSubmissions />
    </RoleGuard>
  );
};

export default JudgeSubmissionsPage;