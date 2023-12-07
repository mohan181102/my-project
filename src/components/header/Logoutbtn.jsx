import React from "react";
import { useDispatch } from "react-redux";
import authservice from "../../Appwrite/Auth";
import { logout } from "../../store/authslice";
import { useNavigate } from "react-router-dom";
import "./logout.css";

function Logoutbtn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logoutbtn = () => {
    authservice.Logout().then(() => {
      dispatch(logout());
    });
  };
  return (
    <div
      className=" cursor-pointer inline-block px-6 py-2 duration-150 hover:bg-blue-500 rounded-full"
      onClick={logoutbtn}
    >
      Logout
    </div>
  );
}

export default Logoutbtn;
