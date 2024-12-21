import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ProductCard from "../ProductCard/ProductCard";
import { useCart } from "../../Context/CartContext";

export default function Products() {
  const { id } = useParams(); // Get the category ID from the URL
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]); // For filtering purposes
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState([]); // List of categories
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { addToCart } = useCart(); // Cart context for adding items
  useEffect(() => {
    if (id) {
      fetchProductsByCategory(id);
    } else {
      fetchProducts(currentPage);
    }
    fetchCategories();
  }, [currentPage, id]);

  // Fetch all products with pagination
  async function fetchProducts(page) {
    try {
      const url = `https://ecommerce.routemisr.com/api/v1/products?page=${page}&limit=40`;
      const response = await axios.get(url);
      setProducts(response.data.data);
      setAllProducts(response.data.data);
      setNumberOfPages(response.data.metadata.numberOfPages);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Failed to load products.");
    } finally {
      setLoading(false);
    }
  }

  // Fetch products by category ID
  async function fetchProductsByCategory(categoryId) {
    try {
      const url = `https://ecommerce.routemisr.com/api/v1/products?categoryId=${categoryId}`;
      console.log(`Fetching products for category ID: ${categoryId}`);
      const response = await axios.get(url);
      setProducts(response.data.data);
      setAllProducts(response.data.data);
    } catch (err) {
      console.error("Error fetching category products:", err.message);
      if (err.response) {
        console.error("Response data:", err.response.data);
        console.error("Response status:", err.response.status);
        console.error("Response headers:", err.response.headers);
      }
      setError("Failed to load products for this category.");
    } finally {
      setLoading(false);
    }
  }

  // Fetch all categories
  async function fetchCategories() {
    try {
      const url = `https://ecommerce.routemisr.com/api/v1/categories`;
      const response = await axios.get(url);
      setCategories(response.data.data);
    } catch (err) {
      console.error("Error fetching categories:", err);
      setError("Failed to load categories.");
    }
  }

  const handlePageChange = (page) => {
    if (page >= 1 && page <= numberOfPages) {
      setLoading(true);
      setCurrentPage(page);
    }
  };

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    filterProducts(term, selectedCategory);
  };

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    filterProducts(searchTerm, category);
  };

  const filterProducts = (term, category) => {
    let filtered = allProducts;

    if (category !== "All") {
      filtered = filtered.filter(
        (product) => product.category && product.category._id === category
      );
    }

    if (term !== "") {
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(term.toLowerCase())
      );
    }

    setProducts(filtered);
  };

  const getPageNumbers = () => {
    const pages = [];
    const totalPagesToShow = 5;
    let startPage = Math.max(currentPage - 2, 1);
    let endPage = Math.min(startPage + totalPagesToShow - 1, numberOfPages);

    if (endPage - startPage < totalPagesToShow - 1) {
      startPage = Math.max(endPage - totalPagesToShow + 1, 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {[...Array(8)].map((_, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col animate-pulse"
            >
              <div className="w-full h-48 bg-gray-300"></div>
              <div className="p-4 flex flex-col flex-grow">
                <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>
                <div className="h-6 bg-gray-300 rounded w-1/3 mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-1/4 mb-4"></div>
                <div className="mt-auto h-10 bg-gray-300 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-red-600 text-xl">{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-center items-center mb-6 space-y-4 md:space-y-0 md:space-x-4">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search products..."
          className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4FA74D]"
        />
      </div>

      {products.length === 0 ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-500 text-xl">No products found.</p>
        </div>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              onAddToCart={() => addToCart(product)}
            />
          ))}
        </div>
      )}

      {numberOfPages > 1 && (
        <div className="flex justify-center mt-8 space-x-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-3 py-2 rounded ${
              currentPage === 1
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-[#4FA74D] text-white hover:bg-[#3e9141]"
            } transition-colors duration-200`}
          >
            Previous
          </button>

          {getPageNumbers().map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-3 py-2 rounded ${
                currentPage === page
                  ? "bg-[#3e9141] text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-[#4FA74D] hover:text-white"
              } transition-colors duration-200`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === numberOfPages}
            className={`px-3 py-2 rounded ${
              currentPage === numberOfPages
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-[#4FA74D] text-white hover:bg-[#3e9141]"
            } transition-colors duration-200`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
