import React, { useState } from "react";
import { toast } from "react-toastify";
import { authAxios } from "../config/config";

function SpecialEvents() {
  const [loading, setLoading] = useState(false);
  const [formStep, setFormStep] = useState<number>(1);

  const [eventDetails, setEventDetails] = useState({
    eventName: "",
    eventDate: "",
    eventType: "",
    eventLocation: "",
    eventMapLocation: {
      type: "Point",
      coordinates: [-119.498, 49.876],
    },
  });

  const [coordinator, setCoordinator] = useState({
    name: "",
    email: "",
    cellNumber: "",
  });

  const [quotation, setQuotation] = useState({
    maxWorkers: undefined,
    weeklyHours: undefined,
    placement_datetime: "",
    placement_location: "",
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

  const handleChangeEventDetails = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEventDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

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

  const resetForm = () => {
    setCoordinator({ name: "", email: "", cellNumber: "" });
    setQuotation({
      maxWorkers: undefined,
      weeklyHours: undefined,
      placement_datetime: "",
      placement_location: "",
      distanceFromKelowna: undefined,
      serviceCharge: undefined,
      night_use: "true",
      winter_use: "true",
      special_requirements: "",
    });
    setEventDetails({
      eventName: "",
      eventDate: "",
      eventType: "",
      eventLocation: "",
      eventMapLocation: {
        type: "Point",
        coordinates: [119.498, 49.876],
      },
    });
    setFormStep(1);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const payload = {
      eventDetails,
      coordinator,
      ...quotation,
      placementLocation,
      originPoint,
    };
    setLoading(true);
    await authAxios()
      .post("/quotation/create-quotation-for-event", payload)
      .then(
        (response) => {
          setLoading(false);
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
      <div className="default--form cat--2">
        <div className="default--form--wrapper">
          <div className="form--title">
            <h3>Create Quotation for special events</h3>
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
                    Event Name <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={eventDetails.eventName}
                    onChange={handleChangeEventDetails}
                    name="eventName"
                    placeholder="Enter event name"
                  />
                </div>
                <div className="form--group">
                  <label htmlFor="name">
                    Event Date<span className="required">*</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={eventDetails.eventDate}
                    onChange={handleChangeEventDetails}
                    name="eventDate"
                    placeholder="Select event date"
                  />
                </div>
                <div className="form--group">
                  <label htmlFor="name">
                    Event Type<span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={eventDetails.eventType}
                    onChange={handleChangeEventDetails}
                    name="eventType"
                    placeholder="Enter event type"
                  />
                </div>
              </React.Fragment>
            )}

            {formStep === 2 && (
              <React.Fragment>
                <div className="form--group">
                  <label htmlFor="name">
                    Event Location<span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={eventDetails.eventLocation}
                    onChange={handleChangeEventDetails}
                    name="eventLocation"
                    placeholder="Enter event location"
                  />
                </div>
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
                    placeholder="Enetr special requirements"
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
                    !eventDetails.eventName ||
                    !eventDetails.eventDate ||
                    !eventDetails.eventType
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
                    !eventDetails.eventLocation ||
                    !quotation.maxWorkers ||
                    !quotation.weeklyHours ||
                    !quotation.distanceFromKelowna ||
                    !quotation.placement_datetime
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
                    !quotation.serviceCharge || !quotation.special_requirements
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

export default SpecialEvents;


