import React from "react";
import "./Singup.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, login as storelogin } from "../store/authslice";
import Input from "./Input";
import Logo from "./Logo";
import { useDispatch } from "react-redux";
import authservice from "../Appwrite/Auth";
import { useForm } from "react-hook-form";

function Singup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [er, seter] = useState("");
  const { register, handleSubmit } = useForm();

  const create = async (data) => {
    seter("");

    try {
      const userdata = await authservice.createaccount(data);
      dispatch(login(userdata));
      if (userdata) {
        const user = await authservice.getcurrentuser();
        if (user) navigate("/");
      }
    } catch (error) {
      seter(error.message);
    }
  };

  function change() {
    document.getElementById("paslen").style.opacity = 1;
  }

  return (
    <div className={`flex items-center justify-center `}>
      <div
        className={`mx-auto w-full max-w-lg bg-gray-200 rounded-xl p-10 border border-black `}
      >
        <div className={`mb-2 flex justify-center`}>
          <span className={`changediv inline-block w-full max-w-[100px]`}>
            <Logo width="100%" />
          </span>
        </div>

        {/* form */}

        <form onSubmit={handleSubmit(create)}>
          <div id="singupbox" className={`space-y-4 `}>
            <Input
              label="Username: "
              placeholder="Enter your name"
              {...register("name", { required: true })}
            />

            <Input
              label="Email: "
              placeholder="Enter your email"
              type="email"
              {...register("email", { required: true })}
            />

            <Input
              label="Password: "
              placeholder="Enter your password"
              type="password"
              warning="true"
    
              showpassword="true"
              {...register("password", { required: true, minLength: 8 })}
            />
            <button
              type="submit"
              id="create"
              className="w-full bg-green-500 py-1 hover:bg-green-600 rounded-md"
            >
              Create account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Singup;
