import React from "react";
import "../assets/css/styles.css";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/rootReducer";
import {removeItem}  from '../Redux/Reducers/productSlice';
import { useDispatch } from "react-redux";

const CartModal = (props: any) => {
  const { cartModal, handleModal } = props;
  const { cart } = useSelector((state: RootState) => state.product);
  console.log("Cart", cart);
  const dispetch = useDispatch()

  console.log("CartMOdal , setCartModal", cartModal);

  const totalCounter = () => {
    var result = cart.reduce(function (acc, item) {
      return acc + item.product_price * item.quantity;
    }, 0);
    return result;
  };

  return (
    <div>
      <div
        id="myModal"
        className={`modal fade ${cartModal ? "show" : "hide"}`}
        style={{ display: cartModal ? "block" : "none" }}
      >
        <div
          className="modal-dialog modal-lg modal-dialog-centered"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header border-bottom-0">
              <h5 className="modal-title" id="exampleModalLabel">
                Your Shopping Cart
              </h5>
              <button
                onClick={() => handleModal()}
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <table className="table table-image">
                <thead>
                  <tr>
                    <th scope="col"></th>
                    <th scope="col">Product</th>
                    <th scope="col">Price</th>
                    <th scope="col">Qty</th>
                    <th scope="col">Total</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {cart &&
                    cart.length > 0 &&
                    cart.map((item) => (
                      <tr>
                        <td className="w-25">
                          {/* <img
                        src="https://s3.eu-central-1.amazonaws.com/bootstrapbaymisc/blog/24_days_bootstrap/vans.png"
                        className="img-fluid img-thumbnail"
                        alt="Sheep"
                      /> */}
                          <img
                            src={`${process.env.REACT_APP_BASEURL}/${item?.product_image}`}
                            className="card-img-top"
                            alt="..."
                          />
                        </td>
                        <td>{item.title}</td>
                        <td>${item.product_price}</td>
                        <td className="qty">
                          <input
                            type="text"
                            className="form-control"
                            value={item.quantity}
                          />
                        </td>
                        <td>${item.product_price * item.quantity}</td>
                        <td onClick={() =>dispetch(removeItem(item.id))}>
                          <a href="#" className="btn btn-danger btn-sm">
                            <i  className="fa fa-times"></i>
                          </a>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
              {cart && cart.length > 0 && (
                <div className="d-flex justify-content-end">
                  <h5>
                    Total:{" "}
                    <span className="price text-success">{totalCounter()}</span>
                  </h5>
                </div>
              )}
            </div>
            <div className="modal-footer border-top-0 d-flex justify-content-between">
              <button
                onClick={() => handleModal()}
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-success">
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartModal;
