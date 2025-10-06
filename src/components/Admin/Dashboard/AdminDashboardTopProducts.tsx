import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";

const AdminDashboardTopProducts = () => {
  return (
    <div className="mt-5">
      <Card>
        <CardHeader>
          <CardTitle>Top Selling Products</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            <li className="flex justify-between items-center">
              <span>Product A</span>
              <span className="font-semibold">1200 Sales</span>
            </li>
            <li className="flex justify-between items-center">
              <span>Product B</span>
              <span className="font-semibold">1100 Sales</span>
            </li>
            <li className="flex justify-between items-center">
              <span>Product C</span>
              <span className="font-semibold">1000 Sales</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboardTopProducts;
