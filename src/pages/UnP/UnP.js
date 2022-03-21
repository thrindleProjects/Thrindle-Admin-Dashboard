import { useState } from "react";
import MainContainer from "../../components/Common/MainContainer/MainContainer";
import UnPScreenHeader from "../../components/UnP/UnPScreenHeader";
import GeneralFilterTab from "../../components/Common/GeneralFilterTab/GeneralFilterTab";
import GeneralPagination from "../../components/Common/GeneralPagination/GeneralPagination";
import UnPTable from "../../components/Common/GenralTable/UnPTable";
import { unpTableHeader, unpTableData } from "../../data/data";
import UnPModals from "../../components/UnP/UnPModals";

const UnP = () => {
  const [modals, setModals] = useState({
    createUser: false,
    deleteUser: false,
    editUser: false,
  });

  const handleSetModal = (action) => {
    switch (action) {
      case `SHOW_CREATE_USER`:
        document.documentElement.style.overflow = "hidden";
        return setModals({
          ...modals,
          deleteUser: false,
          editUser: false,
          createUser: true,
        });
      case `SHOW_DELETE_USER`:
        document.documentElement.style.overflow = "hidden";

        return setModals({
          ...modals,
          createUser: false,
          editUser: false,
          deleteUser: true,
        });
      case `SHOW_EDIT_USER`:
        document.documentElement.style.overflow = "hidden";

        return setModals({
          ...modals,
          createUser: false,
          deleteUser: false,
          editUser: true,
        });
      case `CLOSE_ALL_MODALS`:
        document.documentElement.style.overflow = "revert";
        return setModals({
          ...modals,
          createUser: false,
          deleteUser: false,
          editUser: false,
        });
      default:
        throw new Error("ARGUMENT NOT HANDLED");
    }
  };

  return (
    <MainContainer>
      <div>
        <UnPScreenHeader handleSetModal={handleSetModal} />
        <GeneralFilterTab />
        <GeneralPagination showButtons={false} pag />
        <UnPTable
          tableHeaderData={unpTableHeader}
          tableData={unpTableData}
          handleSetModal={handleSetModal}
        />
        {(modals.createUser || modals.editUser || modals.deleteUser) && (
          <UnPModals modals={modals} handleSetModal={handleSetModal} />
        )}
      </div>
    </MainContainer>
  );
};
export default UnP;
