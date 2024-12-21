import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import React, { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import { useCart } from "../../Context/CartContext";

export default function MyNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { token, setToken } = useContext(AuthContext);
  const { cart, feedback, isVisible } = useCart(); // Include cart for badge count
  const navigate = useNavigate();
  const location = useLocation();

  function signOut() {
    setToken("");
    localStorage.removeItem("token");
    navigate("/Login");
  }

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Helper function to determine active link styles
  const getLinkClass = (path) =>
    location.pathname === path
      ? "text-[#4FA74D] font-semibold border-b-2 border-[#4FA74D]" // Active link styles
      : "text-gray-900 hover:text-[#4FA74D] transition-colors"; // Default styles

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 relative">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-3">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center space-x-2 rtl:space-x-reverse"
        >
          <FontAwesomeIcon
            className="text-lg md:text-xl opacity-80" // Adjusted size and opacity for the logo
            icon={faCartShopping}
            style={{ color: "#4fa74d" }}
          />
          <span className="hover:text-[#4fa74d] hover:ease-in-out hover:delay-75 self-center text-xl md:text-2xl font-semibold whitespace-nowrap dark:text-white">
            Fresh Cart
          </span>
        </Link>

        {/* Feedback Toast: shows up when addToCart is called */}
        {feedback && (
          <div
            role="alert"
            className={`fixed top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-md shadow-md z-50 transition-opacity duration-500 ease-in-out ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            {feedback}
          </div>
        )}

        <button
          type="button"
          onClick={toggleMenu}
          className="md:hidden p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg hover:bg-gray-100 
          focus:outline-none focus:ring-2 focus:ring-gray-200 
          dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded={isOpen}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>

        <div
          className={`${
            isOpen ? "block" : "hidden"
          } w-full md:flex md:w-auto mt-3 md:mt-0`}
          id="navbar-default"
        >
          <ul
            className="font-medium flex flex-col md:flex-row md:space-x-6 p-4 md:p-0 border border-gray-100 
          rounded-lg bg-gray-50 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700"
          >
            {token && (
              <>
                <li>
                  <Link to="/" className={getLinkClass("/")}>
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/Products" className={getLinkClass("/Products")}>
                    Products
                  </Link>
                </li>
                <li>
                  <Link to="/Brands" className={getLinkClass("/Brands")}>
                    Brands
                  </Link>
                </li>
                <li className="relative  justify-center flex items-center">
                  <Link to="/Cart" className={getLinkClass("/Cart")}>
                    <div className="relative flex items-center">
                      <span>Cart</span>
                      {/* Cart badge for dynamic product count */}
                      {cart.length > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                          {cart.length}
                        </span>
                      )}
                    </div>
                  </Link>
                </li>

                <li>
                  <button
                    onClick={signOut}
                    className="block py-2 px-3 justify-center   text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent 
                    md:border-0 md:hover:text-[#4FA74D] md:p-0 dark:text-white 
                    md:dark:hover:text-[#4FA74D] dark:hover:bg-gray-700 
                    dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    SignOut
                  </button>
                </li>
              </>
            )}

            {!token && (
              <>
                <li>
                  <Link to="/Login" className={getLinkClass("/Login")}>
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/SignUpFirst"
                    className={getLinkClass("/SignUpFirst")}
                  >
                    Signin
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
