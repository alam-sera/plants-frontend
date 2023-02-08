import React, { Component } from "react";
import { Scheduler } from "./Scheduler";
import { PlantId } from "../PlantId";
import "./Home.css";
import { Plants } from "../Plants";

export function Home() {
  return (
    <div>
      <h1>
        <center>Welcome to PlantHub!</center>
      </h1>
      <Scheduler />
    </div>
  );
}
