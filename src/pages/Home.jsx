import React, { useEffect, useState } from "react";
import authservice from "../Appwrite/Auth";
import Container from "../components/Container";
import { useSelector } from "react-redux";
import "./Home.css";
import ReactLoading from "react-loading";
import Feed from "./Feed";

function Home() {
  const value = useSelector((state) => state.auth.userdata);
  const [user, setuser] = useState(null);

  useEffect(() => {
    user ? (
      ""
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
            <Feed />
          </div>
        </Container>
      </div>
    );
}

export default Home;
