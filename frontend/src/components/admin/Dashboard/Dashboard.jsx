import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, ShoppingCart, Users, TrendingUp } from "lucide-react";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  // Sample data for the line graph (Sales Over Time)
  const lineChartData = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Total Sales",
        data: [1200, 1500, 1800, 2200, 2500, 2900],
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  // Line chart options
  const lineChartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Sales Over Time",
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
  };

  // Sample data for the bar graph (Sales by Month)
  const barChartData = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Sales by Month",
        data: [2000, 2200, 1800, 2100, 2400, 3000],
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Bar chart options
  const barChartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Monthly Sales Comparison",
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
  };

  // Sample data for top products (Bar chart)
  const topProductsData = {
    labels: ["Product 1", "Product 2", "Product 3", "Product 4", "Product 5"],
    datasets: [
      {
        label: "Top Products Sales",
        data: [1500, 1200, 1000, 800, 600],
        backgroundColor: "rgba(255, 159, 64, 0.5)",
        borderColor: "rgba(255, 159, 64, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Top products chart options
  const topProductsOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Top Selling Products",
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
  };

  return (
    <div className="container mx-auto py-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to your dashboard</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
        {/* Total Sales Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Sales
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231.89</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>

        {/* Total Orders Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Orders
            </CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+2350</div>
            <p className="text-xs text-muted-foreground">
              +180.1% from last month
            </p>
          </CardContent>
        </Card>

        {/* Products Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Products
            </CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+12,234</div>
            <p className="text-xs text-muted-foreground">
              +19% from last month
            </p>
          </CardContent>
        </Card>

        {/* Active Users Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Users
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+573</div>
            <p className="text-xs text-muted-foreground">
              +201 since last hour
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Graphs Section */}
      <div className="grid gap-6 mb-8 md:grid-cols-2 lg:grid-cols-2">
        {/* Line Chart - Sales Over Time */}
        <Card>
          <CardHeader>
            <CardTitle>Sales Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <Line data={lineChartData} options={lineChartOptions} />
          </CardContent>
        </Card>

        {/* Bar Chart - Sales by Month */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Sales Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <Bar data={barChartData} options={barChartOptions} />
          </CardContent>
        </Card>
      </div>

      {/* Top Products Bar Chart */}
      <div className="grid gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Top Selling Products</CardTitle>
          </CardHeader>
          <CardContent>
            <Bar data={topProductsData} options={topProductsOptions} />
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders */}
      <div className="grid gap-6 mb-8 md:grid-cols-2">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative w-full overflow-auto">
              <table className="w-full caption-bottom text-sm">
                <thead className="bg-muted/10">
                  <tr className="border-b">
                    <th className="h-12 px-6 text-left align-middle font-semibold text-muted-foreground">
                      Order ID
                    </th>
                    <th className="h-12 px-6 text-left align-middle font-semibold text-muted-foreground">
                      Customer
                    </th>
                    <th className="h-12 px-6 text-left align-middle font-semibold text-muted-foreground">
                      Product
                    </th>
                    <th className="h-12 px-6 text-left align-middle font-semibold text-muted-foreground">
                      Status
                    </th>
                    <th className="h-12 px-6 text-left align-middle font-semibold text-muted-foreground">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[...Array(5)].map((_, i) => (
                    <tr
                      key={i}
                      className="border-b transition-colors hover:bg-muted/20"
                    >
                      <td className="p-4 text-left font-medium text-sm">
                        #OID123{i}
                      </td>
                      <td className="p-4 text-left font-medium text-sm">
                        John Doe
                      </td>
                      <td className="p-4 text-left font-medium text-sm">
                        Product {i + 1}
                      </td>
                      <td className="p-4">
                        {/* Status cell with dynamic background color */}
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-medium 
                      ${
                        i % 2 === 0
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                        >
                          {i % 2 === 0 ? "Shipped" : "Pending"}
                        </span>
                      </td>
                      <td className="p-4 text-left font-medium text-sm">
                        $199.99
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard
