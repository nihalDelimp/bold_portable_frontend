import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { authAxios } from "../config/config";
import { toast } from "react-toastify";
import IsLoadingHOC from "../Common/IsLoadingHOC";

interface MyComponentProps {
  setLoading: (isComponentLoading: boolean) => void;
  isLoading: boolean;
}

function Services(props: MyComponentProps) {
  const { setLoading } = props;
  const [services, setServices] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemPerPage] = useState<number>(10);
  const [checked, setChecked] = useState(false)
  const handleClick = () => {
    setChecked(!checked)
  }

  console.log("Service", services);

  useEffect(() => {
    getServicesListData();
  }, [currentPage, itemsPerPage]);

  const getServicesListData = async () => {
    setLoading(true);
    await authAxios()
      .get(`/service/list?page=${currentPage}&limit=${itemsPerPage}`)
      .then(
        (response) => {
          setLoading(false);
          if (response.data.status === 1) {
            const resData = response.data.data;
            setServices(resData);
          }
        },
        (error) => {
          setLoading(false);
          toast.error(error.response.data?.message);
        }
      )
      .catch((error) => {
        console.log("errorrrr", error);
      });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const payload = {};
    setLoading(true);
    await authAxios()
      .post("/quotation/send-quotations-request", payload)
      .then(
        (response) => {
          setLoading(false);
          if (response.data.status === 1) {
            toast.success("Request sent Successfully");
            const resData = response.data.data;
          } else {
            toast.error(response.data?.message);
          }
        },
        (error) => {
          setLoading(false);
          if (error.response.data.message) {
            toast.error(error.response.data.message);
          } else {
            const obj = error.response.data.errors[0];
            const errormsg = Object.values(obj) || [];
            if (errormsg && errormsg.length > 0) {
              toast.error(`${errormsg[0]}`);
            }
          }
        }
      )
      .catch((error) => {
        console.log("errorrrr", error);
      });
  };

  return (
    <>
      <section className="default--top--banner">
        <div className="banner--thumbnuil">
          <img
            src={require("../asstes/image/about--banner.jpg")}
            alt="AboutUs"
          />
        </div>
        <div className="banner--heading">
          <h1>Servies</h1>
        </div>
      </section>
      <section className="servies--portable ">
        <div className="grid--container">
          <div className="grid">
            <div className="grid----">
              <div className="about--portable--wrapper">
                <div className="about--portable--data">
                  <p className="highlight--text">
                    GetLorem ipsum dolor sit amet, consectetuer adipiscing elit,
                    sed diam nonummy nibh euismod tincidunt ut laoreet dolore
                    magna aliquam erat volutpat. Ut wisi enim ad minim
                    veniamGetLorem ipsum dolor sit amet, consectetuer adipiscing
                    elit, sed diam nonummy nibh euismod tincidunt ut laoreet
                    dolore magna aliquam erat volutpat.
                  </p>
                  <p>
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit,
                    sed diam nonummy nibh euismod tincidunt ut laoreet dolore
                    magna aliquam erat volutpat. Ut wisi enim ad minim veniam,
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit,
                    sed diam nonummy nibh euismod tincidunt ut laoreet dolore
                    magna aliquam erat volutpat. Ut wisi enim ad minim veniam,
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit,
                    sed diam nonummy nibh euismod tincidunt ut laoreet dolore
                    magna aliquam erat volutpat. Ut wisi enim ad minim veniam,
                    sed diam nonummy nibh euismod tincidunt ut laoreet dolore
                    magna aliquam erat volutpat. Ut wisi enim ad minim veniam,
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="services--tabs">
        <div className="grid--container">
          <div className="grid">
            <div className="grid-">
              <div className="servies--list--tab">
                <ul>
                  <li>
                    <Link to={`#`}>Construction</Link>
                  </li>
                  <li>
                    <Link to={`#`} className="active">
                      Special Events
                    </Link>
                  </li>
                  <li>
                    <Link to={`#`}>Disaster Relief</Link>
                  </li>
                  <li>
                    <Link to={`#`}>Long Term</Link>
                  </li>
                  <li>
                    <Link to={`#`}>Individual Needs</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="grid---">
              <div className="servies--list--content">
                <div className="services--list--content--item">
                  <p>
                    GetLorem ipsum dolor sit amet, consadaectetuer adipisciaang
                    elit, sed daiam nonummy nibh euismod tincidunt ut laoreet
                    dolore magna aliquam erat volutpat. Ut wisi{" "}
                  </p>
                  <ul className="servies--inner--links">
                    <li>
                    <label htmlFor="Wedding" className="service--label">
                        <input type="checkbox" id="Wedding" name="Wedding" />
                        <span>Wedding</span>
                    </label>
                    </li>
                    <li>
                        <label htmlFor="EventEvening" className="service--label">
                            <input type="checkbox" id="EventEvening" name="EventEvening" />
                            <span>Event Evening</span>
                        </label>
                    </li>
                    <li>
                        <label htmlFor="LoremIspum" className="service--label">
                            <input type="checkbox" id="LoremIspum" name="LoremIspum" />
                            <span>Lorem Ispum</span>
                        </label>
                    </li>
                    <li>
                        <label htmlFor="DollerSit" className="service--label">
                            <input type="checkbox" id="DollerSit" name="DollerSit" />
                            <span>Doller Sit</span>
                        </label>
                    </li>
                    <li>
                        <label htmlFor="other" className="service--label">
                            <input onClick={handleClick} checked={checked} type="checkbox" id="other" name="other" />
                            <span>Other</span>
                        </label>
                    </li>
                  </ul>
                  <div className="service--action">
                      <div className="service--action--wrapper">
                       {  
                        checked && <input type="text" placeholder="Add" />
                       }
                        
                        <button className={checked ? "btn black--btn btn--radius" : "btn black--btn"}>Submit</button>
                      </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="we--committed">
        <div className="grid--container">
          <div className="grid">
            <div className="grid--">
              <div className="we--commited--data">
                <h2>Bold Portable</h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
                  diam nonummy nibh euismod tincidunt ut laoreet dolore magna
                  aliquam erat volutpat. Ut wisi enim ad minim veniam, Lorem
                  ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
                  nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam
                  erat volutpat. Ut wisi enim ad minim veniam, Lorem ipsum dolor
                  sit amet, consectetuer adipiscing elit.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
                  diam nonummy nibh euismod tincidunt ut laoreet dolore magna
                  aliquam erat volutpat. Ut wisi enim ad minim veniam, Lorem
                  ipsum dolor sit amet, consectetuer adipiscing
                </p>
              </div>
            </div>
            <div className="grid--">
              <div className="we--commited--list">
                <ul>
                  <li>
                    <div className="we--commited--item">
                      <div className="icons">
                        <img
                          src={require("../asstes/image/Efficiency.png")}
                          alt="Efficiency"
                        />
                      </div>
                      <div className="we--commited--text">
                        <h3>Efficiency</h3>
                        <p>
                          Lorem ipsum dolor sit amet, consectetuer adipiscing
                          elit, sed diam nonummy nibh euismod tincidunt ut
                          laoreet dolore ma aliquam erat volutpat. Ut wisi enim
                          ad minim veniam.
                        </p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="we--commited--item">
                      <div className="icons">
                        <img
                          src={require("../asstes/image/Simplicity.png")}
                          alt="Simplicity"
                        />
                      </div>
                      <div className="we--commited--text">
                        <h3>Simplicity</h3>
                        <p>
                          Lorem ipsum dolor sit amet, consectetuer adipiscing
                          elit, sed diam nonummy nibh euismod tincidunt ut
                          laoreet dolore ma aliquam erat volutpat. Ut wisi enim
                          ad minim veniam.
                        </p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="we--commited--item">
                      <div className="icons">
                        <img
                          src={require("../asstes/image/Technology.png")}
                          alt="Technology"
                        />
                      </div>
                      <div className="we--commited--text">
                        <h3>Technology</h3>
                        <p>
                          Lorem ipsum dolor sit amet, consectetuer adipiscing
                          elit, sed diam nonummy nibh euismod tincidunt ut
                          laoreet dolore ma aliquam erat volutpat. Ut wisi enim
                          ad minim veniam.
                        </p>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default IsLoadingHOC(Services);
