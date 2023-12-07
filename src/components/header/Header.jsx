import React from "react";
import Container from "../Container";
import Logo from "../Logo";
import Logoutbtn from "./Logoutbtn";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import authservice from "../../Appwrite/Auth";

function Header() {
  const authstatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const navitem = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authstatus,
    },
    {
      name: "Singup",
      slug: "/singup",
      active: !authstatus,
    },
    {
      name: "Allpost",
      slug: "/allpost",
      active: authstatus,
    },
    {
      name: "AddPost",
      slug: "/add-post",
      active: authstatus,
    },
  ];

  return (
    <>
      <header id="header" className="py-3 shadow bg-gray-400">
        <Container>
          <nav className="flex">
            <div className="logo mr-4">
              <Link to="/">
                <Logo width="70px" />
              </Link>
            </div>

            <ul className="nav_item flex ml-auto">
              {navitem.map((item) =>
                item.active ? (
                  <li className={`nav_li px-4`} key={item.name}>
                    <button
                      onClick={() => navigate(item.slug)}
                      className="inline-block py-2 duration-200 hover:transparent hover:text-black hover:rounded-xl hover:w-full "
                    >
                      {item.name}
                    </button>
                  </li>
                ) : null
              )}

              {authstatus && (
                <li className="nav_li">
                  <Logoutbtn />
                </li>
              )}
            </ul>
          </nav>
        </Container>
      </header>
    </>
  );
}

export default Header;
