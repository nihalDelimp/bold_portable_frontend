import React, { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";

const AboutUs = () => {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    var rotate = gsap
      .timeline({
        scrollTrigger: {
          trigger: ".hero--banner",
          pin: false,
          scrub: 1,
          start: "bottom bottom",
          end: "+=1000",
        },
      })
      .to(".left--sq--box", {
        rotation: 25,
        duration: 1,
        ease: "none",
      });

    var rotate2 = gsap
      .timeline({
        scrollTrigger: {
          trigger: ".hero--banner",
          pin: false,
          scrub: 1,
          start: "bottom bottom",
          end: "+=1000",
        },
      })
      .to(".right--sq--box", {
        rotation: -25,
        duration: 1,
        ease: "none",
      });
  }, []);

  return (
    <section className="about--us">
      <div className="grid">
        <div className="grid----">
          <div className="grid--wrapper">
            <div className="about--us--wrapper">
              <div className="left--sq--box"></div>
              <div className="about--us--content">
                <div className="title--heading">
                  <h3 data-aos="fade-up" data-aos-duration="1000">
                    About Us
                  </h3>
                  <h2 data-aos="fade-up" data-aos-duration="1000">
                    We do business differently!
                  </h2>
                </div>
                <p data-aos="fade-up" data-aos-duration="1000">
                  We’re committed to simplicity and efficiency through
                  innovative technology Simple easy online booking any time you
                  need with google map placement of your unit QR code enabled
                  restrooms for conveniant, instant worksite or public service
                  requests, and or booking. When you’re unit needs service, we
                  know instantly!
                </p>

                <p data-aos="fade-up" data-aos-duration="1000">
                  Text platform for simple, efficient customer communication and
                  instant notification of service requests
                </p>

                <p data-aos="fade-up" data-aos-duration="1000">
                  Online customer accounts and portal for convenient automated
                  invoicing, payments, and contract management
                </p>

                <p data-aos="fade-up" data-aos-duration="1000">
                  We’re committed to providing you with simplicity, efficiency,
                  cleanliness and exceptional service!
                </p>

                <Link
                  to="/about-us"
                  className="btn btn--primary"
                  data-aos="fade-up"
                  data-aos-duration="1000"
                >
                  More About Us
                </Link>
                <div className="line--1"></div>
              </div>
              <div className="right--sq--box"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
