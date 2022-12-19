// import Login from "../pages/Auth/Login/Login";
// import ForgetPassword from "../pages/Auth/ForgetPassword/ForgetPassword";
import Inventory from "../pages/Inventory/Inventory";
import Dashboard from "../pages/Dashboard/Dashboard";
import Orders from "../pages/Orders/Orders";
import SingleOrder from "../pages/Orders/SingleOrder";
import Profile from "../pages/Profile/Profile";
import Buyers from "../pages/Customers/Buyers";
import Sellers from "../pages/Customers/Sellers";
import Stores from "../pages/Stores/Stores";
import Settings from "../pages/Settings/Settings";
import Shipment from "../pages/Shipment/Shipment";
import UnP from "../pages/UnP/UnP";
import AddProducts from "../pages/AddProducts/addProducts";
import StoreDetails from "../pages/StoreDetails/StoreDetails";
import Audit from "../pages/Audits/Audit";
import AdminUser from "../pages/Audits/AdminUser";
import Withdraw from "../pages/withdraw/Withdraw";
import Coupon from "../pages/coupons/CreatedCoupon";
import SeeAll from "../pages/coupons/SeeAll";
import Mope from "../pages/mope/Mope";
import Balances from "../pages/Balances/Balances";
// import Templates from "../pages/templates";

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
    title: "Single Order",
    path: "/orders/:orderId",
    component: SingleOrder,
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
    title: "Settings",
    path: "/settings",
    component: Settings,
  },
  {
    title: "Inventory",
    path: "/inventory/*",
    component: Inventory,
  },
  {
    title: "Users & Permission",
    path: "/users",
    component: UnP,
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
  {
    title: "Stores",
    path: "/stores",
    component: Stores,
  },
  {
    title: "Store Details",
    path: "/store-details/:store_id",
    component: StoreDetails,
  },
  {
    title: "Audits",
    path: "/audit",
    component: Audit,
  },
  {
    title: "Admin Users",
    path: "/audit/:admin_user_id",
    component: AdminUser,
  },
  {
    title: "Withdraw",
    path: "/withdraw",
    component: Withdraw,
  },
  {
    title: "Coupon",
    path: "/coupons",
    component: Coupon,
  },
  {
    title: "Coupon",
    path: "/see-all-coupons",
    component: SeeAll,
  },
  {
    title: "Mope",
    path: "/mope",
    component: Mope,
  },
  {
    title: "Balances",
    path: "/balances",
    component: Balances,
  },
];
