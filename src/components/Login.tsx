import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { withoutAuthAxios } from "../config/config";
import {
  setAccessToken,
  setIsAuthenticated,
  setuser,
} from "../Redux/Reducers/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { RootState } from "../Redux/rootReducer";
import { useAppDispatch } from "../Redux/store";
import { useFormik } from "formik";
import * as Yup from "yup";
import IsLoadingHOC from './../Common/IsLoadingHOC';

const Login = (props : any) => {
   const {setLoading} = props
  const navigate = useNavigate();
  const { accessToken } = useSelector((state: RootState) => state.auth);

  const dispatch = useAppDispatch();
  const [userInput, setUserInput] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (accessToken) {
      navigate("/products");
    }
  });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const payload = userInput;
    setLoading(true)
    await withoutAuthAxios()
      .post("/auth/login", payload)
      .then(
        (response) => {
          setLoading(false)
          if (response.data.status === 1) {
            toast.success("Logged in successfully");
            console.log("resposnse Data", response.data.data);
            dispatch(setAccessToken(response.data.data.token));
            dispatch(setuser(response.data.data.user));
            dispatch(setIsAuthenticated(true));
            navigate("/products");
          } else {
            toast.error(response.data.message);
          }
        },
        (error) => {
          setLoading(false)
          toast.error(error.response.data.message);
        }
      )
      .catch((error) => {
        console.log("errorrrr", error);
      });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="container mt-3 bg-light">
      <div className="row">
        <div className="mx-auto col-10 col-lg-8">
          <h3>Login </h3>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="inputEmail4">Email</label>
                <input
                  required
                  value={userInput.email}
                  onChange={handleChange}
                  type="email"
                  name="email"
                  className="form-control"
                  id="inputEmail4"
                  placeholder="Enter Email"
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="inputPassword4">Password</label>
                <input
                  required
                  type="password"
                  value={userInput.password}
                  name="password"
                  onChange={handleChange}
                  className="form-control"
                  id="inputPassword4"
                  placeholder="Password"
                />
              </div>
            </div>
            <div className="row">
              <Link className="" to="/signup">
                signup
              </Link>{" "}
              don't have account ?
              <div className="d-flex justify-content-center">
                <button type="submit" className="btn btn-success">
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default IsLoadingHOC(Login);
