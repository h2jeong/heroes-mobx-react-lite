import React from "react";
import { Redirect, Router } from "@reach/router";
import Villains from "./villains/pages/Villains";
import EditVillain from "./villains/pages/EditVillain";
import Heroes from "./heroes/pages/Heroes";
import EditHero from "./heroes/pages/EditHero";

function RootRouter() {
  return (
    <Router>
      <Heroes path="heroes" />
      <EditHero path="edit-hero/:id" />
      <Villains path="villains" />
      <EditVillain path="edit-villain/:id" />
      <Redirect from="/" to="heroes" noThrow />
    </Router>
  );
}

export default RootRouter;
