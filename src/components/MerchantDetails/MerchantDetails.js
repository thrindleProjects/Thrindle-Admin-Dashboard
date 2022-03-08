import React from "react";
import MerchantHeader from "./MerchantHeader";
import avi from "../../assets/images/avi.png";
import { BiMessageDetail } from "react-icons/bi";
import { BsTelephoneFill } from "react-icons/bs";
import { GoLocation } from "react-icons/go";
import { FaAddressCard } from "react-icons/fa";

function MerchantDetails() {
  const profileData = [
    {
      phone: "08011223344",
      email: "johndoe@gmail.com",
      location: "Lagos, Nigeria",
      market: "Balogun Market",
    },
  ];
  return (
    <div className="mb-12">
      <div className="rounded-md shadow-md">
        <MerchantHeader text="Merchant's Details" backBtn={true} />
        <div className="bg-white-main flex justify-between items-center w-85 mx-auto py-8 ">
          <div>
            <img src={avi} alt="merchant-avatar" className="w-36 h-36" />
            <p className="w-max my-2 mx-auto ">Yinka's Store</p>
            <p className="w-max my-1 mx-auto text-sm text-white-lightGrey">
              Yinka Olalere
            </p>
            <p className="w-max my-2">Joined: Oct 7, 2021</p>
          </div>

          <div className="w-65">
            <div className="bg-white-lightGrey2 p-4 font-Bold">
              Yinka's Store
            </div>
            <div className="bg-white-light">
              {profileData.map((data, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center p-4">
                    <div>
                      {" "}
                      <BiMessageDetail className="inline mr-1 text-primary-dark2" />
                      <span className="text-white-lightGrey3 font-Bold ml-1">
                        Email
                      </span>
                    </div>
                    <p>{data.email}</p>
                  </div>

                  <div className="flex justify-between items-center p-4">
                    <div>
                      {" "}
                      <BsTelephoneFill className="inline mr-1 text-primary-dark2" />
                      <span className="text-white-lightGrey3 font-Bold  ml-1">
                        Phone
                      </span>
                    </div>
                    <p>{data.phone}</p>
                  </div>

                  <div className="flex justify-between items-center p-4">
                    <div>
                      {" "}
                      <GoLocation className="inline mr-1 text-primary-dark2" />
                      <span className="text-white-lightGrey3 font-Bold  ml-1">
                        Store Location
                      </span>
                    </div>
                    <p>{data.location}</p>
                  </div>

                  <div className="flex justify-between items-center p-4">
                    <div>
                      {" "}
                      <FaAddressCard className="inline mr-1 text-primary-dark2" />
                      <span className="text-white-lightGrey3 font-Bold ml-1">
                        Market
                      </span>
                    </div>
                    <p>{data.market}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* <MerchantHeader text="Vendor's Products" /> */}
    </div>
  );
}

export default MerchantDetails;
