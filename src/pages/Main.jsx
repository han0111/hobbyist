import React from "react";
import TopBar from "../components/TopBar";
import Contents from "../components/Contents";
import Post from "../components/Post";
import Weather from "../components/Weather";
import SideBar2 from "../components/SideBar2";

function App() {
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
          <Weather />
        </div>
      </div>
    </>
  );
}

export default App;
