import React from "react";
import styled from "styled-components";

const GeneralHeaderTab = (props) => {
  return (
    <MainTab className=" flex flex-row flex-wrap">
      {props.data?.map((item, index) => (
        <SingleTab
          tab={props.activeTab}
          key={index}
          title={item.title}
          color={item.color}
          onClick={() => props.changeTab(item.title)}
          className="single-tab flex flex-row h-full pb-5 mr-10 cursor-pointer lg:mb-0 mb-5"
        >
          <img
            src={item.title === props.activeTab ? item.activeIcon : item.icon}
            alt="icons"
            className="block"
          />
          <TabTitle
            tab={props.activeTab}
            title={item.title}
            color={item.color}
            className="text-base tab-title text-white-text mx-5"
          >
            {item.title}
          </TabTitle>
          <div className="box flex flex-row ">
            <p className="text-white-main text-sm font-Bold">{item.value}</p>
          </div>
        </SingleTab>
      ))}
    </MainTab>
  );
};

export default GeneralHeaderTab;

const MainTab = styled.div`
  border-bottom: 2px solid #f4f4f4;
  width: 100%;
  align-items: center;
  @media (max-width: 1100px) {
    justify-content: space-between;
  }
`;

const SingleTab = styled.div`
  border-bottom: ${({ tab, title, color }) =>
    tab === title ? `5px solid ${color}` : ""};
  width: ${({ dataLength }) => `${100 / dataLength}%`};
  //   border-radius: 5px;
  align-items: center;
  transition: all 0.3s ease-in-out;

  .box {
    width: 40px;
    height: 40px;
    border-radius: 40px;
    align-items: center;
    justify-content: center;
    background: ${({ tab, title, color }) =>
      tab === title ? `${color}` : "#c4c4c4"};
  }
`;

const TabTitle = styled.p`
  font-family: ${({ tab, title }) =>
    tab === title ? "Avenir-Heavy" : "Avenir-Regular"};
  color: ${({ tab, title, color }) => (tab === title ? `${color}` : "#464F54")};
`;
