import React, { useCallback, useEffect, useState } from "react";
import MainContainer from "../../components/Common/MainContainer/MainContainer";
import styled from "styled-components";
import ScreenHeader from "../../components/Common/ScreenTitle/ScreenHeader";
import { orderFilter, customerHeader } from "../../data/data";
import GeneralFilterTab from "../../components/Common/GeneralFilterTab/GeneralFilterTab";
import GeneralPagination from "../../components/Common/GeneralPagination/GeneralPagination";
import CustomerTable from "../../components/Common/GenralTable/CustomerTable";
import Loader from "../../components/Common/Loader/Loader";
import axios from "axios";

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [status, setStatus] = useState({ isLoading: true, isError: false });
  const url = "https://thrindleservices.herokuapp.com/api/thrindle/sellers";

  console.log(customers);

  const handleGetCustomers = useCallback(async () => {
    setStatus({ isLoading: true, isError: false });
    setCustomers([]);
    try {
      let {
        status: statusCode,
        data: { data: allCustomers },
      } = await axios.get(`${url}/users/admin/buyers`);
      if (statusCode > 399)
        return setStatus({ isError: true, isLoading: false });
      setCustomers(allCustomers);
      setStatus({ isError: false, isLoading: false });
    } catch (error) {
      setStatus({ isLoading: false, isError: true });
      throw new Error(error);
    }
  }, []);

  useEffect(() => {
    handleGetCustomers();
  }, [handleGetCustomers]);

  const [filterValue, setFilterValue] = useState("");
  return (
    <MainContainer>
      <FirstSection className='w-full'>
        <ScreenHeader title='Customers' value={1000} />
        <GeneralFilterTab
          filter={filterValue}
          filterData={orderFilter}
          changeFilter={(val) => setFilterValue(val)}
        />
        <GeneralPagination
          cancelText='Cancel Order'
          deleteText='delete Order'
        />
        {status.isError && <div>Error! Please Reload the Page</div>}
        {!status.isError && customers.length > 0 && (
          <CustomerTable
            tableHeaderData={customerHeader}
            tableData={customers}
            showCheck
          />
        )}
        {!status.isError && status.isLoading && <Loader />}
      </FirstSection>
    </MainContainer>
  );
};

export default Customers;

const FirstSection = styled.div``;
