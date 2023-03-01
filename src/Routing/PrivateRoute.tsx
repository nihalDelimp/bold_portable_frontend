import React from "react";
import { useSelector } from "react-redux";
import { Route, Navigate } from "react-router-dom";
import { RootState } from "../Redux/rootReducer";

const PrivateRoute = ({ component: Component, layout: Layout, ...rest } : any) => {
  const token = useSelector((state : RootState) => state.auth.accessToken);

  return (
    <Route
      {...rest}
      render={(props : any) =>
        token ? (
          <Layout>
            <Component {...props} />
          </Layout>
        ) : (
          <Navigate to="/login" />
        )
      }
    />
  );
};
export default PrivateRoute;
