import React from "react";
import ReactLoading from "react-loading";

function Loder() {
  return (
    <div
      className={`bg-black text-white text-2xl text-center h-screen flex items-center justify-center`}
    >
      <ReactLoading type={"bars"} height={90} width={90} color={"white"} />
    </div>
  );
}

export default Loder;
