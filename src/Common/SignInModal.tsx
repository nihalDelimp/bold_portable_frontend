import React, { useState } from "react";
import "../styles/Signup.css";
import {
  setAccessToken,
  setIsAuthenticated,
  setuser,
} from "../Redux/Reducers/authSlice";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { withoutAuthAxios } from "../config/config";
import SignUpModal from "./SignUpModal";


function SignInModal(props: any) {
  const { signinModal, handleSigninModal } = props;

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [signupModal, setSignupModal] = useState(false);

  const [userInput, setUserInput] = useState({
    email: "",
    password: "",
  });

  const handleSignUpModal = () => {
    setSignupModal(!signupModal)
   // handleSigninModal()
  }

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

            document.querySelector(".custom--popup")?.classList.remove("active--popup");




            handleSigninModal()
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
    <div
      id="exampleModal"
      tabIndex={-1}
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
      className={`modal fade ${signinModal ? "show" : "hide"}`}
      style={{ display: signinModal ? "block" : "none", overflowY: "scroll" }}
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content p-4">
          <form onSubmit={handleSubmit}>
            <button
              onClick={handleSigninModal}
              type="button"
              className="close x"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
            <div className="modal-header border-0 mb-2">
              <h4 className="modal-title" id="exampleModalLabel">
                Bold Portable
              </h4>
              <button type="button" className="close" aria-label="Close">
                <span onClick={handleSignUpModal} aria-hidden="true">Sign up</span>
              </button>
            </div>
            <div className="modal-body form_modal">
              <h4 className="mb-4  text-center">Login your Account</h4>
              <div className="form-group">
                <input
                  required
                  value={userInput.email}
                  onChange={handleChange}
                  type="email"
                  name="email"
                  className="form-control p-0"
                  style={{ boxShadow: "none", borderRadius: "0px" }}
                />
                <label className="form-control-placeholder p-0" htmlFor="name">
                  Email
                </label>
              </div>
              <div className="form-group">
                <input
                  required
                  type="password"
                  value={userInput.password}
                  name="password"
                  onChange={handleChange}
                  className="form-control p-0"
                  style={{ boxShadow: "none", borderRadius: "0px" }}
                />
                <label
                  className="form-control-placeholder p-0"
                  htmlFor="password"
                >
                  Password
                </label>
              </div>

              <label className="tc">
                By signing up I accept the <strong>Terms & Conditions</strong>{" "}
                of Daily
              </label>
            </div>
            <div className="modal-footer border-0 mb-4">
              <button
                type="submit"
                className="btn signup col-6 col-md-6"
                data-dismiss="modal"
              >
                {loading ? "signing in..." : "SIGNIN"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    {signupModal && <SignUpModal signupModal = {signupModal} handleSignUpModal = {handleSignUpModal} />}
    </>
  );
}

export default SignInModal;
