import React, { useState } from "react";
import { withoutAuthAxios } from "../config/config";
import { toast } from "react-toastify";

interface myComponentProps {
  userEmail: string;
  hideResetForm: (isReset: boolean) => void;
}

function ResetPassword(props: myComponentProps) {
  const { userEmail, hideResetForm } = props;
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    email: userEmail,
    otp: "",
    password: "",
    confirm_password: "",
  });

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
      .post("/auth/reset-otp", payload)
      .then(
        (response) => {
          setLoading(false);
          if (response.data.status === 1) {
            toast.success(response.data.message);
            setUserData({
              email: "",
              otp: "",
              password: "",
              confirm_password: "",
            });
            const elements = document.getElementsByClassName("static--popup");
            const element = elements[0] as HTMLElement;
            if (element) {
              element.style.display = "none";
            }
            hideResetForm(false);
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
        <div className="form--group span--2">
          <label htmlFor="name">
            OTP <span className="required">*</span>
          </label>
          <input
            required
            value={userData.otp}
            onChange={handleChange}
            type="text"
            name="otp"
            placeholder="OTP"
          />
        </div>
        <div className="form--group span--2">
          <label htmlFor="name">
            Password <span className="required">*</span>
          </label>
          <input
            required
            minLength={8}
            value={userData.password}
            onChange={handleChange}
            type="password"
            name="password"
            placeholder="Password"
          />
        </div>
        <div className="form--group span--2">
          <label htmlFor="name">
            OTP <span className="required">*</span>
          </label>
          <input
            required
            minLength={8}
            value={userData.confirm_password}
            onChange={handleChange}
            type="password"
            name="confirm_password"
            placeholder="Confirm password"
          />
        </div>
        <div className="form--action">
          <button type="submit" className="submit--from btn">
            {loading ? "Loading.." : "Submit"}
          </button>
        </div>
      </form>
    </>
  );
}

export default ResetPassword;
