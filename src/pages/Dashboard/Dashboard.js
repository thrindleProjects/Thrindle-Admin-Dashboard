import React, { useEffect, useState, useCallback } from "react";
import MainContainer from "../../components/Common/MainContainer/MainContainer";
import styled from "styled-components";
import SingleDashboard from "../../components/Dashboard/SingleDashboard";
import { dashbordHeader } from "../../data/data";
import TableFilter from "../../components/Dashboard/TableFilter";
import DashboardTable from "../../components/Common/GenralTable/DashboardTable";
import axiosInstance from "../../utils/axiosInstance";
import axios from "axios";
import { toast } from "react-toastify";
import Image from "../../assets/images/dash-order.svg";
import Image2 from "../../assets/images/dash-customers.svg";
import Image3 from "../../assets/images/dash-store.svg";
import Image4 from "../../assets/images/dash-returned-products.svg";
import Image5 from "../../assets/images/dash-pending-order.svg";
import Image6 from "../../assets/images/dash-delievered-order.svg";
import Image7 from "../../assets/images/dash-cancelled-order.svg";
import NewLoader from "../../components/newLoader/newLoader";
import { useDispatch, useSelector } from "react-redux";
import { withdrawData } from "../../redux/actions/withdraw/WithdrawAction";

const filterData1 = [
  {
    title: "Pending",
    color: "#F69F13",
  },
  {
    title: "Delivered",
    color: "#009E52",
  },
  {
    title: "Cancelled",
    color: "#F5000F",
  },
];

const Dashboard = () => {
  const dispatch = useDispatch();
  const { name } = useSelector((state) => state.login.user);

  useEffect(() => {
    dispatch(withdrawData());
  }, [dispatch]);

  const [filter, setFilter] = useState("Pending");
  const [activeColor, setActiveColor] = useState("#F69F13");
  const [currentData, setCurrentData] = useState({
    allOrders: {
      total: 0,
      loading: true,
    },
    allCustomers: {
      total: 0,
      loading: true,
    },
    allStores: {
      total: 0,
      loading: true,
    },
    pendingOrders: {
      total: 0,
      loading: true,
    },
    completedOrders: {
      total: 0,
      loading: true,
    },
    cancelledOrders: {
      total: 0,
      loading: true,
    },
    newCustomers: {
      total: 0,
      loading: true,
    },
    recentProducts: {
      data: [],
      loading: true,
    },
    balances: {
      data: { totalEarningsOnThrindle: "", totalUnwithdrawnBalance: "" },
      loading: true,
    },
  });

  const dashData = [
    {
      title: "Total Orders",
      img: Image,
      color: "#16588F",
      path: "/orders",
      value: currentData.allOrders.total,
      loading: currentData.allOrders.loading,
    },
    {
      title: "Total Users",
      img: Image2,
      color: "#166CB4",
      path: "/buyers",
      value: currentData.allCustomers.total,
      loading: currentData.allCustomers.loading,
    },
    {
      title: "Total Stores",
      img: Image3,
      color: "#4BC7EA",
      path: "/stores",
      value: currentData.allStores.total,
      loading: currentData.allStores.loading,
    },
    {
      title: "Returned Products",
      img: Image4,
      color: "#9E09E4",
      path: "/stores",
      value: 0,
      loading: false,
    },
    {
      title: "Pending Orders",
      img: Image5,
      color: "#F69F13",
      path: "/orders?status=Pending Orders",
      value: currentData.pendingOrders.total,
      loading: currentData.pendingOrders.loading,
    },
    {
      title: "Delivered Orders",
      img: Image6,
      color: "#009E52",
      path: "/orders?status=Delivered Orders",
      value: currentData.completedOrders.total,
      loading: currentData.completedOrders.loading,
    },
    {
      title: "Cancelled Orders",
      img: Image7,
      color: "#F5000F",
      path: "/orders?status=Cancelled Orders",
      value: currentData.cancelledOrders.total,
      loading: currentData.cancelledOrders.loading,
    },
    {
      title: "New Customers",
      img: Image2,
      color: "#166CB4",
      path: "/buyers",
      value: currentData.newCustomers.total,
      loading: currentData.newCustomers.loading,
    },
    {
      title: "Unwithdrawn Balance",
      img: Image,
      color: "#16588F",
      value: currentData.balances.data.totalUnwithdrawnBalance,
      loading: currentData.balances.loading,
      hidden: true,
    },
    {
      title: "Earnings on Thrindle",
      img: Image,
      color: "#16588F",
      value: currentData.balances.data.totalEarningsOnThrindle,
      loading: currentData.balances.loading,
      hidden: true,
    },
  ];

  const changeColor = (val) => {
    setFilter(val);
    if (val === "Pending") {
      setActiveColor("#F69F13");
    } else if (val === "Delivered") {
      setActiveColor("#009E52");
    } else if (val === "Cancelled") {
      setActiveColor("#F5000F");
    }
  };

  const getAllData = useCallback(() => {
    let url = "orders/admin/getOrders?type=";
    let allUrl = [
      `${url}pending`,
      `${url}completed`,
      `${url}cancelled`,
      "users/admin/buyers",
      "stores/allstores",
      "/products/search?sort=-createdAt&limit=10",
      "wallets/balances",
    ];

    axios
      .all(allUrl.map((endpoint) => axiosInstance.get(endpoint)))
      .then(
        axios.spread(
          (
            pending,
            completed,
            cancelled,
            allBuyers,
            allStores,
            allProducts,
            balances
          ) => {
            // destructing responses from axios.all
            let {
              data: {
                data: { pageInfo: pendingPageInfo },
              },
            } = pending;

            let {
              data: {
                data: { pageInfo: completedPageInfo },
              },
            } = completed;

            let {
              data: {
                data: { pageInfo: cancelledPageInfo },
              },
            } = cancelled;

            let {
              data: { pageInfo: allBuyersPageInfo, newBuyers: newCustomers },
            } = allBuyers;

            let {
              data: {
                data: { pageInfo: allStoresPageInfo },
              },
            } = allStores;

            let {
              data: { data: allProductsArr },
            } = allProducts;

            console.log({ allProductsArr });

            let {
              data: { data: balancesArr },
            } = balances;

            // slicing first ten of newly approved products

            // mutating all state at once
            setCurrentData((prevData) => {
              return {
                ...prevData,

                allOrders: {
                  total:
                    pendingPageInfo?.totalHits +
                    completedPageInfo?.totalHits +
                    cancelledPageInfo?.totalHits,
                  loading: false,
                },

                pendingOrders: {
                  total: pendingPageInfo?.totalHits,
                  loading: false,
                },

                completedOrders: {
                  total: completedPageInfo?.totalHits,
                  loading: false,
                },

                cancelledOrders: {
                  total: cancelledPageInfo?.totalHits,
                  loading: false,
                },

                allCustomers: {
                  total: allBuyersPageInfo?.totalHits,
                  loading: false,
                },

                newCustomers: {
                  total: newCustomers,
                  loading: false,
                },

                allStores: {
                  total: allStoresPageInfo.totalHits,
                  loading: false,
                },

                recentProducts: {
                  data: allProductsArr,
                  loading: false,
                },

                balances: {
                  data: balancesArr,
                  loading: false,
                },
              };
            });
          }
        )
      )
      .catch((error) => {
        // single error block
        if (error.response) {
          toast.error(error.response.data.message);
          throw new Error(error);
        } else {
          toast.error("Please check that you're connected");
          throw new Error(error);
        }
      })
      .finally(() => {
        // close all loaders
        setCurrentData((prevData) => {
          return {
            ...prevData,
            allOrders: { ...prevData.allOrders, loading: false },
            pendingOrders: { ...prevData.pendingOrders, loading: false },
            completedOrders: { ...prevData.completedOrders, loading: false },
            cancelledOrders: { ...prevData.cancelledOrders, loading: false },
            allCustomers: { ...prevData.allCustomers, loading: false },
            allStores: { ...prevData.allStores, loading: false },
            newCustomers: { ...prevData.newCustomers, loading: false },
            recentProducts: {
              ...prevData.recentProducts,
              loading: false,
            },
            balances: { ...prevData.balances, loading: false },
          };
        });
      });
  }, []);

  useEffect(() => {
    getAllData();
  }, [getAllData]);

  return (
    <MainContainer>
      <FirstSection className="w-full md:grid md:grid-cols-3 xl:grid-cols-4 gap-5 mb-10">
        {dashData.map((item, index) => {
          if (!item.hidden)
            return <SingleDashboard {...item} key={index} index={index} />;
          if (!["Administrator"].includes(name)) return null;
          return <SingleDashboard {...item} key={index} index={index} />;
        })}
      </FirstSection>
      <SecondSection
        data-aos="fade-up"
        data-aos-duration="200"
        data-aos-delay="200"
        className="w-full bg-white-main rounded-md py-4 px-2"
      >
        <TableFilter
          data={filterData1}
          value={filter}
          color={activeColor}
          title="Recent Product"
          changeTab={(val) => changeColor(val)}
        />
        {currentData.recentProducts.loading ? (
          <div className="h-60">
            <NewLoader />
          </div>
        ) : (
          <div className="w-full px-3 ">
            <DashboardTable
              tableHeaderData={dashbordHeader}
              tableData={currentData.recentProducts.data}
            />
          </div>
        )}
      </SecondSection>
    </MainContainer>
  );
};

export default Dashboard;

const FirstSection = styled.div``;
const SecondSection = styled.div`
  box-shadow: 0px 30px 40px rgba(0, 0, 0, 0.04);
`;
