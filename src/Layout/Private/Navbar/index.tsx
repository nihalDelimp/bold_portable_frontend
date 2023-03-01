import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../../Redux/rootReducer'
// import { socketService } from '../../../Config/SocketService'


function TopNavBar() {
    const dispatch = useDispatch()
    const { user } = useSelector((state : RootState )=> state.auth)
    const [logoutModel, setLogoutModel] = useState(false)


    useEffect(() => {
        // getsocketService();
    }, [])


    // const getsocketService = () => {
    //     socketService.connect()
    //         .then((socket : any) => {
    //             console.log("socket-connection", socket)
    //             socket.on("notification", (data : any )=> {
    //                 console.log('notification', data)
    //             });
    //         })
    // }

    const handleLogoutModel = () => {
        setLogoutModel(!logoutModel)
    }


    return (
        <>
            <nav className="main-header navbar navbar-expand navbar-white navbar-light nav_bar_top">
                <ul className="navbar-nav">
                </ul>
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item dropdown">
                        {/* <a className="nav-link" data-toggle="dropdown" href="/#">
                            <img src={require("../../../assets/dist/img/dashboard/bell.png")} alt="bell-btn" />
                            <span className="badge badge-warning navbar-badge">15</span>
                        </a> */}
                        <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                            <span className="dropdown-item dropdown-header">15 Notifications</span>
                            <div className="dropdown-divider"></div>
                            <a href="/#" className="dropdown-item">
                                <i className="fas fa-envelope mr-2"></i> 4 new messages
                                <span className="float-right text-muted text-sm">3 mins</span>
                            </a>
                            <div className="dropdown-divider"></div>
                            <a href="/#" className="dropdown-item">
                                <i className="fas fa-users mr-2"></i> 8 friend requests
                                <span className="float-right text-muted text-sm">12 hours</span>
                            </a>
                            <div className="dropdown-divider"></div>
                            <a href="/#" className="dropdown-item">
                                <i className="fas fa-file mr-2"></i> 3 new reports
                                <span className="float-right text-muted text-sm">2 days</span>
                            </a>
                            <div className="dropdown-divider"></div>
                            <a href="/#" className="dropdown-item dropdown-footer">See All Notifications</a>
                        </div>
                    </li>
                    {/* <li className="nav-item dropdown" >
                        <a className="nav-link" data-toggle="dropdown" href="/#" role="button">
                            <img src={require("../../../assets/dist/img/dashboard/setting.png")} alt="setting-btn" />
                        </a>
                        <div className="dropdown-menu dropdown-menu-lg  dropdown-menu-right">
                            <span className="dropdown-item dropdown-header">Setting</span>
                            <div className="dropdown-divider"></div>
                            <span onClick={handleLogoutModel} className="dropdown-item">
                                <i className="fas fa-sign-out-alt mr-2 "></i>
                                Log out
                            </span>
                        </div>
                    </li> */}
                </ul>
                <div className="login_details">
                <ul className="navbar-nav ml-auto">
                <li className="nav-item dropdown">
                <a className="nav-link" data-toggle="dropdown" href="/#" role="button">
                   <img src={require("../../../assets/dist/img/dummy-profile-image.png")} alt="user-logo" />
                   <span className='text-capitalize font-weight-bold ml-2'>{user.username}</span>
                    </a>
                    <div className="dropdown-menu dropdown-menu-right">
                        {/* <span className="dropdown-item dropdown-header"><b>Setting</b></span>
                        <div className="dropdown-divider"></div> */}
                        <span onClick={handleLogoutModel} className="dropdown-item ">
                            <i className="fas fa-sign-out-alt mr-2 "></i>
                            <span> Log out</span>
                        </span>
                    </div>
                    </li>
                </ul>
                </div>
            </nav>
            {/* <LogoutModel
                handleLogoutModel={handleLogoutModel}
                logoutModel={logoutModel}
            /> */}
        </>
    )
}

export default TopNavBar