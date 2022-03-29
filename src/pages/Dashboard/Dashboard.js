import React, { useEffect, useState, useCallback } from "react";
import MainContainer from "../../components/Common/MainContainer/MainContainer";
import styled from "styled-components";
import SingleDashboard from "../../components/Dashboard/SingleDashboard";
import { dashTableData, orderTableHeader } from "../../data/data";
import TableFilter from "../../components/Dashboard/TableFilter";
import SingleDetailCont from "../../components/Dashboard/SingleDetailCont";
import SingleDetailCont2 from "../../components/Dashboard/SingleDetailCont2";
import BarCharts from "../../components/Charts/BarCharts";
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

const filterData2 = [
  {
    title: "Daily",
    color: "#16588F",
  },
  {
    title: "Weekly",
    color: "#16588F",
  },
  {
    title: "Monthly",
    color: "#16588F",
  },
];

const Dashboard = () => {
  const [filter, setFilter] = useState("Pending");
  const [filter2, setFilter2] = useState("Daily");
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
      path: "/customers",
      value: currentData.allCustomers.total,
      loading: currentData.allCustomers.loading,
    },
    {
      title: "Total Sellers",
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
      path: "/customers",
      value: currentData.newCustomers.total,
      loading: currentData.newCustomers.loading,
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

  const changeColor2 = (val) => {
    setFilter2(val);
  };

  // returns today's date
  const getCurrentDate = () => {
    let date = new Date();
    return date.toLocaleDateString();
  };

  const getOrders = useCallback(async () => {
    let url = "orders/admin/getOrders?type=";
    let allUrl = [`${url}pending`, `${url}completed`, `${url}cancelled`];

    try {
      let [pending, completed, cancelled] = await axios.all(
        allUrl.map(async (endpoint) => {
          try {
            let {
              data: { data },
            } = await axiosInstance.get(endpoint);
            return data.length;
          } catch (error) {
            if (error.message) {
              toast.error(error.message);
              throw new Error(error.message);
            } else {
              toast.error("Something went wrong");
              throw new Error(error.message);
            }
          }
        })
      );
      setCurrentData((prevData) => {
        return {
          ...prevData,
          allOrders: {
            total: pending + completed + cancelled,
            loading: false,
          },
          pendingOrders: {
            total: pending,
            loading: false,
          },

          completedOrders: {
            total: completed,
            loading: false,
          },

          cancelledOrders: {
            total: cancelled,
            loading: false,
          },
        };
      });
    } catch (error) {
      if (error.message) {
        toast.error(error.message);
        throw new Error(error.message);
      }
      toast.error("Something went wrong");
      throw new Error(error);
    } finally {
      setCurrentData((prevData) => {
        return {
          ...prevData,
          allOrders: { ...prevData.allOrders, loading: false },
        };
      });
    }
  }, []);

  const getUsers = useCallback(async () => {
    try {
      let {
        data: { data },
      } = await axiosInstance.get(`users/admin/buyers`);

      // filters customers by today's date
      let newCustomers = data.filter(
        (item) =>
          item.updatedAt.slice(0, 10).split("-").join("/") === getCurrentDate()
      );

      setCurrentData((prevData) => {
        return {
          ...prevData,
          allCustomers: {
            total: data.length,
            loading: false,
          },
          newCustomers: {
            total: newCustomers.length,
            loading: false,
          },
        };
      });
    } catch (error) {
      if (error.message) {
        toast.error(error.message);
        throw new Error(error.message);
      } else {
        toast.error("Something went wrong");
        throw new Error(error);
      }
    } finally {
      setCurrentData((prevData) => {
        return {
          ...prevData,
          allCustomers: { ...prevData.allCustomers, loading: false },
        };
      });
    }
  }, []);

  const getStores = useCallback(async () => {
    try {
      let {
        data: { data },
      } = await axiosInstance.get(`stores/allstores`);

      setCurrentData((prevData) => {
        return {
          ...prevData,
          allStores: {
            total: data.length,
            loading: false,
          },
        };
      });
    } catch (error) {
      if (error.message) {
        toast.error(error.message);
        throw new Error(error.message);
      } else {
        toast.error("Something went wrong");
        throw new Error(error);
      }
    } finally {
      setCurrentData((prevData) => {
        return {
          ...prevData,
          allStores: { ...prevData.allStores, loading: false },
        };
      });
    }
  }, []);

  useEffect(() => {
    getOrders();
    getUsers();
    getStores();
    getCurrentDate();
  }, [getOrders, getUsers, getStores]);

  return (
    <MainContainer>
      <FirstSection className="w-full md:grid md:grid-cols-3 xl:grid-cols-4 gap-5 mb-10">
        {dashData.map((item, index) => (
          <SingleDashboard {...item} key={index} index={index} />
        ))}
      </FirstSection>
      <SecondSection
        data-aos="fade-up"
        data-aos-duration="1000"
        data-aos-delay="1000"
        className="w-full bg-white-main rounded-md pt-10 pb-10"
      >
        <TableFilter
          data={filterData1}
          value={filter}
          color={activeColor}
          title="Recent Product"
          changeTab={(val) => changeColor(val)}
        />
        <div className="w-full px-3 ">
          <DashboardTable
            tableHeaderData={orderTableHeader}
            tableData={dashTableData}
          />
        </div>
      </SecondSection>
      <ThirdSection
        data-aos="fade-up"
        data-aos-duration="1000"
        data-aos-delay="1000"
        className="w-full lg:grid lg:grid-cols-2 gap-10 pt-10 pb-10 mt-10"
      >
        <SingleDetailCont title="Store Perfomance" />
        <SingleDetailCont2 title="Returned Products" />
      </ThirdSection>
      <FourthSection
        data-aos="fade-up"
        data-aos-duration="2000"
        data-aos-delay="1000"
        className="w-full mt-10 rounded-md bg-white-main pb-10 pt-10"
      >
        <TableFilter
          data={filterData2}
          value={filter2}
          color="#16588F"
          title="Website Visits"
          changeTab={(val) => changeColor2(val)}
          show
        />
        <div className="bar-chart-sec mt-20 md:mt-10 w-full px-3">
          <BarCharts />
        </div>
      </FourthSection>
    </MainContainer>
  );
};

export default Dashboard;

const FirstSection = styled.div``;
const SecondSection = styled.div`
  box-shadow: 0px 30px 40px rgba(0, 0, 0, 0.04);
`;
const ThirdSection = styled.div``;
const FourthSection = styled.div`
  box-shadow: 0px 30px 40px rgba(0, 0, 0, 0.04);
`;

// {
//   /* <MainTable headerData={dashTableHeader} tableData={dashTableHeader} /> */
// }
// {
//   /* <TableHeader data={dashTableHeader} />
//           <TableDatas
//             data={dashTableData}
//             length={10}
//             data2={dashTableHeader}
//             tab={filter}
//           /> */
// }
