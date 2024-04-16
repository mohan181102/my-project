import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import "./Search.css";

function Search() {
  const [inputvalue, setinputvalue] = useState(null);
  const [data, setdata] = useState([]);
  const [pagenumber, setpagenumber] = useState("1");
  const [eror, seterror] = useState(null);
  const [pages, setpaget] = useState([1, 1, 1, 1]);
  const [loading, setloading] = useState(false);
  const [slicenumber, setslicenumber] = useState(0);

  async function recievedata() {
    // REQUEST TO API
    setloading(true);
    console.log(pagenumber);
    console.log("slicenumber", slicenumber);
    console.log(inputvalue);
    await axios
      .get(
        `https://api.unsplash.com/search/photos?page=${pagenumber}&query=${inputvalue}&client_id=ncFHfeZKBwbcp74gIp3Cs0Qqf3BOIEvjTKeWrZElUrg`
      )
      .then(async (res) => {
        setpaget(Array(res.data.total_pages).fill(0));
        setdata([]);
        console.log(res);
        setdata(res.data.results);
      })
      .then(console.log("ui data:- ", data))
      .catch((eror) => seterror(eror), console.log(eror))
      .finally(setloading(false));
  }

  // CREATE LOAD MORE FUNCTION

  useEffect(() => {
    recievedata();
  }, [pagenumber, inputvalue]);

  useEffect(() => {
    setpagenumber(0), setslicenumber(0);
  }, [inputvalue]);

  return (
    <div className=" w-full h-full flex  flex-col items-center content-center   text-xl mt-3 ">
      <h2
        className={`bg-transparent cursor-default w-3/4  h-auto text-4xl text-gray-600 font-bold flex items-center justify-start p-2 mt-6`}
      >
        Search image:-{" "}
      </h2>
      <input
        id="inpt"
        placeholder="Search"
        className=" w-[90%] mt-4 rounded-md h-16 top-16 px-5 outline-none"
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
        {loading == true  ? "wait" : null}

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
          : "Seach any image"}
      </ul>

      {pages.length > 1 ? (
        <div
          className={`w-3/4 mb-8 flex items-center overflow-hidden justify-between gap-1 h-auto p-2 bg-white mt-2 rounded-md`}
        >
          <button
            className={`w-auto disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer h-full bg-yellow-400 flex items-center justify-center text-xl font-medium text-white p-2 rounded-md
          `}
            onClick={() => {
              setpagenumber((prev) => prev - 1);
              let adition = slicenumber;
              pagenumber - 1 == adition
                ? setslicenumber((prev) => prev - 19)
                : null;
            }}
            disabled={pagenumber == 1}
          >
            prev
          </button>
          {pages.slice(slicenumber, slicenumber + 19).map((item, index) => {
            return (
              <>
                <button
                  className={`w-10 cursor-pointer overflow-hidden h-full bg-red-700 flex items-center justify-center text-xl font-medium text-white rounded-md
                  ${
                    pagenumber == index + 1 + slicenumber
                      ? " bg-yellow-400"
                      : " bg-red-700"
                  }`}
                  onClick={() => setpagenumber(index + 1 + slicenumber)}
                >
                  {index + slicenumber + 1}
                </button>
              </>
            );
          })}
          {pages.length > 19 ? (
            <span className={`w-auto h-auto text-red-700`}>....</span>
          ) : null}
          {pages.length > 19 ? (
            <button
              className={`w-auto cursor-pointer h-full bg-red-700 flex items-center justify-center text-xl font-medium text-white p-2 rounded-md
            ${pagenumber == pages.length ? "" : " bg-red-700"}`}
              onClick={() => setpagenumber(pages.length)}
            >
              {pages.length}
            </button>
          ) : null}

          <button
            className={`w-auto cursor-pointer h-full bg-yellow-400 flex items-center justify-center text-xl font-medium text-white p-2 rounded-md
          `}
            onClick={() => {
              setpagenumber((prev) => prev + 1);
              let adition = slicenumber + 19;
              pagenumber == adition ? setslicenumber(pagenumber) : null;
            }}
          >
            next
          </button>
        </div>
      ) : null}
    </div>
  );
}

export default Search;
