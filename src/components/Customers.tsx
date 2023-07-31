import React from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { Link } from "react-router-dom";

const Customers = () => {
  const options = {
    loop: true,
    margin: 0,
    autoplay: true,
    nav: false,
    dots: false,
    autoplayTimeout: 2000,
    autoplaySpeed: 1000,
    responsive: {
      0: {
        items: 3,
      },
      600: {
        items: 5,
      },
      1000: {
        items: 8,
      },
    },
  };

  return (
    <section className="customers">
      <div className="title--heading">
        <h3 data-aos="fade-up" data-aos-duration="1000">
          Customers
        </h3>
        <h2 data-aos="fade-up" data-aos-duration="1000">
          Organizations that we work with:
        </h2>
      </div>
      <OwlCarousel
        className="customer--slider"
        data-aos="fade-up"
        data-aos-duration="1500"
        {...options}
      >
        <div className="customer--logo">
          {" "}
          <Link to={`https://www.customvac.com/`} target="_blank">
            <img
              src={require("../asstes/image/customers/Custom-Vac.png")}
              alt=""
              loading="lazy"
            />
          </Link>
        </div>
        <div className="customer--logo">
          {" "}
          <Link to={`https://www.polyjohn.com/`} target="_blank">
            <img
              src={require("../asstes/image/customers/Poly-John.png")}
              alt=""
              loading="lazy"
            />
          </Link>
        </div>
        <div className="customer--logo">
          {" "}
          <Link to={`https://www.psai.org/`} target="_blank">
            <img
              src={require("../asstes/image/customers/PSAI.png")}
              alt=""
              loading="lazy"
            />
          </Link>
        </div>

        {/* <div className="customer--logo">
          {" "}
          <img
            src={require("../asstes/image/customers/customer--icon--4.png")}
            alt=""
          />
        </div>
        <div className="customer--logo">
          {" "}
          <img
            src={require("../asstes/image/customers/customer--icon--5.png")}
            alt=""
          />
        </div>
        <div className="customer--logo">
          {" "}
          <img
            src={require("../asstes/image/customers/customer--icon--6.png")}
            alt=""
          />
        </div>
        <div className="customer--logo">
          {" "}
          <img
            src={require("../asstes/image/customers/customer--icon--7.png")}
            alt=""
          />
        </div>
        <div className="customer--logo">
          {" "}
          <img
            src={require("../asstes/image/customers/customer--icon--8.png")}
            alt=""
          />
        </div>
        <div className="customer--logo">
          {" "}
          <img
            src={require("../asstes/image/customers/customer--icon--8.png")}
            alt=""
          />
        </div> */}
      </OwlCarousel>
    </section>
  );
};

export default Customers;
