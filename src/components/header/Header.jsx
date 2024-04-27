import React, { useState } from "react";
import Container from "../Container";
import Logo from "../Logo";
import Logoutbtn from "./Logoutbtn";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import authservice from "../../Appwrite/Auth";
import { useLocation } from "react-router-dom";

function Header() {
  const storestatus = useSelector((state) => state.auth.status);
  const [status, setstatus] = useState(false);
  const [value, setvalue] = useState(0);
  const windowwidth = window.innerWidth;
  const navigate = useNavigate();
  const location = useLocation();

  console.log(location);

  async function stats() {
    return await authservice
      .getcurrentuser()
      .then((res) => setstatus(res ? true : false));
  }
  stats();

  const navitem = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Search",
      slug: "/search",
      active: status,
    },
    {
      name: "Login",
      slug: "/login",
      active: !status,
    },
    {
      name: "Singup",
      slug: "/singup",
      active: !status,
    },
    {
      name: "Allpost",
      slug: "/allpost",
      active: status,
    },
    {
      name: "AddPost",
      slug: "/add-post",
      active: status,
    },
  ];

  function scale() {
    setvalue(1);
    document.getElementById("nav_item").style.width = "180px";
  }

  return (
    <>
      <header id="header" className="w-full z-[20] h-auto bg-gray-300">
        <nav className="flex z-[20] nav w-full px-4 bg-gray-500 h-auto py-2 overscroll-scroll items-center justify-between">
          <div className="mr-4 flex gap-2 w-auto h-full items-center justify-between">
            <Link to="/" id="logo">
              <Logo width="70px" />
            </Link>

            <h2
              className={` bg-white cursor-default py-1 text-gray-500 w-auto px-2 rounded-md text-xl font-bold h2tag`}
            >
              Global gallery
            </h2>
          </div>

          <ul
            id="nav_item"
            className={`nav_item flex w-auto  px-2 h-full items-center `}
          >
            {navitem.map((item) =>
              item.active ? (
                <li
                  onClick={(e) => {
                    console.log(e);
                  }}
                  style={{ scale: `${windowwidth > "500" ? 1 : value}` }}
                  className={`nav_li text-xl ${
                    location.pathname == item.slug ? "bg-white" : " "
                  }  font-bold text-white mx-2 rounded-md px-2`}
                  key={item.name}
                >
                  <button
                    onClick={() => navigate(item.slug)}
                    id="nav_btn"
                    className={` py-2 w-full ${
                      location.pathname == item.slug
                        ? " bg-white rounded-[1.3rem] text-gray-500 "
                        : ""
                    } duration-200 hover:transparent  `}
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}

            {status && (
              <li
                className="nav_li nav_li text-xl font-bold text-white hover:scale-125 transition-all duration-300"
                style={{ scale: `${windowwidth > "500" ? 1 : value}` }}
              >
                <Logoutbtn />
              </li>
            )}
            <button
              id="cross"
              style={{ scale: `${value}` }}
              onClick={() => {
                setvalue(0);
                document.getElementById("nav_item").style.width = "0px";
              }}
            >
              &#10060;
            </button>
          </ul>

          <button
            className={`forphone text-white w-auto h-full rounded-md fixed right-2`}
            onClick={() => scale()}
          >
            <img
              src={"/images.png"}
              className={`w-10 h-10 bg-cover bg-center rounded-md`}
            />
          </button>
        </nav>
      </header>
    </>
  );
}

export default Header;
