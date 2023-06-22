import React from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
const Blog = () => {
  const options = {
    loop: true,
    margin: 80,
    autoplay: true,
    nav: false,
    dots: false,
    autoplayTimeout: 2000,
    autoplaySpeed: 1500,
    autoplayHoverPause: true,
    responsive: {
      0: {
        items: 1,
        margin: 20,
      },

      450: {
        items: 1,
        margin: 30,
      },
      500: {
        items: 2,
        margin: 30,
      },
      767: {
        items: 3,
        margin: 30,
      },
      1024: {
        items: 3,
        margin: 30,
      },
      1920: {
        items: 4,
      },
    },
  };

  return (
    <section className="blog">
      <div className="title--heading">
        <h3 data-aos="fade-up" data-aos-duration="1000">
          Blogs
        </h3>
        <h2 data-aos="fade-up" data-aos-duration="1000">
          News & Articles
        </h2>
      </div>
      <div className="blog--slider" data-aos="fade-up" data-aos-duration="1000">
        <div className="blog--slider--wrapper">
          <OwlCarousel
            className="owl-carousel owl-theme"
            id="blog--slider"
            {...options}
          >
            <div className="blog--item">
              <div className="blog--item--wrapper">
                <div className="thumbnuil">
                  <img
                    src={require("../asstes/image/post--1.jpg")}
                    alt="post" loading="lazy"
                  />
                </div>
                <div className="blog--content">
                  <span className="dates">21 Feb</span>
                  <h3>We are best for any industrial business solutions</h3>
                  <a href="#" className="read--more"></a>
                </div>
              </div>
            </div>
            <div className="blog--item">
              <div className="blog--item--wrapper">
                <div className="thumbnuil">
                  <img
                    src={require("../asstes/image/post--1.jpg")}
                    alt="post" loading="lazy"
                  />
                </div>
                <div className="blog--content">
                  <span className="dates">21 Feb</span>
                  <h3>We are best for any industrial business solutions</h3>
                  <a href="#" className="read--more"></a>
                </div>
              </div>
            </div>
            <div className="blog--item">
              <div className="blog--item--wrapper">
                <div className="thumbnuil">
                  <img
                    src={require("../asstes/image/post--1.jpg")}
                    alt="post" loading="lazy"
                  />
                </div>
                <div className="blog--content">
                  <span className="dates">21 Feb</span>
                  <h3>We are best for any industrial business solutions</h3>
                  <a href="#" className="read--more"></a>
                </div>
              </div>
            </div>
            <div className="blog--item">
              <div className="blog--item--wrapper">
                <div className="thumbnuil">
                  <img
                    src={require("../asstes/image/post--1.jpg")}
                    alt="post" loading="lazy"
                  />
                </div>
                <div className="blog--content">
                  <span className="dates">21 Feb</span>
                  <h3>We are best for any industrial business solutions</h3>
                  <a href="#" className="read--more"></a>
                </div>
              </div>
            </div>
            <div className="blog--item">
              <div className="blog--item--wrapper">
                <div className="thumbnuil">
                  <img
                    src={require("../asstes/image/post--1.jpg")}
                    alt="post" loading="lazy"
                  />
                </div>
                <div className="blog--content">
                  <span className="dates">21 Feb</span>
                  <h3>We are best for any industrial business solutions</h3>
                  <a href="#" className="read--more"></a>
                </div>
              </div>
            </div>
            <div className="blog--item">
              <div className="blog--item--wrapper">
                <div className="thumbnuil">
                  <img
                    src={require("../asstes/image/post--1.jpg")}
                    alt="post" loading="lazy"
                  />
                </div>
                <div className="blog--content">
                  <span className="dates">21 Feb</span>
                  <h3>We are best for any industrial business solutions</h3>
                  <a href="#" className="read--more"></a>
                </div>
              </div>
            </div>
          </OwlCarousel>
        </div>
      </div>
    </section>
  );
};

export default Blog;
