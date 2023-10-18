import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Menu from "../Pages/Menu/Menu/Menu";
import Order from "../Pages/Order/Order/Order";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import PrivateRoutes from "./PrivateRoutes";
import Dashboard from "../Layout/Dashboard";
import MyCart from "../Pages/Dashboard/MyCart/MyCart";
import AllUsers from "../Pages/Dashboard/AllUsers/AllUsers";
import AddItem from "../Pages/Dashboard/AddItem/AddItem";
import AdminRoute from "./AdminRoute";
import ManageItems from "../Pages/Dashboard/ManageItems/ManageItems";
import Payment from "../Pages/Dashboard/Payment/Payment";
import UserHome from "../Pages/Dashboard/UserHome/UserHome";
import AdminHome from "../Pages/Dashboard/AdminHome/AdminHome";
import Contact from "../Pages/Dashboard/Contact/Contact";
import ManageBooking from "../Pages/Dashboard/ManageBooking/ManageBooking";
import Reservation from "../Pages/Dashboard/Reservation/Reservation";
import PaymentHistory from "../Pages/Dashboard/PaymentHistory/PaymentHistory";
import AddReview from "../Pages/Dashboard/AddReview/AddReview";
import UserBooking from "../Pages/Dashboard/UserBooking/UserBooking";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/menu",
        element: <Menu></Menu>,
      },
      {
        path: "/order/:category",
        element: <Order></Order>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/signUp",
        element: <SignUp></SignUp>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoutes>
        <Dashboard></Dashboard>
      </PrivateRoutes>
    ),
    children: [
      {
        path: "/dashboard/myCart",
        element: <MyCart></MyCart>,
      },
      {
        path:'/dashboard/contact',
        element:<Contact></Contact>
      },
      {
        path:"/dashboard/manageBooking",
        element:<ManageBooking></ManageBooking>
      },
      
      {
        path:'/dashboard/userHome',
        element:<UserHome></UserHome>
      },
      {
        path:'/dashboard/reservation',
        element:<Reservation></Reservation>
      },
      {
        path:'/dashboard/paymentHistory',
        element:<PaymentHistory></PaymentHistory>
      },
      {
        path:'/dashboard/addReview',
        element:<AddReview></AddReview>
      },
      {
        path:'/dashboard/booking',
        element:<UserBooking></UserBooking>
      },
      {
        path:'/dashboard/adminHome',
        element:<AdminRoute><AdminHome></AdminHome></AdminRoute>
      },
      {
        path:'/dashboard/payment',
        element:<Payment></Payment>
      },
      {
        path: "/dashboard/allUsers",
        element: <AdminRoute><AllUsers></AllUsers></AdminRoute>,
      },
      {
        path:"/dashboard/addItem",
        element:<AdminRoute><AddItem></AddItem></AdminRoute>
      },
      {
        path:"/dashboard/manageItems",
        element:<AdminRoute><ManageItems></ManageItems></AdminRoute>
      }
    ],
  },
]);

export default router;
