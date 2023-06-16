import React, { useState, useEffect } from "react";
import { getFormatedDate } from "../Helper";
import moment from "moment";
import { authAxios } from "../config/config";
import { toast } from "react-toastify";
import IsLoadingHOC from "../Common/IsLoadingHOC";

interface MyComponentProps {
  setLoading: (isComponentLoading: boolean) => void;
}

function PaymentSuccess(props: MyComponentProps) {
  const [currentDate] = useState(new Date());
  const [totalAmount, setTotalAmount] = useState(0);

  const { setLoading } = props;

  useEffect(() => {
    // Get the URL parameters
    const params = new URLSearchParams(window.location.search);
    const quotationId = params.get("quotationId");
    const quotationType = params.get("quotationType");
    getProductDetailsData(quotationId);
  }, []);

  const getProductDetailsData = async (quotationId: any) => {
    setLoading(true);
    const payload = { quote_id: quotationId };
    await authAxios()
      .post("/quotation/get-specific-quotation-from-all-collection", payload)
      .then(
        (response) => {
          setLoading(false);
          if (response.data.status === 1) {
            const resData = response.data.data.quotation;
            setTotalAmount(resData?.costDetailsSum);
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
      <section className="order--sucsess--message">
        <div className="order--message--container">
          <div className="order--message--body">
            <h3 >Thank you for subscribing!</h3>
            <table>
              <tbody>
                <h5 style={{ paddingTop: "15px" }} >
                  You have successfully subscribed to our list.
                </h5>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}

export default IsLoadingHOC(PaymentSuccess);
