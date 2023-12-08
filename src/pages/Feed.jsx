import React, { useEffect } from "react";
import "./Home.css";
import { useState } from "react";
import Unplash from "../Unplash/Unplash";
import axios from "axios";

function Feed() {
  const unplash = {
    first: "anime",
    second: "girl",
    third: "nature",
  };
  const [url, seturl] = useState([]);
  const [url1, seturl1] = useState(null);
  const [url2, seturl2] = useState(null);
  const [pagenumber, setpagenumber] = useState(null);

  async function run() {
    setpagenumber(Math.floor(Math.random() * 10 + 1));
    await axios
      .get(
        `https://api.unsplash.com/search/photos?page=${pagenumber}&query=${unplash.first}&client_id=${Unplash.unplash_accesskey}`
      )
      .then((res) => seturl(res.data.results));

    await axios
      .get(
        `https://api.unsplash.com/search/photos?page=${pagenumber}&query=${unplash.second}&client_id=${Unplash.unplash_accesskey}`
      )
      .then((res) => seturl1(res.data.results));
    await axios
      .get(
        `https://api.unsplash.com/search/photos?page=${pagenumber}&query=${unplash.third}&client_id=${Unplash.unplash_accesskey}`
      )
      .then((res) => seturl2(res.data.results));
  }

  useEffect(() => {
    run();
  }, []);
  return (
    <>
      {url
        ? url.map((ur) => (
            <div className="imdiv " key={ur.id}>
              <img className={`img`} src={ur.urls.raw} />
            </div>
          ))
        : "loding..."}
    </>
  );
}

export default Feed;
