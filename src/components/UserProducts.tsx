import React, { useState, useEffect } from "react";
import { authAxios } from "../config/config";
import { toast } from "react-toastify";

const  UserProducts = () => {
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
            setProduct(response.data.data);
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
  return (
    <div>
      <div className="p-3" >
      <div className="card-deck">
        {products?.map((item : any , index) => (
        <div key = {index + 1} className="card w-100">
          <img  style={{ width: "100%" , height : "60%"}}  src={`${process.env.REACT_APP_BASEURL}/${item.product_image}`} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{item.title} </h5>
            <p className="card-text">
            {item.description}
            </p>
          </div>
          <div className="card-footer">
            <button className="btn btn-primary text-center">Add to Cart</button>
          </div>
        </div>
        ))}
      </div>
    </div>
    </div>
  );
}

export default UserProducts;
