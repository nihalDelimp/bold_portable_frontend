import React, { useState, useEffect } from "react";
import { authAxios } from "../config/config";
import { toast } from "react-toastify";
import { addToCart } from "../Redux/Reducers/productSlice";
import { useDispatch } from "react-redux";
import SimpleImageSlider from "react-simple-image-slider";

const ProductList = () => {
  const dispatch = useDispatch();
  const [products, setProduct] = useState([]);

  useEffect(() => {
    getProductsListData();
  }, []);

  const getProductsListData = async () => {
    await authAxios()
      .get("/product/get-products")
      .then(
        (response) => {
          if (response.data.status === 1) {
            const resData = response.data.data;
            setProduct(resData);
          }
        },
        (error) => {
          toast.error(error.response.data.message);
        }
      )
      .catch((error) => {
        console.log("errorrrr", error);
      });
  };

  const addToCartHandler = (item: any) => {
    const payload = {
      id: item.id,
      product_name: item.title,
      product_price: item.product_price,
    };
    dispatch(addToCart(item));
  };

  const getSliderImages = (product_images: string[]) => {
    if (product_images && product_images.length > 0) {
      let images_urls = product_images.map((item: any) => {
        return { url: `${process.env.REACT_APP_BASEURL}/${item.image_path}` };
      });
      console.log("images_urls", images_urls);

      if (images_urls && images_urls.length > 0) {
        return (
          <div>
            <SimpleImageSlider
              width={500}
              height={300}
              images={images_urls}
              showBullets={true}
              showNavs={true}
            />
          </div>
        );
      }
    }
  };

  return (
    <div>
      <div className="p-3">
        <div className="card-deck">
          {products?.map((item: any, index) => (
            <div key={index + 1} className="card">
              <img
                style={{ width: "100%", height: "60%" }}
                src={`${process.env.REACT_APP_BASEURL}/${item.product_images[0].image_path}`}
                className="card-img-top"
                alt="..."
              />
              <div className="card-body">
                <h5 className="card-title">{item.title} </h5>
                <p className="card-text">{item.description}</p>
                <p className="card-text">${item.product_price}</p>
              </div>
              <div className="card-footer">
                <button
                  onClick={() => addToCartHandler(item)}
                  className="btn btn-primary text-center"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      
      </div>
    </div>
  );
};

export default ProductList;
