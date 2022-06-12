import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { FaSearch, FaAngleDown } from "react-icons/fa";
// import { HiDownload } from "react-icons/hi";
import paginationArr from "../../../utils/pagination";
import getMarketName from "../../../utils/getMarketName";

const SellersFilterTab = ({ filterData, customers, setCustomers }) => {
  const filterRef = useRef(null);
  const [show, setShow] = useState(false);
  const [nameFilter, setNameFilter] = useState("");

  const filterByMarket = (market) => {
    let currentCustomers = customers.allCustomersImmutable.filter((item) => {
      if (market === "No Store") {
        return !item.store_id;
      }
      if (market === "Unverified Sellers") return item.status !== "verified";
      return (
        getMarketName(item?.store_id).toLowerCase() === market.toLowerCase()
      );
    });

    if (nameFilter === "") {
      setCustomers((prevState) => {
        return {
          ...prevState,
          allCustomers: currentCustomers,
          paginatedCustomers: paginationArr(currentCustomers, 20),
          currentMarket: market,
          pageIndex: 0,
        };
      });
    } else {
      currentCustomers = currentCustomers.filter((item) => {
        return (
          item.name?.toLowerCase()?.includes(nameFilter.toLowerCase()) ||
          item.store_id?.toLowerCase().includes(nameFilter.toLowerCase()) ||
          item.phone?.includes(nameFilter)
        );
      });
      setCustomers((prevState) => {
        return {
          ...prevState,
          allCustomers: currentCustomers,
          paginatedCustomers: paginationArr(currentCustomers, 20),
          currentMarket: market,
          pageIndex: 0,
        };
      });
    }
    setShow(false);
  };

  const handleFilterNameChange = (e) => {
    // store input value in a variable
    let value = e?.target?.value;

    setNameFilter(value);

    // if input value is less than zero or for some reason is undefined
    // set table data based on the active filter value e.g
    let currentCustomers;
    if (["", "All"].includes(customers.currentMarket)) {
      currentCustomers = customers.allCustomersImmutable;
    } else {
      currentCustomers = customers.allCustomersImmutable.filter((item) => {
        if (customers.currentMarket === "No Store") {
          return !item.store_id;
        }
        if (customers.currentMarket === "Unverified Sellers")
          return item.status !== "verified";
        return (
          getMarketName(item?.store_id).toLowerCase() ===
          customers.currentMarket.toLowerCase()
        );
      });
    }
    if (value.length === 0) {
      return setCustomers((oldCustomers) => {
        return {
          ...oldCustomers,
          allCustomers: currentCustomers,
          paginatedCustomers: paginationArr(currentCustomers, 20),
        };
      });
    } else {
      // Filter customers based on input value
      const newCustomers = currentCustomers?.filter((item) => {
        return (
          item.name?.toLowerCase()?.includes(value.toLowerCase()) ||
          item.store_id?.toLowerCase().includes(value.toLowerCase()) ||
          item.phone?.includes(value)
        );
      });
      // if no items match input value set necessary values to empty state
      if (newCustomers?.length === 0) {
        return setCustomers((oldCustomers) => {
          return {
            ...oldCustomers,
            allCustomers: newCustomers,
            paginatedCustomers: newCustomers,
          };
        });
      }
      return setCustomers((oldCustomers) => {
        return {
          ...oldCustomers,
          allCustomers: newCustomers,
          paginatedCustomers: paginationArr(newCustomers, 20),
        };
      });
    }
  };

  // reset all customers
  const getAllSellers = () => {
    if (nameFilter === "") {
      setCustomers((prevState) => {
        return {
          ...prevState,
          allCustomers: prevState.allCustomersImmutable,
          paginatedCustomers: paginationArr(
            prevState.allCustomersImmutable,
            20
          ),
          currentMarket: "All",
          pageIndex: 0,
        };
      });
    } else {
      setCustomers((prevState) => {
        let currentCustomers = prevState.allCustomersImmutable.filter(
          (item) => {
            return (
              item.name?.toLowerCase()?.includes(nameFilter.toLowerCase()) ||
              item.store_id?.toLowerCase().includes(nameFilter.toLowerCase()) ||
              item.phone?.includes(nameFilter)
            );
          }
        );
        return {
          ...prevState,
          allCustomers: currentCustomers,
          paginatedCustomers: paginationArr(currentCustomers, 20),
          currentMarket: "All",
          pageIndex: 0,
        };
      });
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
    <MainCont className="w-full flex flex-row mt-5 flex-nowrap gap-2">
      {/* Search  */}
      <div className="order-search-cont flex flex-row px-2 rounded-md  lg:mb-0">
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
        className="filter-cont flex flex-row md:mx-3 lg:mx-5 rounded-md relative bg-primary-dark cursor-pointer lg:mb-0"
        onClick={() => setShow(!show)}
      >
        {customers?.currentMarket !== "" ? (
          <p className="text-white-main mr-2 text-sm">
            {customers?.currentMarket}
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
              onClick={getAllSellers}
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
      {/* <div className="export-cont rounded-md flex flex-row ">
        <HiDownload className="text-primary-main text-lg mr-2" />
        <p className="text-primary-main font-Regular text-sm mr-2">Export</p>
      </div> */}
    </MainCont>
  );
};

export default SellersFilterTab;

const MainCont = styled.div`
  align-items: center;
  justify-content: flex-end;
  .order-search-cont {
    width: 60%;
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
    width: 40%;
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

  @media (min-width: 768px) {
    .order-search-cont {
    }
  }
  @media (min-width: 1024px) {
    .order-search-cont {
      width: 250px;
      height: 45px;
    }
    .filter-cont {
      width: 150px;
      height: 45px;
    }
  }

  @media (max-width: 1000px) {
    justify-content: space-between;
  }
`;
