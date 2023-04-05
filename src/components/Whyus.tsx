import React from 'react'

const Whyus = () => {
  return (
    <section className="why--us">
        <div className="grid--container">
            <div className="grid">
                <div className="grid-- order--tab--1">
                    <div className="grid--wrapper">
                        <div className="why--us--grid">
                            <div className="why--us--grid--item" data-aos="fade-up" data-aos-duration="1000">
                            <img src={require("../asstes/image/dolor--icon.svg").default} alt="" className="icon--thumbnuil"/>
                                <h3>Dependable</h3>
                                <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit,
                                     sed diam nonummy nibh euismod tincidunt ut laoreet dolore
                                </p>
                            </div>
                            <div className="why--us--grid--item" data-aos="fade-up" data-aos-duration="1000">
                              <img src={require("../asstes/image/dolor--icon.svg").default} alt="" className="icon--thumbnuil"/>
                                <h3>Dependable</h3>
                                <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit,
                                     sed diam nonummy nibh euismod tincidunt ut laoreet dolore
                                </p>
                            </div>
                            <div className="why--us--grid--item" data-aos="fade-up" data-aos-duration="1000">
                              <img src={require("../asstes/image/dolor--icon.svg").default} alt="" className="icon--thumbnuil"/>
                                <h3>Dependable</h3>
                                <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit,
                                     sed diam nonummy nibh euismod tincidunt ut laoreet dolore
                                </p>
                            </div>
                            <div className="why--us--grid--item" data-aos="fade-up" data-aos-duration="1000">
                              <img src={require("../asstes/image/dolor--icon.svg").default} alt="" className="icon--thumbnuil"/>
                                <h3>Dependable</h3>
                                <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit,
                                     sed diam nonummy nibh euismod tincidunt ut laoreet dolore
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="grid-- y--center">
                    <div className="grid--wrapper">
                        <div className="why--us--content">
                            <h3 data-aos="fade-up" data-aos-duration="1000">Why Us?</h3>
                            <h2 data-aos="fade-up" data-aos-duration="1000">Lorem ipsum dolor sit am!</h2>
                            <p data-aos="fade-up" data-aos-duration="1000">GetLorem ipsum dolor sit amet, consectetuer adipiscing elit,
                                 sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna
                                 aliquam erat volutpat. Ut wisi enim ad minim veniam.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Whyus