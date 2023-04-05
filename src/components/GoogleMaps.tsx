import React from 'react'

const GoogleMaps = () => {
  return (
    <section className="form--services">
    <div className="grid">
        <div className="p--0 grid----">
            <div className="grid--wrapper">
                <div className="map--wrapper">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d99029.84505283511!2d-84.61044109524899!3d39.13645224401073!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x884051b1de3821f9%3A0x69fb7e8be4c09317!2sCincinnati%2C%20OH%2C%20USA!5e0!3m2!1sen!2sin!4v1680159428717!5m2!1sen!2sin" width="100%"  style={{border:"0px"}}  loading="lazy"  allowFullScreen></iframe>

                </div>
                <div className="from--wrapper">
                    <div className="from--tabs">
                        <ul data-aos="fade-up" data-aos-duration="1000">
                            <li className="active--form--tab">
                                <div className="tabs--item" >
                                    <div className="icon"><img src={require('../asstes/image/house--1.svg').default} alt=""/></div>
                                    <h4>Residential Services</h4>
                                </div>
                            </li>
                            <li>
                                <div className="tabs--item">
                                    <div className="icon"><img src={require('../asstes/image/house--1.svg').default} alt=""/></div>
                                    <h4>Business Services</h4>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="from--tabs--content">
                        <div className="form--group" data-aos="fade-up" data-aos-duration="1000">
                            <input type="text" placeholder="Enter zip code"/>
                            <div className="btn btn--submit"><button type="button">Search</button></div>
                        </div>
                        <div className="current--location" data-aos="fade-up" data-aos-duration="1000">
                            <span className="icon"><img src={require('../asstes/image/house--1.svg').default} alt="location"/></span>
                            <h5>Use my current location</h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
  )
}

export default GoogleMaps