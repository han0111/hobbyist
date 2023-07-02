import React from "react";
import TopBar from "../components/TopBar";
import Contents from "../components/Contents";
import SideBar from "../components/SideBar";

function App() {
  return (
    <>
      <div>
        <TopBar />

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "60px",
            marginTop: "50px",
          }}
        >
          <div
            style={{
              position: "relative",
              left: "0px",
              top: "0px",
            }}
          >
            <SideBar />
          </div>
          <Contents />
        </div>
      </div>
    </>
  );
}

export default App;
