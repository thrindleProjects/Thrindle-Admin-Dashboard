import React, { useState } from "react";
import MainContainer from "../../components/Common/MainContainer/MainContainer";
import styled from "styled-components";
import SingleDashboard from "../../components/Dashboard/SingleDashboard";
import { dashData, dashTableData, orderTableHeader } from "../../data";
import TableFilter from "../../components/Dashboard/TableFilter";
// import TableHeader from "../../components/Dashboard/TableHeader";
// import TableDatas from "../../components/Dashboard/TableDatas";
import SingleDetailCont from "../../components/Dashboard/SingleDetailCont";
import SingleDetailCont2 from "../../components/Dashboard/SingleDetailCont2";
import BarCharts from "../../components/Charts/BarCharts";
// import MainTable from "../../components/Dashboard/MainTable";
import DashboardTable from "../../components/Common/GenralTable/DashboardTable";

const filterData1 = [
  {
    title: "Pending",
    color: "#F69F13",
  },
  {
    title: "Delivered",
    color: "#009E52",
  },
  {
    title: "Cancelled",
    color: "#F5000F",
  },
];

const filterData2 = [
  {
    title: "Daily",
    color: "#16588F",
  },
  {
    title: "Weekly",
    color: "#16588F",
  },
  {
    title: "Monthly",
    color: "#16588F",
  },
];
const Dashboard = () => {
  const [filter, setFilter] = useState("Pending");
  const [filter2, setFilter2] = useState("Daily");
  const [activeColor, setActiveColor] = useState("#F69F13");
  const changeColor = (val) => {
    setFilter(val);
    if (val === "Pending") {
      setActiveColor("#F69F13");
    } else if (val === "Delivered") {
      setActiveColor("#009E52");
    } else if (val === "Cancelled") {
      setActiveColor("#F5000F");
    }
  };
  const changeColor2 = (val) => {
    setFilter2(val);
  };

  return (
    <MainContainer>
      <FirstSection className="w-full md:grid md:grid-cols-3 xl:grid-cols-4 gap-5 mb-10">
        {dashData.map((item, index) => (
          <SingleDashboard {...item} key={index} index={index} />
        ))}
      </FirstSection>
      <SecondSection
        data-aos="fade-up"
        data-aos-duration="2000"
        data-aos-delay="1000"
        className="w-full bg-white-main rounded-md pt-10 pb-10"
      >
        <TableFilter
          data={filterData1}
          value={filter}
          color={activeColor}
          title="Recent Product"
          changeTab={(val) => changeColor(val)}
        />
        <div className="w-full px-3 ">
          {/* <MainTable headerData={dashTableHeader} tableData={dashTableHeader} /> */}
          {/* <TableHeader data={dashTableHeader} />
          <TableDatas
            data={dashTableData}
            length={10}
            data2={dashTableHeader}
            tab={filter}
          /> */}
          <DashboardTable
            tableHeaderData={orderTableHeader}
            tableData={dashTableData}
          />
        </div>
      </SecondSection>
      <ThirdSection
        data-aos="fade-up"
        data-aos-duration="2000"
        data-aos-delay="1000"
        className="w-full lg:grid lg:grid-cols-2 gap-10 pt-10 pb-10 mt-10"
      >
        <SingleDetailCont title="Store Perfomance" />
        <SingleDetailCont2 title="Returned Products" />
      </ThirdSection>
      <FourthSection
        data-aos="fade-up"
        data-aos-duration="2000"
        data-aos-delay="1000"
        className="w-full mt-10 rounded-md bg-white-main pb-10 pt-10"
      >
        <TableFilter
          data={filterData2}
          value={filter2}
          color="#16588F"
          title="Website Visits"
          changeTab={(val) => changeColor2(val)}
          show
        />
        <div className="bar-chart-sec mt-20 md:mt-10 w-full px-3">
          <BarCharts />
        </div>
      </FourthSection>
    </MainContainer>
  );
};

export default Dashboard;

const FirstSection = styled.div``;
const SecondSection = styled.div`
  box-shadow: 0px 30px 40px rgba(0, 0, 0, 0.04);
`;
const ThirdSection = styled.div``;
const FourthSection = styled.div`
  box-shadow: 0px 30px 40px rgba(0, 0, 0, 0.04);
`;
