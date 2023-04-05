import React, {useState , useEffect } from 'react';
import $ from 'jquery';
const Header = () => {

  const [isToggleMenu , setIsToggle] = useState(false)    

    useEffect(()=>{
        
        $(".hamburger").click(function(){
            $(this).toggleClass("active--hamburger");
              $(".nav--menu--wrapper").toggleClass("active--nav");
          });
          
    },[])
  return (
    <header className="header" data-aos="fade" data-aos-duration="2000">
        <div className="header--container">
           <div className="header--wrapper">
                <div className="site--logo">
                    <a href="#"><img src={require('../asstes/image/site--logo.png')} alt=""/></a>
                </div>
                <div className="main--menu">
                    <div onClick={() => setIsToggle(!isToggleMenu)} className={`hamburger ${isToggleMenu ? 'active--hamburger' : ''}`}>
                        <span  className="menu--text">
                            Menu
                        </span>
                    </div>
                    <div className={`nav--menu--wrapper ${isToggleMenu ? 'active--nav'  : ''}` }>
                        <nav className="nav--menu--layout">
                            <ul className="nav--menu">
                                <li className="nav--menu--item">
                                    <a href="#" className="menu--item">Home</a>
                                </li>
                                <li className="nav--menu--item">
                                    <a href="#" className="menu--item">Services</a>
                                </li>
                                <li className="nav--menu--item">
                                    <a href="#" className="menu--item">About</a>
                                </li>
                                <li className="nav--menu--item">
                                    <a href="#" className="menu--item">Articles</a>
                                </li>
                                <li className="nav--menu--item">
                                    <a href="#" className="menu--item">Contact</a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
                <div className="login--cart--container">
                    <div className="login--cart--wrapper">
                        <div className="cart">
                            <div className="cart--wrapper">
                                <div className="cart--icon">
                                    <span className="badge">0</span>
                                    <img src={require('../asstes/image/cart.svg').default} alt=""/>
                                </div>
                            </div>
                        </div>
                        <div className="notifications">
                            <div className="notifications--wrapper">
                                <span className="badge"></span>
                                <img src={require('../asstes/image/notification--icon.svg').default} alt=""/>
                            </div>
                        </div>
                        <div className="login--btn--wrapper">
                            <a href="#" className="login--btn">Join Us</a>
                        </div>
                    </div>
                </div>
           </div>
        </div>
    </header>
  )
}

export default Header