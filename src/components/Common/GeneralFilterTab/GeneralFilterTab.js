import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { FaSearch, FaAngleDown } from "react-icons/fa";
import { HiDownload } from "react-icons/hi";

const GeneralFilterTab = (props) => {
  const filterRef = useRef(null);
  const [show, setShow] = useState(false);

  const chooseFilter = (val) => {
    props.changeFilter(val);
    setShow(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (filterRef.current && !filterRef.current.contains(e.target)) {
        setShow(false);
      }
      return true;
    };

    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  return (
    <MainCont className="w-full flex flex-row mt-5 flex-wrap">
      {/* Search  */}
      <div className="order-search-cont flex flex-row px-2 rounded-md  lg:mb-0 mb-8">
        <FaSearch className="text-base mr-2 text-white-text" />
        <input
          type="text"
          value={props.value}
          className="order-custom-input bg-transparent focus:outline-none outline-none"
          onChange={props.onChange}
          placeholder="Search"
        />
      </div>
      {/* FILTER  */}

      <div
        ref={filterRef}
        className="filter-cont flex flex-row md:mx-3 lg:mx-5 rounded-md relative bg-primary-dark cursor-pointer lg:mb-0 mb-8"
        onClick={() => setShow(!show)}
      >
        <p className="text-white-main font-Regular text-base mr-2">Filter by</p>
        <FaAngleDown className="text-base text-white-main cursor-pointer" />
        {show && (
          <div
            className={
              show
                ? "w-full filter-dropdown active bg-white-main p-1 rounded-md absolute top-12 left-0 right-0 "
                : "w-full filter-dropdown bg-white-main pt-7 pb-3 px-5 rounded-md absolute top-12 left-0 right-0 "
            }
          >
            {props.filterData.map((item, index) => (
              <p
                key={index}
                className="text-sm filter-text font-Regular text-white-main text-left p-3 rounded-md hover:bg-primary-main hover:cursor-pointer"
                onClick={() => chooseFilter(item.title)}
              >
                {item.title}
              </p>
            ))}
          </div>
        )}
      </div>

      {/* EXPORT */}
      <div className="export-cont rounded-md flex flex-row ">
        <HiDownload className="text-primary-main text-lg mr-2" />
        <p className="text-primary-main font-Regular text-base mr-2">Export</p>
      </div>
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
