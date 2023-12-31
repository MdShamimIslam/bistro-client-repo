import React, { useContext } from "react";
import { authContext } from "../../../Providers/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  PieChart,
  Pie,
  ResponsiveContainer,
  Legend,
  
} from "recharts";

const AdminHome = () => {
  const { user } = useContext(authContext);
  const [axiosSecure] = useAxiosSecure();

  const { data: stats = {} } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure("/admin/stats");
      return res.data;
    },
  });

  const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "red", "pink"];

  const { data: chartData = [] } = useQuery({
    queryKey: ["chart-data"],
    queryFn: async () => {
      const res = await axiosSecure("/order-stats");
      return res.data;
    },
  });

  const getPath = (x, y, width, height) => {
    return `M${x},${y + height}C${x + width / 3},${y + height} ${
      x + width / 2
    },${y + height / 3}
    ${x + width / 2}, ${y}
    C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${
      x + width
    }, ${y + height}
    Z`;
  };

  const TriangleBar = (props) => {
    const { fill, x, y, width, height } = props;

    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
  };

  //   pie chart
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    ResponsiveContainer,
    percent
    
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="m-8 w-full">
      <h2 className="text-5xl font-bold">Hi, {user?.displayName}</h2>
      <div className="mt-4">
        <div className="stats shadow bg-purple-400 t">
          <div className="stat text-center">
            <div className="stat-value text-primary">${stats.revenue}</div>
            <div className="stat-title text-2xl font-bold">Revenue</div>
          </div>
          <div className="stat text-center">
            <div className="stat-value text-primary">{stats.users}</div>
            <div className="stat-title text-2xl font-bold">Users</div>
          </div>
          <div className="stat text-center">
            <div className="stat-value text-primary">{stats.products}</div>
            <div className="stat-title text-2xl font-bold">Menu Items</div>
          </div>
          <div className="stat text-center">
            <div className="stat-value text-primary">{stats.orders}</div>
            <div className="stat-title text-2xl font-bold">Orders</div>
          </div>
        </div>
      </div>
      {/* rechart */}
      <div className="flex mt-10">
        <div className="w-1/2">
          <BarChart
            width={500}
            height={300}
            data={chartData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis />
            <Bar
              dataKey="total"
              fill="#8884d8"
              shape={<TriangleBar />}
              label={{ position: "top" }}
            >
              {chartData?.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % 20]} />
              ))}
            </Bar>
          </BarChart>
        </div>
        <div className="w-1/2">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart width={400} height={400}>
                <Legend></Legend>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={80}
                fill="#8884d8"
                dataKey="total"
              >
                {chartData.map((entry, index) => (
                  <Cell
                    name={entry.category}
                    key={`cell-${index}`}
                    fill={colors[index % colors.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
