import DashboardStats from "@/components/Dashboard/DashboardStats/DashboardStats";
import UserTable from "@/components/Dashboard/UserTable/UserTable";

export default function DashboardPage() {
  return (
    <div>
      <DashboardStats />
      <UserTable />
    </div>
  );
}
