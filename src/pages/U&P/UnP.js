import MainContainer from "../../components/Common/MainContainer/MainContainer";
import styled from "styled-components";
import UnPHeader from "../../components/UsersAndPermissions/UnPHeader";

const UnP = () => {
  return (
    <MainContainer>
      <FirstSection>
        <UnPHeader title={"Users & Permissions"} />
      </FirstSection>
    </MainContainer>
  );
};

export default UnP;

const FirstSection = styled.div``;
