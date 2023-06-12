import React from "react";

const Whyus = () => {
  return (
    <section className="why--us">
      <div className="grid--container">
        <div className="grid">
          <div className="grid---- order--tab--1">
            <div className="grid--wrapper">
            <div className="why--us--content">
                <h3 data-aos="fade-up" data-aos-duration="1000">
                  Why Us?
                </h3>
              </div>
              <div className="why--us--grid">
                <div
                  className="why--us--grid--item"
                  data-aos="fade-up"
                  data-aos-duration="1000"
                >
                  <img
                    src={require("../asstes/image/dolor--icon.svg").default}
                    alt=""
                    className="icon--thumbnuil"
                  />
                  <h3>Dependable</h3>
                  <p>
                    We know you’re busy. Text us what you need! Simple, Easy!
                  </p>
                </div>
                <div
                  className="why--us--grid--item"
                  data-aos="fade-up"
                  data-aos-duration="1000"
                >
                  <img
                    src={require("../asstes/image/dolor--icon.svg").default}
                    alt=""
                    className="icon--thumbnuil"
                  />
                  <h3>Dependable</h3>
                  <p>
                    Simple Easy online booking: go to our website, scan a QR
                    code on our truck or our toilet and get the booking process
                    done! Simple, Easy!
                  </p>
                </div>
                <div
                  className="why--us--grid--item"
                  data-aos="fade-up"
                  data-aos-duration="1000"
                >
                  <img
                    src={require("../asstes/image/dolor--icon.svg").default}
                    alt=""
                    className="icon--thumbnuil"
                  />
                  <h3>Dependable</h3>
                  <p>
                    QR code enabled: need service, maintenance, or leave us a
                    review? Just scan the QR code on the inside of our units. We
                    get instant notification of your service request and we step
                    into action!. Simple, Easy!
                  </p>
                </div>
                <div
                  className="why--us--grid--item"
                  data-aos="fade-up"
                  data-aos-duration="1000"
                >
                  <img
                    src={require("../asstes/image/dolor--icon.svg").default}
                    alt=""
                    className="icon--thumbnuil"
                  />
                  <h3>Dependable</h3>
                  <p>
                    Committed to Service: We’re using technology to make sure
                    our service is second to none. We value quality,
                    cleanliness, simplicity and efficiency in communication.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Whyus;
