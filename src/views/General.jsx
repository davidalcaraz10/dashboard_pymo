import React from "react";

import Navbar from "../components/general/NavBar";
import Hero from "../components/general/Hero";
import GradientData from "../components/general/GradientData";
import SuppliesCarousel from "../components/general/SuppliesCarousel";
import Information from "../components/general/Information";
import Register from "../components/general/Register";
import Footer from "../components/general/Footer";

export default function General() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <Navbar/>
        <Hero/>
        <GradientData/>
        <SuppliesCarousel/>
        <Information/>
        <Register/>
      </div>
      <Footer />
    </div>
  )
}