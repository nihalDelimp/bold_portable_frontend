import React, { useState, useEffect } from "react";
import Construction from "../QuotationModal/Construction";
import SpecialEvents from "../QuotationModal/SpecialEvents";
import DisasterRelief from "../QuotationModal/DisasterRelief";
import IndividualNeeds from "../QuotationModal/IndividualNeeds";
import FarmWinery from "../QuotationModal/FarmWinery";
import $ from "jquery";

const BestDescribe = () => {
  useEffect(() => {
    $(".describe--categorys--list .describe--categorys--item").mouseenter(
      function () {
        var data_category = $(this).attr("data-category");
        $(".describe--category--items .describe--category--item").removeClass(
          "active--cat--img"
        );
        $("#" + data_category).addClass("active--cat--img");
        $(".describe--categorys--list .describe--categorys--item").removeClass(
          "active--item"
        );
        $(this).addClass("active--item");
      }
    );
  }, []);

  useEffect(() => {
    $(document).on("click", function (e) {
      if (
        $(e.target).closest(".default--popup--wrapper").length === 0 &&
        $(e.target).closest(".submit--from").length === 0 &&
        $(e.target).closest(
          ".describe--categorys--list .describe--categorys--item"
        ).length === 0
      ) {
        $(".default--popup").removeClass("active--popup");
        $(".default--form ").removeClass("active--from");
      }
    });

    $(".describe--categorys--list .describe--categorys--item").click(
      function () {
        var data_category = $(this).attr("data-category");
        $(".describe--category--items .describe--category--item").removeClass(
          "active--cat--img"
        );
        $("#" + data_category).addClass("active--cat--img");
        $(".default--popup").addClass("active--popup");
        $("." + data_category).addClass("active--from");
        $(".describe--categorys--list .describe--categorys--item").removeClass(
          "active--item"
        );
        $(this).addClass("active--item");
      }
    );
  }, []);

  return (
    <>
      <section className="best--describes" id="best--describes">
        <div className="grid--container">
          <div className="grid">
            <div className="grid----">
              <div className="grid--wrapper">
                <div className="describes--wrapper">
                  <div className="bold--heading--wrapper">
                    <div
                      className="heading--big"
                      data-aos="fade-up"
                      data-aos-duration="1000"
                    >
                      <h2>What do you need your restroom for?</h2>
                    </div>
                  </div>
                  <div className="describe-category--wrapper">
                    <div
                      className="describe--category--items"
                      data-aos="fade"
                      data-aos-duration="1500"
                    >
                      <div
                        className="describe--category--item active--cat--img"
                        id="cat--1"
                      >
                        <img
                          src={require("../asstes/image/port--1.png")}
                          alt=""
                          loading="lazy"
                        />
                      </div>
                      <div className="describe--category--item" id="cat--2">
                        <img
                          src={require("../asstes/image/port--2.png")}
                          alt=""
                          loading="lazy"
                        />
                      </div>
                      <div className="describe--category--item" id="cat--3">
                        <img
                          src={require("../asstes/image/port--1.png")}
                          alt=""
                          loading="lazy"
                        />
                      </div>
                      <div className="describe--category--item" id="cat--4">
                        <img
                          src={require("../asstes/image/port--2.png")}
                          alt=""
                          loading="lazy"
                        />
                      </div>
                      <div className="describe--category--item" id="cat--5">
                        <img
                          src={require("../asstes/image/port--1.png")}
                          alt=""
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="describe--categorys">
                  <div
                    className="describe--categorys--list"
                    data-aos="fade-up"
                    data-aos-duration="1000"
                  >
                    <div
                      className="describe--categorys--item"
                      data-category="cat--1"
                    >
                      <h3>Construction</h3>
                      <p>From a home renovation to high rise projects.</p>
                      <a className="btn--arrow"></a>
                    </div>
                    <div
                      className="describe--categorys--item"
                      data-category="cat--4"
                    >
                      <h3>Orchard, Farm, Winery</h3>
                      <p>
                        From your small hobby orchard or winery to large
                        commercial farms.
                      </p>
                      <a className="btn--arrow"></a>
                    </div>
                    <div
                      className="describe--categorys--item"
                      data-category="cat--5"
                    >
                      <h3>Individual Needs</h3>
                      <p>
                        From your bathroom reno or building a pool to a backyard
                        party.
                      </p>
                      <a className="btn--arrow"></a>
                    </div>
                    <div
                      className="describe--categorys--item"
                      data-category="cat--2"
                    >
                      <h3>Special Events</h3>
                      <p>
                        concerts, sporting events, fairs, festivals, weddings,
                        etc. Need special colors and features for your event?
                        We’ll customize it to make it happen.
                      </p>
                      <a className="btn--arrow "></a>
                    </div>
                    <div
                      className="describe--categorys--item active--item"
                      data-category="cat--3"
                    >
                      <h3>Disaster Relief</h3>
                      <p>From a house flood, to forest fires etc.</p>
                      <a className="btn--arrow "></a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="default--popup">
        <div className="default--popup--wrapper">
          <Construction />
          <SpecialEvents />
          <DisasterRelief />
          <FarmWinery />
          <IndividualNeeds />
        </div>
      </section>
    </>
  );
};

export default BestDescribe;
