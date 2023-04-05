import React, { useEffect } from 'react'
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";



const AboutUs = () => {

   useEffect(()=>{
    gsap.registerPlugin(ScrollTrigger); 

    var rotate = gsap.timeline({
        scrollTrigger:{
          trigger: ".hero--banner",
          pin: false,
          scrub:1,
          start: 'bottom bottom',
          end:'+=1000',
        }
      })
      .to('.left--sq--box', {
        rotation:25,
        duration:1, ease:'none',
      });
      
      var rotate2 = gsap.timeline({
          scrollTrigger:{
            trigger: ".hero--banner",
            pin: false,
            scrub:1,
            start: 'bottom bottom',
            end:'+=1000',
          }
        })
        .to('.right--sq--box', {
          rotation:-25,
          duration:1, ease:'none',
        })
   },[])

  return (
    <section className="about--us">
    <div className="grid">
        <div className="grid----">
            <div className="grid--wrapper">
                <div className="about--us--wrapper">
                    <div className="left--sq--box"></div>
                    <div className="about--us--content">
                        <div className="title--heading">
                            <h3 data-aos="fade-up" data-aos-duration="1000">About Us</h3>
                            <h2 data-aos="fade-up" data-aos-duration="1000">Customers First, Always!</h2>
                        </div>
                        <p data-aos="fade-up" data-aos-duration="1000">GetLorem ipsum dolor sit amet, consectetuer adipiscing elit, 
                            sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna
                             aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci
                              tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
                        </p>
                        <a href="#" className="btn btn--primary" data-aos="fade-up" data-aos-duration="1000">More About Us</a>
                        <div className="line--1"></div> 
                    </div>
                    <div className="right--sq--box"></div>
                </div>
            </div>
        </div>
    </div>
</section>
  )
}

export default AboutUs