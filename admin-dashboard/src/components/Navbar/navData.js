import Image from "../../assests/images/main-dashboard.svg";
import Image1 from "../../assests/images/main-order.svg";
import Image3 from "../../assests/images/customers.svg";
import Image4 from "../../assests/images/stores.svg";
import Image5 from "../../assests/images/shipment.svg";
import Image6 from "../../assests/images/audits.svg";
import Image7 from "../../assests/images/inventory.svg";
import Image8 from "../../assests/images/users.svg";
import Image9 from "../../assests/images/settings.svg";

export const navData = [
  {
    mainNav: "Menu",
    subNav: [
      {
        title: "Dashboard",
        path: "/",
        icon: Image,
      },
      {
        title: "Orders",
        path: "/orders",
        icon: Image1,
      },
      {
        title: "Customers",
        path: "/customers",
        icon: Image3,
      },
      {
        title: "Stores",
        path: "/stores",
        icon: Image4,
      },
    ],
  },
  {
    mainNav: "Business",
    subNav: [
      {
        title: "Shipment/Delivery",
        path: "/shipment",
        icon: Image5,
      },
      {
        title: "Audit",
        path: "/audit",
        icon: Image6,
      },
      {
        title: "Inventory",
        path: "/inventory",
        icon: Image7,
      },
    ],
  },
  {
    mainNav: "Admistration",
    subNav: [
      {
        title: "Users & Permission",
        path: "/users",
        icon: Image8,
      },
      {
        title: "Settings",
        path: "/settings",
        icon: Image9,
      },
    ],
  },
];
