import React, { useCallback, useEffect, useState } from "react";
import MainContainer from "../../components/Common/MainContainer/MainContainer";
import styled from "styled-components";
import ScreenHeader from "../../components/Common/ScreenTitle/ScreenHeader";
// orderFilter,
import { sellersHeader } from "../../data/data";
import SellersTable from "../../components/Common/GenralTable/SellerTable";
import NewLoader from "../../components/newLoader/newLoader";
import axiosInstance from "../../utils/axiosInstance";
import { useSearchParams } from "react-router-dom";
import ApprovedFilter from "../../components/Common/GeneralFilterTab/ApprovedProductsFilter";
import ApprovedProductPagination from "../../components/Common/GeneralPagination/ApprovedProductPagination";

const Customers = () => {
  const [customers, setCustomers] = useState({
    allCustomers: [],

    currentMarket: "",
  });
  const [status, setStatus] = useState({ isLoading: true, isError: false });

  const [searchParams, setSearchParams] = useSearchParams();

  const page = searchParams.get("page") || 1;

  const search = searchParams.get("search") || 1;

  // Get All Sellers
  const handleGetCustomers = useCallback(async () => {
    setStatus({ isLoading: true, isError: false });
    setCustomers((oldCustomers) => {
      return {
        ...oldCustomers,
        allCustomers: [],
        markets: [],
        pageInfo: null,
      };
    });
    try {
      let url = `/users/admin/sellers?page=${page}`;

      if (search && search.length) {
        url = `${url}&identifier=${search}`;
      }

      let {
        status: statusCode,
        data: { data: allCustomers, pageInfo },
      } = await axiosInstance.get(url);
      if (statusCode > 399)
        return setStatus({ isError: true, isLoading: false });

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

  // HandlePagination
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
          title="Sellers"
          value={customers.pageInfo?.totalHits || 0}
        />

        {status.isError && <div>Error! Please Reload the Page</div>}
        {!status.isError &&
          !status.isLoading &&
          customers.allCustomers.length > 0 && (
            <>
              <ApprovedFilter setProducts={handleGetCustomers} />
              <ApprovedProductPagination
                pageIndex={page}
                handlePagination={changePage}
                pageInfo={customers.pageInfo}
                pageLength={customers.allCustomers.length}
              />
              <SellersTable
                tableHeaderData={sellersHeader}
                tableData={customers.allCustomers}
                showCheck
                pageIndex={page}
                handleGetCustomers={handleGetCustomers}
              />
            </>
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

export default Customers;

const FirstSection = styled.div``;
