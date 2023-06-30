import React from "react";

function SideBar2() {
  const allLists = [
    {
      list: "경제",
      sublist: ["주식", "가상화폐"],
      isOpen: false,
    },
    {
      list: "애완동.식물",
      sublist: ["꿀팁", "쇼핑"],
      isOpen: false,
    },
    {
      list: "여행",
      sublist: ["국내", "해외"],
      isOpen: false,
    },
    {
      list: "음악",
      sublist: ["추천", "정보"],
      isOpen: false,
    },
  ];
  return (
    <>

      {allLists.map((allList, index) => {
        return (
          <div className="전체" key={`list-${index}`}>
            <div className="큰목차">
              <div>{allList.list}</div>
              <div className="작은목차">
                <div>{allList.sublist[0]}</div>
                <div>{allList.sublist[1]}</div>
              </div>
              <div>{allList.list}</div>
              <div className="작은목차">
                <div>{allList.sublist[0]}</div>
                <div>{allList.sublist[1]}</div>
              </div>

              <div className="큰목차">{allList.list}</div>
              <div className="작은목차">
                <div>{allList.sublist[0]}</div>
                <div>{allList.sublist[1]}</div>
              </div>
              <div className="큰목차">{allList.list}</div>
              <div className="작은목차">
                <div>{allList.sublist[0]}</div>
                <div>{allList.sublist[0]}</div>

              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
export default SideBar2;
