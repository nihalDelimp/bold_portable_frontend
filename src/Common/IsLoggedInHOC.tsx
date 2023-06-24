import React from "react";
import { useJwt } from "react-jwt";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/rootReducer";
import SessionOutModal from "./SessionOutModal";

const IsLoggedinHOC = (WrappedComponent: any) => {
  const HocComponent = ({ ...props }) => {
    const { accessToken } = useSelector((state: RootState) => state.auth);
    console.log('accessToken' , accessToken)
    const { isExpired } = useJwt(accessToken);
    console.log("Expired " , isExpired)
    if (isExpired) {
      return <SessionOutModal />;
    } else {
      return <WrappedComponent {...props} isTokenExpired={isExpired} />;
    }
  };
  return HocComponent;
};
export default IsLoggedinHOC;
