import React, { useEffect, useState } from "react";
import { authAxios } from "../config/config";
import { toast } from "react-toastify";
import IsLoadingHOC from "./IsLoadingHOC";
// import { QRCode } from "react-qr-svg";
import QRCode from "react-qr-code";
import { Link } from "react-router-dom";
import { trimObjValues, validateEmail } from "../Helper";

interface MyComponentProps {
  setLoading: (isComponentLoading: boolean) => void;
}

const Footer = (props: MyComponentProps) => {
  const { setLoading } = props;
  const [base64QRCode, setBase64QRCode] = useState(null);
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  
  const [accepted, setIsaccepted] = useState<boolean>(false);

  const Isaccepted = localStorage.getItem('cookie-accepted')

  // useEffect(()=>{
  
  //   setIsaccepted(!accepted)
  
  // },[accepted])
  
  const  handleCookieClick=()=>{
  
    localStorage.setItem('cookie-accepted', "true")
    setIsaccepted(true)
  
  }

  const getBase64QRCodeData = async () => {
    setLoading(true);
    await authAxios()
      .get("/qr-code/show")
      .then(
        (response) => {
          setLoading(false);
          if (response.data.status === 1) {
            const qrCode = response.data.data;
            setBase64QRCode(qrCode);
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

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    let payload = { email, message };
    payload = trimObjValues(payload);
    const isValid = validateEmail(payload.email);
    if (!isValid) {
      toast.error("Invalid email address");
    } else if (!payload.message) {
      toast.error("Please enter message");
    } else if (payload.message.length < 5) {
      toast.error("Message bust be at least 5 character long!");
    } else {
      setLoading(true);
      await authAxios()
        .post("/contact/send-query", payload)
        .then(
          (response) => {
            setLoading(false);
            if (response.data.status === 1) {
              toast.success(response.data.message);
              setEmail("");
              setMessage("");
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
    }
  };

  return (
    <>
    <footer className="footer">
      <div className="grid--container">
        <div className="grid">
          <div className="grid----">
            <div className="grid--wrapper">
              <div className="bold--heading--wrapper">
                <div
                  className="heading--big"
                  data-aos="fade-up"
                  data-aos-duration="1000"
                >
                  <h2>Get in touch? </h2>
                </div>
              </div>
              <div
                className="footer--form"
                data-aos="fade-up"
                data-aos-duration="1000"
              >
                <form onSubmit={handleSubmit}>
                  <div className="form--group">
                    <input
                      type="email"
                      value={email}
                      name="email"
                      required
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email"
                    />
                    <input
                      type="text"
                      required
                      minLength={5}
                      placeholder="Message"
                      value={message}
                      name="message"
                      onChange={(e) => setMessage(e.target.value)}
                    />
                    <div className="submit--btn">
                      <button type="submit">{}</button>
                    </div>
                  </div>
                </form>
              </div>
              <div className="contact--details">
                <ul>
                  <li data-aos="fade-up" data-aos-duration="1000">
                    <a href="tel:+1 (250) 869-5444">+1 (250) 869-5444</a>
                  </li>
                  <li data-aos="fade-up" data-aos-duration="1000">
                    <a href="mailto:info@go-bold.ca">info@go-bold.ca</a>
                  </li>
                  {/* <li data-aos="fade-up" data-aos-duration="1000">
                    <div
                      style={{
                        height: "auto",
                        margin: "0 auto",
                        maxWidth: 300,
                        width: "100%",
                        background: "white",
                        padding: "10px",
                      }}
                    >
                      <h5 className="text-center">Outer QR Code</h5>
                      {base64QRCode && (
                        <QRCode
                          size={200}
                          style={{
                            height: "auto",
                            maxWidth: "100%",
                            width: "100%",
                          }}
                          value={base64QRCode}
                          viewBox={`0 0 256 256`}
                        />
                      )}
                    </div>
                  </li>
                  <li data-aos="fade-up" data-aos-duration="1000">
                    <div
                      style={{
                        height: "auto",
                        margin: "0 auto",
                        maxWidth: 300,
                        width: "100%",
                        background: "white",
                        padding: "10px",
                      }}
                    >
                      <h5 className="text-center">Inner QR Code</h5>
                      {base64QRCode && (
                        <QRCode
                          size={200}
                          style={{
                            height: "auto",
                            maxWidth: "100%",
                            width: "100%",
                          }}
                          value={base64QRCode}
                          viewBox={`0 0 256 256`}
                        />
                      )}
                    </div>
                  </li> */}
                </ul>
              </div>
              <div className="footer--social">
                <div
                  className="footer--logo"
                  data-aos="fade-up"
                  data-aos-duration="1000"
                >
                  <img
                    src={require("../asstes/image/footer--logo.png")}
                    alt=""
                  />
                </div>
                <div
                  className="social--list"
                  data-aos="fade-up"
                  data-aos-duration="1000"
                >
                  <ul>
                    <li>
                      <a
                        href="https://www.polyjohn.com"
                        target="_blank"
                        rel="noreferrer"
                      >
                       POLYJOHN
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.psai.org/"
                        target="_blank"
                        rel="noreferrer"
                      >
                        PSAI
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="footer--copyright">
                <p
                  className="copyright"
                  data-aos="fade-up"
                  data-aos-duration="1000"
                >
                  All Rights Reserved © 2023 Bold Portables INC
                </p>
                {/* <div
                  className="design--by"
                  data-aos="fade-up"
                  data-aos-duration="1000"
                >
                  <a href="#">Designed & Developed By Delimp</a>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  {Isaccepted!=="true" && <div className="cookies--div" id="cookies--popup">
      <p>We use cookies to ensure you have the best browsing experience on our website. By using our site, you acknowledge that you have read and understood our <Link to="#">Cookie Policy</Link> & <Link to="#">Privacy Policy</Link> </p>
      <a href="#" className="btn" id="btncookies" onClick={handleCookieClick}>Got It ! </a>
    </div>}
     </>
  );
};

export default IsLoadingHOC(Footer);
