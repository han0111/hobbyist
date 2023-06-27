import React from "react";
import SignUp from "../components/SignUp";
import TopBar from "../components/TopBar";
import SideBar from "../components/SideBar";
import SignIn from "../components/SignIn";


function App() {
  return (
    <>
      <TopBar />
      <SideBar />
      <SignIn />
      <SignUp />;
    </>
  );
}

export default App;
