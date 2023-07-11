import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { authAxios } from "../config/config";
import { toast } from "react-toastify";
import IsLoadingHOC from "../Common/IsLoadingHOC";
import io, { Socket } from "socket.io-client";
import {
  useJsApiLoader,
  GoogleMap,
  MarkerF,
  Autocomplete,
} from "@react-google-maps/api";
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
const mapContainerStyle = { width: "100%", height: "600px" };

function Services(props: MyComponentProps) {
  const { setLoading } = props;
  const [requestServices, setRequestServices] = useState<any[]>([]);
  const [isOtherService, setOtherService] = useState<boolean>(false);
  const [otherServiceName, setOtherServiceName] = useState<string>("");
  const [serviceTypes, setServiceTypes] = useState<string[]>([]);
  const [quotationId, setquotationId] = useState<string | null>("");
  const [quotationType, setquotationType] = useState<any>("");
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
            console.log("CurrentAddrssByTTTTTT", results[0].formatted_address);
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
    // Get the URL parameters
    const params = new URLSearchParams(window.location.search);
    const quotation_Id = params.get("quotationId");
    const quotation_Type = params.get("quotationType");
    if (quotation_Id) {
      setquotationId(quotation_Id.toString());
    }
    if (quotation_Type) {
      setServiceName(quotation_Type.toString());
      setquotationType(quotation_Type?.toLowerCase().toString());
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
      name: userName?.trim(),
      email: userEmail?.trim(),
      phone: userPhone?.trim(),
      address: userAddress?.trim(),
      coordinates: {
        type: "Point",
        coordinates: currentLatLng,
      },
    };
    let validUsername = /^[A-Za-z\s]+$/;
    if (!payload.name) {
      toast.error("Name is required!");
    } else if (payload.name.length < 5) {
      toast.error("Name must be at least 5 characters long!");
    } else if (!validUsername.test(payload.name)) {
      toast.error("Name should only contain letters");
    } else if (!payload.address) {
      toast.error("Current address is not found!");
    } else if (currentLatLng.length === 0) {
      toast.error("Current location is not found!");
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
      formData.append("name", payload.name);
      formData.append("email", payload.email);
      formData.append("phone", payload.phone);
      formData.append("address", payload.address);
      formData.append("coordinates[type]", "Point");
      formData.append("coordinates[coordinates][0]", currentLatLng[0]);
      formData.append("coordinates[coordinates][1]", currentLatLng[1]);
      await authAxios()
        .post("/user-service/save", formData)
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
    }
  };

  const [modal, setModal] = useState(false);
  useEffect(() => {
    //  setModal(true);
  }, []);

  const handleAction = () => {
    setModal(false);
  };

  function handleLoad(maps: any) {
    setMap(maps);
  }

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
      <section className="servies--portable ">
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
      </section>
      <section
        className="services--tabs"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        <div className="grid--container">
          <div className="grid">
            <div className="grid-">
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
            </div>
            <div className="grid---">
              <div className="servies--list--content">
                <div className="services--list--content--item">
                  <form onSubmit={handleSubmit}>
                    <p>
                      GetLorem ipsum dolor sit amet, consadaectetuer
                      adipisciaang elit, sed daiam nonummy nibh euismod
                      tincidunt ut laoreet dolore magna aliquam erat volutpat.
                      Ut wisi{" "}
                    </p>
                    <div className="servies--inner--form--wrapper">
                      <div className="servies--inner--form">
                        <div className="form--group">
                          <label htmlFor="name">Name</label>
                          <input
                            type="text"
                            required
                            minLength={minUserNameLength}
                            maxLength={maxUserNameLength}
                            placeholder="Name"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            id="userName"
                            name="userName"
                          />
                        </div>
                        <div className="form--group">
                          <label htmlFor="email">Email</label>
                          <input
                            type="Email"
                            id="email"
                            required
                            name="userEmail"
                            minLength={minUserEmailLength}
                            maxLength={maxUserEmailLength}
                            value={userEmail}
                            onChange={(e) => setUserEmail(e.target.value)}
                            placeholder="Email"
                          />
                        </div>
                        <div className="form--group">
                          <label htmlFor="phone">Phone</label>
                          <input
                            type="text"
                            required
                            minLength={minUserPhoneLength}
                            maxLength={maxUserPhoneLength}
                            id="userPhone"
                            value={userPhone}
                            placeholder="Phone"
                            name="userPhone"
                            onChange={handleChangePhone}
                          />
                        </div>
                        <div className="form--group">
                          <label htmlFor="service-iamge">Service image</label>
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
                        <div className="form--group get--location">
                          <button
                            type="button"
                            className="btn black--btn"
                            onClick={getCurrentLocation}
                          >
                            Get Current Location
                          </button>
                          <p>{userAddress}</p>
                        </div>
                      </div>
                      <div className="service--map">
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
                      </div>
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
      <section className="we--committed">
        <div className="grid--container">
          <div className="grid">
            <div className="grid--">
              <div className="we--commited--data">
                <h2 data-aos="fade-up" data-aos-duration="1000">
                  Bold Portable
                </h2>
                <p data-aos="fade-up" data-aos-duration="1000">
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
                  diam nonummy nibh euismod tincidunt ut laoreet dolore magna
                  aliquam erat volutpat. Ut wisi enim ad minim veniam, Lorem
                  ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
                  nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam
                  erat volutpat. Ut wisi enim ad minim veniam, Lorem ipsum dolor
                  sit amet, consectetuer adipiscing elit.
                </p>
                <p data-aos="fade-up" data-aos-duration="1000">
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
      </section>
      <section
        className={`default--popup user--action--popup ${
          modal ? "active--popup" : ""
        }  `}
      >
        <div className="default--popup--wrapper">
          <div className="user--action--datta">
            <h2>Title</h2>
            <ul>
              <li>
                <h3>Your session has expired. Please sign in again</h3>
                <p>Your session has expired.</p>
                <button onClick={handleAction} type="button" className="btn">
                  yes
                </button>
              </li>
              <li>
                <h3>Your session has expired. Please sign in again</h3>
                <p>Your session has expired.</p>
                <button onClick={handleAction} type="button" className="btn">
                  No
                </button>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
export default IsLoadingHOC(Services);
