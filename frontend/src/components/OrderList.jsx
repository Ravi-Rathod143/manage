import React, { useEffect, useState } from "react";
import API from "../api";

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("");

  const fetchOrders = async () => {
    const res = await API.get("/orders");
    setOrders(res.data);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (id, status) => {
    if (!id) {
      alert("Order ID is missing. Cannot update status.");
      return;
    }

    console.log("Updating order:", id, "to status:", status);

    try {
      await API.patch(`/orders/${id}`, { status });
      fetchOrders();
    } catch (err) {
      console.error("Failed to update order status", err);
      alert("Something went wrong while updating order status.");
    }
  };

  const filtered = filter ? orders.filter(o => o.status === filter) : orders;

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Order List</h2>

      <div className="flex justify-end mb-4">
        <select
          onChange={e => setFilter(e.target.value)}
          className="border border-gray-300 rounded-md px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">All</option>
          <option value="placed">Placed</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 shadow-md rounded-lg">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold">Customer</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Product</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Update</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {filtered.map((o) => (
              <tr key={o._id} className="hover:bg-gray-50">
                <td className="px-6 py-4">{o.customer?.name}</td>
                <td className="px-6 py-4">{o.product?.name}</td>
                <td className="px-6 py-4 capitalize">{o.status}</td>
                <td className="px-6 py-4">
                  <select
                    onChange={(e) => handleStatusChange(o._id, e.target.value)}
                    value={o.status}
                    className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="placed">Placed</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderList;
