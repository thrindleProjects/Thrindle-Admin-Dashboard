import React, { useState } from "react";
import styled from "styled-components";
import InputWithLabel from "../../components/Common/Input/InputWithLabel";
import MainContainer from "../../components/Common/MainContainer/MainContainer";
import ScreenHeader from "../../components/Common/ScreenTitle/ScreenHeader";

const SettingsHeader = styled.div`
  .activeTab {
    background: white;
    color: #20639b;
  }
`;

const Settings = () => {
  const [activeTab, setActiveTab] = useState(0);

  const data = ["General Info", "Security"];
  return (
    <MainContainer>
      <ScreenHeader title="Settings" noVal={true} />

      <SettingsHeader className="flex gap-2 bg-white-lightGrey4 w-max rounded-lg p-1 font-normal cursor-pointer">
        {data.map((item, index) => (
          <div
            className={
              activeTab === index
                ? "text-primary-main bg-white-main p-2 rounded-md"
                : "p-2 rounded-md"
            }
            onClick={() => setActiveTab(index)}
            key={index}
          >
            {item}
          </div>
        ))}
      </SettingsHeader>

      {activeTab === 0 && (
        <>
          <div className="flex justify-between mt-14 gap-8">
            <div className="w-48">
              <InputWithLabel type="text" text="Name" />
            </div>

            <div className="w-48">
              <InputWithLabel type="text" text="Email Address" />
            </div>
          </div>
          <div className="w-48 mt-8">
            <InputWithLabel type="text" text="Phone Number" />
          </div>
        </>
      )}

      {activeTab === 1 && (
        <>
          <div className="flex justify-between mt-14 gap-8">
            <div className="w-48">
              <InputWithLabel type="password" text="Current Password" />
            </div>

            <div className="w-48">
              <InputWithLabel type="password" text="New Password" />
            </div>
          </div>
          <div className="w-48 mt-8">
            <InputWithLabel type="password" text="Confirm Password" />
          </div>
        </>
      )}

      <div className="flex justify-end mt-20">
        <div>
          <button className="text-white-lightGrey3 border-white-lightGrey3 border py-2 px-6 rounded-md cursor-pointer">
            Cancel
          </button>
          <button className="ml-4 bg-primary-main text-white-main outline-none border-0 py-2 px-4 rounded-md cursor-pointer">
            Save Changes
          </button>
        </div>
      </div>
    </MainContainer>
  );
};

export default Settings;

// <div
// className={`rounded-lg p-2 ${
//   activeTab === "General Info" && `activeTab`
// }`}
// onClick={(e) => setActiveTab(e.target.textContent)}
// >
// General Info
// </div>
// <div
// className={`pl-3 py-2 pr-2 rounded-lg ${
//   activeTab === "Security" && `activeTab`
// }`}
// onClick={(e) => setActiveTab(e.target.textContent)}
// >
// Security
// </div>
