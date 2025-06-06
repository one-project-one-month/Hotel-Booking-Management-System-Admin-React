import Booking from "@/pages/Admin/Booking/Booking";
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
// import CheckTable from "@/pages/Admin/Booking/CheckTable";
import Coupon from "@/pages/Admin/Coupon/Coupon.tsx";
import RoomDetails from "@/pages/Admin/Room/RoomDetails.tsx";

const Data = [
  {
    path: "auth/login",
    Component: Login,
  },
  {
    path: "/",
    Component: Layout,
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
        path: "rooms/details/:id",
        Component: RoomDetails,
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
      // {
      //   path:"booking/:id",
      //   Component:CheckTable
      // },
      {
        path: "coupon",
        Component: Coupon,
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
