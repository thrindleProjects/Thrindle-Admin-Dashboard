import React, { useEffect, useState } from "react";
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
import { toast } from "react-toastify";
import NewLoader from "../../components/newLoader/newLoader";
import getMarketName from "../../utils/getMarketName";

const Stores = () => {
  const [activeTab, setActiveTab] = useState("Approved Stores");
  const [filterValue, setFilterValue] = useState("");
  const [totalStores, setTotalStores] = useState(0);
  const [stores, setStores] = useState({
    allStores: [],
    allStoresImmutable: [],
    paginatedStores: [],
    pageIndex: 0,
    markets: [],
    currentMarket: "",
  });

  const [storeHeaderData, setStoreHeaderData] = useState(storeData);
  const [loadingStores, setLoadingStores] = useState(false);

  const changeTab = (val) => {
    setActiveTab(val);
  };

  // HandlePagination
  const handlePagination = (type) => {
    switch (type) {
      case "NEXT_PAGE":
        setStores((oldStores) => {
          if (oldStores.paginatedStores.length - 1 === oldStores.pageIndex) {
            return oldStores;
          }
          return { ...oldStores, pageIndex: oldStores.pageIndex + 1 };
        });
        break;
      case "PREVIOUS_PAGE":
        setStores((oldStores) => {
          if (oldStores.pageIndex === 0) {
            return oldStores;
          }
          return { ...oldStores, pageIndex: oldStores.pageIndex - 1 };
        });
        break;
      default:
        console.log("Argumenet NOT handled");
        break;
    }
  };

  // Sort stores alphabetically
  const objSort = (a, b) => {
    let x = a.store_name.toLowerCase();
    let y = b.store_name.toLowerCase();
    if (x < y) {
      return -1;
    }
    if (x > y) {
      return 1;
    }
    return 0;
  };

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      const fetchStores = async () => {
        setLoadingStores(true);
        try {
          let {
            data: { data },
          } = await axiosInstance.get(`stores/allstores`);
          let allStores = data.sort(objSort);
          setStores((oldState) => {
            return {
              ...oldState,
              allStores,
              allStoresImmutable: allStores,
              paginatedStores: paginationArr(allStores, 20),
              markets: Array.from(
                new Set(
                  allStores?.map((item) => {
                    return getMarketName(item?.owner_id?.store_id);
                  })
                )
              ),
            };
          });
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
          setLoadingStores(false);
        } catch (error) {
          if (error.response) {
            toast.warning(`${error.response.data.message}`);
          } else {
            toast.error(`${error}`);
          }
        } finally {
          setLoadingStores(false);
        }
      };

      fetchStores();
    }

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <MainContainer>
      <FirstSection className="w-full">
        <ScreenHeader title="Stores" value={totalStores} />
        <GeneralHeaderTab
          data={storeHeaderData}
          activeTab={activeTab}
          changeTab={(val) => changeTab(val)}
        />
        <StoresFilterTab
          filter={filterValue}
          filterData={stores?.markets}
          stores={stores}
          setStores={setStores}
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
