import React, { useState } from "react";
import "../styles/Signup.css";
import { withoutAuthAxios } from "../config/config";
import { toast } from "react-toastify";

function SignUpModal(props: any) {
  const { signupModal, handleSignUpModal } = props;

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
            handleSignUpModal();
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
    <div
      id="exampleModal"
      tabIndex={-1}
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
      className={`modal fade ${signupModal ? "show" : "hide"}`}
      style={{ display: signupModal ? "block" : "none", overflowY: "scroll" }}
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content p-4">
          <form onSubmit={handleSubmit}>
            <button
              onClick={handleSignUpModal}
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
                <span onClick={handleSignUpModal} aria-hidden="true">
                  Log in
                </span>
              </button>
            </div>
            <div className="modal-body form_modal">
              <h4 className="mb-4 text-center">Create New Account</h4>
              <div className="form-group">
                <input
                  required
                  value={user.name}
                  onChange={handleChange}
                  type="text"
                  name="name"
                  className="form-control p-0"
                  style={{ boxShadow: "none", borderRadius: "0px" }}
                />
                <label
                  className="form-control-placeholder p-0"
                  htmlFor="name lbl"
                >
                  Full Name
                </label>
              </div>
              <div className="form-group">
                <input
                  required
                  value={user.email}
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
                  value={user.mobile}
                  name="mobile"
                  onChange={handleChange}
                  type="number"
                  className="form-control p-0"
                  style={{ boxShadow: "none", borderRadius: "0px" }}
                />
                <label
                  className="form-control-placeholder p-0"
                  htmlFor="name lbl"
                >
                  Phone
                </label>
              </div>

              <div className="form-group">
                <input
                   required
                   type="password"
                   value={user.password}
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
                {loading ? "loading" : "SIGNUP"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUpModal;
