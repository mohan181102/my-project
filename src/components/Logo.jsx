import React from "react";

function Logo() {
  return (
    <div
      className={` bg-gradient-to-r from-cyan-500 to-blue-500 animate-spin w-full `}
      id="logoutanimation"
    >
      <img
        className={`w-full`}
        src={`https://upload.wikimedia.org/wikipedia/commons/c/cb/The_Blue_Marble_%28remastered%29.jpg`}
      />
    </div>
  );
}

export default Logo;
