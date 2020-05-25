import React from "react";
import { Redirect, Router } from "@reach/router";
import Villains from "./villains/pages/Villains";
import EditVillain from "./villains/pages/EditVillain";

function RootRouter() {
  return (
    <Router>
      <Villains path="villains" />
      <EditVillain path="edit-villain/:id" />
      <Redirect from="/" to="villains" noThrow />
    </Router>
  );
}

export default RootRouter;
