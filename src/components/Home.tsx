import React from "react";
import Header from "../Common/Header";
import HeroBanner from "../Common/HeroBanner";
import AboutUs from "./AboutUs";
import BestDescribe from "./BestDescribe";
import PortaPotties from "./PortaPotties";
import Process from "./Process";
import Whyus from "./Whyus";
import MaintenanceServices from "./MaintenanceServices";
import Customers from "./Customers";
import GoogleMaps from "./GoogleMaps";
import Blog from "./Blog";
import Footer from "../Common/Footer";
import Products from "./Products";


import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init({once: true});


const HomePage = () => {
  return (
    <>
      <Header />
      <HeroBanner />
      <AboutUs />
      <BestDescribe />
      <PortaPotties />
      <Process />
      <Products />
      <Whyus />
      <MaintenanceServices />
      <Customers />
      <GoogleMaps />
      <Blog />
      <Footer />
    </>
  );
};

export default HomePage;
