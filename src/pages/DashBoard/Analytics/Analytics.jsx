import Loading from "../../../assets/animations/Loading.json";
import EmptyBox from "../../../assets/animations/emptybox.json";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Users,
  GraduationCap,
  DollarSign,
  TrendingUp,
  BarChart3,
  PieChartIcon,
  FileText,
  BookOpen,
} from "lucide-react";
import Lottie from "lottie-react";

const Analytics = () => {
  const axiosSecure = useAxiosSecure();

  const { data: analytics, isLoading } = useQuery({
    queryKey: ["analytics"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/analytics");
      return data;
    },
    retry: 3,
  });

  const {
    appsByCategory = [],
    appsByUniversity = [],
    totalFees = 0,
    totalUsers = 0,
    totalScholaships = 0,
  } = analytics || {};

  // Colors for Pie Chart
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

  // Colors for Bar Chart
  const BAR_COLORS = {
    "Full fund": "#00C49F",
    Partial: "#FFBB28",
    "Self-fund": "#FF8042",
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-120px)]">
        <Lottie animationData={Loading} loop />
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <TrendingUp className="text-primary" />
          Analytics Dashboard
        </h1>
        <p className="text-gray-500 mt-1">
          Overview of your scholarship management system
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Total Users */}
        <div className="stat bg-base-100 shadow rounded-xl">
          <div className="stat-figure text-primary">
            <Users className="size-10" />
          </div>
          <div className="stat-title">Total Users</div>
          <div className="stat-value text-primary">{totalUsers}</div>
          <div className="stat-desc">Registered users</div>
        </div>

        {/* Total Scholarships */}
        <div className="stat bg-base-100 shadow rounded-xl">
          <div className="stat-figure text-secondary">
            <GraduationCap className="size-10" />
          </div>
          <div className="stat-title">Total Scholarships</div>
          <div className="stat-value text-secondary">{totalScholaships}</div>
          <div className="stat-desc">Available scholarships</div>
        </div>

        {/* Total Fees Collected */}
        <div className="stat bg-base-100 shadow rounded-xl">
          <div className="stat-figure text-success">
            <DollarSign className="size-10" />
          </div>
          <div className="stat-title">Fees Collected</div>
          <div className="stat-value text-success">
            ${totalFees.toLocaleString()}
          </div>
          <div className="stat-desc">Total revenue</div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Pie Chart - Applications by Category */}
        <div className="card bg-base-100 shadow">
          <div className="card-body">
            <h2 className="card-title text-lg gap-2">
              <PieChartIcon className="size-5 text-primary" />
              Applications by Category
            </h2>
            <div className="h-80">
              {appsByCategory.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={appsByCategory}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ category, percent }) =>
                        `${category} (${(percent * 100).toFixed(0)}%)`
                      }
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="count"
                      nameKey="category"
                    >
                      {appsByCategory.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value, name) => [value, name]} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500">
                  <Lottie animationData={EmptyBox} loop className="w-96" />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bar Chart - Applications by University */}
        <div className="card bg-base-100 shadow">
          <div className="card-body">
            <h2 className="card-title text-lg gap-2">
              <BarChart3 className="size-5 text-primary" />
              Applications by University
            </h2>
            <div className="h-80">
              {appsByUniversity.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={appsByUniversity}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" allowDecimals={false} />
                    <YAxis
                      type="category"
                      dataKey="universityName"
                      width={120}
                      tick={{ fontSize: 12 }}
                      tickFormatter={(value) =>
                        value.length > 15 ? `${value.slice(0, 15)}...` : value
                      }
                    />
                    <Tooltip />
                    <Legend />
                    <Bar
                      dataKey="count"
                      fill="#8884d8"
                      name="Applications"
                      radius={[0, 4, 4, 0]}
                    >
                      {appsByUniversity?.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500">
                  <Lottie animationData={EmptyBox} loop className="w-96" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Summary Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Summary */}
        <div className="card bg-base-100 shadow">
          <div className="card-body">
            <h2 className="card-title text-lg">
              <FileText className="size-5 text-primary" />
              Category Summary
            </h2>
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>Category</th>
                    <th>Applications</th>
                    <th>Percentage</th>
                  </tr>
                </thead>
                <tbody>
                  {appsByCategory?.map((item, index) => {
                    const total = appsByCategory.reduce(
                      (sum, i) => sum + i.count,
                      0
                    );
                    const percentage =
                      total > 0 ? ((item.count / total) * 100).toFixed(1) : 0;

                    return (
                      <tr key={index} className="hover">
                        <td>
                          <div className="flex items-center gap-2">
                            <div
                              className="w-3 h-3 rounded-full"
                              style={{
                                backgroundColor: COLORS[index % COLORS.length],
                              }}
                            ></div>
                            {item.category}
                          </div>
                        </td>
                        <td>
                          <span className="badge badge-ghost">
                            {item.count}
                          </span>
                        </td>
                        <td>{percentage}%</td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr>
                    <th>Total</th>
                    <th>
                      <span className="badge badge-primary">
                        {appsByCategory.reduce((sum, i) => sum + i.count, 0)}
                      </span>
                    </th>
                    <th>100%</th>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>

        {/* University Summary */}
        <div className="card bg-base-100 shadow">
          <div className="card-body">
            <h2 className="card-title text-lg">
              <BookOpen className="size-5 text-primary" />
              University Summary
            </h2>
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>University</th>
                    <th>Applications</th>
                  </tr>
                </thead>
                <tbody>
                  {appsByUniversity?.map((item, index) => (
                    <tr key={index} className="hover">
                      <td>{index + 1}</td>
                      <td>
                        <span className="font-medium">
                          {item.universityName}
                        </span>
                      </td>
                      <td>
                        <div className="flex items-center gap-2">
                          <progress
                            className="progress progress-primary w-20"
                            value={item.count}
                            max={Math.max(
                              ...appsByUniversity.map((u) => u.count)
                            )}
                          ></progress>
                          <span className="badge badge-ghost">
                            {item.count}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <th></th>
                    <th>Total</th>
                    <th>
                      <span className="badge badge-primary">
                        {appsByUniversity.reduce((sum, i) => sum + i.count, 0)}
                      </span>
                    </th>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
