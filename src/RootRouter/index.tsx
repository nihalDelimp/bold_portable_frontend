import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "../components/Home";
import PageNoteFound from "../Common/PageNoteFound";
import MyOrders from "../components/MyOrders";


function RootRouter() {

  return (
    <div>
      <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/my_orders" element={<MyOrders />} />
        <Route path="*" element={<PageNoteFound />} />
      </Routes>
      </Router>
    </div>
  );
  }

export default RootRouter;
