
import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { authAxios } from "../config/config";
import io, { Socket } from "socket.io-client";

function FarmaWinery(props: any) {
  const [loading, setLoading] = useState(false);
  const [formStep, setFormStep] = useState<number>(1);

  const socket = useRef<Socket>();
  socket.current = io(`${process.env.REACT_APP_SOCKET}`);

  const [coordinator, setCoordinator] = useState({
    name: "",
    email: "",
    cellNumber: "",
  });

  const [quotation, setQuotation] = useState({
    useType: "",
    maxWorkers: undefined,
    weeklyHours: undefined,
    placement_datetime: "",
    distanceFromKelowna: undefined,
    serviceCharge: undefined,
    night_use: "true",
    winter_use: "true",
    special_requirements: "",
  });

  const [placementLocation, setPlacementLocation] = useState({
    type: "Point",
    coordinates: [28.5722234, 7.3228051],
  });

  const [originPoint, setOriginPoint] = useState({
    type: "Point",
    coordinates: [28.58482, 77.3091888],
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

  const resetForm = () => {
    setCoordinator({ name: "", email: "", cellNumber: "" });
    setQuotation({
      useType: "",
      maxWorkers: undefined,
      weeklyHours: undefined,
      placement_datetime: "",
      distanceFromKelowna: undefined,
      serviceCharge: undefined,
      night_use: "true",
      winter_use: "true",
      special_requirements: "",
    });
    setFormStep(1);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const payload = {
      coordinator,
      ...quotation,
      placement_location : placementLocation,
      originPoint,
    };
    setLoading(true);
    await authAxios()
      .post("/quotation/create-quotation-for-farm-orchard-winery", payload)
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
      <div className="default--form cat--4">
        <div className="default--form--wrapper">
          <div className="form--title">
            <h3>Create Quotation for Farm, Winery or Orchad</h3>
          </div>
          <form onSubmit={handleSubmit}>
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
                    Use type <span className="required">*</span>
                  </label>
                  <select
                    name="useType"
                    onChange={handleSelectQuotation}
                    value={quotation.useType}
                  >
                    <option value="">Select use type</option>
                    <option value="Farm">Farm</option>
                    <option value="Winery">Winery</option>
                    <option value="Orchad">Orchad</option>
                  </select>
                </div>
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
                    Weekly Hours <span className="required">*</span>
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
                    Placement Date <span className="required">*</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={quotation.placement_datetime}
                    onChange={handleChangeQuotation}
                    name="placement_datetime"
                    placeholder="Select placement date"
                  />
                </div>
                <div className="form--group">
                  <label htmlFor="Email">
                    Distance from kelowna <span className="required">*</span>
                  </label>
                  <input
                    type="number"
                    required
                    value={quotation.distanceFromKelowna}
                    onChange={handleChangeQuotation}
                    name="distanceFromKelowna"
                    placeholder="Enter distance from kelowna"
                  />
                </div>
              </React.Fragment>
            )}
            {formStep === 3 && (
              <React.Fragment>
                <div className="form--group">
                  <label htmlFor="password">
                    Service charge <span className="required">*</span>
                  </label>
                  <input
                    type="number"
                    min={0}
                    required
                    value={quotation.serviceCharge}
                    onChange={handleChangeQuotation}
                    name="serviceCharge"
                    placeholder="Enter service charge"
                  />
                </div>
                <div className="form--radio--option">
                  <div className="radio--option">
                    <input
                      type="radio"
                      name="night_use"
                      value="true"
                      checked={quotation.night_use === "true"}
                      onChange={handleChangeQuotation}
                    />
                    <label htmlFor="vehicle1">Use at night</label>
                  </div>
                  <div className="radio--option">
                    <input
                      type="radio"
                      name="night_use"
                      value="false"
                      checked={quotation.night_use === "false"}
                      onChange={handleChangeQuotation}
                    />
                    <label htmlFor="vehicle2">Not use at night</label>
                  </div>
                </div>
                <div className="form--radio--option">
                  <div className="radio--option">
                    <input
                      type="radio"
                      name="winter_use"
                      value="true"
                      checked={quotation.winter_use === "true"}
                      onChange={handleChangeQuotation}
                    />
                    <label htmlFor="vehicle1">Use in winter</label>
                  </div>
                  <div className="radio--option">
                    <input
                      type="radio"
                      name="winter_use"
                      value="false"
                      checked={quotation.winter_use === "false"}
                      onChange={handleChangeQuotation}
                    />
                    <label htmlFor="vehicle2">Not use in winter</label>
                  </div>
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
                    !quotation.useType
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
                    !quotation.placement_datetime ||
                    !quotation.distanceFromKelowna
                  }
                >
                  Next
                </button>
              )}
              {formStep === 3 && (
                <button
                  type="submit"
                  className="submit--from submit--from--action btn"
                  disabled={
                    !quotation.serviceCharge ||
                    !quotation.special_requirements
                  }
                >
                  {loading ? "Loading..." : "Submit"}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
}

export default FarmaWinery;