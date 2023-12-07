import React from "react";
import Navbar from "./components/Navbar";
import Content from "./content/Content";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="main-content">
      <Navbar />
      <Content />
      <Footer />
    </div>
  );
}
