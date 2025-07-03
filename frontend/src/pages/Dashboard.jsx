import React, { useEffect, useState } from "react";
import API from "../api";

const Dashboard = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    API.get("/orders").then((res) => setOrders(res.data));
  }, []);

  const statusCount = orders.reduce((acc, order) => {
    acc[order.status] = (acc[order.status] || 0) + 1;
    return acc;
  }, {});

  const total = orders.length;
  const delivered = statusCount["delivered"] || 0;
  const placed = statusCount["placed"] || 0;
  const shipped = statusCount["shipped"] || 0;
  const cancelled = statusCount["cancelled"] || 0;

  return (
    <div className="p-2">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
         Order Statistics Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="Total Orders" value={total} color="bg-blue-500" />
        <StatCard label="Delivered" value={delivered} color="bg-green-500" />
        <StatCard label="Shipped" value={shipped} color="bg-indigo-500" />
        <StatCard label="Placed" value={placed} color="bg-yellow-500" />
        <StatCard label="Cancelled" value={cancelled} color="bg-red-500" />
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          Detailed Status Counts
        </h2>
        <ul className="list-disc pl-6 text-gray-600">
          {Object.entries(statusCount).map(([status, count]) => (
            <li key={status}>
              <strong className="capitalize">{status}</strong>: {count}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const StatCard = ({ label, value, color }) => (
  <div className={`rounded-lg shadow-md p-6 text-white ${color}`}>
    <h3 className="text-lg font-semibold">{label}</h3>
    <p className="text-3xl font-bold mt-2">{value}</p>
  </div>
);

export default Dashboard;
