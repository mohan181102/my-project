import React, { useEffect, useState } from "react";
import authservice from "../Appwrite/Auth";
import Container from "../components/Container";
import { useSelector } from "react-redux";
import "./Home.css";
import Unplash from "../Unplash/Unplash";
import ReactLoading from "react-loading";
import axios from "axios";

function Home() {
  const value = useSelector((state) => state.auth.userdata);
  const [user, setuser] = useState(null);
  const unplash = {
    first: "anime",
    second: "girl",
    third: "nature",
  };
  const [url, seturl] = useState([]);
  const [url1, seturl1] = useState([]);
  const [url2, seturl2] = useState([]);
  const [pagenumber, setpagenumber] = useState(null);

  async function run() {
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
    user ? (
      ("", run(), setpagenumber(Math.floor(Math.random() * 10 + 5)))
    ) : (
      <ReactLoading type={"bars"} width={90} height={90} color={"white"} />
    );
    setuser(value);
  }, []);

  if (user == null) {
    return (
      <div className={`w-full py-8 mt-4 text-center`}>
        <Container>
          <div className={`flex flex-wrap `}>
            <div className="py-2 w-full ">
              <h1 className="text-2xl font-bold hover:text-gray-200">
                Login to read posts
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  } else
    return (
      <div id="main" className="w-full py-8 text-center">
        <Container>
          <div className="flex absolute  top-24  flex-wrap w-full">
            <h1
              className={`text-2xl font-bold hover:text-gray-200 w-full items-center`}
            >
              Welcome {user.userdata.name} &#128591;
            </h1>
          </div>
          <div className={`image`}>
            <div id="row1">
              {url.map((ur) => (
                <div className="imdiv " key={ur.id}>
                  <img className={`img`} src={ur.urls.raw} />
                </div>
              ))}
            </div>

            <div id="row2">
              {url1.map((ur) => (
                <div className="imdiv " key={ur.id}>
                  <img className={`img`} src={ur.urls.raw} />
                </div>
              ))}
            </div>

            <div id="row3">
              {url2.map((ur) => (
                <div className="imdiv " key={ur.id}>
                  <img className={`img`} src={ur.urls.raw} />
                </div>
              ))}
            </div>
          </div>
        </Container>
      </div>
    );
}

export default Home;
