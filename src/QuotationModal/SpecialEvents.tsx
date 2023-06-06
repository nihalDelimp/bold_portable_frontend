import React, { useRef, useState } from "react";
import { toast } from "react-toastify";
import { authAxios } from "../config/config";
import io, { Socket } from "socket.io-client";
import { usePickTimes } from "../Helper/constants";
import GoogleMaps from "./GoogleMaps";
import { originPoint, originAddress } from "../Helper/constants";
import { validateEmail } from "../Helper";

interface latlngPoint {
  lat: number;
  lng: number;
}

interface eventType {
  eventName: string;
  eventDate: string;
  eventType: string;
  eventLocation: string;
  eventMapLocation: {
    type: string;
    coordinates: number[];
  };
}

interface coordinatorType {
  name: string;
  email: string;
  cellNumber: any;
}

interface vipSectionType {
  payPerUse: boolean;
  fencedOff: boolean;
  activelyCleaned: boolean;
}

interface quotationType {
  maxWorkers: number;
  weeklyHours: number;
  placement_datetime: string;
  placement_location: string;
  distanceFromKelowna: number;
  serviceCharge: number;
  peakUseTimes: boolean;
  peakTimeSlot: string;
  night_use: boolean;
  winter_use: boolean;
  special_requirements: string;
  alcoholServed: boolean;
  maxAttendees: undefined;
  femaleWorkers: number;
  femaleToilet: boolean;
  designatedWorkers: boolean;
  workerTypes: string;
  handwashing: boolean;
  handSanitizerPump: boolean;
  twiceWeeklyService: boolean;
  dateTillUse: string;
  placementAddress: string;
}

function SpecialEvents() {
  const [loading, setLoading] = useState(false);
  const [formStep, setFormStep] = useState<number>(1);

  const socket = useRef<Socket>();
  socket.current = io(`${process.env.REACT_APP_SOCKET}`);

  const [eventDetails, setEventDetails] = useState<eventType>({
    eventName: "",
    eventDate: "",
    eventType: "",
    eventLocation: "",
    eventMapLocation: {
      type: "Point",
      coordinates: [-119.498, 49.876],
    },
  });

  const [coordinator, setCoordinator] = useState<coordinatorType>({
    name: "",
    email: "",
    cellNumber: "",
  });

  const [vipSection, setVipSection] = useState<vipSectionType>({
    payPerUse: true,
    fencedOff: false,
    activelyCleaned: true,
  });

  const [quotation, setQuotation] = useState<quotationType>({
    maxWorkers: 10,
    weeklyHours: 400,
    placement_datetime: "",
    placement_location: "",
    distanceFromKelowna: 0,
    serviceCharge: 0,
    peakUseTimes: false,
    peakTimeSlot: "",
    night_use: false,
    winter_use: false,
    special_requirements: "",
    alcoholServed: false,
    maxAttendees: undefined,
    femaleWorkers: 0,
    femaleToilet: false,
    designatedWorkers: false,
    workerTypes: "male",
    handwashing: false,
    handSanitizerPump: false,
    twiceWeeklyService: false,
    dateTillUse: "",
    placementAddress: "",
  });

  const [placementLocation, setPlacementLocation] = useState({
    type: "Point",
    coordinates: [28.5722234, 7.3228051],
  });

  const [originLocation] = useState({
    type: "Point",
    coordinates: [originPoint.lat, originPoint.lng],
  });

  const handleChangeEventDetails = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEventDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectEventDetails = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
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
    const boolValue = value === "true";
    if (name === "peakTimeSlot") {
      setQuotation((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else {
      setQuotation((prev) => ({
        ...prev,
        [name]: boolValue,
      }));
    }
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

  const handleChangeVipSection = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setVipSection((prev) => ({
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
      weeklyHours: 400,
      placement_datetime: "",
      placement_location: "",
      distanceFromKelowna: 0,
      serviceCharge: 0,
      peakUseTimes: false,
      peakTimeSlot: "",
      night_use: false,
      winter_use: false,
      special_requirements: "",
      alcoholServed: false,
      maxAttendees: undefined,
      femaleWorkers: 0,
      femaleToilet: false,
      designatedWorkers: false,
      workerTypes: "male",
      handwashing: false,
      handSanitizerPump: false,
      twiceWeeklyService: false,
      dateTillUse: "",
      placementAddress : ""
    });
    setEventDetails({
      eventName: "",
      eventDate: "",
      eventType: "",
      eventLocation: "",
      eventMapLocation: {
        type: "Point",
        coordinates: [originPoint.lat, originPoint.lng],
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
      originPoint: originLocation,
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
    if (formStep === 1) {
      const isValid = validateEmail(coordinator.email);
      let validUsername = /^[A-Za-z\s]+$/;
      let validPhone = /^\d{9,12}$/;
      if (!validUsername.test(coordinator.name)) {
        toast.error("Name should only contain letters");
      } else if (!validPhone.test(coordinator.cellNumber)) {
        toast.error("Phone number must be a 9 to 12 digit number");
      } else if (!isValid) {
        toast.error("Invalid email address");
      } else {
        setFormStep((currentStep) => currentStep + 1);
      }
    } else {
      setFormStep((currentStep) => currentStep + 1);
    }
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
          <form>
            {formStep === 1 && (
              <React.Fragment>
                <div className="form--group">
                  <label htmlFor="name">
                    Coordinator Name <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    minLength={3}
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
                  <select
                    name="eventType"
                    onChange={handleSelectEventDetails}
                    value={eventDetails.eventType}
                  >
                    <option value="">Select Event Type</option>
                    <option value="Wedding">Wedding</option>
                    <option value="Function">Function</option>
                    <option value="Comedy">Comedy</option>
                  </select>
                </div>

                <div className="form--group">
                  <label htmlFor="name">
                    Do you need designated workers ?
                    <span className="required"></span>
                  </label>
                  <select
                    name="designatedWorkers"
                    onChange={handleSelectQuotation}
                    value={quotation.designatedWorkers.toString()}
                  >
                    <option value="false">No</option>
                    <option value="true">Yes</option>
                  </select>
                </div>
                {quotation.designatedWorkers && (
                  <div className="form--group">
                    <label htmlFor="name">
                      Worker Types<span className="required"></span>
                    </label>
                    <select
                      name="workerTypes"
                      onChange={handleSelectQuotation}
                      value={quotation.workerTypes}
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                )}
                {quotation.workerTypes === "female" && (
                  <div className="form--group">
                    <label htmlFor="name">
                      How many female worker need ?
                      <span className="required"></span>
                    </label>
                    <input
                      type="number"
                      min={0}
                      required
                      value={quotation.femaleWorkers}
                      onChange={handleChangeQuotation}
                      name="femaleWorkers"
                      placeholder="Female workers"
                    />
                  </div>
                )}
                {quotation.workerTypes === "female" && (
                  <div className="form--group">
                    <label htmlFor="name">
                      Do you need seperate toilet for female ?
                      <span className="required"></span>
                    </label>
                    <select
                      name="femaleToilet"
                      onChange={handleSelectQuotation}
                      value={quotation.femaleToilet.toString()}
                    >
                      <option value="true">Yes</option>
                      <option value="false">No</option>
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
                    Date till use <span className="required">*</span>
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
                    value={quotation.handwashing.toString()}
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
                    value={quotation.handSanitizerPump.toString()}
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
                    value={quotation.twiceWeeklyService.toString()}
                  >
                    <option value="false">No</option>
                    <option value="true">Yes</option>
                  </select>
                </div>
                <div className="form--group">
                  <label htmlFor="name">
                    Use pick time <span className="required"></span>
                  </label>
                  <select
                    name="peakUseTimes"
                    onChange={handleSelectQuotation}
                    value={quotation.peakUseTimes.toString()}
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
                    value={quotation.alcoholServed.toString()}
                  >
                    <option value="false">No</option>
                    <option value="true">Yes</option>
                  </select>
                </div>

                {quotation.peakUseTimes && (
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
                    value={quotation.night_use.toString()}
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
                    value={quotation.winter_use.toString()}
                  >
                    <option value="false">No</option>
                    <option value="true">Yes</option>
                  </select>
                </div>

                <div className="form--group">
                  <label>
                    Special requirements <span className="required"></span>
                  </label>
                  <input
                    type="text"
                    required
                    value={quotation.special_requirements}
                    onChange={handleChangeQuotation}
                    name="special_requirements"
                    placeholder="Requirements"
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

                <div className="form--group">
                  <label htmlFor="name">
                    Pay Per Use<span className="required"></span>
                  </label>
                  <select
                    name="payPerUse"
                    onChange={handleChangeVipSection}
                    value={vipSection.payPerUse.toString()}
                  >
                    <option value="false">No</option>
                    <option value="true">Yes</option>
                  </select>
                </div>

                <div className="form--group">
                  <label htmlFor="name">
                    Actively Cleaned<span className="required"></span>
                  </label>
                  <select
                    name="activelyCleaned"
                    onChange={handleChangeVipSection}
                    value={vipSection.activelyCleaned.toString()}
                  >
                    <option value="false">No</option>
                    <option value="true">Yes</option>
                  </select>
                </div>

                <div className="form--group">
                  <label htmlFor="name">
                    Fenced Off<span className="required"></span>
                  </label>
                  <select
                    name="fencedOff"
                    onChange={handleChangeVipSection}
                    value={vipSection.fencedOff.toString()}
                  >
                    <option value="false">No</option>
                    <option value="true">Yes</option>
                  </select>
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
                    !quotation.placement_datetime ||
                    !quotation.dateTillUse
                  }
                >
                  Next
                </button>
              )}
              {formStep === 3 && (
                <button
                  type="button"
                  onClick={handleNextPage}
                  className="submit--from btn"
                  disabled={!quotation.maxAttendees}
                >
                  Next
                </button>
              )}
            </div>
          </form>

          {formStep === 4 && (
            <div>
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
              <form>
                <div className="form--action">
                  <button
                    type="button"
                    onClick={handlePreviousPage}
                    className="submit--from btn"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleSubmit}
                    type="button"
                    disabled={!quotation.placementAddress}
                    className="submit--from submit--from--action btn"
                  >
                    {loading ? "Loading..." : "Book Now"}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
}

export default SpecialEvents;
