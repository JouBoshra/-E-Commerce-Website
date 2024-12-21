import React, { useEffect, useState } from "react";
import axios from "axios";
import Products from "../Products/Products";
import CategoriesSlider from "../CategoriesSlider/CategoriesSlider";
import { ClipLoader } from "react-spinners"; // Import the spinner

export default function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]); // Optional if you fetch here instead
  const [loading, setLoading] = useState(true); // Loading state for products
  const [swiperLoading, setSwiperLoading] = useState(true); // Loading state for the swiper
  const [error, setError] = useState("");

  useEffect(() => {
    displayProducts();
    fetchCategories();
  }, []);

  // Fetch products
  async function displayProducts() {
    try {
      setLoading(true); // Set loading to true before the API call
      const response = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/products"
      );
      const productsData = response.data.data;

      setProducts(productsData);
      setLoading(false); // Set loading to false after the API call
    } catch (err) {
      console.error(err);
      setError("Failed to load products.");
      setLoading(false); // Set loading to false after the API call
    }
  }

  // Fetch categories for the swiper
  async function fetchCategories() {
    try {
      setSwiperLoading(true); // Set swiper loading to true before the API call
      const response = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/categories"
      );
      setCategories(response.data.data);
      setSwiperLoading(false); // Set swiper loading to false after the API call
    } catch (err) {
      console.error(err);
      setError("Failed to load categories.");
      setSwiperLoading(false); // Set swiper loading to false after the API call
    }
  }

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

  return (
    <>
      {/* Categories Slider */}
      {swiperLoading ? (
        <div className="flex justify-center items-center h-64">
          <ClipLoader color="#4FA74D" size={50} />
        </div>
      ) : (
        <CategoriesSlider categories={categories} />
      )}

      {/* Products Section */}
      <div className="my-8">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Our Products
        </h2>
        <Products product={products} />
      </div>
    </>
  );
}
