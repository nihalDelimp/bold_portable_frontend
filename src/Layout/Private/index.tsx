import AdminSidebar from "./Sidebar/AdminSidebar";
import ShopSidebar from "./Sidebar/ShopSidebar";
import TopNavBar from './Navbar/index';
import Footer from "./Footer";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/rootReducer";


const PrivateLayout = ({ children } : any) => {
    const { user } = useSelector((state : RootState ) => state.auth)

    const checkUserTypeAndRole = () => {
        if (user && user.type === "Admin") {
            return <AdminSidebar />
        }
        else {
            return <ShopSidebar />
        }
    }


    return (
        <div className="wrapper">
            <TopNavBar />
            {checkUserTypeAndRole()}
            <div className="body">{children}</div>
            <Footer />
        </div>
    )
}

export default PrivateLayout;
