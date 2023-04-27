import React from "react";
import HeroBanner from "../Common/HeroBanner";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/rootReducer";


function CartView() {
    const { cart } = useSelector((state: RootState) => state.product);


  return (
    <React.Fragment>
        <HeroBanner />
      <section className="cart--table">
        <div className="grid--container">
          <div className="grid">
            <div className="grid----">
              <div className="cart--table--wrapper">
                <table className="cart--table--items">
                  <thead>
                    <tr>
                      <th className="col-product-info">Product</th>
                      <th className="product-price">Price</th>
                      <th className="product-quantity">Quantity</th>
                      <th className="product-subtotal">Subtotal</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart && cart.length > 0 &&
                    cart.map((item , index) => 
                    <tr key = {index+1}>
                      <td className="product--info">
                        <div className="product-wrap">
                          <div className="product--thumbnuil">
                            <img src={`${process.env.REACT_APP_BASEURL}/${item?.product_images[0]?.image_path}`} alt="" />
                          </div>
                          <div className="product--info--data">
                            <h6 className="pd--title">hello</h6>
                            <dl>
                              <dt>Type:</dt>
                              <dd>Port</dd>
                            </dl>
                          </div>
                        </div>
                      </td>
                      <td className="product-price">
                        <span className="hidden--desk">Price</span>
                        <span>${item.product_price}</span>
                      </td>
                      <td className="product-quantity">
                        <span className="hidden--desk">Price</span>
                        <div className="quantity">
                          <input
                            type="number"
                            className="qty"
                            value="2"
                            placeholder=""
                          />
                          <button type="button" className="decrease">
                            -
                          </button>
                          <button type="button" className="increase">
                            +
                          </button>
                        </div>
                      </td>
                      <td className="product-subtotal">
                        <span className="hidden--desk">Price</span>
                        <span>$48</span>
                      </td>
                      <td className="remove--product">
                        <div className="delete--product">
                          <i className="fa-sharp fa-solid fa-circle-xmark"></i>
                        </div>
                      </td>
                    </tr>
                    )}
                  </tbody>
                </table>
                <div className="cart--totals">
                  <div className="cart--total--table">
                    <h3 className="order--title">Order Summary</h3>
                    <ul>
                      <li>
                        <span>Subtotal</span>
                        <span>$96.00</span>
                      </li>
                      <li>
                        <span>Shpping</span>
                        <span>$96.00</span>
                      </li>
                      <li>
                        <span>Total</span>
                        <span>$96.00</span>
                      </li>
                    </ul>
                    <div className="checkout--btn">
                      <button type="button" className="btn">
                        Checkout
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}

export default CartView;
