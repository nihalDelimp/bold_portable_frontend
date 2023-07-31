import { useState, useEffect } from "react";
import $ from "jquery";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../Redux/rootReducer";
import { logout } from "../Redux/Reducers/authSlice";
import Notifications from "./Notifications";
// import MyCart from "./MyCart";
import SigninPopupModal from "./SigninPopupModal";
import { firstChartByFullName } from "../Helper";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Header = () => {
  const [isToggleMenu, setIsToggle] = useState(false);
  const { cart } = useSelector((state: RootState) => state.product);
  const { user, accessToken } = useSelector((state: RootState) => state.auth);
  const { notifications } = useSelector(
    (state: RootState) => state.notification
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const pathName = location.pathname;

  useEffect(() => {
    if (pathName !== "/") {
      document.querySelector("body")?.classList.add("other--template");
      document.querySelector(".header")?.classList.add("header--dark");
    } else {
      document.querySelector("body")?.classList.remove("other--template");
      document.querySelector(".header")?.classList.remove("header--dark");
    }
  }, [pathName]);

  useEffect(() => {
    // Login Dropdown
    $(".login--btn").click(function () {
      $(".user--dropdown").toggleClass("active--dropdown");
    });

    

    $(document).on("click", function (e) {
      if (
        $(e.target).closest(".user--dropdown").length === 0 &&
        $(e.target).closest(".login--btn").length === 0
      ) {
        $(".user--dropdown").removeClass("active--dropdown");
      }
      if (
        $(e.target).closest(".notifications--dropdown").length === 0 &&
        $(e.target).closest(".notifications--wrapper").length === 0
      ) {
        $(".notifications--dropdown").removeClass(
          "active--notifications--dropdown"
        );
      }
      if (
        $(e.target).closest(".cart--dropdown").length === 0 &&
        $(e.target).closest(".cart").length === 0
      ) {
        $(".cart--dropdown").removeClass("active--cart--dropdown");
      }
      // if (
      //   $(e.target).closest(".custom--popup--wrapper").length === 0 &&
      //   $(e.target).closest(".form--popup").length === 0
      // ) {
      //   $(".custom--popup").removeClass("active--popup");
      // }
      // if (
      //   $(e.target).closest(".static--popup--wrapper").length === 0 &&
      //   $(e.target).closest(".lost--password").length === 0 &&
      //   $(e.target).closest(".reset--back").length === 0
      // ) {
      //   $(".static--popup").css("display", "none");
      // }
    });

    // notification dropdown
    $(".notifications--wrapper").click(function () {
      $(".notifications--dropdown").toggleClass(
        "active--notifications--dropdown"
      );
    });
    $(".close--notification").click(function () {
      $(".notifications--dropdown").removeClass(
        "active--notifications--dropdown"
      );
    });

    // cart dropdown
    $(".cart").click(function () {
      $(".cart--dropdown").toggleClass("active--cart--dropdown");
    });
    $(".close--cart").click(function () {
      $(".cart--dropdown").removeClass("active--cart--dropdown");
    });

    // switcher--tabs form
    $(document).on("click", ".switcher--tabs li a", function (e) {
      e.preventDefault();
      $(this).parent().siblings().find("a").removeClass("active");
      $(this).addClass("active");

      var form_tab_data = $(this).attr("data-id");
      $(".login--form").removeClass("active--from");
      $("#" + form_tab_data).addClass("active--from");
    });

    $(document).on("click", ".form--popup", function (e) {
      e.preventDefault();
      if ($(this).hasClass("signin--popup")) {
        $("#login--form").removeClass("active--from");
        $("#signin--form").addClass("active--from");
        $(".custom--popup").addClass("active--popup");
        $(".login--tab--item").removeClass("active");
        $(".signin--tab--item").addClass("active");
      } else {
        $("#signin--form").removeClass("active--from");
        $("#login--form").addClass("active--from");
        $(".custom--popup").addClass("active--popup");
        $(".signin--tab--item").removeClass("active");
        $(".login--tab--item").addClass("active");
      }
    });

   
    $(".close--login").on("click", function () {
      $(this).closest('.custom--popup').removeClass('active--popup');
    });

    
    $(".close--forgot").on("click", function () {
      $(this).closest('.static--popup').css('display', 'none');
    });

    
    $(".user--dropdown ul li  a").on("click", function () {
      $(".user--dropdown").removeClass("active--dropdown");
    });


  }, []);

  const handleLogout = () => {
    dispatch(logout(false));
    toast.success("Logged out successfully");
    navigate("/");
  };

  return (
    <>
      <header className="header" data-aos="fade" data-aos-duration="2000">
        <div className="header--container">
          <div className="header--wrapper">
            <div className="site--logo">
              <Link to="/">
                <img src={require("../asstes/image/site--logo.png")} alt="" />
              </Link>
            </div>
            <div className="main--menu">
              <div
                onClick={() => setIsToggle(!isToggleMenu)}
                className={`hamburger ${
                  isToggleMenu ? "active--hamburger" : ""
                }`}
              >
                <span className="menu--text">Menu</span>
              </div>
              <div
                className={`nav--menu--wrapper ${
                  isToggleMenu ? "active--nav" : ""
                }`}
              >
                <nav className="nav--menu--layout">
                  <ul className="nav--menu">
                    <li className="nav--menu--item">
                      <Link
                        to="/"
                        onClick={() => setIsToggle(!isToggleMenu)}
                        className="menu--item"
                      >
                        Home
                      </Link>
                    </li>
                    <li className="nav--menu--item">
                      <Link
                        to="/about-us"
                        onClick={() => setIsToggle(!isToggleMenu)}
                        className="menu--item"
                      >
                        About
                      </Link>
                    </li>
                    <li className="nav--menu--item">
                      {/* <Link
                        onClick={() => setIsToggle(!isToggleMenu)}
                        to="/services"
                        className="menu--item"
                      >
                        Request Service
                      </Link> */}
                    </li>
                    {/* <li className="nav--menu--item">
                      <a href="#" className="menu--item">
                        Articles
                      </a>
                    </li> */}
                    <li className="nav--menu--item">
                      <Link
                        to="/contact-us"
                        onClick={() => setIsToggle(!isToggleMenu)}
                        className="menu--item"
                      >
                        Contact
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>

            <div className="login--cart--container">
              <div className="login--cart--wrapper">
                {/* <div className="cart">
                  <div className="cart--wrapper">
                    <div className="cart--icon">
                      <span
                        className={`${cart && cart.length > 0 ? "badge" : ""}`}
                      >
                        {cart && cart.length > 0 && cart.length}
                      </span>
                      <img
                        src={require("../asstes/image/cart.svg").default}
                        alt=""
                      />
                    </div>
                  </div>
                </div> */}

                {/* <div className="notifications">
                  <div className="notifications--wrapper">
                    <span
                      className={
                        notifications && notifications.length > 0 ? "badge" : ""
                      }
                    >
                      {notifications && notifications.length > 0
                        ? notifications.length
                        : null}
                    </span>
                    <img
                      src={
                        require("../asstes/image/notification--icon.svg")
                          .default
                      }
                      alt=""
                    />
                  </div>
                </div> */}

                <div className="login--btn--wrapper">
                  <a href="#" className="login--btn">
                    <img
                      src={require("../asstes/image/Profile.svg").default}
                      alt=""
                    />
                    <span>
                      <b>
                        {accessToken
                          ? firstChartByFullName(user?.name)
                          : "Customer portal"}{" "}
                      </b>
                    </span>
                  </a>
                </div>
              </div>
              <div className="user--dropdown">
                <div className="user--dropdown--wrapper">
                  <ul>
                    {!accessToken && (
                      <li>
                        <a className=" form--popup login--popup ">
                          <span className="icons">
                            <img
                              src={require("../asstes/image/Login.svg").default}
                              alt=""
                            />
                          </span>{" "}
                          <span>Login</span>
                        </a>
                      </li>
                    )}
                    {!accessToken && (
                      <li>
                        <a className="form--popup signin--popup">
                          <span className="icons">
                            <img
                              src={
                                require("../asstes/image/Signup.svg").default
                              }
                              alt=""
                            />
                          </span>{" "}
                          <span>Signup</span>
                        </a>
                      </li>
                    )}
                    {accessToken && (
                      <li>
                        <Link to="/my-account">
                          <span className="icons">
                            <img
                              src={
                                require("../asstes/image/Profile.svg").default
                              }
                              alt=""
                            />
                          </span>{" "}
                          <span>Account</span>
                        </Link>
                      </li>
                    )}
                    {accessToken && (
                      <li>
                        <a onClick={handleLogout} href="#">
                          <span className="icons">
                            <img
                              src={
                                require("../asstes/image/Logout.svg").default
                              }
                              alt=""
                            />
                          </span>{" "}
                          <span>Logout</span>
                        </a>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
              <Notifications />
              {/* <MyCart /> */}
            </div>
          </div>
        </div>
      </header>
      <SigninPopupModal />
    </>
  );
};

export default Header;
