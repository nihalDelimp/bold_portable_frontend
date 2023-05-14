import React, {useEffect, useRef } from "react";
import { toast } from "react-toastify";
import IsLoadingHOC from "../Common/IsLoadingHOC";
import { authAxios } from "../config/config";
import io, { Socket } from "socket.io-client";
import { useSelector , useDispatch } from "react-redux";
import { RootState } from "../Redux/rootReducer";
import { saveNotification } from "../Redux/Reducers/notification";

const Notifications = (props: any) => {
  const { setLoading } = props;
  const dispatch = useDispatch()
  const { user, accessToken } = useSelector((state: RootState) => state.auth);
  const { notifications } = useSelector(
    (state: RootState) => state.notification
  );

  const socket = useRef<Socket>();
  socket.current = io(`${process.env.REACT_APP_SOCKET}`);


  useEffect(() => {
    if (accessToken) {
      getAllNotifications();
    }
  }, []);
  
  useEffect(() => {
    if (socket.current) {
      socket.current.on("cancel_order_received", (order) => {
        getAllNotifications();
        if (user._id === order.user) {
        }
      });
      socket.current.on("update_quote", (quotation) => {
        console.log("admin sent Invoice")
        toast.success('Admin has updated your quotation on as per your request')
        getAllNotifications();
        if (user._id === quotation.user) {
        }
      });
    }
    return () => {
      socket.current?.disconnect();
    };
  }, []);

  const getAllNotifications = async () => {
    await authAxios()
      .get("/notification/get-cancel-order-notfications")
      .then(
        (response) => {
          setLoading(false);
          if (response.data.status === 1) {
            dispatch(saveNotification(response.data.data));
          } else {
            toast.error(response.data.message);
          }
        },
        (error) => {
          if (error.response.status === 401) {
            console.log("Your session has expired. Please sign in again");
          }
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
            // toast.success(response.data.message);
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
          {notifications && notifications.length > 0 && (
            <div className="notification--body">
              {notifications.map((item: any, index: any) => (
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
