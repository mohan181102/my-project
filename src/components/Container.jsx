import React from "react";

function Container({ className, children }) {
  return (
    <>
      <div className={`${className}w-full max-w-7xl mx-auto`}>{children}</div>
    </>
  );
}

export default Container;
