import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import Unplash from "../Unplash/Unplash";
import "./Search.css";

function Search() {
  const [inputvalue, setinputvalue] = useState(null);
  const [data, setdata] = useState([]);
  const [pagenumber, setpagenumber] = useState("1");
  const [eror, seterror] = useState(null);

  async function recievedata() {
    // REQUEST TO API
    setdata([]);
    console.log(inputvalue);
    console.log(typeof pagenumber, pagenumber);
    await axios
      .get(
        `https://api.unsplash.com/search/photos?page=${pagenumber}&query=${inputvalue}&client_id=ncFHfeZKBwbcp74gIp3Cs0Qqf3BOIEvjTKeWrZElUrg`
      )
      .then((res) => {
        console.log(res);
        data.length == 0 ? setdata(res.data.results) : null;
      })
      .then(console.log(data))
      .catch((eror) => seterror(eror));
  }

  // CREATE LOAD MORE FUNCTION

  useEffect(() => {
    recievedata();
  }, [pagenumber, inputvalue]);

  return (
    <div className=" w-full h-full flex  flex-col items-center content-center   text-xl mt-3 ">
      <input
        id="inpt"
        className=" w-full h-16 top-16 px-5 outline-none"
        // classNam
        onChange={(e) => {
          setinputvalue(e.target.value);
          recievedata();
        }}
      />

      <ul
        id="image"
        className=" bg-blue w-full overflow-scroll  h-3/4 mt-4 flex flex-row"
      >
        {data.length != 0
          ? data.map((item) => {
              return (
                <li
                  className=" w-auto min-w-1/4 m-2 cursor-pointer hover:bg-gray-500 bg-white rounded-md  bg-cover h-auto bg-center"
                  key={item.id}
                >
                  <img
                    id="perimage"
                    src={`${item.urls.small}`}
                    onClick={() =>
                      window.open(`${item ? item.urls.raw : null}`)
                    }
                    alt="not found"
                  />
                </li>
              );
            })
          : eror != null
          ? console.log(eror)
          : "Seach any image"}
        <button
          onClick={() =>
            setpagenumber((prev) => (parseInt(prev) + 1).toString())
          }
          className={`w-40 md:z-20  h-8 hover:brightness-110 mt-2 rounded-md bg-yellow-500 text-white font-bold flex items-center justify-center  `}
        >
          <p className=" cursor-pointer sm:z-20 md:z-20 w-full h-auto bg-yellow-500 text-white font-bold flex items-center justify-center ">
            Load more...
          </p>
        </button>
      </ul>
      </ul>
      <button
        onClick={() => setpagenumber((prev) => (parseInt(prev) + 1).toString())}
        className={`w-40 z-20  h-8 hover:brightness-110 mt-2 rounded-md bg-yellow-500 text-white font-bold flex items-center justify-center  `}
      >
        <p className=" cursor-pointer sm:z-20 md:z-20 w-full h-auto bg-yellow-500 text-white font-bold flex items-center justify-center ">
          Load more...
        </p>
      </button>
    </div>
  );
}

export default Search;
