import Analytics from "@/components/Analytics/Analytics";
import RoleGuard from "@/components/Auth/RoleGuard";

export default function AnalyticsPage() {
  return (
    <RoleGuard
      allowedRoles={[
        "admin",
      ]}
    >
      <Analytics />
    </RoleGuard>
  );
}