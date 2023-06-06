import React from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

const HeroBanner = () => {
  const options = {
    loop: true,
    margin: 0,
    autoplay: true,
    nav: false,
    dots: false,
    autoplayTimeout: 3000,
    autoplaySpeed: 3000,
    mouseDrag: false,
    touchDrag: false,
    animateIn: "fadeIn",
    animateOut: "fadeOut",
    responsive: {
      0: {
        items: 1,
      },
      1000: {
        items: 1,
      },
    },
  };

  return (
    <section className="hero--banner">
      <div className="hero--slider">
        <OwlCarousel
          className="owl-carousel owl-theme"
          id="hero--slider"
          {...options}
        >
          <div className="item">
            <img src={require("../asstes/image/hero--banner.jpg")} alt="" />
          </div>
          <div className="item">
            <img src={require("../asstes/image/hero--slider-2.jpg")} alt="" />
          </div>
          <div className="item">
            <img src={require("../asstes/image/hero--banner.jpg")} alt="" />
          </div>
        </OwlCarousel>
      </div>
      <div className="hero--content-wrapper">
        <div className="btn--content">
          <div
            className="btn--wrapper"
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            <a href="#" className="btn btn--hero">
              Book Now
            </a>
          </div>
          <div
            className="btn--hero--righttext"
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            <p>Portable toilet</p>
          </div>
        </div>
        <div className="hero--marquee" data-aos="fade" data-aos-duration="1000">
          <div className="hero--marquee--wrapper">
            <h2>Bold Portable -</h2>
            <h2>Bold Portable -</h2>
            <h2>Bold Portable -</h2>
            <h2>Bold Portable -</h2>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
