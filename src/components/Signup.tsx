import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { withoutAuthAxios } from "../config/config";
import {
  setAccessToken,
  setIsAuthenticated,
  setuser,
} from "../Redux/Reducers/auth";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Signup = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    mobile: ""
  });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log("user" , user)
    const payload =  user
    return new Promise(async (resolve, reject) => {
      dispatch(setAccessToken("tbytoikentoken"));
      await withoutAuthAxios().post("/auth/register", payload)
        .then(
          (response) => {
            resolve(response.data);
            if (response.data.status === "1") {
              toast.success('User registered successfully')
              dispatch(setAccessToken(response.data.access_token));
              dispatch(setuser(response.data.user));
              dispatch(setIsAuthenticated(true));
            }
            else{
              toast.error(response.data.message)
            }
          },
          (error) => {
            reject(error);
          }
        )
        .catch((error) => {
          console.log("errorrrr", error);
        });
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
            value={user.mobile}
            name="mobile"
            onChange={handleChange}
            type="text"
            className="form-control"
            id="inputEmail4"
            placeholder="Enter phone"
          />
        </div>

        <div className="form-group col-md-6">
          <label htmlFor="inputPassword4">Password</label>
          <input
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
      <div className="row mt-3">
      <Link className="ml-4" to = "/login">login</Link> have an account ?
      <div className="pb-5 d-flex justify-content-center">
        <button type="submit" className="btn btn-success mr-3 ml-3 ">
          Submit
        </button> <br/>
      </div>
      </div>
    </form>
    </div>
  );
};

export default Signup;
