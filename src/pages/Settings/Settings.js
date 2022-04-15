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

      <div>
        <button>Cancel</button>
        <button className="bg-primary-main text-white-main outline-none border-0 px-2 py-1">
          Save Changes
        </button>
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
