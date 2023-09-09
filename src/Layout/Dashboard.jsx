import React from "react";
import { Link, Outlet } from "react-router-dom";

const Dashboard = () => {
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
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul className="menu uppercase p-4 w-80 min-h-full bg-base-200 text-base-content">
          <Link className="text-lg font-semibold" to='/'>Bistro-Boss</Link>
          <li>
            <Link><i class="fa-solid fa-house"></i> Admin Home</Link>
          </li>
          <li>
            <Link><i class="fa-solid fa-microchip"></i> Add items</Link>
          </li>
          <li>
            <Link><i class="fa-solid fa-list"></i> Manage items</Link>
          </li>
          <li>
            <Link><i class="fa-solid fa-book"></i> Manage Bookings</Link>
          </li>
          <li>
            <Link><i class="fa-solid fa-users"></i> All Users</Link>
          </li>
          <div className="divider"></div>
          <li>
            <Link to='/'><i class="fa-solid fa-house"></i> Home</Link>
          </li>
          <li>
            <Link to=''><i class="fa-solid fa-bars"></i>Menu</Link>
          </li>
          <li>
            <Link to=''><i class="fa-solid fa-briefcase"></i> Order</Link>
          </li>
          <li>
            <Link to=''><i class="fa-solid fa-envelope"></i> Contact</Link>
          </li>
          
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
