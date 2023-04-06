import React, { useRef , useEffect } from "react";
// import "../assets/css/styles.css";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/rootReducer";
import {
  removeItem,
  incrementQuantity,
  decrementQuantity,
  removeAllItems,
} from "../Redux/Reducers/productSlice";
import { useDispatch } from "react-redux";
import IsLoadingHOC from "../Common/IsLoadingHOC";
import { authAxios } from "../config/config";
import io , {Socket} from 'socket.io-client';
import { toast } from "react-toastify";


const CartModal = (props: any) => {
  const dispetch = useDispatch();
  const { cartModal, handleModal, setLoading, isLoading } = props;
  const { cart } = useSelector((state: RootState) => state.product);
  const { user } = useSelector((state: RootState) => state.auth);

  const socket = useRef<Socket>()

   socket.current = io('http://localhost:4000');

  interface MyCart {
    userId: string;
    products: {
      productId: string;
      product_quantity: number;
      product_price: number;
    }[];
  }


  const totalCounter = () => {
    var result = cart.reduce(function (acc, item) {
      return acc + item.product_price * item.product_quantity;
    }, 0);
    return result;
  };

  const createOrder = async () => {
    const payLoad: MyCart = {
      userId: user._id,
      products: [],
    };
    cart.forEach((item) => {
      payLoad.products.push({
        productId: item._id,
        product_quantity: item.product_quantity,
        product_price: item.product_price,
      });
    });

    setLoading(true);
    await authAxios()
      .post(`/order/create-order`, payLoad)
      .then(
        (response) => {
          setLoading(false);
          if (response.data.status === 1) {
            if(socket.current){
            socket.current.emit('new_order', response.data.data);
            }
            toast.success(response.data?.message);
            dispetch(removeAllItems());
            handleModal();
          } else {
            toast.error(response.data?.message);
          }
        },
        (error) => {
          setLoading(false);
          toast.error(error.response.data?.message);
        }
      )
      .catch((error) => {
        console.log("errorrrr", error);
      });
  };

  return (
    <div>
      <div
        id="myModal"
        className={`modal fade ${cartModal ? "show" : "hide"}`}
        style={{ display: cartModal ? "block" : "none" , overflowY : "scroll" }}
      >
        <div
          className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable"
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
                          <img
                            style={{ maxHeight: "130px", maxWidth: "130px" }}
                            src={`${process.env.REACT_APP_BASEURL}/${item?.product_images[0]?.image_path}`}
                            className="img-fluid img-thumbnail"
                            alt="Sheep"
                          />
                        </td>
                        <td>{item.title}</td>
                        <td>${item.product_price}</td>
                        <td className="qty">{item.product_quantity}</td>
                        <td>${item.product_price * item.product_quantity}</td>
                        <td>
                          <button style={{backgroundColor :  "#edf2f4"}}
                            onClick={() =>
                              dispetch(incrementQuantity(item._id))
                            }
                            className="btn"
                          >
                            <i className="fa fa-plus"></i>
                          </button>
                          <button style={{backgroundColor :  "#8d99ae"}}
                            onClick={() =>
                              dispetch(decrementQuantity(item._id))
                            }
                            className="btn btn-secondary btn-sm mr-2"
                          >
                            <i className="fa fa-minus"></i>
                          </button>
                          <button style={{backgroundColor :  "#ef233c"}}
                            onClick={() => dispetch(removeItem(item._id))}
                            className="btn btn-danger btn-sm"
                          >
                            <i className="fa fa-times"></i>
                          </button>
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
              style={{backgroundColor :  "#8d99ae"}}
                onClick={() => handleModal()}
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button 
                style={{backgroundColor :  "#2b2d42"}}
                disabled={isLoading}
                type="button"
                onClick={createOrder}
                className="btn btn-success btn-sm"
              >
                {isLoading ? "Processing" : "Create Order"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IsLoadingHOC(CartModal);
