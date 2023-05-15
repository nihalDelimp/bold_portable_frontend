import React, { useState, useEffect } from "react";
import IsLoadingHOC from "../Common/IsLoadingHOC";
import { authAxios } from "../config/config";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

interface MyComponentProps {
  setLoading: (isComponentLoading: boolean) => void;
}

function QuotationDetails(props: MyComponentProps) {
  const { setLoading } = props;
  const params = useParams();
  const [quotationDetails, setQuotationDetails] = useState<any>({});

  console.log("QuotationsDetails", quotationDetails);

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
                      <td>
                        {quotationDetails?.costDetails?.handWashingCost}
                      </td>
                    </tr>
                    <tr>
                      <th>Use At Night Cost:</th>
                      <td>
                        {quotationDetails?.costDetails?.useAtNightCost}
                      </td>
                    </tr>
                    <tr>
                      <th>Use In Winter Cost:</th>
                      <td>
                        {quotationDetails?.costDetails?.useInWinterCost}
                      </td>
                    </tr>
                    <tr>
                      <th>Number Of Units Cost:</th>
                      <td>
                        {quotationDetails?.costDetails?.numberOfUnitsCost}
                      </td>
                    </tr>
                    <tr>
                      <th>Pickup Price:</th>
                      <td>
                        {quotationDetails?.costDetails?.pickUpPrice}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
export default IsLoadingHOC(QuotationDetails);
