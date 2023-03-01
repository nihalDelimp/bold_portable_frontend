
import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import LogoutModel from '../../../Components/ConfirmModel/LogOut';
import moment from 'moment-timezone';
import { useSelector } from 'react-redux';



const ShopSidebar = () => {
    const location = useLocation();
    const [logoutModel, setLogoutModel] = useState(false)
    const { user } = useSelector(state => state.auth)
    const [time, setTime] = useState('AdminLTE 3');
    const time_zone = process.env.REACT_APP_TIMEZONE || 'Asia/Kolkata'

    useEffect(() => {
        const timer = setInterval(() => {
            var date = moment(new Date());
            let current_time = date.tz(time_zone).format('hh:mm:ss A');
            setTime(current_time);
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, []);

    const handleLogoutModel = () => {
        setLogoutModel(!logoutModel)
    }

    return (
        <>
            <aside className="main-sidebar new_main_sidebar sidebar-dark-primary elevation-4">
                <a href="/#" className="nav_button" data-widget="pushmenu" role="button"><i className="fas fa-angle-left"></i></a>
                <div className="logo">
                    <a className="brand-link" >
                        <img id="logo" className="brand-image  elevation-3" alt="Logo" src={require("../../../assets/dist/img/logo.png")} />
                        <span className="brand-text font-weight-light">{time}</span>
                    </a>
                </div>
                <div className="sidebar">
                    <nav className="mt-2 main_nav">
                        <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                        <li className="nav-item">
                                <a href="/#" className="nav-link">
                                <i className="fa-regular fa-house fa-lg mr-3"></i>
                                    {/* <img src={require("../../../assets/dist/img/sidebar-icon/dashboard.png")} alt="dashbord-btn" /> */}
                                    <p>
                                        Dashboard<span></span>
                                        <i className="right fas fa-angle-left"></i>
                                    </p>
                                </a>
                                <ul className="nav nav-treeview">
                                    <li className="nav-item">
                                        <Link to="/" className={`nav-link ${location.pathname === "/" ? "active" : ""}`} >
                                            <i className="far fa-circle nav-icon"></i>
                                            <p>Summary</p>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/orders-charts" className="nav-link">
                                            <i className="far fa-circle nav-icon"></i>
                                            <p>Orders Chart</p>
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/averages-charts" className="nav-link">
                                            <i className="far fa-circle nav-icon"></i>
                                            <p>Average Chart</p>
                                        </NavLink>
                                    </li>
                                </ul>
                            </li>
                            <li className="nav-item">
                                <a href='/#' className="nav-link">
                                    <img src={require("../../../assets/dist/img/sidebar-icon/others.png")} alt="other-btn" />
                                    <p>
                                        Orders<span></span>
                                        <i className="right fas fa-angle-left"></i>
                                    </p>
                                </a>
                                <ul className="nav nav-treeview">
                                    {user && user.type === "Shop" && <li className="nav-item">
                                        <NavLink to="/create-order" className="nav-link">
                                            <i className="fa-regular fa-circle-plus nav-icon"></i>
                                            <p>Create Order</p>
                                        </NavLink>
                                    </li>}
                                    <li className="nav-item">
                                        <NavLink to="/all-orders" className="nav-link">
                                            <i className="far fa-circle nav-icon"></i>
                                            <p>All</p>
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/open-orders" className="nav-link">
                                            <i className="far fa-circle nav-icon"></i>
                                            <p>Open</p>
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/pending-pickup" className="nav-link">
                                            <i className="far fa-circle nav-icon"></i>
                                            <p>Pending Pickup</p>
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/picked-orders" className="nav-link">
                                            <i className="far fa-circle nav-icon"></i>
                                            <p>Picked</p>
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/completed-orders" className="nav-link">
                                            <i className="far fa-circle nav-icon"></i>
                                            <p>Completed</p>
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/canceled-orders" className="nav-link">
                                            <i className="far fa-circle nav-icon"></i>
                                            <p>Canceled</p>
                                        </NavLink>
                                    </li>
                                </ul>
                            </li>
                            {user && user.type === "Shop" &&
                            <li className="nav-item">
                                <a href='/#' className="nav-link">
                                <i className="fa-regular fa-calendar-week fa-lg mr-3"></i>
                                    {/* <img src={require("../../../assets/dist/img/sidebar-icon/others.png")} alt="menu-btn" /> */}
                                    <p>
                                        Schedule<span></span>
                                        <i className="right fas fa-angle-left"></i>
                                    </p>
                                </a>
                                <ul className="nav nav-treeview">
                                    <li className="nav-item">
                                        <NavLink to="/create-schedule-order" className="nav-link">
                                            <i className="fa-regular fa-circle-plus nav-icon"></i>
                                            <p>Create</p>
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/scheduled-orders" className="nav-link">
                                            <i className="far fa-circle nav-icon"></i>
                                            <p>Manage</p>
                                        </NavLink>
                                    </li>
                                </ul>
                            </li>}
                            <li className="nav-item">
                                <a onClick={handleLogoutModel} className="nav-link">
                                    <i className="fas fa-sign-out-alt fa-lg mr-4"></i>
                                    Log out
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </aside>
            <LogoutModel
                handleLogoutModel={handleLogoutModel}
                logoutModel={logoutModel}
            />
        </>
    )
}
export default ShopSidebar