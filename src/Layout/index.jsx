import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/modules/header";
import Footer from "../components/modules/footer";
import "./index.css"
export default function Layout() {
  return (
    <>
      <Header />
      <main className="main">
        <Outlet />
      </main>

      <Footer />
    </>
  );
}
