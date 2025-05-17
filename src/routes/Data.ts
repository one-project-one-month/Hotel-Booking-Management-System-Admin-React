import Booking from "@/pages/Admin/Booking/Booking";
import ViewBooking from "@/pages/Admin/Booking/ViewBooking";
import CreateCupon from "@/pages/Admin/Cupon/CreateCupon";
import Cupon from "@/pages/Admin/Cupon/Cupon";
import UpdateCupon from "@/pages/Admin/Cupon/UpdateCupon";
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
        path: "users/update",
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
        path: "booking/view",
        Component: ViewBooking,
      },
      {
        path: "cupon",
        Component: Cupon,
      },
      {
        path: "cupon/create",
        Component: CreateCupon,
      },
      {
        path: "cupon/update",
        Component: UpdateCupon,
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
