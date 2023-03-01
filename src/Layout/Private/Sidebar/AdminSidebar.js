
import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import LogoutModel from '../../../Components/ConfirmModel/LogOut';
import moment from 'moment-timezone';

const AdminSidebar = () => {
    const [logoutModel, setLogoutModel] = useState(false)
    const location = useLocation()
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
                <span className="nav_button" data-widget="pushmenu" role="button"><i className="fas fa-angle-left"></i></span>
                <div className="logo">
                    <span className="brand-link" href="#">
                        <img id="logo" className="brand-image  elevation-3" alt="Logo" src={require("../../../assets/dist/img/logo.png")} />
                        <span className="brand-text font-weight-light">{time}</span>
                    </span>
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
                                <a href="/#" className="nav-link">
                                    <img src={require("../../../assets/dist/img/sidebar-icon/users.png")} alt="user-btn" />
                                    <p>
                                        Users<span></span>
                                        <i className="right fas fa-angle-left"></i>
                                    </p>
                                </a>
                                <ul className="nav nav-treeview">
                                    <li className="nav-item">
                                        <NavLink to="/all-drivers" className="nav-link">
                                            <i className="far fa-circle nav-icon"></i>
                                            <p>Drivers</p>
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/buyers" className="nav-link">
                                            <i className="far fa-circle nav-icon"></i>
                                            <p>Buyers</p>
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/shop-list" className="nav-link">
                                            <i className="far fa-circle nav-icon"></i>
                                            <p>Shops</p>
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/integrators" className="nav-link">
                                            <i className="far fa-circle nav-icon"></i>
                                            <p>Integrators</p>
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/shop-vendors" className="nav-link">
                                            <i className="far fa-circle nav-icon"></i>
                                            <p>Shop Vendors</p>
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
                                    <li className="nav-item">
                                        <NavLink to="/create-order" className="nav-link">
                                            <i className="fa-regular fa-circle-plus nav-icon"></i>
                                            <p>Create Order</p>
                                        </NavLink>
                                    </li>

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
                            <li className="nav-item">
                                <a href='/#' className="nav-link">
                                <i className="fa-regular fa-calendar-week fa-lg mr-3"></i>
                                    {/* <img src={require("../../../assets/dist/img/sidebar-icon/others.png")} alt="other-btn" /> */}
                                    <p>
                                        Schedule Order<span></span>
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
                            </li>
                            <li className="nav-item">
                                <a href='/#' className="nav-link">
                                <i className="fa-regular fa-money-check fa-lg mr-3"></i>
                                    {/* <img src={require("../../../assets/dist/img/sidebar-icon/menu.png")} alt="menu-btn" /> */}
                                    <p>
                                        Delivery Zones<span></span>
                                        <i className="right fas fa-angle-left"></i>
                                    </p>
                                </a>
                                <ul className="nav nav-treeview">
                                    <li className="nav-item">
                                        <NavLink to="/add-delivery-zone" className="nav-link">
                                            <i className="fa-regular fa-circle-plus nav-icon"></i>
                                            <p>Create</p>
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/delivery-zones" className="nav-link">
                                            <i className="far fa-circle nav-icon"></i>
                                            <p>Manage</p>
                                        </NavLink>
                                    </li>
                                </ul>
                            </li>

                            <li className="nav-item">
                                <a href='/#' className="nav-link">
                                <i className="fa-regular fa-money-check-dollar fa-lg mr-3"></i>
                                    {/* <img src={require("../../../assets/dist/img/sidebar-icon/menu.png")} alt="menu-btn" /> */}
                                    <p>
                                        Prices<span></span>
                                        <i className="right fas fa-angle-left"></i>
                                    </p>
                                </a>
                                <ul className="nav nav-treeview">
                                    <li className="nav-item">
                                        <NavLink to="/add-price" className="nav-link">
                                            <i className="fa-regular fa-circle-plus nav-icon"></i>
                                            <p>Create</p>
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/prices" className="nav-link">
                                            <i className="far fa-circle nav-icon"></i>
                                            <p>Manage</p>
                                        </NavLink>
                                    </li>
                                </ul>
                            </li>
                            {/* <li className="nav-item">
                                <a href='/#' className="nav-link">
                                    <img src={require("../../../assets/dist/img/sidebar-icon/menu.png")} alt="menu-btn" />
                                    <p>
                                        Menu<span></span>
                                        <i className="right fas fa-angle-left"></i>
                                    </p>
                                </a>
                                <ul className="nav nav-treeview">
                                    <li className="nav-item">
                                        <NavLink to="/menu-orders" className="nav-link">
                                            <i className="far fa-circle nav-icon"></i>
                                            <p>Menu Orders</p>
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/menu-shops" className="nav-link">
                                            <i className="far fa-circle nav-icon"></i>
                                            <p>Menu Shops</p>
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/best-sellers" className="nav-link">
                                            <i className="far fa-circle nav-icon"></i>
                                            <p>Best Sellers</p>
                                        </NavLink>
                                    </li>
                                </ul>
                            </li> */}
                            <li className="nav-item">
                                <a href='/#' className="nav-link">
                                    <img src={require("../../../assets/dist/img/sidebar-icon/others.png")} alt="otherbtn2" />
                                    <p>
                                        Others<span></span>
                                        <i className="right fas fa-angle-left"></i>
                                    </p>
                                </a>
                                <ul className="nav nav-treeview">
                                    <li className="nav-item">
                                        <NavLink to="/areas" className="nav-link">
                                            <i className="far fa-circle nav-icon"></i>
                                            <p>Areas</p>
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/cities" className="nav-link">
                                            <i className="far fa-circle nav-icon"></i>
                                            <p>Cities</p>
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/main-categories" className="nav-link">
                                            <i className="far fa-circle nav-icon"></i>
                                            <p>Main Categories</p>
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/sub-categories" className="nav-link">
                                            <i className="far fa-circle nav-icon"></i>
                                            <p>Sub Categories</p>
                                        </NavLink>
                                    </li>
                                    {/* <li className="nav-item">
                                        <NavLink to="/add-driver-orders" className="nav-link">
                                            <i className="far fa-circle nav-icon"></i>
                                            <p>Add Driver Orders</p>
                                        </NavLink>
                                    </li> */}
                                </ul>
                            </li>
                            <li className="nav-item">
                                <a href='/#' className="nav-link">
                                <i className="fa-regular fa-file-chart-column fa-lg mr-3"></i>
                                    {/* <img src={require("../../../assets/dist/img/sidebar-icon/menu.png")} alt="menu-btn" /> */}
                                    <p>
                                        Reports<span></span>
                                        <i className="right fas fa-angle-left "></i>
                                    </p>
                                </a>
                                <ul className="nav nav-treeview">
                                    {/* <li className="nav-item">
                                        <NavLink to="/manage-users" className="nav-link">
                                            <i className="far fa-circle nav-icon"></i>
                                            <p>Manage Users</p>
                                        </NavLink>
                                    </li> */}
                                    <li className="nav-item">
                                        <NavLink to="/invoices" className="nav-link">
                                            <i className="far fa-circle nav-icon"></i>
                                            <p>Invoices</p>
                                        </NavLink>
                                    </li>
                                </ul>
                            </li>
                            <li className="nav-item">
                                <a href='/#' className="nav-link">
                                    <img src={require("../../../assets/dist/img/sidebar-icon/admin-users.png")} alt="admin-user" />
                                    <p>
                                        Admin Users<span></span>
                                        <i className="right fas fa-angle-left"></i>
                                    </p>
                                </a>
                                <ul className="nav nav-treeview">
                                    <li className="nav-item">
                                        <NavLink to="/add-admin" className="nav-link">
                                            <i className="fa-regular fa-circle-plus nav-icon"></i>
                                            <p>Add Admin</p>
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/manage-admin" className="nav-link">
                                            <i className="far fa-circle nav-icon"></i>
                                            <p>Manage Admin</p>
                                        </NavLink>
                                    </li>
                                </ul>
                            </li>
                            <li className="nav-item" >
                                <NavLink to="/add-notification" className="nav-link">
                                    <img src={require("../../../assets/dist/img/sidebar-icon/push.png")} alt="push-btn" />
                                    <p>
                                        Push<span></span>
                                    </p>
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <a  onClick={handleLogoutModel} className="nav-link">
                                    <i className="fas fa-sign-out-alt fa-lg mr-4 "></i>
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
export default AdminSidebar