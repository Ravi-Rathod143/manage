import React, { useState } from "react";
import API from "../api";

const ProductForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    image: "",
    price: ""
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, category, description, image, price } = formData;

    if (!name || !category || !description || !image || !price) {
      alert("Please fill in all fields before submitting.");
      return;
    }

    try {
      await API.post("/products", formData);
      alert("Product added!");
      setFormData({
        name: "",
        category: "",
        description: "",
        image: "",
        price: ""
      }); // Reset form after submission
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product. Try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto bg-white shadow-lg p-8 rounded-xl space-y-4"
    >
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
        Add New Product
      </h2>

      <input
        name="name"
        placeholder="Product Name"
        value={formData.name}
        onChange={handleChange}
        required
        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      <input
        name="category"
        placeholder="Category"
        value={formData.category}
        onChange={handleChange}
        required
        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      <input
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        required
        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      <input
        name="image"
        placeholder="Image URL"
        value={formData.image}
        onChange={handleChange}
        required
        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      <input
        name="price"
        placeholder="Price"
        type="number"
        value={formData.price}
        onChange={handleChange}
        required
        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition duration-200"
      >
        Add Product
      </button>
    </form>
  );
};

export default ProductForm;
