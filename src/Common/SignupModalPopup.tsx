import React, { useState } from "react";
import { withoutAuthAxios } from "../config/config";
import { toast } from "react-toastify";

function SignupModalPopup() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
    user_type: "USER",
  });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log("user", user);
    const payload = user;
    setLoading(true);
    await withoutAuthAxios()
      .post("/auth/register", payload)
      .then(
        (response) => {
          setLoading(false);
          if (response.data.status === 1) {
            toast.success("Registration successfully");
            setUser({
              name: "",
              email: "",
              password: "",
              mobile: "",
              user_type: "USER",
            });
            // document
            //   .querySelector(".custom--popup")
            //   ?.classList.remove("active--popup");
          } else {
            toast.error(response.data.message);
          }
        },
        (error) => {
          setLoading(false);
          toast.error(error.response.data.message);
          console.log(error);
        }
      )
      .catch((error) => {
        console.log("errorrrr", error);
      });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <div className="login--form" id="signin--form">
        <div className="login--form--wrapper">
          <form onSubmit={handleSubmit}>
            <div className="form--group">
              <label htmlFor="name">
                Name <span className="required">*</span>
              </label>
              <input
                required
                value={user.name}
                onChange={handleChange}
                type="text"
                name="name"
                placeholder="Name"
              />
            </div>
            <div className="form--group">
              <label htmlFor="Email">
                Email <span className="required">*</span>
              </label>
              <input
                required
                value={user.email}
                onChange={handleChange}
                type="email"
                name="email"
                placeholder="Email"
              />
            </div>
            <div className="form--group">
              <label htmlFor="phone">
                Phone <span className="required">*</span>
              </label>
              <input
                required
                value={user.mobile}
                name="mobile"
                onChange={handleChange}
                type="number"
                placeholder="Phone"
              />
            </div>
            <div className="form--group">
              <label htmlFor="password">
                Password <span className="required">*</span>
              </label>
              <input
                required
                type="password"
                value={user.password}
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
                <span>
                  Your personal data will be used to support your experience{" "}
                </span>
              </label>
            </div>
            <div className="form--action">
              <button type="submit" className="submit--from btn">
                {loading ? "Loading.." : "Sign Up"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignupModalPopup;
