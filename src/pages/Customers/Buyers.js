import React, { useCallback, useEffect, useState } from "react";
import MainContainer from "../../components/Common/MainContainer/MainContainer";
import styled from "styled-components";
import ScreenHeader from "../../components/Common/ScreenTitle/ScreenHeader";
// orderFilter import from data
import { buyersHeader } from "../../data/data";
// import GeneralPagination from "../../components/Common/GeneralPagination/GeneralPagination";
import BuyersTable from "../../components/Common/GenralTable/BuyersTable";
import axiosInstance from "../../utils/axiosInstance";
import NewLoader from "../../components/newLoader/newLoader";
import { useSearchParams } from "react-router-dom";
import ApprovedProductPagination from "../../components/Common/GeneralPagination/ApprovedProductPagination";
import ApprovedFilter from "../../components/Common/GeneralFilterTab/ApprovedProductsFilter";

const Buyers = () => {
  const [customers, setCustomers] = useState({
    allCustomers: [],
    pageIndex: 0,
    codes: [],
    currentCode: "",
  });
  const [status, setStatus] = useState({ isLoading: true, isError: false });
  const [searchParams, setSearchParams] = useSearchParams();

  const page = searchParams.get("page");
  const search = searchParams.get("search");

  // Get All Buyers
  const handleGetCustomers = useCallback(async () => {
    setStatus({ isLoading: true, isError: false });
    setCustomers((oldCustomers) => {
      return {
        ...oldCustomers,
        allCustomers: [],
        pageNumber: 1,
        pageInfo: null,
      };
    });
    try {
      let url = `users/admin/buyers?page=${page ? page : 1}`;

      if (search) {
        url = `${url}&identifier=${search}`;
      }

      let {
        data: { data: allCustomers, pageInfo },
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

      setCustomers((oldCustomers) => {
        return {
          ...oldCustomers,
          allCustomers,
          pageInfo,
        };
      });
      return setStatus({ isError: false, isLoading: false });
    } catch (error) {
      setStatus({ isLoading: false, isError: true });
      throw new Error(error);
    }
  }, [page, search]);

  const changePage = (type, payload = customers.pageInfo?.currentPage) => {
    let changeParams = {};

    if (search) {
      changeParams.search = search;
    }

    switch (type) {
      case "NEXT_PAGE":
        changeParams.page = customers.pageInfo?.next?.page;
        setSearchParams(changeParams);
        break;
      case "PREVIOUS_PAGE":
        changeParams.page = customers.pageInfo?.previous?.page;
        setSearchParams(changeParams);
        break;
      case "FIRST_PAGE":
        if (payload === 1) return;
        changeParams.page = 1;
        setSearchParams(changeParams);
        break;
      case "LAST_PAGE":
        if (payload === customers.pageInfo?.totalPages) return;
        changeParams.page = customers.pageInfo?.totalPages;
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

  useEffect(() => {
    handleGetCustomers();
  }, [handleGetCustomers]);

  return (
    <MainContainer>
      <FirstSection className="w-full">
        <ScreenHeader
          title="Buyers"
          value={customers.pageInfo?.totalHits || 0}
        />
        {/* <BuyersFilterTab
          filter={filterValue}
          filterData={customers?.codes}
          customers={customers}
          setCustomers={setCustomers}
          changeFilter={(val) => setFilterValue(val)}
        /> */}
        <ApprovedFilter setProducts={handleGetCustomers} />
        <ApprovedProductPagination
          pageIndex={page || 1}
          handlePagination={changePage}
          pageInfo={customers.pageInfo}
          pageLength={customers.allCustomers.length}
        />
        {/* <GeneralPagination
          showButtons={false}
          pag
          handlePagination={handlePagination}
          pageNumber={customers.pageIndex}
          itemsNumber={customers.paginatedCustomers}
          totalNumber={customers.allCustomers.length}
        /> */}
        {status.isError && <div>Error! Please Reload the Page</div>}
        {!status.isError &&
          !status.isLoading &&
          customers.allCustomers.length > 0 && (
            <BuyersTable
              tableHeaderData={buyersHeader}
              tableData={customers.allCustomers}
              pageIndex={customers.pageIndex}
            />
          )}
        {!status.isError && status.isLoading && (
          <div className="h-96">
            <NewLoader />
          </div>
        )}
      </FirstSection>
    </MainContainer>
  );
};

export default Buyers;

const FirstSection = styled.div``;
