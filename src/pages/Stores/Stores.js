import React, { useEffect, useState } from "react";
import MainContainer from "../../components/Common/MainContainer/MainContainer";
import styled from "styled-components";
import ScreenHeader from "../../components/Common/ScreenTitle/ScreenHeader";
import GeneralHeaderTab from "../../components/Common/GeneralHeaderTab/GeneralHeaderTab";
import { storeFilter, storeHeader } from "../../data/data";
import GeneralPagination from "../../components/Common/GeneralPagination/GeneralPagination";
import GeneralFilterTab from "../../components/Common/GeneralFilterTab/GeneralFilterTab";
import StoreTable from "../../components/Common/GenralTable/StoreTable";
import axiosInstance from "../../utils/axiosInstance";
import { toast } from "react-toastify";
import Image9 from "../../assets/images/pending-store.svg";
import Image10 from "../../assets/images/inactive-store.svg";
import Image11 from "../../assets/images/approved-store.svg";
import NewLoader from "../../components/newLoader/newLoader";

const Stores = () => {
  const [activeTab, setActiveTab] = useState("Pending Stores");
  const [filterValue, setFilterValue] = useState("");
  const [storeTableData, setStoreTableData] = useState([]);
  const [loadingStores, setLoadingStores] = useState(false);

  const storeData = [
    {
      title: "Pending Stores",
      color: "#F69F13",
      icon: Image10,
      activeIcon: Image9,
      value: 0,
    },
    {
      title: "Approved Stores",
      color: "#4BC7EA",
      icon: Image10,
      activeIcon: Image11,
      value: storeTableData.length,
    },
  ];

  const changeTab = (val) => {
    setActiveTab(val);
  };

  useEffect(() => {
    let mounted = true;
    let cachedStores = JSON.parse(sessionStorage.getItem("allStores"));

    if (mounted) {
      if (cachedStores) {
        setLoadingStores(false);
        setStoreTableData(cachedStores);
      } else {
        const fetchStores = async () => {
          setLoadingStores(true);
          try {
            let res = await axiosInstance.get(`stores/allstores`);
            sessionStorage.setItem("allStores", JSON.stringify(res.data.data));
            setLoadingStores(false);
            setStoreTableData(res.data.data);
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
    }

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <MainContainer>
      <FirstSection className="w-full">
        {loadingStores ? (
          <div className="h-vh80">
            <NewLoader />
          </div>
        ) : (
          <>
            <ScreenHeader title="Stores" value={storeTableData.length} />
            <GeneralHeaderTab 
              data={storeData}
              activeTab={activeTab}
              changeTab={(val) => changeTab(val)}
            />
            <GeneralFilterTab
              filter={filterValue}
              filterData={storeFilter}
              changeFilter={(val) => setFilterValue(val)}
            />
            <GeneralPagination
              cancelText="Cancel Order"
              deleteText="delete Order"
            />
            <StoreTable
              tableHeaderData={storeHeader}
              tableData={storeTableData}
              showCheck
            />
          </>
        )}
      </FirstSection>
    </MainContainer>
  );
};

export default Stores;

const FirstSection = styled.div``;
