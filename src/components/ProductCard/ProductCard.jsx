import React from "react";
import { Link } from "react-router-dom";
import { StarIcon } from "@heroicons/react/24/solid";
import { useCart } from "../../Context/CartContext";
import PropTypes from "prop-types";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  const {
    title,
    imageCover,
    price,
    priceAfterDiscount,
    brand,
    ratingsAverage,
    sold,
    id,
  } = product;

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
      {/* Product Image */}
      <Link to={`/ProductDetails/${id}`}>
        <img
          src={imageCover}
          alt={title}
          loading="lazy"
          className="w-full h-48 sm:h-40 object-cover transition-transform duration-300 transform hover:scale-105"
        />
      </Link>

      {/* Product Info */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Product Title */}
        <Link to={`/ProductDetails/${id}`}>
          <h2 className="text-lg font-semibold text-gray-800 hover:text-[#4FA74D] transition-colors duration-200">
            {title}
          </h2>
        </Link>

        {/* Brand */}
        <p className="text-sm text-gray-600 mt-1">Brand: {brand.name}</p>

        {/* Price Section */}
        <div className="mt-2">
          {priceAfterDiscount ? (
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold text-gray-800">
                ${priceAfterDiscount.toLocaleString()}
              </span>
              <span className="text-sm line-through text-gray-500">
                ${price.toLocaleString()}
              </span>
            </div>
          ) : (
            <span className="text-xl font-bold text-gray-800">
              ${price.toLocaleString()}
            </span>
          )}
        </div>

        {/* Ratings and Sold */}
        <div className="flex items-center mt-2">
          {[...Array(5)].map((_, index) => {
            const filled = index < Math.round(ratingsAverage);
            return (
              <StarIcon
                key={index}
                className={`h-5 w-5 ${
                  filled ? "text-yellow-400" : "text-gray-300"
                }`}
              />
            );
          })}
          <span className="ml-2 text-sm text-gray-600">
            {ratingsAverage} ({sold} sold)
          </span>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={() =>
            addToCart({
              id,
              title,
              imageCover,
              price: priceAfterDiscount || price,
              priceAfterDiscount: priceAfterDiscount || price,
              brand: brand.name,
            })
          }
          className="mt-auto bg-[#4FA74D] text-white py-2 px-4 rounded-lg hover:bg-[#3e9141] transition-colors duration-200"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    title: PropTypes.string.isRequired,
    imageCover: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    priceAfterDiscount: PropTypes.number,
    brand: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
    ratingsAverage: PropTypes.number.isRequired,
    sold: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
};
