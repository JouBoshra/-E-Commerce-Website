import React from "react";
import { useCart } from "../../Context/CartContext";

export default function Bill() {
  const { cart, calculateTotal } = useCart();

  const taxRate = 0.1; // Example tax rate (10%)
  const shippingCost = 10.0; // Example shipping cost
  const subtotal = parseFloat(calculateTotal());
  const tax = (subtotal * taxRate).toFixed(2);
  const total = (subtotal + parseFloat(tax) + shippingCost).toFixed(2);

  return (
    <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4 text-center">Order Summary</h2>
      <ul className="space-y-4">
        {cart.map((item) => (
          <li key={item.id} className="flex justify-between items-center">
            <div>
              <p className="font-semibold">{item.title}</p>
              <p className="text-sm text-gray-500">
                Quantity: {item.quantity} x ${item.price.toFixed(2)}
              </p>
            </div>
            <p className="font-semibold">
              ${(item.price * item.quantity).toFixed(2)}
            </p>
          </li>
        ))}
      </ul>
      <div className="border-t border-gray-200 my-4"></div>
      <div className="space-y-2">
        <div className="flex justify-between">
          <p className="text-gray-600">Subtotal:</p>
          <p className="font-semibold">${subtotal.toFixed(2)}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-gray-600">Tax (10%):</p>
          <p className="font-semibold">${tax}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-gray-600">Shipping:</p>
          <p className="font-semibold">${shippingCost.toFixed(2)}</p>
        </div>
      </div>
      <div className="border-t border-gray-200 my-4"></div>
      <div className="flex justify-between text-xl font-bold">
        <p>Total:</p>
        <p>${total}</p>
      </div>
      <button className="w-full bg-[#4FA74D] text-white font-semibold py-3 mt-4 rounded-lg hover:bg-[#3e9141] transition-all">
        Checkout
      </button>
    </div>
  );
}
