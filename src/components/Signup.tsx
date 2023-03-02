import React, { useState } from "react";
import { withoutAuthAxios } from "../config/config";
import {
  setAccessToken,
  setIsAuthenticated,
  setuser,
} from "../Redux/Reducers/auth";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppDispatch } from "../Redux/store";

const Signup = () => {
  const dispatch = useAppDispatch();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
    user_type: "ADMIN",
  });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log("user", user);
    const payload = user;
    dispatch(setAccessToken("tbytoikentoken"));
    await withoutAuthAxios()
      .post("/auth/register", payload)
      .then(
        (response) => {
          if (response.data.status === 1) {
            toast.success("User registered successfully");
            dispatch(setAccessToken(response.data.data.token));
            dispatch(setuser(response.data.data.user));
            dispatch(setIsAuthenticated(true));
          } else {
            toast.error(response.data.message);
          }
        },
        (error) => {
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
    <div className="container mt-3">
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="inputEmail4">Name</label>
            <input
              required
              value={user.name}
              onChange={handleChange}
              type="text"
              name="name"
              className="form-control"
              id="inputEmail4"
              placeholder="Enter name"
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="inputEmail4">Email</label>
            <input
              required
              value={user.email}
              onChange={handleChange}
              type="email"
              name="email"
              className="form-control"
              id="inputEmail4"
              placeholder="Enter Email"
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="inputEmail4">Phone</label>
            <input
              required
              value={user.mobile}
              name="mobile"
              onChange={handleChange}
              type="number"
              className="form-control"
              id="inputEmail4"
              placeholder="Enter phone"
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="inputPassword4">Password</label>
            <input
              required
              type="password"
              value={user.password}
              name="password"
              onChange={handleChange}
              className="form-control"
              id="inputPassword4"
              placeholder="Password"
            />
          </div>
        </div>
        <div className="row">
          <Link className="" to="/">
            login
          </Link>{" "}
          have an account ?
          <div className="d-flex justify-content-center">
            <button type="submit" className="btn btn-success">
              Submit
            </button>{" "}
            <br />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Signup;
