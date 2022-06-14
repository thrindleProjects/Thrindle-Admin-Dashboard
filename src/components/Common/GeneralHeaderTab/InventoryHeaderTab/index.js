import { Link } from "react-router-dom";
import styled from "styled-components";

const InventoryHeader = ({ data, activeTab }) => {
  return (
    <MainTab className={`grid grid-cols-${data?.length} gap-2`}>
      {data.map((item, index) => (
        <Link to={item.to} key={index}>
          <SingleTab
            className="single-tab flex flex-row h-full pb-2 md:pb-5 lg:mr-10 cursor-pointer lg:mb-0"
            tab={activeTab}
            key={index}
            title={item.to}
            color={item.color}
          >
            <img
              src={item.to === activeTab ? item.activeIcon : item.icon}
              alt="icons"
              className="block w-4 h-4"
            />
            <TabTitle
              tab={activeTab}
              title={item.title}
              color={item.color}
              className="text-center text-xs md:text-sm lg:text-base tab-title text-white-text lg:mx-5"
            >
              {item.title}
            </TabTitle>
            <div className="box flex flex-row ">
              <p className="text-white-main text-xs lg:text-sm font-Bold">
                {item.value}
              </p>
            </div>
          </SingleTab>
        </Link>
      ))}
    </MainTab>
  );
};

export default InventoryHeader;

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
    tab === title ? `2px solid ${color}` : ""};
  width: ${({ dataLength }) => `${100 / dataLength}%`};
  //   border-radius: 5px;
  align-items: center;
  transition: all 0.3s ease-in-out;

  .box {
    width: 30px;
    aspect-ratio: 1;
    border-radius: 40px;
    align-items: center;
    justify-content: center;
    background: ${({ tab, title, color }) =>
      tab === title ? `${color}` : "#c4c4c4"};
  }
  @media (min-width: 768px) {
    justify-content: center;
    gap: 0.5rem;
    border-bottom: ${({ tab, title, color }) =>
      tab === title ? `5px solid ${color}` : ""};
    .box {
      width: 30px;
      aspect-ratio: 1;
    }
  }
  @media (min-width: 1024px) {
    justify-content: flex-start;
    gap: 0px;
    .box {
      width: 40px;
      aspect-ratio: 1;
    }
  }
`;

const TabTitle = styled.p`
  font-family: ${({ tab, title }) =>
    tab === title ? "Avenir-Heavy" : "Avenir-Regular"};
  color: ${({ tab, title, color }) => (tab === title ? `${color}` : "#464F54")};
`;
