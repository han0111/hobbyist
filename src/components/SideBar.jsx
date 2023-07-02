import React from "react";
import { styled } from "styled-components";
import { useState } from "react";
import { subcategoryOptions } from "./MyPost";
import { useDispatch } from "react-redux";
import { addCategory } from "../modules/subcategoryReducer";
import Weather from "./Weather";
import Post from "./Post";

const SidebarWrap = styled.div`
  position: sticky;
  left: 0;
  top: 100px;
`;

const AllList = styled.button`
  width: 220px;
  padding: 10px;
  border-radius: 8px;
  background: #fff;
  display: flex;
  flex-direction: column;
  border: none;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
`;
const CategoryFont = styled.div`
  margin-bottom: 10px;
  font-size: 16px;
  font-weight: bold;
`;
const List = styled.div`
  display: flex;
  text-align: left;
  justify-content: center;
  flex-direction: column;
  background-color: transparent;
  border: none;
  font-size: 15px;
  width: 180px;
  margin-bottom: 6px;
  margin-left: 10px;
`;
const SmallLists = styled.div`
  display: ${(props) => (props.isopen === "true" ? "flex" : "none")};
  flex-direction: column;
  justify-content: center;
`;
const SmallList = styled.div`
  font-size: 13px;
  padding-top: 4px;
  padding-bottom: 4px;
  text-align: left;
  margin-left: 14px;
  border: none;
  background: #fff;
`;

const TopBtn = styled.button`
  width: 50px;
  height: 50px;
  position: fixed;
  bottom: 50px;
  right: 80px;
  border-radius: 30px;
  border: none;
  cursor: pointer;
  color: white;

  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  background-color: #5e5ee8;
  &:hover {
    background-color: #c0c0ff;
    color: #5e5ee8;
  }
`;

const initialallLists = [
  {
    id: 1,
    list: "💰 경제",
    sublist: subcategoryOptions["경제"].map((option) => option.value),
    isOpen: false,
  },
  {
    id: 2,
    list: "🐶 애완동.식물",
    sublist: subcategoryOptions["애완동식물"].map((option) => option.value),
    isOpen: false,
  },
  {
    id: 3,
    list: "🚙 여행",
    sublist: subcategoryOptions["여행"].map((option) => option.value),
    isOpen: false,
  },
  {
    id: 4,
    list: "🎧 음악",
    sublist: subcategoryOptions["음악"].map((option) => option.value),
    isOpen: false,
  },
  {
    id: 5,
    list: "🍀 기타",
    sublist: subcategoryOptions["기타"].map((option) => option.value),

    isOpen: false,
  },
];

function SideBar() {
  const dispatch = useDispatch();

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
    console.log(cleanSubcategory);
    dispatch(addCategory(cleanSubcategory));
  };

  return (
    <>
      <SidebarWrap>
        <Post />
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
                <SmallLists
                  className="작은목차"
                  isopen={allList.isopen ? "true" : "false"}
                >
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
        <Weather />
      </SidebarWrap>
      <TopBtn
        onClick={() => {
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }}
      >
        Top
      </TopBtn>
    </>
  );
}
export default SideBar;
