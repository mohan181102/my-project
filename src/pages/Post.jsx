import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import authconfig from "../Appwrite/Config";
import Container from "../components/Container";
import Button from "../components/Buttn";
import parse from "html-react-parser";
import authservice from "../Appwrite/Auth";
import "./Post.css";

export default function Post() {
  const [post, setpost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userdata);

  const isauthor = post ? true : false;

  useEffect(() => {
    if (slug) {
      authconfig.getpost(slug).then((post) => {
        if (post) setpost(post);
        else navigate("/");
      });
    } else navigate("/");
  }, [slug, navigate]);

  function deletePost() {
    console.log("g");
    authconfig.deletepost(slug);
  }

  function show() {
    document.getElementById("delete").style.opacity = "1";
    document.getElementById("edit").style.opacity = "1";
  }

  function dontshow() {
    document.getElementById("delete").style.opacity = "0";
    document.getElementById("edit").style.opacity = "0";
  }

  function bigimg() {
    window.open(authconfig.getfile(post.featuredimg), "_blank");
  }

  function stopanimation() {
    document.getElementById("title").style.animation = "none";
  }
  return post && isauthor ? (
    <div className="py-8">
      <Container>
        <div className="post w-1/4 flex justify-center mb-4 mx-auto relative border rounded-xl p-2 flex-wrap">
          <img
            id="img"
            src={authconfig.getfile(post.featuredimg)}
            alt={post.title}
            onMouseEnter={show}
            onMouseLeave={dontshow}
            onClick={bigimg}
            className="rounded-xl"
          />

          {post != null ? (
            <div
              className={` w-3/4 h-10 bg-transparent absolute flex items-center justify-end gap-1 right-2 rounded-md `}
            >
              <Link>
                <Button
                  className={` text-white text-xl font-bold`}
                  bgcolor="bg-red-400"
                  onClick={deletePost}
                >
                  Delete
                </Button>
              </Link>
              <Link to={`/edit-post/${post.$id}`}>
                <Button
                  className={` text-white text-xl font-bold`}
                  bgcolor="py-2 bg-yellow-400"
                >
                  Edit
                </Button>
              </Link>
            </div>
          ) : null}
          <div
            className="title-div w-full mb-6 h-fit "
            onMouseEnter={stopanimation}
          >
            <h1
              id="title"
              className="title text-2xl font-bold flex items-center justify-center"
            >
              Title :- {post.title}
            </h1>
          </div>
        </div>
      </Container>
    </div>
  ) : null;
}
