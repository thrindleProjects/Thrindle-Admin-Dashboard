import React, { useEffect, useState } from "react";
import MerchantHeader from "./MerchantHeader";
import { BiMessageDetail } from "react-icons/bi";
import { BsTelephoneFill } from "react-icons/bs";
import { GoLocation } from "react-icons/go";
import { FaAddressCard } from "react-icons/fa";
import { useParams } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { toast } from "react-toastify";
import NewLoader from "../newLoader/newLoader";
import formatDate from "../../utils/formatDate";
import NoImage from "../NoImage/NoImage";

function MerchantDetails() {
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [profileData, setProfileData] = useState(null);

  let { store_id } = useParams();

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      const fetchProducts = async () => {
        try {
          let res = await axiosInstance.get(
            `/sellers/stores/admin/getStoreDetails/${store_id}`
          );

          setProfileData(res.data.data);

          setLoadingProfile(false);
        } catch (error) {
          if (error.response) {
            console.log(error.response);
            toast.warning(`${error.response.data.message}`);
          } else {
            toast.error(`${error}`);
          }
        } finally {
          setLoadingProfile(false);
        }
      };

      fetchProducts();
    }

    return () => {
      mounted = false;
    };
  }, [store_id]);

  return (
    <div className="mb-12 text-xs md:text-sm">
      <div className="rounded-md shadow-md">
        <MerchantHeader text="Merchant's Details" backBtn={true} />
        {loadingProfile ? (
          <div className="h-vh40">
            <NewLoader />
          </div>
        ) : (
          <div className="bg-white-main flex flex-wrap  justify-center md:justify-between items-center w-85 mx-auto py-8 ">
            <div className="flex flex-col justify-center">
              {profileData?.owner_id?.photo === null ? (
                <NoImage store_name={profileData?.store_name} />
              ) : (
                <img
                  src={
                    "https://store-staging-api.thrindle.com/api/thrindle/images/" +
                    profileData?.owner_id?.photo
                  }
                  alt="merchant-avatar"
                  className="w-36 h-36"
                />
              )}

              <p className="w-max my-2 mx-auto capitalize">
                {" "}
                {profileData?.store_name}
              </p>
              <p className="w-max my-1 mx-auto text-white-lightGrey">
                {profileData?.owner_id?.name}
              </p>
              <p className="w-max my-2 mx-auto">
                {formatDate(profileData?.createdAt)}
              </p>
            </div>

            <div className="w-full md:w-65">
              <div className="bg-white-lightGrey2 p-4 font-Bold capitalize">
                {profileData?.owner_id?.name}
              </div>
              <div className="bg-white-light">
                <div>
                  <div className="flex gap-2 items-start p-4">
                    <div>
                      {" "}
                      <BiMessageDetail className="inline mr-1 text-primary-dark2" />
                      <span className="text-white-lightGrey3 font-Bold ml-1">
                        Email
                      </span>
                    </div>
                    <p>{profileData?.owner_id?.email || "N/A"}</p>
                  </div>

                  <div className="flex gap-2 items-start p-4">
                    <div>
                      {" "}
                      <BsTelephoneFill className="inline mr-1 text-primary-dark2" />
                      <span className="text-white-lightGrey3 font-Bold  ml-1">
                        Phone
                      </span>
                    </div>
                    <p>{profileData?.owner_id?.phone}</p>
                  </div>

                  <div className="flex gap-2 items-start p-4">
                    <div>
                      {" "}
                      <GoLocation className="inline mr-1 text-primary-dark2" />
                      <span className="text-white-lightGrey3 font-Bold  ml-1">
                        Store Location
                      </span>
                    </div>
                    <p>
                      {profileData?.store_address === "undefined"
                        ? "N/A"
                        : profileData.store_address}
                    </p>
                  </div>

                  <div className="flex gap-2 items-start p-4">
                    <div>
                      {" "}
                      <FaAddressCard className="inline mr-1 text-primary-dark2" />
                      <span className="text-white-lightGrey3 font-Bold ml-1">
                        Market
                      </span>
                    </div>
                    <p>
                      {profileData?.owner_id?.store_id.startsWith("EM") && (
                        <span>EM</span>
                      )}
                      {profileData?.owner_id?.store_id.startsWith("BM") && (
                        <span>EM</span>
                      )}
                      {profileData?.owner_id?.store_id.startsWith("CV") && (
                        <span>CV</span>
                      )}
                    </p>
                  </div>
                  <div className="flex gap-2 items-start p-4">
                    <div>
                      {" "}
                      <GoLocation className="inline mr-1 text-primary-dark2" />
                      <span className="text-white-lightGrey3 font-Bold  ml-1">
                        Description
                      </span>
                    </div>
                    <p className="w-1/2">
                      {profileData?.description === "undefined"
                        ? "N/A"
                        : profileData.description}
                    </p>
                  </div>

                  <div className="flex gap-2 items-start p-4">
                    <div>
                      {" "}
                      <GoLocation className="inline mr-1 text-primary-dark2" />
                      <span className="text-white-lightGrey3 font-Bold  ml-1">
                        Store Link
                      </span>
                    </div>
                    {store_id.startsWith("TM") && (
                      <p className="w-1/2">
                        {profileData?.description === "undefined" ? (
                          "N/A"
                        ) : (
                          <a
                            href={`https://${profileData.store_link}.thrindle.shop`}
                          >{`https://${profileData.store_link}.thrindle.shop`}</a>
                        )}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MerchantDetails;
