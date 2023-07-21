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
                  At our core, we prioritize simplicity and efficiency by harnessing the power of innovative technology. Our
                  goal is to make your experience seamless and hassle-free. With our user-friendly online booking system,
                  you can easily reserve a unit anytime you need, and we even provide Google Map placement for precise
                  location selection.
                  Additionally, our restrooms are equipped with QR code technology, allowing for convenient and instant worksite or public service requests, as well as quick and easy booking. We stay on
                  top of your unit's needs by receiving instant notifications when it requires servicing.
                  To streamline
                  communication, we offer a text platform that ensures simple and efficient customer interaction while
                  promptly notifying you about service requests. Managing your account is effortless with our online
                  customer portal, providing automated invoicing, convenient payment options, and hassle-free contract
                  management. Our commitment extends beyond technology, we strive to deliver exceptional service,
                  cleanliness, and overall satisfaction.</p>

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
