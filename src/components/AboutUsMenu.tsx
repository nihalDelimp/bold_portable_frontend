import React from "react";

function AboutUsMenu() {
  return (
    <>
      <section className="default--top--banner">
        <div className="banner--thumbnuil">
          <img
            src={require("../asstes/image/about--banner.jpg")}
            alt="AboutUs"
          />
        </div>
        <div className="banner--heading">
          <h1>About Us</h1>
        </div>
      </section>
      <section className="about--portable">
        <div className="grid--container">
          <div className="grid">
            <div className="grid----">
              <div className="about--portable--wrapper">
                <div className="about--portable--data">
                  <h2>Bold Portable</h2>
                  <p className="highlight--text">
                    GetLorem ipsum dolor sit amet, consectetuer adipiscing elit,
                    sed diam nonummy nibh euismod tincidunt ut laoreet dolore
                    magna aliquam erat volutpat. Ut wisi enim ad minim veniam
                  </p>
                  <p>
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit,
                    sed diam nonummy nibh euismod tincidunt ut laoreet dolore
                    magna aliquam erat volutpat. Ut wisi enim ad minim veniam,
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit,
                    sed diam nonummy nibh euismod tincidunt ut laoreet dolore
                    magna aliquam erat volutpat. Ut wisi enim ad minim veniam,
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit,
                    sed diam nonummy nibh euismod tincidunt ut laoreet dolore
                    magna aliquam erat volutpat. Ut wisi enim ad minim veniam,
                    sed diam nonummy nibh euismod tincidunt ut laoreet dolore
                    magna aliquam erat volutpat. Ut wisi enim ad minim veniam,
                  </p>
                </div>
                <div className="about--banner">
                  <img
                    src={require("../asstes/image/about--port.jpg")}
                    alt=" Aboutport"
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
            <div className="grid--">
              <div className="we--commited--data">
                <h2>Bold Portable</h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
                  diam nonummy nibh euismod tincidunt ut laoreet dolore magna
                  aliquam erat volutpat. Ut wisi enim ad minim veniam, Lorem
                  ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
                  nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam
                  erat volutpat. Ut wisi enim ad minim veniam, Lorem ipsum dolor
                  sit amet, consectetuer adipiscing elit.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
                  diam nonummy nibh euismod tincidunt ut laoreet dolore magna
                  aliquam erat volutpat. Ut wisi enim ad minim veniam, Lorem
                  ipsum dolor sit amet, consectetuer adipiscing
                </p>
              </div>
            </div>
            <div className="grid--">
              <div className="we--commited--list">
                <ul>
                  <li>
                    <div className="we--commited--item">
                      <div className="icons">
                        <img
                          src={require("../asstes/image/Efficiency.png")}
                          alt="Efficiency"
                        />
                      </div>
                      <div className="we--commited--text">
                        <h3>Efficiency</h3>
                        <p>
                          Lorem ipsum dolor sit amet, consectetuer adipiscing
                          elit, sed diam nonummy nibh euismod tincidunt ut
                          laoreet dolore ma aliquam erat volutpat. Ut wisi enim
                          ad minim veniam.
                        </p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="we--commited--item">
                      <div className="icons">
                        <img
                          src={require("../asstes/image/Simplicity.png")}
                          alt="Simplicity"
                        />
                      </div>
                      <div className="we--commited--text">
                        <h3>Simplicity</h3>
                        <p>
                          Lorem ipsum dolor sit amet, consectetuer adipiscing
                          elit, sed diam nonummy nibh euismod tincidunt ut
                          laoreet dolore ma aliquam erat volutpat. Ut wisi enim
                          ad minim veniam.
                        </p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="we--commited--item">
                      <div className="icons">
                        <img
                          src={require("../asstes/image/Technology.png")}
                          alt="Technology"
                        />
                      </div>
                      <div className="we--commited--text">
                        <h3>Technology</h3>
                        <p>
                          Lorem ipsum dolor sit amet, consectetuer adipiscing
                          elit, sed diam nonummy nibh euismod tincidunt ut
                          laoreet dolore ma aliquam erat volutpat. Ut wisi enim
                          ad minim veniam.
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
