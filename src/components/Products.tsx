import React, { useState, useEffect } from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import { authAxios } from "../config/config";
import { toast } from "react-toastify";
import { addToCart } from "../Redux/Reducers/productSlice";
import { useDispatch } from "react-redux";
import SimpleImageSlider from "react-simple-image-slider";
import IsLoadingHOC from "../Common/IsLoadingHOC";

const Products = (props: any) => {
  const { setLoading } = props;
  const dispatch = useDispatch();
  const [products, setProduct] = useState([]);

  useEffect(() => {
    getProductsListData();
  }, []);

  console.log("products", products);

  const getProductsListData = async () => {
    //  setLoading(true);
    await authAxios()
      .get("/product/get-products")
      .then(
        (response) => {
          setLoading(false);
          if (response.data.status === 1) {
            const resData = response.data.data;
            setProduct(resData);
          }
        },
        (error) => {
          setLoading(false);
          toast.error(error.response.data.message);
        }
      )
      .catch((error) => {
        console.log("errorrrr", error);
      });
  };

  const options = {
    loop: true,
    margin: 0,
    autoplay: true,
    nav: true,
    dots: false,
    autoplayTimeout: 2000,
    autoplaySpeed: 1500,
    autoplayHoverPause: true,
    responsive: {
      0: {
        items: 1,
        margin: 15,
      },
      500: {
        items: 2,
      },
      600: {
        items: 3,
      },
      1025: {
        items: 4,
      },
      1380: {
        items: 5,
      },
    },
  };

  return (
    <section className="rentals">
      <div className="title--heading">
        <h3 data-aos="fade-up" data-aos-duration="2000">
          Rentals
        </h3>
        <h2 data-aos="fade-up" data-aos-duration="2000">
          Featured portable rentals
        </h2>
      </div>
      <div className="rentals--slider" data-aos="fade" data-aos-duration="2000">
        <div className="rentals--slider--wrapper">
          <OwlCarousel
            className="owl-carousel owl-theme"
            id="rentals--slider"
            {...options}
          >
            {products &&
              products.length > 0 &&
              products.map((item: any, index: number) => (
                <div key={index + 1} className="rentals--item">
                  <div className="rentals--item--wrapper">
                    <div className="thumbnuil">
                      <Swiper
                        modules={[Navigation, Pagination, Scrollbar, A11y]}
                        spaceBetween={10}
                        slidesPerView={1}
                        pagination={{ clickable: true }}
                      >
                        {item.product_images &&
                          item.product_images.length > 0 &&
                          item.product_images.map(
                            (image: any, index2: number) => (
                              <SwiperSlide key = {index2*2}>
                                <div className="item">
                                  <a href="#">
                                    {" "}
                                    <img
                                       src={`${process.env.REACT_APP_BASEURL}/${image.image_path}`}
                                      alt=""
                                    />
                                  </a>
                                </div>
                              </SwiperSlide>
                            )
                          )}
                      </Swiper>
                    </div>
                    <div className="rentals--content">
                      <a href="#">
                        <h3>{item.title}</h3>
                      </a>
                      <p className="rentals--description">{item.description}</p>
                      <div className="rentals--cart--data">
                        <a href="#" className="add--to--cart">
                          Add To cart
                        </a>
                        <span className="price">$110</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

            <div className="rentals--item">
              <div className="rentals--item--wrapper">
                <div className="thumbnuil">
                  <Swiper
                    modules={[Navigation, Pagination, Scrollbar, A11y]}
                    spaceBetween={10}
                    slidesPerView={1}
                    pagination={{ clickable: true }}
                  >
                    <SwiperSlide>
                      <div className="item">
                        <a href="#">
                          {" "}
                          <img
                            src={require("../asstes/image/pd--1.png")}
                            alt=""
                          />
                        </a>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide>
                      <div className="item">
                        <a href="#">
                          {" "}
                          <img
                            src={require("../asstes/image/pd--2.png")}
                            alt=""
                          />
                        </a>
                      </div>
                    </SwiperSlide>
                  </Swiper>
                </div>
                <div className="rentals--content">
                  <a href="#">
                    <h3>We are best for any industrial business solutions</h3>
                  </a>
                  <p className="rentals--description">
                    Separate men’s & women’s restrooms, Flushing toilets,
                    Waterless urinal
                  </p>
                  <div className="rentals--cart--data">
                    <a href="#" className="add--to--cart">
                      Add To cart
                    </a>
                    <span className="price">$110</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="rentals--item">
              <div className="rentals--item--wrapper">
                <div className="thumbnuil">
                  <Swiper
                    modules={[Navigation, Pagination, Scrollbar, A11y]}
                    spaceBetween={10}
                    slidesPerView={1}
                    pagination={{ clickable: true }}
                  >
                    <SwiperSlide>
                      <div className="item">
                        <a href="#">
                          {" "}
                          <img
                            src={require("../asstes/image/pd--1.png")}
                            alt=""
                          />
                        </a>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide>
                      <div className="item">
                        <a href="#">
                          {" "}
                          <img
                            src={require("../asstes/image/pd--2.png")}
                            alt=""
                          />
                        </a>
                      </div>
                    </SwiperSlide>
                  </Swiper>
                </div>
                <div className="rentals--content">
                  <a href="#">
                    <h3>We are best for any industrial business solutions</h3>
                  </a>
                  <p className="rentals--description">
                    Separate men’s & women’s restrooms, Flushing toilets,
                    Waterless urinal
                  </p>
                  <div className="rentals--cart--data">
                    <a href="#" className="add--to--cart">
                      Add To cart
                    </a>
                    <span className="price">$110</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="rentals--item">
              <div className="rentals--item--wrapper">
                <div className="thumbnuil">
                  <Swiper
                    modules={[Navigation, Pagination, Scrollbar, A11y]}
                    spaceBetween={10}
                    slidesPerView={1}
                    pagination={{ clickable: true }}
                  >
                    <SwiperSlide>
                      <div className="item">
                        <a href="#">
                          {" "}
                          <img
                            src={require("../asstes/image/pd--1.png")}
                            alt=""
                          />
                        </a>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide>
                      <div className="item">
                        <a href="#">
                          {" "}
                          <img
                            src={require("../asstes/image/pd--2.png")}
                            alt=""
                          />
                        </a>
                      </div>
                    </SwiperSlide>
                  </Swiper>
                </div>
                <div className="rentals--content">
                  <a href="#">
                    <h3>We are best for any industrial business solutions</h3>
                  </a>
                  <p className="rentals--description">
                    Separate men’s & women’s restrooms, Flushing toilets,
                    Waterless urinal
                  </p>
                  <div className="rentals--cart--data">
                    <a href="#" className="add--to--cart">
                      Add To cart
                    </a>
                    <span className="price">$110</span>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="rentals--item">
              <div className="rentals--item--wrapper">
                <div className="thumbnuil">
                  <Swiper
                    modules={[Navigation, Pagination, Scrollbar, A11y]}
                    spaceBetween={10}
                    slidesPerView={1}
                    pagination={{ clickable: true }}
                  >
                    <SwiperSlide>
                      <div className="item">
                        <a href="#">
                          {" "}
                          <img
                            src={require("../asstes/image/pd--1.png")}
                            alt=""
                          />
                        </a>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide>
                      <div className="item">
                        <a href="#">
                          {" "}
                          <img
                            src={require("../asstes/image/pd--2.png")}
                            alt=""
                          />
                        </a>
                      </div>
                    </SwiperSlide>
                  </Swiper>
                </div>
                <div className="rentals--content">
                  <a href="#">
                    <h3>We are best for any industrial business solutions</h3>
                  </a>
                  <p className="rentals--description">
                    Separate men’s & women’s restrooms, Flushing toilets,
                    Waterless urinal
                  </p>
                  <div className="rentals--cart--data">
                    <a href="#" className="add--to--cart">
                      Add To cart
                    </a>
                    <span className="price">$110</span>
                  </div>
                </div>
              </div>
            </div> */}
          </OwlCarousel>
        </div>
      </div>
    </section>
  );
};

export default IsLoadingHOC(Products);
