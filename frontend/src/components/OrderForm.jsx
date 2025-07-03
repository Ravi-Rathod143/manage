import React, { useState, useEffect } from "react";
import API from "../api";

const OrderForm = () => {
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({ customer: "", product: "" });

  useEffect(() => {
    API.get("/customers").then(res => setCustomers(res.data));
    API.get("/products").then(res => setProducts(res.data));
  }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post("/orders", formData);
    alert("Order Placed!");
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-lg space-y-4">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Create New Order</h2>

      <select
        name="customer"
        onChange={handleChange}
        value={formData.customer}
        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        <option value="">Select Customer</option>
        {customers.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
      </select>

      <select
        name="product"
        onChange={handleChange}
        value={formData.product}
        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        <option value="">Select Product</option>
        {products.map(p => <option key={p._id} value={p._id}>{p.name}</option>)}
      </select>

      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition-all duration-200"
      >
         Place Order
      </button>
    </form>
  );
};

export default OrderForm;
