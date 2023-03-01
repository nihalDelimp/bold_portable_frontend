import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/rootReducer";

const AppRoute = ({ element: Component, layout: Layout, ...rest }: any) => {
  const token = useSelector((state: RootState) => state.auth.accessToken);
  return (
    <Route
      {...rest}
      render={(props: any) =>
        token ? (
          <Navigate to="/" />
        ) : (
          <Layout>
            <Component {...props} />
          </Layout>
        )
      }
    />
  );
};

export default AppRoute;
