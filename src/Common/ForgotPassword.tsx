import React, { useState } from "react";
import { withoutAuthAxios } from "../config/config";
import { toast } from "react-toastify";
import ResetPassword from "./ResetPassword";

function ForgotPassword() {
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    email: "",
  });

  const [resetPassword, setResetPassword] = useState(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleResetLogin = () => {
    const elements = document.getElementsByClassName("login--form--active");
    const element = elements[0] as HTMLElement;
    if (element) {
      element.style.display = "block";
    }

    const reset_forms = document.getElementsByClassName("reset--form");
    const reset_form = reset_forms[0] as HTMLElement;
    if (reset_form) {
      reset_form.style.display = "none";
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const payload = userData;
    setLoading(true);
    await withoutAuthAxios()
      .post("/auth/send-otp", payload)
      .then(
        (response) => {
          setLoading(false);
          if (response.data.status === 1) {
            toast.success(response.data.message);
            setResetPassword(true);
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
        <div className="static--popup--wrapper">
          <div className="static--form active--from">
            <div className="static--form--wrapper">
              <div className="form--title">
                <h2>{resetPassword ? 'Reset Password' : 'Forgot password ?'}</h2>
              </div>
              {!resetPassword && (
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
              {resetPassword && (
                <ResetPassword
                  userEmail = {userData.email}
                  hideResetPassword={(isResetForm) => setResetPassword(isResetForm)}
                />
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ForgotPassword;
