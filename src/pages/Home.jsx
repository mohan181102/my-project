import React, { useEffect, useState } from "react";
import authservice from "../Appwrite/Auth";
import Container from "../components/Container";
import { useSelector } from "react-redux";
import "./Home";
import ReactLoading from "react-loading";

function Home() {
  const value = useSelector((state) => state.auth.userdata);
  const [user, setuser] = useState(null);

  //   useEffect(() => {
  //     authservice.getcurrentuser().then((value) => {
  //       if (value) {
  //         setuser(value);
  //       }
  //     });
  //   }, []);

  //   SECOND APPROCH

  useEffect(() => {
    user ? (
      ""
    ) : (
      <ReactLoading type={"bars"} width={90} height={90} color={"white"} />
    );
    setuser(value);
  }, [value]);

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
      <div id="main" className="w-full h-full py-8 text-center">
        <Container>
          <div className="flex flex-wrap w-full">
            <h1
              className={`text-2xl font-bold hover:text-gray-200 w-full items-center`}
            >
              Welcome {user.userdata.name ? user.userdata.name : ""} &#128591;
            </h1>
          </div>
        </Container>
      </div>
    );
}

export default Home;
