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
  const [loader, setloader] = useState(false);

  const login = async (data) => {
    seterror("");
    try {
      console.log(data);
      const sesion = await authservice
        .login(data)
        .catch((error) => {
          seterror(error), window.alert("Ops, Something went wrong! ");
          console.log(error);
        })
        .finally(setloader(false));
      if (sesion) {
        const userdata = await authservice
          .getcurrentuser()
          .catch((er) => console.log(er));

        if (userdata) {
          dispatch(storelogin(userdata));
        }
        navigate("/");
      }
    } catch (error) {
      window.alert("Something went wrong");
      console.log(error.message);
      setloader(false);
    }
  };

  return (
    <div className="flex items-center justify-center w-full">
      <div className={`formdiv mx-auto w-full bg-gray-100 rounded-md p-10 `}>
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
              onClick={() => setloader(true)}
              disabled={loader}
              className={` bg-blue-300 disabled:opacity-50 w-auto rounded-lg h-auto p-3 items-center`}
            >
              {loader ? "loading..." : "Sign In"}
            </button>
            {/* <Button children={'Sign in'} className='cursor-pointer' type="submit"/> */}
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
