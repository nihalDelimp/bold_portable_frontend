import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import IsLoadingHOC from "../Common/IsLoadingHOC";
import { authAxios } from "../config/config";
import io, { Socket } from "socket.io-client";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/rootReducer";


const Notifications= (props: any)=> {
  const { setLoading } = props;
  const [cancelData, setCancelData]= useState<any>([])
  const { user, accessToken } = useSelector((state: RootState) => state.auth);


  const socket = useRef<Socket>();
  socket.current = io(`${process.env.REACT_APP_SOCKET}`);

  
  useEffect(()=>{
    getCancelOrderNotifications();
  },[])

  useEffect(() => {
    if (socket.current) {
      socket.current.on("cancel_order_received", (order) => {
        getCancelOrderNotifications();
        // toast.warning("Your order has cancelled");
        if (user._id === order.user) {
        }
        console.log("cancel_order_received", order);
      });
    }
    return () => {
      socket.current?.disconnect();
    };
  }, []);

const getCancelOrderNotifications = async () => {
  setLoading(true);
  await authAxios()
    .get("/notification/get-cancel-order-notfications")
    .then(
      (response) => {
        setLoading(false);
        if (response.data.status === 1) {
          console.log(response.data.data)
          setCancelData(response.data.data)
        } else {
          toast.error(response.data.message);
        }
      },
      (error) => {
        setLoading(false);
      }
    )
    .catch((error) => {
      console.log("errorrrr", error);
    });
};

  return (
    <React.Fragment>
      <div className="notifications--dropdown">
        <div className="notifications--inner">
          <div className="notification--header">
          <ul>
                <li>
                <span>Notifications</span>
              </li>
              <li>
                <div className="close--notification">
                  <i className="fa-solid fa-xmark"></i>
                </div>
              </li>
            </ul>
             
          </div>
          <div className="notification--body">
          {cancelData && cancelData.map((item:any,index:any)=>(
                <ul>
                <li>
                  <span className="icons">
                    <i className="fa-sharp fa-solid fa-cart-shopping"></i>
                  </span>
                  <div className="notification--content">
                    <span>Admin has cancelled your {item.order.products.length} order</span>
                  </div>
                  <div className="delete--notification">
                    <i className="fa-sharp fa-solid fa-circle-xmark"></i>
                  </div>
                </li>
              </ul>
               ))}
           
            <div className="read--all--notification">
              <a href="#" className="btn">
                Mark All as Read
              </a>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default IsLoadingHOC(Notifications);
