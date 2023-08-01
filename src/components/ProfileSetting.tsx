import React, { useState, useEffect } from "react";
import { authAxios } from "../config/config";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../Redux/rootReducer";
import { trimObjValues } from "../Helper";
import {
  acceptedFileTypes,
  acceptedFileTypesArray,
  imageMaxSize,
} from "../Helper/constants";
import {
  maxUserAddressLength,
  maxUserEmailLength,
  maxUserNameLength,
  maxUserPasswordLength,
  maxUserPhoneLength,
  minUserAddressLength,
  minUserEmailLength,
  minUserNameLength,
  minUserPasswordLength,
  minUserPhoneLength,
} from "../Constants";
import { setuser } from "../Redux/Reducers/authSlice";
import IsLoggedinHOC from "../Common/IsLoggedInHOC";

interface MyComponentProps {
  setLoading: (isComponentLoading: boolean) => void;
  isLoading: boolean;
}

function ProfileSetting(props: MyComponentProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const dispatch = useDispatch();
  const { setLoading, isLoading } = props;
  const [isEditAble, setEditAble] = useState<boolean>(false);
  const { user } = useSelector((state: RootState) => state.auth);
  const [currentImage, setCurrentImage] = useState("");
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
            const userFields = ["name", "email", "mobile", "address"];
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
    address: "",
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

  const handleChangePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const sanitizedValue = value.replace(/[^0-9-+]/g, ""); // Remove non-numeric, non-hyphen, and non-plus characters
    if (sanitizedValue.match(/^\+?[0-9-]*$/)) {
      setUserData((prev) => ({
        ...prev,
        [name]: sanitizedValue,
      }));
    }
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
    let payloadData = trimObjValues(userData);
    let { name, mobile, address, new_password, confirm_password } = payloadData;
    let validUsername = /^[A-Za-z\s]+$/;
    if (!validUsername.test(name)) {
      toast.error("Name should only contain letters");
    } else if (mobile < 9) {
      toast.error("Phone number must be at least 9 digit");
    } else if (new_password && new_password.length < 8) {
      toast.error("Password must be at least 8 characters");
    } else if (new_password !== confirm_password) {
      toast.error("Password did not match");
    } else {
      const payload = {
        name: name,
        mobile: mobile,
        address: address,
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
              dispatch(setuser(response.data.data));
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
              className={`edit--setting ${isEditAble ? "editable" : "not-editable"}`}
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
                    maxLength={maxUserNameLength}
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
                    maxLength={maxUserEmailLength}
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
                    minLength={minUserPhoneLength}
                    maxLength={maxUserPhoneLength}
                    disabled={!isEditAble}
                    type="text"
                    placeholder="Phone"
                    value={userData.mobile}
                    name="mobile"
                    onChange={handleChangePhone}
                  />
                </div>
                <div className="form--group">
                  <label htmlFor="">Address</label>
                  <input
                    required
                    minLength={minUserAddressLength}
                    maxLength={maxUserAddressLength}
                    disabled={!isEditAble}
                    type="text"
                    placeholder="Address"
                    value={userData.address}
                    name="address"
                    onChange={handleChange}
                  />
                </div>
                <div className="table--title span--2">
                  <span>Change Password</span>
                </div>
                <div className="form--group password--container">
                  <label htmlFor="">New Password</label>
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
                    disabled={!isEditAble}
                    type={showPassword ? "text" : "password"}
                    minLength={minUserPasswordLength}
                    maxLength={maxUserPasswordLength}
                    placeholder="Password"
                    value={userData.new_password}
                    name="new_password"
                    onChange={handleChange}
                  />
                </div>
                <div className="form--group password--container">
                  <label htmlFor="">Re-Enter Password</label>
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
                    disabled={!isEditAble}
                    type={showConfirmPassword ? "text" : "password"}
                    minLength={minUserPasswordLength}
                    maxLength={maxUserPasswordLength}
                    placeholder="Confirm Password"
                    value={userData.confirm_password}
                    name="confirm_password"
                    onChange={handleChange}
                  />
                </div>
                <div className="form--group action--from span--2">
                  <button disabled={!isEditAble || isLoading} className="btn">
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

export default IsLoggedinHOC(ProfileSetting);
