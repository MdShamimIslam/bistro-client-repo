import React from "react";
import { Link, Outlet } from "react-router-dom";
import { FaBook, FaShoppingCart, FaUsers, FaUtensils } from "react-icons/fa";
import useCart from "../hooks/useCart";
import useAdmin from "../hooks/useAdmin";

const Dashboard = () => {
  const [cart] = useCart();
  const [isAdmin]= useAdmin();

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center">
        <Outlet></Outlet>
        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary drawer-button lg:hidden"
        >
          Open drawer
        </label>
      </div>
      <div className="drawer-side ">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul className="menu uppercase p-4 w-80 min-h-full bg-green-700 text-white">
          <Link className="text-xl font-semibold text-orange-400 ml-4" to="/">
            Bistro-Boss
          </Link>
          {isAdmin ? (
            <>
              <li>
                <Link>
                  <i className="fa-solid fa-house"></i> Admin Home
                </Link>
              </li>
              <li>
                <Link to="/dashboard/addItem">
                  <FaUtensils></FaUtensils> Add an Item
                </Link>
              </li>
              <li>
                <Link to="/dashboard/manageItems">
                  <i className="fa-regular fa-credit-card"></i> Manage Items
                </Link>
              </li>
              <li>
                <Link>
                  <FaBook></FaBook> Manage Bookings
                </Link>
              </li>
              <li>
                <Link to="/dashboard/allUsers">
                  <FaUsers></FaUsers> All Users
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link>
                  <i className="fa-solid fa-house"></i> User Home
                </Link>
              </li>
              <li>
                <Link>
                  <i className="fa-solid fa-microchip"></i> reservation
                </Link>
              </li>
              <li>
                <Link>
                  <i className="fa-regular fa-credit-card"></i> payment history
                </Link>
              </li>
              <li>
                <Link to="/dashboard/myCart">
                  <FaShoppingCart></FaShoppingCart> my cart
                  <span className="badge badge-secondary">
                    +{cart?.length || 0}
                  </span>
                </Link>
              </li>
              <li>
                <Link>
                  <i className="fa-solid fa-puzzle-piece"></i> add review
                </Link>
              </li>
              <li>
                <Link>
                  <i className="fa-solid fa-utensils"></i> my booking
                </Link>
              </li>
            </>
          )}

          <div className="divider"></div>
          <li>
            <Link to="/">
              <i className="fa-solid fa-house"></i> Home
            </Link>
          </li>
          <li>
            <Link to="/menu">
              <i className="fa-solid fa-bars"></i>Menu
            </Link>
          </li>
          <li>
            <Link to="/order/category">
              <i className="fa-solid fa-briefcase"></i> Order
            </Link>
          </li>
          <li>
            <Link to="">
              <i className="fa-solid fa-envelope"></i> Contact
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
