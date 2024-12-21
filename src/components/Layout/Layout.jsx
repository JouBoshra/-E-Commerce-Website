import React from "react";
import MyNavbar from "../Navbar/MyNavbar";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";

export default function Layout() {
  return (
    <>
      <MyNavbar />
      <div className="container mx-auto py-6 my-6">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
