import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { authAxios } from "../config/config";
import { toast } from "react-toastify";
import IsLoadingHOC from "../Common/IsLoadingHOC";
import io, { Socket } from "socket.io-client";

interface MyComponentProps {
  setLoading: (isComponentLoading: boolean) => void;
  isLoading: boolean;
}

function Services(props: MyComponentProps) {
  const { setLoading } = props;
  const [requestServices, setRequestServices] = useState<any[]>([]);
  const [isOtherService, setOtherService] = useState<boolean>(false);
  const [otherServiceName, setOtherServiceName] = useState<string>("");
  const [serviceTypes, setServiceTypes] = useState<string[]>([]);
  const [quotationId, setquotationId] = useState<string | null>("");
  const [quotationType, setquotationType] = useState<string | null>(
    "construction"
  );
  const [serviceName, setServiceName] = useState<string>("");

  const socket = useRef<Socket>();
  socket.current = io(`${process.env.REACT_APP_SOCKET}`);

  useEffect(() => {
    return () => {
      socket.current?.disconnect();
    };
  }, []);

  useEffect(() => {
    // Get the URL parameters
    const params = new URLSearchParams(window.location.search);
    const quotation_Id = params.get("quotationId");
    const quotation_Type = params.get("quotationType");
    if (quotation_Id) {
      setquotationId(quotation_Id);
    }
    if (quotation_Type) {
      setServiceName(quotation_Type);
      setquotationType(quotation_Type?.toLowerCase());
    }
  }, []);

  const toggleOtherService = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOtherService(event.target.checked);
    if (!event.target.checked) {
      setOtherServiceName("");
    }
  };

  const handleSelectService = (event: React.ChangeEvent<HTMLInputElement>) => {
    let dummyServices: string[] = [...serviceTypes];
    if (event.target.checked) {
      dummyServices.push(event.target.value);
      setServiceTypes(dummyServices);
    } else {
      var index = dummyServices.indexOf(event.target.value);
      if (index !== -1) {
        dummyServices.splice(index, 1);
        setServiceTypes(dummyServices);
      }
    }
  };

  useEffect(() => {
    if (quotationType) {
      getServiceData();
    }
  }, [quotationType]);

  const getServiceData = async () => {
    const payload = { name: quotationType };
    setLoading(true);
    await authAxios()
      .post(`/service/find-by-name`, payload)
      .then(
        (response) => {
          setLoading(false);
          if (response.data.status === 1) {
            const resData = response.data.data;
            setRequestServices(resData?.categories);
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
    let allServiceType = [...serviceTypes];
    if (isOtherService && otherServiceName) {
      allServiceType.push(otherServiceName);
    }
    const payload = {
      service: serviceName,
      serviceTypes: allServiceType,
      quotationId: quotationId,
      quotationType: quotationType,
    };
    setLoading(true);
    await authAxios()
      .post("/user-service/save", payload)
      .then(
        (response) => {
          setLoading(false);
          if (response.data.status === 1) {
            if (socket.current) {
              socket.current.emit("user_request_service", response.data.data);
            }
            toast.success(response.data.message);
            setOtherService(false);
            setOtherServiceName("");
            setServiceTypes([]);
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
  };

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
          <h1>Services</h1>
        </div>
      </section>
      <section className="servies--portable ">
        <div className="grid--container">
          <div className="grid">
            <div className="grid----">
              <div className="about--portable--wrapper">
                <div className="about--portable--data">
                  <p className="highlight--text" data-aos="fade-up"
                          data-aos-duration="1000">
                    GetLorem ipsum dolor sit amet, consectetuer adipiscing elit,
                    sed diam nonummy nibh euismod tincidunt ut laoreet dolore
                    magna aliquam erat volutpat. Ut wisi enim ad minim
                    veniamGetLorem ipsum dolor sit amet, consectetuer adipiscing
                    elit, sed diam nonummy nibh euismod tincidunt ut laoreet
                    dolore magna aliquam erat volutpat.
                  </p>
                  <p data-aos="fade-up"
                          data-aos-duration="1000">
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
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="services--tabs" data-aos="fade-up"
                          data-aos-duration="1000">
        <div className="grid--container">
          <div className="grid">
            <div className="grid-">
              <div className="servies--list--tab">
                <ul>
                  <li>
                    <Link
                      to={`#`}
                      className={`${
                        quotationType === "construction" ? "active" : ""
                      }`}
                    >
                      Construction
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={`#`}
                      className={`${quotationType === "event" ? "active" : ""}`}
                    >
                      Special Events
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={`#`}
                      className={`${
                        quotationType === "disaster-relief" ? "active" : ""
                      }`}
                    >
                      Disaster Relief
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={`#`}
                      className={`${
                        quotationType === "farm-orchard-winery" ? "active" : ""
                      }`}
                    >
                      Farm Orchard Winery
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={`#`}
                      className={`${
                        quotationType === "personal-or-business" ? "active" : ""
                      }`}
                    >
                      Individual Needs
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="grid---">
              <div className="servies--list--content">
                <div className="services--list--content--item">
                  <p>
                    GetLorem ipsum dolor sit amet, consadaectetuer adipisciaang
                    elit, sed daiam nonummy nibh euismod tincidunt ut laoreet
                    dolore magna aliquam erat volutpat. Ut wisi{" "}
                  </p>
                  <div className="servies--inner--form">
                      <div className="form--group">
                        <label htmlFor="name">Name</label>
                        <input type="text" placeholder="Name" id="name"  />
                      </div>
                      <div className="form--group">
                        <label htmlFor="email">Email</label>
                        <input type="Email" id="email" placeholder="Email" />
                      </div>
                      <div className="form--group get--location">
                        <button type="button" className="btn black--btn">Get Current Location</button>
                        <p>Address Text</p>
                      </div>
                      {/* <div className="form--group iframe--wrapper">
                        <label htmlFor="email">Location</label>
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d158857.83988654095!2d-0.2664029782833932!3d51.528739805082814!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d8a00baf21de75%3A0x52963a5addd52a99!2sLondon%2C%20UK!5e0!3m2!1sen!2sin!4v1687426924908!5m2!1sen!2sin"  style={{border: "0px", width:"100%"}} allowFullScreen  loading="lazy"></iframe>
                      </div> */}
                  </div>
                  <ul className="servies--inner--links">
                    {requestServices &&
                      requestServices.length > 0 &&
                      requestServices.map((item, index) => (
                        <li key={index + 1}>
                          <label htmlFor="Wedding" className="service--label">
                            <input
                              type="checkbox"
                              name={item}
                              value={item}
                              onChange={handleSelectService}
                              checked={serviceTypes.includes(item)}
                            />
                            <span>{item}</span>
                          </label>
                        </li>
                      ))}

                    <li>
                      <label htmlFor="other" className="service--label">
                        <input
                          onChange={toggleOtherService}
                          checked={isOtherService}
                          type="checkbox"
                          id="other"
                          name="other"
                        />
                        <span>Other Service</span>
                      </label>
                    </li>
                  </ul>
                  <div className="service--action">
                    <div className="service--action--wrapper">
                      {isOtherService && (
                        <input
                          type="text"
                          value={otherServiceName}
                          onChange={(
                            event: React.ChangeEvent<HTMLInputElement>
                          ) => setOtherServiceName(event.target.value)}
                          placeholder="Add new service"
                        />
                      )}
                      <button
                        className={
                          isOtherService
                            ? "btn black--btn btn--radius"
                            : "btn black--btn"
                        }
                        type="button"
                        disabled={
                          (serviceTypes.length === 0 && !otherServiceName) ||
                          !quotationId
                        }
                        onClick={handleSubmit}
                      >
                        Submit
                      </button>
                    </div>
                  </div>
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
                <h2 data-aos="fade-up"
                          data-aos-duration="1000">Bold Portable</h2>
                <p data-aos="fade-up"
                          data-aos-duration="1000">
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
                  diam nonummy nibh euismod tincidunt ut laoreet dolore magna
                  aliquam erat volutpat. Ut wisi enim ad minim veniam, Lorem
                  ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
                  nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam
                  erat volutpat. Ut wisi enim ad minim veniam, Lorem ipsum dolor
                  sit amet, consectetuer adipiscing elit.
                </p>
                <p data-aos="fade-up"
                          data-aos-duration="1000">
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
                  <li data-aos="fade-up"
                          data-aos-duration="1000">
                    <div className="we--commited--item">
                      <div className="icons">
                        <img
                          src={require("../asstes/image/Efficiency.png")}
                          alt="Efficiency" loading="lazy"
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
                  <li data-aos="fade-up"
                          data-aos-duration="1000">
                    <div className="we--commited--item">
                      <div className="icons">
                        <img
                          src={require("../asstes/image/Simplicity.png")}
                          alt="Simplicity" loading="lazy"
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
                  <li data-aos="fade-up"
                          data-aos-duration="1000">
                    <div className="we--commited--item">
                      <div className="icons">
                        <img
                          src={require("../asstes/image/Technology.png")}
                          alt="Technology" loading="lazy"
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

export default IsLoadingHOC(Services);
