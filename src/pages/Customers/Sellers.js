import React, { useCallback, useEffect, useState } from "react";
import MainContainer from "../../components/Common/MainContainer/MainContainer";
import styled from "styled-components";
import ScreenHeader from "../../components/Common/ScreenTitle/ScreenHeader";
// orderFilter,
import { sellersHeader } from "../../data/data";
// import GeneralFilterTab from "../../components/Common/GeneralFilterTab/GeneralFilterTab";
import GeneralPagination from "../../components/Common/GeneralPagination/GeneralPagination";
import SellersTable from "../../components/Common/GenralTable/SellerTable";
import axios from "axios";
import NewLoader from "../../components/newLoader/newLoader";

const Customers = () => {
  const [customers, setCustomers] = useState({
    allCustomers: [],
    paginatedCustomers: [],
    pageIndex: 0,
  });
  const [status, setStatus] = useState({ isLoading: true, isError: false });
  // const [filterValue, setFilterValue] = useState("");
  console.log(customers);
  const url = "https://thrindleservices.herokuapp.com/api/thrindle/sellers";

  // Break Customers Array into smaller arrays for pagination
  const paginationArr = (arr, size) =>
    Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
      arr.slice(i * size, i * size + size)
    );

  // Get All Sellers
  const handleGetCustomers = useCallback(async () => {
    setStatus({ isLoading: true, isError: false });
    setCustomers((oldCustomers) => {
      return { ...oldCustomers, paginatedCustomers: [], allCustomers: [] };
    });
    try {
      let {
        status: statusCode,
        data: { data: allCustomers },
      } = await axios.get(`${url}/users/admin/sellers`);
      if (statusCode > 399)
        return setStatus({ isError: true, isLoading: false });
      let paginatedCustomers = paginationArr(allCustomers.reverse(), 20);
      setCustomers((oldCustomers) => {
        return { ...oldCustomers, paginatedCustomers, allCustomers };
      });
      return setStatus({ isError: false, isLoading: false });
    } catch (error) {
      setStatus({ isLoading: false, isError: true });
      throw new Error(error);
    }
  }, []);

  // HandlePagination
  const handlePagination = (type) => {
    switch (type) {
      case "NEXT_PAGE":
        setCustomers((oldCustomers) => {
          if (
            oldCustomers.paginatedCustomers.length - 1 ===
            oldCustomers.pageIndex
          ) {
            return oldCustomers;
          }
          return { ...oldCustomers, pageIndex: oldCustomers.pageIndex + 1 };
        });
        break;
      case "PREVIOUS_PAGE":
        setCustomers((oldCustomers) => {
          if (oldCustomers.pageIndex === 0) {
            return oldCustomers;
          }
          return { ...oldCustomers, pageIndex: oldCustomers.pageIndex - 1 };
        });
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
        <ScreenHeader title="Sellers" value={customers.allCustomers.length} />
        {/* <GeneralFilterTab
          filter={filterValue}
          filterData={orderFilter}
          changeFilter={(val) => setFilterValue(val)}
        /> */}
        <GeneralPagination
          showButtons={false}
          pag
          handlePagination={handlePagination}
          pageNumber={customers.pageIndex}
          itemsNumber={customers.paginatedCustomers}
          totalNumber={customers.allCustomers.length}
        />
        {status.isError && <div>Error! Please Reload the Page</div>}
        {!status.isError &&
          !status.isLoading &&
          customers.allCustomers.length > 0 && (
            <SellersTable
              tableHeaderData={sellersHeader}
              tableData={customers.paginatedCustomers[customers.pageIndex]}
              showCheck
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

export default Customers;

const FirstSection = styled.div``;
