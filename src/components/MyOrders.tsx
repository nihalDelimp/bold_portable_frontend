import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import IsLoadingHOC from "../Common/IsLoadingHOC";
import { authAxios } from "../config/config";
import { socket } from "../config/socket";
import { RootState } from "../Redux/rootReducer";
import io, { Socket } from "socket.io-client";

function MyOrders(props: any) {
  const [MyOrders, setMyOrders] = useState<string[]>([]);
  const { user } = useSelector((state: RootState) => state.auth);
  const socket = useRef<Socket>();
  const { setLoading, isLoading } = props;
  socket.current = io(`${process.env.REACT_APP_SOCKET}`);

  useEffect(() => {
    getProductsListData();
  }, []);


  useEffect(() => {
    if (socket.current) {
      socket.current.on("cancel_order_received", (orderId) => {
        console.log("cancel_order_received", orderId);
      });
    }
    return () => {
      socket.current?.disconnect();
    };
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
                    item.products.map((item: any , index2 :  number) => {
                      return (
                        <div key = {index2+2 + 'abc'}>
                          <span>{item.product_quantity}</span>
                          <br />
                        </div>
                      );
                    })}
                </td>
                <td>
                  {item.products &&
                    item.products.length > 0 &&
                    item.products.map((item: any , index3 : number) => {
                      return (
                        <div key = {index3+3 + 'kjf'}>
                          <span>{item.product_price}</span>
                          <br />
                        </div>
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
