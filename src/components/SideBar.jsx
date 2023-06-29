import React from "react";
import { styled } from "styled-components";
import { useState } from "react";

const Sidebar = styled.div`
  margin-top: 180px;
  margin-left: 0%;
  width: 250px;
  border: none;
  border-radius: 20px;
  text-align: center;
  padding: 10px;
  height: ${(props) => (props.isOpen ? "400px" : "50px")};
  background-color: ${(props) => (props.isOpen ? "transparent" : "#f5f5f5")};
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  transition: background-color 0.3s;
  position: relative;
`;

const Sidebar2 = styled.div`
  margin-top: 2%;
  margin-left: 0%;
  width: 250px;
  border: none;
  border-radius: 20px;

  text-align: center;
  padding: 10px;

  background-color: #f5f5f5;
  padding-bottom: 10%;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  transition: margin-top 0.3s;
`;

const SideCategory = styled.div`
  background-color: transparent;
  border: none;
  width: 300px;
  height: 40px;

  margin: 10px auto 5px 70px;

  &:hover {
    transform: scale(1.1);
  }
  cursor: pointer;

  font-size: 20px;
  display: flex;
  position: relative;
`;
const SideSubBtn = styled.button`
  background-color: transparent;
  border: none;
  width: 150px;
  height: 40px;

  /* margin: 10px auto 5px 0px; */
  margin-bottom: ${(props) => (props.isSubmenuOpen ? "500px" : "20px")};
  &:hover {
    transform: scale(1.1);
  }
  cursor: pointer;

  font-size: 20px;
  display: flex;
  position: relative;
`;
const DropdownMenu = styled.div`
  display: ${(props) => (props.isOpen ? "block" : "none")};
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 5px;

  background-color: blue;
`;
const SubmenuDiv = styled.div`
  display: ${(props) => (props.isSubmenuOpen ? "block" : "none")};
  /* position: absolute; 이거땜에 간격조절 안됐음 ㅠㅠ */
`;
const SecondmenuDiv = styled.div`
  display: ${(props) => (props.isSecondOpen ? "block" : "none")};
`;
const SubmenuBtn = styled.button`
  background-color: green;

  /* background-color: transparent; */
  border: none;
  width: 300px;
  height: 40px;

  margin: 10px auto 5px 0px;

  &:hover {
    transform: scale(1.1);
  }
  cursor: pointer;

  font-size: 20px;
  display: ${(props) => (props.isSubmenuOpen ? "none" : "flex")};
  position: relative;
  transition: height 0.3s;
`;

function SideBar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);
  const [isSecondOpen, setIsSecondOpen] = useState(false);

  const [isSubOpen, setIsSubOpen] = useState({
    first: false,
    second: false,
    third: false,
    forth: false,
  });

  const handleSubOpen = () => {
    setIsSubOpen({
      first: true,
      second: false,
      third: false,
      forth: false,
    });
  };
  const handeSubClose = () => {
    setIsSubOpen({
      first: false,
      second: false,
      third: false,
      forth: false,
    });
  };

  const handleMouseEnter = () => {
    setIsDropdownOpen(true);
  };
  const handleMouseLeave = () => {
    setIsDropdownOpen(false);
  };
  //카테고리 내부 첫번째
  const handleSubmenuDropdownEnter = () => {
    setIsSubmenuOpen(true);
  };
  const handleSubmenuDropdownLeave = () => {
    setIsSubmenuOpen(false);
  };
  //카테고리 내부 두번째
  const handleSecondEnter = () => {
    setIsSecondOpen(true);
  };
  const handleSecondLeave = () => {
    setIsSecondOpen(false);
  };

  return (
    <div>
      <Sidebar
        isOpen={isDropdownOpen || isSubmenuOpen}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <SideCategory>
          🏷️ Category
          <DropdownMenu isOpen={isDropdownOpen}>
            <div onMouseLeave={handeSubClose}>
              <SideSubBtn
                // onMouseEnter={handleSubmenuDropdownEnter}
                // onMouseLeave={handleSubmenuDropdownLeave}
                onMouseEnter={handleSubOpen}
              >
                📈 경제
              </SideSubBtn>
              {/* {isSubmenuOpen && ( */}
              {/* <SubmenuDiv isSubmenuOpen={isSubmenuOpen}> */}
              <SubmenuDiv isSubmenuOpen={isSubOpen.first}>
                <SubmenuBtn>주식.펀드</SubmenuBtn>
                <SubmenuBtn>가상화폐</SubmenuBtn>
              </SubmenuDiv>
            </div>
            {/* )} */}
            <SideSubBtn
              onMouseEnter={handleSecondEnter}
              onMouseLeave={handleSecondLeave}
            >
              🐶 애완동・식물
              <SecondmenuDiv isSecondOpen={isSecondOpen}>
                <SubmenuBtn>꿀팁</SubmenuBtn>
                <SubmenuBtn>쇼핑</SubmenuBtn>
              </SecondmenuDiv>
            </SideSubBtn>
            <SideSubBtn>🚙 여행</SideSubBtn>
            <SideSubBtn>🎧 음악</SideSubBtn>
            <br />
          </DropdownMenu>
        </SideCategory>
      </Sidebar>

      <div>
        <Sidebar2 isOpen={isDropdownOpen}>
          <h3>경제 API</h3>
          <br />
        </Sidebar2>
      </div>
    </div>
  );
}

export default SideBar;
