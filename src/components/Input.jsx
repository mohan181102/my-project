import React, { useId, useState } from "react";
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
  const [value, setvalue] = useState(null);

  function warninshow(e) {
    console.log(e.target.value);
    setvalue(e.target.value);
    console.log("valu:- ", value.length);
    if (value != null) {
      document.getElementById("warning").style.display = "block";
    }
    if (value.length == 1 || value.length >= 5) {
      
      document.getElementById("warning").style.display = "none";
    }
  }

  return (
    <div className="w-full">
      {label && <label className="inline-block">{label}</label>}
      <input
        type={type}
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-slate-500 duration-150 border border-gray-300 w-full 
            ${className}`}
        ref={ref}
        {...props}
        onChange={(e) => warninshow(e)}
        // onPointerEnter={onChange}
        id={Id}
      />
      {showpassword ? (
        <i
          className="absolute z-50 w-5 h-full right-20"
          onClick={() => {
            document.getElementById(`${Id}`).getAttribute("type") == "password"
              ? document.getElementById(`${Id}`).setAttribute("type", "text")
              : document
                  .getElementById(`${Id}`)
                  .setAttribute("type", "password");
          }}
        >
          show
        </i>
      ) : (
        ""
      )}

      {warning ? (
        <div id="warning" className="w-2/4 h-1/4 p-2 absolute  bg-white  ">
          <p className={`text-left mb-2 text-red-700`}>
            * Password must be 8 letters.
          </p>
          <p className={`text-left mb-2 text-red-700`}>
            * Recommened crete strong password.
          </p>
        </div>
      ) : (
        ""
      )}
    </div>
  );
});

export default Input;
