import React, { useState, useEffect } from "react";
import Postcard from "../components/Poscard";
import authconfig from "../Appwrite/Config";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { Post } from "../store/postslice";

function Allpost() {
  const [loader, setloader] = useState(false);
  const [post, setpost] = useState([]);
  const [error, seterror] = useState(null);
  const dispatch = useDispatch();

  async function loadpost() {
    setloader(true);
    await authconfig
      .allpost()
      .then((value) => {
        dispatch(Post(value.documents));
        console.log(value.documents.length);
        if (post.length == 0 && value.documents.length != 0)
          setpost(value.documents);
      })
      .finally(setloader(false));
  }

  useEffect(() => {
    loadpost();
  }, []);

  console.log(post);

  if (post.length != 0 && loader == false) {
    return (
      <div className={`w-auto py-8 h-auto bg-white rounded-md `}>
        <Container>
          <h2
            className={`w-full h-10 font-bold text-xl flex items-center justify-start text-gray-400 pl-8`}
          >
            All Post
          </h2>
          <div className={`flex flex-wrap`}>
            {post.map((pos) => (
              <div key={pos.$id} className={`p-2 w-1/4`}>
                <Postcard {...pos} />
              </div>
            ))}
          </div>
        </Container>
      </div>
    );
  }
  if (loader == true && post.length == 0) {
    return (
      <h2
        className={`w-2/4 h-1/4 rounded-md bg-white text-gray-600 font-bold text-xl flex items-center flex-col gap-1 justify-center`}
      >
        <div className=" animate-spin w-8 bg-transparent border-gray-500 border-spacing-1 border-t-2  h-8 rounded-[50%]" />
        Loading..
      </h2>
    );
  }

  if (post.length == 0 && loader == false) {
    console.log(post);
    return (
      <>
        <h2
          className={`w-2/4 h-1/4 rounded-md bg-white text-gray-600 font-bold text-xl flex items-center flex-col gap-1 justify-center`}
        >
          You have not post anything!
        </h2>
      </>
    );
  }
}

export default Allpost;
