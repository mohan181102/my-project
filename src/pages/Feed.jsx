import React, { useEffect } from "react";
import "./Home.css";
import { useState } from "react";
import Unplash from "../Unplash/Unplash";
import axios from "axios";

function Feed() {
  const unplash = {
    first: "anime",
  };
  const [url, seturl] = useState([]);
  const [pagenumber, setpagenumber] = useState(null);

  async function run() {
    setpagenumber(Math.floor(Math.random() * 50 + 2));

    await axios
      .get(
        `https://api.unsplash.com/search/photos?page=${pagenumber}&query=${unplash.first}&client_id=${Unplash.unplash_accesskey}`
      )
      .then((res) => seturl(res.data.results));
  }

  console.log(url);
  useEffect(() => {
    run();
  }, []);
  return (
    <>
      <div className="image">
        <div id="row1">
          {url
            ? url.map((ur) => (
                <img
                  key={ur.id}
                  className={`img`}
                  src={ur.urls.raw}
                  loading="lazy"
                />
              ))
            : "loding..."}
        </div>
      </div>
      <button id="refresh" className={`w-10 h-auto p-3`} onClick={run}>
        Refresh
      </button>
    </>
  );
}

export default Feed;
