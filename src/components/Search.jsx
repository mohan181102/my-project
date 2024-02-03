import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import Unplash from "../Unplash/Unplash";
import "./Search.css";

function Search() {
  const [inputvalue, setinputvalue] = useState(null);
  const [data, setdata] = useState(null);
  const [pagenumber, setpagenumber] = useState(null);
  const [eror, seterror] = useState(null);

  async function reload() {
    function setnum() {
      setpagenumber(Math.floor(Math.random() * 50 + 2));
    }
    setnum();
    await axios
      .get(
        `https://api.unsplash.com/search/photos?page=${pagenumber}&query=${inputvalue}&client_id=${Unplash.unplash_accesskey}`
      )
      .then((res) => {
        setdata(res.data.results);
      })
      .catch((eror) => seterror(eror))
      .then(console.log("from serch page:- ", data));
  }

  return (
    <div className=" w-full h-full flex  flex-col items-center content-center border-spacing-0 text-xl mt-3">
      <input
        onLoad={() => forwhitespace}
        id="inpt"
        className=" w-full h-16 top-16 px-5"
        // classNam
        onChange={(e) => {
          setinputvalue(e.target.value), reload();
        }}
      />

      <ul
        id="image"
        className=" bg-blue w-full overflow-scroll  h-3/4 mt-4 flex flex-row"
      >
        {data != null && eror == null
          ? data.map((item) => {
              return (
                <li id="perli" key={item.id}>
                  <img
                    id="perimage"
                    src={item.urls.small}
                    onClick={() => window.open(`${item.urls.raw}`)}
                  />
                </li>
              );
            })
          : eror != null
          ? eror
          : ""}
      </ul>
    </div>
  );
}

export default Search;
