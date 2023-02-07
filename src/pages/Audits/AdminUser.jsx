import React, { useState, useEffect, useCallback } from "react";
import MainContainer from "../../components/Common/MainContainer/MainContainer";
import axiosInstance from "../../utils/axiosInstance";
import { useLocation, useSearchParams } from "react-router-dom";
import Pagination from "../../components/Common/GeneralPagination/ApprovedProductPagination";
import NewLoader from "../../components/newLoader/newLoader";
// import AdminUserTable from "../../components/AdminUser/AdminUserTable";

const AdminUser = () => {
  const [user, setUser] = useState([]);
  const [pageInfo, setPageInfo] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  const state = location.state;
  const id = location.state?.id;

  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page");
  const search = searchParams.get("search");

  const getUserDetails = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(
        `/audits/${id}?service_updated=product&sort=-createdAt&page=${
          Number(page) || 1
        }`
      );
      const pageData = response.data.pageInfo;
      const numberOfPagesToBeDisplayed = 5;
      const pageNumber = Number(page) | 1;
      let rightHandSide = Array.from(
        { length: pageData.totalPages },
        (_, index) => index + 1
      );
      let leftHandSide = rightHandSide.splice(0, pageNumber);
      const maxLeft =
        rightHandSide.length < 3
          ? numberOfPagesToBeDisplayed - rightHandSide.length
          : 3;
      const maxRight =
        leftHandSide.length < 3
          ? numberOfPagesToBeDisplayed - leftHandSide.length
          : 2;
      leftHandSide = leftHandSide.reverse().slice(0, maxLeft).reverse();
      rightHandSide = rightHandSide.slice(0, maxRight);
      const newPages = leftHandSide
        .concat(rightHandSide)
        .map((item) => ({ page: item, limit: 20 }));
      pageData.displayPages = newPages;
      setUser((old) => response.data.data);
      setPageInfo(pageData);
    } catch (error) {
      console.log(error);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [id, page]);

  useEffect(() => {
    const controller = new AbortController();
    getUserDetails();
    return () => {
      controller.abort();
    };
  }, [getUserDetails]);

  const handlePagination = (type, payload = pageInfo?.currentPage) => {
    let changeParams = {};
    if (!!search) changeParams.search = search;
    switch (type) {
      case "NEXT_PAGE":
        changeParams.page = pageInfo?.next?.page;
        setSearchParams(changeParams, {
          state,
        });
        break;
      case "PREVIOUS_PAGE":
        changeParams.page = pageInfo?.previous?.page;
        setSearchParams(changeParams, {
          state,
        });
        break;
      case "FIRST_PAGE":
        if (payload === 1) return;
        changeParams.page = 1;
        setSearchParams(changeParams, {
          state,
        });
        break;
      case "LAST_PAGE":
        if (payload === pageInfo?.totalPages) return;
        changeParams.page = pageInfo?.totalPages;
        setSearchParams(changeParams, {
          state,
        });
        break;
      case "GO_TO_PAGE":
        changeParams.page = payload;
        setSearchParams(changeParams, {
          state,
        });
        break;
      default:
        console.log("Argumenet NOT handled");
        break;
    }
  };

  if (loading) {
    return (
      <MainContainer>
        <div className="w-full h-96">
          <NewLoader />
        </div>
      </MainContainer>
    );
  }

  if (error && !loading) {
    return (
      <MainContainer>An ERROR OCCURRED, PLEASE RELOAD THIS PAGE</MainContainer>
    );
  }

  return (
    <MainContainer>
      <div className=" flex mb-10 justify-between text-lg font-bold">
        <p>{location?.state?.name}</p>
        <Pagination
          pageIndex={pageInfo.page}
          pageInfo={pageInfo}
          pageLength={user.length}
          handlePagination={handlePagination}
        />
      </div>

      <div>
        {user.map((user, index) => (
          <div key={user._id}>
            <div className="test text-gray-600 gap-6 text-xs text-left cursor-pointer hover:bg-gray-100 hover:shadow-lg p-4 rounded-lg   px-4 ">
              <p>{((page || 1) - 1) * 20 + (index + 1)}</p>
              <img
                alt=""
                className="w-20 h-10 "
                src={`https://store-staging-api.thrindle.com/api/thrindle/images/${user?.product?.images[0]}`}
              />
              <p className="w-36">{user?.product?.name}</p>
              <p>
                N {user?.product?.original_price.toLocaleString()}
                .00
              </p>
              <p> {user?.product?.market.name}</p>
              <p> {user?.product?.category.name}</p>
              <p> {user?.action}</p>
              <p>{new Date(user?.product?.createdAt).toLocaleDateString()}</p>
              <p>{new Date(user?.product?.updatedAt).toLocaleDateString()}</p>
            </div>
            <hr />
          </div>
        ))}
      </div>
    </MainContainer>
  );
};

export default AdminUser;
