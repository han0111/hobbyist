import React from "react";
import { FaSistrix } from "react-icons/fa";
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
  /* justify-content: space-between; */
  align-items: center;

  box-shadow: 1px 1px 5px gray;
`;
const A = styled.div`
  display: flex;
  flex-direction: row;
`;

const Title = styled.h1`
  font-size: 50px;
  color: #5e5ee8;
  margin-left: 20px;
  margin-right: 20px;
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
`;

function TopBar() {
  return (
    <>
      <Header>
        <A>
          <Title>Hobbyist</Title>
          <Form>
            <FaSistrix size="20" color="gray"></FaSistrix>
            <Input type="text" placeholder="검색 가능합니다."></Input>
          </Form>
        </A>
        <BtnContainer>
          <TopButton>번역이미지 KR</TopButton>
          <SignIn />
          <SignUp />
        </BtnContainer>
      </Header>
    </>
  );
}

export default TopBar;
