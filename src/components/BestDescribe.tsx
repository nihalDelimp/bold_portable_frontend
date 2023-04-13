import React,{useState,useEffect} from 'react';
import EventPopupModal from './EventPopupModal';

   
import $ from 'jquery'

const BestDescribe = () => {


 useEffect(()=>{
   
    $(".describe--categorys--list .describe--categorys--item").mouseenter(function(){

        var data_category = $(this).attr("data-category");
        $(".describe--category--items .describe--category--item").removeClass("active--cat--img");
        $("#"+data_category).addClass("active--cat--img");
        $(".describe--categorys--list .describe--categorys--item").removeClass("active--item");
        $(this).addClass("active--item");
    });
 },[])

 
  useEffect(() => {
    $(document).on("click", ".switcher--tabs li a", function (e) {
        e.preventDefault();
        $(this).parent().siblings().find("a").removeClass("active");
        $(this).addClass("active");
  
        var form_tab_data = $(this).attr("data-id");
        $(".login--form").removeClass("active--from");
        $("#" + form_tab_data).addClass("active--from");
      });
  
      $(document).on("click", ".form--popup", function (e) {
        e.preventDefault();
        if ($(this).hasClass("signin--popup")) {
          $("#login--form").removeClass("active--from");
          $("#signin--form").addClass("active--from");
          $(".custom--popup").addClass("active--popup");
          $(".login--tab--item").removeClass("active");
          $(".signin--tab--item").addClass("active");
        } else {
          $("#signin--form").removeClass("active--from");
          $("#login--form").addClass("active--from");
          $(".custom--popup").addClass("active--popup");
          $(".signin--tab--item").removeClass("active");
          $(".login--tab--item").addClass("active");
        }
      });

  },[])
    
  return (
    <React.Fragment>
    <section className="best--describes">
    <div className="grid--container">
        <div className="grid">
            <div className="grid----">
                <div className="grid--wrapper">
                    <div className="describes--wrapper">
                        <div className="bold--heading--wrapper">
                            <div className="heading--big" data-aos="fade-up" data-aos-duration="1000">
                                <h2>best describes your needs?</h2>
                            </div>
                        </div>
                        <div className="describe-category--wrapper">
                            <div className="describe--category--items" data-aos="fade" data-aos-duration="1500">
                                <div className="describe--category--item active--cat--img" id="cat--1">
                                    <img src={require('../asstes/image/port--1.png')} alt=""/>
                                </div>
                                <div className="describe--category--item" id="cat--2">
                                    <img src={require('../asstes/image/port--2.png')} alt=""/>
                                </div>
                                <div className="describe--category--item" id="cat--3">
                                    <img src={require('../asstes/image/port--1.png')} alt=""/>
                                </div>
                                <div className="describe--category--item" id="cat--4">
                                    <img src={require('../asstes/image/port--2.png')} alt=""/>
                                </div>
                                <div className="describe--category--item" id="cat--5">
                                    <img src={require('../asstes/image/port--1.png')} alt=""/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="describe--categorys">
                        <div className="describe--categorys--list" data-aos="fade-up" data-aos-duration="1000">
                            <div className="describe--categorys--item" data-category="cat--1">
                                <h3>Construction</h3>
                                <p>Lorem ipsum dolor sit amet, conser sit amet, Lorem ipsum dolor sit.</p>
                                <a href="#" className="btn--arrow form--popup event--popup"></a>
                            </div>
                            <div className="describe--categorys--item" data-category="cat--2">
                                <h3>Special Events</h3>
                                <p>Lorem ipsum dolor sit amet, conser sit amet, Lorem ipsum dolor sit.</p>
                                <a href="#" className="btn--arrow form--popup event--popup"></a>
                            </div>
                            <div className="describe--categorys--item active--item" data-category="cat--3">
                                <h3>Disaster Relief</h3>
                                <p>Lorem ipsum dolor sit amet, conser sit amet, Lorem ipsum dolor sit.</p>
                                <a href="#" className="btn--arrow form--popup event--popup"></a>
                            </div>
                            <div className="describe--categorys--item" data-category="cat--4">
                                <h3>Long Term</h3>
                                <p>Lorem ipsum dolor sit amet, conser sit amet, Lorem ipsum dolor sit.</p>
                                <a href="#" className="btn--arrow form--popup event--popup"></a>
                            </div>
                            <div className="describe--categorys--item" data-category="cat--5">
                                <h3>Individual Needs</h3>
                                <p>Lorem ipsum dolor sit amet, conser sit amet, Lorem ipsum dolor sit.</p>
                                <a href="#" className="btn--arrow form--popup event--popup"></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
<EventPopupModal />
</React.Fragment>
  )
}

export default BestDescribe