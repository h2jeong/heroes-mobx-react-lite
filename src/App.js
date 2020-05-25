import React from "react";
import "./App.css";
import { VillainProvider } from "./villains/villain-context";
import { BrowserRouter } from "react-router-dom";
import HeaderNav from "./shared/components/HeaderNav";
import RootRouter from "./root-router";

function App() {
  return (
    <VillainProvider>
      <BrowserRouter>
        <>
          <HeaderNav />
          <div className="container">
            <RootRouter />
          </div>
        </>
      </BrowserRouter>
    </VillainProvider>
  );
}

export default App;
