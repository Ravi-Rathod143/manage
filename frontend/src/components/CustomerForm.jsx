import React, { useState } from "react";
import API from "../api";

const CustomerForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Frontend validation
    const { name, address, phone, email } = formData;
    if (!name || !address || !phone || !email) {
      alert("Please fill in all fields before submitting.");
      return;
    }

    try {
      await API.post("/customers", formData);
      alert("Customer Added!");
      setFormData({ name: "", address: "", phone: "", email: "" }); // reset form
    } catch (error) {
      console.error("Error adding customer:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-md space-y-4"
    >
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
        Add New Customer
      </h2>

      <input
        name="name"
        placeholder="Full Name"
        value={formData.name}
        onChange={handleChange}
        required
        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        name="address"
        placeholder="Address"
        value={formData.address}
        onChange={handleChange}
        required
        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        name="phone"
        placeholder="Phone Number"
        value={formData.phone}
        onChange={handleChange}
        required
        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        name="email"
        placeholder="Email Address"
        type="email"
        value={formData.email}
        onChange={handleChange}
        required
        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-all duration-200"
      >
        Add Customer
      </button>
    </form>
  );
};

export default CustomerForm;
