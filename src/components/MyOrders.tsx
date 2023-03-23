import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import IsLoadingHOC from "../Common/IsLoadingHOC";
import { authAxios } from "../config/config";
import { RootState } from "../Redux/rootReducer";

function MyOrders(props: any) {
  const [MyOrders, setMyOrders] = useState<string[]>([]);
  const { user } = useSelector((state: RootState) => state.auth);

  const { setLoading , isLoading } = props;

  useEffect(() => {
     getProductsListData();
  }, []);

  const getProductsListData = async () => {
    setLoading(true);
    await authAxios()
      .get(`/order/get-user-order-details/${user._id}`)
      .then(
        (response) => {
          setLoading(false);
          if (response.data.status === 1) {
            const resData = response.data.data;
            setMyOrders(resData);
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

  return (
    <div className="container">
      {MyOrders && MyOrders.length > 0 && (
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Sr. No</th>
              <th scope="col">product Quantity</th>
              <th scope="col">product Price</th>
              <th scope="col">Total Price</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {MyOrders.map((item: any, index) => (
              <tr key={index + 1}>
                <th scope="row">{index + 1}</th>
                <td>
                  {item.products &&
                    item.products.length > 0 &&
                    item.products.map((item: any) => {
                      return (
                        <>
                          <span>{item.product_quantity}</span>
                          <br />
                        </>
                      );
                    })}
                </td>
                <td>
                  {item.products &&
                    item.products.length > 0 &&
                    item.products.map((item: any) => {
                      return (
                        <>
                          <span>{item.product_price}</span>
                          <br />
                        </>
                      );
                    })}
                </td>
                <td>{item?.total_price}</td>
                <td>{item?.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {MyOrders.length === 0 && !isLoading && (
        <div className="pt-5">
          <h4 className="text-center">No Data Found</h4>
        </div>
      )}
    </div>
  );
}

export default IsLoadingHOC(MyOrders);
