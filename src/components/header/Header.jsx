import React, { useState } from "react";
import Container from "../Container";
import Logo from "../Logo";
import Logoutbtn from "./Logoutbtn";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import authservice from "../../Appwrite/Auth";

function Header() {
  const storestatus = useSelector((state) => state.auth.status);
  const [status, setstatus] = useState(false);
  const [value, setvalue] = useState(0);
  const windowwidth = window.innerWidth;
  console.log("width", windowwidth);
  async function stats() {
    return await authservice
      .getcurrentuser()
      .then((res) => setstatus(res ? true : false));
  }
  stats();
  const navigate = useNavigate();

  const navitem = [
    {
      name: "Search",
      slug: "/search",
      active: status,
    },
    {
      name: "Home",
      slug: "/",
      active: true,
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
    document.getElementById("nav_item").style.width = "180px";
    setvalue(1);
  }

  return (
    <>
      <header id="header" className="py-3 shadow bg-gray-400">
        <Container>
          <nav className="flex nav">
            <div id="logo" className="  mr-4">
              <Link to="/">
                <Logo width="70px" />
              </Link>
            </div>

            <ul id="nav_item" className="nav_item flex ml-auto">
              {navitem.map((item) =>
                item.active ? (
                  <li
                    style={{ scale: `${windowwidth > "500" ? 1 : value}` }}
                    className={`nav_li px-4 `}
                    key={item.name}
                  >
                    <button
                      onClick={() => navigate(item.slug)}
                      id="nav_btn"
                      className="inline-block py-2 duration-200 hover:transparent hover:text-black hover:rounded-xl hover:w-full "
                    >
                      {item.name}
                    </button>
                  </li>
                ) : null
              )}

              {status && (
                <li
                  className="nav_li"
                  style={{ scale: `${windowwidth > "500" ? 1 : value}` }}
                >
                  <Logoutbtn />
                </li>
              )}
              <button
                id="cross"
                style={{ scale: `${value}` }}
                onClick={() => {
                  setvalue(0)(
                    (document.getElementById("nav_item").style.width = "0px")
                  );
                }}
              >
                &#10060;
              </button>
            </ul>
            <h2 id="globalname">Global gallery</h2>
            <button id="forphone" onClick={() => scale()}>
              NAV
            </button>
          </nav>
        </Container>
      </header>
    </>
  );
}

export default Header;
