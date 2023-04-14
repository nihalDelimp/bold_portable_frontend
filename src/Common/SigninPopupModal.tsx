import React, { useState } from "react";
import SignupPopupModal from "./SignupPopupModal";
import {
  setAccessToken,
  setIsAuthenticated,
  setuser,
} from "../Redux/Reducers/authSlice";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { withoutAuthAxios } from "../config/config";

function SigninPopupModal() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

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

  return (
    <>
      <section className="custom--popup">
        <div className="custom--popup--wrapper">
          <div className="switcher--tabs">
            <ul>
              <li>
                <a
                  href=""
                  data-id="login--form"
                  className="btn login--tab--item active"
                >
                  Login
                </a>
              </li>
              <li>
                <a
                  href=""
                  data-id="signin--form"
                  className="btn signin--tab--item"
                >
                  Sign Up
                </a>
              </li>
            </ul>
          </div>
          <div className="login--form active--from" id="login--form">
            <div className="login--form--wrapper">
              <form onSubmit={handleSubmit}>
                <div className="form--group">
                  <label htmlFor="Email">
                    Email <span className="required">*</span>
                  </label>
                  <input
                    required
                    value={userInput.email}
                    onChange={handleChange}
                    type="email"
                    name="email"
                    placeholder="Email"
                  />
                </div>
                <div className="form--group">
                  <label htmlFor="password">
                    Password <span className="required">*</span>
                  </label>
                  <input
                    required
                    type="password"
                    value={userInput.password}
                    name="password"
                    onChange={handleChange}
                    placeholder="Password"
                  />
                </div>
                <div className="form--checkbox">
                  <label htmlFor="rememberme">
                    <input
                      className=""
                      name="rememberme"
                      type="checkbox"
                      id="rememberme"
                    />{" "}
                    <span>Remember me</span>
                  </label>
                  <span className="lost--password">
                    <a href="#">Lost your password?</a>
                  </span>
                </div>
                <div className="form--action">
                  <button type="submit" className="submit--from btn">
                    {loading ? "Loading.." : "Login"}
                  </button>
                </div>
              </form>
            </div>
          </div>
          <SignupPopupModal />
        </div>
      </section>
    </>
  );
}

export default SigninPopupModal;
