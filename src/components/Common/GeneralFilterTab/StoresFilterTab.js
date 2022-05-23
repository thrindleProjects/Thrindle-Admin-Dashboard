import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { FaSearch, FaAngleDown } from "react-icons/fa";
import { HiDownload } from "react-icons/hi";
import paginationArr from "../../../utils/pagination";
import getMarketName from "../../../utils/getMarketName";
import { CSVLink } from "react-csv";
import { useDispatch, useSelector } from "react-redux";
import {
  setFilterNameValue,
  setStoresData,
} from "../../../redux/actions/storesActions/actions";
const StoresFilterTab = ({ filterData, stores, allStores }) => {
  const filterRef = useRef(null);
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const { nameFilter } = useSelector((state) => state.stores);

  const storeName = allStores.map((item) => item?.store_name);
  const address = allStores.map((item) => item?.store_address);
  const email = allStores.map((item) => item?.owner_id?.email);
  const phone = allStores.map((item) => item?.owner_id?.phone);
  const id = allStores.map((item) => item?.owner_id?.store_id);
  const merchantName = allStores.map((item) => item?.owner_id?.name);

  const storesData = [
    { ...id },
    { ...email },
    { ...phone },
    { ...storeName },
    { ...merchantName },
    { ...address },
  ];

  const storesReport = {
    filename: "Report.csv",
    data: storesData,
  };

  // console.log(storesReport);

  const filterByMarket = (category) => {
    let currentStores = stores.allStoresImmutable.filter(
      (item) => getMarketName(item?.owner_id?.store_id) === category
    );

    let filteredData = {
      allStores: currentStores,
      paginatedStores: [],
      currentMarket: category,
      pageIndex: 0,
    };

    if (nameFilter === "") {
      filteredData = {
        ...filteredData,
        paginatedStores: paginationArr(currentStores, 20),
      };
      dispatch(setStoresData(filteredData));
      // setStores((prevState) => {
      //   return {
      //     ...prevState,
      //     allStores: currentStores,
      //     paginatedStores: paginationArr(currentStores, 20),
      //     currentMarket: category,
      //     pageIndex: 0,
      //   };
      // });
    } else {
      currentStores = currentStores.filter((item) => {
        return (
          item.store_name?.toLowerCase().includes(nameFilter.toLowerCase()) ||
          item.owner_id.store_id
            .toLowerCase()
            .includes(nameFilter.toLowerCase())
        );
      });
      filteredData = {
        ...filteredData,
        paginatedStores: paginationArr(currentStores, 20),
      };
      dispatch(setStoresData(filteredData));
      // setStores((prevState) => {
      //   return {
      //     ...prevState,
      //     allStores: currentStores,
      //     paginatedStores: paginationArr(currentStores, 20),
      //     currentMarket: category,
      //     pageIndex: 0,
      //   };
      // });
    }
    setShow(false);
  };

  const handleFilterNameChange = (e) => {
    // store input value in a variable
    let value = e?.target?.value;

    dispatch(setFilterNameValue(value));

    // if input value is less than zero or for some reason is undefined
    // set table data based on the active filter value e.g
    let currentStores;
    if (["", "All"].includes(stores.currentMarket)) {
      currentStores = stores.allStoresImmutable;
    } else {
      currentStores = stores.allStoresImmutable.filter(
        (item) =>
          getMarketName(item?.owner_id?.store_id) === stores.currentMarket
      );
    }

    let filteredData = {
      allStores: currentStores,
      paginatedStores: [],
    };

    if (value.length === 0) {
      filteredData = {
        ...filteredData,
        paginatedStores: paginationArr(currentStores, 20),
      };
      dispatch(setStoresData(filteredData));
    } else {
      // Filter stores based on input value
      const newStores = currentStores.filter((item) => {
        return (
          item.store_name.toLowerCase().includes(value.toLowerCase()) ||
          item.owner_id.store_id.toLowerCase().includes(value.toLowerCase())
        );
      });
      filteredData = {
        ...filteredData,
        allStores: newStores,
        paginatedStores: paginationArr(newStores, 20),
      };
      dispatch(setStoresData(filteredData));
    }
  };

  // reset all stores
  const getAllStores = () => {
    let filteredData = {
      allStores: stores.allStoresImmutable,
      paginatedStores: [],
      currentMarket: "All",
      pageIndex: 0,
    };
    if (nameFilter === "") {
      filteredData = {
        ...filteredData,
        paginatedStores: paginationArr(stores.allStoresImmutable, 20),
      };
      dispatch(setStoresData(filteredData));
    } else {
      let currentStores = stores.allStoresImmutable.filter((item) => {
        return (
          item.store_name.toLowerCase().includes(nameFilter.toLowerCase()) ||
          item.owner_id.store_id
            .toLowerCase()
            .includes(nameFilter.toLowerCase())
        );
      });
      filteredData = {
        ...filteredData,
        allStores: currentStores,
        paginatedStores: paginationArr(currentStores, 20),
      };
      dispatch(setStoresData(filteredData));
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (filterRef.current && !filterRef.current.contains(e.target)) {
        setShow(false);
      }
      return true;
    };

    document.addEventListener("mousedown", handleClickOutside, true);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside, true);
    };
  }, []);

  return (
    <MainCont className="w-full flex flex-row mt-5 flex-wrap">
      {/* Search  */}
      <div className="order-search-cont flex flex-row px-2 rounded-md  lg:mb-0 mb-8">
        <FaSearch className="text-sm mr-2 text-white-text" />
        <input
          type="text"
          className="order-custom-input bg-transparent focus:outline-none outline-none"
          placeholder="Search"
          value={nameFilter}
          onChange={handleFilterNameChange}
        />
      </div>
      {/* FILTER  */}

      <div
        ref={filterRef}
        className="filter-cont flex flex-row md:mx-3 lg:mx-5 rounded-md relative bg-primary-dark cursor-pointer lg:mb-0 mb-8"
        onClick={() => setShow(!show)}
      >
        {stores?.currentMarket !== "" ? (
          <p className="text-white-main mr-2 text-sm">
            {stores?.currentMarket}
          </p>
        ) : (
          <>
            {" "}
            <p className="text-white-main font-Regular text-sm mr-2">
              Filter by
            </p>
          </>
        )}
        <FaAngleDown className="text-sm text-white-main cursor-pointer" />

        {show && (
          <div
            className={`w-full filter-dropdown bg-white-main rounded-md absolute top-12 left-0 right-0 max-h-44 overflow-y-auto ${
              show ? " active p-1" : "pt-7 pb-3 px-5"
            }`}
          >
            <p
              className="filter-text text-xs font-Regular text-white-main text-left p-3 rounded-md hover:bg-primary-main hover:cursor-pointer"
              onClick={getAllStores}
            >
              All
            </p>
            {filterData.map((item, index) => (
              <p
                key={index}
                className="filter-text text-xs font-Regular text-white-main text-left p-3 rounded-md hover:bg-primary-main hover:cursor-pointer"
                onClick={() => filterByMarket(item)}
              >
                {item}
              </p>
            ))}
          </div>
        )}
      </div>

      {/* EXPORT */}
      <CSVLink {...storesReport}>
        <div className="export-cont rounded-md flex flex-row ">
          <HiDownload className="text-primary-main text-lg mr-2" />
          <p className="text-primary-main font-Regular text-sm mr-2">Export</p>
        </div>
      </CSVLink>
    </MainCont>
  );
};

export default StoresFilterTab;

const MainCont = styled.div`
  align-items: center;
  justify-content: flex-end;
  .order-search-cont {
    width: 250px;
    border: 1px solid #464f54;
    align-items: center;
    height: 45px;
  }

  .order-custom-input {
    color: #464f54;
    font-size: 18px;

    &::placeholder {
      font-size: 14px;
    }
  }
  .filter-cont {
    width: 150px;
    border: 1px solid #16588f;
    height: 45px;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease-in-out;
    cursor: pointer !important;
    z-index: 2;
  }
  .filter-dropdown {
    opacity: 0;
    transform: translateY(20%);
    transition: all 0.3s ease-in-out;
    box-shadow: 0px 50px 24px 1px rgba(0, 0, 0, 0.1);
  }
  .active {
    opacity: 1;
    transform: translateY(0%);
  }
  .export-cont {
    width: 150px;
    border: 1px solid #16588f;
    height: 45px;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease-in-out;
  }
  @media (max-width: 1000px) {
    justify-content: space-between;
  }
`;
