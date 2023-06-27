import React from "react";
import TopBar from "../components/TopBar";
import SideBar from "../components/SideBar";
import Contents from "../components/Contents";


function App() {
  return (
    <div style={{
      maxWidth : "1200px",
      margin : "0 auto"
    }}>
      <TopBar />
      <SideBar />

      <Contents/>;
    </div>
    </>
  );
}

export default App;
