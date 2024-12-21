import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          {/* About Section */}
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h4 className="text-lg font-semibold mb-4">About Us</h4>
            <p className="text-sm text-gray-400">
              Fresh Cart is your go-to destination for the best online shopping
              experience. Explore a wide variety of products with unbeatable
              prices!
            </p>
          </div>

          {/* Quick Links */}
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul>
              <li className="mb-2">
                <Link
                  to="/"
                  className="text-sm text-gray-400 hover:text-[#4FA74D] transition duration-200"
                >
                  Home
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/Products"
                  className="text-sm text-gray-400 hover:text-[#4FA74D] transition duration-200"
                >
                  Products
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/Brands"
                  className="text-sm text-gray-400 hover:text-[#4FA74D] transition duration-200"
                >
                  Brands
                </Link>
              </li>
              <li>
                <Link
                  to="/Cart"
                  className="text-sm text-gray-400 hover:text-[#4FA74D] transition duration-200"
                >
                  Cart
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul>
              <li className="text-sm text-gray-400 mb-2">
                Email: youssefboshra1@outlook.com
              </li>
              <li className="text-sm text-gray-400 mb-2">Phone: 0122651186</li>
              <li className="text-sm text-gray-400">Location: Cairo,Egypt</li>
              <li className="text-sm text-gray-400">
                LinkedIn: in/youssef-boshra
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-8 border-t border-gray-700 pt-4 text-center">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Fresh Cart. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
