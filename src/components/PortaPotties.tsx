import React, { useEffect } from "react";
import $ from "jquery";

const PortaPotties = () => {
  useEffect(() => {
    $(".port--types--categorys--list .port--types--categorys--item h3").click(
      function () {
        var data_category2 = $(this).parent().attr("data-category");
        $(
          ".port--types--category--items .port--types--category--item"
        ).removeClass("active--port--type");
        $("#" + data_category2).addClass("active--port--type");
        $(
          ".port--types--categorys--list .port--types--categorys--item"
        ).removeClass("active--item");
        $(this).parent().addClass("active--item");
      }
    );
  }, []);

  return (
    <section className="port--types">
      <div className="grid--container">
        <div className="grid">
          <div className="grid----">
            <div className="grid--wrapper">
              <div className="port--types--top">
                <div
                  className="bold--heading--wrapper"
                  data-aos="fade-up"
                  data-aos-duration="1000"
                >
                  <h2>Types of Portable Toilets</h2>
                </div>
                <div className="port--types-category--wrapper">
                  <div
                    className="port--types--category--items"
                    data-aos="fade-up"
                    data-aos-duration="1000"
                  >
                    <div
                      className="port--types--category--item"
                      id="portcat--1"
                    >
                      <div className="img--wrapper">
                        <img
                          src={require("../asstes/image/deluxe-flush--1.png")}
                          alt=""
                          loading="lazy"
                        />
                      </div>
                      <div className="content--wrapper">
                        <a href="#" className="btn--arrow"></a>
                        <p>
                          spacious design, you won’t find a roomier standard
                          toilet! Equipped with urinal and hand sanitizing pump.
                          PJN3 image from Poly John use the lime green
                        </p>
                      </div>
                    </div>
                    <div
                      className="port--types--category--item"
                      id="portcat--2"
                    >
                      <div className="img--wrapper">
                        <img
                          src={require("../asstes/image/deluxe-flush--1.png")}
                          alt=""
                          loading="lazy"
                        />
                      </div>
                      <div className="content--wrapper">
                        <a href="#" className="btn--arrow"></a>
                        <p>
                          our standard toilet plus a hand washing sink - use the
                          same picture as above
                        </p>
                      </div>
                    </div>
                    <div
                      className="port--types--category--item active--port--type"
                      id="portcat--3"
                    >
                      <div className="img--wrapper">
                        <img
                          src={require("../asstes/image/deluxe-flush--1.png")}
                          alt=""
                          loading="lazy"
                        />
                      </div>
                      <div className="content--wrapper">
                        <a href="#" className="btn--arrow"></a>
                        <p>
                          oversized self closing door, roll in ground level
                          access, optional interior hand rails - use the comfort
                          XLT pic - again use the lime green
                        </p>
                      </div>
                    </div>
                    <div
                      className="port--types--category--item"
                      id="portcat--4"
                    >
                      <div className="img--wrapper">
                        <img
                          src={require("../asstes/image/deluxe-flush--1.png")}
                          alt=""
                          loading="lazy"
                        />
                      </div>
                      <div className="content--wrapper">
                        <a href="#" className="btn--arrow"></a>
                        <p>
                          we provide various options for high rise accessibility
                          and service - picture of polyLift and Sling Set
                        </p>
                      </div>
                    </div>
                    <div
                      className="port--types--category--item"
                      id="portcat--5"
                    >
                      <div className="img--wrapper">
                        <img
                          src={require("../asstes/image/deluxe-flush--1.png")}
                          alt=""
                          loading="lazy"
                        />
                      </div>
                      <div className="content--wrapper">
                        <a href="#" className="btn--arrow"></a>
                        <p>
                          Solar porta potties utilize solar-powered lighting to
                          prevent the need for electricity.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="port--types--categorys"
                data-aos="fade-up"
                data-aos-duration="1000"
              >
                <div className="port--types--categorys--list">
                  <div
                    className="port--types--categorys--item"
                    data-category="portcat--1"
                  >
                    <h3>Standard</h3>
                  </div>
                  <div
                    className="port--types--categorys--item"
                    data-category="portcat--2"
                  >
                    <h3>Standard with Sink</h3>
                  </div>
                  <div
                    className="port--types--categorys--item"
                    data-category="portcat--3"
                  >
                    <h3>Wheel Chair Accessible</h3>
                  </div>
                  <div
                    className="port--types--categorys--item active--item"
                    data-category="portcat--4"
                  >
                    <h3>High rise accessible</h3>
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

export default PortaPotties;
