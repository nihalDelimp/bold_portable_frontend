import React from 'react'

function PaymentCancel() {
  return (
    <>
     <section className="payment--cancel--message">
        <div className="payment--message--container">
          <div className="payment--message--body">
            <h3>Your payment has been Cancelled.</h3>
            <table>
              <tbody>
                <tr>
                  <th>Order number:</th>
                  <td>1812</td>
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
  )
}

export default PaymentCancel
