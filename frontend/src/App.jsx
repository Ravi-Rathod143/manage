import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import CustomerForm from './components/CustomerForm';
import ProductList from './components/ProductList';
import OrderForm from './components/OrderForm';
import OrderList from './components/OrderList';
import Dashboard from './pages/Dashboard';
import ProductForm from './components/ProductForm';

const App = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-indigo-600 text-white px-6 py-4 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-wrap gap-4 justify-center sm:justify-start">
          <Link to="/" className="hover:bg-indigo-700 px-4 py-2 rounded-md transition">Dashboard</Link>
          <Link to="/customer" className="hover:bg-indigo-700 px-4 py-2 rounded-md transition">Add Customer</Link>
          <Link to="/products" className="hover:bg-indigo-700 px-4 py-2 rounded-md transition">Products</Link>
          <Link to="/order" className="hover:bg-indigo-700 px-4 py-2 rounded-md transition">Create Order</Link>
          <Link to="/orders" className="hover:bg-indigo-700 px-4 py-2 rounded-md transition">Order List</Link>
          <Link to="/add-product" className="hover:bg-indigo-700 px-4 py-2 rounded-md transition">Add Product</Link>
        </div>
      </nav>

      <main className="p-6 max-w-7xl mx-auto">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/customer" element={<CustomerForm />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/order" element={<OrderForm />} />
          <Route path="/orders" element={<OrderList />} />
          <Route path="/add-product" element={<ProductForm />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
