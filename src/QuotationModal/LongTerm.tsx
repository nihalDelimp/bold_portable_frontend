
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { authAxios } from "../config/config";

function LongTerm(props: any) {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const [coordinator, setCoordinator] = useState({
    name: "",
    email: "",
    cellNumber: "",
  });

  const [quotation, setQuotation] = useState({
    maxWorkers: undefined,
    weeklyHours: undefined,
    placementDate: "",
    restrictedAccess: "true",
    distanceFromKelowna: undefined,
    serviceCharge: undefined,
    deliveredPrice: undefined,
    useAtNight: "true",
    useInWinter: "true",
    specialRequirements: "",
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
    console.log("Radiobutton Value Access", typeof value);
    console.log("Radiobutton name Access", name);

    setQuotation((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const payload = {
      coordinator,
      ...quotation,
      placementLocation,
      originPoint,
    };
    setLoading(true);
    await authAxios()
      .post("/quotation/create-quotation-for-construction", payload)
      .then(
        (response) => {
          setLoading(false);
          if (response.data.status === 1) {
            toast.success(response.data.message);
            console.log("resposnse Data", response.data.data);
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

  return (
    <React.Fragment>
          <div className="default--form cat--4">
            <div className="default--form--wrapper">
              <div className="form--title">
                <h2>Create Quotation for Long Term</h2>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="form--group">
                  <label htmlFor="name">
                    Name <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={coordinator.name}
                    onChange={handleChangeCoordinator}
                    name="name"
                    placeholder="Name"
                  />
                </div>
                <div className="form--group">
                  <label htmlFor="name">
                    Email <span className="required">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={coordinator.email}
                    onChange={handleChangeCoordinator}
                    name="email"
                    placeholder="Email"
                  />
                </div>
                <div className="form--group">
                  <label htmlFor="name">
                    Cell number <span className="required">*</span>
                  </label>
                  <input
                    type="number"
                    required
                    value={coordinator.cellNumber}
                    onChange={handleChangeCoordinator}
                    name="cellNumber"
                    placeholder="Cell number"
                  />
                </div>
                {/* <div className="form--group">
                            <label htmlFor="name">Select <span className="required">*</span></label>
                            <select name="" id="">
                                <option value="">item1</option>
                                <option value="">item1</option>
                                <option value="">item1</option>
                            </select>
                        </div> */}
                <div className="form--group">
                  <label htmlFor="name">
                    Max workers <span className="required">*</span>
                  </label>
                  <input
                    type="number"
                    required
                    value={quotation.maxWorkers}
                    onChange={handleChangeQuotation}
                    name="maxWorkers"
                    placeholder="Max workers"
                  />
                </div>
                <div className="form--group">
                  <label htmlFor="name">
                    Weekly Hours <span className="required">*</span>
                  </label>
                  <input
                    type="number"
                    required
                    value={quotation.weeklyHours}
                    onChange={handleChangeQuotation}
                    name="weeklyHours"
                    placeholder="weekly hours"
                  />
                </div>
                <div className="form--group">
                  <label htmlFor="name">
                    Placement Date <span className="required">*</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={quotation.placementDate}
                    onChange={handleChangeQuotation}
                    name="placementDate"
                    placeholder="placement date"
                  />
                </div>
                <div className="form--radio--option">
                  <div className="radio--option">
                    <input
                      type="radio"
                      name="restrictedAccess"
                      value="true"
                      checked={quotation.restrictedAccess === "true"}
                      onChange={handleChangeQuotation}
                    />
                    <label htmlFor="vehicle1">Restricted Access</label>
                  </div>
                  <div className="radio--option">
                    <input
                      type="radio"
                      name="restrictedAccess"
                      value="false"
                      checked={quotation.restrictedAccess === "false"}
                      onChange={handleChangeQuotation}
                    />
                    <label htmlFor="vehicle2">Not Restricted Access</label>
                  </div>
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
                    placeholder="Distance from kelowna"
                  />
                </div>
                <div className="form--group">
                  <label htmlFor="password">
                    Service charge <span className="required">*</span>
                  </label>
                  <input
                    type="number"
                    required
                    value={quotation.serviceCharge}
                    onChange={handleChangeQuotation}
                    name="serviceCharge"
                    placeholder="Service charge"
                  />
                </div>
                <div className="form--group">
                  <label htmlFor="password">
                    Delivered price <span className="required">*</span>
                  </label>
                  <input
                    type="number"
                    required
                    value={quotation.deliveredPrice}
                    onChange={handleChangeQuotation}
                    name="deliveredPrice"
                    placeholder="Delivered price"
                  />
                </div>
                {/* <div className="form--checkbox--option">
                  <div className="checkbox--option">
                    <input
                      type="checkbox"
                      id="vehicle1"
                      name="vehicle1"
                      value="Bike"
                    />
                    <label htmlFor="vehicle1"> I have a bike</label>
                  </div>
                  <div className="checkbox--option">
                    <input
                      type="checkbox"
                      id="vehicle2"
                      name="vehicle2"
                      value="Car"
                    />
                    <label htmlFor="vehicle2"> I have a car</label>
                  </div>
                </div> */}
                <div className="form--radio--option">
                  <div className="radio--option">
                    <input
                      type="radio"
                      name="useAtNight"
                      value="true"
                      checked={quotation.useAtNight === "true"}
                      onChange={handleChangeQuotation}
                    />
                    <label htmlFor="vehicle1">Use at night</label>
                  </div>
                  <div className="radio--option">
                    <input
                      type="radio"
                      name="useAtNight"
                      value="false"
                      checked={quotation.useAtNight === "false"}
                      onChange={handleChangeQuotation}
                    />
                    <label htmlFor="vehicle2">Not use at night</label>
                  </div>
                </div>

                <div className="form--radio--option">
                  <div className="radio--option">
                    <input
                      type="radio"
                      name="useInWinter"
                      value="true"
                      checked={quotation.useInWinter === "true"}
                      onChange={handleChangeQuotation}
                    />
                    <label htmlFor="vehicle1">Use in winter</label>
                  </div>
                  <div className="radio--option">
                    <input
                      type="radio"
                      name="useInWinter"
                      value="false"
                      checked={quotation.useInWinter === "false"}
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
                    value={quotation.specialRequirements}
                    onChange={handleChangeQuotation}
                    name="specialRequirements"
                    placeholder="Special requirements"
                  />
                </div>
                <div className="form--action">
                  <button type="submit" className="submit--from btn">
                    {loading ? "Loading..." : " Submit"}
                  </button>
                </div>
              </form>
            </div>
          </div>
    </React.Fragment>
  );
}

export default LongTerm;




