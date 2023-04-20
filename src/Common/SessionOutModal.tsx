import React, { useState } from "react";
import { logout } from "../Redux/Reducers/authSlice";
import { useDispatch } from "react-redux";

function SessionOutModal() {
  const [modal, setModal] = useState(true);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout(false));
    setModal(false);
  };

  return (
    <>
      <section
        className={`default--popup session--out--popup--main ${
          modal ? "active--popup" : ""
        }  `}
      >
        <div className="default--popup--wrapper">
          <div className="session--out--popup">
            <h3>Your session has expired. Please sign in again</h3>
            <button onClick={handleLogout} type="button" className="btn">
              OK
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default SessionOutModal;
