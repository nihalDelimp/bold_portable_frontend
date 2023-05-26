import React, { useState } from "react";
import { getFormatedDate } from "../Helper";
import moment from "moment";

function PaymentSuccess() {
  const [currentDate] = useState(new Date());

  return (
    <>
      <section className="order--sucsess--message">
        <div className="order--message--container">
          <div className="order--message--body">
            <h3>Thank you. Your payment has successfull.</h3>
            <table>
              <tbody>
                <tr>
                  <th>Order number:</th>
                  <td>1812</td>
                </tr>
                <tr>
                  <th>Date:</th>
                  <td>
                    {moment(currentDate).format("MMMM Do YYYY, hh:mm:ss A")}
                  </td>
                </tr>
                <tr>
                  <th>Total:</th>
                  <td>$135.00</td>
                </tr>
                <tr>
                  <th>Payment method:</th>
                  <td>Direct bank transfer</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}

export default PaymentSuccess;
