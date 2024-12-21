// src/components/Categories/Categories.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/categories"
      );
      setCategories(data.data);
    } catch (err) {
      console.error("Error fetching categories:", err);
      setError("Failed to fetch categories. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center text-gray-500 p-6">
        <h2>Loading Categories...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 p-6">
        <h2>Error</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center text-[#4FA74D] mb-8">
          Categories
        </h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <div
              key={category._id}
              className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col"
            >
              <Link to={`/Categories/${category._id}`}>
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-48 object-cover transition-transform duration-300 transform hover:scale-105"
                />
              </Link>
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800 hover:text-[#4FA74D] transition-colors duration-200">
                  <Link to={`/Categories/${category.slug}`}>
                    {category.name}
                  </Link>
                </h2>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
