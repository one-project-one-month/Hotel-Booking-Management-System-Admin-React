import Booking from "@/pages/Admin/Booking/Booking";
import CreateCoupon from "@/pages/Admin/Coupon/CreateCoupon.tsx";
import Cupon from "@/pages/Admin/Coupon/Coupon.tsx";
import UpdateCoupon from "@/pages/Admin/Coupon/UpdateCoupon.tsx";
import Dashboard from "@/pages/Admin/Dashboard/Dashboard";
import CreateRoom from "@/pages/Admin/Room/CreateRoom";
import Room from "@/pages/Admin/Room/Room";
import UpdateRoom from "@/pages/Admin/Room/UpdateRoom";
import CreateUser from "@/pages/Admin/User/CreateUser";
import UpdateUser from "@/pages/Admin/User/UpdateUser";
import User from "@/pages/Admin/User/User";
import Login from "@/pages/auth/Login";
import Logout from "@/pages/auth/Logout";
import NotFound from "@/pages/Error/NotFound";
import Layout from "@/shared/Layout";
import CheckTable from "@/pages/Admin/Booking/CheckTable";

const Data = [
  {
    path: "auth/login",
    Component: Login,
  },
  {
    path: "/",
    Component:Layout,
    children: [
      {
        path: "dashboard",
        Component: Dashboard,
      },
      {
        path: "users",
        Component: User,
      },
      {
        path: "users/create",
        Component: CreateUser,
      },
      {
        path: "users/update/:id",
        Component: UpdateUser,
      },
      {
        path: "rooms",
        Component: Room,
      },
      {
        path: "rooms/create",
        Component: CreateRoom,
      },
      {
        path: "rooms/update/:id",
        Component: UpdateRoom,
      },
      {
        path: "booking",
        Component: Booking,
      },
      {
        path:"booking/:id",
        Component:CheckTable
      },
      {
        path: "coupon",
        Component: Cupon,
      },
      {
        path: "coupon/create",
        Component: CreateCoupon,
      },
      {
        path: "coupon/update",
        Component: UpdateCoupon,
      },
      {
        path: "logout",
        Component: Logout,
      },
    ],
  },
  {
    path: "*",
    Component: NotFound,
  },
];

export default Data;
