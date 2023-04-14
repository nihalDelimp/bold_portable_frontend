import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { authAxios } from "../config/config";

function Construction(props: any) {
  const { modal, closeModal } = props;
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const [coordinator, setCoordinator] = useState({
    name: "",
    email: "",
    cellNumber: "",
  });

  const [quotation, setQuotation] = useState({
    maxWorkers: 105,
    weeklyHours: 40,
    placementDate: "2023-04-15T10:00:00.000Z",
    restrictedAccess: "false",
    distanceFromKelowna: 20,
    serviceCharge: 10,
    deliveredPrice: 0,
    useAtNight: "true",
    useInWinter: "true",
    specialRequirements: "Special requirements go here",
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
            closeModal();
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
    <>
      <div
        className={`modal fade ${modal ? "show" : "hide"}`}
        style={{ display: modal ? "block" : "none", overflowY: "scroll" }}
        id="exampleModal"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <form onSubmit={handleSubmit}>
              <div className="modal-header">
                <h5 className="modal-title text-center" id="exampleModalLabel">
                  Create Specific Quotation for Construction
                </h5>
                <button
                  type="button"
                  onClick={closeModal}
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label
                        htmlFor="recipient-name"
                        className="col-form-label"
                      >
                        Name:
                      </label>
                      <input
                        type="text"
                        required
                        value={coordinator.name}
                        onChange={handleChangeCoordinator}
                        name="name"
                        placeholder="Name"
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label
                        htmlFor="recipient-name"
                        className="col-form-label"
                      >
                        Email:
                      </label>
                      <input
                        type="email"
                        required
                        value={coordinator.email}
                        onChange={handleChangeCoordinator}
                        name="email"
                        placeholder="Email"
                        className="form-control"
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label
                        htmlFor="recipient-name"
                        className="col-form-label"
                      >
                        Cell Number:
                      </label>
                      <input
                        type="number"
                        required
                        value={coordinator.cellNumber}
                        onChange={handleChangeCoordinator}
                        name="cellNumber"
                        placeholder="Cell number"
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label
                        htmlFor="recipient-name"
                        className="col-form-label"
                      >
                        Max Workers:
                      </label>
                      <input
                        type="number"
                        required
                        value={quotation.maxWorkers}
                        onChange={handleChangeQuotation}
                        name="maxWorkers"
                        placeholder="Max Workers"
                        className="form-control"
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label
                        htmlFor="recipient-name"
                        className="col-form-label"
                      >
                        Weekly Hours:
                      </label>
                      <input
                        type="number"
                        required
                        value={quotation.weeklyHours}
                        onChange={handleChangeQuotation}
                        name="weeklyHours"
                        placeholder="Weekly Hours"
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label
                        htmlFor="recipient-name"
                        className="col-form-label"
                      >
                        Placement Date :
                      </label>
                      <input
                        type="date"
                        required
                        value={quotation.placementDate}
                        onChange={handleChangeQuotation}
                        name="placementDate"
                        placeholder="placement Date"
                        className="form-control"
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label
                        htmlFor="recipient-name"
                        className="col-form-label"
                      >
                        Restricted Access:
                      </label>
                      <input
                        type="text"
                        required
                        value={quotation.restrictedAccess}
                        onChange={handleChangeQuotation}
                        name="restrictedAccess"
                        placeholder="restrictedAccess"
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label
                        htmlFor="recipient-name"
                        className="col-form-label"
                      >
                        Distance From Kelowna:
                      </label>
                      <input
                        type="number"
                        required
                        value={quotation.distanceFromKelowna}
                        onChange={handleChangeQuotation}
                        name="distanceFromKelowna"
                        placeholder="Distance from kelowna"
                        className="form-control"
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label
                        htmlFor="recipient-name"
                        className="col-form-label"
                      >
                        Service Charge :
                      </label>
                      <input
                        type="number"
                        required
                        value={quotation.serviceCharge}
                        onChange={handleChangeQuotation}
                        name="serviceCharge"
                        placeholder="Service charge"
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label
                        htmlFor="recipient-name"
                        className="col-form-label"
                      >
                        Delivered Price:
                      </label>
                      <input
                        type="number"
                        required
                        value={quotation.deliveredPrice}
                        onChange={handleChangeQuotation}
                        name="deliveredPrice"
                        placeholder="Delivered price"
                        className="form-control"
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label
                        htmlFor="recipient-name"
                        className="col-form-label"
                      >
                        Use At Night :
                      </label>
                      <input
                        type="text"
                        required
                        value={quotation.useAtNight}
                        onChange={handleChangeQuotation}
                        name="useAtNight"
                        placeholder="use at night"
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label
                        htmlFor="recipient-name"
                        className="col-form-label"
                      >
                        Use In Winter:
                      </label>
                      <input
                        type="text"
                        required
                        value={quotation.useInWinter}
                        onChange={handleChangeQuotation}
                        name="useInWinter"
                        placeholder="Use in winter"
                        className="form-control"
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label
                        htmlFor="recipient-name"
                        className="col-form-label"
                      >
                        Special Requirements :
                      </label>
                      <input
                        type="text"
                        required
                        value={quotation.specialRequirements}
                        onChange={handleChangeQuotation}
                        name="specialRequirements"
                        placeholder="Special requirements"
                        className="form-control"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  onClick={closeModal}
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Construction;
