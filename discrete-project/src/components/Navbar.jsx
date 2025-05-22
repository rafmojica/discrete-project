import React from "react";
import { Link } from "react-router";
//added from GPT to resolve npm vite issue
// import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <nav>
        <ul className="flex justify-between my-8 mx-16">
          <Link to="/">
            <li className="hover:cursor-pointer">Home</li>
          </Link>
          <div className="flex justify-between">
            <Link to = "/basic-set-operations">
            <li className="hover:cursor-pointer mr-4">Set Operations</li>
            </Link>
            <Link to="/truth-table">
              <li className="hover:cursor-pointer mr-4">Truth Tables</li>
            </Link>
            <li className="hover:cursor-pointer">Prime Factorization</li>
          </div>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
