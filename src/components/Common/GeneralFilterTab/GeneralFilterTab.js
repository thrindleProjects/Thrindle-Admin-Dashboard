import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { FaSearch, FaAngleDown } from "react-icons/fa";
// import { HiDownload } from "react-icons/hi";
import paginationArr from "../../../utils/pagination";

const GeneralFilterTab = ({ filterData, products, setProducts }) => {
  const filterRef = useRef(null);
  const [show, setShow] = useState(false);
  const [nameFilter, setNameFilter] = useState("");

  // Checks if the input value matches the item name using regex
  // const checkName = (name, str) => {
  //   let pattern = str
  //     .split("")
  //     .map((x) => {
  //       return `(?=.*${x})`;
  //     })
  //     .join("");
  //   let regex = new RegExp(`${pattern}`, "g");
  //   return name.match(regex);
  // };

  const filterByCategory = (category) => {
    let currentProducts = products.allProductsImmutable.filter((item) => {
      if (category === "No Weight") {
        return !item.weight;
      }
      return item?.category?.name === category;
    });

    if (nameFilter === "") {
      setProducts((prevState) => {
        return {
          ...prevState,
          allProducts: currentProducts,
          paginatedProducts: paginationArr(currentProducts, 20),
          currentCategory: category,
          pageIndex: 0,
        };
      });
    } else {
      currentProducts = currentProducts.filter((item) => {
        return item.name.toLowerCase().includes(nameFilter.toLowerCase());
      });
      setProducts((prevState) => {
        return {
          ...prevState,
          allProducts: currentProducts,
          paginatedProducts: paginationArr(currentProducts, 20),
          currentCategory: category,
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
    let currentProducts;
    if (["", "All"].includes(products.currentCategory)) {
      currentProducts = products.allProductsImmutable;
    } else {
      currentProducts = products.allProductsImmutable.filter((item) => {
        if (products.currentCategory === "No Weight") {
          return !item.weight;
        }
        return item?.category?.name === products.currentCategory;
      });
    }

    if (value.length === 0) {
      setProducts((oldProducts) => {
        return {
          ...oldProducts,
          allProducts: currentProducts,
          paginatedProducts: paginationArr(currentProducts, 20),
        };
      });
    } else {
      // Filter products based on input value
      const newProducts = currentProducts.filter((item) => {
        return item.name.toLowerCase().includes(value.toLowerCase());
      });
      // if no items match input value set necessary values to empty state
      if (newProducts.length === 0) {
        return setProducts((oldProducts) => {
          return {
            ...oldProducts,
            allProducts: newProducts,
            paginatedProducts: newProducts,
          };
        });
      }
      return setProducts((oldProducts) => {
        return {
          ...oldProducts,
          allProducts: newProducts,
          paginatedProducts: paginationArr(newProducts, 20),
        };
      });
    }
  };

  // reset all products
  const getAllCategories = () => {
    setProducts((prevState) => {
      return {
        ...prevState,
        allProducts: products.allProductsImmutable,
        paginatedProducts: paginationArr(products.allProductsImmutable, 20),
        currentCategory: "All",
        pageIndex: 0,
      };
    });
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
        {products?.currentCategory !== "" ? (
          <p className="text-white-main mr-2 text-sm">
            {products?.currentCategory}
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
              onClick={getAllCategories}
            >
              All
            </p>
            {filterData.map((item, index) => (
              <p
                key={index}
                className="filter-text text-xs font-Regular text-white-main text-left p-3 rounded-md hover:bg-primary-main hover:cursor-pointer"
                onClick={() => filterByCategory(item)}
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

export default GeneralFilterTab;

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
