import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { authAxios } from "../config/config";
import IsLoadingHOC from "../Common/IsLoadingHOC";
import { toast } from "react-toastify";

interface MyComponentProps {
  setLoading: (isComponentLoading: boolean) => void;
}

function MyQuotations(props: MyComponentProps) {
  const { setLoading } = props;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemPerPage] = useState<number>(100);
  const [myQuotations, setMyQuotations] = useState([]);

  console.log("myQuotations", myQuotations);
  useEffect(() => {
    getMyQuotationsData();
  }, []);

  const getMyQuotationsData = async () => {
    setLoading(true);
    await authAxios()
      .get(
        `quotation/get-quotation-for-specific-user?page=${currentPage}&limit=${itemsPerPage}`
      )
      .then(
        (response) => {
          setLoading(false);
          if (response.data.status === 1) {
            const resData = response.data.data;
            setMyQuotations(resData.quotations);
          } else {
            toast.error(response.data.message);
          }
        },
        (error) => {
          if (error.response.status === 401) {
            console.log("Your session has expired. Please sign in again");
          }
          setLoading(false);
        }
      )
      .catch((error) => {
        console.log("errorrrr", error);
      });
  };

  return (
    <>
      <section className="quotation--main">
        <div className="grid--container">
          <div className="grid">
            <div className="grid----">
              <div className="my--quotation">
                <div className="quotation--content--heading">
                  <h3>Quotations</h3>
                </div>
                <div className="table--wrapper">
                  <table>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email Address</th>
                        <th>Phone Number</th>
                        <th>Delivered Price</th>
                        <th>Distance From Kelowna</th>
                        <th>Max Workers</th>
                        <th>Type</th>
                        <th className="hidden">Hidden</th>
                        <th>Service Frequency</th>
                        <th>Special Requirements</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {myQuotations &&
                        myQuotations.length > 0 &&
                        myQuotations.map((item: any) => (
                          <tr key={item._id}>
                            <td>{item.coordinator.name}</td>
                            <td>{item.coordinator.email}</td>
                            <td>{item.coordinator.cellNumber}</td>
                            <td>${item.costDetails.deliveryPrice}</td>
                            <td>{item.distanceFromKelowna}</td>
                            <td>{item.maxWorkers}</td>
                            <td>{item.quotationType}</td>
                            <td className="hidden">hidden</td>
                            <td>{item.serviceFrequency}</td>
                            <td>{item.special_requirements}</td>
                            <td>
                              <Link
                                to={`/quotation-details/${item._id}`}
                                className="btn"
                              >
                                View
                              </Link>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default IsLoadingHOC(MyQuotations);
