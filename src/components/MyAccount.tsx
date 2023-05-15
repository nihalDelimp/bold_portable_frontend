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

function MyAccount(props: MyComponentProps) {
  const { setLoading } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemPerPage] = useState<number>(100);
  const [myQuotations, setMyQuotations] = useState<any[]>([]);
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

  useEffect(() => {});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  console.log("myQuotations", myQuotations);
  useEffect(() => {
    getMyQuotationsData();
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

  const handleLogout = () => {
    dispatch(logout(false));
    navigate("/");
  };

  console.log("userData.mobile" , typeof userData.mobile)

  return (
    <>
      <section className="my--account">
        <div className="grid--container">
          <div className="grid">
            <div className="grid----">
              <div className="my--profile">
                <div className="my--profile--wrapper">
                  <div className="profile--thumbnuil">
                    <img src={require("../asstes/image/author1.png")} alt="" />
                  </div>
                  <div className="profile--details">
                    <h3>Hello {user.name} !</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid--my--acoount">
            <div className="grid-">
              <div className="acoout--tab--wrapper">
                <ul className="account--tab--list">
                  <li>
                    <a
                      onClick={() => setActiveSidebar("DASHBOARD")}
                      className={activeSidebar === "DASHBOARD" ? "active" : ""}
                    >
                      <i className="fa-solid fa-border-all"></i>{" "}
                      <span>Dashboard</span>
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={() => setActiveSidebar("MY_ORDERS")}
                      className={activeSidebar === "MY_ORDERS" ? "active" : ""}
                    >
                      <i className="fa-solid fa-cart-shopping"></i>{" "}
                      <span>Order</span>
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={() => setActiveSidebar("MY_QUOTATIONS")}
                      className={
                        activeSidebar === "MY_QUOTATIONS" ? "active" : ""
                      }
                    >
                      <i className="fa-solid fa-envelope-open-text"></i>{" "}
                      <span>Quotation</span>
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={() => setActiveSidebar("MY_ACCOUNT")}
                      className={activeSidebar === "MY_ACCOUNT" ? "active" : ""}
                    >
                      <i className="fa-solid fa-user"></i>{" "}
                      <span>Account Details</span>
                    </a>
                  </li>
                  <li>
                    <a onClick={handleLogout}>
                      <i className="fa-solid fa-arrow-right-from-bracket"></i>{" "}
                      <span>Logout</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="grid---">
              <div className="account--tab--content">
                <div className="account--tab--content--item">
                  {activeSidebar === "DASHBOARD" && (
                    <div className="account---dashboard--content">
                      <h3>Hello {user.name} !</h3>
                      <p>
                        From your account dashboard you can view your recent
                        orders, manage your shipping and billing addresses, and
                        edit your password and account details.
                      </p>
                    </div>
                  )}
                </div>
                {activeSidebar === "MY_ORDERS" && (
                  <div className="my--order">
                    <div className="account--content--heading">
                      <h3>Hello {user.name} !</h3>
                    </div>
                    <div className="table--wrapper">
                      <table>
                        <thead>
                          <tr>
                            <th>Order</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Total</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>#1357</td>
                            <td>March 45, 2023</td>
                            <td>Processing</td>
                            <td>$125.00 for 2 item</td>
                            <td>
                              <a href="#" className="btn">
                                View
                              </a>
                            </td>
                          </tr>
                          <tr>
                            <td>#1357</td>
                            <td>March 45, 2023</td>
                            <td>Processing</td>
                            <td>$125.00 for 2 item</td>
                            <td>
                              <a href="#" className="btn">
                                View
                              </a>
                            </td>
                          </tr>
                          <tr>
                            <td>#1357</td>
                            <td>March 45, 2023</td>
                            <td>Processing</td>
                            <td>$125.00 for 2 item</td>
                            <td>
                              <a href="#" className="btn">
                                View
                              </a>
                            </td>
                          </tr>
                          <tr>
                            <td>#1357</td>
                            <td>March 45, 2023</td>
                            <td>Processing</td>
                            <td>$125.00 for 2 item</td>
                            <td>
                              <a href="#" className="btn">
                                View
                              </a>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
                {activeSidebar === "MY_QUOTATIONS" && (
                  <div className="my--quotations">
                    <div className="account--content--heading">
                      <h3>Quotations</h3>
                    </div>
                    <div className="table--wrapper">
                      <table>
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Email Address</th>
                            <th>Phone Number</th>
                            <th>Placement Date</th>
                            <th>End Date</th>
                            <th>Type</th>
                            <th>Service Frequency</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {myQuotations &&
                            myQuotations.length > 0 &&
                            myQuotations.map((item: any) => (
                              <tr key={item._id}>
                                <td>{item.coordinator.name}</td>
                                <td>{item.coordinator.email}</td>
                                <td>{item.coordinator.cellNumber}</td>
                                <td>
                                  {getFormatedDate(
                                    item.placementDate || item.createdAt
                                  )}
                                </td>
                                <td>{getFormatedDate(item.dateTillUse)}</td>
                                <td>{item.quotationType}</td>
                                <td>{item.serviceFrequency}</td>
                                <td>
                                  <Link
                                    to={`/quotation-details/${item._id}`}
                                    className="btn"
                                  >
                                    View
                                  </Link>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
                {activeSidebar === "MY_ACCOUNT" && (
                  <div className="account--details">
                    <div className="default--form--wrapper">
                      <div className="form--title">
                        <h3>
                          Account Details{" "}
                          <span onClick={() => setEditAble(!isEditAble)}>
                            <i className="fa-solid fa-user-pen"></i>
                          </span>
                        </h3>
                      </div>
                      <form action="">
                        <div className="form--group span--2">
                          <label htmlFor="name">Name</label>
                          <input
                            required
                            minLength={3}
                            disabled={!isEditAble}
                            type="text"
                            placeholder="Name"
                            value={userData.name}
                            name="name"
                            onChange={handleChange}
                          />
                        </div>
                        <div className="form--group">
                          <label htmlFor="Email">Email </label>
                          <input
                            required
                            disabled={!isEditAble}
                            type="email"
                            placeholder="Email"
                            value={userData.email}
                            name="email"
                            onChange={handleChange}
                          />
                        </div>
                        <div className="form--group">
                          <label htmlFor="tel">Phone </label>
                          <input
                            required
                            min={0}
                            minLength={4}
                            disabled={!isEditAble}
                            type="number"
                            placeholder="Phone"
                            value={userData.mobile}
                            name="mobile"
                            onChange={handleChange}
                          />
                        </div>
                        <div className="form--group span--2">
                          <label htmlFor="password">
                            <strong>Change Password</strong>
                          </label>
                        </div>
                        <div className="form--group span--2">
                          <label htmlFor="password">Password </label>
                          <input
                            disabled={!isEditAble}
                            type="password"
                            placeholder="*********"
                          />
                        </div>
                        <div className="form--group span--2">
                          <label htmlFor="password">New Password</label>
                          <input
                            disabled={!isEditAble}
                            type="password"
                            placeholder="Password"
                            value={userData.new_password}
                            name="new_password"
                            onChange={handleChange}
                          />
                        </div>
                        <div className="form--group span--2">
                          <label htmlFor="password">
                            Confirm New Password{" "}
                          </label>
                          <input
                            disabled={!isEditAble}
                            type="password"
                            placeholder="Confirm Password"
                            value={userData.confirm_new_password}
                            name="confirm_new_password"
                            onChange={handleChange}
                          />
                        </div>
                        <div className="form--action">
                          <button
                            disabled={!isEditAble}
                            type="submit"
                            className="submit--from btn"
                          >
                            Save Changes
                          </button>
                        </div>
                      </form>
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

export default IsLoadingHOC(MyAccount);
