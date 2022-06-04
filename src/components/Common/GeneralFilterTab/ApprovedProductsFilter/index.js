import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";

const ApprovedFilter = ({ setProducts }) => {
  const [nameFilter, setNameFilter] = useState("");
  const [, setSearchParams] = useSearchParams();

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      setSearchParams({ page: 1, search: nameFilter });
    } catch (error) {
      if (error.message) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong");
      }
      throw new Error(error);
    }
  };

  return (
    <MainCont className="mt-6 flex" onSubmit={handleSubmit}>
      <div className="order-search-cont flex flex-row px-2 rounded-md  lg:mb-0 mb-8">
        <FaSearch className="text-sm mr-2 text-white-text" />
        <input
          type="text"
          className="order-custom-input bg-transparent focus:outline-none outline-none"
          placeholder="Search"
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
        />
      </div>
    </MainCont>
  );
};

export default ApprovedFilter;

const MainCont = styled.form`
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
