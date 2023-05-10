import React from 'react'

export default function QuotationDetails() {
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
                                    <td>tahseem</td>
                                </tr>
                                <tr>
                                    <th>Email Address:</th>
                                    <td>admin@delimp.com</td>
                                </tr>
                                <tr>
                                    <th>Phone Number:</th>
                                    <td>982773833</td>
                                </tr>
                                <tr>
                                    <th>Delivered Price:</th>
                                    <td>$300</td>
                                </tr>
                                <tr>
                                    <th>Distance From Kelowna:</th>
                                    <td>40</td>
                                </tr>
                                <tr>
                                    <th>Max Workers:</th>
                                    <td>22</td>
                                </tr>
                                <tr>
                                    <th>Service Frequency:</th>
                                    <td>3 units serviced once per week</td>
                                </tr>
                                <tr>
                                    <th>Special Requirements:</th>
                                    <td>No special Requirements</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </section>
    </>
  )
}
