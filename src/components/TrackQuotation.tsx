import React, { useState, useEffect } from "react";
import { authAxios } from "../config/config";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/rootReducer";

interface MyComponentProps {
  setLoading: (isComponentLoading: boolean) => void;
  isLoading: boolean;
  quotationID: string;
  quotationType: string;
  setActiveSidebar: (activeSidebarMenu: string) => void;
}

function TrackQuotation(props: MyComponentProps) {
  const {
    isLoading,
    setLoading,
    setActiveSidebar,
    quotationID,
    quotationType,
  } = props;
  const [quotation, setQuotation] = useState<any>(null);
  const { user, accessToken } = useSelector((state: RootState) => state.auth);

  console.log("TrackQuotation>>Data", quotation);

  useEffect(() => {
    if (quotationID) {
      getOrderTrackingData();
    }
  }, [quotationID]);

  const getOrderTrackingData = async () => {
    setLoading(true);
    const payload = { quote_id: quotationID };
    await authAxios()
      .get(
        `/tracking/find-by-quotation?quotationId=${quotationID}&quotationType=${quotationType}&userId=${user._id}`
      )
      .then(
        (response) => {
          setLoading(false);
          if (response.data.status === 1) {
            const resData = response.data.data;
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

  return (
    <>
      <div className="track--order--content">
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
              <span>Tracking Quotation :</span>
            </span>
          </h2>
        </div>
        <div className="track--order--wrapper">
          <div className="order--id">
            <h3>Track Order - 1234567889123</h3>
          </div>
          <div className="order--status">
            <span>Status - </span>{" "}
            <span className="order--status--corrent">Pending</span>
          </div>
          <div className="order--tracking--bar">
            <ul>
              <li className="active">
                <span className="track--circle"></span>
                <div className="track--detail">
                  <h4>Order Placed</h4>
                  <p>Tue, 15 May</p>
                </div>
              </li>
              <li className="active">
                <span className="track--circle"></span>
                <div className="track--detail">
                  <h4>Order Shipped</h4>
                  <p>Tue, 15 May</p>
                </div>
              </li>
              <li>
                <span className="track--circle"></span>
                <div className="track--detail">
                  <h4>Out for the Station</h4>
                  <p>Tue, 15 May</p>
                </div>
              </li>
              <li>
                <span className="track--circle"></span>
                <div className="track--detail">
                  <h4>Order Placed at Station</h4>
                  <p>Tue, 15 May</p>
                </div>
              </li>
            </ul>
          </div>
          <div className="user--address">
            <h3>Delivery Address</h3>
            <ul>
              <li>Jhon Smith</li>
              <li> | </li>
              <li>+0 1234 5678900</li>
            </ul>
            <p>
              112/296 ABCD adipiscing elit, sed diam nonummy Place\Location
              Street Area City - Pincode State
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default TrackQuotation;
