import React from "react";
import SignUp from "../components/SignUp";
import TopBar from "../components/TopBar";
import SideBar from "../components/SideBar";
import SignIn from "../components/SignIn";
import Contents from "../components/Contents";


function App() {
  return (
    <div style={{
      maxWidth : "1200px",
      margin : "0 auto"
    }}>
      <TopBar />
      <SideBar />
      <SignIn />
      <SignUp />
      <Contents/>;
    </div>
  );
}

export default App;
