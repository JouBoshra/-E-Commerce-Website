import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners"; // Spinner for loading
import { useCart } from "../../Context/CartContext"; // Add to cart functionality

export default function BrandDetails() {
  const { id } = useParams(); // Get brand ID from the route
  const navigate = useNavigate();
  const { addToCart } = useCart(); // Use Cart Context for adding products to the cart

  const [brand, setBrand] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchBrandDetails();
  }, [id]);

  const fetchBrandDetails = async () => {
    try {
      setLoading(true);

      // Fetch the brand information
      const brandResponse = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/brands/${id}`
      );
      setBrand(brandResponse.data);

      // Fetch products associated with the brand
      const productsResponse = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products?brand=${id}`
      );
      setProducts(productsResponse.data.data);

      setLoading(false);
    } catch (err) {
      console.error("Error fetching brand details:", err);
      setError("Failed to load brand details or products.");
      setLoading(false);
    }
  };

  const handleProductClick = (productId) => {
    // Navigate to the product details page
    navigate(`/ProductDetails/${productId}`);
  };

  const handleAddToCart = (product) => {
    addToCart({
      id: product._id,
      title: product.title,
      price: parseFloat(product.price), // Ensure price is a valid number
      imageCover: product.imageCover,
    });
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

  if (!brand) {
    return (
      <div className="text-center text-gray-500 py-8">
        <p>Brand not found.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Brand Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-800">{brand.name}</h1>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.length > 0 ? (
          products.map((product) => (
            <div
              key={product._id}
              className="relative bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between"
            >
              {/* Product Image */}
              <div
                className="cursor-pointer p-4 bg-gray-100"
                onClick={() => handleProductClick(product._id)}
              >
                <img
                  src={product.imageCover}
                  alt={product.title}
                  className="w-full h-48 object-contain rounded-lg"
                />
              </div>

              {/* Product Details */}
              <div className="p-4 flex flex-col gap-2 items-center">
                {/* Title */}
                <p
                  className="text-lg font-bold text-gray-800 cursor-pointer hover:text-[#4FA74D] transition-colors"
                  onClick={() => handleProductClick(product._id)}
                >
                  {product.title}
                </p>

                {/* Price */}
                <p className="text-gray-500">${product.price.toFixed(2)}</p>
              </div>

              {/* Add to Cart Button */}
              <div className="p-4">
                <button
                  onClick={() => handleAddToCart(product)}
                  className="bg-[#4FA74D] text-white font-semibold py-2 px-4 rounded-lg w-full hover:bg-[#3e9141] transition-all duration-200"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center col-span-full">
            No products available for this brand.
          </p>
        )}
      </div>
    </div>
  );
}
