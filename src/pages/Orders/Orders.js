import { useState, useEffect, useCallback } from 'react';
import MainContainer from '../../components/Common/MainContainer/MainContainer';
import styled from 'styled-components';
import ScreenHeader from '../../components/Common/ScreenTitle/ScreenHeader';
import GeneralHeaderTab from '../../components/Common/GeneralHeaderTab/GeneralHeaderTab';
import {
  orderData,
  orderFilter,
  orderTableHeader,
} from '../../data/data';
import GeneralFilterTab from '../../components/Common/GeneralFilterTab/GeneralFilterTab';
import GeneralPagination from '../../components/Common/GeneralPagination/GeneralPagination';
import OrderTable from '../../components/Common/GenralTable/OrderTable';
import axiosInstance from '../../utils/axiosInstance';
import Loader from '../../components/Common/Loader/Loader';

const Orders = (props) => {
  const [orders, setOrders] = useState({
    allOrders: [],
    paginatedOrders: [],
    pageIndex: 0,
  });
  const [activeTab, setActiveTab] = useState('Pending Orders');
  const [filterValue, setFilterValue] = useState('');
  const [status, setStatus] = useState({ isLoading: true, isError: false });
  const [orderTabData, setOrderTabData] = useState(orderData);

  const qty = props.location.search
    ? props.location.search.split('=')[1]
    : 'Pending Orders';
  const changeTab = (val) => {
    setActiveTab(val);
  };

  console.log(orders.paginatedOrders);

  // Break Customers Array into smaller arrays for pagination
  const paginationArr = (arr, size) =>
    Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
      arr.slice(i * size, i * size + size)
    );

  const getOrders = useCallback(async () => {
    setStatus({ isLoading: true, isError: false });
    setOrders((oldOrders) => {
      return { ...oldOrders, paginatedOrders: [], allOrders: [] };
    });
    let url = 'orders?type=';
    if (activeTab === 'Pending Orders') {
      url = `${url}pending`;
    }
    if (activeTab === 'Delivered Orders') {
      url = `${url}completed`;
    }
    if (activeTab === 'Cancelled Orders') {
      url = `${url}completed`;
    }
    if (activeTab === '') return;

    try {
      let {
        data: { data },
      } = await axiosInstance.get(url);
      let allOrders = data.reverse();
      let paginatedOrders = paginationArr(allOrders, 20);
      setOrderTabData((oldState) => {
        let newState = oldState.map((item) => {
          if (item.title !== activeTab) return item;
          return { ...item, value: allOrders.length };
        });
        return newState;
      });
      setOrders((oldState) => {
        return { ...oldState, allOrders, paginatedOrders };
      });
      return setStatus({ isError: false, isLoading: false });
    } catch (error) {
      throw new Error(error);
    }
  }, [activeTab]);

  useEffect(() => {
    getOrders();
  }, [activeTab, getOrders]);

  useEffect(() => {
    if (qty && qty !== '') {
      setActiveTab(qty);
    }
  }, [qty]);
  return (
    <MainContainer>
      <FirstSection className='w-full'>
        <ScreenHeader title='Orders' value={1000} />
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
          cancelText='Cancel Order'
          deleteText='delete Order'
        />
        {status.isError && <div>Error! Please Reload the Page</div>}
        {!status.isError && status.isLoading && (
          <div className='w-full mt-32'>
            <Loader />
          </div>
        )}
        {!status.isError &&
          !status.isLoading &&
          orders.allOrders.length > 0 && (
            <OrderTable
              tableHeaderData={orderTableHeader}
              tableData={orders.allOrders}
              showCheck
              activeTab={activeTab}
            />
          )}
      </FirstSection>
    </MainContainer>
  );
};

export default Orders;

const FirstSection = styled.div``;
