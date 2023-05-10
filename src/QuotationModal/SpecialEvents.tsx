import React, { useRef, useState } from "react";
import { toast } from "react-toastify";
import { authAxios } from "../config/config";
import io, { Socket } from "socket.io-client";
import { usePickTimes } from "../Helper/constants";

function SpecialEvents() {
  const [loading, setLoading] = useState(false);
  const [formStep, setFormStep] = useState<number>(1);

  const socket = useRef<Socket>();
  socket.current = io(`${process.env.REACT_APP_SOCKET}`);

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

  const [vipSection, setVipSection] = useState({
    payPerUse: true,
    fencedOff: false,
    activelyCleaned: true,
  });

  const [quotation, setQuotation] = useState({
    maxWorkers: undefined,
    weeklyHours: undefined,
    placement_datetime: "",
    placement_location: "",
    distanceFromKelowna: undefined,
    serviceCharge: undefined,
    peakUseTimes: "true",
    peakTimeSlot: "",
    night_use: "true",
    winter_use: "true",
    special_requirements: "",
    alcoholServed: "false",
    maxAttendees: undefined,
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

  const handleSelectQuotation = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setQuotation((prev) => ({
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

  const handleChangeVipSection = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    const is_checked = e.target.checked;
    console.log("name", name, "checked", is_checked);
    if (is_checked) {
      setVipSection((prev) => ({
        ...prev,
        [name]: true,
      }));
    } else {
      setVipSection((prev) => ({
        ...prev,
        [name]: false,
      }));
    }
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
      peakUseTimes: "true",
      peakTimeSlot: "",
      night_use: "true",
      winter_use: "true",
      special_requirements: "",
      alcoholServed: "false",
      maxAttendees: undefined,
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
      vipSection,
    };
    setLoading(true);
    await authAxios()
      .post("/quotation/create-quotation-for-event", payload)
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
                    placeholder="Enter name"
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
                    placeholder="Enter email"
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
                    placeholder="Enter phone"
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
                    Event Date <span className="required">*</span>
                  </label>
                  <input
                    type="date"
                    min={new Date().toISOString().split("T")[0]}
                    required
                    value={eventDetails.eventDate}
                    onChange={handleChangeEventDetails}
                    name="eventDate"
                    placeholder="Select event date"
                  />
                </div>
                <div className="form--group">
                  <label htmlFor="name">
                    Event Type <span className="required">*</span>
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
                    Placement Date <span className="required"> *</span>
                  </label>
                  <input
                    type="date"
                    required
                    min={new Date().toISOString().split("T")[0]}
                    value={quotation.placement_datetime}
                    onChange={handleChangeQuotation}
                    name="placement_datetime"
                    placeholder="Select placement date"
                  />
                </div>
                <div className="form--group">
                  <label htmlFor="name">
                    Use pick time <span className="required"></span>
                  </label>
                  <select
                    name="peakUseTimes"
                    onChange={handleSelectQuotation}
                    value={quotation.peakUseTimes}
                  >
                    <option value="false">No</option>
                    <option value="true">Yes</option>
                  </select>
                </div>

                <div className="form--group">
                  <label htmlFor="name">
                    Alcohol served<span className="required"></span>
                  </label>
                  <select
                    name="alcoholServed"
                    onChange={handleSelectQuotation}
                    value={quotation.alcoholServed}
                  >
                    <option value="false">No</option>
                    <option value="true">Yes</option>
                  </select>
                </div>

                {quotation.peakUseTimes === "true" && (
                  <div className="form--group">
                    <label htmlFor="name">
                      Pick time slot <span className="required"> *</span>
                    </label>
                    <select
                      name="peakTimeSlot"
                      onChange={handleSelectQuotation}
                      value={quotation.peakTimeSlot}
                    >
                      <option value="">Select Time</option>
                      {usePickTimes.map((item) => (
                        <option value={item}>{item}</option>
                      ))}
                    </select>
                  </div>
                )}
              </React.Fragment>
            )}

            {formStep === 3 && (
              <React.Fragment>
                <div className="form--group">
                  <label htmlFor="name">
                    Use at night<span className="required"></span>
                  </label>
                  <select
                    name="night_use"
                    onChange={handleSelectQuotation}
                    value={quotation.night_use}
                  >
                    <option value="false">No</option>
                    <option value="true">Yes</option>
                  </select>
                </div>

                <div className="form--group">
                  <label htmlFor="name">
                    Use in winter<span className="required"></span>
                  </label>
                  <select
                    name="winter_use"
                    onChange={handleSelectQuotation}
                    value={quotation.winter_use}
                  >
                    <option value="false">No</option>
                    <option value="true">Yes</option>
                  </select>
                </div>

                <div className="form--group">
                  <label>
                    Special requirements <span className="required"> *</span>
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

                <div className="form--group">
                  <label>
                    Max Attendees <span className="required">*</span>
                  </label>
                  <input
                    type="number"
                    required
                    min={0}
                    value={quotation.maxAttendees}
                    onChange={handleChangeQuotation}
                    name="maxAttendees"
                    placeholder="Enetr max attendees"
                  />
                </div>

                <div className="form--checkbox--option">
                  <div className="checkbox--option">
                    <input
                      type="checkbox"
                      onChange={handleChangeVipSection}
                      checked={vipSection.payPerUse}
                      id="payPerUse"
                      name="payPerUse"
                    />
                    <label htmlFor="vehicle1"> Pay Per Use</label>
                  </div>
                  <div className="checkbox--option">
                    <input
                      type="checkbox"
                      checked={vipSection.activelyCleaned}
                      onChange={handleChangeVipSection}
                      id="activelyCleaned"
                      name="activelyCleaned"
                    />
                    <label htmlFor="vehicle1"> Actively Cleaned </label>
                  </div>
                  <div className="checkbox--option">
                    <input
                      type="checkbox"
                      checked={vipSection.fencedOff}
                      onChange={handleChangeVipSection}
                      id="fencedOff"
                      name="fencedOff"
                    />

                    <label htmlFor="vehicle2">Fenced Off</label>
                  </div>
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
                    !quotation.maxWorkers ||
                    !quotation.weeklyHours ||
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
                  disabled={!quotation.special_requirements || !quotation.maxAttendees}
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
