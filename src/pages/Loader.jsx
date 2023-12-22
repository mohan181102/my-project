import React, { useEffect } from "react";

function Loader({ children }) {
  return <div>{children ? children : "loading.."}</div>;
}

export default Loader;
