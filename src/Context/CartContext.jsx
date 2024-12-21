import React, { createContext, useContext, useState } from "react";

export const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [feedback, setFeedback] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [notifications, setNotifications] = useState(0); // For notifications

  const addToCart = (product) => {
    // Validate product price
    const productPrice = parseFloat(product.price);
    if (isNaN(productPrice) || productPrice <= 0) {
      console.error("Invalid product price:", product);
      return;
    }

    // Check if the product is already in the cart
    const existingProduct = cart.find((item) => item.id === product.id);

    if (existingProduct) {
      // Update the quantity of the existing product
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      // Add the new product to the cart
      setCart((prevCart) => [
        ...prevCart,
        { ...product, price: productPrice, quantity: 1 },
      ]);
    }

    // Increment notifications
    setNotifications((prev) => prev + 1);

    setFeedback("Product added to cart successfully!");
    setIsVisible(true);

    setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => setFeedback(""), 500);
    }, 3000);
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    setFeedback("Product removed from cart successfully!");
    setIsVisible(true);

    setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => setFeedback(""), 500);
    }, 3000);
  };

  const calculateTotal = () => {
    const total = cart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    return total.toFixed(2);
  };

  const resetNotifications = () => setNotifications(0); // Reset notifications

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        addToCart,
        removeFromCart,
        feedback,
        isVisible,
        notifications,
        resetNotifications,
        calculateTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
