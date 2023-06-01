import React, { useState } from "react";
import { withoutAuthAxios } from "../config/config";
import { toast } from "react-toastify";

interface myComponentProps {
  userEmail: string;
}

function ResetPassword(props: myComponentProps) {
  const { userEmail } = props;
  const [loading, setLoading] = useState(false);
  const [isSendingOTP, setSendingOTP] = useState(false);
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

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const { password, confirm_password } = userData;
    if (password && password.length < 8) {
      toast.error("Password must be at least 8 characters");
    } else if (password !== confirm_password) {
      toast.error("Password did not match");
    } else {
      const payload = userData;
      setLoading(true);
      await withoutAuthAxios()
        .post("/auth/reset-password", payload)
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
    }
  };

  const handleResendOTP = async (event: React.FormEvent) => {
    event.preventDefault();
    const payload = { email: userEmail };
    setSendingOTP(true);
    await withoutAuthAxios()
      .post("/auth/send-otp", payload)
      .then(
        (response) => {
          setSendingOTP(false);
          if (response.data.status === 1) {
            toast.success("OTP sent to your email address successfully");
          } else {
            toast.error(response.data?.message);
          }
        },
        (error) => {
          setSendingOTP(false);
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
            disabled
            value={userData.email}
            onChange={handleChange}
            type="email"
            name="email"
            placeholder="Email"
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
            Confirm password <span className="required">*</span>
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
            {loading ? "Loading..." : "Submit"}
          </button>
        </div>
        <div className="form--group span--2 y--center back--form--btn">
          <span className="reset--back" onClick={handleResendOTP}>
            {isSendingOTP ? "Sending..." : "Resend OTP"}
          </span>
        </div>
      </form>
    </>
  );
}

export default ResetPassword;
