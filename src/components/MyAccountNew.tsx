import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authAxios } from "../config/config";
import IsLoadingHOC from "../Common/IsLoadingHOC";
import { toast } from "react-toastify";
import { logout } from "../Redux/Reducers/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../Redux/rootReducer";
import { getFormatedDate } from "../Helper";

interface MyComponentProps {
  setLoading: (isComponentLoading: boolean) => void;
}

function MyAccountNew(props: MyComponentProps) {
  const { setLoading } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemPerPage] = useState<number>(100);
  const [myQuotations, setMyQuotations] = useState<any[]>([]);
  const [mySubscriptions, setMySubscriptions] = useState<any[]>([]);
  const [activeSidebar, setActiveSidebar] = useState<string>("DASHBOARD");
  const [isEditAble, setEditAble] = useState<boolean>(false);
  const { user, accessToken } = useSelector((state: RootState) => state.auth);

  const [userData, setUserData] = useState({
    name: user.name,
    email: user.email,
    mobile: user.mobile,
    new_password: "",
    confirm_new_password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  console.log("myQuotations", myQuotations);
  console.log("mySubscriptions", mySubscriptions);

  useEffect(() => {
    getMyQuotationsData();
    getMySubscriptionsData();
  }, []);

  const getMyQuotationsData = async () => {
    setLoading(true);
    await authAxios()
      .get(
        `quotation/get-quotation-for-specific-user?page=${currentPage}&limit=${itemsPerPage}`
      )
      .then(
        (response) => {
          setLoading(false);
          if (response.data.status === 1) {
            const resData = response.data.data;
            setMyQuotations(resData.quotations);
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

  const getMySubscriptionsData = async () => {
    setLoading(true);
    await authAxios()
      .get(`/payment/subscription`)
      .then(
        (response) => {
          setLoading(false);
          if (response.data.status === 1) {
            const resData = response.data.data;
            setMySubscriptions(resData.subscriptions);
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

  const handleLogout = () => {
    dispatch(logout(false));
    navigate("/");
  };

  return (
    <>
      <section className="user--dashboard">
        <div className="grid--container">
          <div className="dashboard--wrapper">
            <div className="user--sidebar">
              <div id="user--dashboard" className="menu--icon">
                <i className="fa-solid fa-bars"></i>
              </div>
              <div className="user--sidebar--container">
                <div className="sidebar--title">
                  <h2>Menu</h2>
                </div>
                <div className="sidebar--wrapper">
                  <ul>
                    <li>
                      <a
                        onClick={() => setActiveSidebar("DASHBOARD")}
                        className={
                          activeSidebar === "DASHBOARD" ? "active" : ""
                        }
                      >
                        {" "}
                        <img
                          src={require("../asstes/image/Dashboard.png")}
                          alt=""
                        />{" "}
                        <span>Dashboard</span>
                      </a>
                    </li>
                    <li>
                      <a
                        onClick={() => setActiveSidebar("NOTIFICATIONS")}
                        className={
                          activeSidebar === "NOTIFICATIONS" ? "active" : ""
                        }
                      >
                        {" "}
                        <img
                          src={require("../asstes/image/Notification.png")}
                          alt=""
                        />{" "}
                        <span>Notification</span>
                      </a>
                    </li>
                    <li>
                      <a
                        onClick={() => setActiveSidebar("MY_QUOTATIONS")}
                        className={
                          activeSidebar === "MY_QUOTATIONS" ? "active" : ""
                        }
                      >
                        {" "}
                        <img
                          src={require("../asstes/image/Quotation.png")}
                          alt=""
                        />{" "}
                        <span>Quotation</span>
                      </a>
                    </li>
                    <li>
                      <a
                        onClick={() => setActiveSidebar("MY_SUBSCRIPTIONS")}
                        className={
                          activeSidebar === "MY_SUBSCRIPTIONS" ? "active" : ""
                        }
                      >
                        {" "}
                        <img
                          src={require("../asstes/image/Subscription.png")}
                          alt=""
                        />{" "}
                        <span>Subscription</span>
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="sidebar--title sidebar--title--2">
                  <h2>Other</h2>
                </div>
                <div className="sidebar--wrapper">
                  <ul>
                    <li>
                      <a
                        onClick={() => setActiveSidebar("MY_ACCOUNT")}
                        className={
                          activeSidebar === "MY_ACCOUNT" ? "active" : ""
                        }
                      >
                        {" "}
                        <img
                          src={require("../asstes/image/Settings.png")}
                          alt=""
                        />{" "}
                        <span>Settings</span>
                      </a>
                    </li>
                    <li>
                      <a onClick={handleLogout}>
                        {" "}
                        <img
                          src={require("../asstes/image/Logout.png")}
                          alt=""
                        />{" "}
                        <span>Logout</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="put--quoats">
                <img src={require("../asstes/image/put--quots.png")} alt="" />
                <a href="#">Put Quotes</a>
              </div>
            </div>
            <div className="user--dashboard--content">
              <div className="user--dashboard--content--wrapper">
                {activeSidebar === "DASHBOARD" && (
                  <div className="dashboard--content">
                    <div className="dashboard--content--title">
                      <h2>
                        <span>Dashboard</span> <span>Hello Jhon!</span>
                      </h2>
                    </div>
                    <div className="table--wrapper">
                      <div className="table--title">
                        <span>Quotation</span>{" "}
                        <span>
                          <a href="#">View All</a>
                        </span>
                      </div>
                      <table>
                        <thead>
                          <tr>
                            <th>Order ID</th>
                            <th>Phone Number</th>
                            <th>Placement Date</th>
                            <th>Type</th>
                            <th>Service Frequency</th>
                            <th>Status</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>1234567889123</td>
                            <td>+0 1234567890</td>
                            <td>15/05/2023</td>
                            <td>Events</td>
                            <td>once per week</td>
                            <td className="active">Active</td>
                            <td>
                              <button
                                type="button"
                                className="action--table"
                              ></button>
                            </td>
                          </tr>
                          <tr>
                            <td>1234567889123</td>
                            <td>+0 1234567890</td>
                            <td>15/05/2023</td>
                            <td>Events</td>
                            <td>once per week</td>
                            <td className="processing">Active</td>
                            <td>
                              <button
                                type="button"
                                className="action--table"
                              ></button>
                            </td>
                          </tr>
                          <tr>
                            <td>1234567889123</td>
                            <td>+0 1234567890</td>
                            <td>15/05/2023</td>
                            <td>Events</td>
                            <td>once per week</td>
                            <td className="cancel">Active</td>
                            <td>
                              <button
                                type="button"
                                className="action--table"
                              ></button>
                            </td>
                          </tr>
                          <tr>
                            <td>1234567889123</td>
                            <td>+0 1234567890</td>
                            <td>15/05/2023</td>
                            <td>Events</td>
                            <td>once per week</td>
                            <td className="active">Active</td>
                            <td>
                              <button
                                type="button"
                                className="action--table"
                              ></button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="dashboard--notification">
                      <div className="notification--wrapper">
                        <div className="table--title">
                          <span>Quotation</span>{" "}
                          <span>
                            <a href="#">View All</a>
                          </span>
                        </div>
                        <div className="notification--list">
                          <ul>
                            <li>
                              <div className="notification--list--item">
                                <div className="thumbnuil">
                                  <img
                                    src={require("../asstes/image/nt--img.png")}
                                    alt=""
                                  />
                                </div>
                                <div className="notification--data">
                                  <h3>Subscription Update</h3>
                                  <p>
                                    Portable Restroom Trailer Lorem ipsum dolor
                                    sit amet, consectetuer adipiscing elit....
                                  </p>
                                  <div className="date">
                                    <span>May 19 at 11:24 PM</span>
                                  </div>
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="notification--list--item">
                                <div className="thumbnuil">
                                  <img
                                    src={require("../asstes/image/nt--img.png")}
                                    alt=""
                                  />
                                </div>
                                <div className="notification--data">
                                  <h3>Subscription Update</h3>
                                  <p>
                                    Portable Restroom Trailer Lorem ipsum dolor
                                    sit amet, consectetuer adipiscing elit....
                                  </p>
                                  <div className="date">
                                    <span>May 19 at 11:24 PM</span>
                                  </div>
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="notification--list--item">
                                <div className="thumbnuil">
                                  <img
                                    src={require("../asstes/image/nt--img.png")}
                                    alt=""
                                  />
                                </div>
                                <div className="notification--data">
                                  <h3>Subscription Update</h3>
                                  <p>
                                    Portable Restroom Trailer Lorem ipsum dolor
                                    sit amet, consectetuer adipiscing elit....
                                  </p>
                                  <div className="date">
                                    <span>May 19 at 11:24 PM</span>
                                  </div>
                                </div>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="right--cover--img">
                        <img
                          src={require("../asstes/image/right--img.png")}
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                )}

                {activeSidebar === "NOTIFICATIONS" && (
                  <div className="notification--content">
                    <div className="dashboard--content--title">
                      <h2>
                        <span>Notifications</span>
                      </h2>
                    </div>
                    <div className="subcription--update">
                      <div className="subcription--message">
                        <h3>Subscription Update</h3>
                        <p>Complete your payment </p>
                      </div>
                      <div className="pay--now">
                        <a href="#">Pay Now</a>
                      </div>
                    </div>
                    <div className="dashboard--notification">
                      <div className="notification--wrapper">
                        <div className="table--title">
                          <span>Today</span>
                        </div>
                        <div className="notification--list">
                          <ul>
                            <li>
                              <div className="notification--list--item">
                                <div className="thumbnuil">
                                  <img
                                    src={require("../asstes/image/nt--img.png")}
                                    alt=""
                                  />
                                </div>
                                <div className="notification--data">
                                  <h3>Subscription Update</h3>
                                  <p>
                                    Portable Restroom Trailer Lorem ipsum dolor
                                    sit amet, consectetuer adipiscing elit, sed
                                    diam nonummy nibh euismod tincidunt ut
                                    laoreet dolore magna ali quam erat volutpat.
                                  </p>
                                  <div className="date">
                                    <span>May 19 at 11:24 PM</span>
                                  </div>
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="notification--list--item">
                                <div className="thumbnuil">
                                  <img
                                    src={require("../asstes/image/nt--img.png")}
                                    alt=""
                                  />
                                </div>
                                <div className="notification--data">
                                  <h3>Subscription Update</h3>
                                  <p>
                                    Portable Restroom Trailer Lorem ipsum dolor
                                    sit amet, consectetuer adipiscing elit, sed
                                    diam nonummy nibh euismod tincidunt ut
                                    laoreet dolore magna ali quam erat volutpat.
                                  </p>
                                  <div className="date">
                                    <span>May 19 at 11:24 PM</span>
                                  </div>
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="notification--list--item">
                                <div className="thumbnuil">
                                  <img
                                    src={require("../asstes/image/nt--img.png")}
                                    alt=""
                                  />
                                </div>
                                <div className="notification--data">
                                  <h3>Subscription Update</h3>
                                  <p>
                                    Portable Restroom Trailer Lorem ipsum dolor
                                    sit amet, consectetuer adipiscing elit, sed
                                    diam nonummy nibh euismod tincidunt ut
                                    laoreet dolore magna ali quam erat volutpat.
                                  </p>
                                  <div className="date">
                                    <span>May 19 at 11:24 PM</span>
                                  </div>
                                </div>
                              </div>
                            </li>
                          </ul>
                        </div>
                        <div className="table--title">
                          <span>Yesterday</span>
                        </div>
                        <div className="notification--list">
                          <ul>
                            <li>
                              <div className="notification--list--item">
                                <div className="thumbnuil">
                                  <img
                                    src={require("../asstes/image/nt--img.png")}
                                    alt=""
                                  />
                                </div>
                                <div className="notification--data">
                                  <h3>Subscription Update</h3>
                                  <p>
                                    Portable Restroom Trailer Lorem ipsum dolor
                                    sit amet, consectetuer adipiscing elit, sed
                                    diam nonummy nibh euismod tincidunt ut
                                    laoreet dolore magna ali quam erat volutpat.
                                  </p>
                                  <div className="date">
                                    <span>May 19 at 11:24 PM</span>
                                  </div>
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="notification--list--item">
                                <div className="thumbnuil">
                                  <img
                                    src={require("../asstes/image/nt--img.png")}
                                    alt=""
                                  />
                                </div>
                                <div className="notification--data">
                                  <h3>Subscription Update</h3>
                                  <p>
                                    Portable Restroom Trailer Lorem ipsum dolor
                                    sit amet, consectetuer adipiscing elit, sed
                                    diam nonummy nibh euismod tincidunt ut
                                    laoreet dolore magna ali quam erat volutpat.
                                  </p>
                                  <div className="date">
                                    <span>May 19 at 11:24 PM</span>
                                  </div>
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="notification--list--item">
                                <div className="thumbnuil">
                                  <img
                                    src={require("../asstes/image/nt--img.png")}
                                    alt=""
                                  />
                                </div>
                                <div className="notification--data">
                                  <h3>Subscription Update</h3>
                                  <p>
                                    Portable Restroom Trailer Lorem ipsum dolor
                                    sit amet, consectetuer adipiscing elit, sed
                                    diam nonummy nibh euismod tincidunt ut
                                    laoreet dolore magna ali quam erat volutpat.
                                  </p>
                                  <div className="date">
                                    <span>May 19 at 11:24 PM</span>
                                  </div>
                                </div>
                              </div>
                            </li>
                          </ul>
                        </div>
                        <div className="table--title">
                          <span>Earlier</span>
                        </div>
                        <div className="notification--list">
                          <ul>
                            <li>
                              <div className="notification--list--item">
                                <div className="thumbnuil">
                                  <img
                                    src={require("../asstes/image/nt--img.png")}
                                    alt=""
                                  />
                                </div>
                                <div className="notification--data">
                                  <h3>Subscription Update</h3>
                                  <p>
                                    Portable Restroom Trailer Lorem ipsum dolor
                                    sit amet, consectetuer adipiscing elit, sed
                                    diam nonummy nibh euismod tincidunt ut
                                    laoreet dolore magna ali quam erat volutpat.
                                  </p>
                                  <div className="date">
                                    <span>May 19 at 11:24 PM</span>
                                  </div>
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="notification--list--item">
                                <div className="thumbnuil">
                                  <img
                                    src={require("../asstes/image/nt--img.png")}
                                    alt=""
                                  />
                                </div>
                                <div className="notification--data">
                                  <h3>Subscription Update</h3>
                                  <p>
                                    Portable Restroom Trailer Lorem ipsum dolor
                                    sit amet, consectetuer adipiscing elit, sed
                                    diam nonummy nibh euismod tincidunt ut
                                    laoreet dolore magna ali quam erat volutpat.
                                  </p>
                                  <div className="date">
                                    <span>May 19 at 11:24 PM</span>
                                  </div>
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="notification--list--item">
                                <div className="thumbnuil">
                                  <img
                                    src={require("../asstes/image/nt--img.png")}
                                    alt=""
                                  />
                                </div>
                                <div className="notification--data">
                                  <h3>Subscription Update</h3>
                                  <p>
                                    Portable Restroom Trailer Lorem ipsum dolor
                                    sit amet, consectetuer adipiscing elit, sed
                                    diam nonummy nibh euismod tincidunt ut
                                    laoreet dolore magna ali quam erat volutpat.
                                  </p>
                                  <div className="date">
                                    <span>May 19 at 11:24 PM</span>
                                  </div>
                                </div>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeSidebar === "MY_QUOTATIONS" && (
                  <div className="quotations--content">
                    <div className="dashboard--content--title">
                      <h2>
                        <span>Quotation</span>
                      </h2>
                    </div>
                    <div className="table--wrapper">
                      <table>
                        <thead>
                          <tr>
                            <th>Order ID</th>
                            <th>Phone Number</th>
                            <th>Placement Date</th>
                            <th>Type</th>
                            <th>Service Frequency</th>
                            <th>Status</th>
                            <th>Track</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>1234567889123</td>
                            <td>+0 1234567890</td>
                            <td>15/05/2023</td>
                            <td>Events</td>
                            <td>once per week</td>
                            <td className="active">Active</td>
                            <td>
                              <button
                                onClick={() => setActiveSidebar("TRACK_ORDER")}
                                type="button"
                                className="track--order"
                              >
                                <img
                                  src={require("../asstes/image/track.png")}
                                  alt=""
                                />
                              </button>
                            </td>
                            <td>
                              <button
                                onClick={() =>
                                  setActiveSidebar("VIEW_QUOTATION")
                                }
                                type="button"
                                className="action--table"
                              ></button>
                            </td>
                          </tr>
                          <tr>
                            <td>1234567889123</td>
                            <td>+0 1234567890</td>
                            <td>15/05/2023</td>
                            <td>Events</td>
                            <td>once per week</td>
                            <td className="processing">Active</td>
                            <td>
                              <button
                                onClick={() => setActiveSidebar("TRACK_ORDER")}
                                type="button"
                                className="track--order"
                              >
                                <img
                                  src={require("../asstes/image/track.png")}
                                  alt=""
                                />
                              </button>
                            </td>
                            <td>
                              <button
                                onClick={() =>
                                  setActiveSidebar("VIEW_QUOTATION")
                                }
                                type="button"
                                className="action--table"
                              ></button>
                            </td>
                          </tr>
                          <tr>
                            <td>1234567889123</td>
                            <td>+0 1234567890</td>
                            <td>15/05/2023</td>
                            <td>Events</td>
                            <td>once per week</td>
                            <td className="cancel">Active</td>
                            <td>
                              <button
                                onClick={() => setActiveSidebar("TRACK_ORDER")}
                                type="button"
                                className="track--order"
                              >
                                <img
                                  src={require("../asstes/image/track.png")}
                                  alt=""
                                />
                              </button>
                            </td>
                            <td>
                              <button
                                onClick={() =>
                                  setActiveSidebar("VIEW_QUOTATION")
                                }
                                type="button"
                                className="action--table"
                              ></button>
                            </td>
                          </tr>
                          <tr>
                            <td>1234567889123</td>
                            <td>+0 1234567890</td>
                            <td>15/05/2023</td>
                            <td>Events</td>
                            <td>once per week</td>
                            <td className="active">Active</td>
                            <td>
                              <button
                                onClick={() => setActiveSidebar("TRACK_ORDER")}
                                type="button"
                                className="track--order"
                              >
                                <img
                                  src={require("../asstes/image/track.png")}
                                  alt=""
                                />
                              </button>
                            </td>
                            <td>
                              <button
                                onClick={() =>
                                  setActiveSidebar("VIEW_QUOTATION")
                                }
                                type="button"
                                className="action--table"
                              ></button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="paginations">
                      <ul>
                        <li>
                          <a className="btn" href="#">
                            Previous Page
                          </a>
                        </li>
                        <li>
                          <a className="btn" href="#">
                            Next Page
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                )}
                {activeSidebar === "TRACK_ORDER" && (
                  <div className="track--order--content">
                    <div className="dashboard--content--title">
                      <h2>
                        <span className="back--btn--wrapper">
                          <span>
                            <a href="#" className="back--btn">
                              <img
                                src={require("../asstes/image/arrow--left.png")}
                                alt=""
                              />
                            </a>
                          </span>{" "}
                          <span>Quotation - 1234567889123 -Track</span>
                        </span>
                      </h2>
                    </div>
                    <div className="track--order--wrapper">
                      <div className="order--id">
                        <h3>Track Order - 1234567889123</h3>
                      </div>
                      <div className="order--status">
                        <span>Status - </span>{" "}
                        <span className="order--status--corrent">Pending</span>
                      </div>
                      <div className="order--tracking--bar">
                        <ul>
                          <li className="active">
                            <span className="track--circle"></span>
                            <div className="track--detail">
                              <h4>Order Placed</h4>
                              <p>Tue, 15 May</p>
                            </div>
                          </li>
                          <li className="active">
                            <span className="track--circle"></span>
                            <div className="track--detail">
                              <h4>Order Shipped</h4>
                              <p>Tue, 15 May</p>
                            </div>
                          </li>
                          <li>
                            <span className="track--circle"></span>
                            <div className="track--detail">
                              <h4>Out for the Station</h4>
                              <p>Tue, 15 May</p>
                            </div>
                          </li>
                          <li>
                            <span className="track--circle"></span>
                            <div className="track--detail">
                              <h4>Order Placed at Station</h4>
                              <p>Tue, 15 May</p>
                            </div>
                          </li>
                        </ul>
                      </div>
                      <div className="user--address">
                        <h3>Delivery Address</h3>
                        <ul>
                          <li>Jhon Smith</li>
                          <li> | </li>
                          <li>+0 1234 5678900</li>
                        </ul>
                        <p>
                          112/296 ABCD adipiscing elit, sed diam nonummy
                          Place\Location Street Area City - Pincode State
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {activeSidebar === "VIEW_QUOTATION" && (
                  <div className="quotations--details--content">
                    <div className="dashboard--content--title">
                      <h2>
                        <span className="back--btn--wrapper">
                          <span>
                            <a href="#" className="back--btn">
                              <img
                                src={require("../asstes/image/arrow--left.png")}
                                alt=""
                              />
                            </a>
                          </span>{" "}
                          <span>sQuotation - 1234567889123 -View</span>
                        </span>
                      </h2>
                    </div>
                    <div className="table--wrapper">
                      <table>
                        <tbody>
                          <tr>
                            <th>Name</th>
                            <td>Jhon Smith</td>
                          </tr>
                          <tr>
                            <th>Email Address </th>
                            <td>jhonsmith@gmail.com</td>
                          </tr>
                          <tr>
                            <th>Phone Number</th>
                            <td>+0 1234 5678900</td>
                          </tr>
                          <tr>
                            <th>Status</th>
                            <td className="status">Pending</td>
                          </tr>
                          <tr>
                            <th>Delivered Price</th>
                            <td>$0</td>
                          </tr>
                          <tr>
                            <th>Distance From Kelowna</th>
                            <td>20 KM</td>
                          </tr>
                          <tr>
                            <th>Max Workers</th>
                            <td>30</td>
                          </tr>
                          <tr>
                            <th>Service Frequency</th>
                            <td>3 Unites once per week</td>
                          </tr>
                          <tr>
                            <th>Weekly Hours</th>
                            <td>40</td>
                          </tr>
                          <tr>
                            <th>Hand Sanitizer Pump Cost</th>
                            <td>$0</td>
                          </tr>
                          <tr>
                            <th>Use At Night Cost</th>
                            <td>$0</td>
                          </tr>
                          <tr>
                            <th>Use In Winter Cost</th>
                            <td>$0</td>
                          </tr>
                          <tr>
                            <th>Number Of Units Cost</th>
                            <td>$0</td>
                          </tr>
                          <tr>
                            <th>Pickup Price</th>
                            <td>$0</td>
                          </tr>
                          <tr>
                            <th>Total Cost</th>
                            <td>$350</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {activeSidebar === "MY_SUBSCRIPTIONS" && (
                  <div className="quotations--content subscription--content">
                    <div className="dashboard--content--title">
                      <h2>
                        <span>Subscription</span>
                      </h2>
                    </div>
                    <div className="table--wrapper">
                      <table>
                        <thead>
                          <tr>
                            <th>Order ID</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>View</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>1234567889123</td>
                            <td>22/12/2022</td>
                            <td>15/05/2023</td>
                            <td>$ 100</td>
                            <td className="active">Active</td>
                            <td>
                              <button
                                type="button"
                                className="action--table"
                              ></button>
                            </td>
                          </tr>
                          <tr>
                            <td>1234567889123</td>
                            <td>22/12/2022</td>
                            <td>15/05/2023</td>
                            <td>$ 100</td>
                            <td className="active">Active</td>
                            <td>
                              <button
                                type="button"
                                className="action--table"
                              ></button>
                            </td>
                          </tr>
                          <tr>
                            <td>1234567889123</td>
                            <td>22/12/2022</td>
                            <td>15/05/2023</td>
                            <td>$ 100</td>
                            <td className="active">Active</td>
                            <td>
                              <button
                                type="button"
                                className="action--table"
                              ></button>
                            </td>
                          </tr>
                          <tr>
                            <td>1234567889123</td>
                            <td>22/12/2022</td>
                            <td>15/05/2023</td>
                            <td>$ 100</td>
                            <td className="active">Active</td>
                            <td>
                              <button
                                type="button"
                                className="action--table"
                              ></button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
                {activeSidebar === "MY_ACCOUNT" && (
                  <div className="setting--content">
                    <div className="dashboard--content--title">
                      <h2>
                        <span>Settings</span>{" "}
                        <span className="edit--setting">
                          <i className="fa-solid fa-user-pen"></i>
                        </span>
                      </h2>
                    </div>
                    <div className="setting--content--wrapper">
                      <div className="table--title">
                        <span>Profile Details</span>
                      </div>
                      <div className="user--profile">
                        <div className="user--image">
                          <img
                            src={require("../asstes/image/author1.png")}
                            alt=""
                          />
                        </div>
                        <div className="change--profile--link">
                          <a href="#">Change Image</a>
                        </div>
                      </div>
                      <div className="user--profile--form">
                        <form action="">
                          <div className="form--wrapper">
                            <div className="form--group">
                              <label htmlFor="">Name</label>
                              <input type="text" value="Jhon" />
                            </div>
                            <div className="form--group">
                              <label htmlFor="">Last Name</label>
                              <input type="text" value="Carter" />
                            </div>
                            <div className="form--group">
                              <label htmlFor="">Email</label>
                              <input type="email" value="jhon@gmail.com" />
                            </div>
                            <div className="form--group">
                              <label htmlFor="">Last Name</label>
                              <input type="tel" value="+9199990000" />
                            </div>
                            <div className="table--title span--2">
                              <span>Change Password</span>
                            </div>
                            <div className="form--group">
                              <label htmlFor="">New Password</label>
                              <input
                                type="password"
                                value=""
                                placeholder="Enter Password"
                              />
                            </div>
                            <div className="form--group">
                              <label htmlFor="">Re-Enter Password</label>
                              <input
                                type="password"
                                value=""
                                placeholder="Enter Password"
                              />
                            </div>
                            <div className="form--group action--from span--2">
                              <button className="btn">Save Changes</button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default IsLoadingHOC(MyAccountNew);
