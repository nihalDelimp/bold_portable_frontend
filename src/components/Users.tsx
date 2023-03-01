import React, { useState, useEffect } from "react";
import NavBar from "../Common/NavBar";
import { authAxios } from "../config/config";
import { toast } from "react-toastify";
import moment from 'moment'

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsersListData();
  }, []);

  const getUsersListData = async () => {
    await authAxios()
      .get("/auth/get-all-users")
      .then(
        (response) => {
          if (response.data.status === 1) {
            setUsers(response.data.data);
          }
        },
        (error) => {
          toast.error(error.response.data.message);
        }
      )
      .catch((error) => {
        console.log("errorrrr", error);
      });
  };

  return (
    <>
      <NavBar />

      <div className="container pt-2">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Mobile</th>
              <th scope="col">Created at</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((item: any, index) => (
              <tr key={index + 1}>
                <th scope="row">{index + 1}</th>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.mobile}</td>
                <td>{moment(item.createdAt).format('YYYY MMM DD hh:mm A')}</td>
                <td>
                  <button className="btn btn-primary">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Users;
