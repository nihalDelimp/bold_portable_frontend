import React, { useState } from "react";
import { withoutAuthAxios } from "../config/config";
import { toast } from "react-toastify";
import ResetPassword from "./ResetPassword";
import { RootState } from "../Redux/rootReducer";
import { useSelector, useDispatch } from "react-redux";
import { setResetPassword } from "../Redux/Reducers/authSlice";
import { trimObjValues } from "../Helper";

function ForgotPassword() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({ email: "" });
  const { isResetPassword } = useSelector((state: RootState) => state.auth);
  const [userEmail, setUserEmail] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const requestPayload = trimObjValues(userData)
    setLoading(true);
    await withoutAuthAxios()
      .post("/auth/send-otp", requestPayload)
      .then(
        (response) => {
          setLoading(false);
          if (response.data.status === 1) {
            toast.success("OTP sent to your email address successfully");
            setUserEmail(response.data.data.email);
            dispatch(setResetPassword(true));
            setUserData({ email: "" });
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
      <section id="reset--password" className="static--popup">
      <span className="close--forgot">x</span>
        <div className="static--popup--wrapper">
          <div className="static--form active--from">
            <div className="static--form--wrapper">
              <div className="form--title">
                <h2>
                  {isResetPassword ? "Reset Password" : "Forgot password ?"}
                </h2>
              </div>
              {!isResetPassword && (
                <form onSubmit={handleSubmit}>
                  <div className="form--group span--2">
                    <label htmlFor="name">
                      Email <span className="required">*</span>
                    </label>
                    <input
                      required
                      value={userData.email}
                      onChange={handleChange}
                      type="email"
                      name="email"
                      placeholder="Enter your Email"
                    />
                  </div>
                  <div className="form--action">
                    <button type="submit" className="submit--from btn">
                      {loading ? "Loading.." : "Reset password"}
                    </button>
                  </div>
                </form>
              )}
              {isResetPassword && <ResetPassword userEmail={userEmail} />}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ForgotPassword;
