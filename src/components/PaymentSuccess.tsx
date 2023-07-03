import React, { useEffect } from "react";
import IsLoadingHOC from "../Common/IsLoadingHOC";
import { Link } from "react-router-dom";

interface MyComponentProps {
  setLoading: (isComponentLoading: boolean) => void;
}

function PaymentSuccess(props: MyComponentProps) {
  useEffect(() => {
    // Get the URL parameters
    const params = new URLSearchParams(window.location.search);
    const quotationId = params.get("quotationId");
    const quotationType = params.get("quotationType");
  }, []);

  return (
    <>
      <section className="order--sucsess--message">
        <div className="order--message--container">
          <div className="order--message--body">
            <div className="sucsess--check">
              <img
                src={require("../asstes/image/check--right.png")}
                alt=""
                loading="lazy"
              />
            </div>
            <h3>Thank you for subscribing!</h3>
            <p>You have successfully subscribed to our list.</p>
            <Link to={"/"} className="btn">
              Close
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default IsLoadingHOC(PaymentSuccess);
