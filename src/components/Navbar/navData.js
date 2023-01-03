import Image from "../../assets/images/main-dashboard.svg";
import Image1 from "../../assets/images/main-order.svg";
import Image3 from "../../assets/images/customers.svg";
import Image4 from "../../assets/images/stores.svg";
// import Image5 from "../../assets/images/shipment.svg";
import Image6 from "../../assets/images/audits.svg";
import Image7 from "../../assets/images/inventory.svg";
// import Image8 from "../../assets/images/users.svg";
// import Image9 from "../../assets/images/settings.svg";
import Active from "../../assets/images/dash-active.svg";
import Active1 from "../../assets/images/order-active.svg";
import Active2 from "../../assets/images/customer-active.svg";
import Active3 from "../../assets/images/store-active.svg";
// import Active4 from "../../assets/images/delivery-active.svg";
import Active5 from "../../assets/images/audit-active.svg";
import Active6 from "../../assets/images/inventory-active.svg";
// import Active7 from "../../assets/images/user-active.svg";
// import Active8 from "../../assets/images/setting-active.svg";

export const navData = [
  {
    mainNav: "Menu",
    subNav: [
      {
        title: "Dashboard",
        path: "/",
        icon: Image,
        icon2: Active,
      },
      {
        title: "Orders",
        path: "/orders",
        icon: Image1,
        icon2: Active1,
      },
      {
        title: "Buyers",
        path: "/buyers",
        icon: Image3,
        icon2: Active2,
      },
      {
        title: "Sellers",
        path: "/sellers",
        icon: Image3,
        icon2: Active2,
      },
      {
        title: "Stores",
        path: "/stores",
        icon: Image4,
        icon2: Active3,
      },
      {
        title: "Add Products",
        path: "/add-products",
        icon: Image4,
        icon2: Active3,
      },
      // {
      //   title: "Add Templates",
      //   path: "/templates",
      //   icon: Image4,
      //   icon2: Active3,
      // },
      {
        title: "Balances",
        path: "/balances",
        icon: Image6,
        icon2: Active5,
      },
    ],
  },

  {
    mainNav: "Business",
    subNav: [
      // {
      //   title: "Shipment/Delivery",
      //   path: "/shipment",
      //   icon: Image5,
      //   icon2: Active4,
      // },
      {
        title: "Audit",
        path: "/audit",
        icon: Image6,
        icon2: Active5,
      },
      {
        title: "Inventory",
        path: "/inventory",
        icon: Image7,
        icon2: Active6,
      },
      {
        title: "Withdraw",
        path: "/withdraw",
        icon: "https://toppng.com/uploads/preview/banner-freeuse-geldtasche-icon-free-and-money-icon-115534432646uveksxxli.png",
        icon2:
          "https://toppng.com/uploads/preview/banner-freeuse-geldtasche-icon-free-and-money-icon-115534432646uveksxxli.png",
      },
      {
        title: "Coupons",
        path: "/coupons",
        icon: Image7,
        icon2: Active6,
      },
      {
        title: "Mope",
        path: "/mope",
        icon: Image7,
        icon2: Active6,
      },
    ],
  },

  // {
  //   mainNav: "Admistration",
  //   subNav: [
  //     {
  //       title: "Users & Permission",
  //       path: "/users",
  //       icon: Image8,
  //       icon2: Active7,
  //     },
  //     {
  //       title: "Settings",
  //       path: "/settings",
  //       icon: Image9,
  //       icon2: Active8,
  //     },
  //   ],
  // },
];

export const data2 = [
  {
    title: "Dashboard",
    path: "/",
    icon: Image,
    icon2: Active,
  },

  {
    title: "Orders",
    path: "/orders",
    icon: Image1,
    icon2: Active1,
  },

  {
    title: "Buyers",
    path: "/buyers",
    icon: Image3,
    icon2: Active2,
  },
  {
    title: "Sellers",
    path: "/sellers",
    icon: Image3,
    icon2: Active2,
  },

  {
    title: "Stores",
    path: "/stores",
    icon: Image4,
    icon2: Active3,
  },
  {
    title: "Add Products",
    path: "/add-products",
    icon: Image4,
    icon2: Active3,
  },
  // {
  //   title: "Add Templates",
  //   path: "/templates",
  //   icon: Image4,
  //   icon2: Active3,
  // },
  // {
  //   title: "Shipment/Delivery",
  //   path: "/shipment",
  //   icon: Image5,
  //   icon2: Active4,
  // },

  {
    title: "Audit",
    path: "/audit",
    icon: Image6,
    icon2: Active5,
  },

  {
    title: "Inventory",
    path: "/inventory",
    icon: Image7,
    icon2: Active6,
  },

  // {
  //   title: "Users & Permission",
  //   path: "/users",
  //   icon: Image8,
  //   icon2: Active7,
  // },

  // {
  //   title: "Settings",
  //   path: "/settings",
  //   icon: Image9,
  //   icon2: Active8,
  // },
];
