import { useState } from "react";
import MainContainer from "../../components/Common/MainContainer/MainContainer";
import UnPScreenHeader from "../../UnP/UnPScreenHeader";
import GeneralFilterTab from "../../components/Common/GeneralFilterTab/GeneralFilterTab";
import GeneralPagination from "../../components/Common/GeneralPagination/GeneralPagination";
import UnPTable from "../../components/Common/GenralTable/UnPTable";
import { unpTableHeader, unpTableData } from "../../data/data";
import styled from "styled-components";

const UnP = () => {
  const [modals, setModals] = useState({
    createUser: false,
    deleteUser: false,
    editUser: false,
  });
  return (
    <MainContainer>
      <div>
        <UnPScreenHeader />
        <GeneralFilterTab />
        <GeneralPagination showButtons={false} pag />
        <UnPTable tableHeaderData={unpTableHeader} tableData={unpTableData} />
        {modals.createUser && <ModalWrapper>Create User</ModalWrapper>}
        {modals.deleteUser && <ModalWrapper>Delete User</ModalWrapper>}
        {modals.editUser && <ModalWrapper>editUser</ModalWrapper>}
      </div>
    </MainContainer>
  );
};

const ModalWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  inset: 0;
  z-index: 150;
  background: #16588f;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default UnP;
