import React from "react";
import TopBar from "../components/TopBar";
import SideBar2 from "../components/SideBar2";
import Contents from "../components/Contents";
import Post from "../components/Post";
// import { useState, useEffect } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../service/firebase";

function App() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const querySnapshot = await getDocs(collection(db, "posts"));
      const fetchedData = querySnapshot.docs.map((doc) => doc.data());
      setData((prevData) => [...prevData, ...fetchedData]);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight &&
        !isLoading
      ) {
        fetchData();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isLoading]); // isLoading을 의존성으로 포함

  useEffect(() => {
    fetchData();
  }, []);

  //---------------------------
  return (
    <>
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <div style={{ display: "flex" }}>
          <TopBar />
          <SideBar2 />
          <Contents />
          <Post />
        </div>
      </div>

      {/* 데이터 출력 */}
      {data.map((item, index) => (
        <div key={index}>{item.title}</div>
      ))}
    </>
  );
}

export default App;
