import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners"; // Spinner for loading

export default function Brands() {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchBrands();
  }, []);

  const fetchBrands = async () => {
    try {
      const response = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/brands"
      );
      setBrands(response.data.data); // Adjust based on the API response
      setLoading(false);
    } catch (err) {
      console.error("Error fetching brands:", err);
      setError("Failed to load brands.");
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <ClipLoader color="#4FA74D" size={50} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 py-8">
        <p>{error}</p>
      </div>
    );
  }

  if (brands.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        <p>No brands available.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Brands</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {brands.map((brand) => (
          <Link
            to={`/brands/${brand._id}`}
            key={brand._id}
            className="group flex flex-col items-center text-center hover:shadow-lg transition-shadow"
          >
            <img
              src={brand.image}
              alt={brand.name}
              className="w-full h-32 object-contain bg-gray-100 rounded-lg p-4 group-hover:shadow-md"
            />
            <p className="mt-2 font-semibold text-gray-700 group-hover:text-[#4FA74D] transition-colors">
              {brand.name}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
