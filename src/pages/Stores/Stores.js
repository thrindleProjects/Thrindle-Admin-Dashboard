import React, { useCallback, useEffect, useState } from "react";
import MainContainer from "../../components/Common/MainContainer/MainContainer";
import styled from "styled-components";
import ScreenHeader from "../../components/Common/ScreenTitle/ScreenHeader";
import GeneralHeaderTab from "../../components/Common/GeneralHeaderTab/GeneralHeaderTab";
import { storeHeader, storeData } from "../../data/data";
import StoreTable from "../../components/Common/GenralTable/StoreTable";
import axiosInstance from "../../utils/axiosInstance";
import { toast } from "react-toastify";
import NewLoader from "../../components/newLoader/newLoader";
import { useSearchParams } from "react-router-dom";
import ApprovedProductPagination from "../../components/Common/GeneralPagination/ApprovedProductPagination";
import ApprovedFilter from "../../components/Common/GeneralFilterTab/ApprovedProductsFilter";

const Stores = () => {
  const [totalStores, setTotalStores] = useState(0);
  const [storeHeaderData, setStoreHeaderData] = useState(storeData);
  const [loadingStores, setLoadingStores] = useState(false);
  const [stores, setStores] = useState({
    allStores: [],
    pageInfo: null,
  });

  const [searchParams, setSearchParams] = useSearchParams();

  const page = searchParams.get("page");
  const tab = searchParams.get("tab");
  const search = searchParams.get("search");

  const changeTab = (val) => {
    const changeParams = {
      tab: val,
      page: page || 1,
    };

    if (search) {
      changeParams.search = search;
    }

    setSearchParams(changeParams);
  };

  const changePage = (type, payload = stores.pageInfo?.currentPage) => {
    let changeParams = { tab: tab || "Approved Stores" };

    if (search) {
      changeParams.search = search;
    }

    switch (type) {
      case "NEXT_PAGE":
        changeParams.page = stores.pageInfo?.next?.page;
        setSearchParams(changeParams);
        break;
      case "PREVIOUS_PAGE":
        changeParams.page = stores.pageInfo?.previous?.page;
        setSearchParams(changeParams);
        break;
      case "FIRST_PAGE":
        if (payload === 1) return;
        changeParams.page = 1;
        setSearchParams(changeParams);
        break;
      case "LAST_PAGE":
        if (payload === stores.pageInfo?.totalPages) return;
        changeParams.page = stores.pageInfo?.totalPages;
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

  const fetchStores = useCallback(async () => {
    setLoadingStores(true);
    try {
      let url = `stores/allstores?sort=-createdAt&page=${page || 1}`;

      if (search && search.length) {
        url = `${url}&identifier=${search}`;
      }

      let {
        data: {
          data: { data: allStores, pageInfo },
        },
      } = await axiosInstance.get(url);

      const numberOfPagesToBeDisplayed = 5;
      const pageNumber = Number(page);
      let rightHandSide = Array.from(
        { length: pageInfo.totalPages },
        (_, index) => index + 1
      );
      let leftHandSide = rightHandSide.splice(0, pageNumber);

      let maxLeft =
        rightHandSide.length < 3
          ? numberOfPagesToBeDisplayed - rightHandSide.length
          : 3;
      let maxRight =
        leftHandSide.length < 3
          ? numberOfPagesToBeDisplayed - leftHandSide.length
          : 2;

      leftHandSide = leftHandSide.reverse().slice(0, maxLeft).reverse();
      rightHandSide = rightHandSide.slice(0, maxRight);
      let newPages = leftHandSide
        .concat(rightHandSide)
        .map((item) => ({ page: item, limit: 20 }));

      pageInfo.displayPages = newPages;
      pageInfo.currentPage = pageNumber;

      setStores((old) => ({ ...old, allStores, pageInfo }));
      setStoreHeaderData((prevState) => {
        let currentState = prevState.map((item) => {
          if (item.title === "Approved Stores") {
            return { ...item, value: pageInfo.totalHits };
          }
          return item;
        });
        return currentState;
      });
      setTotalStores(pageInfo.totalHits);
      setLoadingStores(false);
    } catch (error) {
      if (error.response) {
        toast.warning(`${error.response.data.message}`);
      } else {
        toast.error(`${error}`);
      }
    }
  }, [page, search]);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      fetchStores();
    }

    return () => {
      mounted = false;
    };
  }, [fetchStores]);

  return (
    <MainContainer>
      <FirstSection className="w-full">
        <ScreenHeader title="Stores" value={totalStores} />
        <GeneralHeaderTab
          data={storeHeaderData}
          activeTab={tab || "Approved Stores"}
          changeTab={changeTab}
        />
        {!loadingStores && (
          <>
            <ApprovedFilter setProduct={fetchStores} />
            <ApprovedProductPagination
              pageIndex={page || 1}
              handlePagination={changePage}
              pageInfo={stores.pageInfo}
              pageLength={stores.allStores.length}
            />
            <StoreTable
              tableHeaderData={storeHeader}
              tableData={stores.allStores}
              pageIndex={page || 1}
              showCheck
            />
          </>
        )}
        {loadingStores && (
          <div className="h-52 flex items-center justify-center">
            <NewLoader />
          </div>
        )}
      </FirstSection>
    </MainContainer>
  );
};

export default Stores;

const FirstSection = styled.div``;
