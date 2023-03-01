import React, { useState, useEffect } from "react";
import NavBar from "../Common/NavBar";
import { authAxios } from "../config/config";
import { toast } from "react-toastify";

function AdminProducts() {
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
    <>
      <NavBar />

      <div className="container pt-2">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Decsription</th>
              <th scope="col">Image</th>
              <th scope="col">Price</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {products?.map((item: any, index) => (
              <tr key={index + 1}>
                <th scope="row">{index + 1}</th>
                <td>{item.title}</td>
                <td>{item.description}</td>
                <td>
                  <img
                    style={{ width: "60px", height: "60px" }}
                    src={`${process.env.REACT_APP_BASEURL}/${item.product_image}`}
                    alt="prodict"
                  />
                </td>
                <td>{item.product_price}</td>
                <td>
                  <button className="btn btn-primary">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default AdminProducts;
