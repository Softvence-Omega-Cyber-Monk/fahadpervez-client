import { Input } from "../../ui/input";

const AdminDashboardHeader = () => {
  return (
    <div className="flex flex-wrap justify-between items-center gap-4">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold">Welcome back, Admin!</h2>
      <Input
        type="search"
        placeholder="Search..."
        className="w-full max-w-xs sm:max-w-none sm:w-auto md:w-[100px] lg:w-[300px]"
      />
    </div>
  );
};

export default AdminDashboardHeader;
