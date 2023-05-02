import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../components/Home";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import PageNoteFound from "../components/PageNoteFound";
import CartView from "../components/ViewCart";
import Checkout from "../components/Checkout";

function RootRouter() {
  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart-view" element={<CartView />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="*" element={<PageNoteFound />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default RootRouter;
