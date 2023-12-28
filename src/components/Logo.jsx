import React from "react";

function Logo() {
  return (
    <div className={` w-full `} id="logoutanimation">
      <img
        className={`w-full`}
        sizes="(min-width: 1335px) 410.6666666666667px, (min-width: 992px) calc(calc(100vw - 88px) / 3), (min-width: 768px) calc(calc(100vw - 64px) / 2), 100vw"
        src={`https://upload.wikimedia.org/wikipedia/commons/c/cb/The_Blue_Marble_%28remastered%29.jpg`}
      />
    </div>
  );
}

export default Logo;
