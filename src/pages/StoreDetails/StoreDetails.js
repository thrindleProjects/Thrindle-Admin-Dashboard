import React from "react";
import { HiDownload } from "react-icons/hi";
import MainContainer from "../../components/Common/MainContainer/MainContainer";
import ScreenHeader from "../../components/Common/ScreenTitle/ScreenHeader";
import MerchantDetails from "../../components/MerchantDetails/MerchantDetails";
import MerchantProducts from "../../components/MerchantDetails/MerchantProducts";

function StoreDetails() {
  return (
    <MainContainer>
      <div className="flex items-center justify-between">
        <ScreenHeader title="Stores" value={9} />
        <button className="rounded-md border border-primary-main text-primary-main px-4 py-2">
          {" "}
          <HiDownload className="inline text-primary-main align-middle mr-1" />
          <span className="align-middle">Export</span>
        </button>
      </div>

      <MerchantDetails />
      <MerchantProducts />
    </MainContainer>
  );
}

export default StoreDetails;
