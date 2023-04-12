import React from "react";


export default function Notifications() {
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
            <ul>
              <li>
                <span className="icons">
                  <i className="fa-sharp fa-solid fa-cart-shopping"></i>
                </span>
                <div className="notification--content">
                  <span>user1 has Placed 2 order</span>
                </div>
                <div className="delete--notification">
                  <i className="fa-sharp fa-solid fa-circle-xmark"></i>
                </div>
              </li>
              <li>
                <span className="icons">
                  <i className="fa-sharp fa-solid fa-cart-shopping"></i>
                </span>
                <div className="notification--content">
                  <span>user1 has Placed 2 order</span>
                </div>
                <div className="delete--notification">
                  <i className="fa-sharp fa-solid fa-circle-xmark"></i>
                </div>
              </li>
              <li>
                <span className="icons">
                  <i className="fa-sharp fa-solid fa-cart-shopping"></i>
                </span>
                <div className="notification--content">
                  <span>user1 has Placed 2 order</span>
                </div>
                <div className="delete--notification">
                  <i className="fa-sharp fa-solid fa-circle-xmark"></i>
                </div>
              </li>
              <li>
                <span className="icons">
                  <i className="fa-sharp fa-solid fa-cart-shopping"></i>
                </span>
                <div className="notification--content">
                  <span>user1 has Placed 2 order</span>
                </div>
                <div className="delete--notification">
                  <i className="fa-sharp fa-solid fa-circle-xmark"></i>
                </div>
              </li>
            </ul>
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
