import { useState, useEffect, useCallback } from "react";
import MainContainer from "../../components/Common/MainContainer/MainContainer";
import styled from "styled-components";
import ScreenHeader from "../../components/Common/ScreenTitle/ScreenHeader";
import GeneralHeaderTab from "../../components/Common/GeneralHeaderTab/GeneralHeaderTab";
// orderFilter;
import {
  orderData,
  orderTableHeader,
  orderTableHeaderNoAction,
  orderMarkets,
} from "../../data/data";
// import GeneralFilterTab from "../../components/Common/GeneralFilterTab/GeneralFilterTab";
import OrderTable from "../../components/Common/GenralTable/OrderTable";
import axiosInstance from "../../utils/axiosInstance";
import axios from "axios";
import { toast } from "react-toastify";
import NewLoader from "../../components/newLoader/newLoader";
import UpdateDeliveryStatusModal from "./updateDeliveryStatusModal";
import { useSearchParams } from "react-router-dom";
import ApprovedProductPagination from "../../components/Common/GeneralPagination/ApprovedProductPagination";

const Orders = (props) => {
  const [orders, setOrders] = useState({
    generalOrders: 0,
    allOrders: [],
    paginatedOrders: [],
    pageIndex: 0,
    pageInfo: null,
  });

  // const [activeTab, setActiveTab] = useState("Pending Orders");
  const [openModal, setOpenModal] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [activeID, setActiveID] = useState(null);

  const [status, setStatus] = useState({
    isLoading: true,
    isError: false,
    isEmpty: false,
  });
  const [orderTabData, setOrderTabData] = useState(orderData);

  // handel location of the page
  const [searchParams, setSearchParams] = useSearchParams();

  const marketType = searchParams.get("q");
  const page = searchParams.get("page");
  const activeTab = searchParams.get("tab");

  // const qty = props?.location?.search
  //   ? props.location.search.split("=")[1]
  //   : "Pending Orders";

  const changePage = (type, payload = orders.pageInfo?.currentPage) => {
    let changeParams = {};

    if (marketType) {
      changeParams.q = marketType;
    }

    if (activeTab) {
      changeParams.tab = activeTab;
    }

    console.log({ changeParams });

    switch (type) {
      case "NEXT_PAGE":
        changeParams.page = orders.pageInfo?.next?.page;
        setSearchParams(changeParams);
        break;
      case "PREVIOUS_PAGE":
        changeParams.page = orders.pageInfo?.previous?.page;
        setSearchParams(changeParams);
        break;
      case "FIRST_PAGE":
        if (payload === 1) return;
        changeParams.page = 1;
        setSearchParams(changeParams);
        break;
      case "LAST_PAGE":
        if (payload === orders.pageInfo?.totalPages) return;
        changeParams.page = orders.pageInfo?.totalPages;
        setSearchParams(changeParams);
        break;
      case "GO_TO_PAGE":
        changeParams.page = payload;
        setSearchParams(changeParams);
        break;
      default:
        console.log("Argumenet NOT handled");
        break;
    }
  };

  const changeTab = (val) => {
    const changeParams = { tab: val };
    if (marketType) {
      changeParams.q = marketType;
    }
    setSearchParams(changeParams);
    // setOrders({ ...orders, pageIndex: 0 });
  };

  const changeMarket = (val) => {
    if (val === "Thrindle Market") {
      setSearchParams({ q: "market" });
    }
    if (val === "Thrindle Mall") {
      setSearchParams({ q: "mall" });
    }
    // setOrders({ ...orders, pageIndex: 0 });
  };

  const getOrders = useCallback(async () => {
    if (!marketType | (marketType === "mall") | (marketType === "market")) {
      setStatus({ isLoading: true, isError: false, isEmpty: false });

      setOrders((oldOrders) => {
        return {
          ...oldOrders,
          paginatedOrders: [],
          allOrders: [],
        };
      });
    } else {
      return setStatus({ isLoading: false, isError: false, isEmpty: true });
    }

    let url = "orders/admin/getOrders?";
    let pageNum = page ? page : 1;
    url = `${url}page=${pageNum}`;
    if (marketType === "mall") {
      url = `${url}&market=mall`;
    }

    if (marketType === "market" | !marketType) {
      url = `${url}&market=market`;
    }

    console.log({url});

    let allUrl = [
      `${url}&type=pending`,
      `${url}&type=completed`,
      `${url}&type=cancelled`,
    ];

    try {
      let [
        { orders: pending, pageInfo: pendingPageInfo },
        { orders: completed, pageInfo: completedPageInfo },
        { orders: cancelled, pageInfo: cancelledPageInfo },
      ] = await axios.all(
        allUrl.map(async (endpoint) => {
          try {
            let {
              data: { data },
            } = await axiosInstance.get(endpoint);
            return data;
          } catch (error) {
            if (error.message) {
              throw new Error(error.message);
            }
            throw new Error(error);
          }
        })
      );

      let paginatedOrders, allOrders;

      const numberOfPagesToBeDisplayed = 5;
      let pageNumber = Number(page);

      let rightHandSide;

      if ((activeTab === "Pending Orders") | !activeTab) {
        paginatedOrders = pending;
        allOrders = pending;
        rightHandSide = Array.from(
          { length: pendingPageInfo.totalPages },
          (_, index) => index + 1
        );
      }
      if (activeTab === "Delivered Orders") {
        paginatedOrders = completed;
        allOrders = completed;
        rightHandSide = Array.from(
          { length: completedPageInfo.totalPages },
          (_, index) => index + 1
        );
      }
      if (activeTab === "Cancelled Orders") {
        paginatedOrders = cancelled;
        allOrders = cancelled;
        rightHandSide = Array.from(
          { length: cancelledPageInfo.totalPages },
          (_, index) => index + 1
        );
      }
      let leftHandSide;
      leftHandSide = rightHandSide.splice(0, pageNumber);

      let maxLeft =
        rightHandSide.length < 3
          ? numberOfPagesToBeDisplayed - rightHandSide.length
          : 3;
      let maxRight =
        leftHandSide.length < 3
          ? numberOfPagesToBeDisplayed - leftHandSide.length
          : 2;

      //Get first three items from leftHandSide if its length
      // is larger than 3
      leftHandSide = leftHandSide.reverse().slice(0, maxLeft).reverse();
      rightHandSide = rightHandSide.slice(0, maxRight);
      let newPages = leftHandSide
        .concat(rightHandSide)
        .map((item) => ({ page: item, limit: 20 }));

      if (activeTab === "Pending Orders") {
        pendingPageInfo.displayPages = newPages;
        pendingPageInfo.currentPage = pageNumber;
      }

      if (activeTab === "Delivered Orders") {
        completedPageInfo.displayPages = newPages;
        completedPageInfo.currentPage = pageNumber;
      }
      if (activeTab === "Cancelled Orders") {
        cancelledPageInfo.displayPages = newPages;
        cancelledPageInfo.currentPage = pageNumber;
      }

      setOrderTabData((oldState) => {
        let newState = oldState.map((item) => {
          if (item.title === "Pending Orders")
            return { ...item, value: pendingPageInfo?.totalHits };
          if (item.title === "Delivered Orders")
            return { ...item, value: completedPageInfo?.totalHits };
          if (item.title === "Cancelled Orders")
            return { ...item, value: cancelledPageInfo?.totalHits };
          return item;
        });
        return newState;
      });

      setOrders((oldState) => {
        const newState = oldState;
        if (activeTab === "Pending Orders") newState.pageInfo = pendingPageInfo;
        if (activeTab === "Delivered Orders")
          newState.pageInfo = completedPageInfo;
        if (activeTab === "Cancelled Orders")
          newState.pageInfo = cancelledPageInfo;
        return {
          ...newState,
          paginatedOrders,
          generalOrders:
            pendingPageInfo.totalHits +
            completedPageInfo.totalHits +
            cancelledPageInfo.totalHits,
          allOrders,
        };
      });
      if (allOrders?.length === 0) {
        return setStatus({ isEmpty: true, isError: false, isLoading: false });
      }
      return setStatus({ isEmpty: false, isError: false, isLoading: false });
    } catch (error) {
      setStatus({ isEmpty: false, isLoading: false, isError: true });
      if (error.message) {
        toast.error(error.message);
        throw new Error(error.message);
      }
      toast.error("Something went wrong");
      throw new Error(error);
    }
  }, [activeTab, marketType, page]);

  useEffect(() => {
    getOrders();
  }, [activeTab, getOrders]);

  // useEffect(() => {
  //   if (qty && qty !== "") {
  //     setActiveTab(qty);
  //   }
  // }, [qty]);
  return (
    <MainContainer className="relative">
      <FirstSection className="w-full">
        <ScreenHeader title="Orders" value={orders.generalOrders} />
        <div className="mb-8">
          <GeneralHeaderTab
            data={orderMarkets}
            noCounter={true}
            activeTab={
              !marketType | (marketType === "market")
                ? "Thrindle Market"
                : marketType === "mall"
                ? "Thrindle Mall"
                : ""
            }
            changeTab={changeMarket}
          />
        </div>
        <GeneralHeaderTab
          data={orderTabData}
          activeTab={!activeTab ? orderTabData[0].title : activeTab}
          changeTab={(val) => changeTab(val)}
        />
        {/* <GeneralFilterTab
          filter={filterValue}
          filterData={orderFilter}
          changeFilter={(val) => setFilterValue(val)}
        /> */}
        <ApprovedProductPagination
          pag
          pageIndex={page ? page : 1}
          handlePagination={changePage}
          pageInfo={orders.pageInfo}
          pageLength={orders.allOrders?.length}
          pageNumber={orders.pageIndex}
          itemsNumber={orders.paginatedOrders}
          totalNumber={orders.allOrders?.length}
          showButtons={false}
        />
        {status.isError && (
          <div className="text-secondary-error flex justify-center items-center py-16 w-full font-bold text-2xl uppercase">
            Error! Please Reload the Page
          </div>
        )}
        {!status.isError && status.isLoading && (
          <div className="h-96">
            <NewLoader />
          </div>
        )}
        {!status.isLoading && status.isEmpty && (
          <div className="text-secondary-yellow flex justify-center items-center py-16 w-full font-bold text-2xl uppercase">
            {`No ${activeTab ? activeTab : orderTabData[0].title} to display`}
          </div>
        )}
        {!status.isError &&
          !status.isLoading &&
          orders.allOrders?.length > 0 && (
            <OrderTable
              showCheck
              tableHeaderData={
                activeTab === "Pending Orders"
                  ? orderTableHeader
                  : orderTableHeaderNoAction
              }
              tableData={orders.allOrders}
              activeTab={activeTab}
              pageIndex={orders.pageIndex}
              setOpenModal={setOpenModal}
              setModalType={setModalType}
              setActiveID={setActiveID}
            />
          )}
        {openModal && (
          <UpdateDeliveryStatusModal
            modalType={modalType}
            setOpenModal={setOpenModal}
            activeID={activeID}
            getOrders={getOrders}
          />
        )}
      </FirstSection>
    </MainContainer>
  );
};

export default Orders;

const FirstSection = styled.div``;
