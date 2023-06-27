import React from "react";
import { styled } from "styled-components";

const Sidebar = styled.div`
  margin-top: 180px;
  margin-left: 3%;
  width: 15%;
  border: none;
  border-radius: 20px;

  text-align: center;
  padding: 10px;

  background-color: #f5f5f5;
  padding-bottom: 10%;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
`;

const Sidebar2 = styled.div`
  margin-top: 2%;
  margin-left: 3%;
  width: 15%;
  border: none;
  border-radius: 20px;

  text-align: center;
  padding: 10px;

  background-color: #f5f5f5;
  padding-bottom: 10%;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
`;

const SideBtn = styled.button`
  background-color: transparent;
  border: none;
  width: 100px;
  height: 40px;
  margin: 10px auto 5px auto;
  /* box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3); */
  &:hover {
    transform: scale(1.2);
  }
  cursor: pointer;

  font-size: 20px;
  display: flex;
`;

function SideBar() {
  return (
    <div>
      <Sidebar>
        <h3>▼ Category</h3>
        <br />
        <SideBtn>여행</SideBtn>
        <br />
        <SideBtn>카테고리2</SideBtn>
        <br />
        <SideBtn>카테고리3</SideBtn>
      </Sidebar>
      <div>
        <Sidebar2>
          <h3>경제 API</h3>
          <br />
        </Sidebar2>
      </div>
    </div>
  );
}

export default SideBar;
