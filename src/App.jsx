import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import authservice from "./Appwrite/Auth";
import { useEffect } from "react";
import { login, logout } from "./store/authslice";
import { Outlet } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Loder from "./loader/Mainloader";

function App() {
  const [loading, setloading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authservice
      .getcurrentuser()
      .then((userdata) => {
        if (userdata) {
          dispatch(login({ userdata }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setloading(false));
  }, []);

  return !loading ? (
    <>
      <div className="min-h-screen flex flex-wrap content-between bgwhite ">
        <div className="w-full block">
          <Header />
          <main className={` bg-slate-300 pt-14`}>
            <Outlet />
          </main>
          <Footer />
        </div>
      </div>
    </>
  ) : (
    <div className={` h-screen`}>
      <Loder />
    </div>
  );
}

export default App;
