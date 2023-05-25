import React, { useState, useEffect } from "react";
import IsLoadingHOC from "../Common/IsLoadingHOC";
import { authAxios } from "../config/config";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/rootReducer";
import { getFormatedDate } from "../Helper";

interface MyComponentProps {
  setLoading: (isComponentLoading: boolean) => void;
  isLoading: boolean;
  subscriptionID: string;
  setActiveSidebar: (activeSidebarMenu: string) => void;
}

function PaymentDetails(props: MyComponentProps) {
  const { isLoading, setLoading, subscriptionID, setActiveSidebar } = props;
  const [paymentDetail, setPaymentDetail] = useState<any>({});
  const { user, accessToken } = useSelector((state: RootState) => state.auth);
  const [subscription, setSubscription] = useState<any>({});

  console.log("Subscription Details", paymentDetail);

  useEffect(() => {
    getsubscriptionDetails();
  }, []);

  const getsubscriptionDetails = async () => {
    setLoading(true);
    await authAxios()
      .get(`/payment/subscription/${subscriptionID}`)
      .then(
        (response) => {
          setLoading(false);
          if (response.data.status === 1) {
            const resData = response.data.data;
            setPaymentDetail(resData.payments[0].payment);
            setSubscription(resData.payments[0].subscription);
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

  const endSubscriptionPayment = async () => {
    const payload = {
      subscriptionID: subscriptionID,
      pickup_charge: 1,
      product_name: "potty box",
    };
    setLoading(true);
    await authAxios()
      .post("/payment/end-subscription", payload)
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

  return (
    <>
      <div className="quotations--details--content">
        <div className="dashboard--content--title">
          <h2>
            <span className="back--btn--wrapper">
              <span>
                <a
                  onClick={() => setActiveSidebar("MY_SUBSCRIPTIONS")}
                  className="back--btn"
                >
                  <img
                    src={require("../asstes/image/arrow--left.png")}
                    alt=""
                  />
                </a>
              </span>{" "}
              <span>Payment Details :</span>
            </span>
          </h2>
        </div>
        <div className="table--wrapper">
          <table>
            <tbody>
              <tr>
                <th>Subscription ID :</th>
                <td>{subscription?.subscription?.slice(15)}</td>
              </tr>
              <tr>
                <th>Name :</th>
                <td>{subscription?.user?.name}</td>
              </tr>
              <tr>
                <th>Email Address :</th>
                <td>{subscription?.user?.email}</td>
              </tr>
              <tr>
                <th>Phone Number :</th>
                <td>{subscription?.user?.mobile}</td>
              </tr>
              <tr>
                <th>Status :</th>
                <td>{subscription?.status}</td>
              </tr>
              <tr>
                <th>Created AT :</th>
                <td>{getFormatedDate(subscription?.createdAt)}</td>
              </tr>
              <tr>
                <th>Amount Due :</th>
                <td>{paymentDetail?.amount_due}</td>
              </tr>
              <tr>
                <th>Amount Paid :</th>
                <td>{paymentDetail?.amount_paid}</td>
              </tr>
              <tr>
                <th>Amount Remaining :</th>
                <td>{paymentDetail?.amount_remaining}</td>
              </tr>
              <tr>
                <th>Amount Shipping :</th>
                <td>{paymentDetail?.amount_shipping}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="pt-3">
          <button
            onClick={endSubscriptionPayment}
            disabled={isLoading || !paymentDetail}
            className="btn btn-primary"
          >
            Pay Now
          </button>
        </div>
      </div>
    </>
  );
}
export default IsLoadingHOC(PaymentDetails);
