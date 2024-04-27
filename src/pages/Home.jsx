import React, { useEffect, useState } from "react";
import Container from "../components/Container";
import { useSelector } from "react-redux";

function Home() {
  const value = useSelector((state) => state.auth.userdata);
  const [user, setuser] = useState(null);

  useEffect(() => {
    if (user == null && value != null) {
      setuser(value);
      console.log(user);
    }
  }, []);

  return value == null ? (
    <div className={`w-full py-8 mt-4  text-center`}>
      <Container>
        <div className={`flex flex-wrap `}>
          <div className="py-2 w-full ">
            <h1 className="text-3xl md:text-2xl w-auto h-auto font-bold ">
              New user? please{" "}
              <a
                href="/Signup"
                className={`hover:text-white transition-all duration-150`}
              >
                Signup...
              </a>
            </h1>
          </div>
        </div>
      </Container>
    </div>
  ) : (
    <div
      id="main"
      className=" flex items-center justify-center h-full w-full py-8 text-center"
    >
      <Container>
        <div className="flex top-24  flex-wrap w-full">
          <h1
            className={`text-2xl font-bold cursor-default w-full items-center`}
          >
            Welcome&#128591;
          </h1>
        </div>
      </Container>
    </div>
  );
}

export default Home;
