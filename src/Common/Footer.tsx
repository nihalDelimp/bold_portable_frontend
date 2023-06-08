import React, { useEffect, useState } from "react";
import { authAxios } from "../config/config";
import { toast } from "react-toastify";
import IsLoadingHOC from "./IsLoadingHOC";
// import { QRCode } from "react-qr-svg";
import QRCode from "react-qr-code";

interface MyComponentProps {
  setLoading: (isComponentLoading: boolean) => void;
}

const Footer = (props: MyComponentProps) => {
  const { setLoading } = props;
  const [base64QRCode, setBase64QRCode] = useState(null);

  useEffect(() => {
    getBase64QRCodeData();
  }, []);

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

  return (
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
                  <h2>Get in Touch? </h2>
                </div>
              </div>
              <div
                className="footer--form"
                data-aos="fade-up"
                data-aos-duration="1000"
              >
                <div className="form--group">
                  <input type="text" placeholder="Message" />
                  <div className="submit--btn">
                    <button type="button">{}</button>
                  </div>
                </div>
              </div>
              <div className="contact--details">
                <ul>
                  <li data-aos="fade-up" data-aos-duration="1000">
                    <a href="tel:+0123456789">+0 123456789</a>
                  </li>
                  <li data-aos="fade-up" data-aos-duration="1000">
                    <a href="mailto:bold@example.com">Bold@example.com</a>
                  </li>
                  <li  data-aos="fade-up" data-aos-duration="1000">
                  {base64QRCode && <QRCode size={200} value={base64QRCode} />}
                  </li>
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
                      <a href="https://www.polyjohn.com" target="_blank">
                        PG
                      </a>
                    </li>
                    <li>
                      <a href="https://www.psai.in/" target="_blank">
                        PSI
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
                  All Rights Reserved © 2023 Bold Portable INC
                </p>
                <div
                  className="design--by"
                  data-aos="fade-up"
                  data-aos-duration="1000"
                >
                  <a href="#">Designed & Developed By Delimp</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default IsLoadingHOC(Footer);
