// import Login from "../pages/Auth/Login/Login";
// import ForgetPassword from "../pages/Auth/ForgetPassword/ForgetPassword";
import Dashboard from "../pages/Dashboard/Dashboard";
import Orders from "../pages/Orders/Orders";
import Profile from "../pages/Profile/Profile";
import Customers from "../pages/Customers/Customers";
import Stores from "../pages/Stores/Stores";
import Settings from "../pages/Settings/Settings";
import Inventory from "../pages/Inventory/Inventory";

export const routes = [
  {
    title: "Dashboard",
    path: "/",
    component: Dashboard,
  },
  {
    title: "Orders",
    path: "/orders",
    component: Orders,
  },
  {
    title: "Profile",
    path: "/profile",
    component: Profile,
  },
  {
    title: "Customers",
    path: "/customers",
    component: Customers,
  },
  {
    title: "Stores",
    path: "/stores",
    component: Stores,
  },
  {
    title: "Settings",
    path: "/settings",
    component: Settings,
  },
  {
    title: "Inventory",
    path: "/inventory",
    component: Inventory,
  },
];
