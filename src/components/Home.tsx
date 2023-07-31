import React from "react";
import { useEffect } from "react";
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
import Products from "./Products";
import $ from "jquery";


import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init({once: true});


const HomePage = () => {

  useEffect(() => {
    function smoothScroll(target: any) {
      const element = document.querySelector(target);
    
      if (element) {
        window.scrollTo({
          top: element.offsetTop,
          behavior: 'smooth'
        });
      }
    }
    
    // Usage example
    const link = document.querySelector('#btn--hero') as HTMLAnchorElement; 
    
    link.addEventListener('click', (event) => {
      event.preventDefault(); 
      const target = link.getAttribute('href'); 
      if (target) {
        smoothScroll(target); 
      }
    });
    
    const link3 = document.querySelectorAll('#portable--toilets') ;

    for (var i = 0; i < link3.length; i++) {
      link3[i].addEventListener('click', function(event) {
            event.preventDefault();
            const target = link2.getAttribute('href'); 
            if (target) {
              smoothScroll(target); 
            }
        });
    }
    

    const link2 = document.querySelector('#process--book--now') as HTMLAnchorElement; 
    
    link2.addEventListener('click', (event) => {
      event.preventDefault(); 
      const target = link2.getAttribute('href'); 
      if (target) {
        smoothScroll(target); 
      }
    });
  }, [])

  return (
    <>
      <HeroBanner />
      <AboutUs />
      <BestDescribe />
      <PortaPotties />
      <Process />
      {/* <Products /> */}
      {/* <Whyus /> */}
      {/* <MaintenanceServices /> */}
      <Customers />
      <GoogleMaps />
      {/* <Blog /> */}
    </>
  );
};

export default HomePage;
