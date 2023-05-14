import React, { useRef, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { authAxios } from "../config/config";
import io, { Socket } from "socket.io-client";
import GoogleMaps from "./GoogleMaps";
import { originPoint, originAddress } from "../Helper/constants";

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
  femaleToilet : boolean ,
  designatedWorkers: boolean;
  workerTypes: string;
  handwashing: boolean;
  handSanitizerPump: boolean;
  twiceWeeklyService: boolean;
  dateTillUse: string;
}

interface coordinatorType {
  name : string ,
  email : string ,
  cellNumber : number | string
}

const Construction: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [formStep, setFormStep] = useState<number>(1);

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
    weeklyHours: 400,
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
    femaleToilet : false,
    designatedWorkers: false,
    workerTypes: "male",
    handwashing: false,
    handSanitizerPump: false,
    twiceWeeklyService: false,
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
    const boolValue = value === "true";
    if (name === "workerTypes") {
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
      restrictedAccess: false,
      serviceCharge: 0,
      distanceFromKelowna: 0,
      deliveredPrice: 0,
      useAtNight: false,
      useInWinter: false,
      special_requirements: "",
      placementAddress: "",
      femaleWorkers: 0,
      femaleToilet : false,
      designatedWorkers: false,
      workerTypes: "male",
      handwashing: false,
      handSanitizerPump: false,
      twiceWeeklyService: false,
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
                    value={quotation.useInWinter.toString()}
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
                    value={quotation.useAtNight.toString()}
                  >
                    <option value="false">No</option>
                    <option value="true">Yes</option>
                  </select>
                </div>

                <div className="form--group">
                  <label htmlFor="name">
                  Do you need designated workers ?<span className="required"></span>
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
                     How many female worker need ?<span className="required"></span>
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
                    Do you need seperate toilet for female ?<span className="required"></span>
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
                    value={quotation.restrictedAccess.toString()}
                  >
                    <option value="false">No</option>
                    <option value="true">Yes</option>
                  </select>
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
                  <label>
                    Special requirement <span className="required"></span>
                  </label>
                  <input
                    type="text"
                    required
                    value={quotation.special_requirements}
                    onChange={handleChangeQuotation}
                    name="special_requirements"
                    placeholder="Special requirement"
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
                    !quotation.dateTillUse 
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
    </React.Fragment>
  );
};

export default Construction;
