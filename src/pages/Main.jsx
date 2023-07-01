import React from "react";
import TopBar from "../components/TopBar";
import Contents from "../components/Contents";
import Post from "../components/Post";
import Weather from "../components/Weather";

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
          <Contents />
          <Post />
          <Weather />
        </div>
      </div>
    </>
  );
}

export default App;
