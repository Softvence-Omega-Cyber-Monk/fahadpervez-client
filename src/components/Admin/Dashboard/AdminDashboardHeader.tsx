import { Input } from "../../ui/input";

const AdminDashboardHeader = () => {
  return (
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-semibold">Welcome back, Admin!</h2>
      <Input
        type="search"
        placeholder="Search..."
        className="md:w-[100px] lg:w-[300px]"
      />
    </div>
  );
};

export default AdminDashboardHeader;
