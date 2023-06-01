import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authAxios } from "../config/config";
import IsLoadingHOC from "../Common/IsLoadingHOC";
import { logout } from "../Redux/Reducers/authSlice";
import { useDispatch } from "react-redux";
import { CapitalizeFirstLetter, setFormatDate } from "../Helper";
import QuotationDetails from "./QuotationDetails";
import PaymentDetails from "./PaymentDetails";
import TrackQuotation from "./TrackQuotation";
import ProfileSetting from "./ProfileSetting";
import $ from "jquery";

interface MyComponentProps {
  setLoading: (isComponentLoading: boolean) => void;
  isLoading: boolean;
}

function MyAccountNew(props: MyComponentProps) {
  const { setLoading, isLoading } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemPerPage] = useState<number>(100);
  const [myQuotations, setMyQuotations] = useState<any[]>([]);
  const [mySubscriptions, setMySubscriptions] = useState<any[]>([]);
  const [activeSidebar, setActiveSidebar] = useState<string>("DASHBOARD");
  const [updateSubscription, setupdateSubscription] = useState(false);
  const [quotationID, setquotationID] = useState<string>("");
  const [quotationType, setquotationType] = useState<string>("");
  const [subscriptionID, setsubscriptionID] = useState<string>("");


  useEffect(()=> {
    $(document).ready(function(){
      if (window.matchMedia("(max-width: 1024px)").matches) {
          $(".user--sidebar--container").slideUp();
          $(document).on("click", "#user--dashboard", function(){
              $(".user--sidebar--container").slideToggle();
              $("#user--dashboard i").toggleClass("fa-bars").toggleClass("fa-xmark");
          });
      } 
     
  });

  },[])

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

  const setStyleForStatus = (status: string) => {
    if (status === "pending") {
      return "processing";
    } else if (status === "cancel") {
      return "cancel";
    } else {
      return "active";
    }
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
                          activeSidebar === "MY_QUOTATIONS" ||
                          activeSidebar === "VIEW_QUOTATION" ||
                          activeSidebar === "TRACK_ORDER"
                            ? "active"
                            : ""
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
                          activeSidebar === "MY_SUBSCRIPTIONS" ||
                          activeSidebar === "VIEW_PAYMENT"
                            ? "active"
                            : ""
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
                        onClick={() => setActiveSidebar("PROFILE_SETTING")}
                        className={
                          activeSidebar === "PROFILE_SETTING" ? "active" : ""
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
                <Link to="/">Put Quotes</Link>
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
                          <a onClick={() => setActiveSidebar("MY_QUOTATIONS")}>
                            View All
                          </a>
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
                          {myQuotations &&
                            myQuotations.length > 0 &&
                            myQuotations.map((item: any) => (
                              <tr key={item._id}>
                                <td>{item._id?.slice(14)}</td>
                                <td>{item.coordinator.cellNumber}</td>
                                <td>
                                  {setFormatDate(
                                    item.placementDate || item.createdAt
                                  )}
                                </td>
                                <td>{CapitalizeFirstLetter(item.type)}</td>
                                <td>{item.serviceFrequency}</td>
                                <td className={setStyleForStatus(item.status)}>
                                  {item.status}
                                </td>
                                <td>
                                  <button
                                    onClick={() => {
                                      setquotationID(item._id);
                                      setquotationType(
                                        CapitalizeFirstLetter(item.type)
                                      );
                                      setActiveSidebar("VIEW_QUOTATION");
                                    }}
                                    type="button"
                                    className="action--table"
                                  ></button>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="dashboard--notification">
                      <div className="notification--wrapper">
                        <div className="table--title">
                          <span>Notifications</span>{" "}
                          <span>
                            <a
                              onClick={() => setActiveSidebar("NOTIFICATIONS")}
                            >
                              View All
                            </a>
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
                    {updateSubscription && (
                      <div className="subcription--update">
                        <div className="subcription--message">
                          <h3>Subscription Update</h3>
                          <p>Complete your payment </p>
                        </div>
                        <div className="pay--now">
                          <a href="#">Pay Now</a>
                        </div>
                      </div>
                    )}
                    <div className="dashboard--notification">
                      <div className="notification--wrapper">
                        <div className="table--title">
                          <span>Today</span>
                        </div>
                        <div className="notification--list">
                          <ul>
                            <li>
                              <div
                                onClick={() =>
                                  setupdateSubscription(!updateSubscription)
                                }
                                className="notification--list--item"
                              >
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
                              <div
                                onClick={() =>
                                  setupdateSubscription(!updateSubscription)
                                }
                                className="notification--list--item"
                              >
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
                              <div
                                onClick={() =>
                                  setupdateSubscription(!updateSubscription)
                                }
                                className="notification--list--item"
                              >
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
                              <div
                                onClick={() =>
                                  setupdateSubscription(!updateSubscription)
                                }
                                className="notification--list--item"
                              >
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
                              <div
                                onClick={() =>
                                  setupdateSubscription(!updateSubscription)
                                }
                                className="notification--list--item"
                              >
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
                              <div
                                onClick={() =>
                                  setupdateSubscription(!updateSubscription)
                                }
                                className="notification--list--item"
                              >
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
                              <div
                                onClick={() =>
                                  setupdateSubscription(!updateSubscription)
                                }
                                className="notification--list--item"
                              >
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
                              <div
                                onClick={() =>
                                  setupdateSubscription(!updateSubscription)
                                }
                                className="notification--list--item"
                              >
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
                              <div
                                onClick={() =>
                                  setupdateSubscription(!updateSubscription)
                                }
                                className="notification--list--item"
                              >
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
                          {myQuotations &&
                            myQuotations.length > 0 &&
                            myQuotations.map((item: any) => (
                              <tr key={item._id}>
                                <td>{item._id?.slice(14)}</td>
                                <td>{item.coordinator.cellNumber}</td>
                                <td>
                                  {setFormatDate(
                                    item.placementDate || item.createdAt
                                  )}
                                </td>
                                <td>{CapitalizeFirstLetter(item.type)}</td>
                                <td>{item.serviceFrequency}</td>
                                <td className={setStyleForStatus(item.status)}>
                                  {item.status}
                                </td>
                                <td>
                                  <button
                                    onClick={() => {
                                      setquotationID(item._id);
                                      setquotationType(
                                        CapitalizeFirstLetter(item.type)
                                      );
                                      setActiveSidebar("TRACK_ORDER");
                                    }}
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
                                    onClick={() => {
                                      setquotationID(item._id);
                                      setquotationType(
                                        CapitalizeFirstLetter(item.type)
                                      );
                                      setActiveSidebar("VIEW_QUOTATION");
                                    }}
                                    type="button"
                                    className="action--table"
                                  ></button>
                                </td>
                              </tr>
                            ))}
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
                            <th>Subscription ID</th>
                            <th>Start Date</th>
                            <th>Quotation Type</th>
                            <th>Status</th>
                            <th>View</th>
                          </tr>
                        </thead>
                        <tbody>
                          {mySubscriptions &&
                            mySubscriptions.length > 0 &&
                            mySubscriptions.map((item) => (
                              <tr key={item._id}>
                                <td>{item.subscription?.slice(15)}</td>
                                <td>{setFormatDate(item.createdAt)}</td>
                                <td>{item.quotationType}</td>
                                <td
                                  className={`${
                                    item.status === "ACTIVE"
                                      ? "active"
                                      : "cancel"
                                  }`}
                                >
                                  {item.status}
                                </td>
                                <td>
                                  <button
                                    onClick={() => {
                                      setsubscriptionID(item._id);
                                      setActiveSidebar("VIEW_PAYMENT");
                                    }}
                                    type="button"
                                    className="action--table"
                                  ></button>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {activeSidebar === "TRACK_ORDER" && (
                  <TrackQuotation
                    quotationID={quotationID}
                    quotationType={quotationType}
                    isLoading={isLoading}
                    setLoading={setLoading}
                    setActiveSidebar={setActiveSidebar}
                  />
                )}

                {activeSidebar === "VIEW_QUOTATION" && (
                  <QuotationDetails
                    quotationID={quotationID}
                    quotationType={quotationType}
                    isLoading={isLoading}
                    setLoading={setLoading}
                    setActiveSidebar={setActiveSidebar}
                  />
                )}

                {activeSidebar === "VIEW_PAYMENT" && (
                  <PaymentDetails
                    subscriptionID={subscriptionID}
                    isLoading={isLoading}
                    setLoading={setLoading}
                    setActiveSidebar={setActiveSidebar}
                  />
                )}

                {activeSidebar === "PROFILE_SETTING" && (
                  <ProfileSetting
                    setLoading={setLoading}
                    isLoading={isLoading}
                  />
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