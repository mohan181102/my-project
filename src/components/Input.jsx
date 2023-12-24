import React, { useId } from "react";

const Input = React.forwardRef(function Input(
  { label, type, className = "", onChange, ...props },
  ref
) {
  const Id = useId();
  return (
    <div className="w-full">
      {label && <label className="inline-block">{label}</label>}
      <input
        type={type}
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-slate-500 duration-150 border border-gray-300 w-full 
            ${className}`}
        ref={ref}
        {...props}
        onChange={onChange}
        // onPointerEnter={onChange}
        id={Id}
      />
    </div>
  );
});

export default Input;
