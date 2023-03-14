import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../Redux/rootReducer";
import { logout } from "../Redux/Reducers/auth";
import { useNavigate } from "react-router-dom";
import CartModal from "./CartModal";

function NavBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, accessToken } = useSelector((state: RootState) => state.auth);
  const { cart } = useSelector((state: RootState) => state.product);

  const [cartModal, setCartModal] = useState(false);

  const handleLogout = () => {
    dispatch(logout(true));
    navigate("/");
  };

  const handleModal = () => {
    setCartModal(!cartModal);
  };

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
                <NavLink className="nav-link" to="/map-location">
                  Location
                </NavLink>
              </li>
              {accessToken && (
                <li className="nav-item">
                  <span className="nav-link" onClick={handleLogout}>
                    Logout
                  </span>
                </li>
              )}
            </ul>
            <form className="d-flex">
              {/* <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              /> */}
              {cart && cart.length > 0 && (
                <a href="#" onClick={handleModal}>
                  {cart.length} View
                </a>
              )}
            </form>
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
