import React, { useEffect } from "react";
import "./Feed.css";
import { useState } from "react";
import Unplash from "../Unplash/Unplash";
import axios from "axios";
import authconfig from "../Appwrite/Config";
import Container from "../components/Container";
import authservice from "../Appwrite/Auth";

function Feed() {
  // set unplash frontend value
  const [unplashvalue, setunplashvalue] = useState(null);
  const [show, setshow] = useState(null);
  const [data, setdata] = useState(null);
  const [url, seturl] = useState([]);
  const [pagenumber, setpagenumber] = useState(null);

  useEffect(() => {
    async function unplash() {
      await authconfig
        .getunplash()
        .then((res) => res.documents)
        .then((res) => setunplashvalue(res[0].unplash_name));
      console.log(unplashvalue);
      if (unplashvalue != null) {
        setshow("not null");
      }
    }
    unplash();
  }, []);

  async function run() {
    setpagenumber(Math.floor(Math.random() * 50 + 2));

    await axios
      .get(
        `https://api.unsplash.com/search/photos?page=${pagenumber}&query=${unplashvalue}&client_id=${Unplash.unplash_accesskey}`
      )
      .then((res) => seturl(res.data.results));
  }

  useEffect(() => {
    if (unplashvalue != null) {
      run();
    } else {
      setshow(null);
    }
  }, [unplashvalue]);

  async function unplashset() {
    const email = await authservice.getcurrentuser();
    console.log(data);
    console.log("email is", email.email);
    await authconfig.unplashset({ unplash_name: data, email: email.email });
    console.log("done");
  }

  if (show != null) {
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
  } else {
    return (
      <>
        <div className="unplashbox">
          <h2 id="h2unplash">what is your favroute thing</h2>
          <p id="puunplash">
            you can see beutiful images related to your word.
          </p>
          <Container>
            <input
              id="input"
              onChange={(e) => setdata(e.target.value)}
              placeholder="think and write"
            />

            <button id="submit" onClick={unplashset}>
              Submit
            </button>
          </Container>
        </div>
      </>
    );
  }
}

export default Feed;
