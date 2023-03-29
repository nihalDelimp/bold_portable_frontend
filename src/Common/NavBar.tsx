import React, { useState, useEffect, useRef } from "react";
import { NavLink, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../Redux/rootReducer";
import { logout } from "../Redux/Reducers/authSlice";
import { useNavigate } from "react-router-dom";
import CartModal from "./CartModal";
import { socket } from "../config/socket";

function NavBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);
  const { cart } = useSelector((state: RootState) => state.product);
  const [cartModal, setCartModal] = useState(false);

  const handleLogout = () => {
    dispatch(logout(false));
    navigate("/");
  };

  const handleModal = () => {
    setCartModal(!cartModal);
  };


  useEffect(() => {
    // Connect to the server
    socket.connect();
    socket.on("new_order", (data: string) => {
      console.log("order_status", data);
    });

    socket.on("cancel_order", (data: string) => {
      console.log("order_status", data);
    });

    socket.emit("accept_order", "Order has been accepted");

    socket.on("complete_order", (data: string) => {
      console.log("order_status", data);
    });

    // Cleanup function to disconnect from the server
    return () => {
      socket.disconnect();
      console.log("after LOgOut" , socket)
    };
  }, []);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            {user.name}
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link active" aria-current="page" to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/products">
                  Products
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/my-orders">
                  My orders
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/map-location">
                  Location
                </NavLink>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  data-toggle="dropdown"
                  href="#"
                  role="button"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Setting
                </a>
                <div className="dropdown-menu">
                  <Link
                    className="dropdown-item"
                    to={`/edit-profile/${user._id}`}
                  >
                    Edit profile
                  </Link>
                  <a
                    className="dropdown-item"
                    href="#two"
                    onClick={handleLogout}
                  >
                    LogOut
                  </a>
                </div>
              </li>
            </ul>
            {cart && cart.length > 0 && (
              <a href="#" onClick={handleModal}>
                {cart.length} View
              </a>
            )}
          </div>
        </div>
      </nav>
      {cartModal && (
        <CartModal cartModal={cartModal} handleModal={handleModal} />
      )}
    </>
  );
}

export default NavBar;
