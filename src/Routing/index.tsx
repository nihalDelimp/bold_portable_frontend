import { BrowserRouter, Routes,  } from "react-router-dom";
import { useSelector } from 'react-redux';
import AppRoute from './AppRoute';
import PublicRoute from './PublicRoute';
import Authorization from './Authorization';
import PrivateRoute from './PrivateRoute';
import PrivateLayout from '../Layout/Private';
import PublicLayout from '../Layout/Public';
import Login from '../components/Login';
import Register from '../components/Signup';

// import AdminDashboard from '../Containers/Dashboard/Summary/adminDash';
// import ShopDashboard from '../Containers/Dashboard/Summary/ShopDash';
// import OrdersCharts from '../Containers/Dashboard/OrdersCharts';

import { RootState } from "../Redux/rootReducer";




const Admin = Authorization(['Admin']);
const user = Authorization(['user']);


const Routing = () => {
    const type = useSelector((state : RootState )=> state.auth.user.type)

    return (
        <Routes>

            <AppRoute exact path="/" element={<Login />} layout={PublicLayout} />
            <AppRoute exact path="/register" component={Register} layout={PublicLayout} />


            {/* <PrivateRoute exact path="/" component={allUser(type && type === "Admin" ? AdminDashboard : ShopDashboard)} layout={PrivateLayout} />
            <PrivateRoute exact path="/orders-charts" component={adminAndShop(OrdersCharts)} layout={PrivateLayout} /> */}
           

            {/* <Route
                path="*"
                element={() => (
                    <div style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100vh"
                    }}>
                        <h1 style={{ color: "#000", fontSize: "2rem" }}>Page Not Found!!</h1>
                    </div>
                )/>}
            /> */}


        </Routes>
    )
}
export default Routing;
