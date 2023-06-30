import React from "react";
import { FaSistrix, FaGlobe } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import styled from "styled-components";
import SignUp from "./SignUp";
import SignIn from "./SignIn";

const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;

  height: 75px;
  padding: 1rem;
  background-color: white;
  font-weight: bold;
  display: flex;
  align-items: center;

  box-shadow: 1px 1px 5px gray;
`;
const LogoInput = styled.div`
  display: flex;
  flex-direction: row;
`;

const Logo = styled.h1`
  font-size: 50px;
  color: #5e5ee8;
  margin-left: 20px;
  margin-right: 20px;
  cursor: pointer;
`;

const Form = styled.form`
  display: flex;
  margin-top: 11%;

  border: none;
  border-radius: 20px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  padding: 5px;
  height: 2%;
`;

const Input = styled.input`
  border: none;
  border-radius: 20px;
  height: 30px;
  padding-left: 10px;
`;

const BtnContainer = styled.div`
  margin-left: 50%;
  display: flex;

  @media screen and (max-width: 1500px) {
    flex-direction: row;
    align-items: flex-start;
    margin-left: 30%;
    margin-right: auto;
    margin-top: 10px;
  }
`;
const TopButton = styled.button`
  font-size: 20px;
  width: 120px;
  border: none;
  background-color: transparent;
  cursor: pointer;
  &:hover {
    transform: scale(1.2);
  }

  @media screen and (max-width: 1500px) {
    margin-top: 5px;
    width: 100%;
    max-width: 200px;
  }

  height: 30px;
`;

function TopBar() {
  const navigate = useNavigate();

  return (
    <>
      <Header>
        <LogoInput>
          <Logo
            onClick={() => {
              navigate(`/`);
            }}
          >
            Hobbyist
          </Logo>
          <Form>
            <FaSistrix size="20" color="gray"></FaSistrix>
            <Input type="text" placeholder="검색 가능합니다."></Input>
          </Form>
        </LogoInput>
        <BtnContainer>
          <TopButton>
            <FaGlobe style={{ marginRight: "5px" }} /> KR
          </TopButton>
          <SignIn />
          <SignUp />
        </BtnContainer>
      </Header>
    </>
  );
}

export default TopBar;
