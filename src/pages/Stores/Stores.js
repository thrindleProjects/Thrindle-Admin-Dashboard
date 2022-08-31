import React, { useCallback, useEffect, useState } from "react";
import MainContainer from "../../components/Common/MainContainer/MainContainer";
import styled from "styled-components";
import ScreenHeader from "../../components/Common/ScreenTitle/ScreenHeader";
import GeneralHeaderTab from "../../components/Common/GeneralHeaderTab/GeneralHeaderTab";
import { storeHeader, storeData } from "../../data/data";
import GeneralPagination from "../../components/Common/GeneralPagination/GeneralPagination";
import StoresFilterTab from "../../components/Common/GeneralFilterTab/StoresFilterTab";
import StoreTable from "../../components/Common/GenralTable/StoreTable";
import axiosInstance from "../../utils/axiosInstance";
import paginationArr from "../../utils/pagination";
import {
  setStoresData,
  increasePageIndex,
  decreasePageIndex,
} from "../../redux/actions/storesActions/actions";
import { toast } from "react-toastify";
import NewLoader from "../../components/newLoader/newLoader";
import getMarketName from "../../utils/getMarketName";
import { useDispatch, useSelector } from "react-redux";

const Stores = () => {
  const [activeTab, setActiveTab] = useState("Approved Stores");
  const [filterValue, setFilterValue] = useState("");
  const [totalStores, setTotalStores] = useState(0);
  const [storeHeaderData, setStoreHeaderData] = useState(storeData);
  const [loadingStores, setLoadingStores] = useState(false);
  // console.log();

  // Redux stuff
  const dispatch = useDispatch();
  const stores = useSelector((state) => state.stores);

  const changeTab = (val) => {
    setActiveTab(val);
  };

  // HandlePagination
  const handlePagination = (type) => {
    switch (type) {
      case "NEXT_PAGE":
        if (stores.pageIndex < stores.paginatedStores.length - 1) {
          dispatch(increasePageIndex(stores.pageIndex + 1));
        }
        break;
      case "PREVIOUS_PAGE":
        if (stores.pageIndex > 0) {
          dispatch(decreasePageIndex(stores.pageIndex - 1));
        }
        break;
      default:
        console.log("Argumenet NOT handled");
        break;
    }
  };


  // Sort stores by date
  const objSort = (a, b) => {
    let x = a.owner_id?.createdAt
    let y = b.owner_id?.createdAt
    if (x < y) {
      return -1;
    }
    if (x > y) {
      return 1;
    }
    return 0;
  };

  // const  sortedData = data.sort((a, b) => {
  //       const dateA = a.createdAt;
  //       const dateB = b.createdAt;
  //       if (dateA > dateB) {
  //         return -1;
  //       }
  //       if (dateA < dateB) {
  //         return 1;
  //       }
  //       return 0;
  //     });

  const filterOnLoad = useCallback(() => {
    if (stores.allStoresImmutable.length > 0 && totalStores > 0) {
      let allStoresImmutable = stores.allStoresImmutable;
      let allStores = stores.allStoresImmutable;
      let paginatedStores = [];
      let pageIndex = stores.pageIndex;
      let currentMarket = stores.currentMarket;

      // Check If Page Index is higher than paginated stores length
      // Check if input filter value is empty
      // Check if search value is empty

      // Filter By Active Market
      if (!["", "All"].includes(stores.currentMarket)) {
        allStores = allStores.filter(
          (item) => getMarketName(item?.owner_id?.store_id) === currentMarket
        );
      }

      if (stores.nameFilter.length > 0) {
        allStores = allStores.filter((item) => {
          return (
            item.store_name
              .toLowerCase()
              .includes(stores.nameFilter.toLowerCase()) ||
            item?.owner_id?.store_id
              .toLowerCase()
              .includes(stores.nameFilter.toLowerCase())
          );
        });
      }
      paginatedStores = paginationArr(allStores, 20);

      if (paginatedStores.length === 1) {
        pageIndex = 0;
      }

      let storeData = {
        allStores,
        allStoresImmutable,
        paginatedStores,
        markets: Array.from(
          new Set(
            allStoresImmutable?.map((item) =>
              getMarketName(item?.owner_id?.store_id)
            )
          )
        ),
        pageIndex,
      };
      // console.log(storeData);
      dispatch(setStoresData(storeData));
      setLoadingStores(false);
    }
  }, [
    dispatch,
    stores.nameFilter,
    stores.pageIndex,
    stores.currentMarket,
    stores.allStoresImmutable,
    totalStores,
  ]);

  const fetchStores = useCallback(async () => {
    setLoadingStores(true);
    try {
      let {
        data: { data },
      } = await axiosInstance.get(`stores/allstores`);
      let allStores = data.sort(objSort).reverse();
      console.log(data)
      // Redux logic here
      dispatch(setStoresData({ allStoresImmutable: allStores }));
      setStoreHeaderData((prevState) => {
        let currentState = prevState.map((item) => {
          if (item.title === "Approved Stores") {
            return { ...item, value: allStores?.length };
          }
          return item;
        });
        return currentState;
      });
      setTotalStores(allStores.length);
    } catch (error) {
      if (error.response) {
        toast.warning(`${error.response.data.message}`);
      } else {
        toast.error(`${error}`);
      }
    }
  }, [dispatch]);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      fetchStores();
    }

    return () => {
      mounted = false;
    };
  }, [fetchStores]);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      filterOnLoad();
    }

    return () => {
      mounted = false;
    };
  }, [filterOnLoad]);

  return (
    <MainContainer>
      <FirstSection className="w-full">
        <ScreenHeader title="Stores" value={totalStores} />
        <GeneralHeaderTab
          data={storeHeaderData}
          activeTab={activeTab}
          changeTab={(val) => changeTab(val)}
        />
        {!loadingStores && (
          <>
            <StoresFilterTab
              filter={filterValue}
              filterData={stores?.markets}
              stores={stores}
              // setStores={setStores}
              changeFilter={(val) => setFilterValue(val)}
              allStores={stores.allStores}
            />
            <GeneralPagination
              showButtons={false}
              pag
              handlePagination={handlePagination}
              pageNumber={stores?.pageIndex}
              itemsNumber={stores?.paginatedStores}
              totalNumber={stores?.allStores?.length}
            />
          </>
        )}
        {loadingStores && (
          <div className="h-52 flex items-center justify-center">
            <NewLoader />
          </div>
        )}
        {!loadingStores && (
          <StoreTable
            tableHeaderData={storeHeader}
            tableData={stores.paginatedStores[stores.pageIndex]}
            pageIndex={stores.pageIndex}
            showCheck
          />
        )}
      </FirstSection>
    </MainContainer>
  );
};

export default Stores;

const FirstSection = styled.div``;
