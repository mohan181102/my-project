import React from "react";

function Logo({ width = "100px" }) {
  return (
    <div className={` w-full `}>
      <img
        className={`w-full`}
        src={`https://upload.wikimedia.org/wikipedia/commons/c/cb/The_Blue_Marble_%28remastered%29.jpg`}
      />
    </div>
  );
}

export default Logo;
