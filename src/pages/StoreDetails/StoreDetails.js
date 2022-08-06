// , { useCallback, useEffect, useState }
import React from "react";
// import { HiDownload } from "react-icons/hi";
// import { useParams } from "react-router-dom";
// import { toast } from "react-toastify";
import MainContainer from "../../components/Common/MainContainer/MainContainer";
import MerchantData from "../../components/MerchantDetails/MerchantData";
// import ScreenHeader from "../../components/Common/ScreenTitle/ScreenHeader";
import MerchantDetails from "../../components/MerchantDetails/MerchantDetails";
import MerchantProducts from "../../components/MerchantDetails/MerchantProducts";
// import axiosInstance from "../../utils/axiosInstance";

function StoreDetails() {
  // const [storeProducts, setStoreProducts] = useState(0);
  // let { store_id } = useParams();

  // const fetchProducts = useCallback(async () => {
  //   try {
  //     let {
  //       data: { data },
  //     } = await axiosInstance.get(`/products/store/${store_id}`);
  //     setStoreProducts(data.length);
  //   } catch (error) {
  //     if (error.response) {
  //       toast.warning(`${error.response.data.message}`);
  //       throw new Error(error.response);
  //     } else {
  //       toast.error(`${error}`);
  //       throw new Error(error);
  //     }
  //   }
  // }, [store_id]);

  // useEffect(() => {
  //   let mounted = true;

  //   if (mounted) {
  //     fetchProducts();
  //   }

  //   return () => {
  //     mounted = false;
  //   };
  // }, [store_id, fetchProducts]);

  return (
    <MainContainer>
      <div className="flex items-center justify-between">
        {/* <ScreenHeader title="Stores" value={storeProducts} /> */}
        {/* <button className="rounded-md border border-primary-main text-primary-main px-4 py-2">
          {" "}
          <HiDownload className="inline text-primary-main align-middle mr-1" />
          <span className="align-middle">Export</span>
        </button> */}
      </div>

      <MerchantDetails />
      <MerchantData />

      <MerchantProducts />
    </MainContainer>
  );
}

export default StoreDetails;
