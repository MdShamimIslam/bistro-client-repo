import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { authContext } from "../../Providers/AuthProvider";
import useAdmin from "../../hooks/useAdmin";
import { FaShoppingCart } from "react-icons/fa";
import useCart from "../../hooks/useCart";

const Navbar = () => {
  const { user, logOut } = useContext(authContext);
  const [cart] = useCart();
  const [isAdmin] = useAdmin();

  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch((error) => console.log(error));
  };

  const menuOptions = (
    <>
      <li className="text-base">
        <Link to="/">Home</Link>
      </li>
      <li className="text-base">
        <Link to="/menu">Our-menu</Link>
      </li>
      <li className="text-base">
        <Link to={isAdmin ? "/dashboard/adminHome" : "/dashboard/userHome"}>
          Dashboard
        </Link>
      </li>
      <li className="text-base">
        <Link to="/order/salad">Order-Food</Link>
      </li>
      <li className="text-base">
        <Link to="/dashboard/myCart">
            <FaShoppingCart></FaShoppingCart>
            <div className="badge badge-secondary">{cart?.length || 0}</div>
        </Link>
      </li>
      {user ? (
        <>
          <li>
            <button onClick={handleLogOut} className="text-base">
              Logout
            </button>
          </li>
        </>
      ) : (
        <>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </>
      )}
    </>
  );
  return (
    <div className="navbar bg-base-100 fixed z-10">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {menuOptions}
          </ul>
        </div>
        <a className="btn btn-ghost normal-case text-3xl font-semibold">
          Bistro-Boss
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{menuOptions}</ul>
      </div>
      <div className="navbar-end"></div>
    </div>
  );
};

export default Navbar;
