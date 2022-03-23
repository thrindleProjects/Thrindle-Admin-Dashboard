import { useState, useEffect, useCallback } from "react";
import MainContainer from "../../components/Common/MainContainer/MainContainer";
import styled from "styled-components";
import ScreenHeader from "../../components/Common/ScreenTitle/ScreenHeader";
import GeneralHeaderTab from "../../components/Common/GeneralHeaderTab/GeneralHeaderTab";
import { orderData, orderFilter, orderTableHeader } from "../../data/data";
import GeneralFilterTab from "../../components/Common/GeneralFilterTab/GeneralFilterTab";
import GeneralPagination from "../../components/Common/GeneralPagination/GeneralPagination";
import OrderTable from "../../components/Common/GenralTable/OrderTable";
import axiosInstance from "../../utils/axiosInstance";
import Loader from "../../components/Common/Loader/Loader";
import axios from "axios";
import { toast } from "react-toastify";

const Orders = (props) => {
  const [orders, setOrders] = useState({
    generalOrders: [],
    allOrders: [],
    paginatedOrders: [],
    pageIndex: 0,
  });

  const [activeTab, setActiveTab] = useState("Pending Orders");
  const [filterValue, setFilterValue] = useState("");
  const [status, setStatus] = useState({
    isLoading: true,
    isError: false,
    isEmpty: false,
  });
  const [orderTabData, setOrderTabData] = useState(orderData);

  const qty = props.location.search
    ? props.location.search.split("=")[1]
    : "Pending Orders";
  const changeTab = (val) => {
    setActiveTab(val);
    setOrders({ ...orders, pageIndex: 0 });
  };

  // Break Customers Array into smaller arrays for pagination
  const paginationArr = (arr, size) =>
    Array.from({ length: Math.ceil(arr?.length / size) }, (v, i) =>
      arr.slice(i * size, i * size + size)
    );

  // HandlePagination
  const handlePagination = (type) => {
    switch (type) {
      case "NEXT_PAGE":
        setOrders((oldOrders) => {
          if (oldOrders.paginatedOrders.length - 1 === oldOrders.pageIndex) {
            return oldOrders;
          }
          return { ...oldOrders, pageIndex: oldOrders.pageIndex + 1 };
        });
        break;
      case "PREVIOUS_PAGE":
        setOrders((oldOrders) => {
          if (oldOrders.pageIndex === 0) {
            return oldOrders;
          }
          return { ...oldOrders, pageIndex: oldOrders.pageIndex - 1 };
        });
        break;
      default:
        throw new Error("Argumenet NOT handled");
    }
  };

  const getOrders = useCallback(async () => {
    setStatus({ isLoading: true, isError: false, isEmpty: false });
    setOrders((oldOrders) => {
      return {
        ...oldOrders,
        paginatedOrders: [],
        allOrders: [],
      };
    });
    let url = "orders/admin/getOrders?type=";
    let allUrl = [`${url}pending`, `${url}completed`, `${url}cancelled`];
    try {
      let [pending, completed, cancelled] = await axios.all(
        allUrl.map(async (endpoint) => {
          try {
            let {
              data: { data },
            } = await axiosInstance.get(endpoint);
            return data.reverse();
          } catch (error) {
            toast.error("Something went wrong ...");
          }
        })
      );
      let paginatedOrders, allOrders;
      if (activeTab === "Pending Orders") {
        paginatedOrders = paginationArr(pending, 20);
        allOrders = pending;
      }
      if (activeTab === "Delivered Orders") {
        paginatedOrders = paginationArr(completed, 20);
        allOrders = completed;
      }
      if (activeTab === "Cancelled Orders") {
        paginatedOrders = paginationArr(cancelled, 20);
        allOrders = cancelled;
      }
      setOrderTabData((oldState) => {
        let newState = oldState.map((item) => {
          if (item.title === "Pending Orders")
            return { ...item, value: pending?.length };
          if (item.title === "Delivered Orders")
            return { ...item, value: completed?.length };
          if (item.title === "Cancelled Orders")
            return { ...item, value: cancelled?.length };
          return item;
        });
        return newState;
      });

      setOrders((oldState) => {
        return {
          ...oldState,
          paginatedOrders,
          generalOrders: pending.concat(completed, cancelled),
          allOrders,
        };
      });
      if (allOrders.length === 0) {
        return setStatus({ isEmpty: true, isError: false, isLoading: false });
      }
      return setStatus({ isEmpty: false, isError: false, isLoading: false });
    } catch (error) {
      setStatus({ isEmpty: false, isLoading: false, isError: true });
      throw new Error(error);
    }
  }, [activeTab]);

  useEffect(() => {
    getOrders();
  }, [activeTab, getOrders]);

  useEffect(() => {
    if (qty && qty !== "") {
      setActiveTab(qty);
    }
  }, [qty]);
  return (
    <MainContainer className="relative">
      <FirstSection className="w-full">
        <ScreenHeader title="Orders" value={orders.generalOrders?.length} />
        <GeneralHeaderTab
          data={orderTabData}
          activeTab={activeTab}
          changeTab={(val) => changeTab(val)}
        />
        <GeneralFilterTab
          filter={filterValue}
          filterData={orderFilter}
          changeFilter={(val) => setFilterValue(val)}
        />
        <GeneralPagination
          cancelText="Cancel Order"
          deleteText="delete Order"
          pag
          handlePagination={handlePagination}
          pageNumber={orders.pageIndex}
          itemsNumber={orders.paginatedOrders}
          totalNumber={orders.allOrders.length}
        />
        {status.isError && (
          <div className="text-secondary-error flex justify-center items-center py-16 w-full font-bold text-2xl uppercase">
            Error! Please Reload the Page
          </div>
        )}
        {!status.isError && status.isLoading && (
          <div className="w-full mt-32">
            <Loader />
          </div>
        )}
        {!status.isLoading && status.isEmpty && (
          <div className="text-secondary-yellow flex justify-center items-center py-16 w-full font-bold text-2xl uppercase">{`No ${activeTab} to display`}</div>
        )}
        {!status.isError &&
          !status.isLoading &&
          orders.allOrders?.length > 0 && (
            <OrderTable
              showCheck
              tableHeaderData={orderTableHeader}
              tableData={orders.paginatedOrders[orders.pageIndex]}
              activeTab={activeTab}
              pageIndex={orders.pageIndex}
            />
          )}
      </FirstSection>
    </MainContainer>
  );
};

export default Orders;

const FirstSection = styled.div``;
