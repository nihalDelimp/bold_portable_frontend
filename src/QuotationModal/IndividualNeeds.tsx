import React, { useRef, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { authAxios } from "../config/config";
import io, { Socket } from "socket.io-client";
import GoogleMaps from "./GoogleMaps";
import { originPoint, originAddress } from "../Helper/constants";
import { trimObjValues, validateEmail } from "../Helper";
import DateSelector from "./DateSelector";
import moment from "moment";

interface latlngPoint {
  lat: number;
  lng: number;
}

interface quotationType {
  maxWorkers: number;
  weeklyHours: number;
  placementDate: string;
  restrictedAccess: boolean;
  serviceCharge: number;
  distanceFromKelowna: number;
  deliveredPrice: number;
  useAtNight: boolean;
  useInWinter: boolean;
  special_requirements: string;
  placementAddress: string;
  femaleWorkers: number;
  femaleToilet: boolean;
  designatedWorkers: boolean;
  workerTypes: string;
  handwashing: boolean;
  handSanitizerPump: boolean;
  twiceWeeklyService: boolean;
  dateTillUse: string;
  useType: string;
  maleWorkers: number;
  totalWorkers: number;
  productTypes: string;
  restrictedAccessDescription : string
}

interface coordinatorType {
  name: string;
  email: string;
  cellNumber: any;
}

const IndividualNeeds: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [formStep, setFormStep] = useState<number>(1);
  const [placementDate, setPlacementDate] = useState<Date | null>(null);
  const [pickupDate, setPickupDate] = useState<Date | null>(null);

  const socket = useRef<Socket>();
  socket.current = io(`${process.env.REACT_APP_SOCKET}`);

  useEffect(() => {
    return () => {
      socket.current?.disconnect();
    };
  }, []);

  const [coordinator, setCoordinator] = useState<coordinatorType>({
    name: "",
    email: "",
    cellNumber: "",
  });

  const [quotation, setQuotation] = useState<quotationType>({
    maxWorkers: 10,
    weeklyHours: 40,
    placementDate: "",
    restrictedAccess: false,
    serviceCharge: 0,
    distanceFromKelowna: 0,
    deliveredPrice: 0,
    useAtNight: false,
    useInWinter: false,
    special_requirements: "",
    placementAddress: "",
    femaleWorkers: 0,
    femaleToilet: false,
    designatedWorkers: false,
    workerTypes: "male",
    handwashing: false,
    handSanitizerPump: false,
    twiceWeeklyService: false,
    dateTillUse: "",
    useType: "",
    maleWorkers: 0,
    totalWorkers: 0,
    productTypes: "standard",
    restrictedAccessDescription : ''
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

  const handleChangePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
  
    // Remove any characters that are not digits or hyphens
    const sanitizedValue = value.replace(/[^0-9-]/g, "");
  
    // Use a regular expression to format the phone number as "000-000-0000"
    const formattedValue = sanitizedValue
      .slice(0, 12) // Limit the length to 12 characters (000-000-0000)
      .replace(/(\d{3})(\d{3})/, '$1-$2-'); // Format as 000-000-0000
  
    if (formattedValue.match(/^\+?[0-9-]*$/)) {
      setCoordinator((prev) => ({
        ...prev,
        [name]: formattedValue,
      }));
    }
  };

  const handleChangeQuotation = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setQuotation((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const changePlacementDate = (date: Date | null) => {
    setPlacementDate(date);
    const formatDate = date ? moment(date).format("YYYY-MM-DD") : "";
    setQuotation((prev) => ({
      ...prev,
      placementDate: formatDate,
    }));
  };

  const changePickupDate = (date: Date | null) => {
    setPickupDate(date);
    const formatDate = date ? moment(date).format("YYYY-MM-DD") : "";
    setQuotation((prev) => ({
      ...prev,
      dateTillUse: formatDate,
    }));
  }

  const handleSelectQuotation = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    const boolValue = value === "true";

    if (name === "workerTypes" && value !== quotation.workerTypes) {
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
      }));
    }
  };

  const handleChangeUseType = (e: React.ChangeEvent<HTMLSelectElement>) => {
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
      restrictedAccess: false,
      serviceCharge: 0,
      distanceFromKelowna: 0,
      deliveredPrice: 0,
      useAtNight: false,
      useInWinter: false,
      special_requirements: "",
      placementAddress: "",
      femaleWorkers: 0,
      femaleToilet: false,
      designatedWorkers: false,
      workerTypes: "male",
      handwashing: false,
      handSanitizerPump: false,
      twiceWeeklyService: false,
      dateTillUse: "",
      useType: "",
      maleWorkers: 0,
      totalWorkers: 0,
      productTypes: "standard",
      restrictedAccessDescription :''
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
      .post("/quotation/create-quotation-for-personal-business-site", payload)
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
            document
              .querySelectorAll(".default--popup .default--form")
              .forEach(function (item) {
                item?.classList.remove("active--from");
              });
          } else {
            toast.error(response.data.message);
          }
        },
        (error) => {
          setLoading(false);
          if (error.response.status === 401) {
            console.log("Not authorizesd");
          }
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
      if (!validUsername.test(payload.name)) {
        toast.error("Name should only contain letters");
      } else if (payload.cellNumber.length < 7) {
        toast.error("Phone number must be at least 7 digit");
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

  const handleChangeProductionType = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setQuotation((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <React.Fragment>
      <div className="default--form cat--5">
        <div className="default--form--wrapper">
          <div className="form--title">
            <h3>Create Quotation For Individual Needs</h3>
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
                <div className="form--group defualt--phone">
                  <label htmlFor="name">
                    Project Manager Phone <span className="required">*</span>
                  </label>
                  <span className="phone--set">+1</span>
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
                    Placement Date <span className="required">*</span>
                  </label>
                  <DateSelector
                    selectedDate={placementDate}
                    handleDateChange={changePlacementDate}
                    minDate={new Date()}
                  />
                </div>
                <div className="form--group">
                  <label htmlFor="name">
                    Will the unit be used during winter (Nov-Mar)?<span className="required"></span>
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
                  <label htmlFor="name">
                    Do you require inside lighting for night use?<span className="required"></span>
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
                    Many construction sites are offering gender specific
                    toilets. Would you like to offer this as well?
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
                    Worker Gender (Male/Female/Both)<span className="required"></span>
                    </label>
                    <select
                      name="workerTypes"
                      onChange={handleSelectQuotation}
                      value={quotation.workerTypes}
                    >
                      <option selected disabled value="">
                        Select
                      </option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="both">Both</option>
                    </select>
                  </div>
                )}

                {quotation.workerTypes === "male" ||
                  quotation.workerTypes === "both" ? (
                  <div className="form--group">
                    <label htmlFor="name">
                      How many male workers will be on site?
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

                {quotation.designatedWorkers === true && (quotation.workerTypes === "female" || quotation.workerTypes === "both") ? (
                  <div className="form--group">
                    <label htmlFor="name">
                      How many female workers will be on site?
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

                {quotation.designatedWorkers === true && (quotation.workerTypes === "female" || quotation.workerTypes === "both") ? (
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

                {quotation.workerTypes === "female" ||
                  quotation.workerTypes === "male" ||
                  quotation.workerTypes === "both" ? (
                    <div className={`form--group ${quotation.designatedWorkers === false || (quotation.designatedWorkers === true && quotation.workerTypes === "female") ? 'right--active--total' : ''}`}>
                      <div className="total_div">
                      <label htmlFor="name">Total Workers</label>
                      <input
                        type="text"
                        name="totalWorkers"
                        value={
                          Number(quotation.maleWorkers) +
                          Number(quotation.femaleWorkers)
                        }
                        readOnly
                      />
                    </div>
                  </div>
                ) : null}
              </React.Fragment>
            )}
            {formStep === 2 && (
              <React.Fragment>
                <div className="form--group">
                  <label htmlFor="name">
                    What are the average hours for each worker per week?{" "}
                    <span className="required">*</span>
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
                    In regards to delivery or service, is there restricted access to the site? <span className="required"></span>
                  </label>
                  <select
                    name="restrictedAccess"
                    onChange={handleSelectQuotation}
                    value={quotation.restrictedAccess.toString()}
                  >
                    <option value="false">No</option>
                    <option value="true">Yes</option>
                  </select>
                </div>
                <div className="form--group">
                  <label htmlFor="name">
                    What date should the unit(s) be picked up? <span className="required">*</span>
                  </label>
                  <DateSelector
                    selectedDate={pickupDate}
                    handleDateChange={changePickupDate}
                    minDate={placementDate || new Date()}
                  />
                </div>
                {quotation.restrictedAccess && (
                  <div className="form--group">
                    <label>
                    Please give us details on how to access the restricted site. <span className="required"></span>
                    </label>
                    <input
                      type="text"
                      required
                      value={quotation.restrictedAccessDescription}
                      onChange={handleChangeQuotation}
                      name="restrictedAccessDescription"
                      placeholder="Restricted access details"
                    />
                  </div>
                )}
                {/* <div className="form--group">
                  <label htmlFor="name">
                    Would you like to ad handwashing sink ($50)<span className="required"></span>
                  </label>
                  <select
                    name="handwashing"
                    onChange={handleSelectQuotation}
                    value={quotation.handwashing.toString()}
                  >
                    <option value="false">No</option>
                    <option value="true">Yes</option>
                  </select>
                </div> */}
                <div className="form--group">
                  <label htmlFor="name">
                    Units come standard with a hand sanitizer pump. Would you like to upgrade to a handwashing
                    sink inside the unit(s)?<span className="required"></span>
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
                    Standard service of unit(s) is once per week. To ensure a higher level of cleanliness, would you
                    like twice weekly service? <span className="required"></span>
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
                    Use Type <span className="required">*</span>
                  </label>
                  <select
                    name="useType"
                    onChange={handleChangeUseType}
                    value={quotation.useType}
                  >
                    <option value="">Select use type</option>
                    <option value="Personal">Personal</option>
                    <option value="Business">Business Purposes</option>
                  </select>
                </div>
                <div className="form--group">
                  <label htmlFor="name">
                  What type of Unit/s would you like?<span className="required"></span>
                  </label>
                  <select
                    name="productTypes"
                    onChange={handleChangeProductionType}
                    value={quotation.productTypes}
                  >
                    <option value="standard">Standard</option>
                    <option value="standard With Sink">
                      Standard With Sink
                    </option>
                    <option value="wheel Chair Accessible">
                      Wheel Chair Accessible
                    </option>
                    <option value="high rise capable">High Rise Capable</option>
                  </select>
                </div>
                <div className="form--group">
                  <label>
                    Special Requirements <span className="required"></span>
                  </label>
                  <input
                    type="text"
                    value={quotation.special_requirements}
                    onChange={handleChangeQuotation}
                    name="special_requirements"
                    placeholder="Special requirements"
                  />
                </div>
              </React.Fragment>
            )}

            <div className="form--action">
              {formStep === 2 && (
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
                    !quotation.dateTillUse
                  }
                >
                  Next
                </button>
              )}
            </div>
          </form>
          {formStep === 3 && (
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
};

export default IndividualNeeds;
