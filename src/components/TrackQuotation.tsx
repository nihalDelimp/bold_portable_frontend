import React, { useState, useEffect } from "react";
import { authAxios } from "../config/config";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/rootReducer";
import { CapitalizeFirstLetter, getDateWithDay } from "../Helper/index";
import IsLoggedinHOC from "../Common/IsLoggedInHOC";

interface MyComponentProps {
  setLoading: (isComponentLoading: boolean) => void;
  isLoading: boolean;
  quotationID: string;
  quotationType: string;
  qoutStatus: string;
  setActiveSidebar: (activeSidebarMenu: string) => void;
}

function TrackQuotation(props: MyComponentProps) {
  const {
    isLoading,
    setLoading,
    setActiveSidebar,
    quotationID,
    quotationType,
    qoutStatus,
  } = props;
  const [quotation, setQuotation] = useState<any>(null);
  const { user } = useSelector((state: RootState) => state.auth);


  useEffect(() => {
    if (quotationID) {
      getOrderTrackingData();
    }
  }, [quotationID]);

  const getOrderTrackingData = async () => {
    setLoading(true);
    await authAxios()
      .get(
        `/tracking/find-by-quotation?quotationId=${quotationID}&quotationType=${quotationType}&userId=${user._id}`
      )
      .then(
        (response) => {
          setLoading(false);
          if (response.data.status === 1) {
            const resData = response.data.data;
            if (resData[0]) {
              setQuotation(resData[0]);
            }
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
              <span>Tracking Quotation</span>
            </span>
          </h2>
        </div>
        <div className="track--order--wrapper">
          <div className="order--id">
            {/* <h3>Track Order</h3> */}
          </div>
          <div className="order--status">
            <span>Status - </span>{" "}
            <span className="order--status--corrent">
              {CapitalizeFirstLetter(qoutStatus)}
            </span>
          </div>
          <div className="order--tracking--bar">
            <ul>
              {quotation && (
                <li className="active">
                  <span className="track--circle"></span>
                  <div className="track--detail">
                    <h4>Order Placed</h4>
                    <p>{quotation && getDateWithDay(quotation.createdAt)}</p>
                  </div>
                </li>
              )}
              {quotation &&
                quotation.address &&
                quotation.address.length > 0 &&
                quotation.address.map((item: any, index: number) => (
                  <li key={index + 1} className="active">
                    <span className="track--circle"></span>
                    <div className="track--detail">
                      <h4>{item?.address}</h4>
                      <p>{getDateWithDay(item?.timestamp)}</p>
                    </div>
                  </li>
                ))}

              {/* <li className="active">
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
              </li> */}
            </ul>
          </div>
          {/* <div className="user--address">
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
          </div> */}
        </div>
      </div>
    </>
  );
}

export default IsLoggedinHOC(TrackQuotation);
