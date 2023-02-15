import React, { Component } from "react";
import { Scheduler } from "./Scheduler";
import "./Home.css";
import { GoogleOAuth } from "../GoogleOAuth/GoogleOAuth";

export function Home() {
  return (
    <div className="container">
      <h1>
        <center>Welcome to PlantHub!</center>
      </h1>
      <div className="content">
        <div className="google-oauth">
          <GoogleOAuth />
        </div>
        <div className="scheduler">
          <Scheduler />
        </div>
      </div>
    </div>
  );
}
