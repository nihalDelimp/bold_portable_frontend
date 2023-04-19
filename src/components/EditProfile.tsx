import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "../assets/css/userProfile.css";
import IsLoadingHOC from "../Common/IsLoadingHOC";
import { authAxios } from "../config/config";
import { setuser } from "../Redux/Reducers/authSlice";
import { RootState } from "../Redux/rootReducer";
import {
  acceptedFileTypes,
  acceptedFileTypesArray,
  imageMaxSize,
} from "../Helper/constants";

function EditProfile(props: any) {
  const { user, accessToken } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const { setLoading } = props;
  const params = useParams();
  const [currentImage, setCurrentImage] = useState("");
  const [selectedImage, setSelectedImage] = useState<File>();
  const [prevImage, setPrevImage] = useState("");

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    mobile: "",
  });

  useEffect(() => {
    getuserProfileData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const payload = userData;
    setLoading(true);
    await authAxios()
      .post("/auth/update-user-profile", payload)
      .then(
        (response) => {
          setLoading(false);
          if (response.data.status === 1) {
            toast.success("Profile updated successfully");
            const user = response.data.data;
            dispatch(setuser(user));
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

  const updateProfileImage = async (event: React.FormEvent) => {
    event.preventDefault();
    let formData = new FormData();
    if (selectedImage) {
      formData.append("profile_picture", selectedImage);
    }
    setLoading(true);
    await authAxios()
      .put("/auth/update-profile-image", formData)
      .then(
        (response) => {
          setLoading(false);
          if (response.data.status === 1) {
            toast.success("Profile updated successfully");
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

  const getuserProfileData = async () => {
    setLoading(true);
    await authAxios()
      .get(`/auth/get-specific-user/${params.id}`)
      .then(
        (response) => {
          setLoading(false);
          if (response.data.status === 1) {
            const resData = response.data.data;
            const userFields = ["name", "email", "mobile"];
            userFields.forEach((field) => {
              setUserData((prev) => ({
                ...prev,
                [field]: resData[field],
              }));
            });
            if (resData.profile_picture) {
              setPrevImage(resData.profile_picture);
            }
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

  const verifyFile = (files: any) => {
    if (files && files.length > 0) {
      const currentFile = files[0];
      const currentFileType = currentFile.type;
      const currentFileSize = currentFile.size;
      if (!acceptedFileTypesArray.includes(currentFileType)) {
        toast.error("This file is not allowed. Only images are allowed.");
        return false;
      }
      if (currentFileSize > imageMaxSize) {
        toast.error(
          "This file is not allowed. " + currentFileSize + " bytes is too large"
        );
        return false;
      }
      return true;
    }
  };

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const isVerified = verifyFile(files);
      if (isVerified) {
        let previewImage = URL.createObjectURL(files[0]);
        setPrevImage("");
        setCurrentImage(previewImage);
        setSelectedImage(files[0]);
      }
    }
  };

  return (
    <div className="container">
      <div className="row gutters">
        <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
          <div className="card h-100">
            <div className="card-body">
              <div className="account-settings">
                <div className="user-profile">
                  <div className="user-avatar">
                    {prevImage ? (
                      <img
                        src={`${process.env.REACT_APP_BASEURL}/${prevImage}`}
                        alt="user_profile"
                      />
                    ) : currentImage ? (
                      <img src={currentImage} alt="user_profile" />
                    ) : (
                      <img
                        src="https://bootdey.com/img/Content/avatar/avatar7.png"
                        alt="Maxwell Admin"
                      />
                    )}
                    <div className="form-group">
                      <label htmlFor="fullName">Select profile</label>
                      <input
                        className="form-control"
                        onChange={handleChangeImage}
                        accept={acceptedFileTypes}
                        type="file"
                      ></input>
                    </div>
                  </div>
                  <h5 className="user-name">{user.name}</h5>
                  <h6 className="user-email">{user.email}</h6>
                </div>
                <div className="about">
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={updateProfileImage}
                  >
                    Update profile
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
          <div className="card h-100">
            <form onSubmit={handleSubmit}>
              <div className="card-body">
                <div className="row gutters">
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <h6 className="mb-2 text-primary">Personal Details</h6>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      <label htmlFor="fullName">Full Name</label>
                      <input
                        type="text"
                        className="form-control"
                        required
                        onChange={handleChange}
                        name="name"
                        value={userData.name}
                        id="fullName"
                        placeholder="Enter full name"
                      />
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      <label htmlFor="eMail">Email</label>
                      <input
                        type="email"
                        disabled
                        className="form-control"
                        required
                        onChange={handleChange}
                        name="email"
                        value={userData.email}
                        placeholder="Enter email ID"
                      />
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      <label htmlFor="phone">Phone</label>
                      <input
                        type="text"
                        disabled
                        className="form-control"
                        onChange={handleChange}
                        name="mobile"
                        value={userData.mobile}
                        placeholder="Enter phone number"
                      />
                    </div>
                  </div>
                </div>
                {/* <div className="row gutters">
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                  <h6 className="mt-3 mb-2 text-primary">Address</h6>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                  <div className="form-group">
                    <label htmlFor="Street">Street</label>
                    <input
                      type="name"
                      className="form-control"
                      id="Street"
                      placeholder="Enter Street"
                    />
                  </div>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                  <div className="form-group">
                    <label htmlFor="ciTy">City</label>
                    <input
                      type="name"
                      className="form-control"
                      id="ciTy"
                      placeholder="Enter City"
                    />
                  </div>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                  <div className="form-group">
                    <label htmlFor="sTate">State</label>
                    <input
                      type="text"
                      className="form-control"
                      id="sTate"
                      placeholder="Enter State"
                    />
                  </div>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                  <div className="form-group">
                    <label htmlFor="zIp">Zip Code</label>
                    <input
                      type="text"
                      className="form-control"
                      id="zIp"
                      placeholder="Zip Code"
                    />
                  </div>
                </div>
              </div> */}
                <div className="row gutters">
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <div className="text-right">
                      <button type="button" className="btn btn-secondary mr-2">
                        Cancel
                      </button>
                      <button type="submit" className="btn btn-success">
                        Update
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IsLoadingHOC(EditProfile);
