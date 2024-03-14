import React, { useState } from "react";

const Toaster = ({ information }) => {
  const [show, setshow] = useState(true);
  //   setTimeout(() => {
  //     if (show) setshow(false);
  //   }, 4000);

  return (
    <>
      <div
        id="infodiv"
        className={` w-fit h-fit p-3 rounded-md bg-green-400 fixed top-40 right-10 flex ${
          show ? "" : "hidden"
        } transac items-center transition-all delay-500 ease-in justify-center`}
      >
        <p
          className={`w-fit h-fit text-xl font-semibold text-white flex items-center justify-start`}
        >
          {information}
        </p>
      </div>
    </>
  );
};

export default Toaster;
