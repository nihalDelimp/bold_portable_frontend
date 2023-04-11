import React, { useState, useEffect , useRef } from "react";
import $ from "jquery";
import { NavLink, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../Redux/rootReducer";
import { logout } from "../Redux/Reducers/authSlice";
import { useNavigate } from "react-router-dom";
import CartModal from "./CartModal";
import io, { Socket } from "socket.io-client";
import SignInModal from "./SignInModal";
import { toast } from "react-toastify";

const Header = () => {
  const [isToggleMenu, setIsToggle] = useState(false);
  const { cart } = useSelector((state: RootState) => state.product);
  const { user, accessToken } = useSelector((state: RootState) => state.auth);
  const [cartModal, setCartModal] = useState(false);
  const [signinModal, setSigninModal] = useState(false);
  const dispatch = useDispatch();

  const socket = useRef<Socket>();
  socket.current = io(`${process.env.REACT_APP_SOCKET}`);

console.log('UserID' , user._id)

  useEffect(() => {
    if (socket.current) {
      socket.current.on("cancel_order_received", (order) => {
        console.log("cancel_order_user_Id", order.user);
        console.log("_user_Id", user._id);
        toast.warning('Your order has cancelled')
        if(user._id === order.user){
         
        }
        console.log("cancel_order_received", order);
      });
    }
    return () => {
      socket.current?.disconnect();
    };
  }, []);

  useEffect(() => {
    $(".hamburger").click(function () {
      $(this).toggleClass("active--hamburger");
      $(".nav--menu--wrapper").toggleClass("active--nav");
    });
  }, []);

  const handleModal = () => {
    setCartModal(!cartModal);
  };

  const handleSigninModal = () => {
    setSigninModal(!signinModal);
  };

  const handleLogout = () => {
    dispatch(logout(false));
  };

  return (
    <>
      <header className="header" data-aos="fade" data-aos-duration="2000">
        <div className="header--container">
          <div className="header--wrapper">
            <div className="site--logo">
              <a href="#">
                <img src={require("../asstes/image/site--logo.png")} alt="" />
              </a>
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
                      <a href="#" className="menu--item">
                        Home
                      </a>
                    </li>
                    <li className="nav--menu--item">
                      <a href="#" className="menu--item">
                        Services
                      </a>
                    </li>
                    <li className="nav--menu--item">
                      <a href="#" className="menu--item">
                        About
                      </a>
                    </li>
                    <li className="nav--menu--item">
                      <a href="#" className="menu--item">
                        Articles
                      </a>
                    </li>
                    <li className="nav--menu--item">
                      <a href="#" className="menu--item">
                        Contact
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
            <div className="login--cart--container">
              <div className="login--cart--wrapper">
                <div className="cart">
                  <div className="cart--wrapper">
                    <div className="cart--icon">
                      {
                        <span onClick={handleModal} className={ `${cart && cart.length > 0 ? 'badge'  : ''}`}>
                          {cart && cart.length > 0 &&  cart.length}
                        </span>
                      }
                      <img
                        src={require("../asstes/image/cart.svg").default}
                        alt=""
                      />
                    </div>
                  </div>
                </div>
                <div className="notifications">
                  <div className="notifications--wrapper">
                    <span className="badge"></span>
                    <img
                      src={
                        require("../asstes/image/notification--icon.svg")
                          .default
                      }
                      alt=""
                    />
                  </div>
                </div>

                {accessToken && (
                  <div className="">
                    <button onClick={handleLogout} className="btn btn-sm">
                      logout
                    </button>
                  </div>
                )}
                {accessToken ? (
                  <div className="login--btn--wrapper">
                    <a className="login--btn">{user.name}</a>
                  </div>
                ) : (
                  <div className="login--btn--wrapper">
                    <a
                      href="#"
                      onClick={handleSigninModal}
                      className="login--btn"
                    >
                      Join Us
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
      {cartModal && (
        <CartModal cartModal={cartModal} handleModal={handleModal} />
      )}
      {signinModal && (
        <SignInModal
          signinModal={signinModal}
          handleSigninModal={handleSigninModal}
        />
      )}
    </>
  );
};

export default Header;
