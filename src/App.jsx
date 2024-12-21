import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout/Layout";
import SignUpFirst from "./components/SignUpFirst/SignUpFirst";
import Login from "./components/SignUp/Login";
import Home from "./components/Home/Home";
import Cart from "./components/cart/cart";
import { AuthContextProvider } from "./Context/AuthContext";
import { CartProvider } from "./Context/CartContext";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import ProtectedAuthRoutes from "./components/ProtectedAuthRoutes/ProtectedAuthRoutes";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import Products from "./components/Products/Products";
import Brands from "./components/Brands/Brands";
import BrandDetails from "./components/Brands/BrandDetails";
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthContextProvider>
        <CartProvider>
          <Layout />
        </CartProvider>
      </AuthContextProvider>
    ),
    children: [
      {
        path: "/",
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "/Login",
        element: (
          <ProtectedAuthRoutes>
            <Login />
          </ProtectedAuthRoutes>
        ),
      },
      {
        path: "/brands",
        element: <Brands />,
      },
      {
        path: "/brands/:id",
        element: <BrandDetails />,
      },
      {
        path: "/ProductDetails/:id",
        element: (
          <ProtectedRoute>
            <ProductDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "/Products",
        element: (
          <ProtectedRoute>
            <Products />
          </ProtectedRoute>
        ),
      },
      {
        path: "/SignUpFirst",
        element: (
          <ProtectedAuthRoutes>
            <SignUpFirst />
          </ProtectedAuthRoutes>
        ),
      },
      {
        path: "/Cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
