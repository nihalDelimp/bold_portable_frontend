import React, { useRef, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { authAxios } from "../config/config";
import { toast } from "react-toastify";
import IsLoadingHOC from "../Common/IsLoadingHOC";
import io, { Socket } from "socket.io-client";
import { useJsApiLoader, GoogleMap, MarkerF } from "@react-google-maps/api";
import {
  maxUserEmailLength,
  maxUserNameLength,
  maxUserPhoneLength,
  minUserEmailLength,
  minUserNameLength,
  minUserPhoneLength,
} from "../Constants";
import { acceptedFileTypes, originPoint } from "../Helper/constants";

interface MyComponentProps {
  setLoading: (isComponentLoading: boolean) => void;
  isLoading: boolean;
}

const libraries: any[] = ["places"];
const mapContainerStyle = { width: "100%", height: "490px" };

function Services(props: MyComponentProps) {
  const { setLoading } = props;
  const {id} = useParams()
  const navigate = useNavigate();
  const [requestServices, setRequestServices] = useState<any[]>([]);
  const [isOtherService, setOtherService] = useState<boolean>(false);
  const [otherServiceName, setOtherServiceName] = useState<string>("");
  const [serviceTypes, setServiceTypes] = useState<string[]>([]);
  const [quotationId, setquotationId] = useState<string | null>("");
  const [quotationType, setquotationType] = useState<any>("");
  const [qrId, setQrId] = useState<any>("");
  const [serviceName, setServiceName] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");
  const [userPhone, setUserPhone] = useState<string>("");
  const [userAddress, setUserAddress] = useState<string>("");
  const [isMount, setMount] = useState(false);

  const [currentLatLng, setCurrentLatLng] = useState<any[]>([]);
  const [selectedImages, setSelectedImages] = useState<any>([]);
  const [currentLocation, setCurrentLocation] = useState(originPoint);
  const [map, setMap] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const socket = useRef<Socket>();
  socket.current = io(`${process.env.REACT_APP_SOCKET}`);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: `${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`,
    libraries: libraries,
  });

  const getAddressFromLatLng = (lat: number, lng: number) => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode(
      { location: { lat, lng } },
      (results: any, status: any) => {
        if (status === "OK") {
          if (results[0]) {
            let currentAddress = results[0]?.formatted_address;
            geocoder.geocode({ address: results[0]?.formatted_address });
            setUserAddress(currentAddress);
          } else {
            console.log("No results found");
          }
        } else {
          console.log("Geocoder failed due to: " + status);
        }
      }
    );
  };

  var options = {
    enableHighAccuracy: true,
    timeout: 1000,
    maximumAge: 0,
  };

  const successCallback = function () {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          setCurrentLatLng([latitude, longitude]);
          if (isMount) {
            getAddressFromLatLng(latitude, longitude);
            setCurrentLocation({ lat: latitude, lng: longitude });
          }
          setLoading(false);
        }
      );
    }
  };

  function errorCallback(error: any) {
    setLoading(false);
    switch (error.code) {
      case error.PERMISSION_DENIED:
        alert("User denied the request for Geolocation.");
        break;
      case error.POSITION_UNAVAILABLE:
        alert("Location information is unavailable.");
        break;
      case error.TIMEOUT:
        alert("The request to get user location timed out.");
        break;
      case error.UNKNOWN_ERROR:
        alert("An unknown error occurred.");
        break;
      default:
        alert("Unknown error");
    }
  }

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        successCallback,
        errorCallback,
        options
      );
    } else {
      alert("Geolocation is not supported by your browser");
    }
  };

  useEffect(() => {
    setMount(!isMount);
    return () => {
      socket.current?.disconnect();
    };
  }, []);

  useEffect(() => {
    getServiceDetailsData();
  }, []);

  const getServiceDetailsData = async () => {
    setLoading(true);
    await authAxios()
      .get(`/inventory/get-deatils-by-qr_code_value/${id}`)
      .then(
        (response) => {
          setLoading(false);
          if (response.data.status === 1) {
            const resData = response.data.data;
            if(resData.quote_id===null || resData.quote_type===null){
              toast.error("Sorry, please assign this QR Code with Active Quotation");
            }else{
              setShowModal(true);
              setquotationId(resData?.quote_id.toString());
              setquotationType(resData.quote_type?.toLowerCase().toString());
              setServiceName(resData.quote_type?.toString());
              setQrId(resData._id)
            }
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

  const handleChangePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const sanitizedValue = value.replace(/[^0-9-+]/g, ""); // Remove non-numeric, non-hyphen, and non-plus characters
    if (sanitizedValue.match(/^\+?[0-9-]*$/)) {
      setUserPhone(sanitizedValue);
    }
  };

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) {
      return;
    } else if (files.length > 3) {
      toast.error("Maximum three files are allowed");
    } else {
      setSelectedImages(Array.from(files));
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

  const handleModalClose = () => {
    setShowSuccessPopup(false);
  };

  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

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
      qrId:qrId,
      name: userName?.trim(),
      email: userEmail?.trim(),
      phone: userPhone?.trim(),
    };
    let validUsername = /^[A-Za-z\s]+$/;
    if (!payload.name) {
      toast.error("Name is required!");
    } else if (!validUsername.test(payload.name)) {
      toast.error("Name should only contain letters");
    } else if (payload.serviceTypes.length === 0) {
      toast.error("No service request found!");
    } else if (!quotationId) {
      toast.error("Quotation ID is not found!");
    } else {
      setLoading(true);
      const serviceData = payload;
      const formData = new FormData();
      console.log(selectedImages[0]);
      selectedImages.map((file: any) => {
        formData.append(`service_image`, file);
      });
      serviceData.serviceTypes.map((service_type: any) => {
        formData.append(`serviceTypes`, service_type);
      });
      formData.append("service", payload.service);
      if (payload.quotationId !== null) {
        formData.append("quotationId", payload.quotationId);
      }
      if (payload.quotationType !== null) {
        formData.append("quotationType", payload.quotationType);
      }
      if (payload.qrId !== null) {
        formData.append("qrId", payload.qrId);
      }
      formData.append("name", payload.name);
      formData.append("email", payload.email);
      formData.append("phone", payload.phone);
     
      await authAxios()
        .post("/user-service/save", formData)
        .then(
          (response) => {
            setLoading(false);
            if (response.data.status === 1) {
              if (socket.current) {
                socket.current.emit("user_request_service", response.data.data);
              }
              // toast.success(response.data.message);
              setShowSuccessPopup(true);
              setOtherService(false);
              setOtherServiceName("");
              setServiceTypes([]);
              setUserName("");
              setUserEmail("");
              setUserPhone("");
              setSelectedImages([]);
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

  function handleLoad(maps: any) {
    setMap(maps);
  }

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
          <h1>Services</h1>
        </div>
      </section>
      {/* <section className="servies--portable ">
        <div className="grid--container">
          <div className="grid">
            <div className="grid----">
              <div className="about--portable--wrapper">
                <div className="about--portable--data">
                  <p
                    className="highlight--text"
                    data-aos="fade-up"
                    data-aos-duration="1000"
                  >
                    GetLorem ipsum dolor sit amet, consectetuer adipiscing elit,
                    sed diam nonummy nibh euismod tincidunt ut laoreet dolore
                    magna aliquam erat volutpat. Ut wisi enim ad minim
                    veniamGetLorem ipsum dolor sit amet, consectetuer adipiscing
                    elit, sed diam nonummy nibh euismod tincidunt ut laoreet
                    dolore magna aliquam erat volutpat.
                  </p>
                  <p data-aos="fade-up" data-aos-duration="1000">
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
      </section> */}
      <section
        className="services--tabs servies--portable"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        <div className="grid--container">
          <div className="grid">
            {/* <div className="grid-">
              <div className="servies--list--tab">
                <ul>
                  <li>
                    <a
                      className={`${
                        quotationType === "construction" ? "active" : ""
                      }`}
                    >
                      Construction
                    </a>
                  </li>
                  <li>
                    <a
                      className={`${quotationType === "event" ? "active" : ""}`}
                    >
                      Special Events
                    </a>
                  </li>
                  <li>
                    <a
                      className={`${
                        quotationType === "disaster-relief" ? "active" : ""
                      }`}
                    >
                      Disaster Relief
                    </a>
                  </li>
                  <li>
                    <a
                      className={`${
                        quotationType === "farm-orchard-winery" ? "active" : ""
                      }`}
                    >
                      Farm Orchard Winery
                    </a>
                  </li>
                  <li>
                    <a
                      className={`${
                        quotationType === "personal-or-business" ? "active" : ""
                      }`}
                    >
                      Individual Needs
                    </a>
                  </li>
                </ul>
              </div>
            </div> */}
            <div className="grid----">
              <div className="servies--list--content">
                <div className="services--list--content--item">
                  <form onSubmit={handleSubmit}>
                    <p>
                      Please give us information about your service request.{" "}
                    </p>
                    <div className="servies--inner--form--wrapper">
                      <div className="servies--inner--form">
                        <div className="form--group">
                          <label htmlFor="name">Your Name *</label>
                          <input
                            type="text"
                            required
                            maxLength={maxUserNameLength}
                            placeholder="Your Name"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            id="userName"
                            name="userName"
                          />
                        </div>
                        <div className="form--group">
                          <label htmlFor="email">Your Email *</label>
                          <input
                            type="Email"
                            id="email"
                            required
                            name="userEmail"
                            maxLength={maxUserEmailLength}
                            value={userEmail}
                            onChange={(e) => setUserEmail(e.target.value)}
                            placeholder="Your Email"
                          />
                        </div>
                        <div className="form--group">
                          <label htmlFor="phone">Your Phone Number *</label>
                          <input
                            type="text"
                            required
                            minLength={minUserPhoneLength}
                            maxLength={maxUserPhoneLength}
                            id="userPhone"
                            value={userPhone}
                            placeholder="Your Phone Number"
                            name="userPhone"
                            onChange={handleChangePhone}
                          />
                        </div>
                        <div className="form--group">
                          <label htmlFor="service-iamge">
                            Please upload a few images of the unit that needs to be serviced. *
                          </label>
                          <input
                            type="file"
                            required
                            multiple
                            id="service_image"
                            name="service_image"
                            placeholder="upload image"
                            accept={acceptedFileTypes}
                            onChange={handleChangeImage}
                          />
                        </div>
                        {/* <div className="form--group get--location">
                          <label htmlFor="service-iamge">
                            Please give us the location of the unit by clicking the button below to get the current location of
                            your phone, or by selecting the location on the map.
                          </label>
                          <button
                            type="button"
                            className="btn black--btn"
                            onClick={getCurrentLocation}
                          >
                            Get Current Location
                          </button>
                          <p>{userAddress}</p>
                        </div> */}
                      </div>
                      {/* <div className="service--map">
                        {isLoaded &&
                          currentLocation &&
                          currentLocation.lat &&
                          currentLocation.lng && (
                            <GoogleMap
                              center={currentLocation}
                              zoom={15}
                              mapContainerStyle={mapContainerStyle}
                              onLoad={handleLoad}
                            >
                              <MarkerF position={currentLocation} />
                            </GoogleMap>
                          )}
                      </div> */}
                    </div>

                    {quotationId && (
                      <ul className="servies--inner--links">
                        {requestServices &&
                          requestServices.length > 0 &&
                          requestServices.map((item, index) => (
                            <li key={index + 1}>
                              <label
                                htmlFor="Wedding"
                                className="service--label"
                              >
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
                    )}

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
                          type="submit"
                          disabled={!quotationId}
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <section className="we--committed">
        <div className="grid--container">
          <div className="grid">
            <div className="grid--">
              <div className="we--commited--data">
                <h2 data-aos="fade-up" data-aos-duration="1000">
                  Simple Easy online booking
                </h2>
                <p data-aos="fade-up" data-aos-duration="1000">
                  go to our website, scan a QR code on our truck or our toilet
                  and get the booking process done! Simple, Easy!
                </p>
              </div>
              <div className="we--commited--data">
                <h2 data-aos="fade-up" data-aos-duration="1000">
                  QR code enabled
                </h2>
                <p data-aos="fade-up" data-aos-duration="1000">
                  need service, maintenance, or leave us a review? Just scan the
                  QR code on our units and we step into action. We get instant
                  notification of your booking or service request and we step
                  into action!. Simple, Easy!
                </p>
              </div>

              <div className="we--commited--data">
                <h2 data-aos="fade-up" data-aos-duration="1000">
                  Committed to Service
                </h2>
                <p data-aos="fade-up" data-aos-duration="1000">
                  We’re using technology to make sure our service is second to
                  none. We value quality, cleanliness, simplicity and efficiency
                  in communication.
                </p>
                <p data-aos="fade-up" data-aos-duration="1000">
                  We’re using technology to make your booking and service
                  request experience simple, efficient, and second to none.
                </p>
              </div>

              <div className="we--commited--data">
                <h2 data-aos="fade-up" data-aos-duration="1000">
                  Online Customer Portal
                </h2>
                <p data-aos="fade-up" data-aos-duration="1000">
                  Manage your contracts through our uniquely designed customer portal
                </p>
              </div>

            </div>
            <div className="grid--">
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
      </section> */}
      <section
        className={`default--popup user--action--popup ${showModal ? "active--popup" : ""
          }  `}
      >
        <div className="default--popup--wrapper">
          <div className="user--action--datta">
            <ul>
              <li>
                <h3>Do you want to rent site or service again?</h3>
                <div className="request--service--btn">
                  <a
                    onClick={() => navigate("/")}
                    href="#best--describes"
                    id="process--book--now"
                  >
                    <button type="button" className="btn">
                      Rent site
                    </button>
                  </a>
                  <button
                    onClick={() => setShowModal(false)}
                    type="button"
                    className="btn"
                  >
                    Request service
                  </button>
                </div>
              </li>
            </ul>
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
export default IsLoadingHOC(Services);
