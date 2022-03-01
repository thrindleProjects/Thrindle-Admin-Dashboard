import React, { useState } from "react";
import GeneralFilterTab from "../../components/Common/GeneralFilterTab/GeneralFilterTab";
import GeneralPagination from "../../components/Common/GeneralPagination/GeneralPagination";
import ShipmentTable from "../../components/Common/GenralTable/ShipmentTable";
import MainContainer from "../../components/Common/MainContainer/MainContainer";
import ScreenHeader from "../../components/Common/ScreenTitle/ScreenHeader";
import { shipmentData, shipmentFilter, shipmentTableHeader } from "../../data/data";

function Shipment() {
  const [filterValue, setFilterValue] = useState("");
  return (
    <MainContainer>
      <ScreenHeader title="Shipment" value={300} />
      <GeneralFilterTab
        filter={filterValue}
        filterData={shipmentFilter}
        changeFilter={(val) => setFilterValue(val)}
      />
      <GeneralPagination
        deleteText="delete Order"
        onlyDelete={true}
        pag={true}
      />
      <ShipmentTable
        tableHeaderData={shipmentTableHeader}
        tableData={shipmentData}
        showCheck
      />
    </MainContainer>
  );
}

export default Shipment;
