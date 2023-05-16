import React, { useState, useEffect } from "react";
import IsLoadingHOC from "../Common/IsLoadingHOC";
import { authAxios } from "../config/config";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/rootReducer";
import { getFormatedDate } from "../Helper";

interface MyComponentProps {
  setLoading: (isComponentLoading: boolean) => void;
  isLoading: boolean;
}

function PaymentDetails(props: MyComponentProps) {
  const { isLoading, setLoading } = props;
  const params = useParams();
  const [paymentDetail, setPaymentDetail] = useState<any>({});
  const { user, accessToken } = useSelector((state: RootState) => state.auth);
  const [subscription, setSubscription] = useState<any>({});

  console.log("QuotationsDetails", paymentDetail);

  useEffect(() => {
    getsubscriptionDetails();
  }, []);

  const getsubscriptionDetails = async () => {
    setLoading(true);
    await authAxios()
      .get(`/payment/subscription/${params.id}`)
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
      subscriptionID: params.id,
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
      <section className="quotation--details">
        <div className="grid--container">
          <div className="grid">
            <div className="grid----">
              <div className="quotation--details--body">
                <h3>Subscription Payment Details</h3>
                <table>
                  <tbody>
                    <tr>
                      <th>Customer ID :</th>
                      <td>{subscription?.user?.stripe_customer_id}</td>
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
                  disabled={isLoading}
                  className="btn btn-primary"
                >
                  End Subscription
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
export default IsLoadingHOC(PaymentDetails);
