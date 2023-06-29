import React from "react";
import TopBar from "../components/TopBar";
import SideBar from "../components/SideBar";
import Contents from "../components/Contents";
import Post from "../components/Post";
import FileUpload from "../components/FileUpload";
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
          <SideBar />
          <Contents />
          <Post />
        </div>
      </div>
    </>
  );
}

export default App;
