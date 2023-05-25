import React, { useState, useEffect } from "react";
import { authAxios } from "../config/config";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/rootReducer";
import { CapitalizeFirstLetter } from "../Helper";

interface MyComponentProps {
  setLoading: (isComponentLoading: boolean) => void;
  isLoading: boolean;
  quotationID: string;
  quotationType : string
  setActiveSidebar: (activeSidebarMenu: string) => void;
}

function QuotationDetails(props: MyComponentProps) {
  const { isLoading, setLoading, setActiveSidebar, quotationID , quotationType } = props;
  const [quotation, setQuotation] = useState<any>(null);
  const { user, accessToken } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (quotationID) {
      getProductDetailsData();
    }
  }, [quotationID]);

  const getProductDetailsData = async () => {
    setLoading(true);
    const payload = { quote_id: quotationID };
    await authAxios()
      .post("/quotation/get-specific-quotation-from-all-collection", payload)
      .then(
        (response) => {
          setLoading(false);
          if (response.data.status === 1) {
            const resData = response.data.data.quotation;
            setQuotation(resData);
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

  const openInNewTab = (url: string): void => {
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  };

  const CreateCheckoutSession = async () => {
    const payload = {
      price: 10,
      product_name: "Potty box1",
      product_description: "Big size potty box1",
      interval: "month",
      shipping_amount: 2, 
      quotationId: quotationID,
      quotationType: quotationType,
      success_url: `${window.location.origin}/payment-success`,
      cancel_url: `${window.location.origin}/payment-cancel`,
    };
    setLoading(true);
    await authAxios()
      .post("/payment/checkout-session", payload)
      .then(
        (response) => {
          setLoading(false);
          if (response.data.status === 1) {
            console.log("checkout-session", response.data);
            const resData = response.data.data;
            openInNewTab(resData.url);
          } else {
            toast.error(response.data?.message);
          }
        },
        (error) => {
          setLoading(false);
          toast.error(error.response?.data?.message);
        }
      )
      .catch((error) => {
        console.log("errorrrr", error);
      });
  };

  const CreateCustomer = async () => {
    setLoading(true);
    await authAxios()
      .post("/payment/create-customer")
      .then(
        (response) => {
          setLoading(false);
          if (response.data.status === 1) {
            console.log("create-customer", response.data);
            CreateCheckoutSession();
          } else {
            toast.error(response.data?.message);
          }
        },
        (error) => {
          setLoading(false);
          toast.error(error.response?.data?.message);
        }
      )
      .catch((error) => {
        console.log("errorrrr", error);
      });
  };

  const subscriptionPayment = () => {
    CreateCustomer();
  };

  return (
    <>
      <div className="quotations--details--content">
        <div className="dashboard--content--title">
          <h2>
            <span className="back--btn--wrapper">
              <span>
                <a
                  onClick={() => setActiveSidebar("MY_QUOTATIONS")}
                  className="back--btn"
                >
                  <img
                    src={require("../asstes/image/arrow--left.png")}
                    alt=""
                  />
                </a>
              </span>{" "}
              <span>Quotation Details :</span>
            </span>
          </h2>
        </div>
        <div className="table--wrapper">
          <table>
            <tbody>
              <tr>
                <th>Name</th>
                <td>{quotation?.coordinator?.name}</td>
              </tr>
              <tr>
                <th>Email Address </th>
                <td>{quotation?.coordinator?.email}</td>
              </tr>
              <tr>
                <th>Phone Number</th>
                <td>{quotation?.coordinator?.cellNumber}</td>
              </tr>
              <tr>
                <th>Status</th>
                <td className="status">{quotation?.status}</td>
              </tr>
              <tr>
                <th>Type</th>
                <td>{quotationType}</td>
              </tr>
              <tr>
                <th>Delivered Price</th>
                <td>${quotation?.costDetails?.deliveryPrice}</td>
              </tr>
              <tr>
                <th>Distance From Kelowna</th>
                <td>{quotation?.distanceFromKelowna} KM</td>
              </tr>
              <tr>
                <th>Max Workers</th>
                <td>{quotation?.maxWorkers}</td>
              </tr>
              <tr>
                <th>Service Frequency:</th>
                <td>{quotation?.serviceFrequency}</td>
              </tr>
              <tr>
                <th>Weekly Hours:</th>
                <td>{quotation?.weeklyHours}</td>
              </tr>
              <tr>
                <th>Hand Sanitizer Pump Cost:</th>
                <td>{quotation?.costDetails?.handSanitizerPumpCost}</td>
              </tr>
              <tr>
                <th>Hand Washing Cost:</th>
                <td>{quotation?.costDetails?.handWashingCost}</td>
              </tr>
              <tr>
                <th>Use At Night Cost:</th>
                <td>{quotation?.costDetails?.useAtNightCost}</td>
              </tr>
              <tr>
                <th>Use In Winter Cost:</th>
                <td>{quotation?.costDetails?.useInWinterCost}</td>
              </tr>
              <tr>
                <th>Number Of Units Cost:</th>
                <td>{quotation?.costDetails?.numberOfUnitsCost}</td>
              </tr>
              <tr>
                <th>Pickup Price:</th>
                <td>{quotation?.costDetails?.pickUpPrice}</td>
              </tr>
              <tr>
                <th>Total Cost</th>
                <td>$350</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="pt-3">
          <button
            onClick={subscriptionPayment}
            disabled={isLoading || !quotation}
            className="btn btn-primary"
          >
            Pay Now
          </button>
        </div>
      </div>
    </>
  );
}
export default QuotationDetails;
