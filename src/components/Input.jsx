import React, { useEffect, useId, useState } from "react";
import { set } from "react-hook-form";

const Input = React.forwardRef(function Input(
  {
    label,
    type,
    warning = false,
    className = "",
    onChange,
    showpassword = false,
    ...props
  },
  ref
) {
  const Id = useId();

  function warninshow(e) {
    if (e.target.value.length < 8 && e.target.value.length > 2) {
      document.getElementById("warning").style.display = "block";
    }
    if (e.target.value.length >= 8 || e.target.value.length == 0) {
      document.getElementById("warning").style.display = "none";
    }
  }

  return (
    <div className="w-full   ">
      {label && <label className="inline-block">{label}</label>}
      <input
        type={type}
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-slate-500 duration-150 w-full  
            ${className}`}
        ref={ref}
        {...props}
        onChange={(e) => (type == "password" ? warninshow(e) : null)}
        // onPointerEnter={onChange}
        id={Id}
      />
      {showpassword ? (
        <div
          className=" w-auto inline-block h-full cursor-pointer bg-tranparent items-center justify-center"
          onClick={() => {
            document.getElementById(`${Id}`).getAttribute("type") == "password"
              ? document.getElementById(`${Id}`).setAttribute("type", "text")
              : document
                  .getElementById(`${Id}`)
                  .setAttribute("type", "password");
          }}
        >
          {showpassword ? (
            <i class="fa-solid fa-eye-slash"></i>
          ) : (
            <i class="fa-solid fa-eye"></i>
          )}
        </div>
      ) : (
        ""
      )}

      {warning ? (
        <div
          id="warning"
          className="w-auto hidden h-auto p-2 absolute  bg-white  "
        >
          <p className={`text-left mb-2 text-red-700`}>
            * Password must be 8 letters.
          </p>
          <p className={`text-left mb-2 text-red-700`}>
            * Recommened create strong password.
          </p>
        </div>
      ) : null}
    </div>
  );
});

export default Input;
