import React from "react";
import { Link} from "react-router-dom";

function ContactUs() {
  return (
    <>
      <section className="default--top--banner">
        <div className="banner--thumbnuil">
          <img
            src={require("../asstes/image/about--banner.jpg")}
            alt="AboutUs" loading="lazy"
          />
        </div>
        <div className="banner--heading" data-aos="fade-up"
                          data-aos-duration="1000">
          <h1>Contact Us</h1>
        </div>
      </section>
      <section className="contact--us">
            <div className="grid--container">
                <div className="grid">
                    <div className="grid----">
                        <div className="contact--us--wrapper">
                            <div className="contact--sidebar">
                                <h2>Get in touch</h2>
                                <div className="contact--data">
                                    <ul>
                                        <li>
                                            <div className="contact--data--item">
                                                <span className="icons">
                                                    <img
                                                        src={require("../asstes/image/lucide-mail.png")}
                                                        alt="AboutUs" loading="lazy"
                                                    />
                                                </span>   
                                                <div className="details--item">
                                                    <h3>Chat to us</h3>
                                                    <p>Our team is here to help you.</p>
                                                    <Link to={"mailto:boldportable@mail.com"}>boldportable@mail.com</Link>    
                                                </div> 
                                            </div>    
                                        </li>    
                                        <li>
                                            <div className="contact--data--item">
                                                <span className="icons">
                                                    <img
                                                        src={require("../asstes/image/basil-location-outline.png")}
                                                        alt="AboutUs" loading="lazy"
                                                    />
                                                </span>   
                                                <div className="details--item">
                                                    <h3>We are here</h3>
                                                    <p>Come to discuss at our office.</p>
                                                    <address>1234 ABCD Address 123 Area XYZ City XYZ Country</address>    
                                                </div> 
                                            </div>    
                                        </li>    
                                        <li>
                                            <div className="contact--data--item">
                                                <span className="icons">
                                                    <img
                                                        src={require("../asstes/image/iconamoon-phone-light.png")}
                                                        alt="AboutUs" loading="lazy"
                                                    />
                                                </span>   
                                                <div className="details--item">
                                                    <h3>Phone</h3>
                                                    <p>Our team is here to help you.</p>
                                                    <Link to={"mailto:boldportable@mail.com"}>boldportable@mail.com</Link>    
                                                </div> 
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
                                            <Link to="">
                                                <span>PJ</span>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="">
                                            <span>PSI</span>
                                            </Link>
                                        </li>
                                    </ul>    
                                </div>        
                            </div>
                            <div className="contact--us--form">
                                <div className="default--form" >
                                    <div className="default--form--wrapper">
                                        <div className="form--title">
                                            <h2>Tell us more about yourself!</h2>
                                        </div>
                                        <form action="">
                                            <div className="form--group">
                                                <label htmlFor="name" hidden>Fisrt Name</label>
                                                <input type="text" placeholder="Fisrt Name"/>
                                            </div>
                                            <div className="form--group">
                                                <label htmlFor="name" hidden>Last Name</label>
                                                <input type="text" placeholder="Last Name"/>
                                            </div>
                                            <div className="form--group span--2">
                                                <label htmlFor="name" hidden>Company Name</label>
                                                <input type="text" placeholder="Company Name"/>
                                            </div>
                                            <div className="form--group span--2">
                                                <label htmlFor="Email" hidden>Email</label>
                                                <input type="email" placeholder="Email"/>
                                            </div>
                                            <div className="form--group span--2">
                                                <label htmlFor="Email" hidden>Phone</label>
                                                <input type="tel" placeholder="Phone"/>
                                            </div>
                                            <div className="form--group span--2">
                                                <label htmlFor="name" hidden>Message</label>
                                                <textarea name="" id=""  placeholder="Message"></textarea>
                                            </div>
                                            <div className="form--action span--2">
                                                <button type="submit" className="submit--from btn">Submit</button>
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
    </>
  );
}

export default ContactUs;
