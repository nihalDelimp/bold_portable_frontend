import React ,{useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../Redux/rootReducer";
import {
    removeItem,
    incrementQuantity,
    decrementQuantity,
    removeAllItems,
  } from "../Redux/Reducers/productSlice";
  import GoogleMapModal from "./GoogleMapModal";


export default function CartPage() {
  const dispatch =  useDispatch()
  const { cart } = useSelector((state: RootState) => state.product);
  const { user } = useSelector((state: RootState) => state.auth);
  const [mapModal, setMapModal] = useState(false);


  const totalCounter = (cart: any) => {
    var result = cart.reduce(function (acc: any, item: any) {
      return acc + item.product_price * item.product_quantity;
    }, 0);
    return result;
  };

  const handleMapModal = () => {
    setMapModal(!mapModal)
  };

  return (
    <React.Fragment>
      <div className="cart--dropdown">
        <div className="cart--inner">
          <div className="cart--header">
            <ul>
              <li>
                <span>Your Cart</span>
              </li>
              <li>
                <div className="close--cart">
                  <i className="fa-solid fa-xmark"></i>
                </div>
              </li>
            </ul>
          </div>
          <div className="cart--body">
            <ul>
              {cart &&
                cart.length > 0 &&
                cart.map((item, index) => (
                  <li>
                    <div className="cart--dropdown--item">
                      <div className="product--thumbnuil">
                        <img
                          src={`${process.env.REACT_APP_BASEURL}/${item?.product_images[0]?.image_path}`}
                          alt=""
                        />
                      </div>
                      <div className="product--content">
                        <h3 className="pd--title">{item.title}</h3>
                        <div className="quantity--and--price">
                          <span className="price">${item.product_price}</span>
                          <span className="quantity">
                            <span>X</span>
                            <span>{item.product_quantity}</span>
                          </span>
                        </div>
                        <div className="type">
                          <b>Type:</b> <span>Port</span>
                        </div>
                      </div>
                      <div   onClick={() => dispatch(removeItem(item._id))} className="delete--product">
                        <i className="fa-sharp fa-solid fa-circle-xmark"></i>
                      </div>
                    </div>
                  </li>
                ))}
            </ul>

            {cart && cart.length > 0 && (
              <div className="view--cart--area">
                <div className="subtotal">
                  <span>Subtotal:</span>
                  <span className="subtotal--price">${totalCounter(cart)}</span>
                </div>
                <div className="view--cart--btns">
                  <a href="#" className="btn">
                    View Cart
                  </a>
                  <a onClick={handleMapModal} href="#" className="btn">
                    Chekout
                  </a>
                </div>
              </div>
            )}

            <div className="cart--empty">
              <div className="icons">
                <i className="fa-solid fa-cart-plus"></i>
              </div>
              <div className="view--cart--btns">
                <a href="#" className="btn">
                  Return To Shop
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {mapModal && <GoogleMapModal mapModal={mapModal} handleMapModal = {handleMapModal} />}

    </React.Fragment>
  );
}