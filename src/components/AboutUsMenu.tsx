import React from "react";

function AboutUsMenu() {
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
          <h1>About Us</h1>
        </div>
      </section>
      <section className="about--portable">
        <div className="grid--container">
          <div className="grid">
            <div className="grid----">
              <div className="about--portable--wrapper">
                <div className="about--portable--data">
                  <h2 data-aos="fade-up" data-aos-duration="1000">
                    Bold Portables
                  </h2>
                  <p
                    className="highlight--text"
                    data-aos="fade-up"
                    data-aos-duration="1000"
                  >
                    We know life is busy and efficiency is key! We know you want
                    it to be simple and that’s what we’ve created!
                  </p>
                  <p data-aos="fade-up" data-aos-duration="1000">
                    That’s why we’re revolutionizing the industry by creating
                    technology to allow a simple, efficient, unmatched customer
                    experience!
                  </p>
                </div>
                <div className="about--banner">
                  <img
                    src={require("../asstes/image/about--port.jpg")}
                    alt=" Aboutport"
                    data-aos="fade-in"
                    data-aos-duration="500"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="we--committed">
        <div className="grid--container">
          <div className="grid">
            {/* <div className="grid--">
              <div className="we--commited--data">
                <h2 data-aos="fade-up" data-aos-duration="1000">
                Simple Easy Online Booking
                </h2>
                <p data-aos="fade-up" data-aos-duration="1000">
                Go to our website, scan a QR code on our truck or our toilet, and get the booking process done! Simple,
easy!
                </p>
              </div>
              <div className="we--commited--data">
                <h2 data-aos="fade-up" data-aos-duration="1000">
                QR Code Enabled
                </h2>
                <p data-aos="fade-up" data-aos-duration="1000">
                Need service, maintenance, or want to leave us a review? Just scan the QR code on one of our units and
we step into action. We will be instantly notified of your booking or service request. Simple, easy!
                </p>
              </div>

              <div className="we--commited--data">
                <h2 data-aos="fade-up" data-aos-duration="1000">
                Committed to Service
                </h2>
                <p data-aos="fade-up" data-aos-duration="1000">
                We’re using technology to make sure our service is second to none. We value quality,
cleanliness, simplicity and efficiency in communication. Our technology makes your booking and service request
experience simple, efficient, and second to none.
                </p>
              </div>
              
              <div className="we--commited--data">
                <h2 data-aos="fade-up" data-aos-duration="1000">
                  Online Customer Portal
                </h2>
                <p data-aos="fade-up" data-aos-duration="1000">
                Manage your contracts through our uniquely designed customer portal.
                </p>
              </div>

            </div> */}
            <div className="grid----">
              <div className="we--commited--list">
                <ul>
                  <li data-aos="fade-up" data-aos-duration="1000">
                    <div className="we--commited--item">
                      <div className="icons">
                        <img
                          src={require("../asstes/image/Efficiency.png")}
                          alt="Efficiency"
                          loading="lazy"
                        />
                      </div>
                      <div className="we--commited--text">
                        <h3>Simple Easy Online Booking</h3>
                        <p>
                        Go to our website, scan a QR code on our truck or our toilet, and get the booking process done! Simple,
easy!
                        </p>
                      </div>
                    </div>
                  </li>
                  <li data-aos="fade-up" data-aos-duration="1000">
                    <div className="we--commited--item">
                      <div className="icons">
                        <img
                          src={require("../asstes/image/Simplicity.png")}
                          alt="Simplicity"
                          loading="lazy"
                        />
                      </div>
                      <div className="we--commited--text">
                        <h3>QR Code Enabled</h3>
                        <p>
                        Need service, maintenance, or want to leave us a review? Just scan the QR code on one of our units and
we step into action. We will be instantly notified of your booking or service request. Simple, easy!
                        </p>
                      </div>
                    </div>
                  </li>
                  <li data-aos="fade-up" data-aos-duration="1000">
                    <div className="we--commited--item">
                      <div className="icons">
                        <img
                          src={require("../asstes/image/Technology.png")}
                          alt="Technology"
                          loading="lazy"
                        />
                      </div>
                      <div className="we--commited--text">
                        <h3> Committed to Service</h3>
                        <p>
                        We’re using technology to make sure our service is second to none. We value quality,
cleanliness, simplicity and efficiency in communication. Our technology makes your booking and service request
experience simple, efficient, and second to none.
                        </p>
                      </div>
                    </div>
                  </li>

                  <li data-aos="fade-up" data-aos-duration="1000">
                  <div className="we--commited--item">
                      <div className="icons">
                        <img
                          src={require("../asstes/image/Technology.png")}
                          alt="Technology"
                          loading="lazy"
                        />
                      </div>
                      <div className="we--commited--text">
                        <h3>  Online Customer Portal</h3>
                        <p>
                        Manage your contracts through our uniquely designed customer portal.
                        </p>
                      </div>
                     
                    </div>
                    </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default AboutUsMenu;
