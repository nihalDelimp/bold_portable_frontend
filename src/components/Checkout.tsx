import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/rootReducer";
import IsLoadingHOC from "../Common/IsLoadingHOC";
import { authAxios } from "../config/config";
import { toast } from "react-toastify";
import GoogleMapModal from "../Common/GoogleMapModal";

interface MyComponentProps {
  setLoading: (isComponentLoading: boolean) => void;
}

function Checkout(props: MyComponentProps) {
  const { setLoading } = props;
  const { cart } = useSelector((state: RootState) => state.product);
  const [mapModal, setMapModal] = useState(false);

  const [billing, setBilling] = useState({
    first_name: "",
    last_name: "",
    company_name: "",
    address: "",
    apartment: "",
    city: "",
    post_code: "",
    email: "",
    phone_number: "",
  });

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBilling((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log("user", billing);
    const payload = billing;
    setLoading(true);
    await authAxios()
      .post("/order/create-order", payload)
      .then(
        (response) => {
          setLoading(false);
          if (response.data.status === 1) {
            toast.success(response.data.message);
          } else {
            toast.error(response.data.message);
          }
        },
        (error) => {
          setLoading(false);
          toast.error(error.response.data.message);
          console.log(error);
        }
      )
      .catch((error) => {
        console.log("errorrrr", error);
      });
  };

  const totalCounter = (cart: any) => {
    var result = cart.reduce(function (acc: any, item: any) {
      return acc + item.product_price * item.product_quantity;
    }, 0);
    return result;
  };

  const handleMapModal = () => {
    setMapModal(!mapModal);
  };


  return (
    <>
      <section className="checkout--table">
        <div className="grid--container">
          <div className="grid">
            <div className="grid----">
              
                <div className="checkout--table--wrapper">
              
                  <div className="billing--details">
                    <div className="billing--title">
                      <h3>Billing Details</h3>
                    </div>
                    <div className="billing--details--form">
                      <form action="">
                        <div className="form--group">
                          <label htmlFor="name">
                            First Name <span className="required">*</span>
                          </label>
                          <input
                            type="text"
                            name="first_name"
                            placeholder="First Name"
                            value={billing.first_name}
                            onChange={handleChangeInput}
                            required
                          />
                        </div>
                        <div className="form--group">
                          <label htmlFor="name">
                            Last Name <span className="required">*</span>
                          </label>
                          <input
                            type="text"
                            placeholder="Last Name"
                            name="last_name"
                            value={billing.last_name}
                            onChange={handleChangeInput}
                            required
                          />
                        </div>
                        <div className="form--group">
                          <label htmlFor="name">
                            Company Name <span className="required">*</span>
                          </label>
                          <input
                            type="text"
                            placeholder="Company Name"
                            name="company_name"
                            value={billing.company_name}
                            onChange={handleChangeInput}
                            required
                          />
                        </div>
                        {/* <div className="form--group">
                        <label htmlFor="name">
                          Select <span className="required">*</span>
                        </label>
                        <select name="" id="">
                          <option value="">item1</option>
                          <option value="">item1</option>
                          <option value="">item1</option>
                        </select>
                      </div> */}
                        <div className="form--group">
                          <label htmlFor="name">
                            Address <span className="required">*</span>
                          </label>
                          <input
                            type="text"
                            placeholder="Address"
                            name="address"
                            value={billing.address}
                            onChange={handleChangeInput}
                            required
                          />
                        </div>
                        <div className="form--group">
                          <label htmlFor="name">
                            Apartment <span className="required">*</span>
                          </label>
                          <input
                            type="text"
                            placeholder="Apartment, suite, unit, etc. (optional)"
                            name="apartment"
                            value={billing.apartment}
                            onChange={handleChangeInput}
                            required
                          />
                        </div>
                        <div className="form--group">
                          <label htmlFor="name">
                            City <span className="required">*</span>
                          </label>
                          <input
                            type="text"
                            placeholder="City"
                            name="city"
                            value={billing.city}
                            onChange={handleChangeInput}
                            required
                          />
                        </div>
                        <div className="form--group">
                          <label htmlFor="name">
                            Postcode/Zip <span className="required">*</span>
                          </label>
                          <input
                            type="text"
                            placeholder="Postcode/Zip"
                            name="post_code"
                            value={billing.post_code}
                            onChange={handleChangeInput}
                            required
                          />
                        </div>
                        <div className="form--group">
                          <label htmlFor="Email">
                            Email <span className="required">*</span>
                          </label>
                          <input
                            type="email"
                            placeholder="Email"
                            name="email"
                            value={billing.email}
                            onChange={handleChangeInput}
                            required
                          />
                        </div>
                        <div className="form--group">
                          <label htmlFor="Email">
                            Phone <span className="required">*</span>
                          </label>
                          <input
                            type="number"
                            placeholder="Phone"
                            name="phone_number"
                            value={billing.phone_number}
                            onChange={handleChangeInput}
                            required
                          />
                        </div>
                        <div className="form--checkbox">
                          <label htmlFor="rememberme">
                            <input
                              className=""
                              name="rememberme"
                              type="checkbox"
                              id="rememberme"
                            />{" "}
                            <span>Ship to a different address?</span>
                          </label>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="cart--totals">
                    <div className="cart--total--table">
                      <h3 className="order--title">Order Summary</h3>
                      {cart &&
                        cart.length > 0 &&
                        cart.map((item, index) => (
                          <div className="product--details">
                            <div className="product--thumbnuil">
                              <img
                                src={`${process.env.REACT_APP_BASEURL}/${item?.product_images[0]?.image_path}`}
                                alt=""
                              />
                            </div>
                            <div className="product--content">
                              <h3 className="pd--title">
                                Wheelchair Accessible
                              </h3>
                              <div className="quantity--and--price">
                                <span className="price">
                                  ${item.product_price}
                                </span>
                                <span className="quantity">
                                  <span>X</span>
                                  <span>{item.product_quantity}</span>
                                </span>
                              </div>
                              <div className="type">
                                <b>Type:</b> <span>{item.product_type}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      <ul>
                        <li>
                          <span>Subtotal</span>
                          <span>${totalCounter(cart)}</span>
                        </li>
                        <li>
                          <span>Shpping</span>
                          <span>$1.50</span>
                        </li>
                        <li>
                          <span>Total</span>
                          <span>${totalCounter(cart) + 1.5}</span>
                        </li>
                      </ul>
                      <div className="checkout--btn">
                        <button onClick={handleMapModal} type="button" className="btn">
                          Place Order
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </section>
      {mapModal && (
        <GoogleMapModal mapModal={mapModal} handleMapModal={handleMapModal} closeModal = {() =>setMapModal(false) } />
      )}
    </>
  );
}

export default IsLoadingHOC(Checkout);
