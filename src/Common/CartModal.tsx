import React from "react";
import "../assets/css/styles.css";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/rootReducer";
import {
  removeItem,
  incrementQuantity,
  decrementQuantity,
} from "../Redux/Reducers/productSlice";
import { useDispatch } from "react-redux";

const CartModal = (props: any) => {
  const { cartModal, handleModal } = props;
  const { cart } = useSelector((state: RootState) => state.product);
  console.log("Cart", cart);
  const dispetch = useDispatch();

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
          <div className="modal-content bg-light">
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
                          <img style={{maxHeight: '130px'}}
                            src={`${process.env.REACT_APP_BASEURL}/${item?.product_image}`}
                            className="img-fluid img-thumbnail"
                            alt="Sheep"
                          />
                        </td>
                        <td>{item.title}</td>
                        <td>${item.product_price}</td>
                        <td className="qty">{item.quantity}</td>
                        <td>${item.product_price * item.quantity}</td>
                        <td>
                          <a
                            href="#"
                            onClick={() => dispetch(incrementQuantity(item._id))}
                            className="btn btn-primary btn-sm mr-2"
                          >
                            <i className="fa fa-plus"></i>
                          </a>
                          <a
                            href="#"
                            onClick={() => dispetch(decrementQuantity(item._id))}
                            className="btn btn-secondary btn-sm mr-2"
                          >
                            <i className="fa fa-minus"></i>
                          </a>
                          <a
                            href="#"
                            onClick={() => dispetch(removeItem(item._id))}
                            className="btn btn-danger btn-sm"
                          >
                            <i className="fa fa-times"></i>
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
