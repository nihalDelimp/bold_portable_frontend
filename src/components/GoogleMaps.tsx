import React, { useState, useRef, useEffect } from "react";
import {
  useJsApiLoader,
  GoogleMap,
  MarkerF,
  Autocomplete,
} from "@react-google-maps/api";
import IsLoadingHOC from "../Common/IsLoadingHOC";
import { Link } from "react-router-dom";
import {originPoint} from '../Helper/constants'

const mapContainerStyle = { width: "100%", height: "600px" };
const libraries : any[] = ["places"]

const GoogleMaps = (props: any) => {
  const { setLoading } = props;
  const [latLng, setCurrentLatLng] = useState({ lat: 0, lng: 0 });
  const [map, setMap] = useState(null);
  const autocompleteRef = useRef<any>(null);
  const [isMount , setMount] =  useState(false)

  
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: `${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`,
    libraries: libraries,
  });

  var options = {
    enableHighAccuracy: true,
    timeout: 1000,
    maximumAge: 0,
  };

  const successCallback = function () {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          const location = { lat, lng };
          setCurrentLatLng(location);
          if(isMount){
            getAddressFromLatLng(lat, lng);
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
     // setLoading(true);
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
  //  getCurrentLocation();
   // setMount(!isMount)
  }, []);

  function handleLoad(maps: any) {
    setMap(maps);
  }

  async function onPlaceChanged() {
    if (autocompleteRef?.current?.value === "") {
      return;
    }

    const geocoder = new google.maps.Geocoder();
    console.log("geocoder", geocoder);
    geocoder.geocode(
      { address: autocompleteRef?.current?.value },
      function (results: any, status: any) {
        if (status === google.maps.GeocoderStatus.OK) {
          let latitude = results[0].geometry.location.lat();
          let longitude = results[0].geometry.location.lng();
          const location = { lat: latitude, lng: longitude };
          setCurrentLatLng(location);
          // dispatch(saveCurrentLatLng(location))
          // dispatch(saveAddress(autocompleteRef.current.value))
        } else {
          alert(
            "Geocode was not successful for the following reason: " + status
          );
        }
      }
    );
  }

  const getAddressFromLatLng = (lat: number, lng: number) => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode(
      { location: { lat, lng } },
      (results: any, status: any) => {
        if (status === "OK") {
          if (results[0]) {
            if (autocompleteRef.current) {
              autocompleteRef.current.value = results[0].formatted_address;
              geocoder.geocode({ address: autocompleteRef?.current?.value });
              console.log(results[0].formatted_address);
            }
          } else {
            console.log("No results found");
          }
        } else {
          console.log("Geocoder failed due to: " + status);
        }
      }
    );
  };

  function handleDragEnd(e: any) {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    getAddressFromLatLng(lat, lng);
  }



  return (
    <section className="form--services">
      <div className="grid">
        <div className="p--0 grid----">
          <div className="grid--wrapper">
            <div className="map--wrapper">
              {isLoaded && originPoint && originPoint.lat && originPoint.lng && (
                <GoogleMap
                  center={originPoint}
                  zoom={15}
                  mapContainerStyle={mapContainerStyle}
                  onLoad={handleLoad}
                >
                  <MarkerF
                    draggable
                    onDragEnd={handleDragEnd}
                    position={originPoint}
                  />
                  <Autocomplete onPlaceChanged={onPlaceChanged}>
                    <div className="from--wrapper">
                      <div className="from--tabs">
                        <ul data-aos="fade-up" data-aos-duration="1000">
                          <li className="active--form--tab">
                            <div className="tabs--item">
                              <div className="icon">
                                <img
                                  src={
                                    require("../asstes/image/house--1.svg")
                                      .default
                                  }
                                  alt="" loading="lazy"
                                />
                              </div>
                              <h4>Residential Services</h4>
                            </div>
                          </li>
                          <li>
                            <div className="tabs--item">
                              <div className="icon">
                                <img
                                  src={
                                    require("../asstes/image/house--1.svg")
                                      .default
                                  }
                                  alt="" loading="lazy"
                                />
                              </div>
                              <h4>Business Services</h4>
                            </div>
                          </li>
                        </ul>
                      </div>
                      <div className="from--tabs--content">
                        <div
                          className="form--group"
                          data-aos="fade-up"
                          data-aos-duration="1000"
                        >
                          <input
                            type="search"
                            placeholder="Enter location"
                            ref={autocompleteRef}
                          />
                          <div className="btn btn--submit">
                            <button type="button">Search</button>
                          </div>
                        </div>
                        <div
                          className="current--location"
                          data-aos="fade-up"
                          data-aos-duration="1000"
                        >
                          <span className="icon">
                            <img
                              src={
                                require("../asstes/image/house--1.svg").default
                              }
                              alt="location" loading="lazy"
                            />
                          </span>
                          <h5>Use my current location</h5>
                        </div>
                        <div className="location--buttons">
                          <Link to={`#`} className="btn" data-aos="fade-up"
                          data-aos-duration="1000">Get Now</Link>
                        </div>
                      </div>
                    </div>
                  </Autocomplete>
                </GoogleMap>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IsLoadingHOC(GoogleMaps);
