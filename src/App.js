import React from "react";
import Home from "./components/main/main";
import UserContext from "./components/user/accountContext";

function App() {
  return (
    <UserContext>
        <Home />
    </ UserContext>
  );
}

export default App;
