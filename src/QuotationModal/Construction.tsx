import React, { useRef, useState } from "react";
import { toast } from "react-toastify";
import { authAxios } from "../config/config";
import io, { Socket } from "socket.io-client";
import GoogleMaps from "./GoogleMaps";
import SessionOutModal from "../Common/SessionOutModal";
import { originPoint, originAddress } from "../Helper/constants";

interface latlngPoint {
  lat: number;
  lng: number;
}

function Construction() {
  const [loading, setLoading] = useState(false);
  const [formStep, setFormStep] = useState<number>(1);
  const [sessionOut, setSessionOut] = useState<boolean>(false);

  const socket = useRef<Socket>();
  socket.current = io(`${process.env.REACT_APP_SOCKET}`);

  const [coordinator, setCoordinator] = useState({
    name: "",
    email: "",
    cellNumber: "",
  });

  const [quotation, setQuotation] = useState({
    maxWorkers: 10,
    weeklyHours: 40,
    placementDate: "",
    restrictedAccess: "true",
    serviceCharge: undefined,
    distanceFromKelowna: 0,
    deliveredPrice: 0,
    useAtNight: "true",
    useInWinter: "true",
    special_requirements: "",
    placementAddress: "",

    designatedWorkers: "false",
    workerTypes: "male",
    handwashing: "true",
    handSanitizerPump: "false",
    twiceWeeklyService: "true",
    dateTillUse: "",
  });

  const [placementLocation, setPlacementLocation] = useState({
    type: "Point",
    coordinates: [28.5722234, 7.3228051],
  });

  const [originLocation] = useState({
    type: "Point",
    coordinates: [originPoint.lat, originPoint.lng],
  });

  const handleChangeCoordinator = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCoordinator((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChangeQuotation = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log("Radiobutton Value Access", typeof value);
    console.log("Radiobutton name Access", name);

    setQuotation((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectQuotation = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setQuotation((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const distanceCallBack = (distance: number) => {
    setQuotation((prev) => ({
      ...prev,
      distanceFromKelowna: distance,
    }));
  };

  const placementLocationCallBack = (destination: latlngPoint) => {
    setPlacementLocation((prev) => ({
      ...prev,
      coordinates: [destination.lat, destination.lng],
    }));
  };

  const placementAddressCallBack = (address: string) => {
    setQuotation((prev) => ({
      ...prev,
      placementAddress: address,
    }));
  };

  const resetForm = () => {
    setCoordinator({ name: "", email: "", cellNumber: "" });
    setQuotation({
      maxWorkers: 10,
      weeklyHours: 40,
      placementDate: "",
      restrictedAccess: "true",
      distanceFromKelowna: 0,
      serviceCharge: undefined,
      deliveredPrice: 0,
      useAtNight: "true",
      useInWinter: "true",
      special_requirements: "",
      placementAddress: "",

      designatedWorkers: "false",
      workerTypes: "male",
      handwashing: "true",
      handSanitizerPump: "false",
      twiceWeeklyService: "true",
      dateTillUse: "",
    });
    setFormStep(1);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const payload = {
      coordinator,
      ...quotation,
      placementLocation,
      originPoint: originLocation,
    };
    setLoading(true);
    await authAxios()
      .post("/quotation/create-quotation-for-construction", payload)
      .then(
        (response) => {
          setLoading(false);
          if (socket.current) {
            socket.current.emit("new_quote", response.data.data);
          }
          if (response.data.status === 1) {
            toast.success(response.data.message);
            resetForm();
            document
              .querySelector(".default--popup")
              ?.classList.remove("active--popup");
          } else {
            toast.error(response.data.message);
          }
        },
        (error) => {
          setLoading(false);
          if (error.response.status === 401) {
            setSessionOut(true);
          }
          toast.error(error.response.data.message);
        }
      )
      .catch((error) => {
        console.log("errorrrr", error);
      });
  };

  const handleNextPage = () => {
    setFormStep((currentStep) => currentStep + 1);
  };

  const handlePreviousPage = () => {
    setFormStep((currentStep) => currentStep - 1);
  };

  return (
    <React.Fragment>
      <div className="default--form cat--1">
        <div className="default--form--wrapper">
          <div className="form--title">
            <h3>Create Quotation for Construction</h3>
          </div>
          <form
            style={{ display: formStep === 3 ? "block" : "grid" }}
            onSubmit={handleSubmit}
          >
            {formStep === 1 && (
              <React.Fragment>
                <div className="form--group">
                  <label htmlFor="name">
                    Coordinator Name <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={coordinator.name}
                    onChange={handleChangeCoordinator}
                    name="name"
                    placeholder="Enter coordinator name"
                  />
                </div>
                <div className="form--group">
                  <label htmlFor="name">
                    Coordinator Email <span className="required">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={coordinator.email}
                    onChange={handleChangeCoordinator}
                    name="email"
                    placeholder="Enter coordinator email"
                  />
                </div>
                <div className="form--group">
                  <label htmlFor="name">
                    Coordinator Cell number <span className="required">*</span>
                  </label>
                  <input
                    type="number"
                    min={0}
                    required
                    value={coordinator.cellNumber}
                    onChange={handleChangeCoordinator}
                    name="cellNumber"
                    placeholder="Enter coordinator cell number"
                  />
                </div>
                <div className="form--group">
                  <label htmlFor="name">
                    Placement Date <span className="required">*</span>
                  </label>
                  <input
                    type="date"
                    required
                    min={new Date().toISOString().split("T")[0]}
                    value={quotation.placementDate}
                    onChange={handleChangeQuotation}
                    name="placementDate"
                    placeholder="Select placement date"
                  />
                </div>
                <div className="form--group">
                  <label htmlFor="name">
                    Use in winter<span className="required"></span>
                  </label>
                  <select
                    name="useInWinter"
                    onChange={handleSelectQuotation}
                    value={quotation.useInWinter}
                  >
                    <option value="false">No</option>
                    <option value="true">Yes</option>
                  </select>
                </div>

                <div className="form--group">
                  <label htmlFor="name">
                    Use at night<span className="required"></span>
                  </label>
                  <select
                    name="useAtNight"
                    onChange={handleSelectQuotation}
                    value={quotation.useAtNight}
                  >
                    <option value="false">No</option>
                    <option value="true">Yes</option>
                  </select>
                </div>

                <div className="form--group">
                  <label htmlFor="name">
                    Designated Workers<span className="required"></span>
                  </label>
                  <select
                    name="designatedWorkers"
                    onChange={handleSelectQuotation}
                    value={quotation.designatedWorkers}
                  >
                    <option value="false">No</option>
                    <option value="true">Yes</option>
                  </select>
                </div>

                {quotation.designatedWorkers === "true" && (
                  <div className="form--group">
                    <label htmlFor="name">
                      Worker Types<span className="required"></span>
                    </label>
                    <select
                      name="workerTypes"
                      onChange={handleSelectQuotation}
                      value={quotation.workerTypes}
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                )}
              </React.Fragment>
            )}

            {formStep === 2 && (
              <React.Fragment>
                <div className="form--group">
                  <label htmlFor="name">
                    Max workers <span className="required">*</span>
                  </label>
                  <input
                    type="number"
                    min={0}
                    required
                    value={quotation.maxWorkers}
                    onChange={handleChangeQuotation}
                    name="maxWorkers"
                    placeholder="Enter max workers"
                  />
                </div>
                <div className="form--group">
                  <label htmlFor="name">
                    Weekly hours <span className="required">*</span>
                  </label>
                  <input
                    type="number"
                    min={0}
                    required
                    value={quotation.weeklyHours}
                    onChange={handleChangeQuotation}
                    name="weeklyHours"
                    placeholder="Enter weekly hours"
                  />
                </div>
                <div className="form--group">
                  <label htmlFor="name">
                    Restricted access <span className="required"></span>
                  </label>
                  <select
                    name="restrictedAccess"
                    onChange={handleSelectQuotation}
                    value={quotation.restrictedAccess}
                  >
                    <option value="false">No</option>
                    <option value="true">Yes</option>
                  </select>
                </div>
                <div className="form--group">
                  <label htmlFor="name">
                  Date till use<span className="required">*</span>
                  </label>
                  <input
                    type="date"
                    required
                    min={new Date().toISOString().split("T")[0]}
                    value={quotation.dateTillUse}
                    onChange={handleChangeQuotation}
                    name="dateTillUse"
                    placeholder="Select date till use"
                  />
                </div>

                <div className="form--group">
                  <label htmlFor="name">
                  Hand washing<span className="required"></span>
                  </label>
                  <select
                    name="handwashing"
                    onChange={handleSelectQuotation}
                    value={quotation.handwashing}
                  >
                    <option value="false">No</option>
                    <option value="true">Yes</option>
                  </select>
                </div>

                <div className="form--group">
                  <label htmlFor="name">
                  Hand sanitizer pump<span className="required"></span>
                  </label>
                  <select
                    name="handSanitizerPump"
                    onChange={handleSelectQuotation}
                    value={quotation.handSanitizerPump}
                  >
                    <option value="false">No</option>
                    <option value="true">Yes</option>
                  </select>
                </div>

                <div className="form--group">
                  <label htmlFor="name">
                  Twice weekly service<span className="required"></span>
                  </label>
                  <select
                    name="twiceWeeklyService"
                    onChange={handleSelectQuotation}
                    value={quotation.twiceWeeklyService}
                  >
                    <option value="false">No</option>
                    <option value="true">Yes</option>
                  </select>
                </div>
                <div className="form--group">
                  <label>
                    Special requirements <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={quotation.special_requirements}
                    onChange={handleChangeQuotation}
                    name="special_requirements"
                    placeholder="Enter special requirements"
                  />
                </div>

              </React.Fragment>
            )}
            {formStep === 3 && (
              <div className="google--map">
                <label>
                  Placement Location <span className="required">*</span>
                </label>
                <GoogleMaps
                  distanceCallBack={distanceCallBack}
                  placementLocationCallBack={placementLocationCallBack}
                  placementAddressCallBack={placementAddressCallBack}
                />
              </div>
            )}
            <div className="form--action">
              {(formStep === 2 || formStep === 3) && (
                <button
                  type="button"
                  onClick={handlePreviousPage}
                  className="submit--from btn"
                >
                  Back
                </button>
              )}
              {formStep === 1 && (
                <button
                  type="button"
                  onClick={handleNextPage}
                  className="submit--from btn"
                  disabled={
                    !coordinator.name ||
                    !coordinator.email ||
                    !coordinator.cellNumber ||
                    !quotation.placementDate
                  }
                >
                  Next
                </button>
              )}
              {formStep === 2 && (
                <button
                  type="button"
                  onClick={handleNextPage}
                  className="submit--from btn"
                  disabled={
                    !quotation.maxWorkers ||
                    !quotation.weeklyHours ||
                    !quotation.special_requirements
                  }
                >
                  Next
                </button>
              )}
              {formStep === 3 && (
                <button
                  type="submit"
                  className="submit--from submit--from--action btn"
                >
                  {loading ? "Loading..." : "Submit"}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
      {sessionOut && <SessionOutModal />}
    </React.Fragment>
  );
}

export default Construction;
