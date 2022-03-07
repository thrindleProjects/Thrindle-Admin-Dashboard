// import Login from "../pages/Auth/Login/Login";
// import ForgetPassword from "../pages/Auth/ForgetPassword/ForgetPassword";
import Inventory from "../pages/Inventory/Inventory";
import Dashboard from "../pages/Dashboard/Dashboard";
import Orders from "../pages/Orders/Orders";
import Profile from "../pages/Profile/Profile";
import Buyers from "../pages/Customers/Buyers";
import Sellers from "../pages/Customers/Sellers";
import Stores from "../pages/Stores/Stores";
import Settings from "../pages/Settings/Settings";
import Shipment from "../pages/Shipment/Shipment";
// import UnP from "../pages/U&P/UnP";
import AddProducts from "../pages/AddProducts/addProducts";

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
    title: "Buyers",
    path: "/buyers",
    component: Buyers,
  },
  {
    title: "Sellers",
    path: "/sellers",
    component: Sellers,
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
  {
    title: "Shipment",
    path: "/shipment",
    component: Shipment,
  },
  {
    title: "Add Products",
    path: "/add-products",
    component: AddProducts,
  },
];
