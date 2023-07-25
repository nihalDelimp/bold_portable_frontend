import React, { useState, useEffect } from "react";
import { withoutAuthAxios } from "../config/config";
import { toast } from "react-toastify";
import { trimObjValues } from "../Helper";

interface myComponentProps {
  userEmail: string;
}

function ResetPassword(props: myComponentProps) {
  const { userEmail } = props;
  const [loading, setLoading] = useState(false);
  const [isSendingOTP, setSendingOTP] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [userData, setUserData] = useState({
    email: userEmail,
    otp: "",
    password: "",
    confirm_password: "",
  });

  useEffect(() => {
    setUserData((prev) => ({
      ...prev,
      email: userEmail,
    }));
  }, [userEmail]);

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
    const { password, confirm_password } = requestPayload;
    if (password && password.length < 8) {
      toast.error("Password must be at least 8 characters");
    } else if (password !== confirm_password) {
      toast.error("Password did not match");
    } else {
      setLoading(true);
      await withoutAuthAxios()
        .post("/auth/reset-password", requestPayload)
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
            Please check your email for a one time code. <span className="required">*</span>
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
        <div className="form--group span--2 password--container">
          <label htmlFor="name">
            Password <span className="required">*</span>
          </label>
          <a
            className={`form-icon form-icon-right passcode-switch password-hide--show lg ${showPassword ? "is-hiden" : "is-shown"
              } `}
            onClick={() => setShowPassword(!showPassword)}
            data-target="password"
          >
            {showPassword ? (
              <em className="passcode-icon icon-show icon ni ni-eye"></em>
            ) : (
              <em className="passcode-icon icon-hide icon ni ni-eye-off"></em>
            )}
          </a>
          <input
            required
            minLength={8}
            value={userData.password}
            onChange={handleChange}
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
          />
        </div>
        <div className="form--group span--2 password--container">
          <label htmlFor="name">
            Confirm password <span className="required">*</span>
          </label>
          <a
            className={`form-icon form-icon-right passcode-switch password-hide--show lg ${showConfirmPassword ? "is-hiden" : "is-shown"
              } `}
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            data-target="password"
          >
            {showConfirmPassword ? (
              <em className="passcode-icon icon-show icon ni ni-eye"></em>
            ) : (
              <em className="passcode-icon icon-hide icon ni ni-eye-off"></em>
            )}
          </a>
          <input
            required
            minLength={8}
            value={userData.confirm_password}
            onChange={handleChange}
            type={showConfirmPassword ? "text" : "password"}
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
