import React from "react";
import { useCart } from "../../Context/CartContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart, setCart, removeFromCart, calculateTotal } = useCart();
  const navigate = useNavigate();

  const handleImageClick = (id) => {
    navigate(`/ProductDetails/${id}`);
  };

  const updateQuantity = (id, delta) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  return (
    <div className="font-sans max-w-6xl mx-auto bg-white py-6 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-800 text-center">
        Shopping Cart
      </h1>
      {cart.length === 0 ? (
        <div className="text-center text-gray-500 mt-16">
          Your cart is currently empty.
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="md:col-span-2 space-y-6">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex flex-wrap md:flex-nowrap items-center border-b border-gray-200 pb-4"
              >
                {/* Product Image */}
                <div
                  className="w-24 h-24 bg-gray-100 p-2 rounded-md cursor-pointer shrink-0"
                  onClick={() => handleImageClick(item.id)}
                >
                  <img
                    src={item.imageCover}
                    alt={item.title}
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Product Info */}
                <div className="flex flex-col flex-grow ml-4">
                  <h3 className="text-lg font-bold text-gray-800">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Brand: {item.brand || "N/A"}
                  </p>
                  <p className="mt-2 text-gray-800 font-bold">
                    ${item.price.toFixed(2)}
                  </p>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center justify-center mt-4 md:mt-0">
                  <button
                    className="px-2 py-1 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-l"
                    onClick={() => updateQuantity(item.id, -1)}
                  >
                    -
                  </button>
                  <input
                    type="text"
                    readOnly
                    value={item.quantity}
                    className="w-12 text-center border border-gray-300 focus:outline-none"
                  />
                  <button
                    className="px-2 py-1 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-r"
                    onClick={() => updateQuantity(item.id, 1)}
                  >
                    +
                  </button>
                </div>

                {/* Total Price */}
                <div className="text-center mt-4 md:mt-0 ml-auto">
                  <p className="text-lg font-bold text-gray-800">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>

                {/* Remove Button */}
                <button
                  className="ml-4 text-red-500 hover:underline"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="bg-gray-100 rounded-md p-4 w-full">
            <h3 className="text-lg font-bold text-gray-800 border-b border-gray-300 pb-2">
              Order Summary
            </h3>
            <ul className="text-gray-800 mt-4 space-y-3">
              <li className="flex justify-between text-sm">
                Subtotal <span className="font-bold">${calculateTotal()}</span>
              </li>
              <li className="flex justify-between text-sm">
                Shipping <span className="font-bold">$10.00</span>
              </li>
              <li className="flex justify-between text-sm">
                Tax <span className="font-bold">$5.00</span>
              </li>
              <li className="flex justify-between text-sm font-bold">
                Total{" "}
                <span className="text-lg">
                  ${(parseFloat(calculateTotal()) + 15).toFixed(2)}
                </span>
              </li>
            </ul>
            <button
              type="button"
              className="mt-4 w-full px-4 py-2 bg-gray-800 text-white font-bold rounded hover:bg-gray-900 transition"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
