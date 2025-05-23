import React from "react";
import { Link } from "react-router";

const Navbar = () => {
  return (
    <>
      <nav>
        <ul className="flex justify-between my-8 mx-16">
          <Link to="/">
            <li className="hover:cursor-pointer">Home</li>
          </Link>
          <div className="flex justify-between">
            <li className="hover:cursor-pointer mr-4">Set Operations</li>
            <Link to="/truth-table">
              <li className="hover:cursor-pointer mr-4">Truth Tables</li>
            </Link>
            <Link to="/prime-factorization">
              <li className="hover:cursor-pointer mr-4">Prime Factorization</li>
            </Link>
            

          </div>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
