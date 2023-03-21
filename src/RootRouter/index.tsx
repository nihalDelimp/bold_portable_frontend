import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/rootReducer";
import Login from "../components/Login";
import Signup from "../components/Signup";
import NavBar from "../Common/NavBar";
import Home from "../components/Home";
import ProductList from "../components/ProductList";
import Users from "../components/Users";
import PageNoteFound from "../Common/PageNoteFound";
import GoogleMap from "../components/GoogleMap";
import EditProfile from "../components/EditProfile";
import MyOrders from "../components/MyOrders";

function RootRouter() {
  const { accessToken } = useSelector((state: RootState) => state.auth);

  return (
    <div>
      <Router>{accessToken ? <PrivateRouter /> : <PublicRouter />}</Router>
    </div>
  );
}

function PrivateRouter(props: any) {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/users" element={<Users />} />
        <Route path="/map-location" element={<GoogleMap />} />
        <Route path="/my-orders" element={<MyOrders />} />
        <Route path="/edit-profile/:id" element={<EditProfile />} />
        <Route path="*" element={<PageNoteFound />} />
      </Routes>
    </div>
  );
}

function PublicRouter() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="*" element={<PageNoteFound />} />
    </Routes>
  );
}

export default RootRouter;
