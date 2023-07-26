import React, { useState, useRef, useEffect } from "react";
import {
  useJsApiLoader,
  GoogleMap,
  MarkerF,
  Autocomplete,
} from "@react-google-maps/api";
import IsLoadingHOC from "./IsLoadingHOC";
import { authAxios } from "../config/config";
// import io, { Socket } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "../Redux/rootReducer";
import { toast } from "react-toastify";
import { removeAllItems } from "../Redux/Reducers/productSlice";
import { useNavigate } from "react-router-dom";




function GoogleMapModal(props) {
  const { mapModal, closeModal } = props
  const { cart } = useSelector((state) => state.product);
  const { user } = useSelector((state) => state.auth);
  const dispetch = useDispatch();
  const navigate = useNavigate();

  // const socket = useRef();

  const { setLoading, isLoading } = props
  const [latLng, setCurrentLatLng] = useState(null)
  const [map, setMap] = useState(null);
  const autocompleteRef = useRef();

  const [mapLoading, setMaptLoading] = useState(false)


  // socket.current = io(`${process.env.REACT_APP_SOCKET}`);

  // useEffect(() => {
  //   return () => {
  //     socket.current?.disconnect();
  //   };
  // }, []);

  var options = {
    enableHighAccuracy: true,
    timeout: 1000,
    maximumAge: 0,
  };

  const successCallback = function (position) {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const location = { lat: position.coords.latitude, lng: position.coords.longitude };
        setCurrentLatLng(location)
        setMaptLoading(false);
      });
    }
  };


  function errorCallback(error) {
    setMaptLoading(false);
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

  useEffect(() => {
    if (navigator.geolocation) {
      setMaptLoading(true)
      navigator.geolocation.getCurrentPosition(
        successCallback,
        errorCallback,
        options
      );
    } else {
      alert("Geolocation is not supported by your browser");
    }
  }, []);

  const { isLoaded } = useJsApiLoader(
    {
      googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
      libraries: ["places"],
    },
    []
  );

  function handleLoad(maps) {
    setMap(maps);
  }


  async function onPlaceChanged(place) {
    if (autocompleteRef.current.value === "") {
      return;
    }
    // eslint-disable-next-line no-undef
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode(
      { address: autocompleteRef.current.value },
      function (results, status) {
        // eslint-disable-next-line no-undef
        if (status === google.maps.GeocoderStatus.OK) {
          let latitude = results[0].geometry.location.lat();
          let longitude = results[0].geometry.location.lng();
          const location = { lat: latitude, lng: longitude };
          setCurrentLatLng(location)
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

  function handleDragEnd(e) {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: { lat, lng } }, (results, status) => {
      if (status === 'OK') {
        if (results[0]) {
          autocompleteRef.current.value = results[0].formatted_address
          geocoder.geocode({ address: autocompleteRef.current.value })
          setCurrentLatLng({ lat, lng })
        } else {
          console.log('No results found');
        }
      } else {
        console.log('Geocoder failed due to: ' + status);
      }
    });
  }

  const mapContainerStyle = { width: "100%", height: "300px" };
  console.log('latLng', latLng)


  const placeOrder = async () => {
    const payLoad = {
      userId: user._id,
      products: [],
      address: autocompleteRef.current.value,
      location: latLng
    };
    cart.forEach((item) => {
      payLoad.products.push({
        productId: item._id,
        product_quantity: item.product_quantity,
        product_price: item.product_price,
      });
    });

    setMaptLoading(true);
    await authAxios()
      .post(`/order/create-order`, payLoad)
      .then(
        (response) => {
          setMaptLoading(false);
          if (response.data.status === 1) {

            // if (socket.current) {
            //   socket.current.emit("new_order", response.data.data);
            // }

            toast.success(response.data?.message);
            dispetch(removeAllItems());
            closeModal()
            navigate('/')
          } else {
            toast.error(response.data?.message);
          }
        },
        (error) => {
          setMaptLoading(false);
          toast.error(error.response.data?.message);
        }
      )
      .catch((error) => {
        console.log("errorrrr", error);
      });
  };



  return (
    <div>
      <div
        id="myModal"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="myModalLabel"
        className={`modal fade ${mapModal ? "show" : "hide"}`}
        style={{ display: mapModal ? "block" : "none" , bottom : '-700px' }}
      >
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Save Your location
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={closeModal}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="row mx-0">
                <div className="col-md-12 modal_body_content">
                  <p>Please share your location to complete an order</p>
                </div>
              </div>
              <div className="row mx-0">
                <div className="col-md-12 modal_body_map">
                  <div className="location-map" id="location-map">
                    <div className="track-maps-content">
                      {isLoaded && latLng && latLng.lat && latLng.lng && (
                        <GoogleMap
                          center={latLng}
                          zoom={14}
                          mapContainerStyle={mapContainerStyle}
                          onLoad={handleLoad}
                          options={{
                            zoomControl: false,
                            streetViewControl: false,
                            mapTypeControl: false,
                            fullscreenControl: false,
                          }}
                        >
                          <MarkerF
                            draggable
                            onDragEnd={handleDragEnd}
                            position={latLng} />
                          <Autocomplete onPlaceChanged={(place) => onPlaceChanged(place)}>
                            <section className="content mt-5  pl-4">
                              <div className="row">
                                <div className="mx-auto col-12 col-lg-12">
                                  <div className="form-group">
                                    <input
                                      style={{ borderRadius: "2.25rem", height: "2.5rem" }}
                                      className="form-control"
                                      ref={autocompleteRef}
                                      type="search"
                                      placeholder="Search"
                                    />
                                    {/* <div className="col-auto">
                                                <button className="btn btn-lg" type="submit">
                                                    <i className="bi-search"></i>
                                                </button>
                                            </div> */}
                                  </div>
                                </div>
                              </div>
                            </section>
                          </Autocomplete>
                        </GoogleMap>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12 modal_body_end">
                  <div className="modal-footer border-top-0 d-flex justify-content-between">
                    <button
                      style={{ backgroundColor: "#8d99ae" }}
                      onClick={() => closeModal()}
                      type="button"
                      className="btn btn-secondary"
                      data-dismiss="modal"
                    >
                      Close
                    </button>
                    <button
                      style={{ backgroundColor: "#2b2d42" }}
                      disabled={isLoading}
                      type="button"
                      onClick={placeOrder}
                      className="btn btn-success btn-sm"
                    >
                      {isLoading || mapLoading ? "Loading..." : "Confirm Order"}

                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IsLoadingHOC(GoogleMapModal);
