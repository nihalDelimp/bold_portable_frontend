import React, { useRef, useState } from "react";
import { toast } from "react-toastify";
import { authAxios } from "../config/config";
import io, { Socket } from "socket.io-client";
import { usePickTimes } from "../Helper/constants";
import GoogleMaps from "./GoogleMaps";
import { originPoint, originAddress } from "../Helper/constants";
import { trimObjValues, validateEmail } from "../Helper";

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
  placementDate: string;
  distanceFromKelowna: number;
  serviceCharge: number;
  peakUseTimes: boolean;
  peakTimeSlot: string;
  useAtNight: boolean;
  useInWinter: boolean;
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
  maleWorkers: number;
  totalWorkers: number;
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
    placementDate: "",
    distanceFromKelowna: 0,
    serviceCharge: 0,
    peakUseTimes: false,
    peakTimeSlot: "",
    useAtNight: false,
    useInWinter: false,
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
    maleWorkers: 0,
    totalWorkers:0
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

  const handleChangePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const sanitizedValue = value.replace(/[^0-9-+]/g, ""); // Remove non-numeric, non-hyphen, and non-plus characters
    if (sanitizedValue.match(/^\+?[0-9-]*$/)) {
      setCoordinator((prev) => ({
        ...prev,
        [name]: sanitizedValue,
      }));
    }
  };

  const handleSelectQuotation = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    const boolValue = value === "true";
    
    if (name === "workerTypes" || name === "useType") {
      setQuotation((prev) => ({
        ...prev,
        [name]: value,
        maleWorkers: 0, // Reset maleWorkers
        femaleWorkers: 0, // Reset femaleWorkers
        totalWorkers: 0, // Reset totalWorkers
      }));
    } else {
      setQuotation((prev) => ({
        ...prev,
        [name]: boolValue,
        workerTypes: '', // Reset workerTypes
        maleWorkers: 0, // Reset maleWorkers
        femaleWorkers: 0, // Reset femaleWorkers
        femaleToilet: false, // Reset femaleToilet
        totalWorkers: 0, // Reset totalWorkers
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
      placementDate: "",
      distanceFromKelowna: 0,
      serviceCharge: 0,
      peakUseTimes: false,
      peakTimeSlot: "",
      useAtNight: false,
      useInWinter: false,
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
      maleWorkers: 0,
      totalWorkers:0
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
      const payload = trimObjValues(coordinator);
      const isValid = validateEmail(payload.email);
      let validUsername = /^[A-Za-z\s]+$/;
      if (payload.name.length < 5) {
        toast.error("Name must be at least 5 characters long");
      } else if (!validUsername.test(payload.name)) {
        toast.error("Name should only contain letters");
      } else if (payload.cellNumber.length < 9) {
        toast.error("Phone number must be at least 9 digit");
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
                    Project Manager Name <span className="required">*</span>
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
                    Project Manager Email <span className="required">*</span>
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
                    Project Manager Phone<span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    min={0}
                    required
                    value={coordinator.cellNumber}
                    onChange={handleChangePhone}
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
                    <option value="">Select event type</option>
                    <option value="Wedding">Wedding</option>
                    <option value="Event Evening">Event Evening</option>
                    <option value="Lorem Ispum">Lorem Ispum</option>
                    <option value="Doller Sit">Doller Sit</option>
                  </select>
                </div>
                <div className="form--group">
                  <label htmlFor="name">
                    Many special events site offering gender specifics toilets,
                    would you like to offer this ?
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
                      <option selected disabled value="">Select</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="both">Both</option>
                    </select>
                  </div>
                )}
                
                
                {quotation.workerTypes === "male" || quotation.workerTypes === "both" ? (
                <div className="form--group">
                  <label htmlFor="name">
                    How many male workers do you need?
                    <span className="required"></span>
                  </label>
                  <input
                    type="number"
                    min={0}
                    required
                    value={quotation.maleWorkers}
                    onChange={handleChangeQuotation}
                    name="maleWorkers"
                    placeholder="Male workers"
                  />
                </div>
              ) : null}

              {quotation.workerTypes === "female" || quotation.workerTypes === "both" ? (
                <div className="form--group">
                  <label htmlFor="name">
                    How many female workers do you need?
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
              ) : null}

              {quotation.workerTypes === "female" || quotation.workerTypes === "both" ? (
                <div className="form--group">
                  <label htmlFor="name">
                    Do you need a separate toilet for female workers?
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
              ) : null}


              {quotation.workerTypes === "female" || quotation.workerTypes === "male" || quotation.workerTypes === "both" ? (
                <div className="form--group">
                <label htmlFor="name">Total Workers</label>
                <input
                  type="text"
                  name="totalWorkers"
                  value={Number(quotation.maleWorkers) + Number(quotation.femaleWorkers)}
                  readOnly
                />
              </div>
              ) : null}

              </React.Fragment>
            )}

            {formStep === 2 && (
              <React.Fragment>
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
                    value={quotation.placementDate}
                    onChange={handleChangeQuotation}
                    name="placementDate"
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
                    min={quotation.placementDate ? quotation.placementDate : new Date().toISOString().split("T")[0]}
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
                    name="useAtNight"
                    onChange={handleSelectQuotation}
                    value={quotation.useAtNight.toString()}
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
                    name="useInWinter"
                    onChange={handleSelectQuotation}
                    value={quotation.useInWinter.toString()}
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
                    !quotation.placementDate ||
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
