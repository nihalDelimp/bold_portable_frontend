import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { authAxios } from "../config/config";
import IsLoadingHOC from "../Common/IsLoadingHOC";
import { trimObjValues } from "../Helper";
import { maxUserPhoneLength, minUserPhoneLength } from "../Constants";

// first_name, last_name, company_name, email, phone, message, feedback

interface MyComponentProps {
  setLoading: (isComponentLoading: boolean) => void;
  isLoading: boolean;
}

function ContactUs(props: MyComponentProps) {
  const { setLoading, isLoading } = props;
  const [userData, setUserData] = useState({
    first_name: "",
    last_name: "",
    company_name: "",
    email: "",
    phone: "",
    message: "",
    feedback: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChangePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const sanitizedValue = value.replace(/[^0-9-+]/g, ""); // Remove non-numeric, non-hyphen, and non-plus characters
    if (sanitizedValue.match(/^\+?[0-9-]*$/)) {
      setUserData((prev) => ({
        ...prev,
        [name]: sanitizedValue,
      }));
    }
  };

  const handleModalClose = () => {
    setShowSuccessPopup(false);
  };

  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const payload = trimObjValues(userData);
    let validUsername = /^[A-Za-z\s]+$/;
    if (!payload.first_name) {
      toast.error("First name is required!");
    } else if (!validUsername.test(payload.first_name)) {
      toast.error("First name should only contain letters");
    } else if (!payload.last_name) {
      toast.error("Last name is required!");
    } else if (!validUsername.test(payload.last_name)) {
      toast.error("Last Name should only contain letters");
    } else {
      setLoading(true);
      await authAxios()
        .post("/contact/save", payload)
        .then(
          (response) => {
            setLoading(false);
            if (response.data.status === 1) {
              // toast.success(response.data.message);
              setShowSuccessPopup(true);
              setUserData({
                first_name: "",
                last_name: "",
                company_name: "",
                email: "",
                phone: "",
                message: "",
                feedback: "",
              });

              // setTimeout(() => {
              //   setShowSuccessPopup(false);
              // }, 3000);

            } else {
              toast.error(response.data?.message);
            }
          },
          (error) => {
            setLoading(false);
            if (error.response.data.message) {
              toast.error(error.response.data.message);
            } else {
              const obj = error.response.data.errors[0];
              const errormsg = Object.values(obj) || [];
              if (errormsg && errormsg.length > 0) {
                toast.error(`${errormsg[0]}`);
              }
            }
          }
        )
        .catch((error) => {
          console.log("errorrrr", error);
        });
    }
  };

  const handleRedirect = () => {
    window.location.href = '/';
  };

  return (
    <>
      <section className="default--top--banner">
        <div className="banner--thumbnuil">
          <img
            src={require("../asstes/image/about--banner.jpg")}
            alt="AboutUs"
            loading="lazy"
          />
        </div>
        <div
          className="banner--heading"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          <h1>Contact Us</h1>
        </div>
      </section>
      <section className="contact--us">
        <div className="grid--container">
          <div className="grid">
            <div className="grid----">
              <div className="contact--us--wrapper">
                <div
                  className="contact--sidebar"
                  data-aos="fade-up"
                  data-aos-duration="1000"
                >
                  <h2>Get in touch</h2>
                  <div className="contact--data">
                    <ul>
                      <li>
                        <div className="contact--data--item">
                          <span className="icons">
                            <img
                              src={require("../asstes/image/lucide-mail.png")}
                              alt="AboutUs"
                              loading="lazy"
                            />
                          </span>
                          <div className="details--item">
                            <h3>Email us</h3>
                            <Link to={"mailto:info@go-bold.ca"}>
                              info@go-bold.ca
                            </Link>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="contact--data--item">
                          <span className="icons">
                            <img
                              src={require("../asstes/image/iconamoon-phone-light.png")}
                              alt="AboutUs"
                              loading="lazy"
                            />
                          </span>
                          <div className="details--item">
                            <h3>Phone</h3>
                            <Link to={"tel:+1 (250) 869-5444"}>
                            +1 (250) 869-5444 
                            </Link>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="contact--data--item">
                          <span className="icons">
                            <img
                              src={require("../asstes/image/basil-location-outline.png")}
                              alt="AboutUs"
                              loading="lazy"
                            />
                          </span>
                          <div className="details--item">
                            <h3>Our office Location</h3>
                            {/* <p>Come to discuss at our office.</p> */}
                            <address>
                              #6 8860 Jim Bailey Crescent, Kelowna BC 
                              V4V 2L7
                            </address>
                          </div>
                        </div>
                          <div style={{ margin: "36px", marginBottom: "0px" }}>
                              <b> Our team is here to help you!</b>
                          </div>
                      </li>
                      
                    </ul>
                  </div>
                  <div className="social--hendals">
                    <ul>
                      <li>
                        <Link to="">
                          <i className="fa-brands fa-facebook-f"></i>
                        </Link>
                      </li>
                      <li>
                        <Link to="">
                          <i className="fa-brands fa-instagram"></i>
                        </Link>
                      </li>
                      <li>
                      <Link to="">
                          <i className="fa-brands fa-linkedin-in"></i>
                        </Link>
                      </li>
                      <li>
                      <Link to={"https://www.polyjohn.com/"} target="_blank"
                        rel="noreferrer">
                          <span>PJ</span>
                        </Link>
                      </li>
                      <li>
                        <Link to={"https://www.psai.org/"}  target="_blank"
                        rel="noreferrer">
                          <span>PSI</span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div
                  className="contact--us--form"
                  data-aos="fade-up"
                  data-aos-duration="1000"
                >
                  <div className="default--form">
                    <div className="default--form--wrapper">
                      <div className="form--title">
                        <h2>Tell us more about yourself!</h2>
                      </div>
                      <form onSubmit={handleSubmit}>
                        <div className="form--group">
                          <label htmlFor="name" hidden>
                            First Name
                          </label>
                          <input
                            type="text"
                            required
                            maxLength={35}
                            placeholder="First Name"
                            value={userData.first_name}
                            name="first_name"
                            onChange={handleChange}
                          />
                        </div>
                        <div className="form--group">
                          <label htmlFor="name" hidden>
                            Last Name
                          </label>
                          <input
                            type="text"
                            required
                            maxLength={35}
                            placeholder="Last Name"
                            value={userData.last_name}
                            name="last_name"
                            onChange={handleChange}
                          />
                        </div>
                        <div className="form--group span--2">
                          <label htmlFor="name" hidden>
                            Company Name
                          </label>
                          <input
                            type="text"
                            required
                            maxLength={60}
                            placeholder="Company Name"
                            value={userData.company_name}
                            name="company_name"
                            onChange={handleChange}
                          />
                        </div>
                        <div className="form--group span--2">
                          <label htmlFor="Email" hidden>
                            Email
                          </label>
                          <input
                            type="email"
                            required
                            placeholder="Email"
                            value={userData.email}
                            name="email"
                            onChange={handleChange}
                          />
                        </div>
                        <div className="form--group span--2">
                          <label htmlFor="Email" hidden>
                            Phone
                          </label>
                          <input
                            type="text"
                            required
                            minLength={minUserPhoneLength}
                            maxLength={maxUserPhoneLength}
                            placeholder="Phone"
                            value={userData.phone}
                            name="phone"
                            onChange={handleChangePhone}
                          />
                        </div>
                        <div className="form--group span--2">
                          <label htmlFor="name" hidden>
                            Message
                          </label>
                          <textarea
                            placeholder="Message"
                            required
                            value={userData.message}
                            name="message"
                            onChange={handleChangeTextArea}
                          ></textarea>
                        </div>
                        <div className="form--action span--2">
                          <button type="submit" className="submit--from btn">
                            Submit
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {showSuccessPopup && (
        <div id="success--popup" className="success--container">
          <span id="close--modal" onClick={handleModalClose}>x</span>
          <div className="success--content">
            <p>Your request has been submited. One of our team members will be contacting you shortly.</p>
            <button onClick={handleRedirect} className="btn">Go to Home Page</button>
          </div>
        </div>
      )}

    </>
  );
}

export default IsLoadingHOC(ContactUs);
