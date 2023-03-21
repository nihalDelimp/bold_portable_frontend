import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import IsLoadingHOC from "../Common/IsLoadingHOC";
import { authAxios } from "../config/config";
import { RootState } from "../Redux/rootReducer";

function MyOrders(props: any) {
  const [MyOrders, setMyOrders] = useState<string[]>([]);
  const { user } = useSelector((state: RootState) => state.auth);

  const { setLoading } = props;

  useEffect(() => {
    getProductsListData();
  }, []);

  const getProductsListData = async () => {
    setLoading(true);
    await authAxios()
      .get(`/order/get-user-order-details/${user.id}`)
      .then(
        (response) => {
          setLoading(false);
          if (response.data.status === 1) {
            const resData = response.data.data;
            setMyOrders(resData);
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
    <div className="container">
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col">Handle</th>
          </tr>
        </thead>
        <tbody>
          {MyOrders &&
            MyOrders.length > 0 &&
            MyOrders.map((item, index) => (
              <tr key = {index+1}>
                <th scope="row">{index+1}</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default IsLoadingHOC(MyOrders);
