import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import IsLoadingHOC from "../Common/IsLoadingHOC";
import { authAxios } from "../config/config";
import io, { Socket } from "socket.io-client";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/rootReducer";

const Notifications = (props: any) => {
  const { setLoading } = props;
  const [allNotifications, setAllNotifications] = useState<any>([]);
  const { user, accessToken } = useSelector((state: RootState) => state.auth);

  const socket = useRef<Socket>();
  socket.current = io(`${process.env.REACT_APP_SOCKET}`);

  useEffect(() => {
    getAllNotifications();
  }, []);

  useEffect(() => {
    if (socket.current) {
      socket.current.on("cancel_order_received", (order) => {
        getAllNotifications();
        if (user._id === order.user) {
        }
        console.log("cancel_order_received", order);
      });
    }
    return () => {
      socket.current?.disconnect();
    };
  }, []);

  const getAllNotifications = async () => {
    setLoading(true);
    await authAxios()
      .get("/notification/get-cancel-order-notfications")
      .then(
        (response) => {
          setLoading(false);
          if (response.data.status === 1) {
            console.log(response.data.data);
            setAllNotifications(response.data.data);
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

  const markAllNotificationsSeen = async () => {
    setLoading(true);
    await authAxios()
      .put(`/notification/mark-all-notfications-true`)
      .then(
        (response) => {
          setLoading(false);
          if (response.data.status === 1) {
            const resData = response.data.data;
            console.log("MarkReadALlNotifications_resData", resData);
            getAllNotifications();
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

  const markSpecificNotificationSeen = async (_id: string) => {
    setLoading(true);
    await authAxios()
      .patch(`/notification/${_id}/mark-specific-notification-as-seen`)
      .then(
        (response) => {
          setLoading(false);
          if (response.data.status === 1) {
            toast.success(response.data.message);
            getAllNotifications();
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
          {allNotifications && allNotifications.length > 0 && (
            <div className="notification--body">
              {allNotifications.map((item: any, index: any) => (
                <ul>
                  <li key={item._id}>
                    <span className="icons">
                      <i className="fa-sharp fa-solid fa-cart-shopping"></i>
                    </span>
                    <div className="notification--content">
                      <span>
                        Admin has cancelled your {item.order.products.length}{" "}
                        order
                      </span>
                    </div>
                    <div
                      onClick={() => markSpecificNotificationSeen(item._id)}
                      className="delete--notification"
                    >
                      <i className="fa-sharp fa-solid fa-circle-xmark"></i>
                    </div>
                  </li>
                </ul>
              ))}
              <div className="read--all--notification">
                <a onClick={markAllNotificationsSeen} className="btn">
                  Mark All as Read
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default IsLoadingHOC(Notifications);
