import React, { useState, useEffect } from "react";
import {
  setAccessToken,
  setIsAuthenticated,
  setuser,
} from "../Redux/Reducers/authSlice";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { authAxios, withoutAuthAxios } from "../config/config";

function EventPopupModal() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const [events, setEventsData] = useState<any>({});

  useEffect(() => {
    getSpecificNotification();
  }, []);

  const getSpecificNotification = async () => {
    setLoading(true);
    await authAxios()
      .get(`/notification/get-specific-unseen-notfications/`)
      .then(
        (response) => {
          setLoading(false);
          if (response.data.status === 1) {
            console.log(response.data);
            setEventsData(response.data.data);
          }
        },
        (error) => {
          setLoading(false);
          toast.error(error.response.data.message);
        }
      )
      .catch((error) => {
        console.log("errorrrr", error);
      });
  };

  const [userInput, setUserInput] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const payload = userInput;
    setLoading(true);
    await withoutAuthAxios()
      .post("/auth/login", payload)
      .then(
        (response) => {
          setLoading(false);
          if (response.data.status === 1) {
            toast.success("Logged in successfully");
            console.log("resposnse Data", response.data.data);
            dispatch(setAccessToken(response.data.data.token));
            dispatch(setuser(response.data.data.user));
            dispatch(setIsAuthenticated(true));
            setUserInput({ email: "", password: "" });
            document
              .querySelector(".custom--popup")
              ?.classList.remove("active--popup");
          } else {
            toast.error(response.data.message);
          }
        },
        (error) => {
          setLoading(false);
          toast.error(error.response.data.message);
        }
      )
      .catch((error) => {
        console.log("errorrrr", error);
      });
  };

  const closeModal = () => {
    document.querySelector(".custom--popup")?.classList.remove("active--popup");
  };

  return (
    <>
      <section className="custom--popup">
        <div className="custom--popup--wrapper">
          <div className="switcher--tabs">
            <h3 className="text-center mt-4">Events</h3>
          </div>
          <div className="login--form active--from" id="event--form">
            <div className="login--form--wrapper">
              <form>
                <div className="form--group">
                  <label htmlFor="Email">
                    Event Name <span className="required"></span>
                  </label>
                  <input
                    required
                    // value={userInput.email}
                    // onChange={handleChange}
                    type="email"
                    name="email"
                    placeholder="Event Name"
                  />
                </div>
                <div className="form--group">
                  <label htmlFor="password">
                   Event Type <span className="required"></span>
                  </label>
                  <input
                    required
                    type="password"
                    // value={userInput.password}
                    // name="password"
                    // onChange={handleChange}
                    placeholder="Event Type"
                  />
                </div>
                <div className="form--action">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="submit--from btn"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default EventPopupModal;
