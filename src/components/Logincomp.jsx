import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login as storelogin } from "../store/authslice";
import Input from "./Input";
import Logo from "./Logo";
import { useDispatch } from "react-redux";
import authservice from "../Appwrite/Auth";
import { useForm } from "react-hook-form";
import ReactLoading from "react-loading";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, seterror] = useState(null);
  // const [userdata, setuserdata] = useState(null);
  const [loading, setloading] = useState(true);

  const login = async (data) => {
    seterror("");
    document.getElementById("loader").style.display = "block";
    try {
      const sesion = await authservice.login(data);
      if (sesion) {
        // setuserdata(await authservice.getcurrentuser());
        let userdata = await authservice.getcurrentuser();
        if (userdata) dispatch(storelogin(userdata));

        document.getElementById("loader").style.display = "none";
        navigate("./");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="flex items-center justify-center w-full">
      <div id="loader">
        <ReactLoading
          id="load"
          className={``}
          type={"bars"}
          color={"white"}
          width={90}
          height={90}
        />
      </div>

      <div
        className={`formdiv mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black`}
      >
        <div className={`mb-2 flex justify-center`}>
          <span className={`inline-block w-full max-w-[100px]`}>
            <Logo width="100%" />
          </span>
        </div>

        {/* form start from here */}

        <form onSubmit={handleSubmit(login)} className={`mt-5`}>
          <div>
            <Input
              label="Email: "
              placeholder="Enter your email"
              type="email"
              className="mb-4"
              {...register("email", { required: true })}
            />

            {/* password */}

            <Input
              label="Password: "
              type="password"
              className="mb-4"
              placeholder="Enter password"
              {...register("password", { required: true })}
            />
            <button
              type="submit"
              className={` bg-blue-300 w-auto rounded-lg h-auto p-3 items-center`}
            >
              Sign in
            </button>
            {/* <Button children={'Sign in'} className='cursor-pointer' type="submit"/> */}
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
