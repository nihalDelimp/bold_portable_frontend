import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authAxios } from "../config/config";
import IsLoadingHOC from "../Common/IsLoadingHOC";
import { toast } from "react-toastify";
import { logout } from "../Redux/Reducers/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../Redux/rootReducer";
import { CapitalizeFirstLetter, setFormatDate } from "../Helper";
import {
  acceptedFileTypes,
  acceptedFileTypesArray,
  imageMaxSize,
} from "../Helper/constants";

interface MyComponentProps {
  setLoading: (isComponentLoading: boolean) => void;
  isLoading: boolean;
}

function ProfileSetting(props: MyComponentProps) {
  const { setLoading, isLoading } = props;
  const [isEditAble, setEditAble] = useState<boolean>(false);
  const { user, accessToken } = useSelector((state: RootState) => state.auth);
  const [currentImage, setCurrentImage] = useState("");
  const [selectedImage, setSelectedImage] = useState<File>();
  const [prevImage, setPrevImage] = useState("");

  useEffect(() => {
    getuserProfileData();
  }, []);

  const getuserProfileData = async () => {
    setLoading(true);
    await authAxios()
      .get(`/auth/get-specific-user/${user._id}`)
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
          toast.error(error.response.data?.message);
        }
      )
      .catch((error) => {
        console.log("errorrrr", error);
      });
  };

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    mobile: "",
    new_password: "",
    confirm_password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const updateProfileImage = async (profileImage: any) => {
    if (profileImage) {
      let formData = new FormData();
      formData.append("profile_picture", profileImage);
      setLoading(true);
      await authAxios()
        .put("/auth/update-profile-image", formData)
        .then(
          (response) => {
            setLoading(false);
            if (response.data.status === 1) {
              toast.success("Profile updated successfully");
            } else {
              toast.error(response.data?.message);
            }
          },
          (error) => {
            setLoading(false);
            toast.error(error.response?.data?.message);
          }
        )
        .catch((error) => {
          console.log("errorrrr", error);
        });
    }
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
        updateProfileImage(files[0]);
        //setSelectedImage(files[0]);
      }
    }
  };

  const updateProfileData = async (event: React.FormEvent) => {
    event.preventDefault();
    const { name, mobile, new_password, confirm_password } = userData;
    if (new_password && new_password.length < 8) {
      toast.error("Password must be at least 8 characters");
    } else if (new_password !== confirm_password) {
      toast.error("Password did not match");
    } else {
      const payload = {
        name: name,
        mobile: mobile,
        password: new_password,
      };
      setLoading(true);
      await authAxios()
        .post(`/user/save-profile`, payload)
        .then(
          (response) => {
            setLoading(false);
            if (response.data.status === 1) {
              toast.success("Profile updated successfully");
              setUserData((prev) => ({
                ...prev,
                new_password: "",
                confirm_password: "",
              }));
            } else {
              toast.error(response.data?.messsage);
            }
          },
          (error) => {
            setLoading(false);
            if (error.response.status === 401) {
              console.log("Your session has expired. Please sign in again");
            }
            setLoading(false);
          }
        )
        .catch((error) => {
          console.log("errorrrr", error);
        });
    }
  };

  return (
    <>
      <div className="setting--content">
        <div className="dashboard--content--title">
          <h2>
            <span>Settings</span>{" "}
            <span
              onClick={() => setEditAble(!isEditAble)}
              className="edit--setting"
            >
              <i className="fa-solid fa-user-pen"></i>
            </span>
          </h2>
        </div>
        <div className="setting--content--wrapper">
          <div className="table--title">
            <span>Profile Details</span>
          </div>
          <div className="user--profile">
            <div className="user--image">
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
              {/* <img src={require("../asstes/image/author1.png")} alt="" /> */}
            </div>
            <div className="change--profile--link">
              <a href="#">
                <input
                  disabled={!isEditAble}
                  className="form-control"
                  onChange={handleChangeImage}
                  accept={acceptedFileTypes}
                  type="file"
                ></input>
                Change Image
              </a>
            </div>
          </div>
          <div className="user--profile--form">
            <form onSubmit={updateProfileData}>
              <div className="form--wrapper">
                <div className="form--group">
                  <label htmlFor="">Name</label>
                  <input
                    required
                    minLength={5}
                    disabled={!isEditAble}
                    type="text"
                    placeholder="Name"
                    value={userData.name}
                    name="name"
                    onChange={handleChange}
                  />
                </div>
                <div className="form--group">
                  <label htmlFor="">Email</label>
                  <input
                    required
                    disabled
                    type="email"
                    placeholder="Email"
                    value={userData.email}
                    name="email"
                    onChange={handleChange}
                  />
                </div>
                <div className="form--group">
                  <label htmlFor="">Phone</label>
                  <input
                    required
                    min={0}
                    minLength={5}
                    disabled={!isEditAble}
                    type="number"
                    placeholder="Phone"
                    value={userData.mobile}
                    name="mobile"
                    onChange={handleChange}
                  />
                </div>
                <div className="table--title span--2">
                  <span>Change Password</span>
                </div>
                <div className="form--group">
                  <label htmlFor="">New Password</label>
                  <input
                    disabled={!isEditAble}
                    type="password"
                    minLength={8}
                    placeholder="Password"
                    value={userData.new_password}
                    name="new_password"
                    onChange={handleChange}
                  />
                </div>
                <div className="form--group">
                  <label htmlFor="">Re-Enter Password</label>
                  <input
                    disabled={!isEditAble}
                    type="password"
                    minLength={8}
                    placeholder="Confirm Password"
                    value={userData.confirm_password}
                    name="confirm_password"
                    onChange={handleChange}
                  />
                </div>
                <div className="form--group action--from span--2">
                  <button disabled={!isEditAble} className="btn">
                    Save Changes
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileSetting;