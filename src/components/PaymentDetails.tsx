import React, { useState, useEffect } from "react";
import IsLoadingHOC from "../Common/IsLoadingHOC";
import { authAxios } from "../config/config";
import { toast } from "react-toastify";
import { getFormatedDate, replaceHyphenCapitolize } from "../Helper";
import IsLoggedinHOC from "../Common/IsLoggedInHOC";

interface MyComponentProps {
  setLoading: (isComponentLoading: boolean) => void;
  isLoading: boolean;
  subscriptionID: string;
  setActiveSidebar: (activeSidebarMenu: string) => void;
}

function PaymentDetails(props: MyComponentProps) {
  const { isLoading, setLoading, subscriptionID, setActiveSidebar } = props;
  const [paymentDetail, setPaymentDetail] = useState<any>({});
  const [subscription, setSubscription] = useState<any>({});
  const [costDetails, setCostDetails] = useState<any>({});
  const [totalPaid, setTotalPaid] = useState<number>(0);

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
            const costDetail: { [key: string]: number } =
              resData?.payments[1]?.costDetails;
            const totalCost: number = Object.values(costDetail).reduce(
              (accumulator: number, currentValue: number) =>
                accumulator + currentValue,
              0
            );
            setTotalPaid(totalCost);
            setCostDetails(costDetail);
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
      pickup_charge: costDetails?.pickUpPrice,
      product_name: subscription?.quotationType,
      success_url: `${window.location.origin}/payment-ended`,
      cancel_url: `${window.location.origin}/payment-cancel`,
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
              <span>Payment Details</span>
            </span>
          </h2>
        </div>
        <div className="table--wrapper">
          <table>
            <tbody>
              <tr>
                <th>Subscription ID</th>
                <td>{subscription?.subscription?.slice(-8)?.toUpperCase()}</td>
              </tr>
              <tr>
                <th>Name</th>
                <td>{subscription?.user?.name}</td>
              </tr>
              <tr>
                <th>Email Address</th>
                <td>{subscription?.user?.email}</td>
              </tr>
              <tr>
                <th>Phone Number</th>
                <td>{subscription?.user?.mobile}</td>
              </tr>
              <tr>
                <th>Status</th>
                <td>{subscription?.status}</td>
              </tr>
              <tr>
                <th>Type</th>
                <td>{replaceHyphenCapitolize(subscription?.quotationType)}</td>
              </tr>
              <tr>
                <th>Created At</th>
                <td>{getFormatedDate(subscription?.createdAt)}</td>
              </tr>
              <tr>
                <th>Amount Paid</th>
                <td>{totalPaid}</td>
              </tr>
              <tr>
                <th>Pick up Price</th>
                <td>{costDetails && costDetails?.pickUpPrice}</td>
              </tr>
            </tbody>
          </table>
        </div>
        {subscription && subscription.status && (
          <div className="pt--15">
            {subscription.status === "INACTIVE" ? (
              <button disabled className="btn btn-success">
                Ended
              </button>
            ) : (
              <button
                onClick={endSubscriptionPayment}
                disabled={isLoading || !paymentDetail}
                className="btn btn-primary"
              >
                End Now
              </button>
            )}
          </div>
        )}
      </div>
    </>
  );
}
export default IsLoadingHOC(IsLoggedinHOC(PaymentDetails));
