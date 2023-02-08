import React, { Component } from "react";
import "./Footer.css";

export function Footer() {
  return (
    <footer>
      <div className="main-footer">
        <div classname="container">
          <div className="row">
            <div className="col">
              <h4>PlantHub</h4>
              <ul>
                <li>562-377-4037</li>
                <li>Cerritos, California</li>
                <li>29628 Pickleberries Street</li>
              </ul>
            </div>
            <div className="col">
              <h4>Features</h4>
              <ul>
                <li>Plant Locator</li>
                <li>Plant Identification</li>
                <li>Explore Plants</li>
              </ul>
            </div>
            <div className="col">
              <h4>Connect</h4>
              <ul>
                <li>Email</li>
                <li>Phone Number</li>
                <li>Github</li>
              </ul>
            </div>
            <hr />
            <div className="row">
              <p className="col-sm">
                &copy;{new Date().getFullYear()} PlantHub Inc | All rights
                reserved | Terms of Serivce | Privacy
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
