import React, { useEffect, useState } from "react";
import Container from "../components/Container";
import { useSelector } from "react-redux";

function Home() {
  const value = useSelector((state) => state.auth.userdata);
  const [user, setuser] = useState(null);

  useEffect(() => {
    if (user == null && value != null) {
      setuser(value);
   
    }
  }, []);

  return value == null ? (
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
  ) : (
    <div id="main" className="w-full py-8 text-center">
      <Container>
        <div className="flex absolute  top-24  flex-wrap w-full">
          <h1
            className={`text-2xl font-bold hover:text-gray-200 w-full items-center`}
          >
            Welcome&#128591;
          </h1>
        </div>
      </Container>
    </div>
  );
}

export default Home;
