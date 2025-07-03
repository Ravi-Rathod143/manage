import React, { useEffect, useState } from "react";
import API from "../api";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    API.get("/products").then((res) => setProducts(res.data));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-center mb-8">Product Catalog</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((p) => (
          <div
            key={p._id}
            className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-xl transition duration-300"
          >
            <img
              src={p.image}
              alt={p.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 space-y-2">
              <h3 className="text-lg font-semibold text-gray-800">{p.name}</h3>
              <p className="text-gray-600 text-sm">{p.description}</p>
              <p className="text-indigo-600 font-bold text-md">₹{p.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
