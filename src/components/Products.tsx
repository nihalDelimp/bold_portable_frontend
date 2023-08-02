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
import { limitDesc } from "../Helper/constants";


interface MyComponentProps {
  setLoading: (isComponentLoading: boolean) => void;
}


const Products = (props: MyComponentProps) => {
  const { setLoading } = props;
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProductsListData();
  }, []);

 

  const getProductsListData = async () => {
    setLoading(true);
    await authAxios()
      .get("/product/get-products")
      .then(
        (response) => {
          setLoading(false);
          if (response.data.status === 1) {
            const resData = response.data.data.products;
            setProducts(resData);
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
    autoplay: false,
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

  const addToCartHandler = (item: any) => {
    dispatch(addToCart(item));
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
          {products && products.length > 0 && (
            <OwlCarousel className="owl-theme" {...options}>
              {products.map((item: any, index: number) => (
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
                              <SwiperSlide key={index2 * 2}>
                                <div className="item">
                                  <a href="#">
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
                        <h3>{`${item?.title.substring(0, 20)} ${
                          item.title.length > 20 ? "..." : ""
                        } `}</h3>
                      </a>
                      <p className="rentals--description">
                        {` ${item?.description.substring(0, limitDesc)} ${
                          item.description.length > limitDesc ? "..." : ""
                        }  `}
                      </p>
                      <div className="rentals--cart--data">
                        <button
                          onClick={() => addToCartHandler(item)}
                          className="add--to--cart"
                        >
                          Add To cart
                        </button>
                        <span className="price">${item.product_price}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </OwlCarousel>
          )}
        </div>
      </div>
    </section>
  );
};

export default IsLoadingHOC(Products);
