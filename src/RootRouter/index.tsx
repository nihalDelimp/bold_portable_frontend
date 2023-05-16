import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../components/Home";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import PageNoteFound from "../components/PageNoteFound";
import CartView from "../components/ViewCart";
import Checkout from "../components/Checkout";
import Quotations from "../components/MyQuotations";
import QuotationDetails from "../components/QuotationDetails";
import MyAccount from "../components/MyAccount";
import PaymentDetails from "../components/PaymentDetails";

function RootRouter() {
  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart-view" element={<CartView />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/quotations" element={<Quotations />} />
          <Route path="/my-account" element={<MyAccount />} />
          <Route path="/quotation-details/:id" element={<QuotationDetails />} />
          <Route path="/subscription-payment-details/:id" element={<PaymentDetails />} />
          <Route path="*" element={<PageNoteFound />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default RootRouter;
