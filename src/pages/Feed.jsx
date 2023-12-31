import React, { useEffect } from "react";
import "./Feed.css";
import { useState } from "react";
import Unplash from "../Unplash/Unplash";
import axios from "axios";
import authconfig from "../Appwrite/Config";
import Container from "../components/Container";
import authservice from "../Appwrite/Auth";
import Loader from "./Loader";

function Feed() {
  const [load, setload] = useState(false);
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
        .then((res) => setunplashvalue(res[0].unplash_name))
        .then(() => setshow("not null"));
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
    window.location.reload;
  }

  if (show != null) {
    return (
      <>
        {console.log(url)}
        <div className="image">
          <div id="row1">
            {url
              ? url.map((ur) => (
                  <Loader key={ur.id}>
                    <img
                      key={ur.id}
                      className={`img`}
                      id="imgload"
                      src={ur.urls.small}
                      loading="lazy"
                      sizes="(min-width: 1335px) 410.6666666666667px, (min-width: 992px) calc(calc(100vw - 88px) / 3), (min-width: 768px) calc(calc(100vw - 64px) / 2), 100vw"
                      onClick={() => window.open(`${ur.urls.raw}`)}
                    />
                  </Loader>
                ))
              : "loding..."}
          </div>
        </div>
        <button id="refresh" onClick={run}>
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
