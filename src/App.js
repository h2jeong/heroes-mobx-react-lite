import React from "react";
import "./App.css";
import { VillainProvider } from "./villains/villain-context";
import { BrowserRouter } from "react-router-dom";
import HeaderNav from "./shared/components/HeaderNav";
import RootRouter from "./root-router";
import { HeroProvider } from "./heroes/hero-context";

function App() {
  return (
    <VillainProvider>
      <HeroProvider>
        <BrowserRouter>
          <>
            <HeaderNav />
            <div className="container">
              <RootRouter />
            </div>
          </>
        </BrowserRouter>
      </HeroProvider>
    </VillainProvider>
  );
}

export default App;
