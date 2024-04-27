import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo";
import "./Footer.css";

function Footer() {
  return (
    <section className="section relative overflow-hidden py-10 bg-gray-500 border border-t-2">
      <div className="relative z-10 mx-auto max-w-7xl px-4">
        <div className="-m-6 flex flex-wrap">
          <div className="w-full p-6 lg:w-5/12">
            <div className="flex h-full flex-col justify-between">
              <div className="logofoot mb-4 inline-flex items-center">
                <Logo width="100px" />
              </div>
              <div>
                <p className="copy text-sm text-gray-600">
                  &copy; Copyright 2023. All Rights Reserved by DevUI.
                </p>
              </div>
            </div>
          </div>
          <div className="company border border-white border-spacing-1  w-auto p-6 md:w-1/2 lg:w-2/12">
            <div className="compan2 h-full">
              <h3 className="company_name tracking-px mb-9  text-xs font-semibold uppercase text-gray-500">
                Company
              </h3>
              <ul className="ul_company">
                <li className="li_companymb-4">
                  <Link
                    className="link text-base font-medium text-gray-900 hover:text-gray-700"
                    to="/"
                  >
                    Features
                  </Link>
                </li>
                <li className="li_company mb-4">
                  <Link
                    className="link text-base font-medium text-gray-900 hover:text-gray-700"
                    to="/"
                  >
                    Pricing
                  </Link>
                </li>
                <li className="li_company mb-4">
                  <Link
                    className="link text-base font-medium text-gray-900 hover:text-gray-700"
                    to="/"
                  >
                    Affiliate Program
                  </Link>
                </li>
                <li className=" li_company">
                  <Link
                    className="link text-base font-medium text-gray-900 hover:text-gray-700"
                    to="/"
                  >
                    Press Kit
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="company w-auto p-6 md:w-1/2 lg:w-2/12">
            <div className="compan2 h-full">
              <h3 className="company_name tracking-px mb-9  text-xs font-semibold uppercase text-gray-500">
                Support
              </h3>
              <ul className="ul_company">
                <li className="li_company mb-4">
                  <Link
                    className="link text-base font-medium text-gray-900 hover:text-gray-700"
                    to="/"
                  >
                    Account
                  </Link>
                </li>
                <li className="li_company mb-4">
                  <Link
                    className="link text-base font-medium text-gray-900 hover:text-gray-700"
                    to="/"
                  >
                    Help
                  </Link>
                </li>
                <li className="li_company mb-4">
                  <Link
                    className="link text-base font-medium text-gray-900 hover:text-gray-700"
                    to="/"
                  >
                    Contact Us
                  </Link>
                </li>
                <li className="li_company">
                  <Link
                    className="link text-base font-medium text-gray-900 hover:text-gray-700"
                    to="/"
                  >
                    Customer Support
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className=" company w-auto p-6 md:w-1/2 lg:w-3/12">
            <div className="compan2 h-full">
              <h3 className="tracking-px mb-9  text-xs font-semibold uppercase text-gray-500">
                Legals
              </h3>
              <ul className="ul_company">
                <li className="li_company mb-4">
                  <Link
                    className="link text-base font-medium text-gray-900 hover:text-gray-700"
                    to="/"
                  >
                    Terms &amp; Conditions
                  </Link>
                </li>
                <li className="li_company mb-4">
                  <Link
                    className="link text-base font-medium text-gray-900 hover:text-gray-700"
                    to="/"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li className="li_company">
                  <Link
                    className="link text-base font-medium text-gray-900 hover:text-gray-700"
                    to="/"
                  >
                    Licensing
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Footer;
