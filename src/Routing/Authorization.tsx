import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/rootReducer";

const Authorization = (allowedRoles: string[]) => (WrappedComponent: any) => {
  const WithAuthorization = (props: any) => {
    const user_type = useSelector((state: RootState) => state.auth.user.type);
    if (allowedRoles.includes(user_type)) {
      return <WrappedComponent {...props} />;
    } else {
      return (
        <div className="un_auth_page">
          <h1>This page not for you</h1>
        </div>
      );
    }
  };
  return WithAuthorization;
};
export default Authorization;
