import React, { useState, useEffect } from "react";
import { authAxios } from "../config/config";
import { toast } from "react-toastify";
import {
  CapitalizeFirstLetter,
  getDaysBetweenDates,
  replaceHyphenCapitolize,
  setFormatDate,
} from "../Helper";
import IsLoggedinHOC from "../Common/IsLoggedInHOC";

interface MyComponentProps {
  setLoading: (isComponentLoading: boolean) => void;
  isLoading: boolean;
  quotationID: string;
  quotationType: string;
  setActiveSidebar: (activeSidebarMenu: string) => void;
}

function QuotationDetails(props: MyComponentProps) {
  const {
    isLoading,
    setLoading,
    setActiveSidebar,
    quotationID,
    quotationType,
  } = props;
  const [quotation, setQuotation] = useState<any>(null);
  const [totalServicesDays, setTotalServicesDays] = useState<number>(0);


  useEffect(() => {
    if (quotationID) {
      getSpecificQuotationDetails();
    }
  }, [quotationID]);

  const getSpecificQuotationDetails = async () => {
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
            const servicesDays = getDaysBetweenDates(
              resData?.placementDate,
              resData?.dateTillUse
            );
            setTotalServicesDays(servicesDays);
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
    let intervalService = "day";
    if (totalServicesDays >= 30 && totalServicesDays < 365) {
      intervalService = "month";
    } else if (totalServicesDays >= 365) {
      intervalService = "year";
    }
    const payload = {
      price: quotation?.costDetailsSum,
      product_name: quotationType,
      product_description: "Big size potty box1",
      interval: "month",
      shipping_amount: quotation?.costDetails?.pickUpPrice,
      quotationId: quotationID,
      quotationType: quotation?.quotationType,
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
              <span>Quotation Details</span>
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
                <th>Email Address</th>
                <td>{quotation?.coordinator?.email}</td>
              </tr>
              <tr>
                <th>Phone Number</th>
                <td>{quotation?.coordinator?.cellNumber}</td>
              </tr>
              <tr>
                <th>Status</th>
                <td className="status">
                  {CapitalizeFirstLetter(quotation?.status)}
                </td>
              </tr>
              <tr>
                <th>Type</th>
                <td>{replaceHyphenCapitolize(quotationType)}</td>
              </tr>
              {quotation?.costDetails &&
                quotation?.costDetails?.deliveryPrice > 0 && (
                  <tr>
                    <th>Delivery Price</th>
                    <td>{quotation?.costDetails?.deliveryPrice}</td>
                  </tr>
                )}
              <tr>
                <th>Distance From Kelowna</th>
                <td>{quotation?.distanceFromKelowna} KM</td>
              </tr>
              <tr>
                <th>Placement Date</th>
                <td>{setFormatDate(quotation?.placementDate || quotation?.eventDetails?.eventDate)}</td>
              </tr>
              <tr>
                <th>Pickup Date </th>
                <td>{setFormatDate(quotation?.dateTillUse)}</td>
              </tr>
              <tr>
                <th>Male Worker</th>
                <td>{quotation?.maleWorkers}</td>
              </tr>
              <tr>
                <th>Female Worker</th>
                <td>{quotation?.femaleWorkers}</td>
              </tr>
              <tr>
                <th>Service Frequency</th>
                <td>{quotation?.serviceFrequency}</td>
              </tr>
              <tr>
                <th>Weekly Hours</th>
                <td>{quotation?.weeklyHours}</td>
              </tr>
              {quotation?.costDetails?.handSanitizerPumpCost > 0 && (
                <tr>
                  <th>Hand Sanitizer Pump Cost</th>
                  <td>{quotation?.costDetails?.handSanitizerPumpCost}</td>
                </tr>
              )}
              {quotation?.costDetails?.handWashingCost > 0 && (
                <tr>
                  <th>Hand Washing Cost</th>
                  <td>{quotation?.costDetails?.handWashingCost}</td>
                </tr>
              )}
              {quotation?.costDetails?.useAtNightCost > 0 && (
                <tr>
                  <th>Use at Night Cost</th>
                  <td>{quotation?.costDetails?.useAtNightCost}</td>
                </tr>
              )}
              {quotation?.costDetails?.useInWinterCost > 0 && (
                <tr>
                  <th>Use in Winter Cost</th>
                  <td>{quotation?.costDetails?.useInWinterCost}</td>
                </tr>
              )}
              {quotation?.costDetails?.numberOfUnitsCost > 0 && (
                <tr>
                  <th>Number Of Unit(s) Cost</th>
                  <td>{quotation?.costDetails?.numberOfUnitsCost}</td>
                </tr>
              )}
              {quotation?.costDetails?.pickUpPrice > 0 && (
                <tr>
                  <th>Pickup Price</th>
                  <td>{quotation?.costDetails?.pickUpPrice}</td>
                </tr>
              )}
              {quotation?.costDetailsSum > 0 && (
                <tr>
                  <th>Total Amount</th>
                  <td>${quotation?.costDetailsSum}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {quotation && (
          <div className="pt--15">
            {quotation?.status === "pending" && (
              <button
                onClick={subscriptionPayment}
                disabled={isLoading || !quotation || !quotation?.costDetailsSum}
                className="btn btn-primary"
              >
                Subscribe
              </button>
            )}
            {quotation?.status === "active" && (
              <button className="btn btn-success">Paid</button>
            )}
            {quotation?.status === "cancelled" && (
              <button className="btn btn-danger">cancelled</button>
            )}
          </div>
        )}
      </div>
    </>
  );
}
export default IsLoggedinHOC(QuotationDetails);
