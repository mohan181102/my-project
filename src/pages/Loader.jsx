import React, { useState } from "react";

function Loader({ children }) {
  const [load, setload] = useState(false);

  return <div id="loaddiv"> {children} </div>;
}

export default Loader;
