import React, { useState } from "react";
import { authAxios } from "../config/config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";



const Signup = () => {
  const [product, setProduct] = useState({
    title: "",
    description: "",
    product_image: "",
    product_price: "",
  });

  const navigate = useNavigate()

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log("user", product);
     const formData = new FormData();
     formData.append("title", product.title);
     formData.append("description", product.description);
     formData.append("product_image", product.product_image);
     formData.append("product_price", product.product_price);
    await authAxios()
      .post("/product/add-products", formData)
      .then(
        (response) => {
          if (response.data.status === 1) {
            toast.success("product add successfully");
            navigate('/products')
          } else {
            toast.error(response.data.message);
          }
        },
        (error) => {
          toast.error(error.response.data.message);
          console.log(error);
        }
      )
      .catch((error) => {
        console.log("errorrrr", error);
      });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
     const {name } = e.target
     const fileList = e.target.files;
     if (!fileList){
        return;
     } 
     console.log("fileList" ,fileList)
     setProduct((prev) => ({
        ...prev,
        [name]: fileList[0]
      }));
  }

  return (
    <>
      <div className="container mt-3">
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="inputEmail4">Product Name</label>
              <input
                value={product.title}
                onChange={handleChange}
                type="text"
                name="title"
                className="form-control"
                id="inputEmail4"
                placeholder="Enter product name"
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="inputEmail4">Description</label>
              <input
                value={product.description}
                onChange={handleChange}
                type="text"
                name="description"
                className="form-control"
                id="inputEmail4"
                placeholder="Enter description"
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="inputEmail4">price</label>
              <input
                value={product.product_price}
                name="product_price"
                onChange={handleChange}
                type="text"
                className="form-control"
                id="inputEmail4"
                placeholder="Enter price"
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="inputPassword4">Password</label>
              <input
                type="file"
                name="product_image"
                onChange={handleChangeImage}
                className="form-control"
                id="inputPassword4"
                placeholder="upload image"
              />
            </div>
          </div>
          <div className="row mt-3">
            <div className="pb-5 d-flex justify-content-center">
              <button type="submit" className="btn btn-success mr-3 ml-3 ">
                Submit
              </button>
              <br />
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Signup;
