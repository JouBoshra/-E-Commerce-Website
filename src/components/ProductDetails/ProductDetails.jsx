import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useCart } from "../../Context/CartContext";
import { ClipLoader } from "react-spinners"; // Import the spinner

export default function ProductDetails() {
  const { id } = useParams(); // Product ID from the URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true); // Ensure loading starts as true
  const [error, setError] = useState("");
  const [mainImage, setMainImage] = useState(""); // Handle main image for thumbnails
  const { addToCart } = useCart(); // Use Cart Context for adding products to cart

  useEffect(() => {
    if (id) {
      fetchProductDetails(id);
    }
  }, [id]);

  const fetchProductDetails = async (productId) => {
    setLoading(true); // Set loading to true
    try {
      const response = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products/${productId}`
      );
      setProduct(response.data.data);
      setMainImage(response.data.data.imageCover); // Set main image
    } catch (err) {
      console.error("Error fetching product details:", err);
      setError("Failed to load product details.");
    } finally {
      setLoading(false); // Set loading to false
    }
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart({
        id: product._id,
        title: product.title,
        price: product.price,
        imageCover: product.imageCover,
      });
    }
  };

  const changeMainImage = (image) => {
    setMainImage(image);
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
      <div className="container mx-auto py-8">
        <p className="text-red-600 text-center">{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image Section */}
        <div className="flex flex-col">
          <img
            src={mainImage}
            alt={product.title}
            className="w-full h-auto rounded-lg shadow-md object-contain"
          />
          <div className="flex gap-2 mt-4 overflow-x-auto">
            {product.images?.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className={`w-20 h-20 object-cover cursor-pointer rounded-md border ${
                  mainImage === image
                    ? "border-[#4FA74D]"
                    : "border-gray-300 hover:border-gray-400"
                }`}
                onClick={() => changeMainImage(image)}
              />
            ))}
          </div>
        </div>

        {/* Details Section */}
        <div className="flex flex-col space-y-6">
          <h1 className="text-3xl font-bold text-gray-800">{product.title}</h1>
          <p className="text-gray-600">{product.description}</p>

          <p className="text-2xl font-bold text-gray-800">
            ${product.price.toFixed(2)}
          </p>

          <div className="flex items-center space-x-2">
            {[...Array(5)].map((_, index) => (
              <svg
                key={index}
                xmlns="http://www.w3.org/2000/svg"
                fill={index < product.ratingsAverage ? "#FACC15" : "none"}
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6 text-yellow-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4l2.09 4.26 4.71.68-3.41 3.33.81 4.7L12 15.27l-4.2 2.2.81-4.7L5.2 8.94l4.71-.68L12 4z"
                />
              </svg>
            ))}
            <span className="ml-2 text-gray-600">
              {product.ratingsAverage} / 5
            </span>
          </div>

          <button
            onClick={handleAddToCart}
            className="bg-[#4FA74D] text-white font-semibold py-3 px-6 rounded-lg hover:bg-[#3e9141] transition-all duration-200"
          >
            Add to Cart
          </button>

          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Key Features:</h3>
            <ul className="flex flex-wrap gap-4 text-gray-700">
              <li className="flex items-center bg-gray-100 px-4 py-2 rounded-md shadow-sm">
                <span className="font-semibold">Category:</span>{" "}
                <span className="ml-2">{product.category?.name || "N/A"}</span>
              </li>
              <li className="flex items-center bg-gray-100 px-4 py-2 rounded-md shadow-sm">
                <span className="font-semibold">Brand:</span>{" "}
                <span className="ml-2">{product.brand?.name || "N/A"}</span>
              </li>
              <li className="flex items-center bg-gray-100 px-4 py-2 rounded-md shadow-sm">
                <span className="font-semibold">Stock:</span>{" "}
                <span className="ml-2">
                  {product.quantity > 0 ? product.quantity : "Out of Stock"}
                </span>
              </li>
              <li className="flex items-center bg-gray-100 px-4 py-2 rounded-md shadow-sm">
                <span className="font-semibold">Sold:</span>{" "}
                <span className="ml-2">{product.sold}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
