import React from "react";
import { useEffect } from "react";

const Process = () => {

  return (
    <section className="how--to--process">
      <div className="grid--container">
        <div className="grid">
          <div className="grid----">
            <div className="grid--wrapper">
              <div className="process--wrapper">
                <div className="prosess--content">
                  <div className="process--content--wrapper">
                    <div className="bold--heading--wrapper">
                      <div
                        className="heading--big"
                        data-aos="fade-up"
                        data-aos-duration="1000"
                      >
                        <h2>Our Simple Process!</h2>
                      </div>
                    </div>
                    {/* <p data-aos="fade-up" data-aos-duration="1000">
                      Lorem ipsum dolor sit amet, conser psum dolor sit amet,
                      Lorem ipsum dolor sit. Lorem ipsum dolor sit amet, conser
                      psum dolor sit amet, Lorem ipsum dolor sit.
                    </p> */}
                  </div>
                  <a
                    href="#best--describes"
                    id="process--book--now"
                    className="btn--process"
                    data-aos="fade"
                    data-aos-duration="1000"
                  >
                    Book Now
                  </a>
                </div>
                {/* <div className="process--listing">
                            <div className="process--listing--items">
                                <div className="process--listing--item" data-aos="fade-up" data-aos-duration="1000">
                                    Select Unit
                                </div>
                                <div className="process--listing--item" data-aos="fade-up" data-aos-duration="1000">
                                    where is it going?
                                </div>
                                <div className="process--listing--item" data-aos="fade-up" data-aos-duration="1000">
                                    Rental Fees
                                </div>
                                <div className="process--listing--item" data-aos="fade-up" data-aos-duration="1000">
                                    Ongoing Request
                                </div>
                            </div>
                        </div> */}
                <div className="process--listing">
                  <div className="process--listing--items">
                    <div
                      className="process--listing--item"
                      data-aos="fade-up"
                      data-aos-duration="1000"
                    >
                      Select Intended Use
                    </div>
                    <div
                      className="process--listing--item"
                      data-aos="fade-up"
                      data-aos-duration="1000"
                    >
                      Pin drop location on our map
                    </div>
                    <div
                      className="process--listing--item"
                      data-aos="fade-up"
                      data-aos-duration="1000"
                    >
                      Review quote
                    </div>
                    <div
                      className="process--listing--item"
                      data-aos="fade-up"
                      data-aos-duration="1000"
                    >
                      Book your unit
                    </div>
                    <div
                      className="process--listing--item"
                      data-aos="fade-up"
                      data-aos-duration="1000"
                    >
                      We do the rest!!!
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
