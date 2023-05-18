import React, { useState, useEffect } from "react";
import IsLoadingHOC from "../Common/IsLoadingHOC";
import { authAxios } from "../config/config";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/rootReducer";

interface MyComponentProps {
  setLoading: (isComponentLoading: boolean) => void;
  isLoading: boolean;
}

function QuotationDetails(props: MyComponentProps) {
  const { isLoading, setLoading } = props;
  const params = useParams();
  const [quotationDetails, setQuotationDetails] = useState<any>({});
  const { user, accessToken } = useSelector((state: RootState) => state.auth);


  useEffect(() => {
    getProductDetailsData();
  }, []);

  const getProductDetailsData = async () => {
    setLoading(true);
    const payload = { quote_id: params.id };
    await authAxios()
      .post("/quotation/get-specific-quotation-from-all-collection", payload)
      .then(
        (response) => {
          setLoading(false);
          if (response.data.status === 1) {
            const resData = response.data.data.quotation;
            setQuotationDetails(resData);
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
      success_url : `${window.location.origin}/payment-success`,
      cancel_url : `${window.location.origin}/payment-cancel`
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
      <section className="quotation--details">
        <div className="grid--container">
          <div className="grid">
            <div className="grid----">
              <div className="quotation--details--body">
                <h3>Quotation Details</h3>
                <table>
                  <tbody>
                    <tr>
                      <th>Name:</th>
                      <td>{quotationDetails?.coordinator?.name}</td>
                    </tr>
                    <tr>
                      <th>Email Address:</th>
                      <td>{quotationDetails?.coordinator?.email}</td>
                    </tr>
                    <tr>
                      <th>Phone Number:</th>
                      <td>{quotationDetails?.coordinator?.cellNumber}</td>
                    </tr>
                    <tr>
                      <th>Status:</th>
                      <td>{quotationDetails?.status}</td>
                    </tr>
                    <tr>
                      <th>Delivered Price:</th>
                      <td>${quotationDetails?.costDetails?.deliveryPrice}</td>
                    </tr>
                    <tr>
                      <th>Distance From Kelowna:</th>
                      <td>{quotationDetails?.distanceFromKelowna}</td>
                    </tr>
                    <tr>
                      <th>Max Workers:</th>
                      <td>{quotationDetails?.maxWorkers}</td>
                    </tr>
                    <tr>
                      <th>Service Frequency:</th>
                      <td>{quotationDetails?.serviceFrequency}</td>
                    </tr>
                    <tr>
                      <th>Weekly Hours:</th>
                      <td>{quotationDetails?.weeklyHours}</td>
                    </tr>
                    <tr>
                      <th>Hand Sanitizer Pump Cost:</th>
                      <td>
                        {quotationDetails?.costDetails?.handSanitizerPumpCost}
                      </td>
                    </tr>
                    <tr>
                      <th>Hand Washing Cost:</th>
                      <td>{quotationDetails?.costDetails?.handWashingCost}</td>
                    </tr>
                    <tr>
                      <th>Use At Night Cost:</th>
                      <td>{quotationDetails?.costDetails?.useAtNightCost}</td>
                    </tr>
                    <tr>
                      <th>Use In Winter Cost:</th>
                      <td>{quotationDetails?.costDetails?.useInWinterCost}</td>
                    </tr>
                    <tr>
                      <th>Number Of Units Cost:</th>
                      <td>
                        {quotationDetails?.costDetails?.numberOfUnitsCost}
                      </td>
                    </tr>
                    <tr>
                      <th>Pickup Price:</th>
                      <td>{quotationDetails?.costDetails?.pickUpPrice}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="pt-3">
                <button
                  onClick={subscriptionPayment}
                  disabled={isLoading}
                  className="btn btn-primary"
                >
                  Pay Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
export default IsLoadingHOC(QuotationDetails);
