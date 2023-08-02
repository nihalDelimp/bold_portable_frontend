import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../components/Home";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import PageNoteFound from "../components/PageNoteFound";
import CartView from "../components/ViewCart";
import Checkout from "../components/Checkout";
import MyAccount from "../components/MyAccount";
import PaymentSuccess from "../components/PaymentSuccess";
import PaymentCancel from "../components/PaymentCancel";
import AboutUsMenu from "../components/AboutUsMenu";
import Services from "../components/Services";
import ContactUs from "../components/Contact";
import PaymentEnded from "../components/PaymentEnded";
function RootRouter() {
  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart-view" element={<CartView />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/my-account" element={<MyAccount />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/payment-ended" element={<PaymentEnded />} />
          <Route path="/payment-cancel" element={<PaymentCancel />} />
          <Route path="/about-us" element={<AboutUsMenu />} />
          <Route path="/services/:id" element={<Services />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="*" element={<PageNoteFound />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default RootRouter;
