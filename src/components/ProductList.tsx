import React from "react";
import AdminProducts from "./AdminProducts";
import UserProducts from "./UserProducts";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/rootReducer";

function ProductList() {
  const { user } = useSelector((state: RootState) => state.auth);
  return (
    <div>
      {user && user.user_type === "ADMIN" ? (
        <AdminProducts />
      ) : (
        <UserProducts />
      )}
    </div>
  );
}

export default ProductList;
