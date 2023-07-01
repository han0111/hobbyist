import React from "react";
import { styled } from "styled-components";
import { useState } from "react";
import { subcategoryOptions } from "./MyPost";

const AllList = styled.button`
  margin-top: 200px;
  /* height: 540px; */
  width: 220px;
  padding: 10px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  /* margin-bottom: 10px; */
  padding-top: 20px;
  left: 190px;
  border: none;
  position: fixed;
`;
const CategoryFont = styled.div`
  margin-bottom: 20px;
  font-size: 20px;
  font-weight: bold;
`;
const List = styled.div`
  display: flex;
  /* align-items: center; */
  justify-content: center;
  flex-direction: column;
  background-color: transparent;
  border: none;
  /* font-weight: bold; */
  font-size: 18px;
  padding: 15px;
  width: 180px;
  /* margin-top: 10px; */
  cursor: pointer;
`;
const SmallLists = styled.div`
  display: ${(props) => (props.isopen ? "flex" : "none")};
  flex-direction: column;
  /* align-items: center; */
  justify-content: center;
`;
const SmallList = styled.div`
  font-size: 15px;
  padding-top: 10px;
  text-align: center;
  border: none;

  cursor: pointer;
`;

function SideBar2({ setSelectedSubcategory }) {
  const initialallLists = [
    {
      id: 1,
      list: "💰 경제",
      sublist: subcategoryOptions["경제"].map((option) => option.value),
      // sublist: ["📈 주식", "💸 가상화폐"],
      isOpen: false,
    },
    {
      id: 2,
      list: "🐶 애완동.식물",
      sublist: subcategoryOptions["애완동식물"].map((option) => option.value),
      // sublist: ["🍯 꿀팁", "💳 쇼핑"],
      isOpen: false,
    },
    {
      id: 3,
      list: "🚙 여행",
      sublist: subcategoryOptions["여행"].map((option) => option.value),
      // sublist: ["🚅 국내", "🛩️ 해외"],
      isOpen: false,
    },
    {
      id: 4,
      list: "🎧 음악",
      sublist: subcategoryOptions["음악"].map((option) => option.value),
      // sublist: ["🎤 추천", "🎹 정보"],
      isOpen: false,
    },
    {
      id: 5,
      list: "🍀 기타",
      sublist: subcategoryOptions["기타"].map((option) => option.value),
      // sublist: ["🎤 추천", "🎹 정보"],
      isOpen: false,
    },
  ];

  const [allLists, setAllLists] = useState(initialallLists);

  const handleList = (id) => {
    const updatedLists = allLists.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          isopen: !item.isopen,
        };
      }

      return {
        ...item,
        isopen: false,
      };
    });
    setAllLists(updatedLists);
  };

  const handleSubcategory = (subcategory) => {
    const cleanSubcategory = subcategory.substring(2).trim();
    setSelectedSubcategory(cleanSubcategory);
    console.log(cleanSubcategory);
  };

  return (
    <AllList>
      <CategoryFont>♞ Category</CategoryFont>
      {allLists.map((allList) => {
        return (
          <List
            className="큰목차"
            key={allList.id}
            onClick={() => handleList(allList.id)}
          >
            <div>{allList.list}</div>
            <SmallLists className="작은목차" isopen={allList.isopen}>
              {allList.sublist.map((subListItem, i) => {
                return (
                  <SmallList
                    key={i}
                    onClick={() => handleSubcategory(subListItem)}
                  >
                    {subListItem}
                  </SmallList>
                );
              })}
            </SmallLists>
          </List>
        );
      })}
    </AllList>
  );
}
export default SideBar2;
